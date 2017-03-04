/*
* economy.js by CreaturePhil
* Shop Code Credits - Lord Haji, HoeenCoder
* Dice Game Credits - Lord Haji, SilverTactic (Silveee)
*/
'use strict';

let color = require('../config/color');
let fs = require('fs');
let path = require('path');
let writeJSON = true;
let Shop = {};
const INACTIVE_END_TIME = 1 * 60 * 1000; // 1 minute

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
	let name = " Dragon Dollar";
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
* Shop start
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
* Shop end
*/

/*
* Dice start
*/

function diceImg(num) {
	switch (num) {
	case 0:
		return "http://i.imgur.com/nUbpLTD.png";
	case 1:
		return "http://i.imgur.com/BSt9nfV.png";
	case 2:
		return "http://i.imgur.com/eTQMVhY.png";
	case 3:
		return "http://i.imgur.com/3Y2hCAJ.png";
	case 4:
		return "http://i.imgur.com/KP3Za7O.png";
	case 5:
		return "http://i.imgur.com/lvi2ZZe.png";
	}
}

class Dice {
	constructor(room, amount, starter) {
		this.room = room;
		if (!this.room.diceCount) this.room.diceCount = 0;
		this.bet = amount;
		this.players = [];
		this.timer = setTimeout(() => {
			this.room.add('|uhtmlchange|' + this.room.diceCount + '|<div class = "infobox">(This game of dice has been ended due to inactivity.)</div>').update();
			delete this.room.dice;
		}, INACTIVE_END_TIME);

		this.startMessage = '<div class="infobox"><b style="font-size: 14pt; color: #24678d"><center><span style="color: ' + color(starter) + '">' + Chat.escapeHTML(starter) + '</span> has started a game of dice for <span style = "color: green">' + amount + '</span> ' + currencyName(amount) + '!</center></b><br>' +
			'<center><img style="margin-right: 30px;" src = "http://i.imgur.com/eywnpqX.png" width="80" height="80">' +
			'<img style="transform:rotateY(180deg); margin-left: 30px;" src="http://i.imgur.com/eywnpqX.png" width="80" height="80"><br>' +
			'<button name="send" value="/joindice">Click to join!</button></center>';
		this.room.add('|uhtml|' + (++this.room.diceCount) + '|' + this.startMessage + '</div>').update();
	}

	join(user, self) {
		if (this.players.length === 2) return self.errorReply("Two users have already joined this game of dice.");
		if (Db.money.get(user.userid, 0) < this.bet) return self.errorReply('You don\'t have enough money for this game of dice.');
		if (this.players.includes(user)) return self.sendReply('You have already joined this game of dice.');
		//if (this.players.length && this.players[0].latestIp === user.latestIp) return self.errorReply("You have already joined this game of dice under the alt '" + this.players[0].name + "'.");

		this.players.push(user);
		this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '<center><b><font color ="' + color(user.name) + '">' + Chat.escapeHTML(user.name) + '</font></b> has joined the game!</center></div>').update();
		if (this.players.length === 2) this.play();
	}

	leave(user, self) {
		if (!this.players.includes(user)) return self.sendReply('You haven\'t joined the game of dice yet.');
		this.players.remove(user);
		this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '</div>');
	}

	play() {
		let p1 = this.players[0], p2 = this.players[1];
		let money1 = Db.money.get(p1.userid, 0);
		let money2 = Db.money.get(p2.userid, 0);

		if (money1 < this.bet || money2 < this.bet) {
			let user = (money1 < this.bet ? p1 : p2);
			let other = (user === p1 ? p2 : p1);
			user.sendTo(this.room, 'You have been removed from this game of dice, as you do not have enough money.');
			other.sendTo(this.room, user.name + ' has been removed from this game of dice, as they do not have enough money. Wait for another user to join.');
			this.players.remove(user);
			this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '<center>' + this.players.map(user => "<b><font color='" + color(user.name) + "'>" + Chat.escapeHTML(user.name) + "</font></b>") + ' has joined the game!</center>').update();
			return;
		}
		let players = this.players.map(user => "<b><font color='" + color(user.name) + "'>" + Chat.escapeHTML(user.name) + "</font></b>").join(' and ');
		this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '<center>' + players + ' have joined the game!</center></div>').update();
		let roll1, roll2;
		do {
			roll1 = Math.floor(Math.random() * 6);
			roll2 = Math.floor(Math.random() * 6);
		} while (roll1 === roll2);
		if (roll2 > roll1) this.players.reverse();
		let winner = this.players[0], loser = this.players[1];

		setTimeout(() => {
			this.room.add('|uhtmlchange|' + this.room.diceCount + '|<div class="infobox"><center>' + players + ' have joined the game!<br /><br />' +
				'The game has been started! Rolling the dice...<br />' +
				'<img src = "' + diceImg(roll1) + '" align = "left" title = "' + Chat.escapeHTML(p1.name) + '\'s roll"><img src = "' + diceImg(roll2) + '" align = "right" title = "' + p2.name + '\'s roll"><br />' +
				'<b><font color="' + color(p1.name) + '">' + Chat.escapeHTML(p1.name) + '</font></b> rolled ' + (roll1 + 1) + '!<br />' +
				'<b><font color="' + color(p2.name) + '">' + Chat.escapeHTML(p2.name) + '</font></b> rolled ' + (roll2 + 1) + '!<br />' +
				'<b><font color="' + color(winner.name) + '">' + Chat.escapeHTML(winner.name) + '</font></b> has won <b style="color:red">' + (this.bet) + '</b> ' + currencyName(this.bet) + '!<br />' +
				'Better luck next time, <b><font color="' + color(loser.name) + '">' + Chat.escapeHTML(loser.name) + '</font></b>!'
			).update();
			Db.money.set(winner.userid, Db.money.get(winner.userid) + this.bet);
			Db.money.set(loser.userid, Db.money.get(loser.userid) - this.bet);
			this.end();
		}, 800);
	}

	end(user) {
		if (user) this.room.add('|uhtmlchange|' + this.room.diceCount + '|<div class = "infobox">(This game of dice has been forcibly ended by ' + Chat.escapeHTML(user.name) + '.)</div>').update();
		clearTimeout(this.timer);
		delete this.room.dice;
	}
}

