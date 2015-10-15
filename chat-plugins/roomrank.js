exports.commands = {
    roomfounder: function (target, room, user) {
        if (!room.chatRoomData) {
            return this.sendReply("/roomfounder - This room isn\'t designed for per-room moderation to be added.");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
        if (!this.can('makeroom')) return false;
        if (!room.auth) room.auth = room.chatRoomData.auth = {};
        if (!room.leagueauth) room.leagueauth = room.chatRoomData.leagueauth = {};
        var name = targetUser.name;
        room.auth[targetUser.userid] = '#';
        room.founder = targetUser.userid;
        this.addModCommand(name + ' was appointed to Room Founder by ' + user.name + '.');
        room.onUpdateIdentity(targetUser);
        room.chatRoomData.founder = room.founder;
        Rooms.global.writeChatRoomData();
    },

    roomdefounder: 'deroomfounder',
    deroomfounder: function (target, room, user) {
        if (!room.auth) {
            return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        var name = this.targetUsername;
        var userid = toId(name);
        if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

        if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room founder.");
        if (!this.can('makeroom', null, room)) return false;

        delete room.auth[userid];
        delete room.founder;
        this.sendReply("(" + name + " is no longer Room Founder.)");
        if (targetUser) targetUser.updateIdentity();
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
    },

    roomowner: function (target, room, user) {
        if (!room.chatRoomData) {
            return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;

        if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
        if (!targetUser.registered) return this.sendReply("User '" + name + "' is not registered.");

        if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
        if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');

        if (!room.auth) room.auth = room.chatRoomData.auth = {};

        var name = targetUser.name;

        room.auth[targetUser.userid] = '#';
        this.addModCommand("" + name + " was appointed Room Owner by " + user.name + ".");
        room.onUpdateIdentity(targetUser);
        Rooms.global.writeChatRoomData();
    }, 

    deroomowner: function (target, room, user) {
        if (!room.auth) {
            return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        var name = this.targetUsername;
        var userid = toId(name);
        if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

        if (room.auth[userid] !== '#') return this.sendReply("User '"+name+"' is not a room owner.");
        if (!room.founder || user.userid !== room.founder && !this.can('makeroom', null, room)) return false;

        delete room.auth[userid];
        this.sendReply("(" + name + " is no longer Room Owner.)");
        if (targetUser) targetUser.updateIdentity();
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
    },

    roomdemote: 'roompromote',
    roompromote: function (target, room, user, connection, cmd) {
        if (!room.auth) {
            this.sendReply("/roompromote - This room isn't designed for per-room moderation");
            return this.sendReply("Before setting room mods, you need to set it up with /roomowner");
        }
        if (!target) return this.parse('/help roompromote');

        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        var userid = toId(this.targetUsername);
        var name = targetUser ? targetUser.name : this.targetUsername;

        if (!userid) return this.parse('/help roompromote');
        if (!targetUser && (!room.auth || !room.auth[userid])) {
            return this.sendReply("User '" + name + "' is offline and unauthed, and so can't be promoted.");
        }

        if (targetUser && !targetUser.registered) return this.sendReply("User '" + name + "' is not registered.");

        var currentGroup = ((room.auth && room.auth[userid]) || ' ')[0];
        var nextGroup = target || Users.getNextGroupSymbol(currentGroup, cmd === 'roomdemote', true);
        if (target === 'deauth') nextGroup = Config.groupsranking[0];
        if (!Config.groups[nextGroup]) {
            return this.sendReply("Group '" + nextGroup + "' does not exist.");
        }

        if (Config.groups[nextGroup].globalonly) {
            return this.sendReply("Group 'room" + Config.groups[nextGroup].id + "' does not exist as a room rank.");
        }

        var groupName = Config.groups[nextGroup].name || "regular user";
        if (currentGroup === nextGroup) {
            return this.sendReply("User '" + name + "' is already a " + groupName + " in this room.");
        }
        if (currentGroup !== ' ' && !user.can('room' + (Config.groups[currentGroup] ? Config.groups[currentGroup].id : 'voice'), null, room)) {
            return this.sendReply("/" + cmd + " - Access denied for promoting from " + (Config.groups[currentGroup] ? Config.groups[currentGroup].name : "an undefined group") + ".");
        }
        if (nextGroup !== ' ' && !user.can('room' + Config.groups[nextGroup].id, null, room)) {
            return this.sendReply("/" + cmd + " - Access denied for promoting to " + Config.groups[nextGroup].name + ".");
        }

        if (nextGroup === ' ') {
            delete room.auth[userid];
        } else {
            room.auth[userid] = nextGroup;
        }

        if (Config.groups[nextGroup].rank < Config.groups[currentGroup].rank) {
            this.privateModCommand("(" + name + " was demoted to Room " + groupName + " by " + user.name + ".)");
            if (targetUser && Rooms.rooms[room.id].users[targetUser.userid]) targetUser.popup("You were demoted to Room " + groupName + " by " + user.name + ".");
        } else if (nextGroup === '#') {
            this.addModCommand("" + name + " was promoted to " + groupName + " by " + user.name + ".");
        } else {
            this.addModCommand("" + name + " was promoted to Room " + groupName + " by " + user.name + ".");
        }

        if (targetUser) targetUser.updateIdentity(room.id);
        if (room.chatRoomData) Rooms.global.writeChatRoomData();
    },

};
