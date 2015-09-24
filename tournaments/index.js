const BRACKET_MINIMUM_UPDATE_INTERVAL = 2 * 1000;
const AUTO_DISQUALIFY_WARNING_TIMEOUT = 30 * 1000;
const AUTO_START_MINIMUM_TIMEOUT = 30 * 1000;
const MAX_REASON_LENGTH = 300;

var TournamentGenerators = {
	roundrobin: require('./generator-round-robin.js').RoundRobin,
	elimination: require('./generator-elimination.js').Elimination
};

var Tournament;

exports.tournaments = {};

function usersToNames(users) {
	return users.map(function (user) { return user.name; });
}

function createTournamentGenerator(generator, args, output) {
	var Generator = TournamentGenerators[toId(generator)];
	if (!Generator) {
		output.sendReply(generator + " is not a valid type.");
		output.sendReply("Valid types: " + Object.keys(TournamentGenerators).join(", "));
		return;
	}
	args.unshift(null);
	return new (Generator.bind.apply(Generator, args))();
}
function createTournament(room, format, generator, playerCap, isRated, args, output) {
	if (room.type !== 'chat') {
		output.sendReply("Tournaments can only be created in chat rooms.");
		return;
	}
	if (exports.tournaments[room.id]) {
		output.sendReply("A tournament is already running in the room.");
		return;
	}
	if (Rooms.global.lockdown) {
		output.sendReply("The server is restarting soon, so a tournament cannot be created.");
		return;
	}
	format = Tools.getFormat(format);
	if (format.effectType !== 'Format' || !format.tournamentShow) {
		output.sendReply(format.id + " is not a valid tournament format.");
		output.sendReply("Valid formats: " + Object.values(Tools.data.Formats).filter(function (f) { return f.effectType === 'Format' && f.tournamentShow; }).map('name').join(", "));
		return;
	}
	if (!TournamentGenerators[toId(generator)]) {
		output.sendReply(generator + " is not a valid type.");
		output.sendReply("Valid types: " + Object.keys(TournamentGenerators).join(", "));
		return;
	}
	if (playerCap && playerCap < 2) {
		output.sendReply("You cannot have a player cap that is less than 2.");
		return;
	}
	return (exports.tournaments[room.id] = new Tournament(room, format, createTournamentGenerator(generator, args, output), playerCap, isRated));
}
function deleteTournament(id, output) {
	var tournament = exports.tournaments[id];
	if (!tournament) {
		output.sendReply(id + " doesn't exist.");
		return false;
	}
	tournament.forceEnd(output);
	delete exports.tournaments[id];
	return true;
}
function getTournament(id, output) {
	if (exports.tournaments[id]) {
		return exports.tournaments[id];
	}
}

