exports.parse = function (user, room, connection, message, config) { if (room.type !== 'chat'|| room.type !== 'battle' || message.charAt(0) !== bot.commandchar) return;

            var cmd = '',
            target = '',
            spaceIndex = message.indexOf(' '),
            now = Date.now();
            var cmds = bot.cmds;
        if (spaceIndex > 0) {
            cmd = message.substr(1, spaceIndex - 1);
            target = message.substr(spaceIndex + 1);
        } else {
            cmd = message.substr(1);
            target = '';
        }
        cmd = cmd.toLowerCase();

        if (message.charAt(0) === '.' && Object.keys(cmds).join(' ').toString().indexOf(cmd) >= 0 && message.substr(1) !== '') {

            if ((now - user.lastBotCmd) * 0.001 < 30) {
                connection.sendTo(room, 'Please wait ' + Math.floor((30 - (now - user.lastBotCmd) * 0.001)) + ' seconds until the next command.');
                return true;
            }

            user.lastBotCmd = now;
        }

        if (cmds[cmd]) {
            var context = {
                sendReply: function (data) {
                        room.add('|c|' + config.group + config.name + '|' + data);
                },
                sendPm: function (data) {
                    var message = '|pm|' + config.group + config.name + '|' + user.group + user.name + '|' + data;
                    user.send(message);
                },
                can: function (permission) {
                    if (!user.can(permission)) {
                            connection.sendTo(room, '.' + cmd + ' - Access denied.');
                        return false;
                    }
                    return true;
                },
                say: function (target) {
                    CommandParser.parse(target, room, Users.get(config.name), Users.get(config.name).connections[0]);
                },
            };

            if (typeof commands[cmd] === 'function') {
                commands[cmd].call(context, target, room, user, config, connection, cmd, message);
            }
        }
    }
