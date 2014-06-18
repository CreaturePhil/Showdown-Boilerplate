				global.nightclub = {};
				global.urlify = function (str) {
				    return str.replace(/(https?\:\/\/[a-z0-9-.]+(\/([^\s]*[^\s?.,])?)?|[a-z0-9]([a-z0-9-\.]*[a-z0-9])?\.(com|org|net|edu|tk)((\/([^\s]*[^\s?.,])?)?|\b))/ig, '<a href="$1" target="_blank">$1</a>').replace(/<a href="([a-z]*[^a-z:])/g, '<a href="http://$1').replace(/(\bgoogle ?\[([^\]<]+)\])/ig, '<a href="http://www.google.com/search?ie=UTF-8&q=$2" target="_blank">$1</a>').replace(/(\bgl ?\[([^\]<]+)\])/ig, '<a href="http://www.google.com/search?ie=UTF-8&btnI&q=$2" target="_blank">$1</a>').replace(/(\bwiki ?\[([^\]<]+)\])/ig, '<a href="http://en.wikipedia.org/w/index.php?title=Special:Search&search=$2" target="_blank">$1</a>').replace(/\[\[([^< ]([^<`]*?[^< ])?)\]\]/ig, '<a href="http://www.google.com/search?ie=UTF-8&btnI&q=$1" target="_blank">$1</a>');
				};
				global.nightclubify = function (given_text) {
				    var sofar = "";
				    var splitting = given_text.split("");
				    var text_length = given_text.length;
				    var colorification = true;
				    var beginningofend = false;
				    for (var i in splitting) {
				        if (splitting[i] == "<" && splitting[i + 1] != "/") {
				            //open tag <>
				            colorification = false;
				        }
				        if (splitting[i] == "/" && splitting[i - 1] == "<") {
				            //closing tag </>
				            //find exact spot
				            beginningofend = i;
				        }
				        if (beginningofend && splitting[i - 1] == ">") {
				            colorification = true;
				            beginningofend = false;
				        }
				        var letters = 'ABCDE'.split('');
				        var color = "";
				        for (var f = 0; f < 6; f++) {
				            color += letters[Math.floor(Math.random() * letters.length)];
				        }
				        if (colorification) {
				            if (splitting[i] == " ") sofar += " ";
				            else sofar += "<font color='" + "#" + color + "'>" + splitting[i] + "</font>";
				        } else sofar += splitting[i];
				    }
				    return sofar;
				}

				function setAvatar(data, self) {
				    var line = data.split('\n');
				    for (var u in line) {
				        var row = line[u].split(',');
				        if (row[0] == self.userid) {
				            self.avatar = row[1];
				            break;
				        }
				    }
				    return self.avatar;
				}

				function getAv(user) {
				    delete user.avatar;
				    avatar = fs.readFile('config/avatars.csv', 'utf8', function read(err, data) {
				        if (err) data = '';
				        return setAvatar(data, user);
				    });
				    if (config.customavatars[user.userid]) {
				        return config.customavatars[user.userid];
				    }
				    if (avatar) {
				        user.avatar = avatar;
				        return user.avatar
				    } else {
				        var trainersprites = [1, 2, 101, 102, 169, 170, 265, 266];
				        var avatar = trainersprites[Math.floor(Math.random() * trainersprites.length)];
				        return avatar;
				    }
				}
				Users.User.prototype.onDisconnect = function (connection) {
				    var currentdate = new Date();
				    Source.Source.stdoutString('lastOnline.csv', this, 'lastOnline', (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " @ " + Source.Source.formatAMPM(currentdate));
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
				            connection.user = null;
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
				        if (!this.named && !Object.size(this.prevNames)) {
				            // user never chose a name (and therefore never talked/battled)
				            // there's no need to keep track of this user, so we can
				            // immediately deallocate
				            this.destroy();
				        }
				    }
				};
				exports.edits = function () {
				    global.today = new Date();
				    global.spamphase = 0;
				    Users.User.prototype.bp = 0;
				    Users.User.prototype.money = 0;
				    Users.User.prototype.coins = 0;
				    Users.User.prototype.tkts = 0;
				    Users.User.prototype.avatar = getAv(this);
				    Users.User.prototype.numMessages = 0;
				    Users.User.prototype.warnCounters = 0;
				    Users.User.prototype.o3omessagetime = today.getMinutes();
				    Users.User.prototype.twitchChat = true;
				    var path = require('path');
				    //global.money = require(path.join(__dirname, '../', 'money/money.js')).money();
				};
				Rooms.BattleRoom.prototype.botsupported = true;
				Rooms.ChatRoom.prototype.botsupported = false;
				Rooms.rooms.lobby.botsupported = true;
