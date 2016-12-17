/*
* economy.js by CreaturePhil
* Shop Code Credits - Lord Haji, HoeenCoder
*/
'use strict';

let color = require('../config/color');
let fs = require('fs');
let path = require('path');
let writeJSON = true;
let Shop = {};

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
function currencyName(amount) {
	let name = " buck";
	return amount === 1 ? name : name + "s";
}

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
/*
* Shop functions start
*/

function NewItem(name, desc, price) {
	this.name = name;
	this.id = toId(name);
	this.desc = Chat.escapeHTML(desc);
	this.price = Number(price);
}

function writeShop() {
	if (!writeJSON) return false; //Prevent corruptions
	fs.writeFile('config/Shop.json', JSON.stringify(Shop));
}

function shopDisplay() {
	let output = '<div style="max-height:300px; width: 100%; overflow: scroll"><table style="border:2px solid #000000; border-radius: 5px; width: 100%;"><tr><th colspan="3" style="border: 2px solid #000000; border-radius: 5px">Server Shop</th></tr>';
	for (let i in Shop) {
		if (!Shop[i]) continue;
		output += '<tr><td style="border: 2px solid #000000; width: 20%; text-align: center"><button class="button" name="send" value="/Shop buy ' + Shop[i].id + '">' + Shop[i].name + '</button></td><td style="border: 2px solid #000000; width: 70%; text-align: center">' + Shop[i].desc + '</td><td style="border: 2px solid #000000; width: 10%; text-align: center">' + Shop[i].price + '</td></tr>';
	}
	output += '</table></div>';
	return output;
}

try {
	fs.accessSync('config/Shop.json', fs.F_OK);
	let raw = JSON.parse(fs.readFileSync('config/Shop.json', 'utf8'));
	Shop = raw;
} catch (e) {
	fs.writeFile('config/Shop.json', "{}", function (err) {
		if (err) {
			console.error('Error while loading Shop: ' + err);
			Shop = {
				closed: true,
			};
			writeJSON = false;
		} else {
			console.log("config/Shop.json not found, creating a new one...");
		}
	});
}
/*
* Shop functions end
*/

