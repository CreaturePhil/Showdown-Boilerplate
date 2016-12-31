/**
* Wi-Fi chat-plugin. Only works in a room with id 'wifi'
* Handles giveaways in the formats: question, lottery
* Credits: Codelegend, SilverTactic, DanielCranham, bumbadadabum
**/

'use strict';

Punishments.roomPunishmentTypes.set('GIVEAWAYBAN', 'banned from giveaways');

const BAN_DURATION = 7 * 24 * 60 * 60 * 1000;

function checkPlural(variable, plural, singular) {
	if (!plural) plural = 's';
	if (!singular) singular = '';
	return ((variable.length || variable) > 1 ? plural : singular);
}

class Giveaway {
	constructor(host, giver, room, prize) {
		if (room.gaNumber) {
			room.gaNumber++;
		} else {
			room.gaNumber = 1;
		}
		this.host = host;
		this.giver = giver;
		this.room = room;
		this.prize = prize;
		this.phase = 'pending';

		this.joined = {};

		this.sprite = Giveaway.getSprite(prize);
	}

	send(content) {
		this.room.add(`|uhtml|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${content}</div>`);
		this.room.update();
	}

	changeUhtml(content) {
		this.room.add(`|uhtmlchange|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${content}</div>`);
		this.room.update();
	}

	clearTimer() {
		if (this.timer) {
			clearTimeout(this.timer);
			delete this.timer;
		}
	}

	checkJoined(user) {
		for (let ip in this.joined) {
			if (user.latestIp === ip) return ip;
			if (this.joined[ip] in user.prevNames) return this.joined[ip];
		}
		return false;
	}

	kickUser(user) {
		for (let ip in this.joined) {
			if (user.latestIp === ip || this.joined[ip] in user.prevNames) {
				if (this.generateReminder) user.sendTo(this.room, `|uhtmlchange|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${this.generateReminder()}</div>`);
				delete this.joined[ip];
			}
		}
	}

	checkExcluded(user) {
		if (Giveaway.checkBanned(this.room, user)) return true;
		if (user === this.giver || user.latestIp in this.giver.ips || toId(user) in this.giver.prevNames) return true;
		if (user === this.host || user.latestIp in this.host.ips || toId(user) in this.host.prevNames) return true;
		return false;
	}

	static checkBanned(room, user) {
		return Punishments.getRoomPunishType(room, toId(user)) === 'GIVEAWAYBAN';
	}

	static ban(room, user, reason) {
		Punishments.roomPunish(room, user, ['GIVEAWAYBAN', toId(user), Date.now() + BAN_DURATION, reason]);
	}

	static unban(room, user) {
		Punishments.roomUnpunish(room, toId(user), 'GIVEAWAYBAN');
	}

	static getSprite(text) {
		text = text.toLowerCase();
		let mons = new Map();
		let output = '';
		for (let i in Tools.data.Pokedex) {
			let regexp = new RegExp(`\\b${i}\\b`);
			if (regexp.test(text)) {
				let mon = Tools.getTemplate(i);
				mons.set(mon.baseSpecies, mon);
			}
		}
		// the previous regex doesn't match "nidoran-m" or "nidoran male"
		if (/\bnidoran\W{0,1}m(ale){0,1}\b/.test(text)) {
			mons.set('nidoranm', Tools.getTemplate('nidoranm'));
		}
		if (/\bnidoran\W{0,1}f(emale){0,1}\b/.test(text)) {
			mons.set('nidoranf', Tools.getTemplate('nidoranf'));
		}
		text = toId(text);
		if (mons.size) {
			mons.forEach(function (value, key) {
				let spriteid = value.spriteid;
				if (value.otherForms) {
					for (let i = 0; i < value.otherForms.length; i++) {
						if (text.includes(value.otherForms[i])) {
							spriteid += '-' + value.otherForms[i].substr(key.length);
							break; // We don't want to end up with deerling-summer-spring
						}
					}
				}
				if (value.otherFormes) {
					for (let i = 0; i < value.otherFormes.length; i++) {
						// Hardcore Alolan formes.
						if (value.otherFormes[i].endsWith('alolan')) {
							if (/alolan?/.test(text)) {
								spriteid += '-alolan';
								break;
							}
						}
						if (text.includes(value.otherFormes[i])) {
							spriteid += '-' + value.otherFormes[i].substr(key.length);
							break; // We don't want to end up with landorus-therian-therian
						}
					}
				}
				if (mons.size > 1) {
					let top = Math.floor(value.num / 12) * 30;
					let left = (value.num % 12) * 40;
					output += `<div style="display:inline-block;width:40px;height:30px;background:transparent url('/sprites/smicons-sheet.png?a1') no-repeat scroll -${left}px -${top}px'"></div>`;
				} else {
					let shiny = (text.includes("shiny") && !text.includes("shinystone") ? '-shiny' : '');
					output += `<img src="/sprites/xyani${shiny}/${spriteid}.gif">`;
				}
			});
		}
		return output;
	}

