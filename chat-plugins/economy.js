'use strict';

let color = require('../config/color');
let fs = require('fs');
let path = require('path');

let shop = [
	['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
	['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 10],
	['Avatar', 'Buys an custom avatar to be applied to your name (You supply. Images larger than 80x80 may not show correctly)', 20],
	['League Room', 'Purchases a room at a reduced rate for use with a league.  A roster must be supplied with at least 10 members for this room.', 25],
	['Trainer', 'Buys a trainer card which shows information through a command. (You supply, can be refused)', 40],
	['Staff Help', 'Staff member will help set up roomintros and anything else needed in a room. Response may not be immediate.', 50],
	['Icon', 'Buy a custom icon that can be applied to the rooms you want. You must take into account that the provided image should be 32 x 32', 75],
	['Room', 'Buys a chatroom for you to own. (within reason, can be refused)', 100],
];

let shopDisplay = getShopDisplay(shop);

/**
 * Gets an amount and returns the amount with the name of the currency.
 *
 * @examples
 * currencyName(0); // 0 bucks
 * currencyName(1); // 1 buck
 * currencyName(5); // 5 bucks
 *
 * @param {Number} amount
 * @returns {String}
 */
global.currencyName = function (amount) {
	let name = " buck";
	return amount === 1 ? name : name + "s";
};

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

/**
 * Log money to logs/money.txt file.
 *
 * @param {String} message
 */
function logMoney(message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/money.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
}

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
	let display = "<table border='1' cellspacing='0' cellpadding='5' width='100%'>" +
					"<tbody><tr><th>Command</th><th>Description</th><th>Cost</th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" +
						"<td align='center'><button name='send' value='/buy " + shop[start][0] + "'><b>" + shop[start][0] + "</b></button>" + "</td>" +
						"<td align='center'>" + shop[start][1] + "</td>" +
						"<td align='center'>" + shop[start][2] + "</td>" +
					"</tr>";
		start++;
	}
	display += "</tbody></table><center>To buy an item from the shop, use /buy <em>command</em>.</center>";
	return display;
}


/**
 * Find the item in the shop.
 *
 * @param {String} item
 * @param {Number} money
 * @return {Object}
 */
function findItem(item, money) {
	let len = shop.length;
	let price = 0;
	let amount = 0;
	while (len--) {
		if (item.toLowerCase() !== shop[len][0].toLowerCase()) continue;
		price = shop[len][2];
		if (price > money) {
			amount = price - money;
			this.errorReply("You don't have you enough money for this. You need " + amount + currencyName(amount) + " more to buy " + item + ".");
			return false;
		}
		return price;
	}
	this.errorReply(item + " not found in shop.");
}

/**
 * Handling the bought item from the shop.
 *
 * @param {String} item
 * @param {Object} user
 * @param {Number} cost - for lottery
 */
function handleBoughtItem(item, user, cost) {
	if (item === 'symbol') {
		user.canCustomSymbol = true;
		this.sendReply("You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.");
		this.sendReply("You will have this until you log off for more than an hour.");
		this.sendReply("If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.");
	} else if (item === 'icon') {
		this.sendReply('You purchased an icon, contact an administrator to obtain the article.');
	} else {
		let msg = '**' + user.name + " has bought " + item + ".**";
		Rooms.rooms.staff.add('|c|~Shop Alert|' + msg);
		Rooms.rooms.staff.update();
		Users.users.forEach(function (user) {
			if (user.group === '~' || user.group === '&') {
				user.send('|pm|~Shop Alert|' + user.getIdentity() + '|' + msg);
			}
		});
	}
}

