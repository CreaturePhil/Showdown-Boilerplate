/**
 * Miscellaneous commands
 */

'use strict';
/*eslint no-restricted-modules: [0]*/

let moment = require('moment');
let request = require('request');

let messages = [
	"has vanished into nothingness!",
	"used Explosion!",
	"fell into the void.",
	"went into a cave without a repel!",
	"has left the building.",
	"was forced to give StevoDuhHero's mom an oil massage!",
	"was hit by Magikarp's Revenge!",
	"ate a bomb!",
	"is blasting off again!",
	"(Quit: oh god how did this get here i am not good with computer)",
	"was unfortunate and didn't get a cool message.",
	"{{user}}'s mama accidently kicked {{user}} from the server!",
];

function clearRoom(room) {
	let len = (room.log && room.log.length) || 0;
	let users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		Users.get(u).leaveRoom(room, Users.get(u).connections[0]);
	}
	len = users.length;
	setTimeout(function () {
		while (len--) {
			Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
		}
	}, 1000);
}

exports.commands = {
	stafflist: 'authority',
	auth: 'authority',
	authlist: 'authority',
	authority: function (target, room, user, connection) {
		let rankLists = {};
		let ranks = Object.keys(Config.groups);
		for (let u in Users.usergroups) {
			let rank = Users.usergroups[u].charAt(0);
			// In case the usergroups.csv file is not proper, we check for the server ranks.
			if (ranks.indexOf(rank) > -1) {
				let name = Users.usergroups[u].substr(1);
				if (!rankLists[rank]) rankLists[rank] = [];
				if (name) rankLists[rank].push(((Users.getExact(name) && Users.getExact(name).connected) ? '**' + name + '**' : name));
			}
		}

		let buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return (Config.groups[b] || {rank: 0}).rank - (Config.groups[a] || {rank: 0}).rank;
		}).forEach(function (r) {
			buffer.push((Config.groups[r] ? r + Config.groups[r].name + "s (" + rankLists[r].length + ")" : r) + ":\n" + rankLists[r].sort().join(", "));
		});

		if (!buffer.length) {
			return connection.popup("This server has no auth.");
		}
		connection.popup(buffer.join("\n\n"));
	},

	clearall: function (target, room, user) {
		if (!this.can('declare')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);
	},

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('gdeclare')) return false;

		for (let u in Users.users) {
			Users.users[u].popup("All rooms are being clear.");
		}
		Rooms.rooms.forEach(clearRoom);
	},

	hide: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = true;
		user.updateIdentity();
		this.sendReply("You have hidden your staff symbol.");
	},

	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk() && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!this.can('mute', targetUser, room)) return false;

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ".");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = ' Server PM [Do not reply]';

		Users.users.forEach(function (user) {
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallhelp: ["/pmall [message] - PM all users in the server."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = ' Staff PM [Do not reply]';

		Users.users.forEach(function (user) {
			if (!user.isStaff) return;
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallstaffhelp: ["/pmallstaff [message] - Sends a PM to every staff member online."],

	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		if (room.id !== 'lobby') return false;
		let message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		let colour = '#' + [1, 1, 1].map(function () {
			let part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw("<strong><font color=\"" + colour + "\">~~ " + Chat.escapeHTML(message) + " ~~</font></strong>");
		user.disconnectAll();
	},
	poofhelp: ["/poof - Disconnects the user and leaves a message in the room."],

	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],

	nopoof: 'poofoff',
	poofoff: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
	poofoffhelp: ["/poofoff - Disable the use of the /poof command."],

	regdate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target || !toId(target)) return this.parse('/help regdate');
		let username = toId(target);
		request('http://pokemonshowdown.com/users/' + username, function (error, response, body) {
			if (error && response.statusCode !== 200) {
				this.sendReplyBox(Chat.escapeHTML(target) + " is not registered.");
				return room.update();
			}
			let regdate = body.split('<small>')[1].split('</small>')[0].replace(/(<em>|<\/em>)/g, '');
			if (regdate === '(Unregistered)') {
				this.sendReplyBox(Chat.escapeHTML(target) + " is not registered.");
			} else if (regdate === '(Account disabled)') {
				this.sendReplyBox(Chat.escapeHTML(target) + "'s account is disabled.");
			} else {
				this.sendReplyBox(Chat.escapeHTML(target) + " was registered on " + regdate.slice(7) + ".");
			}
			room.update();
		}.bind(this));
	},
	regdatehelp: ["/regdate - Please specify a valid username."],

	show: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = false;
		user.updateIdentity();
		this.sendReply("You have revealed your staff symbol.");
	},

	sb: 'showdownboilerplate',
	showdownboilerplate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|This server uses <a href='https://github.com/CreaturePhil/Showdown-Boilerplate'>Showdown-Boilerplate</a>.");
	},
	showdownboilerplatehelp: ["/showdownboilerplate - Links to the Showdown-Boilerplate repository on Github."],

	seen: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(targetUser.name + " is <b>currently online</b>.");
		target = Chat.escapeHTML(target);
		let seen = Db.seen.get(toId(target));
		if (!seen) return this.sendReplyBox(target + " has never been online on this server.");
		this.sendReplyBox(target + " was last seen <b>" + moment(seen).fromNow() + "</b>.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],
	ytmusic: "music",
	music: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help music');
		if (!this.runBroadcast()) return;
		let musick = Chat.escapeHTML(target.trim());
		if(cmd=="ytmusic")
		{
			if(musick.substring(0,8)=="https://") musick = musick.substring(7,musick.length);
			if(musick.substring(0,7)=="http://") musick = musick.substring(6,musick.length);
			this.sendReplyBox('<audio  style="width: 99.6%;border: 6px solid #F74823; color:green;" controls="" src="http://www.youtubeinmp3.com/fetch/?video='+musick+'" >Your user agent does not support the HTML5 Audio element.</audio>');
			return;
		}
		this.sendReplyBox('<audio  style="width: 99.6%" controls="" src="'+target+'" border: 5px solid #E9DF15; background-color:Blue">Your user agent does not support the HTML5 Audio element.</audio>');
	},
	musichelp: ["/music <mp3 link>: Shows a box which can play mp3 music."],
distor: function (target, room, user, connection, cmd) {
	if (!this.runBroadcast()) return;
	this.sendReplyBox('<div class="message"><ul class="utilichart"><li class="result"><span class="col numcol"><b>Istor</b></span> <span class="col iconcol"><span style="background:transparent url(//play.pokemonshowdown.com/sprites/smicons-sheet.png?a1) no-repeat scroll -40px -2430px"></span></span> <span class="col pokemonnamecol" style="white-space:nowrap"><a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/aurora/README.md" target="_blank">Yddraig</a></span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/Dragon.png" alt="Dragon" height="14" width="32"></span> <span style="float:left;min-height:26px"><span class="col abilitycol">Infernal Scales / Shed Skin</span><span class="col abilitycol"></span></span><span style="float:left;min-height:26px"><span class="col statcol"><em>HP</em><br>60</span> <span class="col statcol"><em>Atk</em><br>60</span> <span class="col statcol"><em>Def</em><br>55</span> <span class="col statcol"><em>SpA</em><br>75</span> <span class="col statcol"><em>SpD</em><br>55</span> <span class="col statcol"><em>Spe</em><br>85</span> <span class="col bstcol"><em>BST<br>390</em></span> </span></li><li style="clear:both"></li></ul></div>');	
	
	},
	tell: function (target, room, user, connection) {
		if (!target) return this.parse('/help tell');
		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help tell');
		}

		if (targetUser && targetUser.connected) {
			return this.parse('/pm ' + this.targetUsername + ', ' + target);
		}

		if (user.locked) return this.popupReply("You may not send offline messages when locked.");
		if (target.length > 255) return this.popupReply("Your message is too long to be sent as an offline message (>255 characters).");

		if (Config.tellrank === 'autoconfirmed' && !user.autoconfirmed) {
			return this.popupReply("You must be autoconfirmed to send an offline message.");
		} else if (!Config.tellrank || Config.groupsranking.indexOf(user.group) < Config.groupsranking.indexOf(Config.tellrank)) {
			return this.popupReply("You cannot send an offline message because offline messaging is " +
				(!Config.tellrank ? "disabled" : "only available to users of rank " + Config.tellrank + " and above") + ".");
		}

		let userid = toId(this.targetUsername);
		if (userid.length > 18) return this.popupReply("\"" + this.targetUsername + "\" is not a legal username.");

		let sendSuccess = Tells.addTell(user, userid, target);
		if (!sendSuccess) {
			if (sendSuccess === false) {
				return this.popupReply("User " + this.targetUsername + " has too many offline messages queued.");
			} else {
				return this.popupReply("You have too many outgoing offline messages queued. Please wait until some have been received or have expired.");
			}
		}
		return connection.send('|pm|' + user.getIdentity() + '|' +
			(targetUser ? targetUser.getIdentity() : ' ' + this.targetUsername) +
			"|/text This user is currently offline. Your message will be delivered when they are next online.");
	},
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."],

		dhssbnew: function (target, room, user, connection, cmd) {
    if (!this.runBroadcast()) return;
    if (!target) return this.parse('/dhssbnewhelp');
    if (!target) target = 'help';
    let separated = target.split("|");
	let target1 = (("" + separated[0]).trim());
    let target2 = (("" + separated[1]).trim());
    let target3 = (("" + separated[2]).trim());
    let target4 = (("" + separated[3]).trim());
    let target5 = (("" + separated[4]).trim());
    let target6 = (("" + separated[5]).trim()).toLowerCase();
    let target7 = (("" + separated[6]).trim()).toLowerCase();
    let target8 = (("" + separated[7]).trim()).toLowerCase();
    let target9 = (("" + separated[8]).trim());
    let target10 = (("" + separated[9]).trim()).toLowerCase();
    let target11 = (("" + separated[10]).trim());
    let target12 = (("" + separated[1]).trim()).toLowerCase();
    let target13 = (("" + separated[5]).trim());
    let target14 = (("" + separated[6]).trim());
    let target15 = (("" + separated[7]).trim());
    let target16 = (("" + separated[11]).trim()).toLowerCase();
    let target17 = (("" + separated[12]).trim()).toLowerCase();
    let target18 = (("" + separated[12]));
    let target19 = (("" + separated[13]));
    let target20 = (("" + separated[14]));
    let target21 = (("" + separated[15]));
    this.sendReplyBox('<button name="receive" value="|html|&#39;'+target1+'&#39; : {<br>species: &#39;'+target2+'&#39;, ability: &#39;'+target3+'&#39;, item: &#39;'+target4+'&#39;, gender: &#39;'+target5+'&#39;,<br>moves: [&#39;'+target6+'&#39;, &#39;'+target7+'&#39;, &#39;'+target8+'&#39;],<br>signatureMove: &quot;'+target9+'&quot;,evs: {<b>'+target10+'</b>}, nature: &#39;'+target11+'&#39;,<br>},<br><br><div style=&quot;border: solid 4px #0bb1b7;&quot;>Ability Description: '+target16+'<br>Signature Move Description:'+target17+' <br>Entry Phrase:'+target19+'<br>Signature Move Phrase:'+target20+'<br>Faint Phrase: '+target21+'<br><a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/scripts.js>Scripts </a><a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/moves.js>Moves</a><a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/abilities.js> Abilities </a></div>">Code</button><br><button name="receive" value="|html|###  '+target1+' <br><br>!['+target1+'](http://www.smogon.com/dex/media/sprites/xy/'+target12+'.gif)<br><br>Ability: '+target3+'<br><br>EVs: '+target10+'<br><br>'+target11+' Nature<br><br>-'+target13+'<br><br>-'+target14+'<br><br>-'+target15+'<br><br>- '+target9+'<br><br>'+target3+':'+target16+'<br><br>'+target9+':'+target17+'<br><br><a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md>Readme.md</a>">Code for README.md</button>');

	},
	dhssbnewhelp:function (target, room, user, connection, cmd) {
		this.sendReplyBox('/ssbt Username|Species|Ability|Item|Gender|Move 1|Move 2|Move 3|Signature Move|EVs|Nature|Ability Description|Custom Move Description|Entry Phrase|Signature Move Phrase|Faint Phrase <br><br><br> Username - Type the username for which the SSB set will be made <br> Species - Specify the pokemon species <br> Ability - Type the name of the desired ability or the custom ability<br>Item - Type the name of the desired item<br> Gender - Type M for male, F for female<br> Moves 1,2,3, - Type the name of the moves<br>Signature Move - Type the name of the custom move in here<br>EVs - Specify the EVs investment<br>Nature - Type the name of the desired pokemon Nature<br>Ability Desc - If your ability is a custom one then insert info here, if not then simply type the name of the ability<br>Signature Move Desc - Insert info about the custom move. Include Base Power,Priority,PP,Physical/Special,Type,Effect,Animation info here<br>Entry Phrase - The phrase which the pokemon will say on switch in<br>Signature Move Phrase - The phrase which the pokemon will say on using its signature move<br>Faint Phrase - The phrase which tode he pokemon will say on fainting<br>Use | as divider<br>Example - /dhssbnew charizard8888|Charizard|Speed Roost|Life Orb|M|Dragon Rush|U-Turn|Flare BLitz|gg m8|<b>hp:4, atk:252, spe:252</b>|Adamant|Same as Speed Boost + uses Roost after every turn and gets a substitute on switch in|120 Base Power,0 Priority,Physical,Flying Type,Drains 20% of the damage dealt|RAWR Dragonz rule!|git rekt|dem hax');
	},
	newstor: function(target, room, user, connection, cmd) {
 		if (!this.runBroadcast()) return;
 		if (!target) return this.parse('/help newstor');
 		if (!target) target = 'help';
 		let separated = target.split(",");
 		let target1 = (("" + separated[0]).trim());
 		let target2 = (("" + separated[1]).trim());
 		let target3 = (("" + separated[2]).trim());
 		let target4 = (("" + separated[3]).trim());
 		let target5 = (("" + separated[4]).trim());
 		let target6 = (("" + separated[5]).trim());
 		let target7 = (("" + separated[6]).trim());
 		let target8 = (("" + separated[7]).trim());
 		let target9 = (("" + separated[8]).trim());
 		let target10 = (("" + separated[9]).trim());
 		let target11 = (("" + separated[10]).trim());
 		let target12 = (("" + separated[11]).trim());
 		let target13 = (("" + separated[12]).trim()).toLowerCase();
 		let tot = parseInt(target7) + parseInt(target8) + parseInt(target9) + parseInt(target10) + parseInt(target11) + parseInt(target12);
 		this.sendReplyBox('<ul class="utilichart"><li class="result"><span class="col numcol"><b>Istor</b></span> <span class="col iconcol"><img src="http://www.pokestadium.com/assets/img/sprites/misc/icons/old/' + target13 + '.png" width="32" height="32"></span></span> <span class="col pokemonnamecol" style="white-space: nowrap"><a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/aurora" target="_blank">' + target1 + '</a></span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/' + target2 + '.png" alt="' + target2 + '" height="14" width="32"><img src="//play.pokemonshowdown.com/sprites/types/' + target3 + '.png" alt="' + target3 + '" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col twoabilitycol">' + target4 + '<br>' + target5 + '</span><span class="col abilitycol"><em>' + target6 + '</em></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>' + target7 + '</span> <span class="col statcol"><em>Atk</em><br>' + target8 + '</span> <span class="col statcol"><em>Def</em><br>' + target9 + '</span> <span class="col statcol"><em>SpA</em><br>' + target10 + '</span> <span class="col statcol"><em>SpD</em><br>' + target11 + '</span> <span class="col statcol"><em>Spe</em><br>' + target12 + '</span> <span class="col bstcol"><em>BST<br>'+tot+'</em></span> </span></li><li style="clear: both"></li></ul><center><button name="receive" value="|html|<h1>Insert Table here</h1>" style="background-color: #1ec990 ; color: white ; font-size: 24px ; border: none">Movepool</button><br><br><button name="receive" value="|c|~Coad|<ul class=&quot;utilichart&quot;><li class=&quot;result&quot;><span class=&quot;col numcol&quot;><b>Istor</b></span> <span class=&quot;col iconcol&quot;><img src=&quot;http://www.pokestadium.com/assets/img/sprites/misc/icons/old/' + target13 + '.png&quot;  width=&quot;32&quot; height=&quot;32&quot;></span> <span class=&quot;col pokemonnamecol&quot; style=&quot;white-space: nowrap&quot;><a href=&quot; https://github.com/XpRienzo/DragonHeaven/blob/master/mods/aurora/README.md&quot; target=&quot;_blank&quot;>**' + target1 + '**</a></span> <span class=&quot;col typecol&quot;><img src=&quot;https://play.pokemonshowdown.com/sprites/types/' + target2 + '.png&quot; alt=&quot;**' + target2 + '**&quot; height=&quot;14&quot; width=&quot;32&quot;><img src=&quot;//play.pokemonshowdown.com/sprites/types/' + target3 + '.png&quot; alt=**&quot;' +target3 + '&quot;** height=&quot;14&quot; width=&quot;32&quot;></span> <span style=&quot;float: left ; min-height: 26px&quot;><span class=&quot;col twoabilitycol&quot;>**' + target4 + '**<br>**' + target5 + '**</span><span class=&quot;col abilitycol&quot;><em>**' + target6 + '**</em></span></span><span style=&quot;float: left ; min-height: 26px&quot;><span class=&quot;col statcol&quot;><em>HP</em><br>**' + target7 + '**</span> <span class=&quot;col statcol&quot;><em>Atk</em><br>**' + target8 + '**</span> <span class=&quot;col statcol&quot;><em>Def</em><br>**' + target9 + '**</span> <span class=&quot;col statcol&quot;><em>SpA</em><br>**' + target10 + '**</span> <span class=&quot;col statcol&quot;><em>SpD</em><br>**' + target11 + '**</span> <span class=&quot;col statcol&quot;><em>Spe</em><br>**' + target12 + '**</span> <span class=&quot;col bstcol&quot;><em>BST<br>**'+tot+'**</em></span> </span></li><li style=&quot;clear: both&quot;></li></ul><center><button name=&quot;receive&quot; value=&quot;|html|<h1>Insert Table here</h1>&quot; style=&quot;background-color: #1ec990 ; color: white ; font-size: 24px ; border: none&quot;>Movepool</button></center>" style="background-color:black;color:yellow;font-size:24px;border:4px solid yellow;">Generate</button><br><button name="receive" value="|html|'+target1+'   <br>!['+target2+'](http://play.pokemonshowdown.com/sprites/types/'+target2+'.png) <br>!['+target3+'](http://play.pokemonshowdown.com/sprites/types/'+target3+'.png)  <br><br>Abilities: '+target4+' , '+target5+',  '+target6+' <br><br>| HP          | Atk         |     Def     | SpA          | SpD          | Spe          | BST     |<br>|-------------|-------------|:-----------:|--------------|--------------|--------------|---------|<br>| '+target7+' | '+target8+' | '+target9+' | '+target10+' | '+target11+' | '+target12+' | '+tot+' | <br><br><a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/aurora/README.md>Readme file </a>">Readme code</button></center>')
 	},
 
 	newstorhelp: ["/newstor Pokemon, Primary Type, Secondary Type, Primary Ability, Secondary Ability, Hidden Ability, HP, Atk, Def, SpA, SpD, Spe, Mascot"],
 
};
