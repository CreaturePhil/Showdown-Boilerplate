/**
 * Bot
 *
 * Credits
 * CreaturePhil - Lead Development (https://github.com/CreaturePhil)
 * TalkTakesTime - Parser (https://github.com/TalkTakesTime)
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
}

exports.joinServer = joinServer;

joinServer();

const ACTION_COOLDOWN = 3 * 1000;
const FLOOD_MESSAGE_NUM = 5;
const FLOOD_PER_MSG_MIN = 500; // this is the minimum time between messages for legitimate spam. It's used to determine what "flooding" is caused by lag
const FLOOD_MESSAGE_TIME = 6 * 1000;
const MIN_CAPS_LENGTH = 18;
const MIN_CAPS_PROPORTION = 0.8;

var parse = exports.parse = {

    chatData: {},

    processChatData: function (user, room, connection, message) {
        if (user.userid === config.userid()) return;
        this.processBotCommands(user, room, connection, message);
        message = message.trim().replace(/ +/g, " "); // removes extra spaces so it doesn't trigger stretching
        this.updateSeen(user.userid, 'c', room.title);
        var time = Date.now();
        if (!this.chatData[user]) this.chatData[user] = {
            zeroTol: 0,
            lastSeen: '',
            seenAt: time
        };
        if (!this.chatData[user][room]) this.chatData[user][room] = {
            times: [],
            points: 0,
            lastAction: 0
        };

        this.chatData[user][room].times.push(time);

        var pointVal = 0;
        var muteMessage = '';

        // moderation for flooding (more than x lines in y seconds)
        var isFlooding = (this.chatData[user][room].times.length >= FLOOD_MESSAGE_NUM && (time - this.chatData[user][room].times[this.chatData[user][room].times.length - FLOOD_MESSAGE_NUM]) < FLOOD_MESSAGE_TIME && (time - this.chatData[user][room].times[this.chatData[user][room].times.length - FLOOD_MESSAGE_NUM]) > (FLOOD_PER_MSG_MIN * FLOOD_MESSAGE_NUM));
        if (isFlooding) {
            if (pointVal < 2) {
                pointVal = 2;
                muteMessage = ', flooding';
            }
        }
        // moderation for caps (over x% of the letters in a line of y characters are capital)
        var capsMatch = message.replace(/[^A-Za-z]/g, '').match(/[A-Z]/g);
        if (capsMatch && toId(message).length > MIN_CAPS_LENGTH && (capsMatch.length >= Math.floor(toId(message).length * MIN_CAPS_PROPORTION))) {
            if (pointVal < 1) {
                pointVal = 1;
                muteMessage = ', caps';
            }
        }
        // moderation for stretching (over x consecutive characters in the message are the same)
        var stretchMatch = message.toLowerCase().match(/(.)\1{7,}/g) || message.toLowerCase().match(/(..+)\1{4,}/g); // matches the same character (or group of characters) 8 (or 5) or more times in a row
        if (stretchMatch) {
            if (pointVal < 1) {
                pointVal = 1;
                muteMessage = ', stretching';
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
            room.add('|c|' + user.group + user.name + '|' + message);
            CommandParser.parse(('/' + cmd + ' ' + user.userid + muteMessage), room, Users.get(config.name), Users.get(config.name).connections[0]);
            return false;
        }

        return true;
    },

    updateSeen: function (user, type, detail) {
        user = toId(user);
        type = toId(type);
        if (type in {j: 1, l: 1, c: 1} && (config.rooms.indexOf(toId(detail)) === -1 || config.privaterooms.indexOf(toId(detail)) > -1)) return;
        var time = Date.now();
        if (!this.chatData[user]) this.chatData[user] = {
            zeroTol: 0,
            lastSeen: '',
            seenAt: time
        };
        if (!detail) return;
        var msg = '';
        if (type in {j: 1, l: 1, c: 1}) {
            msg += (type === 'j' ? 'joining' : (type === 'l' ? 'leaving' : 'chatting in')) + ' ' + detail.trim() + '.';
        } else if (type === 'n') {
            msg += 'changing nick to ' + ('+%@&#~'.indexOf(detail.trim().charAt(0)) === -1 ? detail.trim() : detail.trim().substr(1)) + '.';
        }
        if (msg) {
            this.chatData[user].lastSeen = msg;
            this.chatData[user].seenAt = time;
        }
    },

    processBotCommands: function (user, room, connection, message) {
        var cmd = '',
            target = '',
            spaceIndex = message.indexOf(' '),
            botDelay = (Math.floor(Math.random() * 6) * 1000);

        if (message.charAt(0) === '!') {
            if (spaceIndex > 0) {
                cmd = message.substr(1, spaceIndex - 1);
                target = message.substr(spaceIndex + 1);
            } else {
                cmd = message.substr(1);
                target = '';
            }
        }

        if (commands[cmd]) {
            var context = {
                sendReply: function (data) {
                    setTimeout(function () {
                        room.add('|c|' + config.group + config.name + '|' + data);
                    }, botDelay);
                },
                sendPm: function (data) {
                    var message = '|pm|' + config.group + config.name + '|' + user.group + user.name + '|' + data;
                    user.send(message);
                },
            };

            if (typeof commands[cmd] === 'function') {
                commands[cmd].call(context, target, room, user, connection, cmd, message);
            }
        }
    },

    getTimeAgo: function (time) {
        time = Date.now() - time;
        time = Math.round(time / 1000); // rounds to nearest second
        var seconds = time % 60;
        var times = [];
        if (seconds) times.push(String(seconds) + (seconds === 1 ? ' second' : ' seconds'));
        var minutes, hours, days;
        if (time >= 60) {
            time = (time - seconds) / 60; // converts to minutes
            minutes = time % 60;
            if (minutes) times = [String(minutes) + (minutes === 1 ? ' minute' : ' minutes')].concat(times);
            if (time >= 60) {
                time = (time - minutes) / 60; // converts to hours
                hours = time % 24;
                if (hours) times = [String(hours) + (hours === 1 ? ' hour' : ' hours')].concat(times);
                if (time >= 24) {
                    days = (time - hours) / 24; // you can probably guess this one
                    if (days) times = [String(days) + (days === 1 ? ' day' : ' days')].concat(times);
                }
            }
        }
        if (!times.length) times.push('0 seconds');
        return times.join(', ');
    },

};

var commands = exports.commands = {

    guide: function (target, room, user) {
        var commands = Object.keys(Bot.commands);
        commands = commands.join(', ').toString();

        this.sendReply('List of bot commands: ' + commands);
    },

    penislength: function (target, room, user) {
        this.sendReply('8.5 inches from the base. Perv.');
    },

    seen: function (target, room, user) {
        if (!target) return;
        if (toId(target) === config.userid()) return this.sendPm('I\'m right here.');
        if (!parse.chatData[toId(target)] || !parse.chatData[toId(target)].lastSeen) {
            return this.sendPm('The user ' + target.trim() + ' has never been seen.');
        }
        return this.sendPm(target.trim() + ' was last seen ' + parse.getTimeAgo(parse.chatData[toId(target)].seenAt) + ' ago, ' + parse.chatData[toId(target)].lastSeen);
    },

    salt: function (target, room, user) {
        if (!global.salt) global.salt = 0;
        salt++;
        this.sendReply(salt + '% salty.');
    },

    who: (function () {
        var reply = [
            "Just another Pokemon Showdown user",
            "A very good competetive pokemon player",
            "A worthy opponent",
            "Generally, a bad user",
            "Generally, a good user",
            "Someone who is better than you",
            "An amazing person",
            "A beautiful person",
            "A person who is probably still a virgin",
            "A leader",
            "A lord helix follower",
            "An annoying person",
            "A person with a salty personality",
            "A Coffee Addict",
            "A Mediocre Player",
        ];

        return function (target, room, user) {
            if (!target) return;
            var message = reply[Math.floor(Math.random() * reply.length)];

            target = toId(target);

            if (target === 'creaturephil') message = 'An experienced **coder** for pokemon showdown. He has coded for over 5 servers such as kill the noise, moxie, aerdeith, nova, etc. Please follow him on github: https://github.com/CreaturePhil';
            if (target === config.userid()) message = 'That\'s me.';
            if (target === 'zarel') message = 'Pokemon Showdown Creator';

            this.sendReply(message);
        };
    })(),

    helix: (function () {
        var reply = [
            "Signs point to yes.",
            "Yes.",
            "Reply hazy, try again.",
            "Without a doubt.",
            "My sources say no.",
            "As I see it, yes.",
            "You may rely on it.",
            "Concentrate and ask again.",
            "Outlook not so good.",
            "It is decidedly so.",
            "Better not tell you now.",
            "Very doubtful.",
            "Yes - definitely.",
            "It is certain.",
            "Cannot predict now.",
            "Most likely.",
            "Ask again later.",
            "My reply is no.",
            "Outlook good.",
            "Don't count on it."
        ];

        return function (target, room, user) {
            if (!target) return;
            var message = reply[Math.floor(Math.random() * reply.length)];

            this.sendPm(message);
        };
    })(),

};