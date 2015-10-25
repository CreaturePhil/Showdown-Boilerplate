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
    
    roomleader: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;

		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");

		if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
		if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		var name = targetUser.name;

		room.auth[targetUser.userid] = '&';
		this.addModCommand("" + name + " was appointed Room Leader by " + user.name + ".");
		room.onUpdateIdentity(targetUser);
		Rooms.global.writeChatRoomData();
	},


	roomdeleader: 'deroomowner',
	deroomleader: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		var name = this.targetUsername;
		var userid = toId(name);
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

		if (room.auth[userid] !== '&') return this.sendReply("User '"+name+"' is not a room leader.");
		if (!room.founder || user.userid !== room.founder && !this.can('makeroom', null, room)) return false;

		delete room.auth[userid];
		this.sendReply("(" + name + " is no longer Room Leader.)");
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

    roomhelp: function (target, room, user) {
        if (room.id === 'lobby' || room.battle) return this.sendReply("This command is too spammy for lobby/battles.");
        if (!this.canBroadcast()) return;
        this.sendReplyBox(
            "Room drivers (%) can use:<br />" +
            "- /warn OR /k <em>username</em>: warn a user and show the Pokemon Showdown rules<br />" +
            "- /mute OR /m <em>username</em>: 7 minute mute<br />" +
            "- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
            "- /unmute <em>username</em>: unmute<br />" +
            "- /announce OR /wall <em>message</em>: make an announcement<br />" +
            "- /modlog <em>username</em>: search the moderator log of the room<br />" +
            "- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
            "<br />" +
            "Room moderators (@) can also use:<br />" +
            "- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
            "- /roomunban <em>username</em>: unbans user from the room<br />" +
            "- /roomvoice <em>username</em>: appoint a room voice<br />" +
            "- /roomdevoice <em>username</em>: remove a room voice<br />" +
            "- /modchat <em>[off/autoconfirmed/+]</em>: set modchat level<br />" +
            "<br />" +
            "Room owners (#) can also use:<br />" +
            "- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
            "- /rules <em>rules link</em>: set the room rules link seen when using /rules<br />" +
            "- /roommod, /roomdriver <em>username</em>: appoint a room moderator/driver<br />" +
            "- /roomdemod, /roomdedriver <em>username</em>: remove a room moderator/driver<br />" +
            "- /modchat <em>[%/@/#]</em>: set modchat level<br />" +
            "- /declare <em>message</em>: make a large blue declaration to the room<br />" +
            "- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
            "- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
            "<br />" +
            "Room founders (#) can also use<br />" +
            "- /roomowner <em>username</em> - Appoints username as a room owner<br />" +
            "<br />" +
            "More detailed help can be found in the <a href=\"https://www.smogon.com/sim/roomauth_guide\">roomauth guide</a><br />" +
            "</div>"
        );
    },
    
    roomlock: 'lockroom',
	lockroom: function(target, room, user) {
		if (!room.auth) {
			return this.sendReply("Only unofficial chatrooms can be locked.");
		}
		if (room.auth[user.userid] != '#' && user.group != '~') {
			return this.sendReply('/lockroom - Access denied.');
		}
		room.lockedRoom = true;
		this.addModCommand(user.name + ' has locked the room.');
	},

	roomunlock: 'unlockroom',
	unlockroom: function(target, room, user) {
		if (!room.auth) {
			return this.sendReply("Only unofficial chatrooms can be unlocked.");
		}
		if (room.auth[user.userid] != '#' && user.group != '~') {
			return this.sendReply('/unlockroom - Access denied.');
		}
		room.lockedRoom = false;
		this.addModCommand(user.name + ' has unlocked the room.');
	},

    roomintro: function (target, room, user) {
        if (!target) {
            if (!this.canBroadcast()) return;
            if (!room.introMessage) return this.sendReply("This room does not have an introduction set.");
            this.sendReplyBox(room.introMessage);
            if (!this.broadcasting && user.can('declare', null, room)) {
                this.sendReply('Source:');
                this.sendReplyBox('<code>' + Tools.escapeHTML(room.introMessage) + '</code>');
            }
            return;
        }
        if (!this.can('declare', null, room)) return false;
        if (!this.canHTML(target)) return;
        if (!/</.test(target)) {
            // not HTML, do some simple URL linking
            var re = /(https?:\/\/(([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?))/g;
            target = target.replace(re, '<a href="$1">$1</a>');
        }

        if (!target.trim()) target = '';
        room.introMessage = target;
        this.sendReply("(The room introduction has been changed to:)");
        this.sendReplyBox(target);

        this.privateModCommand("(" + user.name + " changed the roomintro.)");

        if (room.chatRoomData) {
            room.chatRoomData.introMessage = room.introMessage;
            Rooms.global.writeChatRoomData();
        }
    }
};
