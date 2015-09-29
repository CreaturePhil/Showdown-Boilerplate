//Tic Tac Toe by SilverTactic (Siiilver)
if (!global.ttt) global.ttt = [{}, {}];
var tttgames = global.ttt[0];
var tttplayers = global.ttt[1];

const EXPIRATION_TIME = 90 * 1000;
const INACTIVE_KICK_TIME = 30 * 1000;

var TicTacToe = (function () {
	function TicTacToe(user1, user2, gameNo) {
		this.gameNo = gameNo;
		this.p1 = user1;
		this.p2 = user2;
		this.players = [this.p1, this.p2];
		this.checkPlayer = function (user) {
			if (this.p1.userid === user.userid) return this.p2.name;
			if (this.p2.userid === user.userid) return this.p1.name;
			return false;
		}.bind(this);
		this.markers = {};
		this.markers[this.p1.userid] = 'X';
		this.boxes = {
			'1': 1,
			'2': 2,
			'3': 3,
			'4': 4,
			'5': 5,
			'6': 6,
			'7': 7,
			'8': 8,
			'9': 9
		};
		this.markedCount = 0;
		this.phase = 'waiting';
		this.timer = setTimeout(this.end.bind(this, 'The game request has expired.'), EXPIRATION_TIME);
	}

	TicTacToe.prototype.accept = function () {
		this.markers[this.p2.userid] = 'O';
		this.currentPlayer = this.players[Math.floor(Math.random() * 2)];
		this.phase = 'started';
		this.resetTimer();
		var message = 'If you accidentally close out, use <em>/ttt open</em> to reopen the game.';
		this.updateUser(this.p1, message);
		this.updateUser(this.p2, message);
	};

	TicTacToe.prototype.switchPlayer = function () {
		if (this.currentPlayer === this.p1) this.currentPlayer = this.p2;
		else this.currentPlayer = this.p1;
	};

	TicTacToe.prototype.getGrid = function (gameOver) {
		var marked = [];
		for (var i in this.boxes) {
			if (typeof this.boxes[i] === 'string') marked.push(this.boxes[i]);
			else marked.push('<button style = "height: 80px%; width: 80px; font-size: 20pt" name = "send" value = "/ttt markbox ' + i + '"><b>' + i + '</b></button>');
		}
		var style = 'width: 100px; height: 100px; font-size: 20pt; ';
		var grid = '<table cellspacing = "0">' +
			//row 1
			'<tr><th style = "' + style + ' border-right: 3px solid; border-bottom: 3px solid;"><center>' + marked[0] + '</center></td>' +
			'<th style = "' + style + ' border-bottom: 3px solid;"><center>' + marked[1] + '</center></th>' +
			'<th style = "' + style + ' border-left: 3px solid; border-bottom: 3px solid;"><center>' + marked[2] + '</center></th></tr>' +
			//row 2
			'<tr><th style = "' + style + ' border-right: 3px solid;"><center>' + marked[3] + '</center></th>' +
			'<th style = "' + style + '"><center>' + marked[4] + '</center></th>' +
			'<th style = "' + style + ' border-left: 3px solid;"><center>' + marked[5] + '</center></th></tr>' +
			//row 3
			'<tr><th style = "' + style + ' border-right: 3px solid; border-top: 3px solid;"><center>' + marked[6] + '</center></th>' +
			'<th style = "' + style + ' border-top: 3px solid;"><center>' + marked[7] + '</center></th>' +
			'<th style = "' + style + ' border-left: 3px solid; border-top: 3px solid;"><center>' + marked[8] + '</center></th></tr></table><br>';
		if (!gameOver) grid += '<button name = "send" value = "/ttt end"><small>End Game</small></button>';
		return grid;
	};

	TicTacToe.prototype.markBox = function (user, num) {
		if (this.currentPlayer.userid !== user.userid) return this.updateUser(user, 'It isn\'t your turn right now.');
		if (!num || num.length > 1 || num.match(/[^1-9]/g)) return this.updateUser(user, 'That is not a valid box number.');
		if (typeof this.boxes[num] === 'string') return this.updateUser(user, 'That box has already been marked.');
		this.boxes[num] = this.markers[this.currentPlayer.userid];
		this.markedCount++;
		if (!this.checkWinner()) {
			this.resetTimer();
			this.switchPlayer();
			this.update();
		}
	};

	TicTacToe.prototype.update = function () {
		var message = '|html|<center><b>' + this.currentPlayer.name + '\'s turn!</b><br/>' + this.getGrid();
		this.players.forEach(function (user) {
			user.popup(message);
		});
	};

	TicTacToe.prototype.updateUser = function (user, issue) {
		var message = '|html|<center><b>' + this.currentPlayer.name + '\'s turn!</b><br>' +
			this.getGrid() + (issue ? '<br>' + issue : '');
		user.popup(message);
	};

	TicTacToe.prototype.checkWinner = function () {
		if ((this.boxes['1'] === this.boxes['2'] && this.boxes['2'] === this.boxes['3']) || (this.boxes['4'] === this.boxes['5'] && this.boxes['5'] === this.boxes['6']) || (this.boxes['7'] === this.boxes['8'] && this.boxes['8'] === this.boxes['9']) || (this.boxes['1'] === this.boxes['4'] && this.boxes['4'] === this.boxes['7']) || (this.boxes['2'] === this.boxes['5'] && this.boxes['5'] === this.boxes['8']) || (this.boxes['3'] === this.boxes['4'] && this.boxes['6'] === this.boxes['9']) || (this.boxes['1'] === this.boxes['5'] && this.boxes['5'] === this.boxes['9']) || (this.boxes['3'] === this.boxes['5'] && this.boxes['5'] === this.boxes['7'])) {
			this.declareWinner();
			return true;
		}
		if (this.markedCount === 9) {
			this.declareDraw();
			return true;
		}
	};

	TicTacToe.prototype.declareDraw = function () {
		var message = '|html|<center><b>Draw between ' + this.p1.name + ' and ' + this.p2.name + '!</b><br>' + this.getGrid(true);
		this.players.forEach(function (user) {
			user.popup(message);
		});
		this.end();
	};

	TicTacToe.prototype.declareWinner = function () {
		var message = '|html|<center><b>' + this.currentPlayer.name + ' has won the game!</b><br/>' + this.getGrid(true);
		this.players.forEach(function (user) {
			user.popup(message);
		});
		this.end();
	};

	TicTacToe.prototype.end = function (message) {
		if (message) {
			if (this.phase === 'waiting') this.players.forEach(function (user) {
				user.send('|pm|' + this.p2.getIdentity() + '|' + this.p1.getIdentity() + '|/html <div class="message-error">' + message + '</div>');
			});
			else this.players.forEach(function (user) {
				user.popup(message);
			});
		}
		clearTimeout(this.timer);
		delete tttplayers[this.p1.userid];
		delete tttplayers[this.p2.userid];
		delete tttgames[this.gameNo];
	};

	TicTacToe.prototype.resetTimer = function () {
		clearTimeout(this.timer);
		this.timer = setTimeout(this.end.bind(this, 'The game has been ended due to player inactivity.'), INACTIVE_KICK_TIME);
	};

	return TicTacToe;
})();

