/**
 * Bot
 * Created by CreaturePhil - https://github.com/CreaturePhil
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
    serverid: 'showdown'
};

/**
 * On server start, this sets up fake user connection for bot and uses a fake ip.
 * It gets a the fake user from the users list and modifies it properties. In addition,
 * it sets up rooms that bot will join and adding the bot user to Users list and
 * removing the fake user created which already filled its purpose
 * of easily filling  in the gaps of all the user's property.
 */

function joinServer() {
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