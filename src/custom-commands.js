 var bb = bot.settings.bbot.name;
 const MAX_REASON_LENGTH = 500;
 var cmds = {
     /*********************************************************
      * Informational Commands                                *
      *********************************************************/
     sh: 'servercommands',
     serverhelp: 'servercommands',
     sc: 'servercommands',
     servercommand: 'servercommands',
     servercommands: function (target, room, user) {

         if (!target) {
             if (!this.canBroadcast()) return;
             this.sendReplyBox(
                 '/profile - See user\'s profile with infomation about money, status, location, etc. <br/>' +
                 '/stafflist - List of staff members. <br/>' +
                 '/regdate <i>name</i> - Displays registration date of a user. <br/>' +
                 '/twitchchat <i>on/off</i> - Enables Twitch Chat integration. <br/>' +
                 '/twitchgroup - Shows info about twitch groups. <br/>' +
                 '/poke <i>name</i> - Pokes a users. <br/>' +
                 '/pickrandom <i>options...</i> - Randomly picks one from the options <br/>' +
                 '/emoticons - View list of emoticons <br/>' +
                 '/earnmoney - Find out more ways to earn money <br/>' +
                 '<br/> For more help use /serverhelp <i>hangman</i>,<i>tour</i>, or <i>techsupport</i>'
             );
         }
         if (target.toLowerCase() === 'tour') {
             if (!this.canBroadcast()) return;
             this.sendReplyBox(
                 "- /nt &lt;format>, &lt;type> [, &lt;comma-separated arguments>]: Creates a new tournament in the current room.<br />" +
                 "- /settype &lt;type> [, &lt;comma-separated arguments>]: Modifies the type of tournament after it's been created, but before it has started.<br />" +
                 "- /et: Forcibly ends the tournament in the current room.<br />" +
                 "- /st: Starts the tournament in the current room.<br />" +
                 "- /dq &lt;user>: Disqualifies a user.<br />" +
                 "- /remind &lt;user>: Pings the users in the tournament.<br />" +
                 "More detailed help can be found <a href=\"https://gist.github.com/kotarou3/7872574\">here</a>"
             );
         }

         if (target.toLowerCase() === 'hangman') {
             if (!this.canBroadcast()) return;
             this.sendReplyBox('<font size = 2>A brief introduction to </font><font size = 3>Hangman:</font><br />' +
                 'The classic game, the basic idea of hangman is to guess the word that someone is thinking of before the man is "hanged." Players are given 8 guesses before this happens.<br />' +
                 'Games can be started by any of the rank Voice or higher, including Room Voice, Room Mod, and Room Owner.<br />' +
                 'The commands are:<br />' +
                 '<ul><li>/hangman <em>word</em>, <em>description</em> - Starts the game of hangman, with a specified word and a general category. Requires: + % @ & ~</li>' +
                 '<li>/guess <em>letter</em> - Guesses a letter.</li>' +
                 '<li>/guessword <em>word</em> - Guesses a word.</li>' +
                 '<li>/viewhangman - Shows the current status of hangman. Can be broadcasted.</li>' +
                 '<li>/word - Allows the person running hangman to view the word.</li>' +
                 '<li>/category <em>description</em> OR /topic <em>description</em> - Allows the person running hangman to changed the topic.</li>' +
                 '<li>/endhangman - Ends the game of hangman in the room. Requires: + % @ & ~</li></ul>');
         }

         if (target.toLowerCase() === 'techsupport' || target.toLowerCase() === 'support') {
             this.sendReplyBox('<h1><center>Tech Support</h1></center><br />' +
                 '<h3><center>Rank 3 Support - Developers<center></h3><hr /><br />' +
                 '<center><b>iFaZe<b> - Custom Styles, Trainer Cards, Commands</center><br />' +
                 '<center><b>Bandi<b> - Custom Styles, Bot, Tournament edits, Other</center><br />' +
                 '<center><b>CreaturePhil<b> - Twitch Chat, Bot, Commands, Other</center><br />' +
                 '<h3><center>Rank 2 Tech Support - Staff<center></h3><hr /><br />' +
                 '<center><b>Scizornician<b> - Bug Fixes, Bot, Commands</center><br />' +
                 '<center><b>Blakjack<b> -  Server Hosting, Commands</center><br />' +
                 '<center><b>Aananth(Chaarizard)<b> -  Bug Fixes, Bot, Custom Styles, Retired Developer, Commands</center><br />' +
                 '<h3><center>Rank 1 Tech Support - Contributors<center></h3><hr /><br />' +
                 '<center><b><a href="tbt.psim.us">Battle Tower Server</a><b> -  Commands Go check them out</center><br />' +
                 '<center><b><a href="amethyst.psim.us">Amethyst Server</a><b> -  Commands Go check them out</center><br />' +
                 '<center><b>Siiilver<b> -  Commands</center><br />'
             );
         } else {

             return this.sendReply('Could not find ' + target + '.');
         }
     },

     techsupport: function (target, room, user) {
         if (!this.canBroadcast()) return;
         if (room.id === 'lobby') {
             return this.sendReplyBox('<center>Click <button name="send" value="/sh techsupport" class="pinkbutton" title="here"><font color="black"><b>here</button></b></font> to view the support team!');
         }
     },

     stafflist: function (target, room, user, connection) {
         var buffer = [];
         var admins = [];
         var leaders = [];
         var mods = [];
         var drivers = [];
         var voices = [];

         admins2 = '';
         leaders2 = '';
         mods2 = '';
         drivers2 = '';
         voices2 = '';
         stafflist = fs.readFileSync('config/usergroups.csv', 'utf8');
         stafflist = stafflist.split('\n');
         for (var u in stafflist) {
             line = stafflist[u].split(',');
             if (line[1] == '~') {
                 admins2 = admins2 + line[0] + ',';
             }
             if (line[1] == '&') {
                 leaders2 = leaders2 + line[0] + ',';
             }
             if (line[1] == '@') {
                 mods2 = mods2 + line[0] + ',';
             }
             if (line[1] == '%') {
                 drivers2 = drivers2 + line[0] + ',';
             }
             if (line[1] == '+') {
                 voices2 = voices2 + line[0] + ',';
             }
         }
         admins2 = admins2.split(',');
         leaders2 = leaders2.split(',');
         mods2 = mods2.split(',');
         drivers2 = drivers2.split(',');
         voices2 = voices2.split(',');
         for (var u in admins2) {
             if (admins2[u] != '') admins.push(admins2[u]);
         }
         for (var u in leaders2) {
             if (leaders2[u] != '') leaders.push(leaders2[u]);
         }
         for (var u in mods2) {
             if (mods2[u] != '') mods.push(mods2[u]);
         }
         for (var u in drivers2) {
             if (drivers2[u] != '') drivers.push(drivers2[u]);
         }
         for (var u in voices2) {
             if (voices2[u] != '') voices.push(voices2[u]);
         }
         if (admins.length > 0) {
             admins = admins.join(', ');
         }
         if (leaders.length > 0) {
             leaders = leaders.join(', ');
         }
         if (mods.length > 0) {
             mods = mods.join(', ');
         }
         if (drivers.length > 0) {
             drivers = drivers.join(', ');
         }
         if (voices.length > 0) {
             voices = voices.join(', ');
         }
         connection.popup('Administrators: \n--------------------\n' + admins + '\n\nLeaders:\n-------------------- \n' + leaders + '\n\nModerators:\n-------------------- \n' + mods + '\n\nDrivers: \n--------------------\n' + drivers + '\n\nVoices:\n-------------------- \n' + voices);
     },
     emoticons: function (target, room, user) {
         if (!this.canBroadcast()) return;
         return this.sendReplyBox(
             '<b><u>Emoticons are case-sensitive:</b></u> <br/>' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png">:) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ae4e17f5b9624e2f-24x18.png">:O ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d570c4b3b8d8fc4d-24x18.png">:( ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-cfaf6eac72fe4de6-24x18.png">;) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e838e5e34d9f240c-24x18.png">:P ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-374120835234cb29-24x18.png">:/ ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3407bf911ad2fd4a-24x18.png">;P ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2cde79cfe74c6169-24x18.png">B) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8e128fa8dc1de29c-24x18.png">O_o ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-0536d670860bf733-24x18.png">R) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f2ac5d4b53913d7-24x18.png">:D ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b9cbb6884788aa62-24x18.png">:z ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png">BloodTrail ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png">BibleThump ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png"> 4Head ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png">Kappa ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png">PogChamp ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png">ResidentSleeper ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3227-src-77d12eca2603dde0-28x28.png">crtNova ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3228-src-d4b613767d7259c4-28x28.png">crtSSoH ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png">SSSsss ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png">SwiftRage ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png">DansGame ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png">Kreygasm ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png">FailFish ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-10413-src-9e30fb4e8b42c21a-28x28.png">pikaQQ ' +
             '<img src="http://e.deviantart.net/emoticons/n/ninja.gif">:ninja: ' +
             '<img src="http://e.deviantart.net/emoticons/k/katana.gif">:katana: ' +
             '<img src="http://e.deviantart.net/emoticons/n/ninjabattle.gif">:ninjabattle: ' +
             '<img src="http://e.deviantart.net/emoticons/j/jawdrop.gif">:jawdrop:' +
             '<img src="https://s.yimg.com/lq/i/mesg/emoticons7/19.gif">:devil:' +
             '<img src="http://e.deviantart.net/emoticons/h/heart.gif">:heart:' +
             '<img src="https://s.yimg.com/lq/i/mesg/emoticons7/46.gif">:sigh:' +
             '<img src="http://www.sherv.net/cm/emo/lol/moving-lol.gif">LOL' +
             '<img src="http://e.deviantart.net/emoticons/t/tears.gif">:cry:' +
             '<img src="http://e.deviantart.net/emoticons/l/lmao.gif">:lmao: ' +
             '<img src="http://e.deviantart.net/emoticons/a/above.gif">^' +
             '<img src="http://e.deviantart.net/emoticons/h/hump.gif">:hump:'
         );
     },

     groups: function (target, room, user) {
         if (!this.canBroadcast()) return;
         this.sendReplyBox('+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />' +
             '% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts<br />' +
             '@ <b>Moderator</b> - The above, and they can ban users<br />' +
             '&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties<br />' +
             '~ <b>Administrator</b> - They can do anything, like change what this message says<br />' +
             '± <b>Nova Bot</b> - This is the server itself that auto moderates chats and tells jokes<br />' +
             '# <b>Room Owner</b> - They are administrators of the room and can almost totally control it');
     },

     regdate: function (target, room, user, connection) {
         if (!this.canBroadcast()) return;
         if (!target || target == "." || target == "," || target == "'") return this.sendReply('/regdate - Please specify a valid username.');
         var username = sanitize(target);
         target = target.replace(/\s+/g, '');
         var util = require("util"),
             http = require("http");

         var options = {
             host: "www.pokemonshowdown.com",
             port: 80,
             path: "/forum/~" + target
         };

         var content = "";
         var self = this;
         var req = http.request(options, function (res) {

             res.setEncoding("utf8");
             res.on("data", function (chunk) {
                 content += chunk;
             });
             res.on("end", function () {
                 content = content.split("<em");
                 if (content[1]) {
                     content = content[1].split("</p>");
                     if (content[0]) {
                         content = content[0].split("</em>");
                         if (content[1]) {
                             regdate = content[1];
                             data = username + ' was registered on' + regdate + '.';
                         }
                     }
                 } else {
                     data = username + ' is not registered.';
                 }
                 self.sendReplyBox(data);
                 room.update();
             });
         });
         req.end();
     },

     twitchgroups: function (target, room, user) {
         if (!this.canBroadcast()) return;

         return this.sendReplyBox('<img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14"><b>System Operator</b> - These are the people who make the server tick. Say hello!<br/><img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14"><b>Elite Moderator</b> - Our most experienced and trustworthy moderator squad who help us keep the server safe and fun.<br/><img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14"><b>Broadcaster</b> - This icon denotes the person whose room you\'re currently in.<br/><img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14"><b>Chat Moderator</b> - Specifically appointed chat moderators for the server.<br/><img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14"><b>Turbo User</b> - These are the people who donated or contributed to the server.');
     },
     /*********************************************************
      * Bot edits                                       *
      *********************************************************/

     kick: 'warn',
     k: 'warn',
     warn: function (target, room, user) {
         if (!target) return this.parse('/help warn');

         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser || !targetUser.connected) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (room.isPrivate && room.auth) {
             return this.sendReply('You can\'t warn here: This is a privately-owned room not subject to global rules.');
         }
         if (target.length > MAX_REASON_LENGTH) {
             return this.sendReply('The reason is too long. It cannot exceed ' + MAX_REASON_LENGTH + ' characters.');
         }
         if (!this.can('warn', targetUser, room)) return false;

         this.addModCommand('' + targetUser.name + ' was warned by ' + user.name + '.' + (target ? " (" + target + ")" : ""));
         targetUser.send('|c|~|/warn ' + target);
         bot.say(bb, 'OOOOO, ' + targetUser.name + ' just got called out', room);
         this.add('|unlink|' + targetUser.userid);
     },

     m: 'mute',
     mute: function (target, room, user) {
         if (!target) return this.parse('/help mute');

         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (target.length > 60) {
             return this.sendReply('The reason is too long. It cannot exceed ' + MAX_REASON_LENGTH + ' characters.');
         }
         if (!this.can('mute', targetUser, room)) return false;
         if (targetUser.mutedRooms[room.id] || targetUser.locked || !targetUser.connected) {
             var problem = ' but was already ' + (!targetUser.connected ? 'offline' : targetUser.locked ? 'locked' : 'muted');
             if (!target) {
                 return this.privateModCommand('(' + targetUser.name + ' would be muted by ' + user.name + problem + '.)');
             }
             return this.addModCommand('' + targetUser.name + ' would be muted by ' + user.name + problem + '.' + (target ? " (" + target + ")" : ""));
         }

         targetUser.popup(user.name + ' has muted you for 7 minutes. ' + target);
         this.addModCommand('' + targetUser.name + ' was muted by ' + user.name + ' for 7 minutes.' + (target ? " (" + target + ")" : ""));
         var alts = targetUser.getAlts();
         if (alts.length) this.addModCommand("" + targetUser.name + "'s alts were also muted: " + alts.join(", "));
         this.add('|unlink|' + targetUser.userid);
         bot.say(bb, 'OOOOO, ' + targetUser.name + ' just got silenced.', room);
         targetUser.mute(room.id, 7 * 60 * 1000);
     },

     hm: 'hourmute',
     hourmute: function (target, room, user) {
         if (!target) return this.parse('/help hourmute');

         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (target.length > MAX_REASON_LENGTH) {
             return this.sendReply('The reason is too long. It cannot exceed ' + MAX_REASON_LENGTH + ' characters.');
         }
         if (!this.can('mute', targetUser, room)) return false;

         if (((targetUser.mutedRooms[room.id] && (targetUser.muteDuration[room.id] || 0) >= 50 * 60 * 1000) || targetUser.locked) && !target) {
             var problem = ' but was already ' + (!targetUser.connected ? 'offline' : targetUser.locked ? 'locked' : 'muted');
             return this.privateModCommand('(' + targetUser.name + ' would be muted by ' + user.name + problem + '.)');
         }

         targetUser.popup(user.name + ' has muted you for 60 minutes. ' + target);
         this.addModCommand('' + targetUser.name + ' was muted by ' + user.name + ' for 60 minutes.' + (target ? " (" + target + ")" : ""));
         var alts = targetUser.getAlts();
         if (alts.length) this.addModCommand("" + targetUser.name + "'s alts were also muted: " + alts.join(", "));
         this.add('|unlink|' + targetUser.userid);
         bot.say(bb, 'OOOOO, ' + taregetUser.name + 'just got silenced.', room);
         targetUser.mute(room.id, 60 * 60 * 1000, true);
     },


     l: 'lock',
     ipmute: 'lock',
     lock: function (target, room, user) {
         if (!target) return this.parse('/help lock');

         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUser + ' not found.');
         }
         if (target.length > MAX_REASON_LENGTH) {
             return this.sendReply('The reason is too long. It cannot exceed ' + MAX_REASON_LENGTH + ' characters.');
         }
         if (!user.can('lock', targetUser)) {
             return this.sendReply('/lock - Access denied.');
         }

         if ((targetUser.locked || Users.checkBanned(targetUser.latestIp)) && !target) {
             var problem = ' but was already ' + (targetUser.locked ? 'locked' : 'banned');
             return this.privateModCommand('(' + targetUser.name + ' would be locked by ' + user.name + problem + '.)');
         }

         targetUser.popup(user.name + ' has locked you from talking in chats, battles, and PMing regular users.\n\n' + target + '\n\nIf you feel that your lock was unjustified, you can still PM staff members (%, @, &, and ~) to discuss it.');

         this.addModCommand("" + targetUser.name + " was locked from talking by " + user.name + "." + (target ? " (" + target + ")" : ""));
         var alts = targetUser.getAlts();
         if (alts.length) this.addModCommand("" + targetUser.name + "'s alts were also locked: " + alts.join(", "));
         this.add('|unlink|' + targetUser.userid);
         bot.say(bb, 'get locked bioch', room);
         targetUser.lock();
     },


     b: 'ban',
     ban: function (target, room, user) {
         if (!target) return this.parse('/help ban');

         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (target.length > MAX_REASON_LENGTH) {
             return this.sendReply('The reason is too long. It cannot exceed ' + MAX_REASON_LENGTH + ' characters.');
         }
         if (!this.can('ban', targetUser)) return false;

         if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
             var problem = ' but was already banned';
             return this.privateModCommand('(' + targetUser.name + ' would be banned by ' + user.name + problem + '.)');
         }

         targetUser.popup(user.name + " has banned you." + (config.appealurl ? ("  If you feel that your banning was unjustified you can appeal the ban:\n" + config.appealurl) : "") + "\n\n" + target);

         this.addModCommand("" + targetUser.name + " was banned by " + user.name + "." + (target ? " (" + target + ")" : ""), ' (' + targetUser.latestIp + ')');
         var alts = targetUser.getAlts();
         if (alts.length) {
             this.addModCommand("" + targetUser.name + "'s alts were also banned: " + alts.join(", "));
             for (var i = 0; i < alts.length; ++i) {
                 this.add('|unlink|' + toId(alts[i]));
             }
         }
         bot.say(bb, 'haha lil bich get banned', room);
         this.add('|unlink|' + targetUser.userid);
         targetUser.ban();
     },
     /*********************************************************
      * Useful Commands                                       *
      *********************************************************/
     customavatars: 'customavatar',
     customavatar: (function () {
         const script = (function () {
             /*
			FILENAME=`mktemp`
			function cleanup {
				rm -f $FILENAME
			}
			trap cleanup EXIT

			set -xe

			wget "$1" -nv -O $FILENAME

			FRAMES=`identify $FILENAME | wc -l`
			if [ $FRAMES -gt 1 ]; then
				EXT=".gif"
			else
				EXT=".png"
			fi

			convert $FILENAME -layers TrimBounds -coalesce -adaptive-resize 80x80\> -background transparent -gravity center -extent 80x80 "$2$EXT"
		*/
         }).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

         var pendingAdds = {};
         return function (target) {
             var parts = target.split(',');
             var cmd = parts[0].trim().toLowerCase();

             if (cmd in {
                 '': 1,
                 show: 1,
                 view: 1,
                 display: 1
             }) {
                 var message = "";
                 for (var a in Config.customAvatars)
                     message += "<strong>" + sanitize(a) + ":</strong> " + sanitize(Config.customAvatars[a]) + "<br />";
                 return this.sendReplyBox(message);
             }

             if (!this.can('customavatar')) return false;

             switch (cmd) {
             case 'set':
                 var userid = toId(parts[1]);
                 var user = Users.getExact(userid);
                 var avatar = parts.slice(2).join(',').trim();

                 if (!userid) return this.sendReply("You didn't specify a user.");
                 if (Config.customAvatars[userid]) return this.sendReply(userid + " already has a custom avatar.");

                 var hash = require('crypto').createHash('sha512').update(userid + '\u0000' + avatar).digest('hex').slice(0, 8);
                 pendingAdds[hash] = {
                     userid: userid,
                     avatar: avatar
                 };
                 parts[1] = hash;

                 if (!user) {
                     this.sendReply("Warning: " + userid + " is not online.");
                     this.sendReply("If you want to continue, use: /customavatar forceset, " + hash);
                     return;
                 }
                 // Fallthrough

             case 'forceset':
                 var hash = parts[1].trim();
                 if (!pendingAdds[hash]) return this.sendReply("Invalid hash.");

                 var userid = pendingAdds[hash].userid;
                 var avatar = pendingAdds[hash].avatar;
                 delete pendingAdds[hash];

                 require('child_process').execFile('bash', ['-c', script, '-', avatar, './config/avatars/' + userid], (function (e, out, err) {
                     if (e) {
                         this.sendReply(userid + "'s custom avatar failed to be set. Script output:");
                         (out + err).split('\n').forEach(this.sendReply.bind(this));
                         return;
                     }

                     reloadCustomAvatars();
                     this.sendReply(userid + "'s custom avatar has been set.");
                 }).bind(this));
                 break;

             case 'delete':
                 var userid = toId(parts[1]);
                 if (!Config.customAvatars[userid]) return this.sendReply(userid + " does not have a custom avatar.");

                 if (Config.customAvatars[userid].toString().split('.').slice(0, -1).join('.') !== userid)
                     return this.sendReply(userid + "'s custom avatar (" + Config.customAvatars[userid] + ") cannot be removed with this script.");
                 require('fs').unlink('./config/avatars/' + Config.customAvatars[userid], (function (e) {
                     if (e) return this.sendReply(userid + "'s custom avatar (" + Config.customAvatars[userid] + ") could not be removed: " + e.toString());

                     delete Config.customAvatars[userid];
                     this.sendReply(userid + "'s custom avatar removed successfully");
                 }).bind(this));
                 break;

             default:
                 return this.sendReply("Invalid command. Valid commands are `/customavatar set, user, avatar` and `/customavatar delete, user`.");
             }
         };
     })(),

     join: function (target, room, user, connection) {
         if (!target) return false;
         var targetRoom = Rooms.get(target) || Rooms.get(toId(target));
         if (!targetRoom) {
             if (target === 'lobby') return connection.sendTo(target, "|noinit|nonexistent|");
             return connection.sendTo(target, "|noinit|nonexistent|The room '" + target + "' does not exist.");
         }
         if (targetRoom.isPrivate && !user.named) {
             return connection.sendTo(target, "|noinit|namerequired|You must have a name in order to join the room '" + target + "'.");
         }
         if (!user.joinRoom(targetRoom || room, connection)) {
             return connection.sendTo(target, "|noinit|joinfailed|The room '" + target + "' could not be joined.");
         }
         if (target.toLowerCase() == "lobby") {
             return connection.sendTo('lobby', '|html|<div class="broadcast-nova"><h1><center><b><u>Welcome to the Nova Server!</u></b></center></h1><br/><br/<center><img src="http://i.imgur.com/gQCykU1.gif"><br/><br/><center>What Can You Do Here?</center><hr>' +
                 '<center><b>Participate In Tournaments For Money And Prizes!</b></center><br>' +
                 '<center><b>Join Various Leagues And Clans!</b></center><br>' +
                 '<center><b>Chat With Emoticons Our Change Your Name Color!</b></center><br>' +
                 '<center><b>Our Just Hang Out And Chat</b></center><br>' +
                 '<center><b>If You Liked Your Experience here Make Sure To Tell Your Friends About Us!</b></center><hr><br>' +
                 '<center><b>For General Help For Server Commands Use /serverhelp</b></center><br>' +
                 '<center><b>If You Have Any Problems Pm a Staff Member, Only Serious Problems Should Be Taken To Admins (~)</b></center><hr><br>' +
                 '<center><a href="http://pokemonshowdown.com/rules"><button class="pinkbutton" title="Rules"><font color="white"><b>Rules</b></a></button>   |   <a href="http://www.smogon.com/sim/faq"><button class="pinkbutton" title="FAQs"><font color="white"><b>FAQs</b></a></button> </button></div>');
         }
     },

     ip: 'whois',
     getip: 'whois',
     rooms: 'whois',
     altcheck: 'whois',
     alt: 'whois',
     alts: 'whois',
     getalts: 'whois',
     whois: function (target, room, user) {
         var targetUser = this.targetUserOrSelf(target);
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }

         this.sendReply('User: ' + targetUser.name);
         if (user.can('alts', targetUser)) {
             var alts = targetUser.getAlts();
             var output = '';
             for (var i in targetUser.prevNames) {
                 if (output) output += ", ";
                 output += targetUser.prevNames[i];
             }
             if (output) this.sendReply('Previous names: ' + output);

             for (var j = 0; j < alts.length; j++) {
                 var targetAlt = Users.get(alts[j]);
                 if (!targetAlt.named && !targetAlt.connected) continue;
                 if (targetAlt.group === '~' && user.group !== '~') continue;

                 this.sendReply('Alt: ' + targetAlt.name);
                 output = '';
                 for (var i in targetAlt.prevNames) {
                     if (output) output += ", ";
                     output += targetAlt.prevNames[i];
                 }
                 if (output) this.sendReply('Previous names: ' + output);
             }
         }
         if (config.groups[targetUser.group] && config.groups[targetUser.group].name) {
             this.sendReply('Group: ' + config.groups[targetUser.group].name + ' (' + targetUser.group + ')');
         }
         if (targetUser.isSysop) {
             this.sendReply('(Pok\xE9mon Showdown System Operator)');
         }
         if (targetUser.sysOp) {
             this.sendReply('(Nova System Operator)');
         }

         if (!targetUser.authenticated) {
             this.sendReply('(Unregistered)');
         }
         if (!this.broadcasting && (user.can('ip', targetUser) || user === targetUser)) {
             var ips = Object.keys(targetUser.ips);
             this.sendReply('IP' + ((ips.length > 1) ? 's' : '') + ': ' + ips.join(', '));
         }
         var output = 'In rooms: ';
         var first = true;
         for (var i in targetUser.roomCount) {
             if (i === 'global' || Rooms.get(i).isPrivate) continue;
             if (!first) output += ' | ';
             first = false;

             output += '<a href="/' + i + '" room="' + i + '">' + i + '</a>';
         }
         this.sendReply('|raw|' + output);
     },
     imgdeclare: function (target, room, user) {
         if (!target) return this.sendReply('|raw|Correct Syntax: /imgdeclare <i>insert img url here</i>');
         if (!this.can('imgdeclare')) return;

         if (!this.canTalk(target)) {
             return false;
         } else {
             this.add('|raw|' + '<img width="100%" src="' + target + '" >');
             this.logModCommand(user.name + ' declared ' + target);
         }
         this.logModCommand(user.name + ' image declared ' + target);
     },

     masspm: 'pmall',
     pmall: function (target, room, user) {
         if (!target) return this.sendReply('|raw|/pmall <em>message</em> - Sends a PM to every user in a room.');
         if (!this.can('pmall')) return false;

         var pmName = bot.name;

         for (var i in Users.users) {
             var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
             Users.users[i].send(message);
         }
     },

     gdeclarered: 'gdeclare',
     gdeclaregreen: 'gdeclare',
     gdeclare: function (target, room, user, connection, cmd) {
         if (!target) return this.parse('/help gdeclare');
         if (!this.can('lockdown')) return false;


         var roomName = (room.isPrivate) ? 'a private room' : room.id;


         if (cmd === 'gdeclare') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         }
         if (cmd === 'gdeclarered') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         } else if (cmd === 'gdeclaregreen') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         }
         this.logEntry(user.name + ' used /gdeclare');
     },

     modmsg: 'declaremod',
     moddeclare: 'declaremod',
     declaremod: function (target, room, user) {
         if (!target) return this.sendReply('/declaremod [message] - Also /moddeclare and /modmsg');
         if (!this.can('declare', null, room)) return false;

         if (!this.canTalk()) return false;

         this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');

         this.logModCommand(user.name + ' mod declared ' + target);
     },

     database: 'db',
     db: function (target, room, user, connection) {
         if (!this.can('db')) return false;
         if (!target) return user.send('|popup|You much enter a target.');
         try {
             var log = fs.readFileSync(('src/data/' + target + '.csv'), 'utf8');
             return user.send('|popup|' + log);
         } catch (e) {
             return user.send('|popup|Something bad happened:\n\n ' + e.stack);
         }
     },

     // @Override declare command becuase of the canTalk function prevents user from declaring
     declare: function (target, room, user) {
         if (!target) return this.parse('/help declare');
         if (!this.can('declare', null, room)) return false;
         this.add('|raw|<div class="broadcast-blue"><b>' + target + '</b></div>');
         this.logModCommand(user.name + ' declared ' + target);
     },
     /*********************************************************
      * Fun Commands                                          *
      *********************************************************/
     dayclub: function (target, room, user, connection) {
         if (!this.can('broadcast')) return this.sendReply('You must at least be voice in order to force us all to be disco dancing freakazoids.');
         if (nightclub[room.id]) return this.sendReply('This room is already engulfed in nightclubness.');
         nightclub[room.id] = true;
         room.addRaw('<div class="nightclub"><font size=6>' + nightclubify('LETS GET FITZY!! nightclub mode: ON!!!') + '</font><font size="2"> started by: ' + user.userid + '</font></div>');
     },
     nightclub: function (target, room, user, connection) {
         if (!this.can('broadcast')) return this.sendReply('You must at least be voice in order to force us all to stop dancin\'.');
         if (!nightclub[room.id]) return this.sendReply('This room is already in broad daylight.');
         delete nightclub[room.id];
         room.addRaw('<div class="nightclub"><font size=6>' + nightclubify('sizzle down now... nightclub mode: off.') + '</font><font size="2"> ended by: ' + user.userid + '</font></font>');
     },

     kick: function (target, room, user) {
         if (!this.can('declare')) return this.sendReply('/kick - Access Denied');
         if (!target) return this.sendReply('|raw|/kick <em>username</em> - kicks the user from the room.');
         var targetUser = Users.get(target);
         if (!targetUser) return this.sendReply('User ' + target + ' not found.');
         if (targetUser.group === '~') {
             return this.sendReply('Administrators can\'t be room kicked.');
         }
         if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target + ' is not in this room.');
         targetUser.popup('You have been kicked from room ' + room.title + ' by ' + user.name + '.');
         targetUser.leaveRoom(room);
         room.add('|raw|' + targetUser.name + ' has been kicked from room by ' + user.name + '.');
         this.logModCommand(user.name + ' kicked ' + targetUser.name + ' from ' + room.id);
     },


     poke: function (target, room, user) {
         if (!target) return this.sendReply('/poke needs a target.');
         return this.parse('/me pokes ' + target + '.');
     },

     roll: 'dice',
     dice: function (target, room, user) {
         if (!this.canBroadcast()) return;
         var d = target.indexOf("d");
         if (d != -1) {
             var num = parseInt(target.substring(0, d));
             faces = NaN;
             if (target.length > d) var faces = parseInt(target.substring(d + 1));
             if (isNaN(num)) num = 1;
             if (isNaN(faces)) return this.sendReply("The number of faces must be a valid integer.");
             if (faces < 1 || faces > 1000) return this.sendReply("The number of faces must be between 1 and 1000");
             if (num < 1 || num > 20) return this.sendReply("The number of dice must be between 1 and 20");
             var rolls = new Array();
             var total = 0;
             for (var i = 0; i < num; i++) {
                 rolls[i] = (Math.floor(faces * Math.random()) + 1);
                 total += rolls[i];
             }
             return this.sendReplyBox('Random number ' + num + 'x(1 - ' + faces + '): ' + rolls.join(', ') + '<br />Total: ' + total);
         }
         if (target && isNaN(target) || target.length > 21) return this.sendReply('The max roll must be a number under 21 digits.');
         var maxRoll = (target) ? target : 6;
         var rand = Math.floor(maxRoll * Math.random()) + 1;
         return this.sendReplyBox('Random number (1 - ' + maxRoll + '): ' + rand);
     },

     derpray: function (target, room, user) {
         if (!target) return this.parse('/help ban');


         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (target.length > 30) {
             return this.sendReply('The reason is too long. It cannot exceed ' + 30 + ' characters.');
         }
         if (!this.can('ban', targetUser)) return false;


         if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
             var problem = ' but was already derp rayed';
             return this.privateModCommand('(' + targetUser.name + ' would be hit by ' + user.name + '\'s derp ray' + problem + '.)');
         }


         targetUser.popup(user.name + " has hit you with his/her derp ray." + (config.appealurl ? ("  If you feel that your banning was unjustified you can appeal the ban:\n" + config.appealurl) : "") + "\n\n" + target);


         this.addModCommand("" + targetUser.name + " derp rayed by " + user.name + "." + (target ? " (" + target + ")" : ""), ' (' + targetUser.latestIp + ')');
         var alts = targetUser.getAlts();
         if (alts.length) {
             this.addModCommand("" + targetUser.name + "'s alts were also derp rayed: " + alts.join(", "));
             for (var i = 0; i < alts.length; ++i) {
                 this.add('|unlink|' + toId(alts[i]));
             }
         }


         this.add('|unlink|' + targetUser.userid);
         targetUser.ban();
     },
     /*********************************************************
      * Tour Commands                                         *
      *********************************************************/
     nt: 'newtour',
     newtour: function (target, room, user) {
         this.parse('/tour new ' + target);
     },

     st: 'starttour',
     starttour: function (target, room, user) {
         this.parse('/tour start');
     },

     jt: 'jointour',
     jointour: function (target, room, user) {
         this.parse('/tour join');
     },

     lt: 'leavetour',
     leavetour: function (target, room, user) {
         this.parse('/tour leave');
     },

     remind: function (target, room, user) {
         this.parse('/tour remind');
     },
     dq: 'disqualify',
     disqualify: function (target, room, user) {
         this.parse('/tour dq ' + target);
     },

     settype: function (target, room, user) {
         this.parse('/tour settype ' + target);
     },
     et: 'endtour',
     endtour: function (target, room, user) {
         this.parse('/tour end');
     },
     /*********************************************************
      * Important Commands                                    *
      *********************************************************/
     unstuck: function (target, room, user) {
         setInterval(function () {
             for (var i in Users.users) {
                 Users.users[i].chatQueue = null;
                 Users.users[i].chatQueueTimeout = null;
             }
         }, 5000);
     },
     reload: function (target, room, user) {
         if (!this.can('hotpatch')) return false;

         try {
             var path = require("path"),
                 fs = require("fs");

             this.sendReply('Reloading command-parser...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'command-parser.js'));
             CommandParser = require(path.join(__dirname, '../', 'command-parser.js'));

             this.sendReply('Reloading hangman.js...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'hangman.js'));
             hangman = require(path.join(__dirname, '../', 'hangman.js')).hangman();
             this.sendReply('Reloading special access features...');
             CommandParser.uncacheTree('./src/stuff/access.js');
             sysop = require('./stuff/access.js').sysopOperation();
             this.sendReply('Reloading base code...');
             CommandParser.uncacheTree('./src/source.js');
             source = require('./source.js');
             this.sendReply('Reloading edits.js...');
             CommandParser.uncacheTree('./src/stuff/edits.js');
             edits = require('./stuff/edits.js').edits();
             var runningTournaments = Tournaments.tournaments;
             this.sendReply('Reloading tournaments...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'tournaments/frontend.js'));
             Tournaments = require(path.join(__dirname, '../', 'tournaments/frontend.js'));
             Tournaments.tournaments = runningTournaments;
             this.sendReply('Reloading commands...');
             CommandParser.uncacheTree('./src/custom-commands.js');
             customcommands = require('./custom-commands.js');
             CommandParser.uncacheTree('./src/trainer-cards.js');
             trainercards = require('./trainer-cards.js');
             this.sendReply('Reloading polls...');
             CommandParser.uncacheTree('./src/stuff/poll.js');
             poll = require('./stuff/poll.js').tour(poll);
             this.sendReply('Reloading profile...');
             CommandParser.uncacheTree('./src/stuff/profile.js');
             profile = require('./stuff/profile.js');
             return this.sendReply('All files have been reloaded.');
         } catch (e) {
             return this.sendReply('Something failed while trying to reload: \n' + e.stack);
         }
     }


 };


 Object.merge(CommandParser.commands, cmds);
 exports.cmds = cmds;
