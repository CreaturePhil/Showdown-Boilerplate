/**
 * Core
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * This is where essential core infrastructure of
 * Pokemon Showdown extensions for private servers.
 * Core contains standard streams, profile infrastructure,
 * elo rating calculations, and polls infrastructure.
 *
 * @license MIT license
 */

var fs = require("fs");
var path = require("path");

var core = exports.core = {

    stdin: function (file, name) {
        var data = fs.readFileSync('config/' + file + '.csv', 'utf8').split('\n');

        var len = data.length;
        while (len--) {
            if (!data[len]) continue;
            var parts = data[len].split(',');
            if (parts[0].toLowerCase() === name) {
                return parts[1];
            }
        }
        return 0;
    },

    stdout: function (file, name, info, callback) {
        var data = fs.readFileSync('config/' + file + '.csv', 'utf8').split('\n');
        var match = false;

        var len = data.length;
        while (len--) {
            if (!data[len]) continue;
            var parts = data[len].split(',');
            if (parts[0] === name) {
                data = data[len];
                match = true;
                break;
            }
        }

        if (match === true) {
            var re = new RegExp(data, 'g');
            fs.readFile('config/' + file + '.csv', 'utf8', function (err, data) {
                if (err) return console.log(err);

                var result = data.replace(re, name + ',' + info);
                fs.writeFile('config/' + file + '.csv', result, 'utf8', function (err) {
                    if (err) return console.log(err);
                    typeof callback === 'function' && callback();
                });
            });
        } else {
            var log = fs.createWriteStream('config/' + file + '.csv', {
                'flags': 'a'
            });
            log.write('\n' + name + ',' + info);
            typeof callback === 'function' && callback();
        }
    },

    profile: {

        color: '#2ECC40',

        avatar: function (online, user, img) {
            if (online === true) {
                if (typeof (img) === typeof ('')) {
                    return '<img src="http://107.161.19.15:8000/avatars/' + img + '" width="80" height="80" align="left">';
                }
                return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + img + '.png" width="80" height="80" align="left">';
            }
            for (var name in Config.customAvatars) {
                if (user === name) {
                    return '<img src="http://107.161.19.15:8000/avatars/' + Config.customAvatars[name] + '" width="80" height="80" align="left">';
                }
            }
            var trainersprites = [1, 2, 101, 102, 169, 170, 265, 266, 168];
            return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + trainersprites[Math.floor(Math.random() * trainersprites.length)] + '.png" width="80" height="80" align="left">';
        },

        name: function (online, user) {
            if (online === true) {
                return '&nbsp;<strong><font color="' + this.color + '">Name:</font></strong>&nbsp;' + user.name;
            }
            return '&nbsp;<strong><font color="' + this.color + '">Name:</font></strong>&nbsp;' + user;
        },

        group: function (online, user) {
            if (online === true) {
                if (user.group === ' ') {
                    return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + 'Regular User';
                }
                return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + Config.groups[user.group].name;
            }
            var g = Core.stdin('usergroups', user);
            if (g === 0) {
                return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + 'Regular User';
            }
            return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + Config.groups[g].name;
        },

        lastSeen: function (online, user) {
            var lastSeen;

            if (online === true) {
                if (user.connected === true) {
                    return '<br>&nbsp;<strong><font color="' + this.color + '">Last Seen:</font></strong>&nbsp;<font color="green">Current Online</font>';
                }
                lastSeen = Number(Core.stdin('lastSeen', user.userid));
            } else {
                lastSeen = Number(Core.stdin('lastSeen', user));
            }

            if (lastSeen === 0) return '<br>&nbsp;<strong><font color="' + this.color + '">Last Seen:</font></strong>&nbsp;Never';

            var seconds = Math.floor((Date.now() - lastSeen) * 0.001);
            var minutes = Math.floor((Date.now() - lastSeen) * 1.6667e-5);
            var hours = Math.floor((Date.now() - lastSeen) * 2.7778e-7);
            var days = Math.floor(((Date.now() - lastSeen) * 2.7778e-7) / 24);

            var time = days + ' days ago';

            if (seconds < 60) {
                if (seconds === 1) {
                    time = seconds + ' second ago';
                }
                time = seconds + ' seconds ago';
            }
            if (minutes < 60) {
                if (minutes === 1) {
                    time = minutes + ' minute ago';
                }
                time = minutes + ' minutes ago';
            }
            if (hours < 24) {
                if (hours === 1) {
                    time = hours + ' hour ago';
                }
                time = hours + ' hours ago';
            }
            if (days === 1) {
                time = days + ' day ago';
            }

            return '<br>&nbsp;<strong><font color="' + this.color + '">Last Seen:</font></strong>&nbsp;' + time;
        },

        about: function (user) {
            return Core.stdin('about', user);
        },

        money: function (user) {
            return Core.stdin('money', user);
        },

        tournamentElo: function (user) {
            var elo = Core.stdin('elo', user);
            if (elo === 0) {
                return 1000;
            }
            return Math.floor(Number(elo));
        },

        rank: function (user) {
            var data = fs.readFileSync('config/elo.csv', 'utf-8');
            var row = ('' + data).split("\n");

            var list = [];

            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                list.push([toId(parts[0]), Number(parts[1])]);
            }

            list.sort(function (a, b) {
                return a[1] - b[1];
            });
            var arr = list.filter(function (el) {
                return !!~el.indexOf(user);
            });

            return '&nbsp;(Rank <strong>' + (list.length - list.indexOf(arr[0])) + '</strong> out of ' + list.length + ' players)';
        },

        display: function (args, info, option) {
            if (args === 'about') return '<br>&nbsp;<strong><font color="' + this.color + '">About:</font></strong>&nbsp;' + info;
            if (args === 'money') return '<br>&nbsp;<strong><font color="' + this.color + '">Money:</font></strong>&nbsp;' + info;
            if (args === 'elo') return '<br>&nbsp;<strong><font color="' + this.color + '">Tournament Elo:</font></strong>&nbsp;' + info + option;
        },

    },

    calculateElo: function (winner, loser) {
        if (winner === 0) winner = 1000;
        if (loser === 0) loser = 1000;
        var kFactor = 32;
        var ratingDifference = loser - winner;
        var expectedScoreWinner = 1 / (1 + Math.pow(10, ratingDifference / 400));

        var e = kFactor * (1 - expectedScoreWinner);
        winner = winner + e;
        loser = loser - e;

        var arr = [winner, loser];
        return arr;
    },

    ladder: function () {
        var data = fs.readFileSync('config/elo.csv', 'utf-8');
        var row = ('' + data).split("\n");

        var list = [];

        for (var i = row.length; i > -1; i--) {
            if (!row[i]) continue;
            var parts = row[i].split(",");
            list.push([toId(parts[0]), Number(parts[1])]);
        }

        list.sort(function (a, b) {
            return a[1] - b[1];
        });

        if (list.length > 1) {
            var ladder = '<table border="1" cellspacing="0" cellpadding="3"><tbody><tr><th>Rank</th><th>User</th><th>Tournament Elo</th><th>Tournament Wins</th></tr>';
            var len = list.length;
            while (len--) {
                ladder = ladder + '<tr><td>' + (list.length - len) + '</td><td>' + list[len][0] + '</td><td>' + Math.floor(list[len][1]) + '</td><td>' + this.stdin('tourWins', list[len][0]) + '</td></tr>';
            }
            ladder += '</tbody></table>';
            return ladder;
        }
        return 0;
    },

    shop: function (showDisplay) {
        var shop = [
            ['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (temporary until restart)', 5],
            ['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 10],
            ['Poof', 'Buys the ability to add a custom poof.', 15],
            ['Custom', 'Buys a custom avatar to be applied to your name. (you supply)', 20],
            ['Animated', 'Buys an animated avatar to be applied to your name. (you supply)', 25],
            ['Trainer', 'Buys a trainer card which shows information through a command such as /blakjack.', 30],
            ['Room', 'Buys a chatroom for you to own. (within reason, can be refused)', 50]
        ];

        if (showDisplay === false) {
            return shop;
        }

        var shopName = 'Shop';

        var s = '<center><h4><strong><u>' + shopName + '</u></strong></h4><table border="1" cellspacing="0" cellpadding="3"><tbody><tr><th>Command</th><th>Description</th><th>Cost</th></tr>';
        var start = 0;
        while (start < shop.length) {
            s = s + '<tr><td>' + shop[start][0] + '</td><td>' + shop[start][1] + '</td><td>' + shop[start][2] + '</td></tr>';
            start++;
        }
        s += '</tbody></table><br>To buy an item from the shop, use /buy <em>command</em>.<br></center>';
        return s;
    },

    poll: function () {
        var poll = {};
        var components = {

            reset: function (roomId) {
                poll[roomId] = {
                    question: undefined,
                    optionList: [],
                    options: {},
                    display: ''
                };
            },

            splint: function (target) {
                var parts = target.split(',');
                var len = parts.length;
                while (len--) {
                    parts[len] = parts[len].trim();
                }
                return parts;
            }

        };

        for (var i in components) {
            if (components.hasOwnProperty(i)) {
                poll[i] = components[i];
            }
        }

        for (var id in Rooms.rooms) {
            if (Rooms.rooms[id].type === 'chat' && !poll[id]) {
                poll[id] = {};
                poll.reset(id);
            }
        }

        return poll;
    },

};