Tournament = (function () {
	function Tournament(room, format, generator, playerCap, isRated) {
		this.room = room;
		this.format = toId(format);
		this.generator = generator;
		this.isRated = isRated;
		this.playerCap = parseInt(playerCap) || Config.tournamentDefaultPlayerCap || 0;
		this.scouting = true;
		if (Config.tournamentDefaultPlayerCap && this.playerCap > Config.tournamentDefaultPlayerCap) {
			ResourceMonitor.log('[ResourceMonitor] Room ' + room.id + ' starting a tour over default cap (' + this.playerCap + ')');
		}

		this.isBracketInvalidated = true;
		this.lastBracketUpdate = 0;
		this.bracketUpdateTimer = null;
		this.bracketCache = null;

		this.isTournamentStarted = false;
		this.availableMatches = null;
		this.inProgressMatches = null;

		this.isAvailableMatchesInvalidated = true;
		this.availableMatchesCache = null;

		this.pendingChallenges = null;

		this.isEnded = false;

		room.add('|tournament|create|' + this.format + '|' + generator.name + '|' + this.playerCap);
		room.send('|tournament|update|' + JSON.stringify({
			format: this.format,
			generator: generator.name,
			playerCap: this.playerCap,
			isStarted: false,
			isJoined: false
		}));
		this.update();
	}

	Tournament.prototype.setGenerator = function (generator, output) {
		if (this.isTournamentStarted) {
			output.sendReply('|tournament|error|BracketFrozen');
			return;
		}

		var isErrored = false;
		this.generator.getUsers().forEach(function (user) {
			var error = generator.addUser(user);
			if (typeof error === 'string') {
				output.sendReply('|tournament|error|' + error);
				isErrored = true;
			}
		});

		if (isErrored) return;

		this.generator = generator;
		this.room.send('|tournament|update|' + JSON.stringify({generator: generator.name}));
		this.isBracketInvalidated = true;
		this.update();
		return true;
	};

	Tournament.prototype.forceEnd = function () {
		if (this.isTournamentStarted) {
			this.inProgressMatches.forEach(function (match) {
				if (match) {
					delete match.room.tour;
					match.room.addRaw("<div class=\"broadcast-red\"><b>The tournament was forcefully ended.</b><br />You can finish playing, but this battle is no longer considered a tournament battle.</div>");
				}
			});
		} else if (this.autoStartTimeout) {
			clearTimeout(this.autoStartTimeout);
		}
		this.isEnded = true;
		this.room.add('|tournament|forceend');
		this.isEnded = true;
	};

	Tournament.prototype.updateFor = function (targetUser, connection) {
		if (!connection) connection = targetUser;
		if (this.isEnded) return;
		if ((!this.bracketUpdateTimer && this.isBracketInvalidated) || (this.isTournamentStarted && this.isAvailableMatchesInvalidated)) {
			this.room.add(
				"Error: update() called with a target user when data invalidated: " +
				(!this.bracketUpdateTimer && this.isBracketInvalidated) + ", " +
				(this.isTournamentStarted && this.isAvailableMatchesInvalidated) +
				"; Please report this to an admin."
			);
			return;
		}
		var isJoined = this.generator.getUsers().indexOf(targetUser) >= 0;
		connection.sendTo(this.room, '|tournament|update|' + JSON.stringify({
			format: this.format,
			generator: this.generator.name,
			isStarted: this.isTournamentStarted,
			isJoined: isJoined,
			bracketData: this.bracketCache
		}));
		if (this.isTournamentStarted && isJoined) {
			connection.sendTo(this.room, '|tournament|update|' + JSON.stringify({
				challenges: usersToNames(this.availableMatchesCache.challenges.get(targetUser)),
				challengeBys: usersToNames(this.availableMatchesCache.challengeBys.get(targetUser))
			}));

			var pendingChallenge = this.pendingChallenges.get(targetUser);
			if (pendingChallenge && pendingChallenge.to) {
				connection.sendTo(this.room, '|tournament|update|' + JSON.stringify({challenging: pendingChallenge.to.name}));
			} else if (pendingChallenge && pendingChallenge.from) {
				connection.sendTo(this.room, '|tournament|update|' + JSON.stringify({challenged: pendingChallenge.from.name}));
			}
		}
		connection.sendTo(this.room, '|tournament|updateEnd');
	};

	Tournament.prototype.update = function (targetUser) {
		if (targetUser) throw new Error("Please use updateFor() to update the tournament for a specific user.");
		if (this.isEnded) return;
		if (this.isBracketInvalidated) {
			if (Date.now() < this.lastBracketUpdate + BRACKET_MINIMUM_UPDATE_INTERVAL) {
				if (this.bracketUpdateTimer) clearTimeout(this.bracketUpdateTimer);
				this.bracketUpdateTimer = setTimeout(function () {
					this.bracketUpdateTimer = null;
					this.update();
				}.bind(this), BRACKET_MINIMUM_UPDATE_INTERVAL);
			} else {
				this.lastBracketUpdate = Date.now();

				this.bracketCache = this.getBracketData();
				this.isBracketInvalidated = false;
				this.room.send('|tournament|update|' + JSON.stringify({bracketData: this.bracketCache}));
			}
		}

		if (this.isTournamentStarted && this.isAvailableMatchesInvalidated) {
			this.availableMatchesCache = this.getAvailableMatches();
			this.isAvailableMatchesInvalidated = false;

			this.availableMatchesCache.challenges.forEach(function (opponents, user) {
				user.sendTo(this.room, '|tournament|update|' + JSON.stringify({challenges: usersToNames(opponents)}));
			}, this);
			this.availableMatchesCache.challengeBys.forEach(function (opponents, user) {
				user.sendTo(this.room, '|tournament|update|' + JSON.stringify({challengeBys: usersToNames(opponents)}));
			}, this);
		}
		this.room.send('|tournament|updateEnd');
	};

	Tournament.prototype.purgeGhostUsers = function () {
		// "Ghost" users sometimes end up in the tournament because they've merged with another user.
		// This function is to remove those ghost users from the tournament.
		this.generator.getUsers(true).forEach(function (user) {
			var realUser = Users.getExact(user.userid);
			if (!realUser || realUser !== user) {
				// The two following functions are called without their second argument,
				// but the second argument will not be used in this situation
				if (this.isTournamentStarted) {
					if (!this.disqualifiedUsers.get(user)) {
						this.disqualifyUser(user);
					}
				} else {
					this.removeUser(user);
				}
				this.room.update();
			}
		}, this);
	};

	Tournament.prototype.addUser = function (user, isAllowAlts, output) {
		if (!user.named) {
			output.sendReply('|tournament|error|UserNotNamed');
			return;
		}

		var users = this.generator.getUsers();
		if (this.playerCap && users.length >= this.playerCap) {
			output.sendReply('|tournament|error|Full');
			return;
		}

		if (!isAllowAlts) {
			for (var i = 0; i < users.length; i++) {
				if (users[i].latestIp === user.latestIp) {
					output.sendReply('|tournament|error|AltUserAlreadyAdded');
					return;
				}
			}
		}

		var error = this.generator.addUser(user);
		if (typeof error === 'string') {
			output.sendReply('|tournament|error|' + error);
			return;
		}

		this.room.add('|tournament|join|' + user.name);
		user.sendTo(this.room, '|tournament|update|{"isJoined":true}');
		this.isBracketInvalidated = true;
		this.update();
		if (this.playerCap === (users.length + 1)) this.room.add("The tournament is now full.");
	};
	Tournament.prototype.removeUser = function (user, output) {
		var error = this.generator.removeUser(user);
		if (typeof error === 'string') {
			output.sendReply('|tournament|error|' + error);
			return;
		}

		this.room.add('|tournament|leave|' + user.name);
		user.sendTo(this.room, '|tournament|update|{"isJoined":false}');
		this.isBracketInvalidated = true;
		this.update();
	};
	Tournament.prototype.replaceUser = function (user, replacementUser, output) {
		var error = this.generator.replaceUser(user, replacementUser);
		if (typeof error === 'string') {
			output.sendReply('|tournament|error|' + error);
			return;
		}

		this.room.add('|tournament|replace|' + user.name + '|' + replacementUser.name);
		user.sendTo(this.room, '|tournament|update|{"isJoined":false}');
		replacementUser.sendTo(this.room, '|tournament|update|{"isJoined":true}');
		this.isBracketInvalidated = true;
		this.update();
	};

	Tournament.prototype.getBracketData = function () {
		var data = this.generator.getBracketData();
		if (data.type === 'tree' && data.rootNode) {
			var queue = [data.rootNode];
			while (queue.length > 0) {
				var node = queue.shift();

				if (node.state === 'available') {
					var pendingChallenge = this.pendingChallenges.get(node.children[0].team);
					if (pendingChallenge && node.children[1].team === pendingChallenge.to) {
						node.state = 'challenging';
					}

					var inProgressMatch = this.inProgressMatches.get(node.children[0].team);
					if (inProgressMatch && node.children[1].team === inProgressMatch.to) {
						node.state = 'inprogress';
						node.room = inProgressMatch.room.id;
					}
				}

				if (node.team) node.team = node.team.name;

				node.children.forEach(function (child) {
					queue.push(child);
				});
			}
		} else if (data.type === 'table') {
			if (this.isTournamentStarted) {
				data.tableContents.forEach(function (row, r) {
					var pendingChallenge = this.pendingChallenges.get(data.tableHeaders.rows[r]);
					var inProgressMatch = this.inProgressMatches.get(data.tableHeaders.rows[r]);
					if (pendingChallenge || inProgressMatch) {
						row.forEach(function (cell, c) {
							if (!cell) return;

							if (pendingChallenge && data.tableHeaders.cols[c] === pendingChallenge.to) {
								cell.state = 'challenging';
							}

							if (inProgressMatch && data.tableHeaders.cols[c] === inProgressMatch.to) {
								cell.state = 'inprogress';
								cell.room = inProgressMatch.room.id;
							}
						});
					}
				}, this);
			}
			data.tableHeaders.cols = usersToNames(data.tableHeaders.cols);
			data.tableHeaders.rows = usersToNames(data.tableHeaders.rows);
		}
		return data;
	};

	Tournament.prototype.startTournament = function (output) {
		if (this.isTournamentStarted) {
			output.sendReply('|tournament|error|AlreadyStarted');
			return false;
		}

		this.purgeGhostUsers();
		var users = this.generator.getUsers();
		if (users.length < 2) {
			output.sendReply('|tournament|error|NotEnoughUsers');
			return false;
		}

		this.generator.freezeBracket();

		this.availableMatches = new Map();
		this.inProgressMatches = new Map();
		this.pendingChallenges = new Map();
		this.disqualifiedUsers = new Map();
		this.isAutoDisqualifyWarned = new Map();
		this.lastActionTimes = new Map();
		users.forEach(function (user) {
			this.availableMatches.set(user, new Map());
			this.inProgressMatches.set(user, null);
			this.pendingChallenges.set(user, null);
			this.disqualifiedUsers.set(user, false);
			this.isAutoDisqualifyWarned.set(user, false);
			this.lastActionTimes.set(user, Date.now());
		}, this);

		this.isTournamentStarted = true;
		this.autoDisqualifyTimeout = Infinity;
		if (this.autoStartTimeout) clearTimeout(this.autoStartTimeout);
		this.isBracketInvalidated = true;
		this.room.add('|tournament|start');
		this.room.send('|tournament|update|{"isStarted":true}');
		this.update();
		return true;
	};
	Tournament.prototype.getAvailableMatches = function () {
		var matches = this.generator.getAvailableMatches();
		if (typeof matches === 'string') {
			this.room.add("Unexpected error from getAvailableMatches(): " + matches + ". Please report this to an admin.");
			return;
		}

		var users = this.generator.getUsers();
		var challenges = new Map();
		var challengeBys = new Map();
		var oldAvailableMatches = new Map();

		users.forEach(function (user) {
			challenges.set(user, []);
			challengeBys.set(user, []);

			var oldAvailableMatch = false;
			var availableMatches = this.availableMatches.get(user);
			if (availableMatches.size) {
				oldAvailableMatch = true;
				availableMatches.clear();
			}
			oldAvailableMatches.set(user, oldAvailableMatch);
		}, this);

		matches.forEach(function (match) {
			challenges.get(match[0]).push(match[1]);
			challengeBys.get(match[1]).push(match[0]);

			this.availableMatches.get(match[0]).set(match[1], true);
		}, this);

		this.availableMatches.forEach(function (availableMatches, user) {
			if (oldAvailableMatches.get(user)) return;

			if (availableMatches.size) this.lastActionTimes.set(user, Date.now());
		}, this);

		return {
			challenges: challenges,
			challengeBys: challengeBys
		};
	};

	Tournament.prototype.disqualifyUser = function (user, output, reason) {
		var error = this.generator.disqualifyUser(user);
		if (error) {
			output.sendReply('|tournament|error|' + error);
			return false;
		}
		if (this.disqualifiedUsers.get(user)) {
			output.sendReply('|tournament|error|AlreadyDisqualified');
			return false;
		}

		this.disqualifiedUsers.set(user, true);
		this.generator.setUserBusy(user, false);

		var challenge = this.pendingChallenges.get(user);
		if (challenge) {
			this.pendingChallenges.set(user, null);
			if (challenge.to) {
				this.generator.setUserBusy(challenge.to, false);
				this.pendingChallenges.set(challenge.to, null);
				challenge.to.sendTo(this.room, '|tournament|update|{"challenged":null}');
			} else if (challenge.from) {
				this.generator.setUserBusy(challenge.from, false);
				this.pendingChallenges.set(challenge.from, null);
				challenge.from.sendTo(this.room, '|tournament|update|{"challenging":null}');
			}
		}

		var matchFrom = this.inProgressMatches.get(user);
		if (matchFrom) {
			this.generator.setUserBusy(matchFrom.to, false);
			this.inProgressMatches.set(user, null);
			delete matchFrom.room.tour;
			matchFrom.room.forfeit(user);
		}

		var matchTo = null;
		this.inProgressMatches.forEach(function (match, userFrom) {
			if (match && match.to === user) matchTo = userFrom;
		});
		if (matchTo) {
			this.generator.setUserBusy(matchTo, false);
			var matchRoom = this.inProgressMatches.get(matchTo).room;
			delete matchRoom.tour;
			matchRoom.forfeit(user);
			this.inProgressMatches.set(matchTo, null);
		}

		this.room.add('|tournament|disqualify|' + user.name);
		user.sendTo(this.room, '|tournament|update|{"isJoined":false}');
		user.popup("|modal|You have been disqualified from the tournament in " + this.room.title + (reason ? ":\n\n" + reason : "."));
		this.isBracketInvalidated = true;
		this.isAvailableMatchesInvalidated = true;

		if (this.generator.isTournamentEnded()) {
			this.onTournamentEnd();
		} else {
			this.update();
		}

		return true;
	};

	Tournament.prototype.setAutoStartTimeout = function (timeout, output) {
		if (this.isTournamentStarted) {
			output.sendReply('|tournament|error|AlreadyStarted');
			return false;
		}
		timeout = parseFloat(timeout);
		if (timeout < AUTO_START_MINIMUM_TIMEOUT || isNaN(timeout)) {
			output.sendReply('|tournament|error|InvalidAutoStartTimeout');
			return false;
		}

		if (this.autoStartTimeout) clearTimeout(this.autoStartTimeout);
		if (timeout === Infinity) {
			this.room.add('|tournament|autostart|off');
		} else {
			this.autoStartTimeout = setTimeout(this.startTournament.bind(this, output), timeout);
			this.room.add('|tournament|autostart|on|' + timeout);
		}

		return true;
	};

	Tournament.prototype.setAutoDisqualifyTimeout = function (timeout, output) {
		if (!this.isTournamentStarted) {
			output.sendReply('|tournament|error|NotStarted');
			return false;
		}
		if (timeout < AUTO_DISQUALIFY_WARNING_TIMEOUT || isNaN(timeout)) {
			output.sendReply('|tournament|error|InvalidAutoDisqualifyTimeout');
			return false;
		}

		this.autoDisqualifyTimeout = parseFloat(timeout);
		if (this.autoDisqualifyTimeout === Infinity) {
			this.room.add('|tournament|autodq|off');
		} else {
			this.room.add('|tournament|autodq|on|' + this.autoDisqualifyTimeout);
		}

		this.runAutoDisqualify();
		return true;
	};
	Tournament.prototype.runAutoDisqualify = function (output) {
		if (!this.isTournamentStarted) {
			output.sendReply('|tournament|error|NotStarted');
			return false;
		}
		this.lastActionTimes.forEach(function (time, user) {
			var availableMatches = false;
			if (this.availableMatches.get(user).size) availableMatches = true;
			var pendingChallenge = this.pendingChallenges.get(user);

			if (!availableMatches && !pendingChallenge) return;
			if (pendingChallenge && pendingChallenge.to) return;

			if (Date.now() > time + this.autoDisqualifyTimeout && this.isAutoDisqualifyWarned.get(user)) {
				this.disqualifyUser(user, output, "You failed to make or accept the challenge in time.");
				this.room.update();
			} else if (Date.now() > time + this.autoDisqualifyTimeout - AUTO_DISQUALIFY_WARNING_TIMEOUT && !this.isAutoDisqualifyWarned.get(user)) {
				var remainingTime = this.autoDisqualifyTimeout - Date.now() + time;
				if (remainingTime <= 0) {
					remainingTime = AUTO_DISQUALIFY_WARNING_TIMEOUT;
					this.lastActionTimes.set(user, Date.now() - this.autoDisqualifyTimeout + AUTO_DISQUALIFY_WARNING_TIMEOUT);
				}

				this.isAutoDisqualifyWarned.set(user, true);
				user.sendTo(this.room, '|tournament|autodq|target|' + remainingTime);
			} else {
				this.isAutoDisqualifyWarned.set(user, false);
			}
		}, this);
	};

	Tournament.prototype.challenge = function (from, to, output) {
		if (!this.isTournamentStarted) {
			output.sendReply('|tournament|error|NotStarted');
			return;
		}

		if (!this.availableMatches.get(from) || !this.availableMatches.get(from).get(to)) {
			output.sendReply('|tournament|error|InvalidMatch');
			return;
		}

		if (this.generator.getUserBusy(from) || this.generator.getUserBusy(to)) {
			this.room.add("Tournament backend breaks specifications. Please report this to an admin.");
			return;
		}

		this.generator.setUserBusy(from, true);
		this.generator.setUserBusy(to, true);

		this.isAvailableMatchesInvalidated = true;
		this.purgeGhostUsers();
		this.update();

		from.prepBattle(this.format, 'tournament', from, this.finishChallenge.bind(this, from, to, output));
	};
	Tournament.prototype.finishChallenge = function (from, to, output, result) {
		if (!result) {
			this.generator.setUserBusy(from, false);
			this.generator.setUserBusy(to, false);

			this.isAvailableMatchesInvalidated = true;
			this.update();
			return;
		}

		this.lastActionTimes.set(from, Date.now());
		this.lastActionTimes.set(to, Date.now());
		this.pendingChallenges.set(from, {to: to, team: from.team});
		this.pendingChallenges.set(to, {from: from, team: from.team});
		from.sendTo(this.room, '|tournament|update|' + JSON.stringify({challenging: to.name}));
		to.sendTo(this.room, '|tournament|update|' + JSON.stringify({challenged: from.name}));

		this.isBracketInvalidated = true;
		this.update();
	};
	Tournament.prototype.cancelChallenge = function (user, output) {
		if (!this.isTournamentStarted) {
			output.sendReply('|tournament|error|NotStarted');
			return;
		}

		var challenge = this.pendingChallenges.get(user);
		if (!challenge || challenge.from) return;

		this.generator.setUserBusy(user, false);
		this.generator.setUserBusy(challenge.to, false);
		this.pendingChallenges.set(user, null);
		this.pendingChallenges.set(challenge.to, null);
		user.sendTo(this.room, '|tournament|update|{"challenging":null}');
		challenge.to.sendTo(this.room, '|tournament|update|{"challenged":null}');

		this.isBracketInvalidated = true;
		this.isAvailableMatchesInvalidated = true;
		this.update();
	};
	Tournament.prototype.acceptChallenge = function (user, output) {
		if (!this.isTournamentStarted) {
			output.sendReply('|tournament|error|NotStarted');
			return;
		}

		var challenge = this.pendingChallenges.get(user);
		if (!challenge || !challenge.from) return;

		user.prepBattle(this.format, 'tournament', user, this.finishAcceptChallenge.bind(this, user, challenge));
	};
	Tournament.prototype.finishAcceptChallenge = function (user, challenge, result) {
		if (!result) return;

		// Prevent battles between offline users from starting
		if (!challenge.from.connected || !user.connected) return;

		// Prevent double accepts and users that have been disqualified while between these two functions
		if (!this.pendingChallenges.get(challenge.from)) return;
		if (!this.pendingChallenges.get(user)) return;

		var room = Rooms.global.startBattle(challenge.from, user, this.format, challenge.team, user.team, {rated: this.isRated, tour: this});
		if (!room) return;

		this.pendingChallenges.set(challenge.from, null);
		this.pendingChallenges.set(user, null);
		challenge.from.sendTo(this.room, '|tournament|update|{"challenging":null}');
		user.sendTo(this.room, '|tournament|update|{"challenged":null}');

		this.inProgressMatches.set(challenge.from, {to: user, room: room});
		this.room.add('|tournament|battlestart|' + challenge.from.name + '|' + user.name + '|' + room.id).update();

		this.isBracketInvalidated = true;
		this.runAutoDisqualify();
		this.update();
	};
	Tournament.prototype.onBattleJoin = function (room, user) {
		if (this.scouting || this.isEnded || user.latestIp === room.p1.latestIp || user.latestIp === room.p2.latestIp) return;
		var roomid = (room && room.id ? room.id : room);
		var users = this.generator.getUsers(true);
		for (var i = 0; i < users.length; i++) {
			if (users[i].latestIp === user.latestIp) {
				return "Scouting is banned: tournament players can't watch other tournament battles.";
			}
		}
	};
	Tournament.prototype.onBattleWin = function (room, winner) {
		var from = Users.get(room.p1);
		var to = Users.get(room.p2);

		var result = 'draw';
		if (from === winner) {
			result = 'win';
		} else if (to === winner) {
			result = 'loss';
		}

		if (result === 'draw' && !this.generator.isDrawingSupported) {
			this.room.add('|tournament|battleend|' + from.name + '|' + to.name + '|' + result + '|' + room.battle.score.join(',') + '|fail');

			this.generator.setUserBusy(from, false);
			this.generator.setUserBusy(to, false);
			this.inProgressMatches.set(from, null);

			this.isBracketInvalidated = true;
			this.isAvailableMatchesInvalidated = true;

			this.runAutoDisqualify();
			this.update();
			return this.room.update();
		}

		var error = this.generator.setMatchResult([from, to], result, room.battle.score);
		if (error) {
			// Should never happen
			return this.room.add("Unexpected " + error + " from setMatchResult([" + from.userid + ", " + to.userid + "], " + result + ", " + room.battle.score + ") in onBattleWin(" + room.id + ", " + winner.userid + "). Please report this to an admin.").update();
		}

		this.room.add('|tournament|battleend|' + from.name + '|' + to.name + '|' + result + '|' + room.battle.score.join(','));

		this.generator.setUserBusy(from, false);
		this.generator.setUserBusy(to, false);
		this.inProgressMatches.set(from, null);

		this.isBracketInvalidated = true;
		this.isAvailableMatchesInvalidated = true;

		if (this.generator.isTournamentEnded()) {
			this.onTournamentEnd();
		} else {
			this.runAutoDisqualify();
			this.update();
		}
		this.room.update();
	};
	Tournament.prototype.onTournamentEnd = function () {
		this.room.add('|tournament|end|' + JSON.stringify({
			results: this.generator.getResults().map(usersToNames),
			format: this.format,
			generator: this.generator.name,
			bracketData: this.getBracketData()
		}));
		this.isEnded = true;
		delete exports.tournaments[toId(this.room.id)];

		//
		// Tournament Winnings
		//

		var color = '#088cc7';
		var sizeRequiredToEarn = 4;
		var currencyName = function (amount) {
			var name = " buck";
			return amount === 1 ? name : name + "s";
		};
		var data = this.generator.getResults().map(usersToNames).toString();
		var winner, runnerUp;

		if (data.indexOf(',') >= 0) {
			data = data.split(',');
			winner = data[0];
			if (data[1]) runnerUp = data[1];
		} else {
			winner = data;
		}

		var wid = toId(winner);
		var rid = toId(runnerUp);
		var tourSize = this.generator.users.size;

		if (this.room.isOfficial && tourSize >= sizeRequiredToEarn) {
			var firstMoney = Math.round(tourSize / 4);
			var secondMoney = Math.round(firstMoney / 2);

			Database.read('money', wid, function (err, amount) {
				if (err) throw err;
				if (!amount) amount = 0;
				Database.write('money', amount + firstMoney, wid, function (err) {
					if (err) throw err;
				});
			});
			this.room.addRaw("<b><font color='" + color + "'>" + Tools.escapeHTML(winner) + "</font> has won " + "<font color='" + color + "'>" + firstMoney + "</font>" + currencyName(firstMoney) + " for winning the tournament!</b>");

			if (runnerUp) {
				Database.read('money', rid, function (err, amount) {
					if (err) throw err;
					if (!amount) amount = 0;
					Database.write('money', amount + secondMoney, rid, function (err) {
						if (err) throw err;
					});
				});
				this.room.addRaw("<b><font color='" + color + "'>" + Tools.escapeHTML(runnerUp) + "</font> has won " +  "<font color='" + color + "'>" + secondMoney + "</font>" + currencyName(secondMoney) + " for winning the tournament!</b>");
			}
		}
	};

	return Tournament;
})();

