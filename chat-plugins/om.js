'use strict';

exports.commands= {
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
		let deltas; // Get mega deltas.
		let baseTemplate = Tools.getTemplate(stone.megaEvolves);
		let megaTemplate = Tools.getTemplate(stone.megaStone);
		if (stone.id === 'redorb') { // Orbs do not have 'Item.megaStone' or 'Item.megaEvolves' properties.
			megaTemplate = Tools.getTemplate("Groudon-Primal");
			baseTemplate = Tools.getTemplate("Groudon");
		} else if (stone.id === 'blueorb') {
			megaTemplate = Tools.getTemplate("Kyogre-Primal");
			baseTemplate = Tools.getTemplate("Kyogre");
		}
		deltas = {
			ability: megaTemplate.abilities['0'],
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
		let ability = deltas.ability;
		let types = template.types;
		let baseStats = Object.assign({}, template.baseStats);
		if (types[0] === deltas.type) { // Add any type gains
			types = [deltas.type];
		} else if (deltas.type) {
			types = [types[0], deltas.type];
		}
		for (let statName in baseStats) { // Add the changed stats and weight
			baseStats[statName] = Tools.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
		}
		let weightkg = Math.round(Math.max(0.1, template.weightkg + deltas.weightkg) * 100) / 100;
		let type = '<span class="col typecol">';
		for (let i = 0; i < types.length; i++) { // HTML for some nice type images.
			type = `${type}<img src="https://play.pokemonshowdown.com/sprites/types/${types[i]}.png" alt="${types[i]}" height="14" width="32">`;
		}
		type = type + "</span>";
		let gnbp = 20;
		if (weightkg >= 200) { // Calculate Grass Knot/Low Kick Base Power
			gnbp = 120;
		} else if (weightkg >= 100) {
			gnbp = 100;
		} else if (weightkg >= 50) {
			gnbp = 80;
		} else if (weightkg >= 25) {
			gnbp = 60;
		} else if (weightkg >= 10) {
			gnbp = 40;
		} // Aah, only if `template` had a `bst` property.
		let bst = baseStats['hp'] + baseStats['atk'] + baseStats['def'] + baseStats['spa'] + baseStats['spd'] + baseStats['spe'];
		let text = `<b>Stats</b>: ${Object.values(baseStats).join('/')}<br />`;
		text = `${text}<b>BST</b>: ${bst}<br />`;
		text = `${text}<b>Type:</b> ${type}<br />`;
		text = `${text}<b>Ability</b>: ${ability}<br />`;
		text = `${text}<b>Weight</b>: ${weightkg} kg (${gnbp} BP)`;
		return this.sendReplyBox(text);
	},
	mixandmegahelp: ["/mnm <pokemon> @ <mega stone> - Shows the mix and mega evolved Pokemon's type and stats."],

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
		let text = "";
		let separated = target.split(",");
		let name = (("" + separated[0]).trim()).toLowerCase();
		let name2 = (("" + separated[1]).trim()).toLowerCase();
		name = toId(name);
		name2 = toId(name2);
		let pokemen = Tools.data.Pokedex;
		if (pokemen[name] == undefined || pokemen[name2] == undefined)
		{
			this.errorReply("Error: Pokemon not found");
			return;
		}
		else {
			let baseStats = {};
			baseStats['avehp'] = Math.floor((pokemen[name].baseStats.hp + pokemen[name2].baseStats.hp) / 2);
			baseStats['aveatk'] = Math.floor((pokemen[name].baseStats.atk + pokemen[name2].baseStats.atk) / 2);
			baseStats['avedef'] = Math.floor((pokemen[name].baseStats.def + pokemen[name2].baseStats.def) / 2);
			baseStats['avespa'] = Math.floor((pokemen[name].baseStats.spa + pokemen[name2].baseStats.spa) / 2);
			baseStats['avespd'] = Math.floor((pokemen[name].baseStats.spd + pokemen[name2].baseStats.spd) / 2);
			baseStats['avespe'] = Math.floor((pokemen[name].baseStats.spe + pokemen[name2].baseStats.spe) / 2);
			let type = pokemen[name].types[0];
			let ability = "";
			let weight = (pokemen[name].weightkg + pokemen[name2].weightkg) / 2;
			for (let i in pokemen[name].abilities) {
				ability += pokemen[name].abilities[i] + "/";
			}
			ability = ability.substring(0, ability.length - 1);
			ability = ability + " + " + pokemen[name2].abilities['0'];
			if (separated[2] && toId(separated[2]) === "shiny" && pokemen[name2].types[1])
				type = type + '/' + pokemen[name2].types[1];
			else if (pokemen[name].types[0] != pokemen[name2].types[0])
				type = type + '/' + pokemen[name2].types[0];
			if (type.split("/")[0] === type.split("/")[1]) {
				type = type.split("/")[0];
			}
			let bst = baseStats['avehp'] + baseStats['aveatk'] + baseStats['avedef'] + baseStats['avespa'] + baseStats['avespd'] + baseStats['avespe'];
			text = "<b>Stats</b>: " + baseStats['avehp'] + "/" + baseStats['aveatk'] + "/" + baseStats['avedef'] + "/" + baseStats['avespa'] + "/" + baseStats['avespd'] + "/" + baseStats['avespe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " + ability + "<br /><b>Weight</b>: " + weight + " kg";
			this.sendReplyBox(text);
		}
	},
	di: 'distor',
	dataistor: 'distor',
	distor: function(target, room, user) {
        	 if (!this.runBroadcast()) return;
                 if(!target || toId(target) === '') return this.sendReply("/distor: Shows the data for a Pokemon/Ability/Move, including ones from istor.");
		let name = toId(target);
		let abilistor = Tools.mod('istor').data.Abilities, movestor = Tools.mod('istor').data.Movedex, pokemen = Tools.mod('istor').data.Pokedex, itemstor = Tools.mod('istor').data.Items;
		if(pokemen[name]) {
			let baseStats = pokemen[name].baseStats;
			let types = pokemen[name].types;
			let type = '<span class="col typecol">';
			for(let i = 0; i<types.length;i++) {
				type = type+ '<img src="https://play.pokemonshowdown.com/sprites/types/'+types[i]+'.png" alt="'+types[i]+'" height="14" width="32">';
			}
			type = type+"</span>";
			let ability = "";
			let weight = pokemen[name].weightkg;
			for(let i in pokemen[name].abilities) {
				ability+=pokemen[name].abilities[i]+"/";
			}
			ability = ability.substring(0,ability.length-1);
			let bst = baseStats['hp'] + baseStats['atk'] + baseStats['def'] + baseStats['spa'] + baseStats['spd'] + baseStats['spe'];
			let text = "<b>Stats</b>: " + baseStats['hp'] + "/" + baseStats['atk'] + "/" + baseStats['def'] + "/" + baseStats['spa'] + "/" + baseStats['spd'] + "/" + baseStats['spe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " +ability+ "<br /><b>Weight</b>: "+weight+" kg";
			return this.sendReplyBox(text);
		}
		else if(movestor[name] && (movestor.desc || movestor[name].shortDesc)) {
			return this.sendReplyBox(`<ul class="utilichart"><li class="result"><span class="col movenamecol">${movestor[name].name}</span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/${(movestor[name].type)}.png" alt="${(movestor[name].type)}" height="14" width="32"><img src="//play.pokemonshowdown.com/sprites/categories/${(movestor[name].category)}.png" alt="${(movestor[name].category)}" height="14" width="32"></span> <span class="col labelcol"><em>Power</em><br>${(movestor[name].basePower)}</span> <span class="col widelabelcol"><em>Accuracy</em><br>${(movestor[name].accuracy)}%</span> <span class="col pplabelcol"><em>PP</em><br>${(movestor[name].pp)}</span> <span class="col movedesccol">${(movestor[name].shortDesc)}</span> </li><li style="clear:both"></li></ul><div class="chat"><font size="1"><font color="#686868">Priority:</font> ${(movestor[name].priority)}|<font color="#686868">Gen:</font> Istor |<font color="#686868"> Target:</font>${(movestor[name].target)}</div>`);
		}
		else if(abilistor[name] && (abilistor[name].desc || abilistor[name].shortDesc)) {
			return this.sendReplyBox(`<b>${abilistor[name].name}</b>: ${(abilistor[name].desc || abilistor[name].shortDesc)}`);
		}
		else if(itemstor[name] && (itemstor[name].desc || itemstor[name].shortDesc)) {
			return this.sendReplyBox(`<b>${itemstor[name].name}</b>: ${(itemstor[name].desc || itemstor[name].shortDesc)}`);
		}
		else 
			return this.errorReply("Error: Pokemon/Ability/Move not found");
		
	},
        learnistor: function(target, room, user) {
                if (!this.runBroadcast()) return;
		let learnstor = Tools.mod('istor').data.Learnsets, movestor = Tools.mod('istor').data.Movedex, dexstor = Tools.mod('istor').data.Pokedex;
                if(!target || toId(target) === '') return this.sendReply("/learnistor: Shows the whether a Pokemon can learn a move, including Pokemon and Moves from istor.");
                let targets = target.split(','), mon = targets[0], move = targets[1];
                if(!mon || !dexstor[toId(mon)]) return this.errorReply("Error: Pokemon not found");
                if(!learnstor[toId(mon)]) return this.errorReply("Error: Learnset not found");
                if(!move || !movestor[toId(move)]) return this.errorReply("Error: Move not found");
                mon = dexstor[toId(mon)];
                move = movestor[toId(move)];
                if(learnstor[toId(mon.species)].learnset[toId(move.name)]) {
                        return this.sendReplyBox("In Istor, "+mon.species+' <font color="green"><u><b>can<b><u></font> learn '+move.name);
                }
                return this.sendReplyBox("In Istor, "+mon.species+' <font color="red"><u><b>can\'t<b><u></font> learn '+move.name);
        },
	dgen: 'dnewgen',
	dnewgen: function(target, room, user) {
        	 if (!this.runBroadcast()) return;
                 if(!target || toId(target) === '') return this.sendReply("/dgen: Shows the data for a Pokemon/Ability/Move/Item, including ones from Pokemon The New First Gen.");
		let name = toId(target);
		let abiliden = Tools.mod('thefirstnewgen').data.Abilities, moveden = Tools.mod('thefirstnewgen').data.Movedex, pokegen = Tools.mod('thefirstnewgen').data.Pokedex, itemgen = Tools.mod('thefirstnewgen').data.Items;
		if(pokegen[name]) {
			let baseStats = pokegen[name].baseStats;
			let types = pokegen[name].types;
			let type = '<span class="col typecol">';
			for(let i = 0; i<types.length;i++) {
				type = type+ '<img src="https://play.pokemonshowdown.com/sprites/types/'+types[i]+'.png" alt="'+types[i]+'" height="14" width="32">';
			}
			type = type+"</span>";
			let ability = "";
			let info = pokegen[name].gender;
			let weight = pokegen[name].weightkg;
			for(let i in pokegen[name].abilities) {
				ability+=pokegen[name].abilities[i]+"/";
			}
			ability = ability.substring(0,ability.length-1);
			let bst = baseStats['hp'] + baseStats['atk'] + baseStats['def'] + baseStats['spa'] + baseStats['spd'] + baseStats['spe'];
			let text = ""+info+"</button><br><b>Stats</b>: " + baseStats['hp'] + "/" + baseStats['atk'] + "/" + baseStats['def'] + "/" + baseStats['spa'] + "/" + baseStats['spd'] + "/" + baseStats['spe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " +ability+ "<br /><b>Weight</b>: "+weight+" kg";
			return this.sendReplyBox(text);
		}
		else if(moveden[name]) {
			return this.sendReplyBox(`<ul class="utilichart"><li class="result"><span class="col movenamecol">${moveden[name].name}</span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/${(moveden[name].type)}.png" alt="${(moveden[name].type)}" height="14" width="32"><img src="//play.pokemonshowdown.com/sprites/categories/${(moveden[name].category)}.png" alt="${(moveden[name].category)}" height="14" width="32"></span> <span class="col labelcol"><em>Power</em><br>${(moveden[name].basePower)}</span> <span class="col widelabelcol"><em>Accuracy</em><br>${(moveden[name].accuracy)}%</span> <span class="col pplabelcol"><em>PP</em><br>${(moveden[name].pp)}</span> <span class="col movedesccol">${(moveden[name].shortDesc)}</span> </li><li style="clear:both"></li></ul><div class="chat"><font size="1"><font color="#686868">Priority:</font> ${(moveden[name].priority)}|<font color="#686868">Gen:</font> New First Gen |<font color="#686868"> Target:</font>${(moveden[name].target)}</div>`);
		}
		else if(abiliden[name]) {
			return this.sendReplyBox(`<b>${abiliden[name].name}</b>: ${(abiliden[name].shortDesc)}`);
		}
		else if(itemgen[name]) {
			return this.sendReplyBox(`<b>${itemgen[name].name}</b>: ${(itemgen[name].desc || itemgen[name].shortDesc)}`);
		}
		else 
			return this.errorReply("Error: Pokemon/Ability/Move/Item not found");
	},
	
	'350': 'cup350',
	'350cup': function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!Tools.data.Pokedex[toId(target)]) {
			return this.errorReply("Error: Pokemon not found.");
		}
		let bst = 0;
		let pokeobj = Tools.getTemplate(toId(target));
		for (let i in pokeobj.baseStats) {
			bst += pokeobj.baseStats[i];
		}
		let newStats = {};
		for (let i in pokeobj.baseStats) {
			newStats[i] = pokeobj.baseStats[i] * (bst <= 350 ? 2 : 1);
		}
		let text = `${pokeobj.species} in 350 Cup: <br /> ${Object.values(newStats).join('/')}`;
		this.sendReplyBox(text);
	},
	'350cuphelp': ["/350 OR /350cup <pokemon> - Shows the base stats that a Pokemon would have in 350 cup."],
	
	'bnb' : 'badnboosted',
	badnboosted : function (target, room, user) {
		if (!this.runBroadcast()) return;
		if(!Tools.data.Pokedex[toId(target)]) {
			return this.errorReply("Error: Pokemon not found.")
		}
		this.sendReplyBox(`${Tools.data.Pokedex[toId(target)].species} in Bad 'n Boosted: <br /> ` + Object.values(Tools.mod("bnb").data.Pokedex[toId(target)].baseStats).join('/'));
	},
	badnboostedhelp: ["/bnb <pokemon> - Shows the base stats that a Pokemon would have in Bad 'n Boosted."],
	
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
		let template = Object.assign({}, Tools.getTemplate(target));
		if (!(template.tier in boosts)) return this.sendReplyBox(`${template.species} in 350 Cup: <br /> ${Object.values(template.baseStats).join('/')}`);
		let boost = boosts[template.tier];
		let newStats = Object.assign({}, template.baseStats);
		for (let statName in template.baseStats) {
			newStats[statName] = Tools.clampIntRange(newStats[statName] + boost, 1, 255);
		}
		this.sendReplyBox(`${template.species} in 350 Cup: <br /> ${Object.values(newStats).join('/')}`);
	},
	'tiershifthelp': ["/ts OR /tiershift <pokemon> - Shows the base stats that a Pokemon would have in Tier Shift."],
};
