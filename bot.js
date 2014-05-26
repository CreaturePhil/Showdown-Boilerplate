/**
 * Bot
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * Bot Parser comes from TTT (https://github.com/TalkTakesTime/Pokemon-Showdown-Bot).
 *
 * @license MIT license
 */

var config = exports.config = {
    name: 'Booty-Bot',
    userid: function () {
        return toId(this.name);
    },
    group: '@',
    join: true,
    rooms: ['lobby'],
    punishvals: {
		1: 'warn',
		2: 'mute',
		3: 'hourmute',
		4: 'roomban',
		5: 'ban'
	},
	privaterooms: ['staff']
};

/**
 * On server start, this sets up fake user connection for bot and uses a fake ip.
 * It gets a the fake user from the users list and modifies it properties. In addition,
 * it sets up rooms that bot will join and adding the bot user to Users list and
 * removing the fake user created which already filled its purpose
 * of easily filling  in the gaps of all the user's property.
 */

function joinServer() {
	if (process.uptime() > 5) return; // to avoid running this function again when reloading
    var worker = new(require('./fake-process.js').FakeProcess)();
    Users.socketConnect(worker.server, undefined, '1', '76.19.156.198');

    for (var i in Users.users) {
        if (Users.users[i].connections[0].ip === '76.19.156.198') {

            var bot = Users.users[i];

            bot.name = config.name;
            bot.named = true;
            bot.renamePending = config.name;
            bot.authenticated = true;
            bot.userid = config.userid();
            bot.group = config.group;

            if (config.join === true) {
                for (var all in Rooms.rooms) {
                    if (all != 'global') {
                        bot.roomCount[all] = 1;
                    }
                }
                Users.users[bot.userid] = bot;
                for (var allRoom in Rooms.rooms) {
                    if (allRoom != 'global') {
                        Rooms.rooms[allRoom].users[Users.users[bot.userid]] = Users.users[bot.userid];
                    }
                }
            } else {
                for (var index in config.rooms) {
                    if (index != 'global') {
                        bot.roomCount[joinRooms[index]] = 1;
                    }
                }
                Users.users[bot.userid] = bot;
                for (var jIndex in config.rooms) {
                    if (jIndex != 'global') {
                        Rooms.rooms[jIndex].users[Users.users[bot.userid]] = Users.users[bot.userid];
                    }
                }
            }
            delete Users.users[i];
        }
    }
};

exports.joinServer = joinServer;

joinServer();

const ACTION_COOLDOWN = 3*1000;
const FLOOD_MESSAGE_NUM = 5;
const FLOOD_PER_MSG_MIN = 500; // this is the minimum time between messages for legitimate spam. It's used to determine what "flooding" is caused by lag
const FLOOD_MESSAGE_TIME = 6*1000;
const MIN_CAPS_LENGTH = 18;
const MIN_CAPS_PROPORTION = 0.8;