/*
* Dice end
*/

exports.commands = {
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.runBroadcast()) return;
		target = toId(target);
		if (!target) target = user.name;
		const amount = Db.money.get(toId(target), 0);
		this.sendReplyBox("<font color=" + color(target) + "><b>" + Chat.escapeHTML(target) + "</b></font> has " + amount + currencyName(amount) + ".");
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

		Db.money.set(toId(username), Db.money.get(toId(username), 0) + amount);
		let total = Db.money.get(toId(username));
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

		Db.money.set(toId(username), Db.money.get(toId(username), 0) - amount);
		let total = Db.money.get(toId(username));
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
		Db.money.set(toId(target), 0);
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
		if (amount > Db.money.get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");

		Db.money.set(user.userid, Db.money.get(user.userid) - amount);
		Db.money.set(uid, Db.money.get(uid, 0) + amount);

		let userTotal = Db.money.get(user.userid) + currencyName(Db.money.get(user.userid));
		let targetTotal = Db.money.get(uid) + currencyName(Db.money.get(uid));
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
			if (item.price > Db.money.get(user.userid, 0)) return this.errorReply("You don't have you enough money for this. You need " + (item.price - Db.money.get(user.userid)) + currencyName((item.price - Db.money.get(user.userid))) + " more to buy this.");
			Db.money.set(user.userid, Db.money.get(user.userid) - item.price);
			logMoney(user.name + " has purchased " + item.name + " from the shop for " + item.price + " and " + user.name + " now has " + Db.money.get(user.userid) + currencyName(Db.money.get(user.userid)) + ".");
			if (item.id === 'customsymbol') {
				user.canCustomSymbol = true;
			}
			let msg = '**' + user.name + " has bought " + item.name + ".** for " + item.price + currencyName(item.price) + " and now has " + Db.money.get(user.userid) + currencyName(Db.money.get(user.userid)) + ".";
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
		let keys = Db.money.keys().map(function (name) {
			return {name: name, money: Db.money.get(name)};
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

	startdice: 'dicegame',
	dicegame: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if (!user.can('broadcast', null, room) && room.id !== 'casino' && room.id !== 'coldfrontcasino') return this.errorReply("You must be ranked + or higher in this room to start a game of dice outside the Casino.");
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.errorReply("You cannot use this command while unable to talk.");
		if (room.dice) return this.errorReply("There is already a game of dice going on in this room.");

		let amount = Number(target) || 1;
		if (isNaN(target)) return this.errorReply('"' + target + '" isn\'t a valid number.');
		if (target.includes('.') || amount < 1 || amount > 5000) return this.sendReply('The number of bucks must be between 1 and 5,000 and cannot contain a decimal.');
		if (Db.money.get(user.userid, 0) < amount) return this.sendReply("You don't have " + amount + " " + currencyName(amount) + ".");
		room.dice = new Dice(room, amount, user.name);
		this.parse("/joindice");
	},
	startdicehelp: ["/startdice or /dicegame [bet] - Start a dice game to gamble for money."],

	dicejoin: 'joindice',
	joindice: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.sendReply("You cannot use this command while unable to talk.");
		if (!room.dice) return this.errorReply('There is no game of dice going on in this room.');

		room.dice.join(user, this);
	},
	joindicehelp: ["/joindice or /dicejoin - Joins ongoing dice game in the room."],

	diceleave: 'leavedice',
	leavedice: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if (!room.dice) return this.errorReply('There is no game of dice going on in this room.');

		room.dice.leave(user, this);
	},
	leavedicehelp: ["/leavedice or /diceleave - Leaves currently joined dice game in the room."],

	diceend: 'enddice',
	enddice: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.sendReply("You cannot use this command while unable to talk.");
		if (!room.dice) return this.errorReply('There is no game of dice going on in this room.');
		if (!user.can('broadcast', null, room) && !room.dice.players.includes(user)) return this.errorReply("You must be ranked + or higher in this room to end a game of dice.");

		room.dice.end(user);
	},
	enddicehelp: ["/enddice or /diceend - Ends ongoing dice game in the room."],

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Db.money.keys();
		const total = users.reduce(function (acc, cur) {
			return acc + Db.money.get(cur);
		}, 0);
		let average = Math.floor(total / users.length) || '0';
		let output = "There " + (total > 1 ? "are " : "is ") + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},

};