exports.commands = {
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) target = user.name;

		const amount = Db('money').get(toId(target), 0);
		this.sendReplyBox(Tools.escapeHTML(target) + " has " + amount + currencyName(amount) + ".");
	},
	wallethelp: ["/wallet [user] - Shows the amount of money a user has."],

	givebuck: 'givemoney',
	givebucks: 'givemoney',
	givemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) + amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has given you " + amount + ". You now have " + total + ".");
		logMoney(username + " was given " + amount + " by " + user.name + ". " + username + " now has " + total);
	},
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."],

	takebuck: 'takemoney',
	takebucks: 'takemoney',
	takemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) - amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " losted " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has taken " + amount + " from you. You now have " + total + ".");
		logMoney(username + " had " + amount + " taken away by " + user.name + ". " + username + " now has " + total);
	},
	takemoneyhelp: ["/takemoney [user], [amount] - Take a certain amount of money from a user."],

	resetbuck: 'resetmoney',
	resetbucks: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		Db('money').set(toId(target), 0);
		this.sendReply(target + " now has 0 bucks.");
		logMoney(user.name + " reset the money of " + target + ".");
	},
	resetmoneyhelp: ["/resetmoney [user] - Reset user's money to zero."],

	transfer: 'transfermoney',
	transferbuck: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.errorReply("You cannot transfer to yourself.");
		if (username.length > 19) return this.errorReply("Username cannot be longer than 19 characters.");
		if (typeof amount === 'string') return this.errorReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");

		Db('money')
			.set(user.userid, Db('money').get(user.userid) - amount)
			.set(uid, Db('money').get(uid, 0) + amount);

		let userTotal = Db('money').get(user.userid) + currencyName(Db('money').get(user.userid));
		let targetTotal = Db('money').get(uid) + currencyName(Db('money').get(uid));
		amount = amount + currencyName(amount);

		this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has transferred " + amount + ". You now have " + targetTotal + ".");
		logMoney(user.name + " transferred " + amount + " to " + username + ". " + user.name + " now has " + userTotal + " and " + username + " now has " + targetTotal + ".");
	},
	transfermoneyhelp: ["/transfer [user], [amount] - Transfer a certain amount of money to a user."],

	store: 'shop',
	shop: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReply("|raw|" + shopDisplay);
	},
	shophelp: ["/shop - Display items you can buy with money."],

	buy: function (target, room, user) {
		if (!target) return this.parse('/help buy');
		let amount = Db('money').get(user.userid, 0);
		let cost = findItem.call(this, target, amount);
		if (!cost) return;
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		this.sendReply("You have bought " + target + " for " + cost +  currencyName(cost) + ". You now have " + total + currencyName(total) + " left.");
		room.addRaw(user.name + " has bought <b>" + target + "</b> from the shop.");
		logMoney(user.name + " has bought " + target + " from the shop. This user now has " + total + currencyName(total) + ".");
		handleBoughtItem.call(this, target.toLowerCase(), user, cost);
	},
	buyhelp: ["/buy [command] - Buys an item from the shop."],

	customsymbol: function (target, room, user) {
		if (!user.canCustomSymbol && user.id !== user.userid) return this.errorReply("You need to buy this item from the shop.");
		if (!target || target.length > 1) return this.parse('/help customsymbol');
		if (target.match(/[A-Za-z\d]+/g) || '|?!+$%@\u2605=&~#\u03c4\u00a3\u03dd\u03b2\u039e\u03a9\u0398\u03a3\u00a9'.indexOf(target) >= 0) {
			return this.errorReply("Sorry, but you cannot change your symbol to this for safety/stability reasons.");
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		user.hasCustomSymbol = true;
	},
	customsymbolhelp: ["/customsymbol [symbol] - Get a custom symbol."],

	resetcustomsymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.hasCustomSymbol) return this.errorReply("You don't have a custom symbol.");
		user.customSymbol = null;
		user.updateIdentity();
		user.hasCustomSymbol = false;
		this.sendReply("Your symbol has been reset.");
	},
	resetsymbolhelp: ["/resetsymbol - Resets your custom symbol."],

	moneylog: function (target, room, user, connection) {
		if (!this.can('modlog')) return;
		target = toId(target);
		let numLines = 15;
		let matching = true;
		if (target.match(/\d/g) && !isNaN(target)) {
			numLines = Number(target);
			matching = false;
		}
		let topMsg = "Displaying the last " + numLines + " lines of transactions:\n";
		let file = path.join(__dirname, '../logs/money.txt');
		fs.exists(file, function (exists) {
			if (!exists) return connection.popup("No transactions.");
			fs.readFile(file, 'utf8', function (err, data) {
				data = data.split('\n');
				if (target && matching) {
					data = data.filter(function (line) {
						return line.toLowerCase().indexOf(target.toLowerCase()) >= 0;
					});
				}
				connection.popup('|wide|' + topMsg + data.slice(-(numLines + 1)).join('\n'));
			});
		});
	},

	moneyladder: 'richestuser',
	richladder: 'richestuser',
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let display = '<center><u><b>Richest Users</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Money</th></tr>';
		let keys = Object.keys(Db('money').object()).map(function (name) {
			return {name: name, money: Db('money').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys.sort(function (a, b) {
			return b.money - a.money;
		});
		keys.slice(0, 10).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + user.money + "</td></tr>";
		});
		display += "</tbody></table>";
		this.sendReply("|raw|" + display);
	},

	dicegame: 'startdice',
	dicestart: 'startdice',
	startdice: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!target) return this.parse('/help startdice');
		if (!this.canTalk()) return this.errorReply("You can not start dice games while unable to speak.");

		let amount = isMoney(target);

		if (typeof amount === 'string') return this.errorReply(amount);
		if (!room.dice) room.dice = {};
		if (room.dice.started) return this.errorReply("A dice game has already started in this room.");

		room.dice.started = true;
		room.dice.bet = amount;
		// Prevent ending a dice game too early.
		room.dice.startTime = Date.now();

		room.addRaw('<div class="infobox"><h2><center><font color="' + color(user.userid) + '">' + Tools.escapeHTML(user.name) + '</font> <font color=#24678d>has started a dice game for </font><font color=red>' + target + 
	 			' </font><font color=#24678d>' + ((target === 1) ? " buck." : " bucks.") + '</font><br /> <button name="send" value="/joindice">Click to join.</button></center></h2></div>');
	},
	startdicehelp: ["/startdice [bet] - Start a dice game to gamble for money."],

	joindice: function (target, room, user) {
		if (!room.dice || (room.dice.p1 && room.dice.p2)) return this.errorReply("There is no dice game in it's signup phase in this room.");
		if (!this.canTalk()) return this.errorReply("You may not join dice games while unable to speak.");
		if (room.dice.p1 === user.userid) return this.errorReply("You already entered this dice game.");
		if (Db('money').get(user.userid, 0) < room.dice.bet) return this.errorReply("You don't have enough bucks to join this game.");
		Db('money').set(user.userid, Db('money').get(user.userid) - room.dice.bet);
		if (!room.dice.p1) {
			room.dice.p1 = user.userid;
			room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
			return;
		}
		room.dice.p2 = user.userid;
		room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
		let p1Number = Math.floor(6 * Math.random()) + 1;
		let p2Number = Math.floor(6 * Math.random()) + 1;
		let output = "<div class='infobox'>Game has two players, starting now.<br>Rolling the dice.<br>" + room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
		while (p1Number === p2Number) {
			output += "Tie... rolling again.<br>";
			p1Number = Math.floor(6 * Math.random()) + 1;
			p2Number = Math.floor(6 * Math.random()) + 1;
			output += room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
		}
		let winner = room.dice[p1Number > p2Number ? 'p1' : 'p2'];
		output += "<font color=#24678d><b>" + winner + "</b></font> has won <font color=#24678d><b>" + room.dice.bet + "</b></font>" + currencyName(room.dice.bet) + ".<br>Better luck next time " + room.dice[p1Number < p2Number ? 'p1' : 'p2'] + "!</div>";
		room.addRaw(output);
		Db('money').set(winner, Db('money').get(winner, 0) + room.dice.bet * 2);
		delete room.dice;
	},

	enddice: function (target, room, user) {
		if (!user.can('broadcast', null, room)) return false;
		if (!room.dice) return this.errorReply("There is no dice game in this room.");
		if ((Date.now() - room.dice.startTime) < 15000 && !user.can('broadcast', null, room)) return this.errorReply("Regular users may not end a dice game within the first minute of it starting.");
		if (room.dice.p2) return this.errorReply("Dice game has already started.");
		if (room.dice.p1) Db('money').set(room.dice.p1, Db('money').get(room.dice.p1, 0) + room.dice.bet);
		room.addRaw("<b>" + user.name + " ended the dice game.</b>");
		delete room.dice;
	},

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.canBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length);
		let output = "There is " + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},

};
