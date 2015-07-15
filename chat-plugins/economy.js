var fs = require('fs');
var path = require('path');

function currencyName(amount) {
	var name = " buck";
	return amount === 1 ? name : name + "s";
}

function logMoney (message) {
	if (!message) return;
	var file = path.join(__dirname, '../logs/money.txt');
	var date = "[" + new Date().toUTCString() + "] ";
	var msg = message + "\n";
	fs.appendFile(file, date + msg);
}

function isMoney (money) {
	var numMoney = Number(money);
	if (!numMoney) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "You can't give less than one buck.";
	return numMoney;
}


exports.commands = {
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) target = user.name;
		if (!toId(target)) return this.sendReplyBox(Tools.escapeHTML(target) + " has 0 bucks.");

		Database.read('money', toId(target), function (err, amount) {
			if (err && err.includes('User')) return this.sendReplyBox(Tools.escapeHTML(target) + " has 0 bucks.");
			this.sendReplyBox(Tools.escapeHTML(target) + " has " + amount + currencyName(amount) + ".");
			room.update();
		}.bind(this));
	},
	wallethelp: ["/wallet [user] - Shows the amount of money a user has."],

	givebuck: 'givemoney',
	givebucks: 'givemoney',
	givemoney: function (target, room, user) {
		if (!user.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		var parts = target.split(',');
		var username = parts[0];
		var amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.sendReply(amount);

		var _this = this;
		Database.read('money', toId(username), function (err, initial) {
			if (err) initial = 0;
			Database.write('money', initial + amount, toId(username), function (err, total) {
				if (err) throw err;
				amount = amount + currencyName(amount);
				total = total + currencyName(total);
				_this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
				if (Users.get(username)) Users.get(username).popup(user.name + " has given you " + amount + ". You now have " + total + ".");
				logMoney(username + " was given " + amount + " by " + user.name + ".");
			});
		});
	},
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."]
};
