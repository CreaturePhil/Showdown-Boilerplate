const COLORS = {'red':1, 'blue':1, 'yellow':1, 'green':1, 'black':1};

var roulettes = exports.roulettes = {};

var Roulette = (function () {
	function Roulette (room) {
		this.room = room;
		this.players = {};
		var that = this;
		this.timer = setTimeout(function () {
			if (Object.keys(that.players).length < 1) {
				that.room.add('|raw|<b>The roulette has been ended due to the lack of players');
				delete roulettes[that.room.id];
				return;
			}
			that.spin();
			that.room.update();
		}, 1000 * 60); //1 minute
	}
	Roulette.prototype.placeBet = function (user, color, self) {
		for (var i = 0; i < user.getAlts().length; i++) {
			if (this.players[user.getAlts()[i]]) return self.sendReply('Your alt \'' + user.getAlts()[i] + '\' has already joined the roulette. Continue playing under that alt.');
		}
		for (i in this.players) {
			if (Users.get(i).getAlts().indexOf(user.userid) > -1) return self.sendReply('Your alt \'' + Users.get(i).name + '\' has already joined the roulette. Continue playing under that alt.');
		}
		for (i in user.prevNames) {
			if (this.players[i] && i !== user.userid) return self.sendReply('Your alt \'' + user.prevNames[i] + '\' has already joined the roulette. Continue playing under that alt.');
		}
		if (!this.players[user.userid]) {
			this.players[user.userid] = {};
			this.players[user.userid].color = color;
			this.players[user.userid].bets = 1;
			self.sendReply('You have placed 1 bet on ' + color);
			Core.write('money', user.userid, 1, '-');
		} else {
			if (this.players[user.userid].color !== color) {
				var bets = (this.players[user.userid].bets === 1 ? 'bet' : 'bets');
				self.sendReply('You are now betting on ' + color +' instead of ' + this.players[user.userid].color + '. You are currently placing ' + this.players[user.userid].bets + ' '+ bets + ' on ' + color + '.');
				this.players[user.userid].color = color;
			} else {
				this.players[user.userid].bets++;
				var bets = (this.players[user.userid].bets === 1 ? 'bet' : 'bets');
				self.sendReply('You have placed ' + this.players[user.userid].bets + ' ' + bets + ' on ' + color);
				Core.write('money', user.userid, 1, '-');
			}
		}
	};
	Roulette.prototype.deleteBets = function (user, self) {
		if (!this.players[user.userid] || !this.players[user.userid].bets) return self.sendReply('You haven\'t made any bets in this game yet.');
		Core.write('money', user.userid, this.players[user.userid].bets, '+');
		delete this.players[user.userid];
		return self.sendReply('All your bets in the current roulette have been removed. Your money has been refunded.');
	};
	Roulette.prototype.end = function (user) {
		for (var i in this.players)
			Core.write('money', i, this.players[i].bets, '+');
		clearTimeout(this.timer);
		this.room.add('|html|<b>' + user.name + ' has ended the current roulette.');
		delete roulettes[this.room.id];
	};
	Roulette.prototype.spin = function () {
		var random = Math.floor((Math.random() * 11) + 1);
        var payout;
        var color;
		var winners = [];
        if (random <= 3) {
            color = 'red';
            payout = 3;
        } else if (random <= 6) {
            color = 'yellow';
            payout = 3;
        } else if (random <= 8) {
            color = 'blue';
            payout = 4;
        } else if (random <= 10) {
            color = 'green';
            payout = 4;
        } else if (random <= 11) {
            color = 'black';
            payout = 7;
        } else {
            color = 'red';
			payout = 3;
        }
	
		for (var i in this.players) {
            if (this.players[i].color === color) winners.push(i);
        }
		
        if (winners.length <= 0) { 
            this.room.add('|html|<div class = "infobox"><font size = 2, color = "green"><center><b>The roulette has been spun!</font><br />' +
                '<center>The roulette landed on <font color = "' + color + '"><b>' + color + '<b>!</font><br />' +
                '<center>But nobody won this time...');
        } else {
            var winlist = '';
            for (var i = 0; i < winners.length; i++) {
				if (i > 0) winlist += ', ';
                var winamount = this.players[winners[i]].bets * payout;
				var name = (Users.getExact(winners[i])) ? Users.getExact(winners[i]).name : winners[i];
                winlist += '<b>' + name + '</b> who won <b>' + winamount + '</b> points';
            }
            if (winners.length == 1) {
				this.room.add('|html|<div class = "infobox"><font size = 2, color = "green"><center><b>The roulette has been spun!</font><br />' +
                '<center>The roulette landed on <font color = "' + color + '"><b>' + color + '<b>!</font><br />' +
                '<center>The only winner is ' + winlist);
			} else {
				this.room.add('|html|<div class = "infobox"><font size = 2, color = "green"><center><b>The roulette has been spun!</font><br />' +
                '<center>The roulette landed on <font color = "' + color + '"><b>' + color + '<b>!</font><br />' +
                '<center>The winners are:<br/>' +
                '<center>' + winlist);
			}
			winners.forEach(function (user) {
				user = Users.get(user);
				Core.write('money', user.userid, payout + 1, '+');
			});
		}
		clearTimeout(this.timer);
		delete roulettes[this.room.id];
	};
	return Roulette;
})();

