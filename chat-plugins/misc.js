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
	"was forced to give StevoDuhHero's mom an oil massage!",
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

		var len = room.log.length;
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
		if (!target || target === "0") target = toId(user.userid);
		if (!target || target === "." || target === "," || target === "'") return this.parse('/help regdate');
		var username = toId(target);
		target = target.replace(/\s+/g, '');
		var self = this, data;
		request('http://pokemonshowdown.com/users/~' + target, function (error, response, content) {
			if (!(!error && response.statusCode === 200)) return;
			content = content + '';
			content = content.split("<em");
			if (content[1]) {
				content = content[1].split("</p>");
				if (content[0]) {
					content = content[0].split("</em>");
					if (content[1]) {
						var regdate = content[1].split('</small>')[0] + '.';
						data = Tools.escapeHTML(username) + " was registered on" + regdate;
					}
				}
			} else {
				data = Tools.escapeHTML(username) + " is not registered.";
			}
			self.sendReplyBox(Tools.escapeHTML(data));
			room.update();
		});
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
	pbl: 'pbanlist',
	permabanlist: 'pbanlist',
	pbanlist: function(target, room, user, connection) {
		if (!this.canBroadcast() || !user.can('lock')) return this.sendReply('/pbanlist - Access Denied.');
		var pban = fs.readFileSync('config/pbanlist.txt', 'utf8');
		return user.send('|popup|' + pban);
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
	suggestion: 'suggest',
	suggest: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("Have a suggestion for this server? Go <a href=\"http://goldservers.info/forums/showthread.php?tid=78\">here</a>.");

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
			return this.sendReply("The user " + targetUser + " is already namelocked.");
		}
		targetUser.namelock = true;
		return this.sendReply("The user " + targetUser + " is now namelocked.");
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
			return this.sendReply("The user " + targetUser + " is already un-namelocked.");
		}
		targetUser.namelock = false;
		return this.sendReply("The user " + targetUser + " is now un-namelocked.");
	},
	setmotd: 'motd',
	motd: function(target, room, user) {
		if (!this.can('pban')) return false;
		if (!target || target.indexOf(',') == -1) {
			return this.sendReply('The proper syntax for this command is: /motd [message], [interval (minutes)]');
		}
		if (isMotd == true) {
			clearInterval(motd);
		}
		targets = target.split(',');
		message = targets[0];
		time = Number(targets[1]);
		if (isNaN(time)) {
			return this.sendReply('Make sure the time is just the number, and not any words.');
		}
		motd = setInterval(function() {
			Rooms.rooms.lobby.add('|raw|<div class = "infobox"><b>Message of the Day:</b><br />' + message)
		}, time * 60 * 1000);
		isMotd = true;
		this.logModCommand(user.name + ' set the message of the day to: ' + message + ' for every ' + time + ' minutes.');
		return this.sendReply('The message of the day was set to "' + message + '" and it will be displayed every ' + time + ' minutes.');
	},
	clearmotd: 'cmotd',
	cmotd: function(target, room, user) {
		if (!this.can('pban')) return false;
		if (isMotd == false) {
			return this.sendReply('There is no motd right now.');
		}
		clearInterval(motd);
		this.logModCommand(user.name + ' cleared the message of the day.');
		return this.sendReply('You cleared the message of the day.');
	},
	lick: function(target, room, user) {
		if (!target) return this.sendReply('/lick needs a target.');
		return this.parse('/me licks ' + target + ' excessively!');
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
		if (targetUser.can('hotpatch')) return this.sendReply('You cannot force logout another Admin - nice try. Chump.');
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
	removebadge: function(target, room, user) {
		if (!this.can('hotpatch')) return false;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) return this.sendReply('/removebadge [user], [badge] - Removes a badge from a user.');
		if (!targetUser) return this.sendReply('There is no user named ' + this.targetUsername + '.');
		var self = this;
		var type_of_badges = ['admin', 'bot', 'dev', 'vip', 'artist', 'mod', 'leader', 'champ', 'creator', 'comcun', 'twinner', 'goodra', 'league', 'fgs'];
		if (type_of_badges.indexOf(target) > -1 == false) return this.sendReply('The badge ' + target + ' is not a valid badge.');
		fs.readFile('badges.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			var match = false;
			var currentbadges = '';
			var row = ('' + data).split('\n');
			var line = '';
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var split = row[i].split(':');
				if (split[0] == targetUser.userid) {
					match = true;
					currentbadges = split[1];
					line = row[i];
				}
			}
			if (match == true) {
				if (currentbadges.indexOf(target) > -1 == false) return self.sendReply(currentbadges); //'The user '+targetUser+' does not have the badge.');
				var re = new RegExp(line, 'g');
				currentbadges = currentbadges.replace(target, '');
				var newdata = data.replace(re, targetUser.userid + ':' + currentbadges);
				fs.writeFile('badges.txt', newdata, 'utf8', function(err, data) {
					if (err) console.log(err);
					return self.sendReply('You have removed the badge ' + target + ' from the user ' + targetUser + '.');
				});
			} else {
				return self.sendReply('There is no match for the user ' + targetUser + '.');
			}
		});
	},
	givebadge: function(target, room, user) {
		if (!this.can('hotpatch')) return false;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) return this.sendReply('There is no user named ' + this.targetUsername + '.');
		if (!target) return this.sendReply('/givebadge [user], [badge] - Gives a badge to a user. Requires: &~');
		var self = this;
		var type_of_badges = ['admin', 'bot', 'dev', 'vip', 'mod', 'artist', 'leader', 'champ', 'creator', 'comcun', 'twinner', 'league', 'fgs'];
		if (type_of_badges.indexOf(target) > -1 == false) return this.sendReply('Ther is no badge named ' + target + '.');
		fs.readFile('badges.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			var currentbadges = '';
			var line = '';
			var row = ('' + data).split('\n');
			var match = false;
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var split = row[i].split(':');
				if (split[0] == targetUser.userid) {
					match = true;
					currentbadges = split[1];
					line = row[i];
				}
			}
			if (match == true) {
				if (currentbadges.indexOf(target) > -1) return self.sendReply('The user ' + targerUser + ' already has the badge ' + target + '.');
				var re = new RegExp(line, 'g');
				var newdata = data.replace(re, targetUser.userid + ':' + currentbadges + target);
				fs.writeFile('badges.txt', newdata, function(err, data) {
					if (err) console.log(err);
					self.sendReply('You have given the badge ' + target + ' to the user ' + targetUser + '.');
					targetUser.send('You have recieved the badge ' + target + ' from the user ' + user.userid + '.');
					room.addRaw(targetUser + ' has recieved the ' + target + ' badge from ' + user.name);
				});
			} else {
				fs.appendFile('badges.txt', '\n' + targetUser.userid + ':' + target, function(err) {
					if (err) console.log(err);
					self.sendReply('You have given the badge ' + target + ' to the user ' + targetUser + '.');
					targetUser.send('You have recieved the badge ' + target + ' from the user ' + user.userid + '.');
				});
			}
		})
	},
	badgelist: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var fgs = '<img src="http://www.smogon.com/media/forums/images/badges/forummod_alum.png" title="Former Gold Staff">';
		var admin = '<img src="http://www.smogon.com/media/forums/images/badges/sop.png" title="Server Administrator">';
		var dev = '<img src="http://www.smogon.com/media/forums/images/badges/factory_foreman.png" title="Gold Developer">';
		var creator = '<img src="http://www.smogon.com/media/forums/images/badges/dragon.png" title="Server Creator">';
		var comcun = '<img src="http://www.smogon.com/media/forums/images/badges/cc.png" title="Community Contributor">';
		var leader = '<img src="http://www.smogon.com/media/forums/images/badges/aop.png" title="Server Leader">';
		var mod = '<img src="http://www.smogon.com/media/forums/images/badges/pyramid_king.png" title="Exceptional Staff Member">';
		var league = '<img src="http://www.smogon.com/media/forums/images/badges/forumsmod.png" title="Successful Room Founder">';
		var champ = '<img src="http://www.smogon.com/media/forums/images/badges/forumadmin_alum.png" title="Goodra League Champion">';
		var artist = '<img src="http://www.smogon.com/media/forums/images/badges/ladybug.png" title="Artist">';
		var twinner = '<img src="http://www.smogon.com/media/forums/images/badges/spl.png" title="Badge Tournament Winner">';
		var vip = '<img src="http://www.smogon.com/media/forums/images/badges/zeph.png" title="VIP">';
		var bot = '<img src="http://www.smogon.com/media/forums/images/badges/mind.png" title="Gold Bot Hoster">';
		return this.sendReplyBox('<b>List of Gold Badges</b>:<br>' + fgs + '  ' + admin + '    ' + dev + '  ' + creator + '   ' + comcun + '    ' + mod + '    ' + leader + '    ' + league + '    ' + champ + '    ' + artist + '    ' + twinner + '    ' + vip + '    ' + bot + ' <br>--Hover over them to see the meaning of each.<br>--Get a badge and get a FREE custom avatar!<br>--Click <a href="http://goldserver.weebly.com/badges.html">here</a> to find out more about how to get a badge.');
	},
	roomleader: function(target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomleader - This room is't designed for per-room moderation to be added.");
		}
		var target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
		if (!room.founder || user.userid != room.founder && !this.can('hotpatch')) return false;
		if (!room.auth) room.auth = room.chatRoomData.auth = {};
		var name = targetUser.name;
		room.auth[targetUser.userid] = '&';
		//room.founder = targetUser.userid;
		this.addModCommand('' + name + ' was appointed to Room Leader by ' + user.name + '.');
		room.onUpdateIdentity(targetUser);
		//room.chatRoomData.leaders = room.founder;
		Rooms.global.writeChatRoomData();
	},
	roomleader: function(target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		var name = this.targetUsername;
		var userid = toId(name);
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");
		if (room.auth[userid] !== '&') return this.sendReply("User '" + name + "' is not a room leader.");
		if (!room.founder || user.userid != room.founder && !this.can('hotpatch')) return false;
		delete room.auth[userid];
		this.sendReply('(' + name + ' is no longer Room Leader.)');
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
		}
	},
	badges: 'badge',
	badge: function(target, room, user) {
		if (!this.canBroadcast()) return;
		if (target == '') target = user.userid;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		var matched = false;
		if (!targetUser) return false;
		var fgs = '<img src="http://www.smogon.com/media/forums/images/badges/forummod_alum.png" title="Former Gold Staff">';
		var admin = '<img src="http://www.smogon.com/media/forums/images/badges/sop.png" title="Server Administrator">';
		var dev = '<img src="http://www.smogon.com/media/forums/images/badges/factory_foreman.png" title="Gold Developer">';
		var creator = '<img src="http://www.smogon.com/media/forums/images/badges/dragon.png" title="Server Creator">';
		var comcun = '<img src="http://www.smogon.com/media/forums/images/badges/cc.png" title="Community Contributor">';
		var leader = '<img src="http://www.smogon.com/media/forums/images/badges/aop.png" title="Server Leader">';
		var mod = '<img src="http://www.smogon.com/media/forums/images/badges/pyramid_king.png" title="Exceptional Staff Member">';
		var league = '<img src="http://www.smogon.com/media/forums/images/badges/forumsmod.png" title="Successful League Owner">';
		var srf = '<img src="http://www.smogon.com/media/forums/images/badges/forumadmin_alum.png" title="Goodra League Champion">';
		var artist = '<img src="http://www.smogon.com/media/forums/images/badges/ladybug.png" title="Artist">';
		var twinner = '<img src="http://www.smogon.com/media/forums/images/badges/spl.png" title="Badge Tournament Winner">';
		var vip = '<img src="http://www.smogon.com/media/forums/images/badges/zeph.png" title="VIP">';
		var bot = '<img src="http://www.smogon.com/media/forums/images/badges/mind.png" title="Gold Bot Hoster">';
		var self = this;
		fs.readFile('badges.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			var row = ('' + data).split('\n');
			var match = false;
			var badges;
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var split = row[i].split(':');
				if (split[0] == targetUser.userid) {
					match = true;
					currentbadges = split[1];
				}
			}
			if (match == true) {
				var badgelist = '';
				if (currentbadges.indexOf('fgs') > -1) badgelist += ' ' + fgs;
				if (currentbadges.indexOf('admin') > -1) badgelist += ' ' + admin;
				if (currentbadges.indexOf('dev') > -1) badgelist += ' ' + dev;
				if (currentbadges.indexOf('creator') > -1) badgelist += ' ' + creator;
				if (currentbadges.indexOf('comcun') > -1) badgelist += ' ' + comcun;
				if (currentbadges.indexOf('leader') > -1) badgelist += ' ' + leader;
				if (currentbadges.indexOf('mod') > -1) badgelist += ' ' + mod;
				if (currentbadges.indexOf('league') > -1) badgelist += ' ' + league;
				if (currentbadges.indexOf('champ') > -1) badgelist += ' ' + champ;
				if (currentbadges.indexOf('artist') > -1) badgelist += ' ' + artist;
				if (currentbadges.indexOf('twinner') > -1) badgelist += ' ' + twinner;
				if (currentbadges.indexOf('vip') > -1) badgelist += ' ' + vip;
				if (currentbadges.indexOf('bot') > -1) badgelist += ' ' + bot;
				self.sendReplyBox(targetUser.userid + "'s badges: " + badgelist);
				room.update();
			} else {
				self.sendReplyBox('User ' + targetUser.userid + ' has no badges.');
				room.update();
			}
		});
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
	Object.merge(Gold, {
	hasBadge: function(user, badge) {
		var data = fs.readFileSync('badges.txt', 'utf8');
		var row = data.split('\n');
		var badges = '';
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var split = row[i].split(':');
			if (split[0] == toId(user)) {
				if (split[1].indexOf(badge) > -1) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
});
};
