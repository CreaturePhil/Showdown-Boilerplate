'use strict';

exports.commands= {
	/*mixandmega: 'mnm',
    mnm: function(target, room, user) {
		if (!this.runBroadcast()) return;
        let sep = target.split('@');
		let stone = sep[1], template = sep[0], primals = ['redorb', 'blueorb'];
		if (!Tools.data.Pokedex[toId(template)] || (!Tools.data.Items[toId(stone)] || !Tools.data.Items[toId(stone)].megaStone || primals.includes(toId(stone))) || !target.includes('@')) {
			return this.errorReply('ERROR: Invalid Input. Use /mnm <pokemon> @ <mega stone/orb>');
		}
		template = Object.assign({}, Tools.getTemplate(template));
		stone = Object.assign({}, Tools.getItem(stone));
		if(template.isMega || (template.evos && Object.keys(template.evos).length > 0)) {
			return this.errorReply(`You cannot mega evolve ${template.name} in Mix and Mega.`);
		}
		let ability, types = [template.types[0]], weightkg, baseStats ={};
		if(template.types[1]) types.push(template.types[1]);
		if (stone.id === 'redorb') {
			for (let i in template.baseStats) {
				baseStats[i] = Tools.clampIntRange(template.baseStats[i] + Tools.getTemplate('Groudon-Primal').baseStats[i] - Tools.getTemplate('Groudon').baseStats[i], 1, 255);
			}
			if (template.types[0] === 'Fire') {
				types = ['Fire'];
			}
			else {
				types = [template.types[0], 'Fire'];
			}
			ability = 'Desolate Land';
			weightkg = Tools.clampIntRange(template.weightkg + Tools.getTemplate('Groudon-Primal').weightkg - Tools.getTemplate('Groudon').weightkg, 0.1);
		}
		else if (stone.id === 'blueorb') {
			for (let i in template.baseStats) {
				baseStats[i] = Tools.clampIntRange(template.baseStats[i] + Tools.getTemplate('Kyogre-Primal').baseStats[i] - Tools.getTemplate('Kyogre').baseStats[i], 1, 255);
			}
			ability = 'Primordial Sea';
			weightkg = Tools.clampIntRange(template.weightkg + Tools.getTemplate('Kyogre-Primal').weightkg - Tools.getTemplate('Kyogre').weightkg, 0.1);
		}
		else {
			let mon = Tools.getTemplate(stone.megaEvolves), mega = Tools.getTemplate(stone.megaStone);
			for (let i in template.baseStats) {
				baseStats[i] = Tools.clampIntRange(template.baseStats[i] + mega.baseStats[i] - mon.baseStats[i], 1, 255);
			}
			if (mega.types[1] !== mon.types[1]) {
				if (mega.name === 'Aggron-Mega') {
					if (template.types[0] === 'Steel') {
						types = ['Steel'];
					}
					else {
						types = [template.types[0], 'Steel'];
					}
				}
				else {
					if (template.types[0] === mega.types[1]) {
						types = [mega.types[1]];
					}
					else {
						types = [template.types[0], mega.types[1]];
					}
				}
			}
			ability = mega.abilities['0'];
			weightkg = Tools.clampIntRange(mega.weightkg - mon.weightkg, 0.1);
		}
		let type = '<span class="col typecol">';
		for(let i = 0; i<types.length;i++) {
			type = type+ '<img src="https://play.pokemonshowdown.com/sprites/types/'+template.types[i]+'.png" alt="'+template.types[i]+'" height="14" width="32">';
		}
		type = type+"</span>";
		let bst = baseStats['hp'] + baseStats['atk'] + baseStats['def'] + baseStats['spa'] + baseStats['spd'] + baseStats['spe'];
		let text = "<b>Stats</b>: " + baseStats['hp'] + "/" + baseStats['atk'] + "/" + baseStats['def'] + "/" + baseStats['spa'] + "/" + baseStats['spd'] + "/" + baseStats['spe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Ability</b>: " +ability+ "<br /><b>Weight</b>: "+weightkg+" kg";
		return this.sendReplyBox(text);
	},*/
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
};