	generateWindow(rightSide) {
		return `<p style="text-align:center;font-size:14pt;font-weight:bold;margin-bottom:2px;">It's giveaway time!</p>` +
			`<p style="text-align:center;font-size:7pt;">Giveaway started by ${Chat.escapeHTML(this.host.name)}</p>` +
			`<table style="margin-left:auto;margin-right:auto;"><tr><td style="text-align:center;width:45%">${this.sprite}<p style="font-weight:bold;">Giver: ${this.giver}</p>${Chat.escapeHTML(this.prize)}</td>` +
			`<td style="text-align:center;width:45%">${rightSide}</td></tr></table><p style="text-align:center;font-size:7pt;font-weight:bold;"><u>Note:</u> Please do not join if you don't have a 3DS and a copy of the relevant game.</p>`;
	}
}

class QuestionGiveaway extends Giveaway {
	constructor(host, giver, room, prize, question, answers) {
		super(host, giver, room, prize);
		this.type = 'question';

		this.question = question;
		this.answers = QuestionGiveaway.sanitizeAnswers(answers);
		this.answered = {}; // userid: number of guesses

		this.send(this.generateWindow('The question will be displayed in one minute! Use /ga to answer.'));

		this.timer = setTimeout(() => this.start(), 1000 * 60);
	}

	generateQuestion() {
		return this.generateWindow(`<p style="text-align:center;font-size:13pt;">Giveaway Question: <b>${this.question}</b></p><p style="text-align:center;">use /ga to guess.</p>`);
	}

	start() {
		this.changeUhtml('<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway has started! Scroll down to see the question.</p>');
		this.phase = 'started';
		this.send(this.generateQuestion());
		this.timer = setTimeout(() => this.end(), 1000 * 60 * 5);
	}

	guessAnswer(user, guess) {
		if (this.phase !== 'started') return user.sendTo(this.room, "The giveaway has not started yet.");

		if (this.checkJoined(user) && Object.values(this.joined).indexOf(user.userid) < 0) return user.sendTo(this.room, "You have already joined the giveaway.");
		if (this.checkExcluded(user)) return user.sendTo(this.room, "You are disallowed from entering the giveaway.");

		if (!this.answered[user.userid]) this.answered[user.userid] = 0;
		if (this.answered[user.userid] >= 3) return user.sendTo(this.room, "You have already guessed three times. You cannot guess anymore in this giveaway.");

		for (let i = 0; i < this.answers.length; i++) {
			if (toId(this.answers[i]) === toId(guess)) {
				this.winner = user;
				this.clearTimer();
				return this.end();
			}
		}

		this.joined[user.latestIp] = user.userid;
		this.answered[user.userid]++;
		if (this.answered[user.userid] >= 3) {
			user.sendTo(this.room, `Your guess '${guess}' is wrong. You have used up all of your guesses. Better luck next time!`);
		} else {
			user.sendTo(this.room, `Your guess '${guess}' is wrong. Try again!`);
		}
	}

