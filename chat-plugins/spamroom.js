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