var commands = {
	basic: {
		j: 'join',
		in: 'join',
		join: function (tournament, user) {
			tournament.addUser(user, false, this);
		},
		l: 'leave',
		out: 'leave',
		leave: function (tournament, user) {
			if (tournament.isTournamentStarted) {
				tournament.disqualifyUser(user, this);
			} else {
				tournament.removeUser(user, this);
			}
		},
		getusers: function (tournament) {
			if (!this.canBroadcast()) return;
			var users = usersToNames(tournament.generator.getUsers(true).sort());
			this.sendReplyBox("<strong>" + users.length + " users remain in this tournament:</strong><br />" + Tools.escapeHTML(users.join(", ")));
		},
		getupdate: function (tournament, user) {
			tournament.updateFor(user);
			this.sendReply("Your tournament bracket has been updated.");
		},
		challenge: function (tournament, user, params, cmd) {
			if (params.length < 1) {
				return this.sendReply("Usage: " + cmd + " <user>");
			}
			var targetUser = Users.get(params[0]);
			if (!targetUser) {
				return this.sendReply("User " + params[0] + " not found.");
			}
			tournament.challenge(user, targetUser, this);
		},
		cancelchallenge: function (tournament, user) {
			tournament.cancelChallenge(user, this);
		},
		acceptchallenge: function (tournament, user) {
			tournament.acceptChallenge(user, this);
		}
	},
	creation: {
		settype: function (tournament, user, params, cmd) {
			if (params.length < 1) {
				return this.sendReply("Usage: " + cmd + " <type> [, <comma-separated arguments>]");
			}
			var playerCap = parseInt(params.splice(1, 1));
			var generator = createTournamentGenerator(params.shift(), params, this);
			if (generator && tournament.setGenerator(generator, this)) {
				if (playerCap && playerCap >= 2) {
					tournament.playerCap = playerCap;
					if (Config.tournamentDefaultPlayerCap && tournament.playerCap > Config.tournamentDefaultPlayerCap) {
						ResourceMonitor.log('[ResourceMonitor] Room ' + tournament.room.id + ' starting a tour over default cap (' + tournament.playerCap + ')');
					}
				}
				this.sendReply("Tournament set to " + generator.name + (playerCap ? " with a player cap of " + tournament.playerCap : "") + ".");
			}
		},
		begin: 'start',
		start: function (tournament, user) {
			if (tournament.startTournament(this)) {
				this.sendModCommand("(" + user.name + " started the tournament.)");
			}
		}
	},
	moderation: {
		dq: 'disqualify',
		disqualify: function (tournament, user, params, cmd) {
			if (params.length < 1) {
				return this.sendReply("Usage: " + cmd + " <user>");
			}
			var targetUser = Users.get(params[0]);
			if (!targetUser) {
				return this.sendReply("User " + params[0] + " not found.");
			}
			var reason = '';
			if (params[1]) {
				reason = params[1].trim();
				if (reason.length > MAX_REASON_LENGTH) return this.sendReply("The reason is too long. It cannot exceed " + MAX_REASON_LENGTH + " characters.");
			}
			if (tournament.disqualifyUser(targetUser, this, reason)) {
				this.privateModCommand("(" + targetUser.name + " was disqualified from the tournament by " + user.name + (reason ? " (" + reason + ")" : "") + ")");
			}
		},
		autostart: 'setautostart',
		setautostart: function (tournament, user, params, cmd) {
			if (params.length < 1) {
				return this.sendReply("Usage: " + cmd + " <minutes|off>");
			}
			if (params[0].toLowerCase() === 'infinity' || params[0] === '0') params[0] = 'off';
			var timeout = params[0].toLowerCase() === 'off' ? Infinity : params[0];
			if (tournament.setAutoStartTimeout(timeout * 60 * 1000, this)) {
				this.privateModCommand("(The tournament auto start timeout was set to " + params[0] + " by " + user.name + ")");
			}
		},
		autodq: 'setautodq',
		setautodq: function (tournament, user, params, cmd) {
			if (params.length < 1) {
				return this.sendReply("Usage: " + cmd + " <minutes|off>");
			}
			if (params[0].toLowerCase() === 'infinity' || params[0] === '0') params[0] = 'off';
			var timeout = params[0].toLowerCase() === 'off' ? Infinity : params[0];
			if (tournament.setAutoDisqualifyTimeout(timeout * 60 * 1000, this)) {
				this.privateModCommand("(The tournament auto disqualify timeout was set to " + params[0] + " by " + user.name + ")");
			}
		},
		runautodq: function (tournament) {
			tournament.runAutoDisqualify(this);
		},
		scout: 'setscouting',
		scouting: 'setscouting',
		setscout: 'setscouting',
		setscouting: function (tournament, user, params, cmd) {
			if (params.length < 1) {
				if (tournament.scouting) {
					return this.sendReply("This tournament allows spectating other battles while in a tournament.");
				} else {
					return this.sendReply("This tournament disallows spectating other battles while in a tournament.");
				}
			}

			var option = params[0].toLowerCase();
			if (option === 'on' || option === 'true' || option === 'allow' || option === 'allowed')  {
				tournament.scouting = true;
				this.room.add('|tournament|scouting|allow');
				this.privateModCommand("(The tournament was set to allow scouting by " + user.name + ")");
			} else if (option === 'off' || option === 'false' || option === 'disallow' || option === 'disallowed') {
				tournament.scouting = false;
				this.room.add('|tournament|scouting|disallow');
				this.privateModCommand("(The tournament was set to disallow scouting by " + user.name + ")");
			} else {
				return this.sendReply("Usage: " + cmd + " <allow|disallow>");
			}
		},
		end: 'delete',
		stop: 'delete',
		delete: function (tournament, user) {
			if (deleteTournament(tournament.room.id, this)) {
				this.privateModCommand("(" + user.name + " forcibly ended a tournament.)");
			}
		}
	}
};