var cmds = {
	'': 'help',
	help: function (target, room, user) {
		this.sendReplyBox('<b>Tic-Tac-Toe commands</b><br>' +
			'<li>/ttt c <em>User</em> - Sends a user a request to play Tic-Tac-Toe. This can also be used in PMs. (Requests automatically expire if they\'re not accepted or declined within 1.5 minutes.)<br>' +
			'<li>/ttt accept <em>User</em>  - Accepts a Tic-Tac-Toe request from a user.<br>' +
			'<li>/ttc decline <em>User</em> - Declines a Tic-Tac-Toe request from a user.<br>' +
			'<li>/ttc see or /ttt show - Opens up the Tic-Tac-Toe board, in case you accidentally closed it out.<br>' +
			'<li>/ttc end - Exits the current game of Tic-Tac-Toe. Cancels a play request if the game hasn\'t been started yet. (Note: The game automatically ends after a user stays inactive for more than 30 seconds.)<br>'
		);
	},

	chall: 'c',
	challenge: 'c',
	play: 'c',
	c: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Challenges a user to a game of Tic-Tac-Toe.');
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid === target.userid) return this.sendReply('You can\'t play Tic-Tac-Toe with yourself!');
		if (user.userid in tttplayers) {
			var game = tttgames[tttplayers[user.userid]];
			if (game.phase === 'waiting') return this.sendReply('You have already requested ' + game.checkPlayer(user) + ' to a game of Tic-Tac-Toe. Wait for their response.');
			if (game.checkPlayer(target)) return this.sendReply('You are already playing Tic-Tac-Toe with ' + target.name + '!');
			return this.sendReply('You are already playing Tic-Tac-Toe with another user. You cannot ' + target.name + ' a request.');
		}
		if (target.userid in tttplayers) {
			var game = tttgames[tttplayers[target.userid]];
			if (game.checkPlayer(user)) return this.sendReply(game.checkPlayer(user) + ' has already sent you a request...');
			return this.sendReply(target.name + ' has already asked someone else for a game of Tic-Tac-Toe.');
		}
		for (var i in tttgames)
			if (tttgames[i].checkPlayer(user)) return this.sendReply('You were sent a game request by ' + tttgames[i].checkPlayer(user) + '. First respond to that request before challenging someone else.');
		target.send('|pm|' + user.getIdentity() + '|' + target.getIdentity() + '|/html ' + user.getIdentity() + ' wants to play Tic-Tac-Toe!<br>' +
			'<button name = "send" value = "/ttt accept ' + user.userid + '">Accept</button> <button name = "send" value = "/ttt decline ' + user.userid + '">Decline</button>'
		);
		user.send('|pm|' + target.getIdentity() + '|' + user.getIdentity() + '|/html You have challenged ' + target.getIdentity() + ' to a game of Tic-Tac-Toe. Waiting for their response...');
		var gameId = tttplayers[user.userid] = (Object.keys(tttgames).length ? Object.keys(tttgames).length - 1 : 0);
		tttgames[gameId] = new TicTacToe(user, target, gameId);
	},

	acc: 'accept',
	accept: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Accepts a Tic-Tac-Toe challenge from a user.');
		var game = tttgames[tttplayers[user.userid]];
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid in tttplayers) {
			if (game.phase === 'waiting') return this.sendReply('You have already challenged someone else to a game of Tic-Tac-Toe. You cannot accept this user\'s challenge.');
			if (game.checkPlayer(target)) return this.sendReply(game.checkPlayer(user) + ' is playing with you right now!');
			return this.sendReply('You are already playing Tic-Tac-Toe with someone else. You cannot accept ' + target.name + 's request.');
		}
		if (user.userid === target.userid) return this.sendReply('You can\'t accept a challenge from yourself!');
		if (!(target.userid in tttplayers)) return this.sendReply(target.name + ' has not challenged you to a game of Tic-Tac-Toe.');

		game = tttgames[tttplayers[target.userid]];
		if (game.p2.userid !== user.userid) return this.sendReply(target.name + ' has not challenged you to a game of Tic-Tac-Toe.');
		tttplayers[user.userid] = tttplayers[target.userid];
		game.accept();
	},

	dec: 'decline',
	decline: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Declines a Tic-Tac-Toe challenge from a user.');
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid === target.userid) return this.sendReply('You can\'t use this command on yourself.');
		var game = tttgames[tttplayers[toId(targetUser)]];
		if (!(target.userid in tttplayers) || !game.checkPlayer(target)) return this.sendReply(target + ' has not challenged you to a game of Tic-Tac-Toe.');
		if (game.checkPlayer(target) && game.phase == 'started') return this.sendReply('You are playing with ' + game.checkPlayer(user) + ' right now. If you want to end the game, use /ttt end.');

		if (Users.get(target) && Users.get(target).connected) Users.get(target).send('|pm|' + user.getIdentity() + '|' + Users.get(target).getIdentity() + '|/error Your Tic-Tac-Toe request was declined.');
		user.send('|pm|' + Users.get(target) + '|' + user.getIdentity() + '|/error You have declined the game request.');

		game.end();
	},

	mark: 'markbox',
	markbox: function (target, room, user, connection, cmd) {
		if (!(user.userid in tttplayers)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now.');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') return this.sendReply('The request has not been accepted yet. You can only use this command in an active game.');
		game.markBox(user, target);
	},

	update: 'see',
	view: 'see',
	show: 'see',
	see: function (target, room, user) {
		if (!(user.userid in tttplayers)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now.');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') return this.sendReply('The request has not been accepted yet. You can only use this command in an active game.');
		game.update();
	},

	exit: 'end',
	leave: 'end',
	end: function (target, room, user) {
		if (!(user.userid in tttplayers)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now.');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') game.end('The request was withdrawn.');
		else game.end(user.name + ' has decided to leave the game midway.');
	}
};

