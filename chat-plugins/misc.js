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

		var pmName = '☆Royal Family';

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

		var pmName = '☆Royal Family';

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
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."]

	siiilver: function (target, room, user) {
		var colorify = function (text) {
			var colors = ['red', 'orange', 'yellow', 'lime', '#007fff', 'cyan', '#9800ff', 'violet'], set = [];
			for (var i = 0, j = 0; i < text.length; i++) {
				set.push(text[i].trim() ? '<span style = "color: ' + colors[j] + '; text-shadow: 0px 0px 10px;">' + text[i] + '</span>' : text[i]);
				if (!text[i].trim()) continue;
				if (j === colors.length - 1) j = 0; else j++;
			}
			return set.join('');
		}
		var msg;
		if (Users.get('siiilver') && Users.get('siiilver').connected) {
			msg = '<button name = "send" value = "/transferbucks ' + Users.get('siiilver').name + ', 1" style = "margin: 3px; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('$$$ Click 2 flip bucks at me! (I liek donations) $$$') + '</b></span></button><br>' +
				'<button name = "send" value = "/me pets Siiilver-chan :3" style = "margin: 3px; color: silver; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('Pet me') + ' :3</b></span></button>' +
				' <button name = "send" value = "/kick ' + Users.get('siiilver').name + ', 2sexy4us" style = "margin: 3px; color: silver; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('Kick me') + '</b> ' + colorify('(Only 4 da mods, cuz they r sweg)') + '</span></button>';
		} else msg = '<button name = "send" value = "/seen siiilver" style = "margin: 3px; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('Click 2 see when I was in da club last~') + '</b></span></button><br>';
		this.sendReply('|html|<center><div style = "border-radius: 7px; padding: 5px; box-shadow: 2px 2px 5px black; background: radial-gradient(circle, #1c1c1c, #333232, #1c1c1c, #333232, #1c1c1c, #333232);">' +
			'<b style = "font-size: 17pt;">' + colorify('☆☆☆☆☆☆☆☆ S I I I L V E R ☆☆☆☆☆☆☆☆') + '</b><br>' +
			'<i><span style = "color: silver; text-shadow: 0px 0px 5px;">"Not all heroes wear capes... Some like me wear just underwear :D"</span></i><br>' +
			'<br><div style = "display: inline-block; width: 49%"><img style = "max-height: 100%; max-width: 100%;" src = "http://data.whicdn.com/images/56986059/large.gif"></div> ' +
			'<div style = "display: inline-block; width: 49%"><img style = "max-height: 100%; max-width: 100%;" src = "http://i.skyrock.net/1358/86461358/pics/3227855009_1_10_BQlwaOHj.gif"></div><br>' +
			msg + '<br><span style = "text-shadow: 0px 0px 5px"><b>' + colorify('Known 4:') + '</b>' +
			'<span style = "color: silver; text-shadow: 0px 0px 5px"><li>Being a verr verr gud chat presence and being an inspiration to eberywun around~' +
			'<li>Turning men on with mah sexy body<br>' + 
			'<li>Molesting pinapples</i><br>' + 
			(user.userid === 'siiilver' ? '' : '<br><span style = "text-shadow: 0px 0px 5px"><b><span style = "color: lime;">P</span><span style = "color: #007fff;">.</span><span style = "color: cyan;">S</span><span style = "color: #9800ff;">.</span></b>- <span style = "color: silver">' + user.name + '\'s a n00b</span></span><br>') +
			'<marquee behavior = "alternate" scrollamount = "20"><b style = "font-size: 10pt">' + colorify('WHEEEEEEEEEEEEE!') + '</b></marquee>'
		);
	},
};