	change(key, value, user) {
		if (user.userid !== this.host.userid) return user.sendTo(this.room, "Only the host can edit the giveaway.");
		if (this.phase !== 'pending') return user.sendTo(this.room, "You cannot change the question or answer once the giveaway has started.");
		if (key === 'question') {
			this.question = value;
			return user.sendTo(this.room, `The question has been changed to ${value}.`);
		}
		let ans = QuestionGiveaway.sanitizeAnswers(value);
		if (!ans.length) return user.sendTo(this.room, "You must specify at least one answer and it must not contain any special characters.");
		this.answers = ans;
		user.sendTo(this.room, `The answer${checkPlural(ans, "s have", "has")} been changed to ${ans.join(', ')}.`);
	}

	end(force) {
		if (force) {
			this.clearTimer();
			this.changeUhtml('<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
			this.room.send("The giveaway was forcibly ended.");
		} else {
			if (!this.winner) {
				this.changeUhtml('<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
				this.room.send("The giveaway has been forcibly ended as no one has answered the question.");
			} else {
				this.changeUhtml('<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway has ended! Scroll down to see the answer.</p>');
				this.phase = 'ended';
				this.clearTimer();
				this.room.modlog(`${this.winner.name} won ${this.giver.name}'s giveaway for a "${this.prize}"`);
				this.send(this.generateWindow(`<p style="text-align:center;font-size:12pt;"><b>${Chat.escapeHTML(this.winner.name)}</b> won the giveaway! Congratulations!</p>` +
				`<p style="text-align:center;">${this.question}<br />Correct answer${checkPlural(this.answers)}: ${this.answers.join(', ')}</p>`));
				if (this.winner.connected) this.winner.popup(`You have won the giveaway. PM **${Chat.escapeHTML(this.giver.name)}** to claim your prize!`);
				if (this.giver.connected) this.giver.popup(`${Chat.escapeHTML(this.winner.name)} has won your question giveaway!`);
			}
		}

		delete this.room.giveaway;
	}

	static sanitizeAnswers(target) {
		let ret = [];
		for (let ans of target.split(",")) {
			ans = ans.replace(/[^a-z0-9 .-]+/ig, "").trim();
			if (!toId(ans)) continue;
			ret.push(ans);
		}
		return ret;
	}
}

class LotteryGiveaway extends Giveaway {
	constructor(host, giver, room, prize, winners) {
		super(host, giver, room, prize);

		this.type = 'lottery';

		this.maxwinners = winners || 1;

		this.send(this.generateReminder(false));

		this.timer = setTimeout(() => this.drawLottery(), 1000 * 60 * 2);
	}

	generateReminder(joined) {
		let cmd = (joined ? 'Leave' : 'Join');
		let button = `<button style="margin:4px;" name="send" value="/giveaway ${toId(cmd)}lottery"><font size=1><b>${cmd}</b></font></button>`;
		return this.generateWindow(`The lottery drawing will occur in 2 minutes, and with ${this.maxwinners} winner${checkPlural(this.maxwinners)}!<br />${button}</p>`);
	}

	display() {
		let joined = this.generateReminder(true);
		let notJoined = this.generateReminder();

		for (let i in this.room.users) {
			let thisUser = this.room.users[i];
			if (this.checkJoined(thisUser)) {
				thisUser.sendTo(this.room, `|uhtmlchange|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${joined}</div>`);
			} else {
				thisUser.sendTo(this.room, `|uhtmlchange|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${notJoined}</div>`);
			}
		}
	}

	addUser(user) {
		if (this.phase !== 'pending') return user.sendTo(this.room, "The join phase of the lottery giveaway has ended.");

		if (!user.named) return user.sendTo(this.room, "You need to choose a name before joining a lottery giveaway.");
		if (this.checkJoined(user)) return user.sendTo(this.room, "You have already joined the giveaway.");
		if (this.checkExcluded(user)) return user.sendTo(this.room, "You are disallowed from entering the giveaway.");

		this.joined[user.latestIp] = user.userid;
		user.sendTo(this.room, `|uhtmlchange|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${this.generateReminder(true)}</div>`);
		user.sendTo(this.room, "You have successfully joined the lottery giveaway.");
	}

	removeUser(user) {
		if (this.phase !== 'pending') return user.sendTo(this.room, "The join phase of the lottery giveaway has ended.");
		if (!this.checkJoined(user)) return user.sendTo(this.room, "You have not joined the lottery giveaway.");
		for (let ip in this.joined) {
			if (ip === user.latestIp || this.joined[ip] === user.userid) {
				delete this.joined[ip];
			}
		}
		user.sendTo(this.room, `|uhtmlchange|giveaway${this.room.gaNumber}${this.phase}|<div class="broadcast-blue">${this.generateReminder(false)}</div>`);
		user.sendTo(this.room, "You have left the lottery giveaway.");
	}

	drawLottery() {
		this.clearTimer();

		let userlist = Object.values(this.joined);
		if (userlist.length < this.maxwinners) {
			this.changeUhtml('<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
			delete this.room.giveaway;
			return this.room.send("The giveaway has been forcibly ended as there are not enough participants.");
		}

		this.winners = [];
		while (this.winners.length < this.maxwinners) {
			let winner = Users(userlist.splice(Math.floor(Math.random() * userlist.length), 1)[0]);
			if (!winner) continue;
			this.winners.push(winner);
		}
		this.end();
	}

	end(force) {
		if (force) {
			this.clearTimer();
			this.changeUhtml('<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
			this.room.send("The giveaway was forcibly ended.");
		} else {
			this.changeUhtml(`<p style="text-align:center;font-size:13pt;font-weight:bold;">The giveaway has ended! Scroll down to see the winner${checkPlural(this.winners)}.</p>`);
			this.phase = 'ended';
			let winnerNames = this.winners.map(winner => winner.name).join(', ');
			this.room.modlog(`${winnerNames} won ${this.giver.name}'s giveaway for "${this.prize}"`);
			this.send(this.generateWindow(`<p style="text-align:center;font-size:10pt;font-weight:bold;">Lottery Draw</p><p style="text-align:center;">${Object.keys(this.joined).length} users joined the giveaway.<br />Our lucky winner${checkPlural(this.winners)}: <b>${Chat.escapeHTML(winnerNames)}!</b> Congratulations!</p>`));
			for (let i = 0; i < this.winners.length; i++) {
				if (this.winners[i].connected) this.winners[i].popup(`You have won the lottery giveaway! PM **${this.giver.name}** to claim your prize!`);
			}
			if (this.giver.connected) this.giver.popup(`The following users have won your lottery giveaway:\n${Chat.escapeHTML(winnerNames)}`);
		}
		delete this.room.giveaway;
	}
}

let commands = {
	// question giveaway.
	quiz: 'question',
	qg: 'question',
	question: function (target, room, user) {
		if (room.id !== 'wifi' || !target) return false;
		if (room.giveaway) return this.errorReply("There is already a giveaway going on!");

		let params = target.split(target.includes('|') ? '|' : ',').map(param => param.trim());
		if (params.length < 4) return this.errorReply("Invalid arguments specified - /question giver, prize, question, answer(s)");
		let targetUser = Users(params[0]);
		if (!targetUser || !targetUser.connected) return this.errorReply(`User '${params[0]}' is not online.`);
		if (!this.can('warn', null, room) && !(this.can('broadcast', null, room) && user === targetUser)) return this.errorReply("Permission denied.");
		if (!targetUser.autoconfirmed) return this.errorReply(`User '${targetUser.name}' needs to be autoconfirmed to give something away.`);
		if (Giveaway.checkBanned(room, targetUser)) return this.errorReply(`User '${targetUser.name}' is giveaway banned.`);

		room.giveaway = new QuestionGiveaway(user, targetUser, room, params[1], params[2], params.slice(3).join(','));

		this.privateModCommand(`(${user.name} started a question giveaway for ${targetUser.name})`);
	},
	changeanswer: 'changequestion',
	changequestion: function (target, room, user, conn, cmd) {
		if (room.id !== 'wifi') return false;
		if (!room.giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (room.giveaway.type !== 'question') return this.errorReply("This is not a question giveaway.");

		target = target.trim();
		if (!target) return this.errorReply("You must include a question or an answer.");
		room.giveaway.change(cmd.substr(6), target, user);
	},
	showanswer: 'viewanswer',
	viewanswer: function (target, room, user) {
		if (room.id !== 'wifi') return false;
		let giveaway = room.giveaway;
		if (!giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (giveaway.type !== 'question') return this.errorReply("This is not a question giveaway.");
		if (user.userid !== giveaway.host.userid && user.userid !== giveaway.giver.userid) return;

		this.sendReply(`The giveaway question is ${giveaway.question}.\n` +
			`The answer${checkPlural(giveaway.answers, 's are', ' is')} ${giveaway.answers.join(', ')}.`);
	},
	guessanswer: 'guess',
	guess: function (target, room, user) {
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");
		if (!this.canTalk()) return;
		if (!room.giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (room.giveaway.type !== 'question') return this.errorReply("This is not a question giveaway.");
		room.giveaway.guessAnswer(user, target);
	},

	// lottery giveaway.
	lg: 'lottery',
	lotto: 'lottery',
	lottery: function (target, room, user) {
		if (room.id !== 'wifi' || !target) return false;
		if (room.giveaway) return this.errorReply("There is already a giveaway going on!");

		let params = target.split(target.includes('|') ? '|' : ',').map(param => param.trim());
		if (params.length < 2) return this.errorReply("Invalid arguments specified - /lottery giver, prize [, maxwinners]");
		let targetUser = Users(params[0]);
		if (!targetUser || !targetUser.connected) return this.errorReply(`User '${params[0]}' is not online.`);
		if (!this.can('warn', null, room) && !(this.can('broadcast', null, room) && user === targetUser)) return this.errorReply("Permission denied.");
		if (!targetUser.autoconfirmed) return this.errorReply(`User '${targetUser.name}' needs to be autoconfirmed to give something away.`);
		if (Giveaway.checkBanned(room, targetUser)) return this.errorReply(`User '${targetUser.name}' is giveaway banned.`);

		let numWinners = 1;
		if (params.length > 2) {
			numWinners = parseInt(params[2]);
			if (isNaN(numWinners) || numWinners < 1 || numWinners > 10) return this.errorReply("The lottery giveaway can have a minimum of 1 and a maximum of 10 winners.");
		}

		room.giveaway = new LotteryGiveaway(user, targetUser, room, params[1], numWinners);

		this.privateModCommand(`(${user.name} started a lottery giveaway for ${targetUser.name})`);
	},
	leavelotto: 'join',
	leavelottery: 'join',
	leave: 'join',
	joinlotto: 'join',
	joinlottery: 'join',
	join: function (target, room, user, conn, cmd) {
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");
		if (!this.canTalk()) return;
		let giveaway = room.giveaway;
		if (!giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (giveaway.type !== 'lottery') return this.errorReply("This is not a lottery giveaway.");

		switch (cmd) {
		case 'joinlottery':
		case 'join':
		case 'joinlotto':
			giveaway.addUser(user);
			break;
		case 'leavelottery':
		case 'leave':
		case 'leavelotto':
			giveaway.removeUser(user);
			break;
		}
	},
	// general.
	ban: function (target, room, user) {
		if (!target) return false;
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");
		if (!this.can('warn', null, room)) return false;

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser) return this.errorReply(`User '${this.targetUsername}' not found.`);
		if (target.length > 300) {
			return this.errorReply("The reason is too long. It cannot exceed 300 characters.");
		}
		if (Giveaway.checkBanned(room, targetUser)) return this.errorReply(`User '${this.targetUsername}' is already banned from entering giveaways.`);

		Giveaway.ban(room, targetUser, target);
		if (room.giveaway) room.giveaway.kickUser(targetUser);
		if (target) target = ` (${target})`;
		this.privateModCommand(`(${targetUser.name} was banned from entering giveaways by ${user.name}.${target})`);
	},
	unban: function (target, room, user) {
		if (!target) return false;
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");
		if (!this.can('warn', null, room)) return false;

		this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser) return this.errorReply(`User '${this.targetUsername}' not found.`);
		if (!Giveaway.checkBanned(room, targetUser)) return this.errorReply(`User '${this.targetUsername}' isn't banned from entering giveaways.`);

		Giveaway.unban(room, targetUser);
		this.privateModCommand(`${targetUser.name} was unbanned from entering giveaways by ${user.name}.`);
	},
	stop: 'end',
	end: function (target, room, user) {
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");
		if (!room.giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (!this.can('warn', null, room) && user.userid !== room.giveaway.host.userid) return false;

		if (target && target.length > 300) {
			return this.errorReply("The reason is too long. It cannot exceed 300 characters.");
		}
		room.giveaway.end(true);
		if (target) target = `: ${target}`;
		this.privateModCommand(`(The giveaway was forcibly ended by ${user.name}${target})`);
	},
	rm: 'remind',
	remind: function (target, room, user) {
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");
		let giveaway = room.giveaway;
		if (!giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (!this.runBroadcast()) return;
		if (giveaway.type === 'question') {
			if (giveaway.phase !== 'started') return this.errorReply("The giveaway has not started yet.");
			room.giveaway.send(room.giveaway.generateQuestion());
		} else {
			room.giveaway.display();
		}
	},
	'': 'help',
	help: function (target, room, user) {
		if (room.id !== 'wifi') return this.errorReply("This command can only be used in the Wi-Fi room.");

		let reply = '';
		switch (target) {
		case 'staff':
			if (!this.can('warn', null, room)) return;
			reply = '<strong>Staff commands:</strong><br />' +
			        '- question or qg <em>User | Prize | Question | Answer[,Answer2,Answer3]</em> - Start a new question giveaway (voices can only host for themselves, staff can for all users) (Requires: + % @ * # & ~)<br />' +
			        '- lottery or lg <em>User | Prize[| Number of Winners]</em> - Starts a lottery giveaway (voices can only host for themselves, staff can for all users) (Requires: + % @ * # & ~)<br />' +
			        '- changequestion - Changes the question of a question giveaway (Requires: giveaway host)<br />' +
			        '- changeanswer - Changes the answer of a question giveaway (Requires: giveaway host)<br />' +
					'- viewanswer - Shows the answer in a question giveaway (only to giveaway host/giver)<br />' +
					'- ban - Temporarily bans a user from entering giveaways (Requires: % @ * # & ~)<br />' +
			        '- end - Forcibly ends the current giveaway (Requires: % @ * # & ~)<br />';
			break;
		case 'game':
		case 'giveaway':
		case 'user':
			if (!this.runBroadcast()) return;
			reply = '<strong>Giveaway participation commands: </strong> (start with /giveaway, except for /ga) <br />' +
			        '- guess or /ga <em>answer</em> - Guesses the answer for a question giveaway<br />' +
			        '- viewanswer - Shows the answer in a question giveaway (only to host/giver)<br />' +
			        '- remind - Shows the details of the current giveaway (can be broadcast)<br />' +
			        '- join or joinlottery - Joins a lottery giveaway<br />' +
			        '- leave or leavelottery - Leaves a lottery giveaway<br />';
			break;
		default:
			if (!this.runBroadcast()) return;
			reply = '<b>Wi-Fi room Giveaway help and info</b><br />' +
			'- help user - shows list of participation commands<br />' +
			'- help staff - shows giveaway staff commands (Requires: % @ * # & ~)';
		}
		this.sendReplyBox(reply);
	},
};

exports.commands = {
	'giveaway': commands,
	'ga': commands.guess,
	'gh': commands.help,
	'qg': commands.question,
	'lg': commands.lottery,
};