exports.commands = {
	ttt: 'tictactoe',
	tictactoe: cmds,
	tttend: 'endttt',
	endttt: cmds.end,

	//PM command override
	pm: 'msg',
	whisper: 'msg',
	w: 'msg',
	msg: function (target, room, user, connection) {
		if (!target) return this.parse('/help msg');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help msg');
		}
		this.pmTarget = (targetUser || this.targetUsername);
		if (!targetUser || !targetUser.connected) {
			if (targetUser && !targetUser.connected) {
				this.errorReply("User " + this.targetUsername + " is offline.");
				return;
			} else {
				this.errorReply("User " + this.targetUsername + " not found. Did you misspell their name?");
				return this.parse('/help msg');
			}
			return;
		}

		if (Config.pmmodchat) {
			var userGroup = user.group;
			if (Config.groupsranking.indexOf(userGroup) < Config.groupsranking.indexOf(Config.pmmodchat)) {
				var groupName = Config.groups[Config.pmmodchat].name || Config.pmmodchat;
				this.errorReply("Because moderated chat is set, you must be of rank " + groupName + " or higher to PM users.");
				return false;
			}
		}

		if (user.locked && !targetUser.can('lock')) {
			return this.errorReply("You can only private message members of the moderation team (users marked by %, @, &, or ~) when locked.");
		}
		if (targetUser.locked && !user.can('lock')) {
			return this.errorReply("This user is locked and cannot PM.");
		}
		if (targetUser.ignorePMs && targetUser.ignorePMs !== user.group && !user.can('lock')) {
			if (!targetUser.can('lock')) {
				return this.errorReply("This user is blocking private messages right now.");
			} else if (targetUser.can('bypassall')) {
				return this.errorReply("This admin is too busy to answer private messages right now. Please contact a different staff member.");
			}
		}
		if (user.ignorePMs && user.ignorePMs !== targetUser.group && !targetUser.can('lock')) {
			return this.errorReply("You are blocking private messages right now.");
		}

		target = this.canTalk(target, null, targetUser);
		if (!target) return false;

		if (target.charAt(0) === '/' && target.charAt(1) !== '/') {
			// PM command
			var innerCmdIndex = target.indexOf(' ');
			var innerCmd = (innerCmdIndex >= 0 ? target.slice(1, innerCmdIndex) : target.slice(1));
			var innerTarget = (innerCmdIndex >= 0 ? target.slice(innerCmdIndex + 1) : '');
			switch (innerCmd) {
			case 'me':
			case 'mee':
			case 'announce':
				break;
			case 'tictactoe':
			case 'ttt':
				return this.parse('/ttt c ' + targetUser.userid);
				break;
			case 'invite':
			case 'inv':
				var targetRoom = Rooms.search(innerTarget);
				if (!targetRoom || targetRoom === Rooms.global) return this.errorReply('The room "' + innerTarget + '" does not exist.');
				if (targetRoom.staffRoom && !targetUser.isStaff) return this.errorReply('User "' + this.targetUsername + '" requires global auth to join room "' + targetRoom.id + '".');
				if (targetRoom.isPrivate === true && targetRoom.modjoin && targetRoom.auth) {
					if (Config.groupsranking.indexOf(targetRoom.auth[targetUser.userid] || ' ') < Config.groupsranking.indexOf(targetRoom.modjoin) && !targetUser.can('bypassall')) {
						return this.errorReply('The room "' + innerTarget + '" does not exist.');
					}
				}
				if (targetRoom.modjoin) {
					if (targetRoom.auth && (targetRoom.isPrivate === true || targetUser.group === ' ') && !(targetUser.userid in targetRoom.auth)) {
						this.parse('/roomvoice ' + targetUser.name, false, targetRoom);
						if (!(targetUser.userid in targetRoom.auth)) {
							return;
						}
					}
				}

				target = '/invite ' + targetRoom.id;
				break;
			default:
				return this.errorReply("The command '/" + innerCmd + "' was unrecognized or unavailable in private messages. To send a message starting with '/" + innerCmd + "', type '//" + innerCmd + "'.");
			}
		}

		var message = '|pm|' + user.getIdentity() + '|' + targetUser.getIdentity() + '|' + target;
		user.send(message);
		if (targetUser !== user) targetUser.send(message);
		targetUser.lastPM = user.userid;
		user.lastPM = targetUser.userid;
	}
}
