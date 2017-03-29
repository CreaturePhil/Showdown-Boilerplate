// Other Metas plugin by Spandan
'use strict';

exports.commands = {
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

	ce: "crossevolve",
	crossevo: "crossevolve",
	crossevolve: function(target, user, room)
	{
		if (!this.runBroadcast()) return;
		if (!target || !target.includes(',')) return this.parse('/help crossevo')
		let pokes = target.split(",");
		if (!Tools.data.Pokedex[toId(pokes[0])] || !Tools.data.Pokedex[toId(pokes[1])]) {
			return this.errorReply('Error: Pokemon not found.')
		}
		let template = Object.assign({}, Tools.getTemplate(pokes[0])), crossTemplate = Object.assign({}, Tools.getTemplate(pokes[1]));
		let prevo = Tools.getTemplate(crossTemplate.prevo);
		let mixedTemplate = Object.assign({}, template);
		if (!template.evos || !template.evos.length) {
			return this.errorReply(`Error: ${template.species} does not evolve.`);
		}
		if (!prevo.exists) {
			return this.errorReply(`Error: You cannot cross evolve into ${crossTemplate.species}.`);
		}
		let setStage = 1, crossStage = 1;
		if (template.prevo) {
			setStage++;
			if (Tools.data.Pokedex[template.prevo].prevo) {
				setStage++;
			}
		}
		if (crossTemplate.prevo) {
			crossStage++;
			if (prevo.prevo) {
				crossStage++;
			}
		}
		if (setStage + 1 !== crossStage) {
			return this.sendReply(`Error: Cross evolution must follow evolutionary stages. (${poke1.species} is Stage ${setStage} and can only cross evolve to Stage ${setStage + 1})`);
		}
		mixedTemplate.abilities = Object.assign({}, crossTemplate.abilities);
		mixedTemplate.baseStats = {};
		for (let statName in template.baseStats) {
			mixedTemplate.baseStats[statName] = (crossTemplate.baseStats[statName] - prevo.baseStats[statName]) + Tools.data.Pokedex[template.id].baseStats[statName];
		}
		mixedTemplate.types = [Tools.data.Pokedex[template.id].types[0]];
		if (Tools.data.Pokedex[template.id].types[1]) mixedTemplate.types.push(Tools.data.Pokedex[template.id].types[1]);
		if (crossTemplate.types[0] !== prevo.types[0]) mixedTemplate.types[0] = crossTemplate.types[0];
		if (crossTemplate.types[1] !== prevo.types[1]) mixedTemplate.types[1] = crossTemplate.types[1] || crossTemplate.types[0];
		if (mixedTemplate.types[0] === mixedTemplate.types[1]) mixedTemplate.types.length = 1;
		mixedTemplate.weightkg = crossTemplate.weightkg - prevo.weightkg + Tools.data.Pokedex[template.id].weightkg;
		if (mixedTemplate.weightkg <= 0) {
			mixedTemplate.weightkg = 0.1;
		}
		for (var i in mixedTemplate.baseStats) {
			if (mixedTemplate.baseStats[i] < 1 || mixedTemplate.baseStats[i] > 255) {
				return this.errorReply(`This Cross Evolution cannot happen since a stat goes below 0 or above 255.`);
			}
		}
		mixedTemplate.tier = "CE";
		let details;
		let weighthit = 20;
		if (mixedTemplate.weightkg >= 200) {
			weighthit = 120;
		} else if (mixedTemplate.weightkg >= 100) {
			weighthit = 100;
		} else if (mixedTemplate.weightkg >= 50) {
			weighthit = 80;
		} else if (mixedTemplate.weightkg >= 25) {
			weighthit = 60;
		} else if (mixedTemplate.weightkg >= 10) {
			weighthit = 40;
		}
		details = {
			"Dex#": mixedTemplate.num,
			"Gen": mixedTemplate.gen,
			"Height": mixedTemplate.heightm + " m",
			"Weight": mixedTemplate.weightkg + " kg <em>(" + weighthit + " BP)</em>",
			"Dex Colour": mixedTemplate.color,
		};
		if (mixedTemplate.eggGroups) details["Egg Group(s)"] = mixedTemplate.eggGroups.join(", ");
		details['<font color="#686868">Does Not Evolve</font>'] = "";
		this.sendReply(`|raw|${Chat.getDataPokemonHTML(mixedTemplate)}`);
		this.sendReply('|raw|<font size="1">' + Object.keys(details).map(detail => {
				if (details[detail] === '') return detail;
				return '<font color="#686868">' + detail + ':</font> ' + details[detail];
			}).join("&nbsp;|&ThickSpace;") + '</font>');
	},
	crossevolvehelp: ["/crossevo <base pokemon>, <evolved pokemon> - Shows the type and stats for the Cross Evolved Pokemon."],

	mnm: 'mixandmega',
	mixandmega: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!toId(target) || !target.includes('@')) return this.parse('/help mixandmega');
		let sep = target.split('@');
		let stone = toId(sep[1]);
		let template = toId(sep[0]);
		if (!Tools.data.Items[stone] || (Tools.data.Items[stone] && !Tools.data.Items[stone].megaEvolves && !Tools.data.Items[stone].onPrimal)) {
			return this.errorReply(`Error: Mega Stone not found`);
		}
		if (!Tools.data.Pokedex[toId(template)]) {
			return this.errorReply(`Error: Pokemon not found`);
		}
		template = Object.assign({}, Tools.getTemplate(template));
		stone = Object.assign({}, Tools.getItem(stone));
		if (template.isMega || (template.evos && Object.keys(template.evos).length > 0)) { // Mega Pokemon cannot be mega evolved
			return this.errorReply(`You cannot mega evolve ${template.name} in Mix and Mega.`);
		}
		let bannedStones = {'beedrillite':1, 'gengarite':1, 'kangaskhanite':1, 'mawilite':1};
		if (stone.id in bannedStones && template.name !== stone.megaEvolves) {
			return this.errorReply(`You cannot use ${stone.name} on anything besides ${stone.megaEvolves} in Mix and Mega.`);
		}
		if (Tools.mod("mixandmega").getTemplate(sep[0]).tier === "Uber") { // Separate messages because there's a difference between being already mega evolved / NFE and being banned from mega evolving
			return this.errorReply(`${template.name} is banned from mega evolving in Mix and Mega.`);
		}
		let baseTemplate = Tools.getTemplate(stone.megaEvolves);
		let megaTemplate = Tools.getTemplate(stone.megaStone);
		if (stone.id === 'redorb') { // Orbs do not have 'Item.megaStone' or 'Item.megaEvolves' properties.
			megaTemplate = Tools.getTemplate("Groudon-Primal");
			baseTemplate = Tools.getTemplate("Groudon");
		} else if (stone.id === 'blueorb') {
			megaTemplate = Tools.getTemplate("Kyogre-Primal");
			baseTemplate = Tools.getTemplate("Kyogre");
		}
		let deltas = {
			baseStats: {},
			weightkg: megaTemplate.weightkg - baseTemplate.weightkg,
		};
		for (let statId in megaTemplate.baseStats) {
			deltas.baseStats[statId] = megaTemplate.baseStats[statId] - baseTemplate.baseStats[statId];
		}
		if (megaTemplate.types.length > baseTemplate.types.length) {
			deltas.type = megaTemplate.types[1];
		} else if (megaTemplate.types.length < baseTemplate.types.length) {
			deltas.type = baseTemplate.types[0];
		} else if (megaTemplate.types[1] !== baseTemplate.types[1]) {
			deltas.type = megaTemplate.types[1];
		}
		//////////////////////////////////////////
		let mixedTemplate = Object.assign({}, template);
		mixedTemplate.abilities = Object.assign({}, megaTemplate.abilities);
		if (mixedTemplate.types[0] === deltas.type) { // Add any type gains
			mixedTemplate.types = [deltas.type];
		} else if (deltas.type) {
			mixedTemplate.types = [types[0], deltas.type];
		}
		mixedTemplate.baseStats = {};
		for (let statName in template.baseStats) { // Add the changed stats and weight
			mixedTemplate.baseStats[statName] = Tools.clampIntRange(Tools.data.Pokedex[template.id].baseStats[statName] + deltas.baseStats[statName], 1, 255);
		}
		mixedTemplate.weightkg = Math.round(Math.max(0.1, template.weightkg + deltas.weightkg) * 100) / 100;
		mixedTemplate.tier = "MnM";
		let details;
		let weighthit = 20;
		if (mixedTemplate.weightkg >= 200) {
			weighthit = 120;
		} else if (mixedTemplate.weightkg >= 100) {
			weighthit = 100;
		} else if (mixedTemplate.weightkg >= 50) {
			weighthit = 80;
		} else if (mixedTemplate.weightkg >= 25) {
			weighthit = 60;
		} else if (mixedTemplate.weightkg >= 10) {
			weighthit = 40;
		}
		details = {
			"Dex#": mixedTemplate.num,
			"Gen": mixedTemplate.gen,
			"Height": mixedTemplate.heightm + " m",
			"Weight": mixedTemplate.weightkg + " kg <em>(" + weighthit + " BP)</em>",
			"Dex Colour": mixedTemplate.color,
		};
		if (mixedTemplate.eggGroups) details["Egg Group(s)"] = mixedTemplate.eggGroups.join(", ");
		details['<font color="#686868">Does Not Evolve</font>'] = "";
		this.sendReply(`|raw|${Chat.getDataPokemonHTML(mixedTemplate)}`);
		this.sendReply('|raw|<font size="1">' + Object.keys(details).map(detail => {
				if (details[detail] === '') return detail;
				return '<font color="#686868">' + detail + ':</font> ' + details[detail];
			}).join("&nbsp;|&ThickSpace;") + '</font>');
	},
	mixandmegahelp: ["/mnm <pokemon> @ <mega stone> - Shows the Mix and Mega evolved Pokemon's type and stats."],

	'350': '350cup',
	'350cup': function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!Tools.data.Pokedex[toId(target)]) {
			return this.errorReply("Error: Pokemon not found.");
		}
		let bst = 0;
		let mixedTemplate = Object.assign({}, Tools.getTemplate(target));
		for (let i in mixedTemplate.baseStats) {
			bst += mixedTemplate.baseStats[i];
		}
		let newStats = {};
		for (let i in mixedTemplate.baseStats) {
			newStats[i] = mixedTemplate.baseStats[i] * (bst <= 350 ? 2 : 1);
		}
		mixedTemplate.baseStats = Object.assign({}, newStats);
		mixedTemplate.tier = "350Cup";
		let details;
		let weighthit = 20;
		if (mixedTemplate.weightkg >= 200) {
			weighthit = 120;
		} else if (mixedTemplate.weightkg >= 100) {
			weighthit = 100;
		} else if (mixedTemplate.weightkg >= 50) {
			weighthit = 80;
		} else if (mixedTemplate.weightkg >= 25) {
			weighthit = 60;
		} else if (mixedTemplate.weightkg >= 10) {
			weighthit = 40;
		}
		details = {
			"Dex#": mixedTemplate.num,
			"Gen": mixedTemplate.gen,
			"Height": mixedTemplate.heightm + " m",
			"Weight": mixedTemplate.weightkg + " kg <em>(" + weighthit + " BP)</em>",
			"Dex Colour": mixedTemplate.color,
		};
		if (mixedTemplate.eggGroups) details["Egg Group(s)"] = mixedTemplate.eggGroups.join(", ");
		details['<font color="#686868">Does Not Evolve</font>'] = "";
		this.sendReply(`|raw|${Chat.getDataPokemonHTML(mixedTemplate)}`);
		this.sendReply('|raw|<font size="1">' + Object.keys(details).map(detail => {
				if (details[detail] === '') return detail;
				return '<font color="#686868">' + detail + ':</font> ' + details[detail];
			}).join("&nbsp;|&ThickSpace;") + '</font>');
	},
	'350cuphelp': ["/350 OR /350cup <pokemon> - Shows the base stats that a Pokemon would have in 350 Cup."],

	ts: 'tiershift',
	tiershift: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!Tools.data.Pokedex[toId(target)]) {
			return this.errorReply("Error: Pokemon not found.");
		}
		let boosts = {
			'UU': 5,
			'BL2': 5,
			'RU': 10,
			'BL3': 10,
			'NU': 15,
			'BL4': 15,
			'PU': 20,
			'NFE': 20,
			'LC Uber': 20,
			'LC': 20,
		};
		let mixedTemplate = Object.assign({}, Tools.getTemplate(target));
		let boost = boosts[mixedTemplate.tier];
		if (!(mixedTemplate.tier in boosts)) boost = 0;
		let newStats = {};
		for (let statName in mixedTemplate.baseStats) {
			newStats[statName] = Tools.clampIntRange(mixedTemplate.baseStats[statName] + boost, 1, 255);
		}
		mixedTemplate.baseStats = Object.assign({}, newStats);
		mixedTemplate.tier = "TS";
		let details;
		let weighthit = 20;
		if (mixedTemplate.weightkg >= 200) {
			weighthit = 120;
		} else if (mixedTemplate.weightkg >= 100) {
			weighthit = 100;
		} else if (mixedTemplate.weightkg >= 50) {
			weighthit = 80;
		} else if (mixedTemplate.weightkg >= 25) {
			weighthit = 60;
		} else if (mixedTemplate.weightkg >= 10) {
			weighthit = 40;
		}
		details = {
			"Dex#": mixedTemplate.num,
			"Gen": mixedTemplate.gen,
			"Height": mixedTemplate.heightm + " m",
			"Weight": mixedTemplate.weightkg + " kg <em>(" + weighthit + " BP)</em>",
			"Dex Colour": mixedTemplate.color,
		};
		if (mixedTemplate.eggGroups) details["Egg Group(s)"] = mixedTemplate.eggGroups.join(", ");
		details['<font color="#686868">Does Not Evolve</font>'] = "";
		this.sendReply(`|raw|${Chat.getDataPokemonHTML(mixedTemplate)}`);
		this.sendReply('|raw|<font size="1">' + Object.keys(details).map(detail => {
				if (details[detail] === '') return detail;
				return '<font color="#686868">' + detail + ':</font> ' + details[detail];
			}).join("&nbsp;|&ThickSpace;") + '</font>');
	},
	'tiershifthelp': ["/ts OR /tiershift <pokemon> - Shows the base stats that a Pokemon would have in Tier Shift."],

	//Misc commands for DragonHeaven
	ns: 'natureswap',
        'natureswap': function(target, room, user) {
		if (!this.runBroadcast()) return;
		let arg=target,by=user;
		let natures = Object.assign({}, Tools.data.Natures);
		let pokemen = Object.assign({}, Tools.data.Pokedex);
                let text = "";
                if (arg == " " || arg == '') {
                        text += "Usage: <code>/ns &lt;Nature> &lt;Pokemon></code>";
                } else {
                        let tar = arg.split(' ');
                        let poke = tar[1],
                                nat = toId(tar[0]),
                                p = toId(poke);
                        if (p == "mega")
                                poke = tar[2] + "mega";
                        if (p.charAt(0) == "m" && pokemen[p.substring(1, p.length) + "mega"] != undefined)
                                poke = poke.substring(1, poke.length) + "mega";
                        let temp = "";
                        p = toId(poke);
                        if (pokemen[p] == undefined) {
                                text += "Error: Pokemon not found";
                        } else if (natures[nat] == undefined) {
                                text += "Error: Nature not found";
                        } else {
                                let pokeobj = {
                                        hp: "" + pokemen[p].baseStats.hp,
                                        atk: "" + pokemen[p].baseStats.atk,
                                        def: "" + pokemen[p].baseStats.def,
                                        spa: "" + pokemen[p].baseStats.spa,
                                        spd: "" + pokemen[p].baseStats.spd,
                                        spe: "" + pokemen[p].baseStats.spe,
                                        name: pokemen[p].species,
                                };
                                let natureobj = natures[nat];
                                if (natureobj.plus && natureobj.minus) {
                                        temp = "<b>" + pokeobj[natureobj['plus']] + "</b>";
                                        pokeobj[natureobj['plus']] = "<b>" + pokeobj[natureobj['minus']] + "</b>";
                                        pokeobj[natureobj['minus']] = temp;
                                }
                                text += "The new stats for " + pokeobj['name'] + " are: " + pokeobj['hp'] + "/" + pokeobj['atk'] + "/" + pokeobj['def'] + "/" + pokeobj['spa'] + "/" + pokeobj['spd'] + "/" + pokeobj['spe'] + "";
                        }
                }
                this.sendReplyBox(text);
        },
	fuse: function(target, room, user) {
		if (!this.runBroadcast()) return;
		if(!target || target === ' ' || !target.includes(',')) return this.errorReply('Error: Invalid Argument(s).')
		let text = "";
		let separated = target.split(",");
		let name = toId(separated[0]), name2 = toId(separated[1]);
		if (!Tools.data.Pokedex[name] || !Tools.data.Pokedex[name2]) {
			return this.errorReply("Error: Pokemon not found");;
		}
		let baseStats = {}, fusedTemplate = Object.assign({}, Tools.getTemplate(name)), template = Object.assign({}, Tools.getTemplate(name2));
		Object.keys(fusedTemplate.baseStats).forEach(stat => {
			baseStats[stat] = Math.floor((fusedTemplate.baseStats[stat] + template.baseStats[stat]) / 2);
		});
		fusedTemplate.baseStats = Object.assign({}, baseStats);
		fusedTemplate.types = [fusedTemplate.types[0]];
		let type = (separated[2] && toId(separated[2]) === 'shiny') ? 0 : 1;
		if(template.types[type] && template.types[type] !== fusedTemplate.types[0]);
		let weight = (Tools.data.Pokedex[fusedTemplate.id].weightkg + template.weightkg) / 2;
		fusedTemplate.weightkg = weight;
		fusedTemplate.abilities = Object.assign({'S': `<b>${template.abilities['0']}</b>`}, Tools.data.Pokedex[fusedTemplate.id].abilities);
		this.sendReply(`|html|${Chat.getDataPokemonHTML(fusedTemplate)}`);
		let details;
		let weighthit = 20;
		if (fusedTemplate.weightkg >= 200) {
			weighthit = 120;
		} else if (fusedTemplate.weightkg >= 100) {
			weighthit = 100;
		} else if (fusedTemplate.weightkg >= 50) {
			weighthit = 80;
		} else if (fusedTemplate.weightkg >= 25) {
			weighthit = 60;
		} else if (fusedTemplate.weightkg >= 10) {
			weighthit = 40;
		}
		details = {
			"Dex#": fusedTemplate.num,
			"Gen": fusedTemplate.gen,
			"Height": fusedTemplate.heightm + " m",
			"Weight": fusedTemplate.weightkg + " kg <em>(" + weighthit + " BP)</em>",
			"Dex Colour": fusedTemplate.color,
		};
		details['<font color="#686868">Does Not Evolve</font>'] = "";
		this.sendReply('|raw|<font size="1">' + Object.keys(details).map(detail => {
				if (details[detail] === '') return detail;
				return '<font color="#686868">' + detail + ':</font> ' + details[detail];
			}).join("&nbsp;|&ThickSpace;") + '</font>');
	},
	learnistor: function(target, room, user) {
		if (!this.runBroadcast()) return;
		let learnstor = Tools.mod('istor').data.Learnsets, movestor = Tools.mod('istor').data.Movedex, dexstor = Tools.mod('istor').data.Pokedex;
		if (!target || toId(target) === '') return this.sendReply("/learnistor: Shows the whether a Pokemon can learn a move, including Pokemon and Moves from istor.");
		let targets = target.split(','), mon = targets[0], move = targets[1];
		if (!mon || !dexstor[toId(mon)]) return this.errorReply("Error: Pokemon not found");
		if (!learnstor[toId(mon)]) return this.errorReply("Error: Learnset not found");
		if (!move || !movestor[toId(move)]) return this.errorReply("Error: Move not found");
		mon = dexstor[toId(mon)];
		move = movestor[toId(move)];
		if (learnstor[toId(mon.species)].learnset[toId(move.name)]) {
			return this.sendReplyBox("In Istor, " + mon.species + ' <font color="green"><u><b>can<b><u></font> learn ' + move.name);
		}
		return this.sendReplyBox("In Istor, " + mon.species + ' <font color="red"><u><b>can\'t<b><u></font> learn ' + move.name);
	},
	
	'bnb' : 'badnboosted',
	badnboosted : function (target, room, user) {
		if (!this.runBroadcast()) return;
		if(!Tools.data.Pokedex[toId(target)]) {
			return this.errorReply("Error: Pokemon not found.")
		}
		let template = Object.assign({}, Tools.getTemplate(target));
		let newStats = Object.values(template.baseStats).map(function (stat) {
 			return (stat <= 70) ? (stat * 2) : stat;
 		});
		this.sendReplyBox(`${Tools.data.Pokedex[toId(target)].species} in Bad 'n Boosted: <br /> ${newStats.join('/')}`);
	},
	badnboostedhelp: ["/bnb <pokemon> - Shows the base stats that a Pokemon would have in Bad 'n Boosted."],

	istorlist: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Istor Pokemon</h2></center>`;
		let istorDex = require('../mods/istor/pokedex.js').BattlePokedex;
		if (!istorDex) return this.errorReply("Error Fetching Istor Data.");
		Object.values(istorDex).forEach(mon => {
			buf += `<button name="send" value="/dt ${mon.species}, Istor" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	istorlisthelp: ["/istorlist - Shows the list of Istor Pokemon."],
};
