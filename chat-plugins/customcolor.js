'use strict';
var selectors;
var filepath = 'config/customcolors.json';
var customColors = {};
var symbolcolors = {};
var fs = require('fs');
var request = require('request');

function writeIconCSS() {
        fs.appendFile('config/custom.css', selectors);
}

function load () {
    fs.readFile(filepath, 'utf8', function (err, file) {
        if (err) return;
        customColors = JSON.parse(file);
    });
}
load();

function updateColor() {
    fs.writeFileSync(filepath, JSON.stringify(customColors));

    var newCss = '/* COLORS START */\n';

    for (var name in customColors) {
        newCss += generateCSS(name, customColors[name]);
    }
    newCss += '/* COLORS END */\n';

    var file = fs.readFileSync('config/custom.css', 'utf8').split('\n');
    if (~file.indexOf('/* COLORS START */')) file.splice(file.indexOf('/* COLORS START */'), (file.indexOf('/* COLORS END */') - file.indexOf('/* COLORS START */')) + 1);
    fs.writeFileSync('config/custom.css', file.join('\n') + newCss);
    request('http://play.pokemonshowdown.com/customcss.php?server=ironic&invalidate', function callback(error, res, body) {
        if (error) return console.log('updateColor error: ' + error);
    });
}

function generateCSS(name, color) {
    var css = '';
    var rooms = [];
    name = toId(name);
    for (var room in Rooms.rooms) {
        if (Rooms.rooms[room].id === 'global' || Rooms.rooms[room].type !== 'chat' || Rooms.rooms[room].isPersonal) continue;
        rooms.push('#' + Rooms.rooms[room].id + '-userlist-user-' + name + ' strong em');
        rooms.push('#' + Rooms.rooms[room].id + '-userlist-user-' + name + ' strong');
        rooms.push('#' + Rooms.rooms[room].id + '-userlist-user-' + name + ' span');
    }
    css = rooms.join(', ');
    css += '{\ncolor: ' + color + ' !important;\n}\n';
    css += '.chat.chatmessage-' + name + ' strong {\n';
    css += 'color: ' + color + ' !important;\n}\n';
    return css;
}

exports.commands = {
    customcolour: 'customcolor',
    customcolor: function (target, room, user) {
        if (!this.can('forcewin')) return false;
        target = target.split(',');
       // for (var u in target) target[u] = target[u].trim();
        if (!target[1]) return this.parse('/help customcolor');
        if (toId(target[0]).length > 19) return this.errorReply("Usernames are not this long...");
        if (target[1] === 'delete') {
            if (!customColors[toId(target[0])]) return this.errorReply('/customcolor - ' + target[0] + ' does not have a custom color.');
            delete customColors[toId(target[0])];
            updateColor();
            this.sendReply("You removed " + target[0] + "'s custom color.");
            Rooms('staff').add(user.name + " removed " + target[0] + "'s custom color.").update();
            if (Users(target[0]) && Users(target[0]).connected) Users(target[0]).popup(user.name + " removed your custom color.");
            return;
        }

        this.sendReply("|raw|You have given <b><font color=" + target[1] + ">" + Tools.escapeHTML(target[0]) + "</font></b> a custom color.");
        Rooms('staff').add('|raw|' + Tools.escapeHTML(target[0]) + " has recieved a <b><font color=" + target[1] + ">custom color</font></b> from " + Tools.escapeHTML(user.name) + ".").update();
        customColors[toId(target[0])] = target[1];
        updateColor();
    },
    customcolorhelp: ["Commands Include:",
                "/customcolor [user], [hex] - Gives the user a custom color of [hex]. Requires: ~",
                "/customcolor [user], delete - Deletes a user's custom color. Requires: ~"],





        symbolcolor: function (target, room, user) {
                if (!this.can('eval'));

                var args = target.split(',');
                if (args.length < 3) return this.parse('/help symbolcolor');
                var username = toId(args.shift());
                var color = 'color:' + args.shift().trim() + ';';
                selectors = '\n\n' + '  #' + toId(args.shift()) + '-userlist-user-' + username +   '  em.group';
                args.forEach(function (room) {
                        selectors += ', #' + toId(room) + '-userlist-user-'+ username + '  em.group';
                });
                selectors += ' { \n' + '    ' + color +  '\n  }';

                this.privateModCommand("(" + user.name + " has set an symbol color to " + username + ")");
                writeIconCSS();
        },
        symbolcolorhelp: ["/symbolcolor [user], [color hex], [room 1], etc. - Sets an symbol color to a user in chosen rooms."],

    colorpreview: function (target, room, user) {
        if (!this.canBroadcast()) return;
        target = target.split(',');
        for (var u in target) target[u] = target[u].trim();
        if (!target[1]) return this.parse('/help colorpreview');
        return this.sendReplyBox('<b><font size="3" color="' +  target[1] + '">' + Tools.escapeHTML(target[0]) + '</font></b>');
    },
    colorpreviewhelp: ["Usage: /colorpreview [user], [color] - Previews what that username looks like with [color] as the color."],
};
