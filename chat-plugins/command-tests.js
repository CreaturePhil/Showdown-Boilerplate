'use strict';

exports.commands = {
	test: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		this.parse('/afk');
		this.parse('/back');
		this.parse('/wallet');
		this.parse('/atm ' + user.name);
		this.parse('/atm <b>asdlkasdjalkdas</b>');
		this.parse(`/givemoney ${user.name}, 5`);
		this.parse(`/takemoney ${user.name}, 5`);
		this.parse('/resetmoney bob118');
		this.parse('/transfermoney bob118, 10.0');
		this.parse('/transfermoney bob118, hoe');
		this.parse('/transfermoney bob118, -10');
		this.parse('/transfermoney bob118, 0.1');
		this.parse('/transfermoney bob118, 1.1');
		this.parse('/transfermoney bob118293829328392839829382938298329, 1.1');
		this.parse('/transfermoney bob118, 2');
		this.parse('/takebucks bob118, 2');
		this.parse(`/givemoney ${user.name}, 2`);
		this.parse('/shop');
		this.parse(`/givemoney ${user.name}, 5`);
		this.parse('/shop buy customsymbol');
		this.parse('/customsymbol @');
		this.parse('/customsymbol ^');
		this.parse('/resetsymbol');
		this.parse('/moneylog');
		this.parse('/moneyladder');
		this.parse(`/givemoney ${user.name}, 5`);
		this.parse('/dicegame 5');
		this.parse('/endddice');
		this.parse(`/takemoney ${user.name}, 5`);
		this.parse('/bucks');
	},
};