exports.parse = {
	chatData: {},
	processChatData: function(user, room, connection, message) {
		if (user.userid === config.userid()) return;
		message = message.trim().replace(/ +/g, " "); // removes extra spaces so it doesn't trigger stretching
		this.updateSeen(user.userid, 'c', room.title);
		var time = Date.now();
		if (!this.chatData[user]) this.chatData[user] = {
			zeroTol: 0,
			lastSeen: '',
			seenAt: time
		};
		if (!this.chatData[user][room]) this.chatData[user][room] = {times:[], points:0, lastAction:0};

		this.chatData[user][room].times.push(time);

		var pointVal = 0;
		var muteMessage = '';

		// moderation for flooding (more than x lines in y seconds)
		var isFlooding = (this.chatData[user][room].times.length >= FLOOD_MESSAGE_NUM && (time - this.chatData[user][room].times[this.chatData[user][room].times.length - FLOOD_MESSAGE_NUM]) < FLOOD_MESSAGE_TIME && (time - this.chatData[user][room].times[this.chatData[user][room].times.length - FLOOD_MESSAGE_NUM]) > (FLOOD_PER_MSG_MIN * FLOOD_MESSAGE_NUM));
		if (isFlooding) {
			if (pointVal < 2) {
				pointVal = 2;
				muteMessage = ', Automated response: flooding';
			}
		}
		// moderation for caps (over x% of the letters in a line of y characters are capital)
		var capsMatch = message.replace(/[^A-Za-z]/g, '').match(/[A-Z]/g);
		if (capsMatch && toId(message).length > MIN_CAPS_LENGTH && (capsMatch.length >= Math.floor(toId(message).length * MIN_CAPS_PROPORTION))) {
			if (pointVal < 1) {
				pointVal = 1;
				muteMessage = ', Automated response: caps';
			}
		}
		// moderation for stretching (over x consecutive characters in the message are the same)
		var stretchMatch = message.toLowerCase().match(/(.)\1{7,}/g) || message.toLowerCase().match(/(..+)\1{4,}/g); // matches the same character (or group of characters) 8 (or 5) or more times in a row
		if (stretchMatch) {
			if (pointVal < 1) {
				pointVal = 1;
				muteMessage = ', Automated response: stretching';
			}
		}
		if (pointVal > 0 && !(time - this.chatData[user][room].lastAction < ACTION_COOLDOWN)) {
			var cmd = 'mute';
			// defaults to the next punishment in config.punishVals instead of repeating the same action (so a second warn-worthy
			// offence would result in a mute instead of a warn, and the third an hourmute, etc)
			if (this.chatData[user][room].points >= pointVal && pointVal < 4) {
				this.chatData[user][room].points++;
				cmd = config.punishvals[this.chatData[user][room].points] || cmd;
			} else { // if the action hasn't been done before (is worth more points) it will be the one picked
				cmd = config.punishvals[pointVal] || cmd;
				this.chatData[user][room].points = pointVal; // next action will be one level higher than this one (in most cases)
			}
			if (config.privaterooms.indexOf(room) >= 0 && cmd === 'warn') cmd = 'mute'; // can't warn in private rooms
			// if the bot has % and not @, it will default to hourmuting as its highest level of punishment instead of roombanning
			if (this.chatData[user][room].points >= 4 && config.group === '%') cmd = 'hourmute';
			if (this.chatData[user].zeroTol > 4) { // if zero tolerance users break a rule they get an instant roomban or hourmute
				muteMessage = ', Automated response: zero tolerance user';
				cmd = config.group !== '%' ? 'roomban' : 'hourmute';
			}
			if (this.chatData[user][room].points >= 2) this.chatData[user].zeroTol++; // getting muted or higher increases your zero tolerance level (warns do not)
			this.chatData[user][room].lastAction = time;
			CommandParser.parse(('/' + cmd + ' ' + user.userid + muteMessage), room, Users.get(config.name), Users.get(config.name).connections[0]);
		}
	},
	updateSeen: function(user, type, detail) {
		user = toId(user);
		type = toId(type);
		if (type in {j:1, l:1, c:1} && (config.rooms.indexOf(toId(detail)) === -1 || config.privaterooms.indexOf(toId(detail)) > -1)) return;
		var time = Date.now();
		if (!this.chatData[user]) this.chatData[user] = {
			zeroTol: 0,
			lastSeen: '',
			seenAt: time
		};
		if (!detail) return;
		var msg = '';
		if (type in {j:1, l:1, c:1}) {
			msg += (type === 'j' ? 'joining' : (type === 'l' ? 'leaving' : 'chatting in')) + ' ' + detail.trim() + '.';
		} else if (type === 'n') {
			msg += 'changing nick to ' + ('+%@&#~'.indexOf(detail.trim().charAt(0)) === -1 ? detail.trim() : detail.trim().substr(1)) + '.';
		}
		if (msg) {
			this.chatData[user].lastSeen = msg;
			this.chatData[user].seenAt = time;
		}
	},
};