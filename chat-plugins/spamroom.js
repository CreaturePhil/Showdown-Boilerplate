'use strict';

var spamroom = Rooms.get("spamroom");

if (!spamroom) {
	Rooms.global.addChatRoom("Spam Room");
	spamroom = Rooms.get("spamroom");
	spamroom.isPrivate = true;
	spamroom.staffRoom = true;
	spamroom.chatRoomData.isPrivate = true;
	spamroom.chatRoomData.staffRoom = true;
	spamroom.chatRoomData.addedUsers = {};
	spamroom.chatRoomData.exceptions = {};
	Rooms.global.writeChatRoomData();
}
var userlist = spamroom.chatRoomData.addedUsers;
var exceptions = spamroom.chatRoomData.exceptions;

Users.User.prototype.isSpamroomed = function () {
	if (exceptions[this.userid]) return false;
	if (userlist[this.userid]) return true;
	for (var i in this.prevNames)
		if (exceptions[i]) return false;
		if (userlist[i]) return true;
	for (var i = 0; i < this.getAlts().length; i++)
		if (userlist[this.getAlts()[i]]) return true;
	return false;
}

function addUser (target, user) {
	var names = [];
	userlist[target.userid] = true;
	for (var name in target.prevNames) {
		userlist[toId(name)] = true;
		names.push(name);
	}
	var alts = target.getAlts();
	for (var i = 0; i < alts.length; i++) {
		if (!user.can('lock', target)) continue;
		userlist[toId(alts[i])] = true;
		names.push(Users.get(alts[i].name));
	}
	Rooms.global.writeChatRoomData();
	console.log('hi');
	return names;
}

function removeUser (target, user) {
	var names = [];
	delete userlist[target.userid];
	for (var name in target.prevNames) {
		delete userlist[toId(name)];
		names.push(name);
	}
	var alts = target.getAlts();
	for (var i = 0; i < alts.length; i++) {
		if (!user.can('lock', target)) continue;
		delete userlist[toId(alts[i])];
		names.push(Users.get(alts[i].name));
	}
	Rooms.global.writeChatRoomData();
	console.log('hi');
	return names;
}

var commands = {
	'': 'add',
	add: function (target, room, user, connection, cmd) {
		if (!this.can('lock')) return false;
		if (!toId(target)) return this.sendReply('/spamroom ' + cmd + ' [user] - Adds a user and their alts to the spamroom.');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User ' + target + ' not found.');
		if (!this.can('lock', targetUser)) return false;
		delete exceptions[targetUser.userid];
		Rooms.global.writeChatRoomData();
		if (userlist[targetUser.userid]) return this.sendReply(targetUser.name + ' is already in the spamroom!');
		var alts = addUser(targetUser, user);
		this.privateModCommand('(' + targetUser.name + ' was added to the spamroom.)');
		if (alts.length) this.privateModCommand('(' + targetUser.name + '\'s alts were added to the spamroom: ' + alts.join(', '));
	},
	removeuser: 'remove',
	removeusers: 'remove',
	removealts: 'remove',
	remove: function (target, room, user, connection, cmd) {
		if (!this.can('lock')) return false;
		if (!toId(target)) return this.sendReply('/spamroom ' + cmd + ' [user] - Removes a user and all of their alts from the spamroom.');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User ' + target + ' not found.');
		if (!this.can('lock', targetUser)) return false;
		var check;
		if (exceptions[targetUser.userid]) check = true;
		if (!userlist[targetUser.userid] || check) return this.sendReply(targetUser.name + ' isn\'t in the spamroom.');
		var alts = removeUser(targetUser, user);
		if (!check) this.privateModCommand('(' + targetUser.name + ' was removed from the spam room.)');
		if (alts.length) this.privateModCommand('(' + targetUser.name + '\'s alts were removed from the spamroom: ' + alts.join(', '));
	},
	
	exception: function (target, room, user, connection, cmd) {
		if (!this.can('lock')) return false;
		if (!toId(target)) return this.sendReply('/spamroom ' + cmd + ' [user] - Excludes a specific user from the spam room.');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User ' + target + ' not found.');
		if (!this.can('lock', targetUser)) return false;
		exceptions[targetUser.userid] = true;
		Rooms.global.writeChatRoomData();
		this.privateModCommand('(' + targetUser.name + ' was given an exception from the spam room.)');
	},
	
	removeexception: 'unexception',
	unexception: function (target, room, user, connection, cmd) {
		if (!this.can('lock')) return false;
		if (!toId(target)) return this.sendReply('/spamroom ' + cmd + ' [user] - Excludes a specific user from the spam room.');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User ' + target + ' not found.');
		if (!this.can('lock', targetUser)) return false;
		delete exceptions[targetUser.userid];
		Rooms.global.writeChatRoomData();
		this.privateModCommand('(' + targetUser.name + '\'s exception from the spam room was removed.)');
	},
	
	list: 'view',
	see: 'view',
	view: function (target, room, user, connection, cmd) {
		if (!this.can('lock')) return false;
		var list = [];
		for (var i in userlist) {
			list.push(i);
		}
		var exceptionlist = [];
		for (i in exceptions) {
			exceptionlist.push(i);
		}
		list = (list.length ? list.join(', ') : 'None');
		exceptionlist = (exceptionlist.length ? exceptionlist.join(', ') : 'None');
		this.sendReplyBox('Users in spamroom: ' + list + '<br/>Exceptions: ' + exceptionlist);
	},
	
	help: function (target, room, user) {
		if (!this.can('lock')) return false;
		this.sendReplyBox('<strong>Spamroom commands (Requires: % @ & ~):</strong><br />' +
		'- /spamroom or /shadowban or /spamroom add <i>User</i> - Adds a user and all of their alts to the spamroom <br />' +
		'- /removespamroom or /spamroom remove <i>User</i> - Removes a user and all of their alts from the spamroom <br />' +
		'- /spamroomexception or /spamroom exception <i>User</i> - Excludes a specific user from the spamroom by adding them to an exceptional list <br />' +
		'- /spamroom removeexception or /spamroom unexception <i>User</i> - Removes a specific user from the exceptional list<br />' +
		'- /spamroom list or /spamroom view - Shows all spamroomed users and users in the exceptional list<br />');
	}
};

