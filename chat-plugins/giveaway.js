/**
* Wi-Fi chat-plugin. Only works in a room with id 'wifi'
* Handles giveaways in the formats: question, lottery
* Credits: Codelegend, SilverTactic, DanielCranham, bumbadadabum
**/

'use strict';

let banned = Object.create(null);

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

		this.excluded = {};
		this.excluded[host.latestIp] = host.userid;
		this.excluded[giver.latestIp] = giver.userid;
		Object.assign(this.excluded, banned);

		this.joined = {};
	}

	send(content) {
		this.room.add('|uhtml|giveaway' + this.room.gaNumber + this.phase + '|<div class="broadcast-blue">' + content + '</div>');
		this.room.update();
	}

	changeUhtml(content) {
		this.room.add('|uhtmlchange|giveaway' + this.room.gaNumber + this.phase + '|<div class="broadcast-blue">' + content + '</div>');
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

	banUser(user) {
		for (let ip in this.joined) {
			if (user.latestIp === ip || this.joined[ip] in user.prevNames) {
				this.excluded[ip] = this.joined[ip];
				if (this.generateReminder) user.sendTo(this.room, '|uhtmlchange|giveaway' + this.room.gaNumber + this.phase + '|<div class="broadcast-blue">' + this.generateReminder() + '</div>');
				delete this.joined[ip];
			}
		}
	}

	unbanUser(user) {
		for (let ip in this.excluded) {
			if (user.latestIp === ip || this.joined[ip] in user.prevNames) {
				delete this.excluded[ip];
			}
		}
	}

	checkExcluded(user) {
		for (let ip in this.excluded) {
			if (user.latestIp === ip) return true;
			if (this.excluded[ip] in user.prevNames) return true;
		}
		return false;
	}
}

class QuestionGiveaway extends Giveaway {
	constructor(host, giver, room, prize, question, answers) {
		super(host, giver, room, prize);
		this.type = 'question';

		this.question = question;
		this.answers = QuestionGiveaway.sanitizeAnswers(answers);
		this.answered = {}; // userid: number of guesses

		this.send('<p style="text-align:center;font-size:14pt;font-weight:bold;">It\'s giveaway time!</p>' +
			'<p style="text-align:center;font-size:7pt;">Question Giveaway started by ' + Tools.escapeHTML(host.name) + '</p>' +
			'<p style="text-align:center;"><b>' + Tools.escapeHTML(giver.name) + '</b> will be giving away a <b>' + Tools.escapeHTML(this.prize) + '!</b><br/>' +
			'The question will be displayed in one minute! Use /ga to answer.</p>');

		this.timer = setTimeout(() => this.start(), 1000 * 60);
	}

	generateQuestion() {
		return '<p style="text-align:center;font-size:13pt;">Giveaway Question: <b>' + this.question + '</b></p><p style="text-align:center;">use /ga to guess.</p>';
	}

