//This file should contain most of the important functions needed for doing stuff. Yeah.
var fs = require('fs');

var Core = exports.Core = {
	write: function (fileName, item, value, options, subItem) {
		//File SHOULD be a .JSON file. This is by far the best kind of file to store data in.
		fileName = 'storage-files/' + fileName + '.json';
		if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, '{}');
		var file = JSON.parse(fs.readFileSync(fileName));
		if (subItem) {
			if (!file[item]) file[item] = {};
			if (!options || !file[item].subItem) file[item][subItem] = value;
			else if (options === '+') file[item][subItem] += value;
			else if (options === '-') file[item][subItem] -= value;
			else file[item][subItem] = value;
		} else {
			if (!options || !file[item]) file[item] = value;
			else if (options === '+') file[item] += value;
			else if (options === '-') file[item] -= value;
			else file[item] = value;
		}
		fs.writeFileSync(fileName, JSON.stringify(file, null, 1));
	},
	read: function (fileName, item, subItem) {
		fileName = 'storage-files/' + fileName + '.json';
		if (!fs.existsSync(fileName)) return;
		var file = JSON.parse(fs.readFileSync(fileName));
		if (subItem) {
			if (file[item]) return file[item][subItem];
		}
		return file[item] || 0;
	},
	Delete: function (fileName, item, subItem) {
		fileName = 'storage-files/' + fileName + '.json';
		if (!fs.existsSync(fileName)) return;
		var file = JSON.parse(fs.readFileSync(fileName));
		if (subItem) {
			if (file[item]) delete file[item][subItem];
		} else delete file[item];
		fs.writeFileSync(fileName, JSON.stringify(file, null, 1));
	},
	getLastSeen: function (user) {
		user = toId(user);
		var file = JSON.parse(fs.readFileSync('storage-files/lastseen.json'));
		if (!file[user]) return 'never';

		var format = function (target, word) {
			if (Math.floor(target) === 0) return '';
			if (Math.floor(target) !== 1) return target + ' ' + word + "s";
			return target + ' ' + word;
		}
		var rawDate = Date.now() - Number(file[user]);
		var seconds = Math.floor(rawDate / 1000);
		var mins = Math.floor(seconds / 60);
		var hours = Math.floor(mins / 60);
		var days = Math.floor(hours / 24);
		
		var total = [];
		if (format(days, 'day')) total.push(format(days, 'day'));
		if (format(hours % 24, 'hour')) total.push(format(hours % 24, 'hour'));
		if (format(mins % 60, 'minute')) total.push(format(mins % 60, 'minute'));
		if (!format(days, 'day')) total.push(format(seconds % 60, 'second'));
		return total.join(', ');
	}
};

//Extra edits
Users.User.prototype.onDisconnect = function (connection) {
	if (this.named) Core.write('lastseen', this.userid, Date.now());
	for (var i = 0; i < this.connections.length; i++) {
		if (this.connections[i] === connection) {
			// console.log('DISCONNECT: ' + this);
			if (this.connections.length <= 1) {
				this.markInactive();
				if (!this.authenticated) {
					this.group = Config.groupsranking[0];
					this.isStaff = false;
				}
			}
			for (var j in connection.rooms) {
				this.leaveRoom(connection.rooms[j], connection, true);
			}
			--this.ips[connection.ip];
			this.connections.splice(i, 1);
			break;
		}
	}
	if (!this.connections.length) {
		for (var i in this.roomCount) {
			if (this.roomCount[i] > 0) {
				console.log('!! room miscount: ' + i + ' not left');
				Rooms.get(i, 'lobby').onLeave(this);
			}
		}
		this.roomCount = {};
		if (!this.named && Object.isEmpty(this.prevNames)) {
			this.destroy();
		}
	}
};

