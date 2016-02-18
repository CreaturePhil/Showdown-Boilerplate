/* 
* Created by: Master Float.
* Edited by: Kevinxzllz
*/

var fs = require('fs');
var path = require('path');
var selectors;

function writeIconCSS() {
        fs.appendFile('config/custom.css', selectors);
}
 
function logMoney(message) {
        if (!message) return;
        var file = path.join(__dirname, '../logs/money.txt');
        var date = "[" + new Date().toUTCString() + "] ";
        var msg = message + "\n";
        fs.appendFile(file, date + msg);
}
 
exports.commands = {
        seticon: function (target, room, user) {
        if (!this.can('eval')) return this.errorReply("Access denied.");
 
                var args = target.split(',');
                if (args.length < 3) return this.parse('/help seticon');
                var username = toId(args.shift());
                var image = 'background: rgba(244, 244, 244, 0.8) url("' + args.shift().trim() + '") right no-repeat;';
                selectors = '\n\n' + '  #' + toId(args.shift()) + '-userlist-user-' + username;
                args.forEach(function (room) {
                        selectors += ', #' + toId(room) + '-userlist-user-' + username;
                });
                selectors += ' { \n' + '    ' + image +  '\n  }';
 
                logMoney(user.name + " has set an icon to " + username + ".");
                this.privateModCommand("(" + user.name + " has set an icon to  " + username + ")");
                Rooms('staff').add('|raw|' + user.name + " has set an icon to " + username +  ".").update();
                writeIconCSS();
        },
        seticonhelp: ["/seticon [username], [image], [room 1], [room 2], etc. - Sets an icon to a user in chosen rooms."]
};
