/**
 *
 * Original Room Ranks by (Bandi & Naten ? idk), updated by Dragotic.
 *
 */

'use strict';

exports.commands = {
    roomfounder: function (target, room, user) {
        if (!room.chatRoomData) return this.errorReply("/roomfounder - This room isn\'t designed for per-room moderation to be added.");
        target = this.splitTarget(target, true);

        let targetUser = this.targetUser;

        if (!targetUser) return this.errorReply("User '" + this.targetUsername + "' is not online.");
        if (!this.can('makeroom')) return false;
        if (!room.auth) room.auth = room.chatRoomData.auth = {};

        let name = targetUser.name;
        let needsPopup = targetUser && room.users[targetUser.userid] && !room.isPrivate && !room.isPersonal && !room.battle;

        room.auth[targetUser.userid] = '#';
        room.founder = targetUser.userid;

        this.addModCommand(name + ' was appointed to Room Founder by ' + user.name + ' in ' + room.title + '.');
        if (needsPopup) targetUser.popup('You were appointed to Room Founder by ' + user.name + ' in ' + room.title + '.');

        room.onUpdateIdentity(targetUser);
        room.chatRoomData.founder = room.founder;
        Rooms.global.writeChatRoomData();
    },
    roomdefounder: 'deroomfounder',
    deroomfounder: function (target, room, user) {
        if (!room.auth) return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
        target = this.splitTarget(target, true);

        let targetUser = this.targetUser;
        let name = this.targetUsername;
        let userid = toId(name);
        let needsPopup = targetUser && room.users[targetUser.userid] && !room.isPrivate && !room.isPersonal && !room.battle;

        if (!userid || userid === '') return this.errorReply("User '" + name + "' does not exist.");

        if (room.auth[userid] !== '#') return this.errorReply("User '" + name + "' is not a room founder.");
        if (!this.can('makeroom', null, room)) return false;

        delete room.auth[userid];
        delete room.founder;

        this.sendReply('(' + name + ' is no longer Room Founder in ' + room.title + '.' + ')');
        targetUser.send('(You are no longer Room Founder in ' + room.title + '.' + ')');
        if (needsPopup) targetUser.popup('You are no longer Room Founder in ' + room.title + '.');
        if (targetUser) targetUser.updateIdentity();
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
    },
};