var cmds = {
	players: 'participants',
	participants: function (target, room, user) {
		if (!roulettes[room.id]) return this.sendReply('There is no roulette going on in this room right now.');
		this.sendReplyBox('Number of Roulette players: ' + Object.keys(roulettes[room.id].players));
	},
	
	help: 'rules',
	'': 'rules',
	commands: 'rules',
	rules: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReplyBox('<b><center>Roulette rules and commands</center></font></b><br />' +
            '-/startroul or /roul start - Starts a roulette game in the room. Must be ranked + or higher to use.<br />' +
            '-/bet or /roul bet <i>Color</i> - Bets on a roulette color. Using this multiple times increases the number of times you\'ve bet on that color by 1. You require 1 buck per bet. Clicking on a different color changes the color you\'re betting on to the new color. <br />' +
            '-/participants or /roul players - Shows the number of participants in the game.<br />' +
            '-/deletebets or /roul deletebets - Erases all of the bets you have made so far. Any bucks spent on bets will be refunded.<br />' +
            '-/spin or /roul spin - Spins the roulette. Must be ranked + or higher to use.<br />' +
            '-/endroul or /roul end - Ends the game of roulette in the room. Any bets made will be refunded. Must be ranked + or higher to use.<br />' +
            'The values of red and yellow are 4, blue and green 5, and black, 8. The cash reward is equal to the color\'s prize value multiplied by the number of bets you\'ve made, if the roulette lands on the color you\'ve bet on.');
	},
	
	'new': 'start',
	start: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (roulettes[room.id]) return this.sendReply('There is already a game of roulette going on.');
		roulettes[room.id] = new Roulette(room);
		this.add('|html|<div class = "infobox"><font size = 3, color = "green"><center><b>' + user.name + ' has started a roulette!</font><br />' +
            '<center><button name = "send", value = "/bet red"><font color = "red"><b>Red</b></font><button name = "send", value = "/bet yellow"><font color = "yellow"><b>Yellow</b></font></button><button name = "send", value = "/bet blue"><font color = "blue"><b>Blue</b></font></button><button name = "send", value = "/bet green"><font color = "green"><b>Green</b></font><button name = "send", value = "/bet black"><font color = "black"><b>Black</b></font></button>' +
            '<font size = 1><center>Click one of the buttons or use /bet [color] to place a bet on a color!</font><br />' +
            '<font size = 1><center>Enter /roul in the chat for a list of roulette commands and rules.</font><br /></div>');
	},
	
	bet: function (target, room, user) {
		if (!roulettes[room.id]) return this.sendReply('There is no roulette going on in this room right now.');
		if (Core.read('money', user.userid) < 1) return this.sendReply("You don't have enough money to place bets.");
        target = toId(target);
        if (!COLORS[target]) return this.sendReply(target + ' is not a valid color');
		
		roulettes[room.id].placeBet(user, target, this);
	},
	
	deletebets: 'delete',
	'delete': function (target, room, user) {
		if (!roulettes[room.id]) return this.sendReply('There is no roulette going on in this room right now.');
		
		roulettes[room.id].deleteBets(user, this);
	},
	
	end: 'stop', 
	stop: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!roulettes[room.id]) return this.sendReply('There is no roulette going on in this room right now.');
		
		roulettes[room.id].end(user);
	},
	
	spin: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!roulettes[room.id]) return this.sendReply('There is no roulette going on in this room right now.');
		
		roulettes[room.id].spin();
	}
};

exports.commands = {
	roul: 'roulette',
	roulette: cmds,
	players: 'participants',
	participants: cmds.participants,
	roulrules: cmds.rules,
	roulhelp: cmds.rules,
	startroul: cmds.start,
	roulend: cmds.stop,
	endroul: cmds.stop,
	deletebets: cmds['delete'],
	bet: cmds.bet,
	spin: cmds.spin
};
