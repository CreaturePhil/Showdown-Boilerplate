/**
 * Foundation commands
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * These are the fundamental custom commands that most
 * Pokemon Showdown private server have.
 *
 * Command categories: General, Staff
 *
 * @license MIT license
 */

const MAX_REASON_LENGTH = 300;

var foundationCommands = exports.foundationCommands = {

	away: 'back',
	back: function (target, room, user, connection, cmd) {
		if (!user.away && cmd.toLowerCase() === 'back') return this.sendReply('You are not set as away.');
		user.away = !user.away;
		user.updateIdentity();
		this.sendReply("You are " + (user.away ? "now" : "no longer") + " away.");
	},

	/*********************************************************
	 * Staff
	 *********************************************************/

	/*hide: 'hideauth',
	hideauth: function (target, room, user) {
		if (!this.can('hideauth')) return false;
		target = target || Config.groups.default.global;
		if (!Config.groups.global[target]) {			
			target = Config.groups.default.global;
			this.sendReply("You have picked an invalid group, defaulting to '" + target + "'.");
		} else if (Config.groups.bySymbol[target].globalRank >= Config.groups.bySymbol[user.group].globalRank)
			return this.sendReply("The group you have chosen is either your current group OR one of higher rank. You cannot hide like that.");

		user.getIdentity = function (roomid) {
			var identity = Object.getPrototypeOf(this).getIdentity.call(this, roomid);
			if (identity[0] === this.group)
				return target + identity.slice(1);
			return identity;
		};
		user.updateIdentity();
		return this.sendReply("You are now hiding your auth as '" + target + "'.");
	},

	show: 'showauth',
	showauth: function (target, room, user) {
		if (!this.can('hideauth')) return false;
		delete user.getIdentity;
		user.updateIdentity();
		return this.sendReply("You are now showing your authority!");
	},

	kick: function(target, room, user){
		if (!this.can('kick')) return false;
		if (!target) return this.sendReply('|raw|/kick <em>username</em> - kicks the user from the room.');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User '+target+' not found.');
		if (targetUser.can('lockdown') || targetUser.name === botName) {
			return this.sendReply('This user can\'t be room kicked.');
		}
		if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target+' is not in this room.');
		targetUser.popup('You have been kicked from room '+ room.title +' by '+user.name+'.');
		targetUser.leaveRoom(room);
		room.add('|raw|'+ targetUser.name + ' has been kicked from room by '+ user.name + '.');
		this.logModCommand(user.name+' kicked '+targetUser.name+' from ' +room.id);
	},*/

};

Object.merge(CommandParser.commands, foundationCommands);