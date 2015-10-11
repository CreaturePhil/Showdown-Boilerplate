exports.commands = {
	 autovoice: 'autorank',
	 autodriver: 'autorank',
	 automod: 'autorank',
	 autoowner: 'autorank',
	 autopromote: 'autorank',
	 autorank: function(target, room, user, connection, cmd) {
	 	switch (cmd) {
	 		case 'autovoice':
	 			target = '+';
	 			break;
	 		case 'autodriver':
	 			target = '%';
	 			break;
	 		case 'automod':
	 			target = '@';
	 			break;
	 		case 'autoowner':
	 			target = '#';
	 			break;
	 	}

	 	if (!target) return this.sendReply("Usage: /autorank [rank] - Automatically promotes user to the specified rank when they join the room.");
	 	if (!this.can('roommod', null, room)) return false;
	 	target = target.trim();

	 	if (target === 'off' && room.autorank) {
	 		delete room.autorank;
	 		delete room.chatRoomData.autorank;
	 		Rooms.global.writeChatRoomData();
	 		for (var u in room.users) Users.users[u].updateIdentity();
	 		return this.privateModCommand("(" + user.name + " has disabled autorank in this room.)");
	 	}
	 	if (room.autorank && room.autorank === target) return this.sendReply("Autorank is already set to \"" + target + "\".");

	 	if (Config.groups[target] && !Config.groups[target].globalonly) {
	 		if (target === '#' && user.userid !== room.founder) return this.sendReply("You can't set autorank to # unless you're the room founder.");
	 		room.autorank = target;
	 		room.chatRoomData.autorank = target;
	 		Rooms.global.writeChatRoomData();
	 		for (var u in room.users) Users.users[u].updateIdentity();
	 		return this.privateModCommand("(" + user.name + " has set autorank to \"" + target + "\" in this room.)");
	 	}
	 	return this.sendReply("Group \"" + target + "\" not found.");
	 }
	 
};
