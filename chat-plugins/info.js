/**
 * Informational Commands
 * Pokemon Showdown - https://pokemonshowdown.com/
 *
 * These are informational commands. For instance, you can define the command
 * 'whois' here, then use it by typing /whois into Pokemon Showdown.
 *
 * For the API, see chat-plugins/COMMANDS.md
 *
 * @license MIT license
 */

'use strict';

const path = require('path');

exports.commands = {

	'!whois': true,
	ip: 'whois',
	rooms: 'whois',
	alt: 'whois',
	alts: 'whois',
	whoare: 'whois',
	whois: function (target, room, user, connection, cmd) {
		if (room && room.id === 'staff' && !this.runBroadcast()) return;
		if (!room) room = Rooms.global;
		let targetUser = this.targetUserOrSelf(target, user.group === ' ');
		let showAll = (cmd === 'ip' || cmd === 'whoare' || cmd === 'alt' || cmd === 'alts');
		if (!targetUser) {
			if (showAll) return this.parse('/checkpunishment ' + target);
			return this.errorReply("User " + this.targetUsername + " not found.");
		}
		if (showAll && !user.trusted && targetUser !== user) {
			return this.errorReply(`/${cmd} - Access denied.`);
		}

		let buf = Chat.html`<strong class="username"><small style="display:none">${targetUser.group}</small>${targetUser.name}</strong> `;
		if (!targetUser.connected) buf += ` <em style="color:gray">(offline)</em>`;
		let roomauth = '';
		if (room.auth && targetUser.userid in room.auth) roomauth = room.auth[targetUser.userid];
		if (Config.groups[roomauth] && Config.groups[roomauth].name) {
			buf += `<br />${Config.groups[roomauth].name} (${roomauth})`;
		}
		if (Config.groups[targetUser.group] && Config.groups[targetUser.group].name) {
			buf += `<br />Global ${Config.groups[targetUser.group].name} (${targetUser.group})`;
		}
		if (targetUser.isSysop) {
			buf += `<br />(Pok&eacute;mon Showdown System Operator)`;
		}
		if (!targetUser.registered) {
			buf += `<br />(Unregistered)`;
		}
		let publicrooms = "";
		let hiddenrooms = "";
		let privaterooms = "";
		targetUser.inRooms.forEach(roomid => {
			if (roomid === 'global') return;
			let targetRoom = Rooms.get(roomid);

			let authSymbol = (targetRoom.auth && targetRoom.auth[targetUser.userid] ? targetRoom.auth[targetUser.userid] : '');
			let battleTitle = (roomid.battle ? ` title="${roomid.title}"` : '');
			let output = `${authSymbol}<a href="/${roomid}"${battleTitle}>${roomid}</a>`;
			if (targetRoom.isPrivate === true) {
				if (targetRoom.modjoin === '~') return;
				if (privaterooms) privaterooms += " | ";
				privaterooms += output;
			} else if (targetRoom.isPrivate) {
				if (hiddenrooms) hiddenrooms += " | ";
				hiddenrooms += output;
			} else {
				if (publicrooms) publicrooms += " | ";
				publicrooms += output;
			}
		});
		buf += '<br />Rooms: ' + (publicrooms || '<em>(no public rooms)</em>');

		if (!showAll) {
			return this.sendReplyBox(buf);
		}
		buf += '<br />';
		if (user.can('alts', targetUser) || user.can('alts') && user === targetUser) {
			let alts = targetUser.getAltUsers(true);
			let prevNames = Object.keys(targetUser.prevNames).join(", ");
			if (prevNames) buf += Chat.html`<br />Previous names: ${prevNames}`;

			for (let j = 0; j < alts.length; ++j) {
				let targetAlt = alts[j];
				if (!targetAlt.named && !targetAlt.connected) continue;
				if (targetAlt.group === '~' && user.group !== '~') continue;

				buf += Chat.html`<br />Alt: <span class="username">${targetAlt.name}</span>`;
				if (!targetAlt.connected) buf += ` <em style=\"color:gray\">(offline)</em>`;
				prevNames = Object.keys(targetAlt.prevNames).join(", ");
				if (prevNames) buf += `<br />Previous names: ${prevNames}`;
			}
			if (targetUser.namelocked) {
				buf += `<br />NAMELOCKED: ${targetUser.namelocked}`;
				let punishment = Punishments.userids.get(targetUser.locked);
				if (punishment) {
					let expiresIn = Punishments.checkLockExpiration(targetUser.locked);
					if (expiresIn) buf += expiresIn;
					if (punishment[3]) buf += ` (reason: ${punishment[3]})`;
				}
			} else if (targetUser.locked) {
				buf += `<br />LOCKED: ${targetUser.locked}`;
				switch (targetUser.locked) {
				case '#dnsbl':
					buf += ` - IP is in a DNS-based blacklist`;
					break;
				case '#range':
					buf += ` - IP or host is in a temporary range-lock`;
					break;
				case '#hostfilter':
					buf += ` - host is permanently locked for being a proxy`;
					break;
				}
				let punishment = Punishments.userids.get(targetUser.locked);
				if (punishment) {
					let expiresIn = Punishments.checkLockExpiration(targetUser.locked);
					if (expiresIn) buf += expiresIn;
					if (punishment[3]) buf += ` (reason: ${punishment[3]})`;
				}
			}
			if (targetUser.semilocked) {
				buf += `<br />Semilocked: ${targetUser.semilocked}`;
			}
		}
		if ((user.can('ip', targetUser) || user === targetUser)) {
			let ips = Object.keys(targetUser.ips);
			ips = ips.map(ip => ip + (Punishments.sharedIps.has(ip) ? ' (shared)' : ''));
			buf += `<br /> IP${Chat.plural(ips)}: ${ips.join(", ")}`;
			if (user.group !== ' ' && targetUser.latestHost) {
				buf += Chat.html`<br />Host: ${targetUser.latestHost}`;
			}
		}
		if ((user === targetUser || user.can('alts', targetUser)) && hiddenrooms) {
			buf += `<br />Hidden rooms: ${hiddenrooms}`;
		}
		if ((user === targetUser || user.can('makeroom')) && privaterooms) {
			buf += `<br />Private rooms: ${privaterooms}`;
		}

		if (user.can('alts', targetUser) || (room.isPrivate !== true && user.can('mute', targetUser, room) && targetUser.userid in room.users)) {
			let punishments = Punishments.getRoomPunishments(targetUser, {checkIps: true});

			if (punishments.length) {
				buf += `<br />Room punishments: `;

				buf += punishments.map(([room, punishment]) => {
					const [punishType, punishUserid, expireTime, reason] = punishment;
					let punishDesc = Punishments.roomPunishmentTypes.get(punishType);
					if (!punishDesc) punishDesc = `punished`;
					if (punishUserid !== targetUser.userid) punishDesc += ` as ${punishUserid}`;
					let expiresIn = new Date(expireTime).getTime() - Date.now();
					let expireString = Chat.toDurationString(expiresIn, {precision: 1});
					punishDesc += ` for ${expireString}`;

					if (reason) punishDesc += `: ${reason}`;
					return `<a href="/${room}">${room}</a> (${punishDesc})`;
				}).join(', ');
			}
		}
		this.sendReplyBox(buf);
	},
	whoishelp: ["/whois - Get details on yourself: alts, group, IP address, and rooms.",
		"/whois [username] - Get details on a username: alts (Requires: % @ * & ~), group, IP address (Requires: @ * & ~), and rooms."],

	'!checkpunishment': true,
	checkpunishment: function (target, room, user) {
		if (!user.trusted) {
			return this.errorReply("/checkpunishment - Access denied.");
		}
		let userid = toId(target);
		if (!userid) return this.errorReply("Please enter a valid username.");
		let targetUser = Users(userid);
		let buf = Chat.html`<strong class="username">${target}</strong>`;
		if (!targetUser || !targetUser.connected) buf += ` <em style="color:gray">(offline)</em>`;
		buf += `<br /><br />`;
		let atLeastOne = false;

		let punishment = Punishments.userids.get(userid);
		if (punishment) {
			const [punishType, punishUserid, , reason] = punishment;
			const punishName = {BAN: "BANNED", LOCK: "LOCKED", NAMELOCK: "NAMELOCKED"}[punishType] || punishType;
			buf += `${punishName}: ${punishUserid}`;
			let expiresIn = Punishments.checkLockExpiration(userid);
			if (expiresIn) buf += expiresIn;
			if (reason) buf += ` (reason: ${reason})`;
			buf += '<br />';
			atLeastOne = true;
		}

		if (!user.can('alts') && !atLeastOne) {
			let hasJurisdiction = room && user.can('mute', null, room) && Punishments.roomUserids.nestedHas(room.id, userid);
			if (!hasJurisdiction) {
				return this.errorReply("/checkpunishment - User not found.");
			}
		}

		let punishments = Punishments.getRoomPunishments(targetUser);

		if (punishments && punishments.length) {
			buf += `<br />Room punishments: `;

			buf += punishments.map(([room, punishment]) => {
				const [punishType, punishUserid, expireTime, reason] = punishment;
				let punishDesc = Punishments.roomPunishmentTypes.get(punishType);
				if (!punishDesc) punishDesc = `punished`;
				if (punishUserid !== targetUser.userid) punishDesc += ` as ${punishUserid}`;
				let expiresIn = new Date(expireTime).getTime() - Date.now();
				let expireString = Chat.toDurationString(expiresIn, {precision: 1});
				punishDesc += ` for ${expireString}`;

				if (reason) punishDesc += `: ${reason}`;
				return `<a href="/${room}">${room}</a> (${punishDesc})`;
			}).join(', ');
			atLeastOne = true;
		}
		if (!atLeastOne) {
			buf += `This username has no punishments associated with it.`;
		}
		this.sendReplyBox(buf);
	},

	'!host': true,
	host: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help host');
		if (!this.can('rangeban')) return;
		target = target.trim();
		if (!/^[0-9.]+$/.test(target)) return this.errorReply('You must pass a valid IPv4 IP to /host.');
		Dnsbl.reverse(target).then(host => {
			this.sendReply('IP ' + target + ': ' + (host || "ERROR"));
		});
	},
	hosthelp: ["/host [ip] - Gets the host for a given IP. Requires: & ~"],

	'!ipsearch': true,
	searchip: 'ipsearch',
	ipsearchall: 'ipsearch',
	hostsearch: 'ipsearch',
	ipsearch: function (target, room, user, connection, cmd) {
		if (!target.trim()) return this.parse('/help ipsearch');
		if (!this.can('rangeban')) return;
		let results = [];

		let isAll = (cmd === 'ipsearchall');

		if (/[a-z]/.test(target)) {
			// host
			this.sendReply("Users with host " + target + ":");
			Users.users.forEach(curUser => {
				if (results.length > 100 && !isAll) return;
				if (!curUser.latestHost || !curUser.latestHost.endsWith(target)) return;
				results.push((curUser.connected ? " \u25C9 " : " \u25CC ") + " " + curUser.name);
			});
			if (results.length > 100 && !isAll) {
				return this.sendReply("More than 100 users match the specified IP range. Use /ipsearchall to retrieve the full list.");
			}
		} else if (target.slice(-1) === '*') {
			// IP range
			this.sendReply("Users in IP range " + target + ":");
			target = target.slice(0, -1);
			Users.users.forEach(curUser => {
				if (results.length > 100 && !isAll) return;
				if (!curUser.latestIp.startsWith(target)) return;
				results.push((curUser.connected ? " \u25C9 " : " \u25CC ") + " " + curUser.name);
			});
			if (results.length > 100 && !isAll) {
				return this.sendReply("More than 100 users match the specified IP range. Use /ipsearchall to retrieve the full list.");
			}
		} else {
			this.sendReply("Users with IP " + target + ":");
			Users.users.forEach(curUser => {
				if (curUser.latestIp === target) {
					results.push((curUser.connected ? " \u25C9 " : " \u25CC ") + " " + curUser.name);
				}
			});
		}
		if (!results.length) {
			if (!target.includes('.')) return this.errorReply("'" + target + "' is not a valid IP or host.");
			return this.sendReply("No results found.");
		}
		return this.sendReply(results.join('; '));
	},
	ipsearchhelp: ["/ipsearch [ip|range|host] - Find all users with specified IP, IP range, or host. Requires: & ~"],

	/*********************************************************
	 * Client fallback
	 *********************************************************/

	unignore: 'ignore',
	ignore: function (target, room, user) {
		if (!room) this.errorReply(`In PMs, this command can only be used by itself to ignore the person you're talking to: "/${this.cmd}", not "/${this.cmd} ${target}"`);
		this.errorReply(`You're using a custom client that doesn't support the ignore command.`);
	},

	/*********************************************************
	 * Data Search Tools
	 *********************************************************/

	'!data': true,
	pstats: 'data',
	stats: 'data',
	dex: 'data',
	pokedex: 'data',
	data: function (target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;

		let buffer = '';
		let targetId = toId(target);
		if (!targetId) return this.parse('/help data');
		let targetNum = parseInt(targetId);
		if (!isNaN(targetNum)) {
			for (let p in Tools.data.Pokedex) {
				let pokemon = Tools.getTemplate(p);
				if (pokemon.num === targetNum) {
					target = pokemon.species;
					targetId = pokemon.id;
					break;
				}
			}
		}
		let newTargets = Tools.dataSearch(target);
		let showDetails = (cmd === 'dt' || cmd === 'details');
		if (newTargets && newTargets.length) {
			for (let i = 0; i < newTargets.length; ++i) {
				if (!newTargets[i].exactMatch && !i) {
					buffer = "No Pok\u00e9mon, item, move, ability or nature named '" + target + "' was found. Showing the data of '" + newTargets[0].name + "' instead.\n";
				}
				if (newTargets[i].searchType === 'nature') {
					let nature = Tools.getNature(newTargets[i].name);
					buffer += "" + nature.name + " nature: ";
					if (nature.plus) {
						let statNames = {'atk': "Attack", 'def': "Defense", 'spa': "Special Attack", 'spd': "Special Defense", 'spe': "Speed"};
						buffer += "+10% " + statNames[nature.plus] + ", -10% " + statNames[nature.minus] + ".";
					} else {
						buffer += "No effect.";
					}
					return this.sendReply(buffer);
				} else {
					buffer += '|c|~|/data-' + newTargets[i].searchType + ' ' + newTargets[i].name + '\n';
				}
			}
		} else {
			return this.errorReply("No Pok\u00e9mon, item, move, ability or nature named '" + target + "' was found. (Check your spelling?)");
		}

		if (showDetails) {
			let details;
			let isSnatch = false;
			let isMirrorMove = false;
			if (newTargets[0].searchType === 'pokemon') {
				let pokemon = Tools.getTemplate(newTargets[0].name);
				let weighthit = 20;
				if (pokemon.weightkg >= 200) {
					weighthit = 120;
				} else if (pokemon.weightkg >= 100) {
					weighthit = 100;
				} else if (pokemon.weightkg >= 50) {
					weighthit = 80;
				} else if (pokemon.weightkg >= 25) {
					weighthit = 60;
				} else if (pokemon.weightkg >= 10) {
					weighthit = 40;
				}
				details = {
					"Dex#": pokemon.num,
					"Gen": pokemon.gen,
					"Height": pokemon.heightm + " m",
					"Weight": pokemon.weightkg + " kg <em>(" + weighthit + " BP)</em>",
					"Dex Colour": pokemon.color,
				};
				if (pokemon.eggGroups) details["Egg Group(s)"] = pokemon.eggGroups.join(", ");
				if (!pokemon.evos.length) {
					details['<font color="#686868">Does Not Evolve</font>'] = "";
				} else {
					details["Evolution"] = pokemon.evos.map(evo => {
						evo = Tools.getTemplate(evo);
						return evo.name + " (" + evo.evoLevel + ")";
					}).join(", ");
				}
			} else if (newTargets[0].searchType === 'move') {
				let move = Tools.getMove(newTargets[0].name);
				details = {
					"Priority": move.priority,
					"Gen": move.gen,
				};

				if (move.secondary || move.secondaries) details["&#10003; Secondary effect"] = "";
				if (move.flags['contact']) details["&#10003; Contact"] = "";
				if (move.flags['sound']) details["&#10003; Sound"] = "";
				if (move.flags['bullet']) details["&#10003; Bullet"] = "";
				if (move.flags['pulse']) details["&#10003; Pulse"] = "";
				if (!move.flags['protect'] && !/(ally|self)/i.test(move.target)) details["&#10003; Bypasses Protect"] = "";
				if (move.flags['authentic']) details["&#10003; Bypasses Substitutes"] = "";
				if (move.flags['defrost']) details["&#10003; Thaws user"] = "";
				if (move.flags['bite']) details["&#10003; Bite"] = "";
				if (move.flags['punch']) details["&#10003; Punch"] = "";
				if (move.flags['powder']) details["&#10003; Powder"] = "";
				if (move.flags['reflectable']) details["&#10003; Bounceable"] = "";
				if (move.flags['gravity']) details["&#10007; Suppressed by Gravity"] = "";

				if (move.id === 'snatch') isSnatch = true;
				if (move.id === 'mirrormove') isMirrorMove = true;

				if (move.zMovePower) {
					details["Z-Power"] = move.zMovePower;
				} else if (move.zMoveEffect) {
					details["Z-Effect"] = {
						'clearnegativeboost': "Restores negative stat stages to 0",
						'crit2': "Crit ratio +2",
						'heal': "Restores HP 100%",
						'curse': "Restores HP 100% if user is Ghost type, otherwise Attack +1",
						'redirect': "Redirects opposing attacks to user",
						'healreplacement': "Restores replacement's HP 100%",
					}[move.zMoveEffect];
				} else if (move.zMoveBoost) {
					details["Z-Effect"] = "";
					let boost = move.zMoveBoost;
					let stats = {atk: 'Attack', def: 'Defense', spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed', accuracy: 'Accuracy', evasion: 'Evasiveness'};
					for (let i in boost) {
						details["Z-Effect"] += " " + stats[i] + " +" + boost[i];
					}
				} else if (move.isZ) {
					details["&#10003; Z-Move"] = "";
					details["Z-Crystal"] = Tools.getItem(move.isZ).name;
					if (move.basePower !== 1) {
						details["User"] = Tools.getItem(move.isZ).zMoveUser.join(", ");
						details["Required Move"] = Tools.getItem(move.isZ).zMoveFrom;
					}
				} else {
					details["Z-Effect"] = "None";
				}

				details["Target"] = {
					'normal': "One Adjacent Pok\u00e9mon",
					'self': "User",
					'adjacentAlly': "One Ally",
					'adjacentAllyOrSelf': "User or Ally",
					'adjacentFoe': "One Adjacent Opposing Pok\u00e9mon",
					'allAdjacentFoes': "All Adjacent Opponents",
					'foeSide': "Opposing Side",
					'allySide': "User's Side",
					'allyTeam': "User's Side",
					'allAdjacent': "All Adjacent Pok\u00e9mon",
					'any': "Any Pok\u00e9mon",
					'all': "All Pok\u00e9mon",
				}[move.target] || "Unknown";
			} else if (newTargets[0].searchType === 'item') {
				let item = Tools.getItem(newTargets[0].name);
				details = {
					"Gen": item.gen,
				};

				if (item.fling) {
					details["Fling Base Power"] = item.fling.basePower;
					if (item.fling.status) details["Fling Effect"] = item.fling.status;
					if (item.fling.volatileStatus) details["Fling Effect"] = item.fling.volatileStatus;
					if (item.isBerry) details["Fling Effect"] = "Activates the Berry's effect on the target.";
					if (item.id === 'whiteherb') details["Fling Effect"] = "Restores the target's negative stat stages to 0.";
					if (item.id === 'mentalherb') details["Fling Effect"] = "Removes the effects of Attract, Disable, Encore, Heal Block, Taunt, and Torment from the target.";
				} else {
					details["Fling"] = "This item cannot be used with Fling.";
				}
				if (item.naturalGift) {
					details["Natural Gift Type"] = item.naturalGift.type;
					details["Natural Gift Base Power"] = item.naturalGift.basePower;
				}
			} else {
				details = {};
			}

			buffer += '|raw|<font size="1">' + Object.keys(details).map(detail => {
				if (details[detail] === '') return detail;
				return '<font color="#686868">' + detail + ':</font> ' + details[detail];
			}).join("&nbsp;|&ThickSpace;") + '</font>';

			if (isSnatch) buffer += '&nbsp;|&ThickSpace;<a href="https://pokemonshowdown.com/dex/moves/snatch"><font size="1">Snatchable Moves</font></a>';
			if (isMirrorMove) buffer += '&nbsp;|&ThickSpace;<a href="https://pokemonshowdown.com/dex/moves/mirrormove"><font size="1">Mirrorable Moves</font></a>';
		}
		this.sendReply(buffer);
	},
	datahelp: ["/data [pokemon/item/move/ability] - Get details on this pokemon/item/move/ability/nature.",
		"!data [pokemon/item/move/ability] - Show everyone these details. Requires: + % @ * # & ~"],

	'!details': true,
	dt: 'details',
	details: function (target) {
		if (!target) return this.parse('/help details');
		this.run('data');
	},
	detailshelp: ["/details [pokemon] - Get additional details on this pokemon/item/move/ability/nature.",
		"!details [pokemon] - Show everyone these details. Requires: + % @ * # & ~"],

	'!weakness': true,
	weaknesses: 'weakness',
	weak: 'weakness',
	resist: 'weakness',
	weakness: function (target, room, user) {
		if (!target) return this.parse('/help weakness');
		if (!this.runBroadcast()) return;
		target = target.trim();
		let targets = target.split(/ ?[,\/ ] ?/);

		let pokemon = Tools.getTemplate(target);
		let type1 = Tools.getType(targets[0]);
		let type2 = Tools.getType(targets[1]);
		let type3 = Tools.getType(targets[2]);

		if (pokemon.exists) {
			target = pokemon.species;
		} else {
			let types = [];
			if (type1.exists) {
				types.push(type1.id);
				if (type2.exists && type2 !== type1) {
					types.push(type2.id);
				}
				if (type3.exists && type3 !== type1 && type3 !== type2) {
					types.push(type3.id);
				}
			}

			if (types.length === 0) {
				return this.sendReplyBox("" + Chat.escapeHTML(target) + " isn't a recognized type or pokemon.");
			}
			pokemon = {types: types};
			target = types.join("/");
		}

		let weaknesses = [];
		let resistances = [];
		let immunities = [];
		for (let type in Tools.data.TypeChart) {
			let notImmune = Tools.getImmunity(type, pokemon);
			if (notImmune) {
				let typeMod = Tools.getEffectiveness(type, pokemon);
				switch (typeMod) {
				case 1:
					weaknesses.push(type);
					break;
				case 2:
					weaknesses.push("<b>" + type + "</b>");
					break;
				case 3:
					weaknesses.push("<b><i>" + type + "</i></b>");
					break;
				case -1:
					resistances.push(type);
					break;
				case -2:
					resistances.push("<b>" + type + "</b>");
					break;
				case -3:
					resistances.push("<b><i>" + type + "</i></b>");
					break;
				}
			} else {
				immunities.push(type);
			}
		}

		let buffer = [];
		buffer.push(pokemon.exists ? "" + target + ' (ignoring abilities):' : '' + target + ':');
		buffer.push('<span class="message-effect-weak">Weaknesses</span>: ' + (weaknesses.join(', ') || '<font color=#999999>None</font>'));
		buffer.push('<span class="message-effect-resist">Resistances</span>: ' + (resistances.join(', ') || '<font color=#999999>None</font>'));
		buffer.push('<span class="message-effect-immune">Immunities</span>: ' + (immunities.join(', ') || '<font color=#999999>None</font>'));
		this.sendReplyBox(buffer.join('<br />'));
	},
	weaknesshelp: ["/weakness [pokemon] - Provides a Pok\u00e9mon's resistances, weaknesses, and immunities, ignoring abilities.",
		"/weakness [type 1]/[type 2] - Provides a type or type combination's resistances, weaknesses, and immunities, ignoring abilities.",
		"!weakness [pokemon] - Shows everyone a Pok\u00e9mon's resistances, weaknesses, and immunities, ignoring abilities. Requires: + % @ * # & ~",
		"!weakness [type 1]/[type 2] - Shows everyone a type or type combination's resistances, weaknesses, and immunities, ignoring abilities. Requires: + % @ * # & ~"],

	'!effectiveness': true,
	eff: 'effectiveness',
	type: 'effectiveness',
	matchup: 'effectiveness',
	effectiveness: function (target, room, user) {
		let targets = target.split(/[,/]/).slice(0, 2);
		if (targets.length !== 2) return this.errorReply("Attacker and defender must be separated with a comma.");

		let searchMethods = {'getType':1, 'getMove':1, 'getTemplate':1};
		let sourceMethods = {'getType':1, 'getMove':1};
		let targetMethods = {'getType':1, 'getTemplate':1};
		let source, defender, foundData, atkName, defName;

		for (let i = 0; i < 2; ++i) {
			let method;
			for (method in searchMethods) {
				foundData = Tools[method](targets[i]);
				if (foundData.exists) break;
			}
			if (!foundData.exists) return this.parse('/help effectiveness');
			if (!source && method in sourceMethods) {
				if (foundData.type) {
					source = foundData;
					atkName = foundData.name;
				} else {
					source = foundData.id;
					atkName = foundData.id;
				}
				searchMethods = targetMethods;
			} else if (!defender && method in targetMethods) {
				if (foundData.types) {
					defender = foundData;
					defName = foundData.species + " (not counting abilities)";
				} else {
					defender = {types: [foundData.id]};
					defName = foundData.id;
				}
				searchMethods = sourceMethods;
			}
		}

		if (!this.runBroadcast()) return;

		let factor = 0;
		if (Tools.getImmunity(source, defender) || source.ignoreImmunity && (source.ignoreImmunity === true || source.ignoreImmunity[source.type])) {
			let totalTypeMod = 0;
			if (source.effectType !== 'Move' || source.category !== 'Status' && (source.basePower || source.basePowerCallback)) {
				for (let i = 0; i < defender.types.length; i++) {
					let baseMod = Tools.getEffectiveness(source, defender.types[i]);
					let moveMod = source.onEffectiveness && source.onEffectiveness.call(Tools, baseMod, defender.types[i], source);
					totalTypeMod += typeof moveMod === 'number' ? moveMod : baseMod;
				}
			}
			factor = Math.pow(2, totalTypeMod);
		}

		let hasThousandArrows = source.id === 'thousandarrows' && defender.types.includes('Flying');
		let additionalInfo = hasThousandArrows ? "<br />However, Thousand Arrows will be 1x effective on the first hit." : "";

		this.sendReplyBox("" + atkName + " is " + factor + "x effective against " + defName + "." + additionalInfo);
	},
	effectivenesshelp: ["/effectiveness [attack], [defender] - Provides the effectiveness of a move or type on another type or a Pok\u00e9mon.",
		"!effectiveness [attack], [defender] - Shows everyone the effectiveness of a move or type on another type or a Pok\u00e9mon."],

	'!coverage': true,
	cover: 'coverage',
	coverage: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse("/help coverage");

		let targets = target.split(/[,+]/);
		let sources = [];

		let dispTable = false;
		let bestCoverage = {};
		let hasThousandArrows = false;

		for (let type in Tools.data.TypeChart) {
			// This command uses -5 to designate immunity
			bestCoverage[type] = -5;
		}

		for (let i = 0; i < targets.length; i++) {
			let move = targets[i].trim();
			move = move.charAt(0).toUpperCase() + move.slice(1).toLowerCase();
			if (move === 'Table' || move === 'All') {
				if (this.broadcasting) return this.sendReplyBox("The full table cannot be broadcast.");
				dispTable = true;
				continue;
			}

			let eff;
			if (move in Tools.data.TypeChart) {
				sources.push(move);
				for (let type in bestCoverage) {
					if (!Tools.getImmunity(move, type) && !move.ignoreImmunity) continue;
					eff = Tools.getEffectiveness(move, type);
					if (eff > bestCoverage[type]) bestCoverage[type] = eff;
				}
				continue;
			}
			move = Tools.getMove(move);
			if (move.exists) {
				if (!move.basePower && !move.basePowerCallback) continue;
				if (move.id === 'thousandarrows') hasThousandArrows = true;
				sources.push(move);
				for (let type in bestCoverage) {
					if (move.id === "struggle") {
						eff = 0;
					} else {
						if (!Tools.getImmunity(move.type, type) && !move.ignoreImmunity) continue;
						let baseMod = Tools.getEffectiveness(move, type);
						let moveMod = move.onEffectiveness && move.onEffectiveness.call(Tools, baseMod, type, move);
						eff = typeof moveMod === 'number' ? moveMod : baseMod;
					}
					if (eff > bestCoverage[type]) bestCoverage[type] = eff;
				}
				continue;
			}

			return this.errorReply("No type or move '" + targets[i] + "' found.");
		}
		if (sources.length === 0) return this.errorReply("No moves using a type table for determining damage were specified.");
		if (sources.length > 4) return this.errorReply("Specify a maximum of 4 moves or types.");

		// converts to fractional effectiveness, 0 for immune
		for (let type in bestCoverage) {
			if (bestCoverage[type] === -5) {
				bestCoverage[type] = 0;
				continue;
			}
			bestCoverage[type] = Math.pow(2, bestCoverage[type]);
		}

		if (!dispTable) {
			let buffer = [];
			let superEff = [];
			let neutral = [];
			let resists = [];
			let immune = [];

			for (let type in bestCoverage) {
				switch (bestCoverage[type]) {
				case 0:
					immune.push(type);
					break;
				case 0.25:
				case 0.5:
					resists.push(type);
					break;
				case 1:
					neutral.push(type);
					break;
				case 2:
				case 4:
					superEff.push(type);
					break;
				default:
					throw new Error("/coverage effectiveness of " + bestCoverage[type] + " from parameters: " + target);
				}
			}
			buffer.push('Coverage for ' + sources.join(' + ') + ':');
			buffer.push('<b><font color=#559955>Super Effective</font></b>: ' + (superEff.join(', ') || '<font color=#999999>None</font>'));
			buffer.push('<span class="message-effect-resist">Neutral</span>: ' + (neutral.join(', ') || '<font color=#999999>None</font>'));
			buffer.push('<span class="message-effect-weak">Resists</span>: ' + (resists.join(', ') || '<font color=#999999>None</font>'));
			buffer.push('<span class="message-effect-immune">Immunities</span>: ' + (immune.join(', ') || '<font color=#999999>None</font>'));
			return this.sendReplyBox(buffer.join('<br />'));
		} else {
			let buffer = '<div class="scrollable"><table cellpadding="1" width="100%"><tr><th></th>';
			let icon = {};
			for (let type in Tools.data.TypeChart) {
				icon[type] = '<img src="https://play.pokemonshowdown.com/sprites/types/' + type + '.png" width="32" height="14">';
				// row of icons at top
				buffer += '<th>' + icon[type] + '</th>';
			}
			buffer += '</tr>';
			for (let type1 in Tools.data.TypeChart) {
				// assembles the rest of the rows
				buffer += '<tr><th>' + icon[type1] + '</th>';
				for (let type2 in Tools.data.TypeChart) {
					let typing;
					let cell = '<th ';
					let bestEff = -5;
					if (type1 === type2) {
						// when types are the same it's considered pure type
						typing = type1;
						bestEff = bestCoverage[type1];
					} else {
						typing = type1 + "/" + type2;
						for (let i = 0; i < sources.length; i++) {
							let move = sources[i];

							let curEff = 0;
							if ((!Tools.getImmunity((move.type || move), type1) || !Tools.getImmunity((move.type || move), type2)) && !move.ignoreImmunity) continue;
							let baseMod = Tools.getEffectiveness(move, type1);
							let moveMod = move.onEffectiveness && move.onEffectiveness.call(Tools, baseMod, type1, move);
							curEff += typeof moveMod === 'number' ? moveMod : baseMod;
							baseMod = Tools.getEffectiveness(move, type2);
							moveMod = move.onEffectiveness && move.onEffectiveness.call(Tools, baseMod, type2, move);
							curEff += typeof moveMod === 'number' ? moveMod : baseMod;

							if (curEff > bestEff) bestEff = curEff;
						}
						if (bestEff === -5) {
							bestEff = 0;
						} else {
							bestEff = Math.pow(2, bestEff);
						}
					}
					switch (bestEff) {
					case 0:
						cell += 'bgcolor=#666666 title="' + typing + '"><font color=#000000>' + bestEff + '</font>';
						break;
					case 0.25:
					case 0.5:
						cell += 'bgcolor=#AA5544 title="' + typing + '"><font color=#660000>' + bestEff + '</font>';
						break;
					case 1:
						cell += 'bgcolor=#6688AA title="' + typing + '"><font color=#000066>' + bestEff + '</font>';
						break;
					case 2:
					case 4:
						cell += 'bgcolor=#559955 title="' + typing + '"><font color=#003300>' + bestEff + '</font>';
						break;
					default:
						throw new Error("/coverage effectiveness of " + bestEff + " from parameters: " + target);
					}
					cell += '</th>';
					buffer += cell;
				}
			}
			buffer += '</table></div>';

			if (hasThousandArrows) {
				buffer += "<br /><b>Thousand Arrows has neutral type effectiveness on Flying-type Pok\u00e9mon if not already smacked down.";
			}

			this.sendReplyBox('Coverage for ' + sources.join(' + ') + ':<br />' + buffer);
		}
	},
	coveragehelp: ["/coverage [move 1], [move 2] ... - Provides the best effectiveness match-up against all defending types for given moves or attacking types",
		"!coverage [move 1], [move 2] ... - Shows this information to everyone.",
		"Adding the parameter 'all' or 'table' will display the information with a table of all type combinations."],

	'!statcalc': true,
	statcalc: function (target, room, user) {
		if (!target) return this.parse("/help statcalc");
		if (!this.runBroadcast()) return;

		let targets = target.split(' ');

		let lvlSet, natureSet, ivSet, evSet, baseSet, modSet = false;

		let pokemon;
		let useStat = '';

		let level = 100;
		let calcHP = false;
		let nature = 1.0;
		let iv = 31;
		let ev = 252;
		let statValue = -1;
		let modifier = 0;
		let positiveMod = true;

		for (let i = 0; i < targets.length; i++) {
			let lowercase = targets[i].toLowerCase();

			if (!lvlSet) {
				if (lowercase === 'lc') {
					level = 5;
					lvlSet = true;
					continue;
				} else if (lowercase === 'vgc') {
					level = 50;
					lvlSet = true;
					continue;
				} else if (lowercase.startsWith('lv') || lowercase.startsWith('level')) {
					level = parseInt(targets[i].replace(/\D/g, ''));
					lvlSet = true;
					if (level < 1 || level > 9999) {
						return this.sendReplyBox('Invalid value for level: ' + level);
					}
					continue;
				}
			}

			if (!useStat) {
				switch (lowercase) {
				case 'hp':
				case 'hitpoints':
					calcHP = true;
					useStat = 'hp';
					continue;
				case 'atk':
				case 'attack':
					useStat = 'atk';
					continue;
				case 'def':
				case 'defense':
					useStat = 'def';
					continue;
				case 'spa':
					useStat = 'spa';
					continue;
				case 'spd':
				case 'sdef':
					useStat = 'spd';
					continue;
				case 'spe':
				case 'speed':
					useStat = 'spe';
					continue;
				}
			}

			if (!natureSet) {
				if (lowercase === 'boosting' || lowercase === 'positive') {
					nature = 1.1;
					natureSet = true;
					continue;
				} else if (lowercase === 'negative' || lowercase === 'inhibiting') {
					nature = 0.9;
					natureSet = true;
					continue;
				} else if (lowercase === 'neutral') {
					continue;
				}
			}

			if (!ivSet) {
				if (lowercase.endsWith('iv') || lowercase.endsWith('ivs')) {
					iv = parseInt(targets[i]);
					ivSet = true;

					if (isNaN(iv)) {
						return this.sendReplyBox('Invalid value for IVs: ' + Chat.escapeHTML(targets[i]));
					}

					continue;
				}
			}

			if (!evSet) {
				if (lowercase === 'invested' || lowercase === 'max') {
					evSet = true;
					if (lowercase === 'max' && !natureSet) {
						nature = 1.1;
						natureSet = true;
					}
				} else if (lowercase === 'uninvested') {
					ev = 0;
					evSet = true;
				} else if (lowercase.endsWith('ev') || lowercase.endsWith('evs') || lowercase.endsWith('+') || lowercase.endsWith('-')) {
					ev = parseInt(targets[i]);
					evSet = true;

					if (isNaN(ev)) {
						return this.sendReplyBox('Invalid value for EVs: ' + Chat.escapeHTML(targets[i]));
					}
					if (ev > 255 || ev < 0) {
						return this.sendReplyBox('The amount of EVs should be between 0 and 255.');
					}

					if (!natureSet) {
						if (targets[i].includes('+')) {
							nature = 1.1;
							natureSet = true;
						} else if (targets[i].includes('-')) {
							nature = 0.9;
							natureSet = true;
						}
					}

					continue;
				}
			}

			if (!modSet) {
				if (targets[i] === 'scarf' || targets[i] === 'specs' || targets[i] === 'band') {
					modifier = 1;
					modSet = true;
				} else if (targets[i].charAt(0) === '+') {
					modifier = parseInt(targets[i].charAt(1));
					modSet = true;
				} else if (targets[i].charAt(0) === '-') {
					positiveMod = false;
					modifier = parseInt(targets[i].charAt(1));
					modSet = true;
				}
				if (isNaN(modifier)) {
					return this.sendReplyBox('Invalid value for modifier: ' + Chat.escapeHTML(modifier));
				}
				if (modifier > 6) {
					return this.sendReplyBox('Modifier should be a number between -6 and +6');
				}
			}

			if (!pokemon) {
				let testPoke = Tools.getTemplate(targets[i]);
				if (testPoke.baseStats) {
					pokemon = testPoke.baseStats;
					baseSet = true;
					continue;
				}
			}

			let tempStat = parseInt(targets[i]);

			if (!isNaN(tempStat) && !baseSet && tempStat > 0 && tempStat < 256) {
				statValue = tempStat;
				baseSet = true;
			}
		}

		if (pokemon) {
			if (useStat) {
				statValue = pokemon[useStat];
			} else {
				return this.sendReplyBox('No stat found.');
			}
		}

		if (statValue < 0) {
			return this.sendReplyBox('No valid value for base stat found.');
		}

		let output;

		if (calcHP) {
			output = (((iv + (2 * statValue) + (ev / 4) + 100) * level) / 100) + 10;
		} else {
			output = Math.floor(nature * Math.floor((((iv + (2 * statValue) + (ev / 4)) * level) / 100) + 5));
			if (positiveMod) {
				output *= (2 + modifier) / 2;
			} else {
				output *= 2 / (2 + modifier);
			}
		}
		return this.sendReplyBox('Base ' + statValue + (calcHP ? ' HP ' : ' ') + 'at level ' + level + ' with ' + iv + ' IVs, ' + ev + (nature === 1.1 ? '+' : (nature === 0.9 ? '-' : '')) + ' EVs' + (modifier > 0 && !calcHP ? ' at ' + (positiveMod ? '+' : '-') + modifier : '') + ': <b>' + Math.floor(output) + '</b>.');
	},
	statcalchelp: ["/statcalc [level] [base stat] [IVs] [nature] [EVs] [modifier] (only base stat is required) - Calculates what the actual stat of a Pokémon is with the given parameters. For example, '/statcalc lv50 100 30iv positive 252ev scarf' calculates the speed of a base 100 scarfer with HP Ice in Battle Spot, and '/statcalc uninvested 90 neutral' calculates the attack of an uninvested Crobat.",
		"!statcalc [level] [base stat] [IVs] [nature] [EVs] [modifier] (only base stat is required) - Shows this information to everyone.",
		"Inputing 'hp' as an argument makes it use the formula for HP. Instead of giving nature, '+' and '-' can be appended to the EV amount (e.g. 252+ev) to signify a boosting or inhibiting nature."],

	/*********************************************************
	 * Informational commands
	 *********************************************************/

	'!uptime': true,
	uptime: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let uptime = process.uptime();
		let uptimeText;
		if (uptime > 24 * 60 * 60) {
			let uptimeDays = Math.floor(uptime / (24 * 60 * 60));
			uptimeText = uptimeDays + " " + (uptimeDays === 1 ? "day" : "days");
			let uptimeHours = Math.floor(uptime / (60 * 60)) - uptimeDays * 24;
			if (uptimeHours) uptimeText += ", " + uptimeHours + " " + (uptimeHours === 1 ? "hour" : "hours");
		} else {
			uptimeText = Chat.toDurationString(uptime * 1000);
		}
		this.sendReplyBox("Uptime: <b>" + uptimeText + "</b>");
	},

	'!servertime': true,
	servertime: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let servertime = new Date();
		this.sendReplyBox(`Server time: <b>${servertime.toLocaleString()}</b>`);
	},

	'!groups': true,
	groups: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"<b>Room Rank</b><br />" +
			"+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />" +
			"% <b>Driver</b> - The above, and they can mute and warn<br />" +
			"@ <b>Moderator</b> - The above, and they can room ban users<br />" +
			"* <b>Bot</b> - Like Moderator, but makes it clear that this user is a bot<br />" +
			"# <b>Room Owner</b> - They are leaders of the room and can almost totally control it<br /><br />" +
			"<b>Global Rank</b><br />" +
			"+ <b>Global Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />" +
			"% <b>Global Driver</b> - The above, and they can also lock users and check for alts<br />" +
			"@ <b>Global Moderator</b> - The above, and they can globally ban users<br />" +
			"* <b>Global Bot</b> - Like Moderator, but makes it clear that this user is a bot<br />" +
			"&amp; <b>Global Leader</b> - The above, and they can promote to global moderator and force ties<br />" +
			"~ <b>Global Administrator</b> -  They can do anything, like change what this message says"
		);
	},
	groupshelp: ["/groups - Explains what the symbols (like % and @) before people's names mean.",
		"!groups - Shows everyone that information. Requires: + % @ * # & ~"],

	'!opensource': true,
	repo: 'opensource',
	repository: 'opensource',
	git: 'opensource',
	opensource: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"Pok&eacute;mon Showdown is open source:<br />" +
			"- Language: JavaScript (Node.js)<br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown/commits/master\">What's new?</a><br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown\">Server source code</a><br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown-Client\">Client source code</a><br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown-Dex\">Dex source code</a>"
		);
	},
	opensourcehelp: ["/opensource - Links to PS's source code repository.",
		"!opensource - Show everyone that information. Requires: + % @ * # & ~"],

	'!staff': true,
	staff: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://www.smogon.com/sim/staff_list\">Pok&eacute;mon Showdown Staff List</a>");
	},

	'!forums': true,
	forums: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://www.smogon.com/forums/forums/pok%C3%A9mon-showdown.209\">Pok&eacute;mon Showdown Forums</a>");
	},

	'!suggestions': true,
	suggestions: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://www.smogon.com/forums/threads/3534365/\">Make a suggestion for Pok&eacute;mon Showdown</a>");
	},

	'!bugs': true,
	bugreport: 'bugs',
	bugs: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (room && room.battle) {
			this.sendReplyBox("<center><button name=\"saveReplay\"><i class=\"fa fa-upload\"></i> Save Replay</button> &mdash; <a href=\"https://www.smogon.com/forums/threads/3520646/\">Questions</a> &mdash; <a href=\"https://www.smogon.com/forums/threads/3469932/\">Bug Reports</a></center>");
		} else {
			this.sendReplyBox(
				"Have a replay showcasing a bug on Pok&eacute;mon Showdown?<br />" +
				"- <a href=\"https://www.smogon.com/forums/threads/3520646/\">Questions</a><br />" +
				"- <a href=\"https://www.smogon.com/forums/threads/3469932/\">Bug Reports</a>"
			);
		}
	},

	'!avatars': true,
	avatars: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("You can <button name=\"avatars\">change your avatar</button> by clicking on it in the <button name=\"openOptions\"><i class=\"fa fa-cog\"></i> Options</button> menu in the upper right. Custom avatars are only obtainable by staff.");
	},
	avatarshelp: ["/avatars - Explains how to change avatars.",
		"!avatars - Show everyone that information. Requires: + % @ * # & ~"],

	'!optionsbutton': true,
	optionbutton: 'optionsbutton',
	optionsbutton: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(`<button name="openOptions" class="button"><i style="font-size: 16px; vertical-align: -1px" class="fa fa-cog"></i> Options</button> (The Sound and Options buttons are at the top right, next to your username)`);
	},
	'!soundbutton': true,
	soundsbutton: 'soundbutton',
	volumebutton: 'soundbutton',
	soundbutton: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(`<button name="openSounds" class="button"><i style="font-size: 16px; vertical-align: -1px" class="fa fa-volume-up"></i> Sound</button> (The Sound and Options buttons are at the top right, next to your username)`);
	},

	'!intro': true,
	introduction: 'intro',
	intro: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"New to competitive Pok&eacute;mon?<br />" +
			"- <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6774481\">Beginner's Guide to Pok&eacute;mon Showdown</a><br />" +
			"- <a href=\"https://www.smogon.com/dp/articles/intro_comp_pokemon\">An introduction to competitive Pok&eacute;mon</a><br />" +
			"- <a href=\"https://www.smogon.com/bw/articles/bw_tiers\">What do 'OU', 'UU', etc mean?</a><br />" +
			"- <a href=\"https://www.smogon.com/xyhub/tiers\">What are the rules for each format? What is 'Sleep Clause'?</a>"
		);
	},
	introhelp: ["/intro - Provides an introduction to competitive Pok\u00e9mon.",
		"!intro - Show everyone that information. Requires: + % @ * # & ~"],

	'!smogintro': true,
	mentoring: 'smogintro',
	smogonintro: 'smogintro',
	smogintro: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"Welcome to Smogon's official simulator! The <a href=\"https://www.smogon.com/forums/forums/264\">Smogon Info / Intro Hub</a> can help you get integrated into the community.<br />" +
			"- <a href=\"https://www.smogon.com/forums/threads/3526346\">Useful Smogon Info</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/threads/3498332\">Tiering FAQ</a><br />"
		);
	},

	'!calc': true,
	calculator: 'calc',
	calc: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"Pok&eacute;mon Showdown! damage calculator. (Courtesy of Honko)<br />" +
			"- <a href=\"https://pokemonshowdown.com/damagecalc/\">Damage Calculator</a>"
		);
	},
	calchelp: ["/calc - Provides a link to a damage calculator",
		"!calc - Shows everyone a link to a damage calculator. Requires: + % @ * # & ~"],

	'!cap': true,
	capintro: 'cap',
	cap: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"An introduction to the Create-A-Pok&eacute;mon project:<br />" +
			"- <a href=\"https://www.smogon.com/cap/\">CAP project website and description</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/threads/48782/\">What Pok&eacute;mon have been made?</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/forums/311\">Talk about the metagame here</a><br />" +
			"- <a href=\"https://www.smogon.com/forums/threads/3512318/\">Sample XY CAP teams</a>"
		);
	},
	caphelp: ["/cap - Provides an introduction to the Create-A-Pok&eacute;mon project.",
		"!cap - Show everyone that information. Requires: + % @ * # & ~"],

	'!gennext': true,
	gennext: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"NEXT (also called Gen-NEXT) is a mod that makes changes to the game:<br />" +
			"- <a href=\"https://github.com/Zarel/Pokemon-Showdown/blob/master/mods/gennext/README.md\">README: overview of NEXT</a><br />" +
			"Example replays:<br />" +
			"- <a href=\"https://replay.pokemonshowdown.com/gennextou-120689854\">Zergo vs Mr Weegle Snarf</a><br />" +
			"- <a href=\"https://replay.pokemonshowdown.com/gennextou-130756055\">NickMP vs Khalogie</a>"
		);
	},

	'!othermetas': true,
	om: 'othermetas',
	othermetas: function (target, room, user) {
		if (!this.runBroadcast()) return;
		target = toId(target);
		let buffer = "";

		if (target === 'all' && this.broadcasting) {
			return this.sendReplyBox("You cannot broadcast information about all Other Metagames at once.");
		}

		if (!target || target === 'all') {
			buffer += "- <a href=\"https://www.smogon.com/forums/forums/other-metagames.394/\">Other Metagames Forum</a><br />";
			buffer += "- <a href=\"https://www.smogon.com/forums/forums/om-analyses.416/\">Other Metagames Analyses</a><br />";
			if (!target) return this.sendReplyBox(buffer);
		}
		let showMonthly = (target === 'all' || target === 'omofthemonth' || target === 'omotm' || target === 'month');

		if (target === 'all') {
			// Display OMotM formats, with forum thread links as caption
			this.parse('/formathelp omofthemonth');

			// Display the rest of OM formats, with OM hub/index forum links as caption
			this.parse('/formathelp othermetagames');
			return this.sendReply('|raw|<center>' + buffer + '</center>');
		}
		if (showMonthly) {
			this.target = 'omofthemonth';
			this.run('formathelp');
		} else {
			this.run('formathelp');
		}
	},
	othermetashelp: ["/om - Provides links to information on the Other Metagames.",
		"!om - Show everyone that information. Requires: + % @ * # & ~"],

	'!formathelp': true,
	banlists: 'formathelp',
	tier: 'formathelp',
	tiers: 'formathelp',
	formats: 'formathelp',
	tiershelp: 'formathelp',
	formatshelp: 'formathelp',
	formathelp: function (target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;
		if (!target) {
			return this.sendReplyBox(
				"- <a href=\"https://www.smogon.com/tiers/\">Smogon Tiers</a><br />" +
				"- <a href=\"https://www.smogon.com/forums/threads/3498332/\">Tiering FAQ</a><br />" +
				"- <a href=\"https://www.smogon.com/xyhub/tiers\">The banlists for each tier</a><br />" +
				"<br /><em>Type /formatshelp <strong>[format|section]</strong> to get details about an available format or group of formats.</em>"
			);
		}

		const isOMSearch = (cmd === 'om' || cmd === 'othermetas');

		let targetId = toId(target);
		if (targetId === 'ladder') targetId = 'search';
		if (targetId === 'all') targetId = '';

		let formatList;
		let format = Tools.getFormat(targetId);
		if (format.effectType === 'Format') formatList = [targetId];
		if (!formatList) {
			formatList = Object.keys(Tools.data.Formats).filter(formatid => Tools.data.Formats[formatid].effectType === 'Format');
		}

		// Filter formats and group by section
		let exactMatch = '';
		let sections = {};
		let totalMatches = 0;
		for (let i = 0; i < formatList.length; i++) {
			let format = Tools.getFormat(formatList[i]);
			let sectionId = toId(format.section);
			let formatId = format.id;
			if (!/^gen\d+/.test(targetId)) formatId = formatId.replace(/^gen\d+/, ''); // skip generation prefix if it wasn't provided
			if (targetId && !format[targetId + 'Show'] && sectionId !== targetId && format.id === formatList[i] && !formatId.startsWith(targetId)) continue;
			if (isOMSearch && format.id.startsWith('gen') && ['ou', 'uu', 'ru', 'ubers', 'lc', 'customgame', 'doublescustomgame', 'gbusingles', 'gbudoubles'].includes(format.id.slice(4))) continue;
			if (isOMSearch && (format.id === 'gen5nu')) continue;
			totalMatches++;
			if (!sections[sectionId]) sections[sectionId] = {name: format.section, formats: []};
			sections[sectionId].formats.push(format.id);
			if (format.id !== targetId) continue;
			exactMatch = sectionId;
			break;
		}

		if (!totalMatches) return this.errorReply("No " + (target ? "matched " : "") + "formats found.");
		if (totalMatches === 1) {
			let format = Tools.getFormat(Object.values(sections)[0].formats[0]);
			let formatType = (format.gameType || "singles");
			formatType = formatType.charAt(0).toUpperCase() + formatType.slice(1).toLowerCase();
			if (!format.desc) return this.sendReplyBox("No description found for this " + formatType + " " + format.section + " format.");
			return this.sendReplyBox(format.desc.join("<br />"));
		}

		let tableStyle = `border:1px solid gray; border-collapse:collapse`;

		if (this.broadcasting) {
			tableStyle += `; display:inline-block; max-height:240px;" class="scrollable`;
		}

		// Build tables
		let buf = [`<table style="${tableStyle}" cellspacing="0" cellpadding="5">`];
		for (let sectionId in sections) {
			if (exactMatch && sectionId !== exactMatch) continue;
			buf.push(Chat.html`<th style="border:1px solid gray" colspan="2">${sections[sectionId].name}</th>`);
			for (let i = 0; i < sections[sectionId].formats.length; i++) {
				let format = Tools.getFormat(sections[sectionId].formats[i]);
				let nameHTML = Chat.escapeHTML(format.name);
				let descHTML = format.desc ? format.desc.join("<br />") : "&mdash;";
				buf.push(`<tr><td style="border:1px solid gray">${nameHTML}</td><td style="border: 1px solid gray; margin-left:10px">${descHTML}</td></tr>`);
			}
		}
		buf.push(`</table>`);
		return this.sendReply("|raw|" + buf.join("") + "");
	},

	'!roomhelp': true,
	roomhelp: function (target, room, user) {
		if (!this.canBroadcast('!htmlbox')) return;
		if (this.broadcastMessage && !this.can('declare', null, room)) return false;

		if (!this.runBroadcast('!htmlbox')) return;
		this.sendReplyBox(
			"<strong>Room drivers (%)</strong> can use:<br />" +
			"- /warn OR /k <em>username</em>: warn a user and show the Pok&eacute;mon Showdown rules<br />" +
			"- /mute OR /m <em>username</em>: 7 minute mute<br />" +
			"- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
			"- /unmute <em>username</em>: unmute<br />" +
			"- /announce OR /wall <em>message</em>: make an announcement<br />" +
			"- /modlog <em>username</em>: search the moderator log of the room<br />" +
			"- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
			"<br />" +
			"<strong>Room moderators (@)</strong> can also use:<br />" +
			"- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
			"- /roomunban <em>username</em>: unbans user from the room<br />" +
			"- /roomvoice <em>username</em>: appoint a room voice<br />" +
			"- /roomdevoice <em>username</em>: remove a room voice<br />" +
			"- /staffintro <em>intro</em>: sets the staff introduction that will be displayed for all staff joining the room<br />" +
			"- /roomsettings: change a variety of room settings, namely modchat<br />" +
			"<br />" +
			"<strong>Room owners (#)</strong> can also use:<br />" +
			"- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
			"- /rules <em>rules link</em>: set the room rules link seen when using /rules<br />" +
			"- /roommod, /roomdriver <em>username</em>: appoint a room moderator/driver<br />" +
			"- /roomdemod, /roomdedriver <em>username</em>: remove a room moderator/driver<br />" +
			"- /roomdeauth <em>username</em>: remove all room auth from a user<br />" +
			"- /declare <em>message</em>: make a large blue declaration to the room<br />" +
			"- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
			"- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
			"- /roomsettings: change a variety of room settings, including modchat, capsfilter, etc<br />" +
			"<br />" +
			"More detailed help can be found in the <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6774654\">roomauth guide</a><br />" +
			"<br />" +
			"Tournament Help:<br />" +
			"- /tour create <em>format</em>, elimination: Creates a new single elimination tournament in the current room.<br />" +
			"- /tour create <em>format</em>, roundrobin: Creates a new round robin tournament in the current room.<br />" +
			"- /tour end: Forcibly ends the tournament in the current room<br />" +
			"- /tour start: Starts the tournament in the current room<br />" +
			"- /tour banlist [pokemon], [talent], [...]: Bans moves, abilities, Pokémon or items from being used in a tournament (it must be created first)<br />" +
			"<br />" +
			"More detailed help can be found in the <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6777489\">tournaments guide</a><br />" +
			"</div>"
		);
	},

	'!restarthelp': true,
	restarthelp: function (target, room, user) {
		if (!Rooms.global.lockdown && !this.can('lockdown')) return false;
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"The server is restarting. Things to know:<br />" +
			"- We wait a few minutes before restarting so people can finish up their battles<br />" +
			"- The restart itself will take around 0.6 seconds<br />" +
			"- Your ladder ranking and teams will not change<br />" +
			"- We are restarting to update Pok&eacute;mon Showdown to a newer version"
		);
	},

	'!processes': true,
	processes: function (target, room, user) {
		if (!this.can('lockdown')) return false;
		let buf = "<strong>" + process.pid + "</strong> - Main<br />";
		for (let i in Sockets.workers) {
			let worker = Sockets.workers[i];
			buf += "<strong>" + (worker.pid || worker.process.pid) + "</strong> - Sockets " + i + "<br />";
		}

		const ProcessManager = require('../process-manager');
		for (let managerData of ProcessManager.cache) {
			let i = 0;
			let processType = path.basename(managerData[1]);
			for (let process of managerData[0].processes) {
				buf += "<strong>" + process.process.pid + "</strong> - " + processType + " " + (i++) + "<br />";
			}
		}
		this.sendReplyBox(buf);
	},

	'!rules': true,
	rule: 'rules',
	rules: function (target, room, user) {
		if (!target) {
			if (!this.runBroadcast()) return;
			this.sendReplyBox("Please follow the rules:<br />" +
				(room && room.rulesLink ? "- <a href=\"" + Chat.escapeHTML(room.rulesLink) + "\">" + Chat.escapeHTML(room.title) + " room rules</a><br />" : "") +
				"- <a href=\"https://pokemonshowdown.com/rules\">" + (room && room.rulesLink ? "Global rules" : "Rules") + "</a>");
			return;
		}
		if (!room) {
			this.errorReply("This is not a room you can set the rules of.");
		}
		if (!this.can('editroom', null, room)) return;
		if (target.length > 100) {
			return this.errorReply("Error: Room rules link is too long (must be under 100 characters). You can use a URL shortener to shorten the link.");
		}

		room.rulesLink = target.trim();
		this.privateModCommand(`(${user.name} changed the room rules link to: ${target})`);

		if (room.chatRoomData) {
			room.chatRoomData.rulesLink = room.rulesLink;
			Rooms.global.writeChatRoomData();
		}
	},
	ruleshelp: ["/rules - Show links to room rules and global rules.",
		"!rules - Show everyone links to room rules and global rules. Requires: + % @ * # & ~",
		"/rules [url] - Change the room rules URL. Requires: # & ~"],

	'!faq': true,
	faq: function (target, room, user) {
		if (!this.runBroadcast()) return;
		target = target.toLowerCase();
		let showAll = target === 'all';
		if (showAll && this.broadcasting) {
			return this.sendReplyBox("You cannot broadcast all FAQs at once.");
		}

		let buffer = [];
		if (showAll || target === 'staff') {
			buffer.push("<a href=\"https://www.smogon.com/forums/threads/3570628/#post-6774482\">Staff FAQ</a>");
		}
		if (showAll || target === 'autoconfirmed' || target === 'ac') {
			buffer.push("A user is autoconfirmed when they have won at least one rated battle and have been registered for one week or longer.");
		}
		if (showAll || target === 'coil') {
			buffer.push("<a href=\"https://www.smogon.com/forums/threads/3508013/\">What is COIL?</a>");
		}
		if (showAll || target === 'tiering' || target === 'tiers' || target === 'tier') {
			buffer.push("<a href=\"https://www.smogon.com/ingame/battle/tiering-faq\">Tiering FAQ</a>");
		}
		if (showAll || !buffer.length) {
			buffer.unshift("<a href=\"https://www.smogon.com/forums/threads/3570628/#post-6774128\">Frequently Asked Questions</a>");
		}
		this.sendReplyBox(buffer.join("<br />"));
	},
	faqhelp: ["/faq [theme] - Provides a link to the FAQ. Add deviation, doubles, randomcap, restart, or staff for a link to these questions. Add all for all of them.",
		"!faq [theme] - Shows everyone a link to the FAQ. Add deviation, doubles, randomcap, restart, or staff for a link to these questions. Add all for all of them. Requires: + % @ * # & ~"],

	'!smogdex': true,
	analysis: 'smogdex',
	strategy: 'smogdex',
	smogdex: function (target, room, user) {
		if (!this.runBroadcast()) return;

		let targets = target.split(',');
		let pokemon = Tools.getTemplate(targets[0]);
		let item = Tools.getItem(targets[0]);
		let move = Tools.getMove(targets[0]);
		let ability = Tools.getAbility(targets[0]);
		let format = Tools.getFormat(targets[0]);
		let atLeastOne = false;
		let generation = (targets[1] || 'xy').trim().toLowerCase();
		let genNumber = 6;
		let extraFormat = Tools.getFormat(targets[2]);

		if (generation === 'xy' || generation === 'oras' || generation === '6' || generation === 'six') {
			generation = 'xy';
		} else if (generation === 'bw' || generation === 'bw2' || generation === '5' || generation === 'five') {
			generation = 'bw';
			genNumber = 5;
		} else if (generation === 'dp' || generation === 'dpp' || generation === '4' || generation === 'four') {
			generation = 'dp';
			genNumber = 4;
		} else if (generation === 'adv' || generation === 'rse' || generation === 'rs' || generation === '3' || generation === 'three') {
			generation = 'rs';
			genNumber = 3;
		} else if (generation === 'gsc' || generation === 'gs' || generation === '2' || generation === 'two') {
			generation = 'gs';
			genNumber = 2;
		} else if (generation === 'rby' || generation === 'rb' || generation === '1' || generation === 'one') {
			generation = 'rb';
			genNumber = 1;
		} else {
			generation = 'xy';
		}

		// Pokemon
		if (pokemon.exists) {
			atLeastOne = true;
			if (genNumber < pokemon.gen) {
				return this.sendReplyBox("" + pokemon.name + " did not exist in " + generation.toUpperCase() + "!");
			}
			if (pokemon.tier === 'CAP') {
				generation = 'cap';
				this.errorReply("CAP is not currently supported by Smogon Strategic Pokedex.");
			}

			if (pokemon.battleOnly || pokemon.baseSpecies === 'Keldeo' || pokemon.baseSpecies === 'Genesect') {
				pokemon = Tools.getTemplate(pokemon.baseSpecies);
			}

			let formatName = extraFormat.name;
			let formatId = extraFormat.id;
			if (formatId === 'doublesou') {
				formatId = 'doubles';
			} else if (formatId === 'balancedhackmons') {
				formatId = 'bh';
			} else if (formatId === 'battlespotsingles') {
				formatId = 'battle_spot_singles';
			} else if (formatId.includes('vgc')) {
				formatId = 'vgc' + formatId.slice(-2);
				formatName = 'VGC20' + formatId.slice(-2);
			} else if (extraFormat.effectType !== 'Format') {
				formatName = formatId = '';
			}
			let speciesid = pokemon.speciesid;
			// Special case for Meowstic-M and Hoopa-Unbound
			if (speciesid === 'meowstic') speciesid = 'meowsticm';
			if (pokemon.tier === 'CAP') {
				this.sendReplyBox("<a href=\"https://www.smogon.com/cap/pokemon/strategies/" + speciesid + "\">" + generation.toUpperCase() + " " + Chat.escapeHTML(formatName) + " " + pokemon.name + " analysis preview</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a> <a href=\"https://smogon.com/cap/\">CAP Project</a>");
			} else {
				this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/pokemon/" + speciesid + (formatId ? '/' + formatId : '') + "\">" + generation.toUpperCase() + " " + Chat.escapeHTML(formatName) + " " + pokemon.name + " analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
			}
		}

		// Item
		if (item.exists && genNumber > 1 && item.gen <= genNumber) {
			atLeastOne = true;
			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/items/" + item.id + "\">" + generation.toUpperCase() + " " + item.name + " item analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		// Ability
		if (ability.exists && genNumber > 2 && ability.gen <= genNumber) {
			atLeastOne = true;
			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/abilities/" + ability.id + "\">" + generation.toUpperCase() + " " + ability.name + " ability analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		// Move
		if (move.exists && move.gen <= genNumber) {
			atLeastOne = true;
			this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/moves/" + toId(move.name) + "\">" + generation.toUpperCase() + " " + move.name + " move analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
		}

		// Format
		if (format.id) {
			let formatName = format.name;
			let formatId = format.id;
			if (formatId === 'doublesou') {
				formatId = 'doubles';
			} else if (formatId === 'balancedhackmons') {
				formatId = 'bh';
			} else if (formatId.includes('vgc')) {
				formatId = 'vgc' + formatId.slice(-2);
				formatName = 'VGC20' + formatId.slice(-2);
			} else if (format.effectType !== 'Format') {
				formatName = formatId = '';
			}
			if (formatName) {
				atLeastOne = true;
				this.sendReplyBox("<a href=\"https://www.smogon.com/dex/" + generation + "/formats/" + formatId + "\">" + generation.toUpperCase() + " " + Chat.escapeHTML(formatName) + " format analysis</a>, brought to you by <a href=\"https://www.smogon.com\">Smogon University</a>");
			}
		}

		if (!atLeastOne) {
			return this.sendReplyBox("Pok&eacute;mon, item, move, ability, or format not found for generation " + generation.toUpperCase() + ".");
		}
	},
	smogdexhelp: ["/analysis [pokemon], [generation], [format] - Links to the Smogon University analysis for this Pok\u00e9mon in the given generation.",
		"!analysis [pokemon], [generation], [format] - Shows everyone this link. Requires: + % @ * # & ~"],

	'!veekun': true,
	veekun: function (target, broadcast, user) {
		if (!this.runBroadcast()) return;

		let baseLink = 'http://veekun.com/dex/';

		let pokemon = Tools.getTemplate(target);
		let item = Tools.getItem(target);
		let move = Tools.getMove(target);
		let ability = Tools.getAbility(target);
		let nature = Tools.getNature(target);
		let atLeastOne = false;

		// Pokemon
		if (pokemon.exists) {
			atLeastOne = true;
			if (pokemon.isNonstandard) return this.errorReply(pokemon.species + ' is not a real Pok\u00e9mon.');

			let baseSpecies = pokemon.baseSpecies || pokemon.species;
			let forme = pokemon.forme;

			// Showdown and Veekun have different naming for this gender difference forme of Meowstic.
			if (baseSpecies === 'Meowstic' && forme === 'F') {
				forme = 'Female';
			}

			let link = baseLink + 'pokemon/' + baseSpecies.toLowerCase();
			if (forme) {
				link += '?form=' + forme.toLowerCase();
			}

			this.sendReplyBox("<a href=\"" + link + "\">" + pokemon.species + " description</a> by Veekun");
		}

		// Item
		if (item.exists) {
			atLeastOne = true;
			let link = baseLink + 'items/' + item.name.toLowerCase();
			this.sendReplyBox("<a href=\"" + link + "\">" + item.name + " item description</a> by Veekun");
		}

		// Ability
		if (ability.exists) {
			atLeastOne = true;
			if (ability.isNonstandard) return this.sendReply(ability.name + ' is not a real ability.');
			let link = baseLink + 'abilities/' + ability.name.toLowerCase();
			this.sendReplyBox("<a href=\"" + link + "\">" + ability.name + " ability description</a> by Veekun");
		}

		// Move
		if (move.exists) {
			atLeastOne = true;
			if (move.isNonstandard) return this.errorReply(move.name + ' is not a real move.');
			let link = baseLink + 'moves/' + move.name.toLowerCase();
			this.sendReplyBox("<a href=\"" + link + "\">" + move.name + " move description</a> by Veekun");
		}

		// Nature
		if (nature.exists) {
			atLeastOne = true;
			let link = baseLink + 'natures/' + nature.name.toLowerCase();
			this.sendReplyBox("<a href=\"" + link + "\">" + nature.name + " nature description</a> by Veekun");
		}

		if (!atLeastOne) {
			return this.sendReplyBox("Pok&eacute;mon, item, move, ability, or nature not found.");
		}
	},
	veekunhelp: ["/veekun [pokemon] - Links to Veekun website for this pokemon/item/move/ability/nature.",
		"!veekun [pokemon] - Shows everyone this link. Requires: + % @ * # & ~"],

	'!register': true,
	register: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('You will be prompted to register upon winning a rated battle. Alternatively, there is a register button in the <button name="openOptions"><i class="fa fa-cog"></i> Options</button> menu in the upper right.');
	},

	/*********************************************************
	 * Miscellaneous commands
	 *********************************************************/

	potd: function (target, room, user) {
		if (!this.can('potd')) return false;

		Config.potd = target;
		Rooms.SimulatorProcess.eval('Config.potd = \'' + toId(target) + '\'');
		if (target) {
			if (Rooms.lobby) Rooms.lobby.addRaw("<div class=\"broadcast-blue\"><b>The Pok&eacute;mon of the Day is now " + target + "!</b><br />This Pokemon will be guaranteed to show up in random battles.</div>");
			this.logModCommand("The Pok\u00e9mon of the Day was changed to " + target + " by " + user.name + ".");
		} else {
			if (Rooms.lobby) Rooms.lobby.addRaw("<div class=\"broadcast-blue\"><b>The Pok&eacute;mon of the Day was removed!</b><br />No pokemon will be guaranteed in random battles.</div>");
			this.logModCommand("The Pok\u00e9mon of the Day was removed by " + user.name + ".");
		}
	},

	'!dice': true,
	roll: 'dice',
	dice: function (target, room, user) {
		if (!target || target.match(/[^d\d\s\-\+HL]/i)) return this.parse('/help dice');
		if (!this.runBroadcast()) return;

		// ~30 is widely regarded as the sample size required for sum to be a Gaussian distribution.
		// This also sets a computation time constraint for safety.
		let maxDice = 40;

		let diceQuantity = 1;
		let diceDataStart = target.indexOf('d');
		if (diceDataStart >= 0) {
			if (diceDataStart) diceQuantity = Number(target.slice(0, diceDataStart));
			target = target.slice(diceDataStart + 1);
			if (!Number.isInteger(diceQuantity) || diceQuantity <= 0 || diceQuantity > maxDice) return this.sendReply("The amount of dice rolled should be a natural number up to " + maxDice + ".");
		}
		let offset = 0;
		let removeOutlier = 0;

		let modifierData = target.match(/[\-\+]/);
		if (modifierData) {
			switch (target.slice(modifierData.index).trim().toLowerCase()) {
			case '-l':
				removeOutlier = -1;
				break;
			case '-h':
				removeOutlier = +1;
				break;
			default:
				offset = Number(target.slice(modifierData.index));
				if (isNaN(offset)) return this.parse('/help dice');
				if (!Number.isSafeInteger(offset)) return this.errorReply("The specified offset must be an integer up to " + Number.MAX_SAFE_INTEGER + ".");
			}
			if (removeOutlier && diceQuantity <= 1) return this.errorReply("More than one dice should be rolled before removing outliers.");
			target = target.slice(0, modifierData.index);
		}

		let diceFaces = 6;
		if (target.length) {
			diceFaces = Number(target);
			if (!Number.isSafeInteger(diceFaces) || diceFaces <= 0) {
				return this.errorReply("Rolled dice must have a natural amount of faces up to " + Number.MAX_SAFE_INTEGER + ".");
			}
		}

		if (diceQuantity > 1) {
			// Make sure that we can deal with high rolls
			if (!Number.isSafeInteger(offset < 0 ? diceQuantity * diceFaces : diceQuantity * diceFaces + offset)) {
				return this.errorReply("The maximum sum of rolled dice must be lower or equal than " + Number.MAX_SAFE_INTEGER + ".");
			}
		}

		let maxRoll = 0;
		let minRoll = Number.MAX_SAFE_INTEGER;

		let trackRolls = diceQuantity * (('' + diceFaces).length + 1) <= 60;
		let rolls = [];
		let rollSum = 0;

		for (let i = 0; i < diceQuantity; ++i) {
			let curRoll = Math.floor(Math.random() * diceFaces) + 1;
			rollSum += curRoll;
			if (curRoll > maxRoll) maxRoll = curRoll;
			if (curRoll < minRoll) minRoll = curRoll;
			if (trackRolls) rolls.push(curRoll);
		}

		// Apply modifiers

		if (removeOutlier > 0) {
			rollSum -= maxRoll;
		} else if (removeOutlier < 0) {
			rollSum -= minRoll;
		}
		if (offset) rollSum += offset;

		// Reply with relevant information

		let offsetFragment = "";
		if (offset) offsetFragment += (offset > 0 ? "+" + offset : offset);

		if (diceQuantity === 1) return this.sendReplyBox("Roll (1 - " + diceFaces + ")" + offsetFragment + ": " + rollSum);

		let sumFragment = "<br />Sum" + offsetFragment + (removeOutlier ? " except " + (removeOutlier > 0 ? "highest" : "lowest") : "");
		return this.sendReplyBox("" + diceQuantity + " rolls (1 - " + diceFaces + ")" + (trackRolls ? ": " + rolls.join(", ") : "") + sumFragment + ": " + rollSum);
	},
	dicehelp: ["/dice [max number] - Randomly picks a number between 1 and the number you choose.",
		"/dice [number of dice]d[number of sides] - Simulates rolling a number of dice, e.g., /dice 2d4 simulates rolling two 4-sided dice.",
		"/dice [number of dice]d[number of sides][+/-][offset] - Simulates rolling a number of dice and adding an offset to the sum, e.g., /dice 2d6+10: two standard dice are rolled; the result lies between 12 and 22.",
		"/dice [number of dice]d[number of sides]-[H/L] - Simulates rolling a number of dice with removal of extreme values, e.g., /dice 3d8-L: rolls three 8-sided dice; the result ignores the lowest value."],

	'!pickrandom': true,
	pr: 'pickrandom',
	pick: 'pickrandom',
	pickrandom: function (target, room, user) {
		let options = target.split(',');
		if (options.length < 2) return this.parse('/help pick');
		if (!this.runBroadcast()) return false;
		const pickedOption = options[Math.floor(Math.random() * options.length)];
		return this.sendReplyBox('<em>We randomly picked:</em> ' + Chat.escapeHTML(pickedOption).trim());
	},
	pickrandomhelp: ["/pick [option], [option], ... - Randomly selects an item from a list containing 2 or more elements."],

	showimage: function (target, room, user) {
		if (!target) return this.parse('/help showimage');
		if (!this.can('declare', null, room)) return false;
		if (!this.runBroadcast()) return;
		if (this.room.isPersonal && !this.user.can('announce')) {
			return this.errorReply("Images are not allowed in personal rooms.");
		}

		let targets = target.split(',');
		if (targets.length !== 3) {
			// Width and height are required because most browsers insert the
			// <img> element before width and height are known, and when the
			// image is loaded, this changes the height of the chat area, which
			// messes up autoscrolling.
			return this.parse('/help showimage');
		}

		let image = targets[0].trim();
		if (!image) return this.errorReply('No image URL was provided!');
		image = this.canEmbedURI(image);

		if (!image) return false;

		let width = targets[1].trim();
		if (!width) return this.errorReply('No width for the image was provided!');
		if (!isNaN(width)) width += 'px';

		let height = targets[2].trim();
		if (!height) return this.errorReply('No height for the image was provided!');
		if (!isNaN(height)) height += 'px';

		let unitRegex = /^\d+(?:p[xtc]|%|[ecm]m|ex|in)$/;
		if (!unitRegex.test(width)) {
			return this.errorReply('"' + width + '" is not a valid width value!');
		}
		if (!unitRegex.test(height)) {
			return this.errorReply('"' + height + '" is not a valid height value!');
		}

		this.sendReply('|raw|<img src="' + Chat.escapeHTML(image) + '" ' + 'style="width: ' + Chat.escapeHTML(width) + '; height: ' + Chat.escapeHTML(height) + '" />');
	},
	showimagehelp: ["/showimage [url], [width], [height] - Show an image. " +
		"Any CSS units may be used for the width or height (default: px)." +
		"Requires: # & ~"],

	htmlbox: function (target, room, user, connection, cmd, message) {
		if (!target) return this.parse('/help htmlbox');
		target = this.canHTML(target);
		if (!target) return;

		if (!this.canBroadcast('!htmlbox')) return;
		if (this.broadcastMessage && !this.can('declare', null, room)) return false;

		if (!this.runBroadcast('!htmlbox')) return;

		this.sendReplyBox(target);
	},
	addhtmlbox: function (target, room, user, connection, cmd, message) {
		if (!target) return this.parse('/help htmlbox');
		if (!this.canTalk()) return;
		target = this.canHTML(target);
		if (!target) return;
		if (!this.can('addhtml', null, room)) return;

		if (!user.can('addhtml')) {
			target += '<div style="float:right;color:#888;font-size:8pt">[' + Chat.escapeHTML(user.name) + ']</div><div style="clear:both"></div>';
		}

		this.addBox(target);
	},
	htmlboxhelp: [
		"/htmlbox [message] - Displays a message, parsing HTML code contained.",
		"!htmlbox [message] - Shows everyone a message, parsing HTML code contained. Requires: ~ & #",
	],
};

process.nextTick(() => {
	Tools.includeData();
});
