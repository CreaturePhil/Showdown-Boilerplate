var fs = require('fs');
var path = require('path');

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
function currencyName (amount) {
	var name = " buck";
	return amount === 1 ? name : name + "s";
}

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney (money) {
	var numMoney = Number(money);
	if (!numMoney) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "You can't give less than one buck.";
	return numMoney;
}

/**
 * Log money to logs/money.txt file.
 *
 * @param {String} message
 */
function logMoney (message) {
	if (!message) return;
	var file = path.join(__dirname, '../logs/money.txt');
	var date = "[" + new Date().toUTCString() + "] ";
	var msg = message + "\n";
	fs.appendFile(file, date + msg);
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
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."],

	takebuck: 'takemoney',
	takebucks: 'takemoney',
	takemoney: function (target, room, user) {
		if (!user.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		var parts = target.split(',');
		var username = parts[0];
		var amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.sendReply(amount);

		var _this = this;
		Database.read('money', toId(username), function (err, initial) {
			if (err) initial = 0;
			Database.write('money', initial - amount, toId(username), function (err, total) {
				if (err) throw err;
				amount = amount + currencyName(amount);
				total = total + currencyName(total);
				_this.sendReply(username + " losted " + amount + ". " + username + " now has " + total + ".");
				if (Users.get(username)) Users.get(username).popup(user.name + " has taken " + amount + " from you. You now have " + total + ".");
				logMoney(username + " had " + amount + " taken away by " + user.name + ".");
			});
		});
	},
	takemoneyhelp: ["/takemoney [user], [amount] - Take a certain amount of money from a user."],

	resetbuck: 'resetmoney',
	resetbucks: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!user.can('resetmoney')) return false;
		Database.write('money', 0, toId(target), function (err) {
			if (err) throw err;
			this.sendReply(target + " now has 0" + currencyName(0) + ".");
			logMoney(user.name + " reset the money of " + target + ".");
		}.bind(this));
	},
	resetmoneyhelp: ["/resetmoney [user] - Reset user's money to zero."],

	transfer: 'transfermoney',
	transferbuck: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');
		if (toId(target) === user.userid) return this.sendReply("You cannot transfer to yourself.");

		var parts = target.split(',');
		var username = parts[0];
		var amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.sendReply(amount);

		var _this = this;
		Database.read('money', user.userid, function (err, userTotal) {
			if (err) userTotal = 0;
			if (amount > userTotal) return _this.sendReply("You cannot transfer more money than what you have.");
			Database.read('money', toId(username), function (err, targetTotal) {
				if (err) targetTotal = 0;
				Database.write('money', userTotal - amount, user.userid, function (err, userTotal) {
					Database.write('money', targetTotal + amount, toId(username), function (err, targetTotal) {
						amount = amount + currencyName(amount);
						userTotal = userTotal + currencyName(userTotal);
						targetTotal = targetTotal + currencyName(targetTotal);
						_this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
						if (Users.get(username)) Users.get(username).popup(user.name + " has transferred " + amount + ". You now have " + targetTotal + ".");
						logMoney(user.name + " transferred " + amount + " to " + username + ".");
					});
				});
			});
		});
	},
	transfermoneyhelp: ["/transfer [user], [amount] - Transfer a certain amount of money to a user."]

};