exports.commands = {
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;

		const amount = Db('money').get(toId(target), 0);
		let group = user.getIdentity().charAt(0);
		this.sendReplyBox("<font color=#948A88>" + group + "</font><font color=" + color(user.userid) + "><b>" + Chat.escapeHTML(target) + "</b></font> has " + amount + currencyName(amount) + ".");
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

	shop: {
		add: function (target, room, user, connection, cmd, message) {
			if (!this.can('roomowner')) return false;
			if (Shop.closed) return this.sendReply('An error closed the shop.');
			target = target.split(',');
			if (!target[2]) return this.parse('/shop help');
			if (Shop[toId(target[0])]) return this.errorReply(target[0] + ' is already in the shop.');
			if (isNaN(Number(target[2]))) return this.parse('/shop help');
			Shop[toId(target[0])] = new NewItem(target[0], target[1], target[2]);
			writeShop();
			return this.sendReply('The item ' + target[0] + ' was added.');
		},
		delete: 'remove',
		remove: function (target, room, user, connection, cmd, message) {
			if (!this.can('roomowner')) return false;
			if (Shop.closed) return this.sendReply('An error closed the shop.');
			if (!target) return this.parse('/shop help');
			if (!Shop[toId(target)]) return this.errorReply(target + ' is not in the shop.');
			delete Shop[toId(target)];
			writeShop();
			return this.sendReply('The item ' + target + ' was removed.');
		},
		buy: function (target, room, user, connection, cmd, message) {
			if (!target) return this.parse('/shop help buy');
			if (Shop.closed) return this.sendReply('The shop is closed, come back later.');
			if (!Shop[toId(target)]) return this.errorReply('Item ' + target + ' not found.');
			let item = Shop[toId(target)];
			if (item.price > Db('money').get(user.userid)) return this.errorReply("You don't have you enough money for this. You need " + (item.price - Db('money').get(user.userid)) + currencyName((item.price - Db('money').get(user.userid))) + " more to buy this.");
			Db('money').set(user.userid, Db('money').get(user.userid) - item.price);
			logMoney(user.name + " has purchased " + item.name + " from the shop for " + item.price + " and " + user.name + " now has " + Db('money').get(user.userid) + currencyName(Db('money').get(user.userid)) + ".");
			if (item.id === 'customsymbol') {
				user.canCustomSymbol = true;
			}
			let msg = '**' + user.name + " has bought " + item.name + ".** for " + item.price + currencyName(item.price) + " and now has " + Db('money').get(user.userid) + currencyName(Db('money').get(user.userid)) + ".";
			Rooms.rooms.get("staff").add('|c|~Shop Alert|' + msg);
			Rooms.rooms.get("staff").update();
			Users.users.forEach(function (user) {
				if (user.group === '~' || user.group === '&') {
					user.send('|pm|~Shop Alert|' + user.getIdentity() + '|' + msg);
				}
			});
			user.sendTo(room, "|uhtmlchange|shop" + user.userid + "|<div style='max-height:300px'><table style='border:2px solid #000000; border-radius: 5px'><tr><th colspan='3' style='border: 2px solid #000000; border-radius: 5px'>Server Shop</th></tr><tr><td style='colspan: 3; border: 2px solid #000000; border-radius: 5px'><center>You have purchased a " + item.name + ". " + (item.id === 'customsymbol' ? "You may now use /customsymbol [symbol] to change your symbol." : "Upper staff have been notified of your purchase and will contact you shortly.") + "</center></td></tr><tr><td colspan='3' style='text-align:center'><button class='button' name='send' value='/shop reopen'>Return to Shop</button></td></tr></table>");
		},
		help: function (target, room, user, connection, cmd, message) {
			let reply = '<b>Shop commands</b><br/>';
			reply += '/shop - Load the shop screen.<br/>';
			reply += '/shop buy [item] - Buy an item from the shop.<br/>';
			if (user.can('roomowner')) {
				reply += '<b>Administrative shop commands:</b><br/>';
				reply += '/shop add [item name], [description], [price] - Adds a item to the shop.<br/>';
				reply += '/shop remove [item] - removes a item from the shop.<br/>';
			}
			return this.sendReplyBox(reply);
		},
		reopen: '',
		'': function (target, room, user, connection, cmd, message) {
			if (cmd === 'reopen') return user.sendTo(room, '|uhtmlchange|Shop' + user.userid + '|' + shopDisplay());
			return user.sendTo(room, '|uhtml|shop' + user.userid + '|' + shopDisplay());
		},
	},

	customsymbol: function (target, room, user) {
		let bannedSymbols = ['!', '|', '‽', '\u2030', '\u534D', '\u5350', '\u223C'];
		for (let u in Config.groups) if (Config.groups[u].symbol) bannedSymbols.push(Config.groups[u].symbol);
		if (!user.canCustomSymbol) return this.errorReply('You need to buy this item from the shop to use.');
		if (!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character');
		if (target.match(/([a-zA-Z ^0-9])/g) || bannedSymbols.indexOf(target) >= 0) {
			return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		this.sendReply('Your symbol is now ' + target + '. It will be saved until you log off for more than an hour, or the server restarts. You can remove it with /resetsymbol');
	},
	customsymbolhelp: ["/customsymbol [symbol] - Get a custom symbol."],

	removesymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.customSymbol) return this.errorReply("You don't have a custom symbol!");
		delete user.customSymbol;
		user.updateIdentity();
		this.sendReply('Your symbol has been removed.');
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
		if (!this.runBroadcast()) return;
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

		room.addRaw("<div class='infobox'><h2><center><font color=#24678d>" + user.name + " has started a dice game for </font><font color=red>" + amount + "</font><font color=#24678d>" + currencyName(amount) + ".</font><br><button name='send' value='/joindice'>Click to join.</button></center></h2></div>");
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
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length) || '0';
		let output = "There " + (total > 1 ? "are " : "is ") + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},

};