	start() {
		this.changeUhtml('<p style="text-align:center;font-size:14pt;font-weight:bold;">The giveaway has started! Scroll down to see the question.</p>');
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
			user.sendTo(this.room, "Your guess '" + guess + "' is wrong. You have used up all of your guesses. Better luck next time!");
		} else {
			user.sendTo(this.room, "Your guess '" + guess + "' is wrong. Try again!");
		}
	}

	change(key, value, user) {
		if (user.userid !== this.host.userid) return user.sendTo(this.room, "Only the host can edit the giveaway.");
		if (this.phase !== 'pending') return user.sendTo(this.room, "You cannot change the question or answer once the giveaway has started.");
		if (key === 'question') {
			this.question = value;
			return user.sendTo(this.room, "The question has been changed to " + value + ".");
		}
		let ans = QuestionGiveaway.sanitizeAnswers(value);
		if (!ans.length) return user.sendTo(this.room, "You must specify at least one answer and it must not contain any special characters.");
		this.answers = ans;
		user.sendTo(this.room, "The answer" + (ans.length > 1 ? "s have" : " has") + " been changed to " + ans.join(', ') + ".");
	}

	end(force) {
		if (force) {
			this.clearTimer();
			this.changeUhtml('<p style="text-align:center;font-size:14pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
			this.room.send("The giveaway was forcibly ended.");
		} else {
			if (!this.winner) {
				this.changeUhtml('<p style="text-align:center;font-size:14pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
				this.room.send("The giveaway has been forcibly ended as no one has answered the question.");
			} else {
				this.phase = 'ended';
				this.clearTimer();
				this.send('<p style="text-align:center;font-size:14pt;font-weight:bold;"><b>' + Tools.escapeHTML(this.winner.name) + '</b> won ' + Tools.escapeHTML(this.giver.name) + '\'s giveaway for a <b>' + Tools.escapeHTML(this.prize) + '</b>! Congratulations!</p>' +
				'<p style="text-align:center;">Correct answer(s): ' + this.answers.join(', ') + '</p>');
				if (this.winner.connected) this.winner.popup('You have won the giveaway. PM **' + Tools.escapeHTML(this.giver.name) + '** to claim your prize!');
				if (this.giver.connected) this.giver.popup(Tools.escapeHTML(this.winner.name) + " has won your question giveaway!");
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
		return '<p style="text-align:center;font-size:14pt;font-weight:bold;">It\'s giveaway time!</p>' +
			'<p style="text-align:center;font-size:7pt;">Lottery Giveaway started by ' + Tools.escapeHTML(this.host.name) + '</p>' +
			'<p style="text-align:center;"><b>' + Tools.escapeHTML(this.giver.name) + '</b> will be giving away: <b>' + Tools.escapeHTML(this.prize) + '!</b><br/>' +
			'The lottery drawing will occur in 2 minutes, and with ' + this.maxwinners + ' winner' + (this.maxwinners > 1 ? 's' : '') + '!<br/>' +
			(joined ? '<button name="send" value="/giveaway leavelottery"><font size="1"><b>Leave</b></font></button><br/>' : '<button name="send" value="/giveaway joinlottery"><font size="1"><b>Join</b></font></button>') + '</p>' +
			'';
	}

	display() {
		let joined = this.generateReminder(true);
		let notJoined = this.generateReminder();

		for (let i in this.room.users) {
			let thisUser = this.room.users[i];
			if (this.checkJoined(thisUser)) {
				thisUser.sendTo(this.room, '|uhtmlchange|giveaway' + this.room.gaNumber + this.phase + '|<div class="broadcast-blue">' + joined + '</div>');
			} else {
				thisUser.sendTo(this.room, '|uhtmlchange|giveaway' + this.room.gaNumber + this.phase + '|<div class="broadcast-blue">' + notJoined + '</div>');
			}
		}
	}

	addUser(user) {
		if (this.phase !== 'pending') return user.sendTo(this.room, "The join phase of the lottery giveaway has ended.");

		if (!user.named) return user.sendTo(this.room, "You need to choose a name before joining a lottery giveaway.");
		if (this.checkJoined(user)) return user.sendTo(this.room, "You have already joined the giveaway.");
		if (this.checkExcluded(user)) return user.sendTo(this.room, "You are disallowed from entering the giveaway.");

		this.joined[user.latestIp] = user.userid;
		user.sendTo(this.room, '|uhtmlchange|giveaway' + this.room.gaNumber + this.phase + '|<div class="broadcast-blue">' + this.generateReminder(true) + '</div>');
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
		user.sendTo(this.room, "You have left the lottery giveaway.");
	}

	drawLottery() {
		this.clearTimer();
		this.changeUhtml('<p style="text-align:center;font-size:14pt;font-weight:bold;">The giveaway has ended. Scroll down for results.</p>');

		let userlist = Object.values(this.joined);
		if (userlist.length < this.maxwinners) {
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
			this.changeUhtml('<p style="text-align:center;font-size:14pt;font-weight:bold;">The giveaway was forcibly ended.</p>');
			this.room.send("The giveaway was forcibly ended.");
		} else {
			this.phase = 'ended';
			this.send('<p style="text-align:center;font-size:12pt;font-weight:bold;">Lottery Draw</p><p style="text-align:center;">' + Object.keys(this.joined).length + " users joined " + Tools.escapeHTML(this.giver.name) + "'s giveaway for: <b>" + Tools.escapeHTML(this.prize) + "</b><br/>" +
				"Our lucky winner" + (this.winners.length > 1 ? "s" : "") + ": <b>" + Tools.escapeHTML(this.winners.reduce((prev, cur, index, array) => prev + cur.name + (index === array.length - 1 ? "" : ', '), '')) + "!</b> Congratulations!</p>");
			for (let i = 0; i < this.winners.length; i++) {
				if (this.winners[i].connected) this.winners[i].popup("You have won the lottery giveaway! PM **" + this.giver.name + "** to claim your prize!");
			}
			if (this.giver.connected) this.giver.popup("The following users have won your lottery giveaway:\n" + Tools.escapeHTML(this.winners.reduce((prev, cur, index, array) => prev + cur.name + (index === array.length - 1 ? "" : ', '), '')));
		}
		delete this.room.giveaway;
	}
}

let commands = {
	// question giveaway.
	quiz: 'question',
	qg: 'question',
	question: function (target, room, user) {
		if (room.giveaway) return this.errorReply("There is already a giveaway going on!");

		let params = target.split(target.includes('|') ? '|' : ',').map(param => param.trim());
		if (params.length < 4) return this.errorReply("Invalid arguments specified - /question giver, prize, question, answer(s)");
		let targetUser = Users(params[0]);
		if (!targetUser || !targetUser.connected) return this.errorReply("User '" + params[0] + "' is not online.");
		if (!this.can('warn', null, room) && !(this.can('broadcast', null, room) && user === targetUser)) return this.errorReply("Permission denied.");
		if (!targetUser.autoconfirmed) return this.errorReply("User '" + targetUser.name + "' needs to be autoconfirmed to give something away.");

		room.giveaway = new QuestionGiveaway(user, targetUser, room, params[1], params[2], params.slice(3).join(','));

		this.privateModCommand("(" + user.name + " started a question giveaway for " + targetUser.name + ")");
	},
	changeanswer: 'changequestion',
	changequestion: function (target, room, user, conn, cmd) {
		if (!room.giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (room.giveaway.type !== 'question') return this.errorReply("This is not a question giveaway.");

		target = target.trim();
		if (!target) return this.errorReply("You must include a question or an answer.");
		room.giveaway.change(cmd.substr(6), target, user);
	},
	showanswer: 'viewanswer',
	viewanswer: function (target, room, user) {
		let giveaway = room.giveaway;
		if (!giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (giveaway.type !== 'question') return this.errorReply("This is not a question giveaway.");
		if (user.userid !== giveaway.host.userid && user.userid !== giveaway.giver.userid) return;

		this.sendReply("The giveaway question is " + giveaway.question + ".\n" +
			"The " + ((giveaway.answers.length === 1) ? 'answer is ' : 'answers are ') + giveaway.answers.join(', ') + ".");
	},
	guessanswer: 'guess',
	guess: function (target, room, user) {
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		if (!room.giveaway) return this.errorReply("There is no giveaway going on at the moment.");
		if (room.giveaway.type !== 'question') return this.errorReply("This is not a question giveaway.");
		room.giveaway.guessAnswer(user, target);
	},

};
