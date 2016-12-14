/*
* Credits - Lord Haji, HoeenCoder
*/
'use strict';

const fs = require('fs');
let writeJSON = true;
const path = require('path');
let Shop = {};

function NewItem(name, desc, price) {
	this.name = name;
	this.id = toId(name);
	this.desc = Chat.escapeHTML(desc);
	this.price = Number(price);
}

function logMoney(message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/money.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
}

function writShop() {
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

exports.commands = {
	shop: {
		add: function (target, room, user, connection, cmd, message) {
			if (!this.can('roomowner')) return false;
			if (Shop.closed) return this.sendReply('An error closed the shop.');
			target = target.split(',');
			if (!target[2]) return this.parse('/shop help');
			if (Shop[toId(target[0])]) return this.errorReply(target[0] + ' is already in the shop.');
			if (isNaN(Number(target[2]))) return this.parse('/shop help');
			Shop[toId(target[0])] = new NewItem(target[0], target[1], target[2]);
			writShop();
			return this.sendReply('The item ' + target[0] + ' was added.');
		},
		remove: function (target, room, user, connection, cmd, message) {
			if (!this.can('roomowner')) return false;
			if (Shop.closed) return this.sendReply('An error closed the shop.');
			if (!target) return this.parse('/shop help');
			if (!Shop[toId(target)]) return this.errorReply(target + ' is not in the shop.');
			delete Shop[toId(target)];
			writShop();
			return this.sendReply('The item ' + target + ' was removed.');
		},
		buy: function (target, room, user, connection, cmd, message) {
			if (!target) return this.parse('/shop help buy');
			if (Shop.closed) return this.sendReply('The shop is closed, come back later.');
			if (!Shop[toId(target)]) return this.errorReply('Item ' + target + ' not found.');
			let item = Shop[toId(target)];
			if (item.price > Db('money').get(user.userid)) return this.errorReply("You don't have you enough money for this. You need " + (item.price - Db('money').get(user.userid)) + currencyName((item.price - Db('money').get(user.userid))) +" more to buy this.");
			Db('money').set(user.userid, Db('money').get(user.userid) - item.price);
			logMoney(user.name + " has purchased " + item.name + " from the shop for " + item.price + " and " + user.name + " now has " + Db('money').get(user.userid) + currencyName(Db('money').get(user.userid)) + ".");
			switch (item.id) {
			case 'symbol':
			case 'customsymbol':
				user.canCustomSymbol = true;
				break;
			default:
				let msg = '**' + user.name + " has bought " + item.name + ".** for " + item.price + currencyName(item.price) + " and now has " + Db('money').get(user.userid) + currencyName(Db('money').get(user.userid)) + ".";
				Rooms.rooms.get("staff").add('|c|~Shop Alert|' + msg);
				Rooms.rooms.get("staff").update();
				Users.users.forEach(function (user) {
					if (user.group === '~' || user.group === '&') {
						user.send('|pm|~Shop Alert|' + user.getIdentity() + '|' + msg);
					}
				});
				user.sendTo(room, "|uhtmlchange|shop" + user.userid + "|<div style='max-height:300px'><table style='border:2px solid #000000; border-radius: 5px'><tr><th colspan='3' style='border: 2px solid #000000; border-radius: 5px'>Server Shop</th></tr><tr><td style='colspan: 3; border: 2px solid #000000; border-radius: 5px'><center>You have purchased a " + item.name + ". " + (item.id === 'customsymbol' ? "You may now use /customsymbol [symbol] to change your symbol." : "Upper staff have been notified of your purchase and will contact you shortly.") + "</center></td></tr><tr><td colspan='3' style='text-align:center'><button class='button' name='send' value='/shop reopen'>Return to Shop</button></td></tr></table>");
			}
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
			return user.sendTo(room, '|uhtml|Shop' + user.userid + '|' + shopDisplay());
		},
	},
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
};
