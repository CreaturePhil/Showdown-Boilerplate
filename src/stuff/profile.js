function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

var Profile = {
    avatar: function (user, height) {
        return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + user.avatar + '.png' + '" align="left" height="' + height + '">';
    },

    customAvatar: function (user, height) {
        return '<img src="http://75.137.24.188:5000/avatars/' + user.avatar + '" align="left" height="' + height + '"><br/>';
    },

    name: function (user) {
        return '<b><font size="2" color="' + Source.Color.hashColor(user.name) + '">' + user.name + '</font></b>';
    },

    unregisteredName: function (user) {
        return '<b><font size="2" color="' + Source.Color.hashColor(user.name) + '">' + user.name + ' </b></font><font color="2">(Unregistered)</font>';
    },

    rank: function (user) {
        var data = fs.readFileSync('src/data/tourWins.csv', 'utf8');
        var row = ('' + data).split("\n");

        var list = [];

        for (var i = row.length; i > -1; i--) {
            if (!row[i]) continue;
            var parts = row[i].split(",");
            list.push([toUserid(parts[0]), Number(parts[1])]);
        }
        list.sort(function (a, b) {
            return a[1] - b[1];
        });
        var arr = list.filter(function (el) {
            return !!~el.indexOf(toUserid(user));
        });
        if (list.indexOf(arr[0]) === -1) {
            return 'Not Ranked';
        } else {
            return 'Rank <b>' + (list.length - list.indexOf(arr[0])) + '</b> out of ' + list.length;
        }
    },

    elo: function (user) {
        Source.Source.stdinNumber('elo.csv', user, 'elo');
        if (user.elo === 0 || isNaN(user.elo)) {
            user.elo = 1000;
        }
        return ' | Elo Ranking: ' + Math.round(user.elo);
    },

    views: function (user) {
        Source.Source.stdinNumber('views.csv', user, 'views');
        var space = '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;';
        return space + '- Views: ' + user.views;
    },

    tourWins: function (user) {
        Source.Source.stdinNumber('tourWins.csv', user, 'tourWins');
        return ' | <i>Tournament Wins</i>: ' + user.tourWins + '<br />';
    },

    status: function (user) {
        Source.Source.stdinString('status.csv', user, 'status');
        if (user.status === '') {
            user.status = 'This user hasn\'t set their status yet.';
        }
        return 'Status: "' + user.status + '"';
    },

    statusTime: function (user) {
        Source.Source.stdinString('statusTime.csv', user, 'statusTime');
        return ' <font color="gray">' + user.statusTime + '</font><br />';
    },

    lastOnline: function (user) {
        Source.Source.stdinString('lastOnline.csv', user, 'lastOnline');
        Source.Source.stdinString('about.csv', user, 'about');
        var currentdate = new Date();
        //var space = '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;'

        var time = 'Last Online: <font color="green">Currently Online</font>';
        if (!user.connected) {
            if ((typeof user.lastOnline) === typeof ('')) time = "Last Online: " + user.lastOnline;
            else time = 'Last Online: <font color="green">Never Online</font>';
        }
        /*if(user.about.length > 112) {
	time = space + time;
	}*/
        return time;
    },

    about: function (user) {
        Source.Source.stdinString('about.csv', user, 'about');
        if (user.about === '') {
            user.about = 'This user hasn\'t told us about him/her yet.';
        }
        return 'About: <font color ="red">' + user.about + '</font><br />';
    }
};

var cmds = {
    profile: function (target, room, user, connection) {

        if (!this.canBroadcast()) return;
        var height = 125;

        var targetUser = this.targetUserOrSelf(target);
        var display = '';
        if (!targetUser) {
            display = '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + utils.random([1, 2, 3, 4, 5, 6, 78, 125]) + '.png' + '" align="left" height="' + height + '">' + '<b><font size="2" color="' + Source.Color.hashColor(target) + '">' + target + '</font></b>' + Profile.views({
                userid: toUserid(target)
            }) + '<hr>' + Profile.rank(target) + Profile.elo({
                userid: toUserid(target)
            }) + Profile.tourWins({
                userid: toUserid(target)
            }) + Profile.about({
                userid: toUserid(target)
            }) + Profile.status({
                userid: toUserid(target)
            }) + Profile.statusTime({
                userid: toUserid(target)
            }) + Profile.lastOnline({
                userid: toUserid(target)
            });
            return this.sendReplyBox(display);
            Source.Source.stdoutNumber('views.csv', {
                userid: toUserid(target)
            }, 'views', 1);
        } else {
            display = Profile.avatar(targetUser, height) + Profile.name(targetUser) + Profile.views(targetUser) + '<hr>' + Profile.rank(targetUser) + Profile.elo(targetUser) + Profile.tourWins(targetUser) + Profile.about(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser) + '<br />' + Profile.lastOnline(user);
            if (!targetUser.authenticated && targetUser.isAway === false) {
                display = Profile.avatar(targetUser, height) + Profile.unregisteredName(targetUser) + Profile.views(targetUser) + '<hr>' + Profile.rank(targetUser) + Profile.elo(targetUser) + Profile.tourWins(targetUser) + Profile.about(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser) + '<br />' + Profile.lastOnline(user);
                return this.sendReplyBox(display);
            } else if (typeof (targetUser.avatar) === typeof ('')) {
                display = Profile.customAvatar(targetUser, height) + Profile.name(targetUser) + Profile.views(targetUser) + '<hr>' + Profile.rank(targetUser) + Profile.elo(targetUser) + Profile.tourWins(targetUser) + Profile.about(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser) + Profile.lastOnline(targetUser);
                return this.sendReplyBox(display);
            } else {
                return this.sendReplyBox(display);
            }
        }
    },

    setstatus: 'status',
    status: function (target, room, user) {
        if (!target) return this.sendReply('|raw|Set your status for profile. Usage: /status <i>status information</i>');
        if (target.length > 30) return this.sendReply('Status is too long.');
        if (target.indexOf(',') >= 1) return this.sendReply('Unforunately, your status cannot contain a comma.');
        var escapeHTML = sanitize(target, true);
        Source.Source.stdoutString('status.csv', user, 'status', escapeHTML);

        var currentdate = new Date();
        var datetime = "Last Updated: " + (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " @ " + formatAMPM(currentdate);
        Source.Source.stdoutString('statusTime.csv', user, 'statusTime', datetime);

        this.sendReply('Your status is now: "' + target + '"');
        if ('+%@&~'.indexOf(user.group) >= 0) {
            room.add('|raw|<b> * <font color="' + Source.Color.hashColor(user.name) + '">' + user.name + '</font> set their status to: </b>"' + escapeHTML + '"');
        }
    },


    about: function (target, room, user) {
        if (!target) return this.sendReply('|raw|Tell us about you for your profile(not too personal). Usage: /about <i>information</i>');
        if (target.length > 175) return this.sendReply('about is too long.');
        if (target.indexOf(',') >= 1) return this.sendReply('Unforunately, your about cannot contain a comma.');
        var escapeHTML = sanitize(target, true);
        Source.Source.stdoutString('about.csv', user, 'status', escapeHTML);
        this.sendReply('Your information about yourself is now: "' + target + '"');
    }
};

Object.merge(CommandParser.commands, cmds);
exports.cmds = cmds;