exports.commands = {
	pm: 'msg',
	whisper: 'msg',
	w: 'msg',
	msg: function (target, room, user, connection) {
		if (!target) return this.parse('/help msg');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help msg');
		}
		this.pmTarget = (targetUser || this.targetUsername);
		if (!targetUser || !targetUser.connected) {
			if (targetUser && !targetUser.connected) {
				this.errorReply("User " + this.targetUsername + " is offline.");
				return;
			} else {
				this.errorReply("User "  + this.targetUsername + " not found. Did you misspell their name?");
				return this.parse('/help msg');
			}
			return;
		}

		if (Config.pmmodchat) {
			var userGroup = user.group;
			if (Config.groupsranking.indexOf(userGroup) < Config.groupsranking.indexOf(Config.pmmodchat)) {
				var groupName = Config.groups[Config.pmmodchat].name || Config.pmmodchat;
				this.errorReply("Because moderated chat is set, you must be of rank " + groupName + " or higher to PM users.");
				return false;
			}
		}

		if (user.locked && !targetUser.can('lock')) {
			return this.errorReply("You can only private message members of the moderation team (users marked by %, @, &, or ~) when locked.");
		}
		if (targetUser.locked && !user.can('lock')) {
			return this.errorReply("This user is locked and cannot PM.");
		}
		if (targetUser.ignorePMs && targetUser.ignorePMs !== user.group && !user.can('lock')) {
			if (!targetUser.can('lock')) {
				return this.errorReply("This user is blocking private messages right now.");
			} else if (targetUser.can('bypassall')) {
				return this.errorReply("This admin is too busy to answer private messages right now. Please contact a different staff member.");
			}
		}
		if (user.ignorePMs && user.ignorePMs !== targetUser.group && !targetUser.can('lock')) {
			return this.errorReply("You are blocking private messages right now.");
		}

		target = this.canTalk(target, null, targetUser);
		if (!target) return false;

		if (target.charAt(0) === '/' && target.charAt(1) !== '/') {
			// PM command
			var innerCmdIndex = target.indexOf(' ');
			var innerCmd = (innerCmdIndex >= 0 ? target.slice(1, innerCmdIndex) : target.slice(1));
			var innerTarget = (innerCmdIndex >= 0 ? target.slice(innerCmdIndex + 1) : '');
			switch (innerCmd) {
			case 'me':
			case 'mee':
			case 'announce':
				break;
			case 'invite':
			case 'inv':
				var targetRoom = Rooms.search(innerTarget);
				if (!targetRoom || targetRoom === Rooms.global) return this.errorReply('The room "' + innerTarget + '" does not exist.');
				if (targetRoom.staffRoom && !targetUser.isStaff) return this.errorReply('User "' + this.targetUsername + '" requires global auth to join room "' + targetRoom.id + '".');
				if (targetRoom.isPrivate === true && targetRoom.modjoin && targetRoom.auth) {
					if (Config.groupsranking.indexOf(targetRoom.auth[targetUser.userid] || ' ') < Config.groupsranking.indexOf(targetRoom.modjoin) && !targetUser.can('bypassall')) {
						return this.errorReply('The room "' + innerTarget + '" does not exist.');
					}
				}

				target = '/invite ' + targetRoom.id;
				break;
			default:
				return this.errorReply("The command '/" + innerCmd + "' was unrecognized or unavailable in private messages. To send a message starting with '/" + innerCmd + "', type '//" + innerCmd + "'.");
			}
		}

		var message = '|pm|' + user.getIdentity() + '|' + targetUser.getIdentity() + '|' + target;
		user.send(message);
		if (targetUser !== user && !user.isSpamroomed()) targetUser.send(message);
		if (user.isSpamroomed()) {
			spamroom.add('|pm|' + user.getIdentity() + '|' + targetUser.getIdentity() + '| __(Private to ' + targetUser.getIdentity() + ')__' + target);
		} else targetUser.lastPM = user.userid;
		user.lastPM = targetUser.userid;
	},
	
	shadowban: commands.add,
	removespamroom: commands.remove,
	spamroomexception: commands.unexception,
	spamroomhelp: commands.help,
	spamroomlist: commands.list,
	spamroom: commands
};

Rooms.Room.prototype.chat = function (user, message, connection) {
		// Battle actions are actually just text commands that are handled in
		// parseCommand(), which in turn often calls Simulator.prototype.sendFor().
		// Sometimes the call to sendFor is done indirectly, by calling
		// room.decision(), where room.constructor === BattleRoom.

		message = CommandParser.parse(message, this, user, connection);

		if (message && message !== true) {
			if (user.isSpamroomed()) {
				connection.sendTo(this, '|c|' + user.getIdentity() + '|' + message);
				spamroom.add('|c|' + user.getIdentity() + '|__(to room ' + this.title + ')__ ' + message);
				spamroom.update();
				return false;
			}
			this.add('|c|' + user.getIdentity(this.id) + '|' + message);
		}
		this.update();
	};
