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
	
	randp: function (target, room, user) {
		var fs = require('fs');
		var fileName = "pokedex.js";
		if (!this.canBroadcast()) return;
		var shinyPoke = ''	
		if (/shiny/i.test(target)) {
			var shinyPoke = '-shiny';
		}
		var kanto = false; var johto = false; var hoenn = false; var sinnoh = false; var kalos = false; var unova = false;
		if (/kanto/i.test(target) || /gen 1/i.test(target)) {
			var kalos = true;
			var x = Math.floor(Math.random() * (174 - 1)) + 1;
		} else if (/johto/i.test(target) || /gen 2/i.test(target)) {
			var johto = true;
			var x = Math.floor(Math.random() * (281 - 173)) + 173;
		} else if (/hoenn/i.test(target) || /gen 3/i.test(target)) {
			var hoenn = true;
			var x = Math.floor(Math.random() * (444 - 280)) + 280;
		} else if (/sinnoh/i.test(target) || /gen 4/i.test(target)) {
			var sinnoh = true;
			var x = Math.floor(Math.random() * (584 - 443)) + 443;
		} else if (/kalos/i.test(target) || /gen 5/i.test(target)) {
			var kalos = true;
			var x = Math.floor(Math.random() * (755 - 583)) + 583;
		} else if (/unova/i.test(target) || /gen 6/i.test(target)) {
			var unova = true;
			var x = Math.floor(Math.random() * (834 - 752)) + 752;
		};
		if (kanto === false && johto === false && hoenn === false && sinnoh === false && kalos === false && unova === false) {
			var x = Math.floor(Math.random() * (856 - 1)) + 1;
		};
		var randP = '';
		var pokeNum = parseInt(x);
		var pokedex = fs.readFileSync('./data/pokedex.js').toString().split("\n");
		var pokemon = (pokedex[x]);
		var speciesIndex1 = pokemon.indexOf('species:"') + 9; var speciesIndex2 = pokemon.indexOf('",', speciesIndex1);
		var pokeName = pokemon.slice(speciesIndex1,speciesIndex2);
		var type1Index1 = pokemon.indexOf(',types:["') + 9; var type1Index2 = pokemon.indexOf('"],', type1Index1);
		var pokeType2 = '';
		if (/,/.test(pokemon.slice(type1Index1, type1Index2))) {
			var type1Index2 = pokemon.indexOf('","', type1Index1);
			var type2Index1 = pokemon.indexOf('","', type1Index1) + 3; var type2Index2 = pokemon.indexOf('"],', type2Index1);
			var pokeType2 = '<img src="http://play.pokemonshowdown.com/sprites/types/' + pokemon.slice(type2Index1, type2Index2) + '.png" width="32" height="14">';
		};
		var pokeType1 = '<img src="http://play.pokemonshowdown.com/sprites/types/' + pokemon.slice(type1Index1, type1Index2) + '.png" width="32" height="14">';
		var ability1Index1 = pokemon.indexOf(',abilities:{0:"') + 15; var ability1Index2 = pokemon.indexOf('"},h', ability1Index1);	
		var pokeAbility2 = '';
		var pokeAbility3 = '';
		if (/",/.test(pokemon.slice(ability1Index1, ability1Index2))) {
			if (/",H:"/.test(pokemon.slice(ability1Index1, ability1Index2))) {
				var ability1Index2 = pokemon.indexOf('",H:"', ability1Index1);
				var ability3Index1 = pokemon.indexOf('",H:"', ability1Index1) + 5; var ability3Index2 = pokemon.indexOf('"', ability3Index1);
				var pokeAbility3 = ', ' + pokemon.slice(ability3Index1, ability3Index2);
			};
			if (/",1:"/.test(pokemon.slice(ability1Index1, ability1Index2))) {
				var ability1Index2 = pokemon.indexOf('",1:"', ability1Index1);
				var ability2Index1 = pokemon.indexOf('",1:"', ability1Index1) + 5; var ability2Index2 = pokemon.indexOf('"', ability2Index1);
				var pokeAbility2 = ', ' + pokemon.slice(ability2Index1, ability2Index2);
			};
		};
		var ability1Index2 = pokemon.indexOf('"', ability1Index1);
		var pokeAbility1 = pokemon.slice(ability1Index1, ability1Index2);
		var hpIndex1 = pokemon.indexOf('hp:') + 3; var hpIndex2 = pokemon.indexOf(',', hpIndex1);
		var pokeHp = parseInt(pokemon.slice(hpIndex1, hpIndex2));
		var atkIndex1 = pokemon.indexOf('atk:') + 4; var atkIndex2 = pokemon.indexOf(',', atkIndex1);
		var pokeAtk = parseInt(pokemon.slice(atkIndex1, atkIndex2));
		var defIndex1 = pokemon.indexOf('def:') + 4; var defIndex2 = pokemon.indexOf(',', defIndex1);
		var pokeDef = parseInt(pokemon.slice(defIndex1, defIndex2));
		var spaIndex1 = pokemon.indexOf('spa:') + 4; var spaIndex2 = pokemon.indexOf(',', spaIndex1);
		var pokeSpa = parseInt(pokemon.slice(spaIndex1, spaIndex2));
		var spdIndex1 = pokemon.indexOf('spd:') + 4; var spdIndex2 = pokemon.indexOf(',', spdIndex1);
		var pokeSpd = parseInt(pokemon.slice(spdIndex1, spdIndex2));
		var speIndex1 = pokemon.indexOf('spe:') + 4; var speIndex2 = pokemon.indexOf('}', speIndex1);
		var pokeSpe = parseInt(pokemon.slice(speIndex1, speIndex2));
		var pokeBst = pokeHp + pokeAtk + pokeDef + pokeSpa + pokeSpd + pokeSpe;
		var pokeStats = 'HP ' + pokeHp + ' / Atk ' + pokeAtk + ' / Def ' + pokeDef + ' / SpA ' + pokeSpa + ' / SpD ' + pokeSpd + ' / Spe ' + pokeSpe + ' / BST ' + pokeBst;
		var colorIndex1 = pokemon.indexOf(',color:"') + 8; var colorIndex2 = pokemon.indexOf('",', colorIndex1);
		var pokeColor = pokemon.slice(colorIndex1, colorIndex2);
		var egg1Index1 = pokemon.indexOf(',eggGroups:["') + 13; var egg1Index2 = pokemon.indexOf('"]', egg1Index1);
		var pokeEgg2 = "";
		if (/,/.test(pokemon.slice(egg1Index1, egg1Index2))) {
			var egg1Index2 = pokemon.indexOf('","', egg1Index1);
			var egg2Index1 = pokemon.indexOf('","', egg1Index1) + 3; var egg2Index2 = pokemon.indexOf('"]', egg2Index1);
			var pokeEgg2 = ", " + pokemon.slice(egg2Index1, egg2Index2);
		};
		var pokeEgg1 = pokemon.slice(egg1Index1, egg1Index2);
		if (pokeName === "Ho-Oh" || pokeName === "Nidoran-F" || pokeName === "Nidoran-M" || pokeName === "Farfetch'd" || pokeName === "Porygon-Z") {
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/' + pokeName.toLowerCase().replace(/[-]+/g, '').replace(/[']+/g, '') + '.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
		} else if (pokeName === "Basculin-Blue-Striped") {
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/basculin-bluestriped.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
		} else if (pokeName === "Pichu-Spiky-eared") {
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pichu-spikyeared.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
		} else if (pokeName === "Floette-Eternal-Flower") {
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/floette-eternalflower.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
		} else if (pokeName === "Missingno.") {
			var y = Math.floor(Math.random() * (6 - 1)) + 1;
			switch(y) {
				case 1:
					randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 2:
					randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/0/03/Missingno_Y.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 3:
					randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 4:
					randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 5:
					randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				default:
					break;
			};
		} else if (pokeName === "Pikachu-Cosplay") {
			var z = Math.floor(Math.random() * (6 - 1)) + 1;
			switch(z) {
				case 1:
					randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-rock-star.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 2:
					randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-belle.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 3:
					randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-pop-star.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 4:
					randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-phd.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				case 5:
					randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-libre.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>'
					break;
				default:
					break;
			};
		} else {
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/' + pokeName.toLowerCase().replace(/[ ]+/g, '').replace(/[.]+/g, '').replace(/[']+/g, '') + '.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
		};
		this.sendReplyBox(randP);
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
};