CommandParser.commands.tour = 'tournament';
CommandParser.commands.tours = 'tournament';
CommandParser.commands.tournaments = 'tournament';
CommandParser.commands.tournament = function (paramString, room, user) {
	var cmdParts = paramString.split(' ');
	var cmd = cmdParts.shift().trim().toLowerCase();
	var params = cmdParts.join(' ').split(',').map(function (param) { return param.trim(); });
	if (!params[0]) params = [];

	if (cmd === '') {
		if (!this.canBroadcast()) return;
		this.sendReply('|tournaments|info|' + JSON.stringify(Object.keys(exports.tournaments).filter(function (tournament) {
			tournament = exports.tournaments[tournament];
			return !tournament.room.isPrivate && !tournament.room.staffRoom;
		}).map(function (tournament) {
			tournament = exports.tournaments[tournament];
			return {room: tournament.room.title, format: tournament.format, generator: tournament.generator.name, isStarted: tournament.isTournamentStarted};
		})));
	} else if (cmd === 'help') {
		return this.parse('/help tournament');
	} else if (cmd === 'on' || cmd === 'enable') {
		if (!this.can('tournamentsmanagement', null, room)) return;
		if (room.toursEnabled) {
			return this.sendReply("Tournaments are already enabled.");
		}
		room.toursEnabled = true;
		if (room.chatRoomData) {
			room.chatRoomData.toursEnabled = true;
			Rooms.global.writeChatRoomData();
		}
		return this.sendReply("Tournaments enabled.");
	} else if (cmd === 'off' || cmd === 'disable') {
		if (!this.can('tournamentsmanagement', null, room)) return;
		if (!room.toursEnabled) {
			return this.sendReply("Tournaments are already disabled.");
		}
		delete room.toursEnabled;
		if (room.chatRoomData) {
			delete room.chatRoomData.toursEnabled;
			Rooms.global.writeChatRoomData();
		}
		return this.sendReply("Tournaments disabled.");
	} else if (cmd === 'create' || cmd === 'new') {
		if (room.toursEnabled) {
			if (!this.can('tournaments', null, room)) return;
		} else {
			if (!user.can('tournamentsmanagement', null, room)) {
				return this.sendReply("Tournaments are disabled in this room (" + room.id + ").");
			}
		}
		if (params.length < 2) {
			return this.sendReply("Usage: " + cmd + " <format>, <type> [, <comma-separated arguments>]");
		}

		var tour = createTournament(room, params.shift(), params.shift(), params.shift(), Config.istournamentsrated, params, this);
		if (tour) {
			this.privateModCommand("(" + user.name + " created a tournament in " + tour.format + " format.)");
			if (Config.tourannouncements && Config.tourannouncements.indexOf(room.id) >= 0) {
				var tourRoom = Rooms.search(Config.tourroom || 'tournaments');
				if (tourRoom) tourRoom.addRaw('<div class="infobox"><a href="/' + room.id + '" class="ilink"><b>' + Tools.getFormat(tour.format).name + '</b> tournament created in <b>' + room.title + '</b>.</a></div>');
			}
		}
	} else {
		var tournament = getTournament(room.id);
		if (!tournament) {
			return this.sendReply("There is currently no tournament running in this room.");
		}

		var commandHandler = null;
		if (commands.basic[cmd]) {
			commandHandler = typeof commands.basic[cmd] === 'string' ? commands.basic[commands.basic[cmd]] : commands.basic[cmd];
		}

		if (commands.creation[cmd]) {
			if (room.toursEnabled) {
				if (!this.can('tournaments', null, room)) return;
			} else {
				if (!user.can('tournamentsmanagement', null, room)) {
					return this.sendReply("Tournaments are disabled in this room (" + room.id + ").");
				}
			}
			commandHandler = typeof commands.creation[cmd] === 'string' ? commands.creation[commands.creation[cmd]] : commands.creation[cmd];
		}

		if (commands.moderation[cmd]) {
			if (!user.can('tournamentsmoderation', null, room)) {
				return this.sendReply(cmd + " -  Access denied.");
			}
			commandHandler = typeof commands.moderation[cmd] === 'string' ? commands.moderation[commands.moderation[cmd]] : commands.moderation[cmd];
		}

		if (!commandHandler) {
			this.sendReply(cmd + " is not a tournament command.");
		} else {
			commandHandler.call(this, tournament, user, params, cmd);
		}
	}
};
CommandParser.commands.tournamenthelp = function (target, room, user) {
	if (!this.canBroadcast()) return;
	return this.sendReplyBox(
		"- create/new &lt;format>, &lt;type> [, &lt;comma-separated arguments>]: Creates a new tournament in the current room.<br />" +
		"- settype &lt;type> [, &lt;comma-separated arguments>]: Modifies the type of tournament after it's been created, but before it has started.<br />" +
		"- end/stop/delete: Forcibly ends the tournament in the current room.<br />" +
		"- begin/start: Starts the tournament in the current room.<br />" +
		"- dq/disqualify &lt;user>: Disqualifies a user.<br />" +
		"- autodq/setautodq &lt;minutes|off>: Sets the automatic disqualification timeout.<br />" +
		"- runautodq: Manually run the automatic disqualifier.<br />" +
		"- scouting: Specifies whether joining tournament matches while in a tournament is allowed.<br />" +
		"- getusers: Lists the users in the current tournament.<br />" +
		"- on/off: Enables/disables allowing mods to start tournaments.<br />" +
		"More detailed help can be found <a href=\"https://gist.github.com/verbiage/0846a552595349032fbe\">here</a>"
	);
};

exports.Tournament = Tournament;
exports.TournamentGenerators = TournamentGenerators;

exports.createTournament = createTournament;
exports.deleteTournament = deleteTournament;
exports.get = getTournament;

exports.commands = commands;
