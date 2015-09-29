/**
 * Miscellaneous commands
 */

var fs = require('fs');
var moment = require('moment');
var request = require('request');

var messages = [
	"has vanished into nothingness!",
	"used Explosion!",
	"fell into the void.",
	"went into a cave without a repel!",
	"has left the building.",
	"was forced to give Hackuo23's mom an oil massage!",
	"was hit by Magikarp's Revenge!",
	"ate a bomb!",
	"is blasting off again!",
	"(Quit: oh god how did this get here i am not good with computer)",
	"was unfortunate and didn't get a cool message.",
	"{{user}}'s mama accidently kicked {{user}} from the server!"
];
var ipbans = fs.createWriteStream('config/ipbans.txt', {
	'flags': 'a'
});
var badges = fs.createWriteStream('badges.txt', {
	'flags': 'a'
});

function clearRoom(room) {
	var len = (room.log && room.log.length) || 0;
	var users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (var u in room.users) {
		users.push(u);
		Users.get(u).leaveRoom(room, Users.get(u).connections[0]);
	}
	len = users.length;
	setTimeout(function () {
		while (len--) {
			Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
		}
	}, 1000);
}

exports.commands = {
	stafflist: 'authority',
	auth: 'authority',
	authlist: 'authority',
	authority: function (target, room, user, connection) {
		var rankLists = {};
		var ranks = Object.keys(Config.groups);
		for (var u in Users.usergroups) {
			var rank = Users.usergroups[u].charAt(0);
			// In case the usergroups.csv file is not proper, we check for the server ranks.
			if (ranks.indexOf(rank) > -1) {
				var name = Users.usergroups[u].substr(1);
				if (!rankLists[rank]) rankLists[rank] = [];
				if (name) rankLists[rank].push(((Users.getExact(name) && Users.getExact(name).connected) ? '**' + name + '**' : name));
			}
		}

		var buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return (Config.groups[b] || {rank: 0}).rank - (Config.groups[a] || {rank: 0}).rank;
		}).forEach(function (r) {
			buffer.push((Config.groups[r] ? r + Config.groups[r].name + "s (" + rankLists[r].length + ")" : r) + ":\n" + rankLists[r].sort().join(", "));
		});

		if (!buffer.length) buffer = "This server has no auth.";
		connection.popup(buffer.join("\n\n"));
	},

	clearall: function (target, room, user) {
		if (!this.can('declare')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);
	},

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('gdeclare')) return false;

		for (var u in Users.users) {
			Users.users[u].popup("All rooms are being clear.");
		}

		for (var r in Rooms.rooms) {
			clearRoom(Rooms.rooms[r]);
		}
	},

	hide: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = true;
		user.updateIdentity();
		this.sendReply("You have hidden your staff symbol.");
	},

	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (user.locked && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!this.can('mute', targetUser, room)) return false;

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ".");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		var pmName = ' Server PM [Do not reply]';

		for (var i in Users.users) {
			var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
			Users.users[i].send(message);
		}
	},
	pmallhelp: ["/pmall [message] - PM all users in the server."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		var pmName = ' Staff PM [Do not reply]';

		for (var i in Users.users) {
			if (Users.users[i].isStaff) {
				Users.users[i].send('|pm|' + pmName + '|' + Users.users[i].group + Users.users[i].name + '|' + target);
			}
		}
	},
	pmallstaffhelp: ["/pmallstaff [message] - Sends a PM to every staff member online."],

	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		if (room.id !== 'lobby') return false;
		var message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		var colour = '#' + [1, 1, 1].map(function () {
			var part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw("<strong><font color=\"" + colour + "\">~~ " + Tools.escapeHTML(message) + " ~~</font></strong>");
		user.disconnectAll();
	},
	poofhelp: ["/poof - Disconnects the user and leaves a message in the room."],

	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],

	nopoof: 'poofoff',
	poofoff: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
	poofoffhelp: ["/poofoff - Disable the use of the /poof command."],

	regdate: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target || !toId(target)) return this.parse('/help regdate');
		var username = toId(target);
		request('http://pokemonshowdown.com/users/' + username, function (error, response, body) {
			if (error && response.statusCode !== 200) {
				this.sendReplyBox(Tools.escapeHTML(target) + " is not registered.");
				return room.update();
			}
			var regdate = body.split('<small>')[1].split('</small>')[0].replace(/(<em>|<\/em>)/g, '');
			if (regdate === '(Unregistered)') {
				this.sendReplyBox(Tools.escapeHTML(target) + " is not registered.");
			} else {
				this.sendReplyBox(Tools.escapeHTML(target) + " was registered on " + regdate.slice(7) + ".");
			}
			room.update();
		}.bind(this));
	},
	regdatehelp: ["/regdate - Please specify a valid username."],

	show: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = false;
		user.updateIdentity();
		this.sendReply("You have revealed your staff symbol.");
	},

	sb: 'showdownboilerplate',
	showdownboilerplate: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply("|raw|This server uses <a href='https://github.com/CreaturePhil/Showdown-Boilerplate'>Showdown-Boilerplate</a>.");
	},
	showdownboilerplatehelp: ["/showdownboilerplate - Links to the Showdown-Boilerplate repository on Github."],

	seen: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) return this.parse('/help seen');
		var targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(targetUser.name + " is <b>currently online</b>.");
		target = Tools.escapeHTML(target);
		var seen = Seen[toId(target)];
		if (!seen) return this.sendReplyBox(target + " has never been online on this server.");
		this.sendReplyBox(target + " was last seen <b>" + moment(seen).fromNow() + "</b>.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

	tell: function (target, room, user, connection) {
		if (!target) return this.parse('/help tell');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help tell');
		}

		if (targetUser && targetUser.connected) {
			return this.parse('/pm ' + this.targetUsername + ', ' + target);
		}

		if (user.locked) return this.popupReply("You may not send offline messages when locked.");
		if (target.length > 255) return this.popupReply("Your message is too long to be sent as an offline message (>255 characters).");

		if (Config.tellrank === 'autoconfirmed' && !user.autoconfirmed) {
			return this.popupReply("You must be autoconfirmed to send an offline message.");
		} else if (!Config.tellrank || Config.groupsranking.indexOf(user.group) < Config.groupsranking.indexOf(Config.tellrank)) {
			return this.popupReply("You cannot send an offline message because offline messaging is " +
				(!Config.tellrank ? "disabled" : "only available to users of rank " + Config.tellrank + " and above") + ".");
		}

		var userid = toId(this.targetUsername);
		if (userid.length > 18) return this.popupReply("\"" + this.targetUsername + "\" is not a legal username.");

		var sendSuccess = Tells.addTell(user, userid, target);
		if (!sendSuccess) {
			if (sendSuccess === false) {
				return this.popupReply("User " + this.targetUsername + " has too many offline messages queued.");
			} else {
				return this.popupReply("You have too many outgoing offline messages queued. Please wait until some have been received or have expired.");
			}
		}
		return connection.send('|pm|' + user.getIdentity() + '|' +
			(targetUser ? targetUser.getIdentity() : ' ' + this.targetUsername) +
			"|/text This user is currently offline. Your message will be delivered when they are next online.");
	},
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."],

        pb: 'permaban',
	pban: 'permaban',
	permban: 'permaban',
	permaban: function(target, room, user) {
		if (!target) return this.sendReply('/permaban [username] - Permanently bans the user from the server. Bans placed by this command do not reset on server restarts. Requires: & ~');
		if (!this.can('pban')) return false;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User ' + this.targetUsername + ' not found.');
		}
		if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
			var problem = " but was already banned";
			return this.privateModCommand('(' + targetUser.name + " would be banned by " + user.name + problem + '.) (' + targetUser.latestIp + ')');
		}
		targetUser.popup(user.name + " has permanently banned you.");
		this.addModCommand(targetUser.name + " was permanently banned by " + user.name + ".");
		this.add('|unlink|hide|' + this.getLastIdOf(targetUser));
		targetUser.ban();
		ipbans.write('\n' + targetUser.latestIp);
	},
	bitch: 'complain',
	report: 'complain',
	complain: function(target, room, user) {
		if (!target) return this.sendReply('/report [report] - Use this command to report other users.');
		var html = ['<img ', '<a href', '<font ', '<marquee', '<blink', '<center'];
		for (var x in html) {
			if (target.indexOf(html[x]) > -1) return this.sendReply('HTML is not supported in this command.');
		}
		if (target.length > 350) return this.sendReply('This report is too long; it cannot exceed 350 characters.');
		if (!this.canTalk()) return;
		Rooms.rooms.staff.add(user.userid + ' (in ' + room.id + ') has reported: ' + target + '');
		this.sendReply('Your report "' + target + '" has been reported.');
		for (var u in Users.users)
			if ((Users.users[u].group == "~" || Users.users[u].group == "&" || Users.users[u].group == "@" || Users.users[u].group == "%") && Users.users[u].connected)
				Users.users[u].send('|pm|~Server|' + Users.users[u].getIdentity() + '|' + user.userid + ' (in ' + room.id + ') has reported: ' + target + '');
	},
	gdeclarered: 'gdeclare',
	gdeclaregreen: 'gdeclare',
	gdeclare: function(target, room, user, connection, cmd) {
		if (!target) return this.parse('/help gdeclare');
		if (!this.can('lockdown')) return false;
		var roomName = (room.isPrivate) ? 'a private room' : room.id;
		if (cmd === 'gdeclare') {
			for (var id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
			}
		}
		if (cmd === 'gdeclarered') {
			for (var id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
			}
		} else if (cmd === 'gdeclaregreen') {
			for (var id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
			}
		}
		f
		this.logEntry(user.name + ' used /gdeclare');
	},
	gdeclarered: 'gdeclare',
	gdeclaregreen: 'gdeclare',
	gdeclare: function(target, room, user, connection, cmd) {
		if (!target) return this.parse('/help gdeclare');
		if (!this.can('lockdown')) return false;
		var roomName = (room.isPrivate) ? 'a private room' : room.id;
		if (cmd === 'gdeclare') {
			for (var id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
			}
		}
		if (cmd === 'gdeclarered') {
			for (var id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
			}
		} else if (cmd === 'gdeclaregreen') {
			for (var id in Rooms.rooms) {
				if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
			}
		}
		this.logModCommand(user.name + ' globally declared ' + target);
	},
	declaregreen: 'declarered',
	declarered: function(target, room, user, connection, cmd) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk()) return;
		if (cmd === 'declarered') {
			this.add('|raw|<div class="broadcast-red"><b>' + target + '</b></div>');
		} else if (cmd === 'declaregreen') {
			this.add('|raw|<div class="broadcast-green"><b>' + target + '</b></div>');
		}
		this.logModCommand(user.name + ' declared ' + target);
	},
	golddeclare: function(target, room, user, connection, cmd) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk()) return;
		this.add('|raw|<div class="broadcast-gold"><b>' + target + '</b></div>');
		this.logModCommand(user.name + ' declared ' + target);
	},
	pdeclare: function(target, room, user, connection, cmd) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk()) return;
		if (cmd === 'pdeclare') {
			this.add('|raw|<div class="broadcast-purple"><b>' + target + '</b></div>');
		} else if (cmd === 'pdeclare') {
			this.add('|raw|<div class="broadcast-purple"><b>' + target + '</b></div>');
		}
		this.logModCommand(user.name + ' declared ' + target);
	},
	sd: 'declaremod',
	staffdeclare: 'declaremod',
	modmsg: 'declaremod',
	moddeclare: 'declaremod',
	declaremod: function(target, room, user) {
		if (!target) return this.sendReply('/declaremod [message] - Also /moddeclare and /modmsg');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk()) return;
		this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');
		this.logModCommand(user.name + ' mod declared ' + target);
	},
	hideuser: function(target, room, user, connection, cmd) {
		if (!target) return this.sendReply('/hideuser [user] - Makes all prior messages posted by this user "poof" and replaces it with a button to see. Requires: @, &, ~');
		if (!this.can('hotpatch')) return false;
		try {
			this.add('|unlink|hide|' + target);
			Rooms.rooms.staff.add(target + '\'s messages have been hidden by ' + user.name);
			this.logModCommand(target + '\'s messages have been hidden by ' + user.name);
			this.sendReply(target + '\'s messages have been sucessfully hidden.');
		} catch (e) {
			this.sendReply("Something went wrong! Ahhhhhh!");
		}
	},
	flogout: 'forcelogout',
	forcelogout: function(target, room, user) {
		if (!user.can('hotpatch')) return;
		if (!this.canTalk()) return false;
		if (!target) return this.sendReply('/forcelogout [username], [reason] OR /flogout [username], [reason] - You do not have to add a reason');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User ' + this.targetUsername + ' not found.');
		}
		if (targetUser.can('hotpatch')) return this.sendReply('You cannot force logout another Admin.');
		this.addModCommand('' + targetUser.name + ' was forcibly logged out by ' + user.name + '.' + (target ? " (" + target + ")" : ""));
		targetUser.resetName();
	},
	pus: 'pmupperstaff',
	pmupperstaff: function(target, room, user) {
		if (!target) return this.sendReply('/pmupperstaff [message] - Sends a PM to every upper staff');
		if (!this.can('pban')) return false;
		for (var u in Users.users) {
			if (Users.users[u].group == '~' || Users.users[u].group == '&') {
				Users.users[u].send('|pm|~Upper Staff PM|' + Users.users[u].group + Users.users[u].name + '| ' + target + ' (PM from ' + user.name + ')');
			}
		}
	},
	helixfossil: 'm8b',
	helix: 'm8b',
	magic8ball: 'm8b',
	m8b: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var random = Math.floor(20 * Math.random()) + 1;
		var results = '';
		if (random == 1) {
			results = 'Signs point to yes.';
		}
		if (random == 2) {
			results = 'Yes.';
		}
		if (random == 3) {
			results = 'Reply hazy, try again.';
		}
		if (random == 4) {
			results = 'Without a doubt.';
		}
		if (random == 5) {
			results = 'My sources say no.';
		}
		if (random == 6) {
			results = 'As I see it, yes.';
		}
		if (random == 7) {
			results = 'You may rely on it.';
		}
		if (random == 8) {
			results = 'Concentrate and ask again.';
		}
		if (random == 9) {
			results = 'Outlook not so good.';
		}
		if (random == 10) {
			results = 'It is decidedly so.';
		}
		if (random == 11) {
			results = 'Better not tell you now.';
		}
		if (random == 12) {
			results = 'Very doubtful.';
		}
		if (random == 13) {
			results = 'Yes - definitely.';
		}
		if (random == 14) {
			results = 'It is certain.';
		}
		if (random == 15) {
			results = 'Cannot predict now.';
		}
		if (random == 16) {
			results = 'Most likely.';
		}
		if (random == 17) {
			results = 'Ask again later.';
		}
		if (random == 18) {
			results = 'My reply is no.';
		}
		if (random == 19) {
			results = 'Outlook good.';
		}
		if (random == 20) {
			results = 'Don\'t count on it.';
		}
		return this.sendReplyBox('' + results + '');
	},
	friendcodehelp: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<b>Friend Code Help:</b> <br><br />' +
			'/friendcode (/fc) [friendcode] - Sets your Friend Code.<br />' +
			'/getcode (gc) - Sends you a popup of all of the registered user\'s Friend Codes.<br />' +
			'/deletecode [user] - Deletes this user\'s friend code from the server (Requires %, @, &, ~)<br>' +
			'<i>--Any questions, PM papew!</i>');
	},
	friendcode: 'fc',
	fc: function(target, room, user, connection) {
		if (!target) {
			return this.sendReply("Enter in your friend code. Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		}
		var fc = target;
		fc = fc.replace(/-/g, '');
		fc = fc.replace(/ /g, '');
		if (isNaN(fc)) return this.sendReply("The friend code you submitted contains non-numerical characters. Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		if (fc.length < 12) return this.sendReply("The friend code you have entered is not long enough! Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		fc = fc.slice(0, 4) + '-' + fc.slice(4, 8) + '-' + fc.slice(8, 12);
		var codes = fs.readFileSync('config/friendcodes.txt', 'utf8');
		if (codes.toLowerCase().indexOf(user.name) > -1) {
			return this.sendReply("Your friend code is already here.");
		}
		code.write('\n' + user.name + ': ' + fc);
		return this.sendReply("Your Friend Code: " + fc + " has been set.");
	},
	viewcode: 'gc',
	getcodes: 'gc',
	viewcodes: 'gc',
	vc: 'gc',
	getcode: 'gc',
	gc: function(target, room, user, connection) {
		var codes = fs.readFileSync('config/friendcodes.txt', 'utf8');
		return user.send('|popup|' + codes);
	},
	deletecode: function(target, room, user) {
		if (!target) {
			return this.sendReply('/deletecode [user] - Deletes the Friend Code of the User.');
		}
		t = this;
		if (!this.can('lock')) return false;
		fs.readFile('config/friendcodes.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			hi = this;
			var row = ('' + data).split('\n');
			match = false;
			line = '';
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var line = row[i].split(':');
				if (target === line[0]) {
					match = true;
					line = row[i];
				}
				break;
			}
			if (match === true) {
				var re = new RegExp(line, 'g');
				var result = data.replace(re, '');
				fs.writeFile('config/friendcodes.txt', result, 'utf8', function(err) {
					if (err) t.sendReply(err);
					t.sendReply('The Friendcode ' + line + ' has been deleted.');
				});
			} else {
				t.sendReply('There is no match.');
			}
		});
	},
	sprite: function (target, room, user, connection, cmd) {
		if (!this.canBroadcast()) return;
		if (!toId(target)) return this.sendReply('/sprite [Pokémon] - Allows you to view the sprite of a Pokémon');
		target = target.toLowerCase().split(',');
		var alt = '';
		var type = toId(target[1]);
		var sprite = target[0].trim();
		var url;
		if (type === 'shiny') url = 'http://play.pokemonshowdown.com/sprites/xyani-shiny/';
		else if (type === 'back') url = 'http://play.pokemonshowdown.com/sprites/xyani-back/';
		else if (type === 'rby') url = 'http://play.pokemonshowdown.com/sprites/rby/';
		else if (type === 'rbyback') url = 'http://play.pokemonshowdown.com/sprites/rby-back/';
		else if (type === 'gsc') url = 'http://play.pokemonshowdown.com/sprites/gsc/';
		else if (type === 'gscshiny') url = 'http://play.pokemonshowdown.com/sprites/gsc-shiny/';
		else if (type === 'gscback') url = 'http://play.pokemonshowdown.com/sprites/gsc-back/';
		else if (type === 'gscshinyback') url = 'http://play.pokemonshowdown.com/sprites/gsc-back-shiny/';
		else if (type === 'rse') url = 'http://play.pokemonshowdown.com/sprites/rse/';
		else if (type === 'rseshiny') url = 'http://play.pokemonshowdown.com/sprites/rse-shiny/';
		else if (type === 'rseback') url = 'http://play.pokemonshowdown.com/sprites/rse-back/';
		else if (type === 'rseshinyback') url = 'http://play.pokemonshowdown.com/sprites/rse-back-shiny/';
		else if (type === 'dpp') url = 'http://play.pokemonshowdown.com/sprites/dpp/';
		else if (type === 'dppshiny') url = 'http://play.pokemonshowdown.com/sprites/dpp-shiny/';
		else if (type === 'dppback') url = 'http://play.pokemonshowdown.com/sprites/dpp-back/';
		else if (type === 'dppshinyback') url = 'http://play.pokemonshowdown.com/sprites/dpp-back-shiny/';
		else if (type === 'bw') url = 'http://play.pokemonshowdown.com/sprites/bwani/';
		else if (type === 'bwshiny') url = 'http://play.pokemonshowdown.com/sprites/bwani-shiny/';
		else if (type === 'bwback') url = 'http://play.pokemonshowdown.com/sprites/bwani-back/';
		else if (type === 'bwshinyback') url = 'http://play.pokemonshowdown.com/sprites/bwani-back-shiny/';
		else if (type === 'afd') url = 'http://play.pokemonshowdown.com/sprites/afd/';
		else if (type === 'afdshiny') url = 'http://play.pokemonshowdown.com/sprites/afd-shiny/';
		else if (type === 'afdback') url = 'http://play.pokemonshowdown.com/sprites/afd-back/';
		else if (type === 'afdshinyback') url = 'http://play.pokemonshowdown.com/sprites/afd-back-shiny/';
		else if (type === 'backshiny' || type === 'shinyback') url = 'http://play.pokemonshowdown.com/sprites/xyani-back-shiny/';
		else url = 'http://play.pokemonshowdown.com/sprites/xyani/';

		if (Number(sprite[sprite.length - 1]) && !toId(sprite[sprite.length - 2])) {
			alt = '-' + sprite[sprite.length - 1];
			sprite = sprite.substr(0, sprite.length - 1);
			url = 'http://www.pkparaiso.com/imagenes/xy/sprites/animados/';
		}
		var main = target[0].split(',');
		if (Tools.data.Pokedex[toId(sprite)]) {
			sprite = Tools.data.Pokedex[toId(sprite)].species.toLowerCase();
		} else {
			var correction = Tools.dataSearch(toId(sprite));
			if (correction && correction.length) {
				for (var i = 0; i < correction.length; i++) {
					if (correction[i].id !== toId(sprite) && !Tools.data.Aliases[toId(correction[i].id)] && !i) {
						if (!Tools.data.Pokedex[toId(correction[i])]) continue;
						if (!Tools.data.Aliases[toId(sprite)]) this.sendReply("There isn't any Pokémon called '" + sprite + "'... Did you mean '" + correction[0].name + "'?\n");
						sprite = Tools.data.Pokedex[correction[0].id].species.toLowerCase();
					}
				}
			} else {
				return this.sendReply("There isn\'t any Pokémon called '" + sprite + "'...");
			}
		}
		var self = this;
		require('request').get(url + sprite + alt + '.gif').on('error', function () {
			self.sendReply('The sprite for ' + sprite + alt + ' is unavailable.');
		}).on('response', function (response) {
			if (response.statusCode == 404) return self.sendReply('The sprite for ' + sprite + alt + ' is currently unavailable.');
			self.sendReply('|html|<img src = "' + url + sprite + alt + '.gif">');
		});
	},
	//Panagram
	panagramhelp: 'panagramrules',
    panagramrules: function(target, room, user) {
        if (!this.canBroadcast()) return;
        return this.sendReplyBox('<u><font size = 2><center>Pangram rules and commands</center></font></u><br />' +
            '<b>/panagram</b> - Starts a game of Panagram in the room (Panagrams are just anagrams with Pokemon). Illegal and CAP Pokemon won\'t be selected. Must be ranked + or higher to use.<br />' +
            '<b>/guessp [Pokemon]</b> - Guesses a Pokémon. After guessing incorrectly, you cannot guess again in the same game. There are a total of 3 tries per game. The answer is revealed after all 3 chances are over.<br />' +
            '<b>/panagramend</b> OR <b>/endpanagram</b> OR <b>/endp</b> - Ends the current game of Panagram.');
    },
    //panagram commands.
    panagram: function(target, room, user) {
        if (!this.can('broadcast', null, room)) return false;
        if (room.panagram) return this.sendReply('There is already a game of Panagram going on.');
        var pokedex = [];
        for (var i in Tools.data.Pokedex) {
            if (Tools.data.Pokedex[i].num > 0 && !Tools.data.Pokedex[i].forme) {
                pokedex.push(i);
            }
        }
        var mixer = function(word) {
            var array = [];
            for (var k = 0; k < word.length; k++) {
                array.push(word[k]);
            }
            var a;
            var b;
            var i = array.length;
            while (i) {
                a = Math.floor(Math.random() * i);
                i--;
                b = array[i];
                array[i] = array[a];
                array[a] = b;
            }
            return array.join('').toString();
        }

        var poke = pokedex[Math.floor(Math.random() * pokedex.length)];
        var panagram = mixer(poke.toString());
        while (panagram == poke) {
            panagram = mixer(poke);
        }
        //var x = Math.floor(Math.random() * panagram.length);
        this.add('|html|<div class = "infobox"><center><b>A game of Panagram has been started!</b><br/>' +
            'The scrambled Pokémon is <b>' + panagram + '</b><br/>' +
            '<font size = 1>Type in <b>/gp or /guesspoke [Pokémon]</b> to guess the Pokémon!');
        room.panagram = {};
        room.panagram.guessed = [];
        room.panagram.chances = 2;
        room.panagram.answer = toId(poke);
    },

	gp: 'guessp',
    guesspoke: 'guessp',
    guessp: function(target, room, user, cmd) {
        if (!room.panagram) return this.sendReply('There is no game of Panagram going on in this room.');
        if (room.panagram[user.userid]) return this.sendReply("You've already guessed once!");
        if (!target) return this.sendReply("The proper syntax is /guessp [pokemon]");
        if (!Tools.data.Pokedex[toId(target)]) return this.sendReply("'" + target + "' is not a valid Pokémon.");
        if (Tools.data.Pokedex[toId(target)].num < 1) return this.sendReply(Tools.data.Pokedex[toId(target)].species + ' is either an illegal or a CAP Pokémon.');
        if (Tools.data.Pokedex[toId(target)].baseSpecies) target = toId(Tools.data.Pokedex[toId(target)].baseSpecies);
        if (room.panagram.guessed.indexOf(toId(target)) > -1) return this.sendReply("That Pokemon has already been guessed!");
        if (room.panagram.answer == toId(target)) {
            this.add('|html|<b>' + user.name + '</b> guessed <b>' + Tools.data.Pokedex[toId(target)].species + '</b>, which was the correct answer! Congratulations!');
            delete room.panagram;
        } else {
            if (room.panagram.chances > 0) {
                this.add('|html|<b>' + user.name + '</b> guessed <b>' + Tools.data.Pokedex[toId(target)].species + '</b>, but was not the correct answer...');
                room.panagram[user.userid] = toId(target);
                room.panagram.guessed.push(toId(target));
                room.panagram.chances--;
            } else {
                this.add('|html|<b>' + user.name + '</b> guessed <b>' + Tools.data.Pokedex[toId(target)].species + '</b>, but was not the correct answer. You have failed to guess the Pokemon, which was <b>' + Tools.data.Pokedex[room.panagram.answer].species + '</b>');
                delete room.panagram;
            }
        }
    },
    panagramoff: 'endpanagram',
    endp: 'endpanagram',
    panagramend: 'endpanagram',
    endpanagram: function(target, room, user) {
        if (!room.panagram) return this.sendReply('There is no panagram game going on in this room yet.');
        this.add("|html|<b>The game of Panagram has been ended.</b>");
        delete room.panagram;
    },
    sudo: function (target, room, user) {
        if (!user.can('sudo')) return;
        var parts = target.split(',');
        if (parts.length < 2) return this.parse('/help sudo');
        if (parts.length >= 3) parts.push(parts.splice(1, parts.length).join(','));
        var targetUser = parts[0],
            cmd = parts[1].trim().toLowerCase(),
            commands = Object.keys(CommandParser.commands).join(' ').toString(),
            spaceIndex = cmd.indexOf(' '),
            targetCmd = cmd;

        if (spaceIndex > 0) targetCmd = targetCmd.substr(1, spaceIndex - 1);

        if (!Users.get(targetUser)) return this.sendReply('User ' + targetUser + ' not found.');
        if (commands.indexOf(targetCmd.substring(1, targetCmd.length)) < 0 || targetCmd === '') return this.sendReply('Not a valid command.');
        if (cmd.match(/\/me/)) {
            if (cmd.match(/\/me./)) return this.parse('/control ' + targetUser + ', say, ' + cmd);
            return this.sendReply('You must put a target to make a user use /me.');
        }
        CommandParser.parse(cmd, room, Users.get(targetUser), Users.get(targetUser).connections[0]);
        this.sendReply('You have made ' + targetUser + ' do ' + cmd + '.');
    },
    control: function (target, room, user) {
        if (!this.can('control')) return;
        var parts = target.split(',');

        if (parts.length < 3) return this.parse('/help control');

        if (parts[1].trim().toLowerCase() === 'say') {
            return room.add('|c|' + Users.get(parts[0].trim()).group + Users.get(parts[0].trim()).name + '|' + parts[2].trim());
        }
        if (parts[1].trim().toLowerCase() === 'pm') {
            return Users.get(parts[2].trim()).send('|pm|' + Users.get(parts[0].trim()).group + Users.get(parts[0].trim()).name + '|' + Users.get(parts[2].trim()).group + Users.get(parts[2].trim()).name + '|' + parts[3].trim());
        }
    },
    rmall: function (target, room, user) {
		if (!this.can('roomdeclare', null, room)) return false;
		if (!target) return this.sendReply('/rmall [message] - Sends a message to all users in the room');

		var pmName = '~Server-Kun [Do not reply]';

		for (var i in room.users) {
			var message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '|' + target;
			room.users[i].send(message);
		}
	},

	roomlist: function (target, room, user) {
		if (!this.can('declare')) return false;

		var rooms = Object.keys(Rooms.rooms),
			len = rooms.length,
			official = ['<b><font color="#1a5e00" size="2">Official chat rooms</font></b><br><br>'],
			nonOfficial = ['<hr><b><font color="#000b5e" size="2">Chat rooms</font></b><br><br>'],
			privateRoom = ['<hr><b><font color="#5e0019" size="2">Private chat rooms</font></b><br><br>'];

		while (len--) {
			var _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
			if (_room.type === 'chat') {
				if (_room.isOfficial) {
					official.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
					continue;
				}
				if (_room.isPrivate) {
					privateRoom.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
					continue;
				}
				nonOfficial.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
			}
		}

		this.sendReplyBox(official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' '));
	},
	
	spop: 'sendpopup',
	sendpopup: function(target, room, user) {
		if (!this.can('popup')) return false;

		target = this.splitTarget(target);
		var targetUser = this.targetUser;

		if (!targetUser) return this.sendReply('/sendpopup [user], [message] - You missed the user');
		if (!target) return this.sendReply('/sendpopup [user], [message] - You missed the message');

		targetUser.popup(target);
		this.sendReply(targetUser.name + ' got the message as popup: ' + target);

		targetUser.send(user.name+' sent a popup message to you.');

		this.logModCommand(user.name+' send a popup message to '+targetUser.name);
	},
	
	namelock: 'nl',
	nl: function(target, room, user) {
		if (!this.can('ban')) return false;
		target = this.splitTarget(target);
		targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('/namelock - Lock a user into a username.');
		}
		if (targetUser.namelock === true) {
			return this.sendReply("The user "+targetUser+" is already namelocked.");
		}
		targetUser.namelock = true;
		return this.sendReply("The user "+targetUser+" is now namelocked.");
	},
	
	unnamelock: 'unl',
	unl: function(target, room, user) {
		if (!this.can('ban')) return false;
		target = this.splitTarget(target);
		targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('/unnamelock - Unlock a user from a username.');
		}
		if (targetUser.namelock === false) {
			return this.sendReply("The user "+targetUser+" is already un-namelocked.");
		}
		targetUser.namelock = false;
		return this.sendReply("The user "+targetUser+" is now un-namelocked.");
	},
	
        rbysprite: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<img src="https://play.pokemonshowdown.com/sprites/rby/'+target+'.png">');
        },
     
        gscsprite: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<img src="https://play.pokemonshowdown.com/sprites/gsc/'+target+'.png">');
        },
        rsesprite: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<img src="https://play.pokemonshowdown.com/sprites/rse/'+target+'.png">');
        },
        dppsprite: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<img src="https://play.pokemonshowdown.com/sprites/dpp/'+target+'.png">');
        },
        afdsprite: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<img src="https://play.pokemonshowdown.com/sprites/afd/'+target+'.png">');
        },

    roulcommands: 'roulrules',
    roulhelp: 'roulrules',
    roulrules: function(target, room, user) {
        if (!this.canBroadcast()) return;
        if (room.id === 'lobby') return this.sendReply('This command is too spammy for lobby.');
        return this.sendReplyBox('<u><font size = 2><center>Roulette rules and commands</center></font></u><br />' +
            '<b>/roul</b> - Starts a roulette game in the room. Must be ranked + or higher to use.<br />' +
            '<b>/bet [color]</b> - Bets on a roulette color. Using this multiple times increases the number of times you\'ve bet to that color by 1. You require 1 buck per bet. Clicking on a different color changes the color your\'re betting on. <br />' +
            '<b>/participants</b> - Shows the number of participants in the game.<br />' +
            '<b>/deletebets</b> OR <b>/db</b> - Erases all of the bets you have made so far. All bucks spent for betting are refunded.<br />' +
            '<b>/spin</b> - Spins the roulette. Must be ranked + or higher to use.<br />' +
            '<b>/endroul</b> - Ends the game of roulette in the room. Any bets made will be refunded. Must be ranked + or higher to use.<br />' +
            'The values of red and yellow are 4, blue and green 5, and black, 8. The cash reward is equal to the color\'s prize value multiplied by the number of bets you\'ve made, if the roulette lands on the color you\'ve bet on.');
    },

    roulette: 'roul',
    roul: function(target, room, user) {
        if (!this.can('broadcast', null, room)) return this.sendReply('You need to be ranked + or higher to start a roulette in the room.');
        if (room.roulette) {
            return this.sendReply('There is already a roulette going on.');
        }
        room.roulette = {};
        this.add('|html|<div class = "infobox"><font size = 3, color = "green"><center><b>' + user.name + ' has started a roulette!</font><br />' +
            '<center><button name = "send", value = "/bet red"><font color = "red"><b>Red</b></font><button name = "send", value = "/bet yellow"><font color = "yellow"><b>Yellow</b></font></button><button name = "send", value = "/bet blue"><font color = "blue"><b>Blue</b></font></button><button name = "send", value = "/bet green"><font color = "green"><b>Green</b></font><button name = "send", value = "/bet black"><font color = "black"><b>Black</b></font></button>' +
            '<font size = 1><center>Click one of the buttons or do /bet [color] to place a bet on a color!</font><br />' +
            '<font size = 1><center>Type /roulrules in the chat for a list of roulette commands and rules.</font><br /></div>');
    },

    bet: function(target, room, user, connection, cmd) {
        if (!room.roulette) {
            return this.sendReply('There is no roulette going on right now.');
        }
        if (money.checkAmt(user.userid, 'money') < 1) return this.sendReply("You don't have enough money to place bets.");
        target = toId(target);
        var targets = ['red', 'blue', 'yellow', 'green', 'black'];
        if (targets.indexOf(target) === -1) {
            return this.sendReply('Sorry, but that isn\'t a valid color.');
        }
        if (!room.roulette[user.userid]) {
            room.roulette[user.userid] = {};
            room.roulette[user.userid].color = target;
            room.roulette[user.userid].bets = 0;
        }

        if (room.roulette[user.userid].color != target) {
            var oldcolor = room.roulette[user.userid].color
            var newcolor = target;
            room.roulette[user.userid].color = target;
            var bets = (room.roulette[user.userid].bets == 1) ? 'bet' : 'bets';
            return this.sendReply('You are now betting on ' + newcolor + ' instead of ' + oldcolor + '. You are currently placing ' + room.roulette[user.userid].bets + ' ' + bets + ' on ' + newcolor + '.');
        }

        room.roulette[user.userid].color = target;
        room.roulette[user.userid].bets++;
        var bets = (room.roulette[user.userid].bets == 1) ? 'bet' : 'bets';
        this.sendReply('You have placed ' + room.roulette[user.userid].bets + ' ' + bets + ' on ' + target);
        money.removeAmt(user.userid, 'money', 1);
    },

    db: 'deletebets',
    deletebets: function(target, room, user, connection, cmd) {
        if (!room.roulette) {
            return this.sendReply('There is no roulette going on right now.');
        }
        if (!room.roulette[user.userid]) return this.sendReply("You haven't placed any bets yet!");
        money.giveAmt(user.userid, 'money', room.roulette[user.userid].bets);
        delete room.roulette[user.userid];
        return this.sendReply('All your bets in the current roulette have been removed.');
    },


    participants: function(target, room, user, connection, cmd) {
        if (!this.canBroadcast()) return;
        if (!room.roulette) {
            return this.sendReply('There is no roulette going on in this room right now.');
        }
        this.sendReplyBox('Number of roulette participants: ' + Object.keys(room.roulette).length);
    },

    sp: 'spin',
    spin: function(target, room, user, connection, cmd) {
        if (!room.roulette) return this.sendReply('There is no roulette going on right now.');
        if (Object.keys(room.roulette).length < 1) return this.sendReply('No bets have been made yet!');
        var random = Math.floor((Math.random() * 11) + 1);
        var payout;
        var color = '';
        var winners = [];
        if (random <= 3) {
            color = 'red';
            payout = 4;
        } else if (random <= 6) {
            color = 'yellow';
            payout = 4;
        } else if (random <= 8) {
            color = 'blue';
            payout = 5;
        } else if (random <= 10) {
            color = 'green';
            payout = 5;
        } else if (random <= 11) {
            color = 'black';
            payout = 8;
        } else {
            color = 'red';
            payout = 4;
        }

        for (var i in room.roulette) {
            if (room.roulette[i].color == color) winners.push(i);
        }
        if (winners.length <= 0) {
            this.add('|html|<div class = "infobox"><font size = 2, color = "green"><center><b>The roulette has been spun!</font><br />' +
                '<center>The roulette landed on <font color = "' + color + '"><b>' + color + '<b>!</font><br />' +
                '<center>But nobody won this time...');
        } else {
            var winnerz = '';
            for (var i = 0; i < winners.length; i++) {
                var winamount = room.roulette[toId(winners[i])].bets * payout;
                var name = (Users.getExact(winners[i])) ? Users.getExact(winners[i]).name : winners[i];
                winnerz += '<b>' + name + '</b> who won <b>' + winamount + '</b> points<br/>';
            }
            if (winners.length == 1) {
                this.add('|html|<div class = "infobox"><font size = 2, color = "green"><center><b>The roulette has been spun!</font><br />' +
                    '<center>The roulette landed on <font color = "' + color + '"><b>' + color + '<b>!</font><br />' +
                    '<center>The only winner is ' + winnerz);
            } else {
                this.add('|html|<div class = "infobox"><font size = 2, color = "green"><center><b>The roulette has been spun!</font><br />' +
                    '<center>The roulette landed on <font color = "' + color + '"><b>' + color + '<b>!</font><br />' +
                    '<center>The winners are:<br/>' +
                    '<center>' + winnerz);
            }

            for (var x = 0; x < winners.length; x++) {
                money.giveAmt(toId(winners[x]), 'money', (payout * room.roulette[toId(winners[x])].bets));
            }
        }
        delete room.roulette;
    },

    endroulette: 'endroul',
    rouletteend: 'endroul',
    roulend: 'endroul',
    endroul: function(target, room, user, connection, cmd) {
        if (!room.roulette) return this.sendReply('There is no roulette going on right now.');
        for (var i in room.roulette) {
            money.giveAmt(toId(i), 'money', room.roulette[i].bets);
        }
        delete room.roulette;
        this.add('|html|<b>' + user.name + ' has ended the current roulette.');
    },
};
	
	


       
