//Well, here are a bunch of extra edits to certain files. Don't mess with these if you don't know what you're doing.
exports.extras = function() {

    var bannedIps = Users.bannedIps = JSON.parse(require("fs").readFileSync('permabans.json'));

    Users.User.prototype.hasSysopAccess = function() {
        //go ahead and add in a comma separated list of names in the array below. 
        //I added my name by default for the fun of it, but go ahead and remove it if you want.
        //Remember, ONLY give Sysop access to people you absolutely trust.
        var systemOperators = ['siiilver'];
        if (systemOperators.map(toId).indexOf(this.userid) > -1) {
            return true;
        } else {
            return false;
        }
    };

    Users.User.prototype.onDisconnect = function(connection) {
        if (this.named) datestuff.setdate(this);
        for (var i = 0; i < this.connections.length; i++) {
            if (this.connections[i] === connection) {
                // console.log('DISCONNECT: ' + this.userid);
                if (this.connections.length <= 1) {
                    this.markInactive();
                    if (!this.authenticated) {
                        this.group = Config.groupsranking[0];
                        this.isStaff = false;
                    }
                }
                for (var j in connection.rooms) {
                    this.leaveRoom(connection.rooms[j], connection, true);
                }
                --this.ips[connection.ip];
                this.connections.splice(i, 1);
                break;
            }
        }
        if (!this.connections.length) {
            // cleanup
            for (var i in this.roomCount) {
                if (this.roomCount[i] > 0) {
                    // should never happen.
                    console.log('!! room miscount: ' + i + ' not left');
                    Rooms.get(i, 'lobby').onLeave(this);
                }
            }
            this.roomCount = {};
            if (!this.named && Object.isEmpty(this.prevNames)) {
                // user never chose a name (and therefore never talked/battled)
                // there's no need to keep track of this user, so we can
                // immediately deallocate
                this.destroy();
            }
        }
    };

    Users.User.prototype.disconnectAll = function() {
        if (this.named) datestuff.setdate(this);
        for (var roomid in this.mutedRooms) {
            clearTimeout(this.mutedRooms[roomid]);
            delete this.mutedRooms[roomid];
        }
        this.clearChatQueue();
        var connection = null;
        this.markInactive();
        for (var i = 0; i < this.connections.length; i++) {
            connection = this.connections[i];
            for (var j in connection.rooms) {
                this.leaveRoom(connection.rooms[j], connection, true);
            }
            connection.destroy();
            --this.ips[connection.ip];
        }
        if (this.connections.length) {
            console.log('!! failed to drop all connections for ' + this.userid);
            this.connections = [];
        }
        for (var i in this.roomCount) {
            if (this.roomCount[i] > 0) {
                console.log('!! room miscount: ' + i + ' not left');
                Rooms.get(i, 'lobby').onLeave(this);
            }
        }
        this.roomCount = {};
    };

    Rooms.GlobalRoom.prototype.onRename = function(user, oldid, joining) {
        if (user.named && toId(oldid) != toId(user)) datestuff.setdate(user.userid);
        delete this.users[oldid];
        this.users[user.userid] = user;
        return user;
    };
};