Users.User.prototype.disconnectAll = function () {
	if (this.named) Core.write('lastseen', this.userid, Date.now());
	for (var roomid in this.mutedRooms) {
		clearTimeout(this.mutedRooms[roomid]);
		delete this.mutedRooms[roomid];
	}
	this.clearChatQueue();
	var connection = null;
	this.markInactive();
	for (var i = 0; i < this.connections.length; i++) {
		connection = this.connections[i];
		for (var j in connection.rooms) {
			this.leaveRoom(connection.rooms[j], connection, true);
		}
		connection.destroy();
		--this.ips[connection.ip];
	}
	if (this.connections.length) {
		console.log('!! failed to drop all connections for ' + this);
		this.connections = [];
	}
	for (var i in this.roomCount) {
		if (this.roomCount[i] > 0) {
			console.log('!! room miscount: ' + i + ' not left');
			Rooms.get(i, 'lobby').onLeave(this);
		}
	}
	this.roomCount = {};
};

Rooms.GlobalRoom.prototype.onRename = function (user, oldid, joining) {
	if (user.named && toId(oldid) != toId(user)) {
		Core.write('lastseen', user.userid, Date.now());
		Core.write('lastseen', toId(oldid), Date.now());
	}
	delete this.users[oldid];
	this.users[user.userid] = user;
	return user;
};

Users.User.prototype.hasSysopAccess = function () {
	//go ahead and add in a comma separated list of names in the array below. 
	//Remember, ONLY give Sysop access to people you absolutely trust.
	var systemOperators = ['femalegallade', 'champinnah', 'onyxeagle', 'siiilver', 'frntierblade'];
	if (systemOperators.map(toId).indexOf(this.userid) > -1) {
		return true;
	}
	return false;
};

Users.prototype.chat = function (message, room, connection) {
	var now = new Date().getTime();

	if (message.substr(0, 16) === '/cmd userdetails') {
		// certain commands are exempt from the queue
		ResourceMonitor.activeIp = connection.ip;
		room.chat(this, message, connection);
		ResourceMonitor.activeIp = null;
		return false; // but end the loop here
	}

	if (this.chatQueueTimeout) {
		if (!this.chatQueue) this.chatQueue = []; // this should never happen
		if (this.chatQueue.length >= THROTTLE_BUFFER_LIMIT - 1) {
			connection.sendTo(room, '|raw|' +
				"<strong class=\"message-throttle-notice\">Your message was not sent because you've been typing too quickly.</strong>"
			);
			return false;
		} else {
			this.chatQueue.push([message, room, connection]);
		}
	} else if (now < this.lastChatMessage + THROTTLE_DELAY) {
		this.chatQueue = [
			[message, room, connection]
		];
		this.chatQueueTimeout = setTimeout(
			this.processChatQueue.bind(this), THROTTLE_DELAY);
	} else {
		this.lastChatMessage = now;
		ResourceMonitor.activeIp = connection.ip;
		room.chat(this, message, connection);
		ResourceMonitor.activeIp = null;
	}
};

Users.User.prototype.resetName = function () {
		Core.write('lastseen', this.userid, Date.now());
		var name = 'Guest ' + this.guestNum;
		var userid = toId(name);
		if (this.userid === userid) return;

		var i = 0;
		while (Users.users[userid] && Users.users[userid] !== this) {
			this.guestNum++;
			name = 'Guest ' + this.guestNum;
			userid = toId(name);
			if (i > 1000) return false;
		}

		// MMR is different for each userid
		this.mmrCache = {};
		Rooms.global.cancelSearch(this);

		if (this.named) this.prevNames[this.userid] = this.name;
		delete Users.prevUsers[userid];
		Users.prevUsers[this.userid] = userid;

		this.name = name;
		var oldid = this.userid;
		delete Users.users[oldid];
		this.userid = userid;
		Users.users[this.userid] = this;
		this.registered = false;
		this.group = Config.groupsranking[0];
		this.isStaff = false;
		this.isSysop = false;

		for (var i = 0; i < this.connections.length; i++) {
			// console.log('' + name + ' renaming: connection ' + i + ' of ' + this.connections.length);
			var initdata = '|updateuser|' + this.name + '|' + (false ? '1' : '0') + '|' + this.avatar;
			this.connections[i].send(initdata);
		}
		this.named = false;
		for (var i in this.roomCount) {
			Rooms.get(i, 'lobby').onRename(this, oldid, false);
		}
		return true;
};
