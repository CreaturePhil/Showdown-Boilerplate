// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js

exports.BattleFormats = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	standard: {
		effectType: 'Banlist',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal']
	},
	standardnext: {
		effectType: 'Banlist',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Soul Dew']
	},
	standardubers: {
		effectType: 'Banlist',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal']
	},
	standardgbu: {
		effectType: 'Banlist',
		ruleset: ['Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal', 'Soul Dew',
			'Mewtwo',
			'Mew',
			'Lugia',
			'Ho-Oh',
			'Celebi',
			'Kyogre',
			'Groudon',
			'Rayquaza',
			'Jirachi',
			'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed',
			'Dialga',
			'Palkia',
			'Giratina', 'Giratina-Origin',
			'Phione',
			'Manaphy',
			'Darkrai',
			'Shaymin', 'Shaymin-Sky',
			'Arceus',
			'Victini',
			'Reshiram',
			'Zekrom',
			'Kyurem', 'Kyurem-Black', 'Kyurem-White',
			'Keldeo',
			'Meloetta',
			'Genesect',
			'Xerneas',
			'Yveltal',
			'Zygarde',
			'Diancie',
			'Hoopa', 'Hoopa-Unbound'
		]
	},
	standarddoubles: {
		effectType: 'Banlist',
		ruleset: ['Species Clause', 'Nickname Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Abilities Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal']
	},
	pokemon: {
		effectType: 'Banlist',
		onValidateTeam: function (team, format) {
			var problems = [];
			// ----------- legality line ------------------------------------------
			if (!format || !format.banlistTable || !format.banlistTable['illegal']) return problems;
			// everything after this line only happens if we're doing legality enforcement
			var kyurems = 0;
			for (var i = 0; i < team.length; i++) {
				if (team[i].species === 'Kyurem-White' || team[i].species === 'Kyurem-Black') {
					if (kyurems > 0) {
						problems.push('You cannot have more than one Kyurem-Black/Kyurem-White.');
						break;
					}
					kyurems++;
				}
			}
			return problems;
		},
		onChangeSet: function (set, format) {
			var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			var problems = [];
			var totalEV = 0;
			var allowCAP = !!(format && format.banlistTable && format.banlistTable['allowcap']);

			if (set.species === set.name) delete set.name;
			if (template.gen > this.gen) {
				problems.push(set.species + ' does not exist in gen ' + this.gen + '.');
			}
			var ability = {};
			if (set.ability) {
				ability = this.getAbility(set.ability);
				if (ability.gen > this.gen) {
					problems.push(ability.name + ' does not exist in gen ' + this.gen + '.');
				}
			}
			if (set.moves) {
				for (var i = 0; i < set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					if (move.gen > this.gen) {
						problems.push(move.name + ' does not exist in gen ' + this.gen + '.');
					} else if (!allowCAP && move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
			}
			if (item.gen > this.gen) {
				problems.push(item.name + ' does not exist in gen ' + this.gen + '.');
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (!allowCAP || template.tier !== 'CAP') {
				if (template.isNonstandard) {
					problems.push(set.species + ' is not a real Pokemon.');
				}
				if (ability.isNonstandard) {
					problems.push(ability.name + ' is not a real ability.');
				}
				if (item.isNonstandard) {
					problems.push(item.name + ' is not a real item.');
				}
			}
			for (var k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			// In gen 6, it is impossible to battle other players with pokemon that break the EV limit
			if (totalEV > 510 && this.gen >= 6) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			// ----------- legality line ------------------------------------------
			if (!format.banlistTable || !format.banlistTable['illegal']) return problems;
			// everything after this line only happens if we're doing legality enforcement

			// only in gen 1 and 2 it was legal to max out all EVs
			if (this.gen >= 3 && totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			// "Undiscovered" egg group Pokemon caught in the wild in gen 6 must have at least 3 perfect IVs
			if (set.ivs && this.gen >= 6 && ((template.species in {Xerneas:1, Yveltal:1, Zygarde:1}) ||
				(format.requirePentagon && template.eggGroups.indexOf('Undiscovered') >= 0 && !template.evos.length))) {
				var perfectIVs = 0;
				for (var i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " has less than three perfect IVs.");
			}

			// limit one of each move
			var moves = [];
			if (set.moves) {
				var hasMove = {};
				for (var i = 0; i < set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			if (template.isMega) {
				// Mega evolutions evolve in-battle
				set.species = template.baseSpecies;
				var baseAbilities = Tools.getTemplate(set.species).abilities;
				var niceAbility = false;
				for (var i in baseAbilities) {
					if (baseAbilities[i] === set.ability) {
						niceAbility = true;
						break;
					}
				}
				if (!niceAbility) set.ability = baseAbilities['0'];
			} else if (template.isPrimal) {
				// Primal Reversion happens in-battle
				set.species = template.baseSpecies;
				set.ability = Tools.getTemplate(set.species).abilities['0'];
			}
			if (template.requiredItem && item.name !== template.requiredItem) {
				problems.push((set.name || set.species) + ' needs to hold ' + template.requiredItem + '.');
			}
			if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
				problems.push((set.name || set.species) + ' needs to have the move ' + template.requiredMove + '.');
			}
			if (template.num === 351) { // Castform
				set.species = 'Castform';
			}
			if (template.num === 421) { // Cherrim
				set.species = 'Cherrim';
			}
			if (template.num === 493) { // Arceus
				if (set.ability === 'Multitype' && item.onPlate) {
					set.species = 'Arceus-' + item.onPlate;
				} else {
					set.species = 'Arceus';
				}
			}
			if (template.num === 555) { // Darmanitan
				if (set.species === 'Darmanitan-Zen' && ability.id !== 'zenmode') {
					problems.push('Darmanitan-Zen transforms in-battle with Zen Mode.');
				}
				set.species = 'Darmanitan';
			}
			if (template.num === 487) { // Giratina
				if (item.id === 'griseousorb') {
					set.species = 'Giratina-Origin';
					set.ability = 'Levitate';
				} else {
					set.species = 'Giratina';
					set.ability = 'Pressure';
				}
			}
			if (template.num === 647) { // Keldeo
				if (set.moves.indexOf('secretsword') < 0) {
					set.species = 'Keldeo';
				}
			}
			if (template.num === 648) { // Meloetta
				if (set.species === 'Meloetta-Pirouette' && set.moves.indexOf('relicsong') < 0) {
					problems.push('Meloetta-Pirouette transforms in-battle with Relic Song.');
				}
				set.species = 'Meloetta';
			}
			if (template.num === 649) { // Genesect
				switch (item.id) {
				case 'burndrive':
					set.species = 'Genesect-Burn';
					break;
				case 'chilldrive':
					set.species = 'Genesect-Chill';
					break;
				case 'dousedrive':
					set.species = 'Genesect-Douse';
					break;
				case 'shockdrive':
					set.species = 'Genesect-Shock';
					break;
				default:
					set.species = 'Genesect';
				}
			}
			if (template.num === 681) { // Aegislash
				set.species = 'Aegislash';
			}

			if (template.unobtainableShiny) {
				set.shiny = false;
			}
			return problems;
		}
	},
	kalospokedex: {
		effectType: 'Rule',
		onValidateSet: function (set) {
			var validKalosDex = {
				"Abomasnow":1, "Abomasnow-Mega":1, "Abra":1, "Absol":1, "Absol-Mega":1, "Accelgor":1, "Aegislash":1, "Aegislash-Blade":1, "Aerodactyl":1, "Aerodactyl-Mega":1, "Aggron":1, "Aggron-Mega":1, "Alakazam":1, "Alakazam-Mega":1, "Alomomola":1, "Altaria":1, "Amaura":1, "Amoonguss":1, "Ampharos":1, "Ampharos-Mega":1, "Arbok":1, "Ariados":1, "Aromatisse":1, "Aron":1, "Articuno":1, "Audino":1, "Aurorus":1, "Avalugg":1, "Axew":1, "Azumarill":1, "Azurill":1, "Bagon":1, "Banette":1, "Banette-Mega":1, "Barbaracle":1, "Barboach":1, "Basculin":1, "Basculin-Blue-Striped":1, "Beartic":1, "Beedrill":1, "Bellossom":1, "Bellsprout":1, "Bergmite":1, "Bibarel":1, "Bidoof":1, "Binacle":1, "Bisharp":1, "Blastoise":1, "Blastoise-Mega":1, "Boldore":1, "Bonsly":1, "Braixen":1, "Budew":1, "Buizel":1, "Bulbasaur":1, "Bunnelby":1, "Burmy":1, "Butterfree":1, "Carbink":1, "Carnivine":1, "Carvanha":1, "Caterpie":1, "Chandelure":1, "Charizard":1, "Charizard-Mega-X":1, "Charizard-Mega-Y":1, "Charmander":1, "Charmeleon":1, "Chatot":1, "Chesnaught":1, "Chespin":1, "Chimecho":1, "Chinchou":1, "Chingling":1, "Clamperl":1, "Clauncher":1, "Clawitzer":1, "Cloyster":1, "Combee":1, "Conkeldurr":1, "Corphish":1, "Corsola":1, "Crawdaunt":1, "Croagunk":1, "Crobat":1, "Crustle":1, "Cryogonal":1, "Cubchoo":1, "Cubone":1, "Dedenne":1, "Deino":1, "Delcatty":1, "Delibird":1, "Delphox":1, "Diggersby":1, "Diglett":1, "Ditto":1, "Dodrio":1, "Doduo":1, "Doublade":1, "Dragalge":1, "Dragonair":1, "Dragonite":1, "Drapion":1, "Dratini":1, "Drifblim":1, "Drifloon":1, "Druddigon":1, "Ducklett":1, "Dugtrio":1, "Dunsparce":1, "Duosion":1, "Durant":1, "Dwebble":1, "Eevee":1, "Ekans":1, "Electrike":1, "Electrode":1, "Emolga":1, "Escavalier":1, "Espeon":1, "Espurr":1, "Exeggcute":1, "Exeggutor":1, "Exploud":1, "Farfetch'd":1, "Fearow":1, "Fennekin":1, "Ferroseed":1, "Ferrothorn":1, "Flaaffy":1, "Flabebe":1, "Flareon":1, "Fletchinder":1, "Fletchling":1, "Floatzel":1, "Floette":1, "Florges":1, "Flygon":1, "Foongus":1, "Fraxure":1, "Froakie":1, "Frogadier":1, "Furfrou":1, "Furret":1, "Gabite":1, "Gallade":1, "Garbodor":1, "Garchomp":1, "Garchomp-Mega":1, "Gardevoir":1, "Gardevoir-Mega":1, "Gastly":1, "Gengar":1, "Gengar-Mega":1, "Geodude":1, "Gible":1, "Gigalith":1, "Glaceon":1, "Gligar":1, "Gliscor":1, "Gloom":1, "Gogoat":1, "Golbat":1, "Goldeen":1, "Golduck":1, "Golem":1, "Golett":1, "Golurk":1, "Goodra":1, "Goomy":1, "Gorebyss":1, "Gothita":1, "Gothitelle":1, "Gothorita":1, "Gourgeist-Small":1, "Gourgeist":1, "Gourgeist-Large":1, "Gourgeist-Super":1, "Granbull":1, "Graveler":1, "Greninja":1, "Grumpig":1, "Gulpin":1, "Gurdurr":1, "Gyarados":1, "Gyarados-Mega":1, "Hariyama":1, "Haunter":1, "Hawlucha":1, "Haxorus":1, "Heatmor":1, "Heliolisk":1, "Helioptile":1, "Heracross":1, "Heracross-Mega":1, "Hippopotas":1, "Hippowdon":1, "Honchkrow":1, "Honedge":1, "Hoothoot":1, "Hoppip":1, "Horsea":1, "Houndoom":1, "Houndoom-Mega":1, "Houndour":1, "Huntail":1, "Hydreigon":1, "Igglybuff":1, "Illumise":1, "Inkay":1, "Ivysaur":1, "Jigglypuff":1, "Jolteon":1, "Jumpluff":1, "Jynx":1, "Kadabra":1, "Kakuna":1, "Kangaskhan":1, "Kangaskhan-Mega":1, "Karrablast":1, "Kecleon":1, "Kingdra":1, "Kirlia":1, "Klefki":1, "Krokorok":1, "Krookodile":1, "Lairon":1, "Lampent":1, "Lanturn":1, "Lapras":1, "Larvitar":1, "Leafeon":1, "Ledian":1, "Ledyba":1, "Lickilicky":1, "Lickitung":1, "Liepard":1, "Linoone":1, "Litleo":1, "Litwick":1, "Lombre":1, "Lotad":1, "Loudred":1, "Lucario":1, "Lucario-Mega":1, "Ludicolo":1, "Lunatone":1, "Luvdisc":1, "Machamp":1, "Machoke":1, "Machop":1, "Magcargo":1, "Magikarp":1, "Magnemite":1, "Magneton":1, "Magnezone":1, "Makuhita":1, "Malamar":1, "Mamoswine":1, "Manectric":1, "Manectric-Mega":1, "Mantine":1, "Mantyke":1, "Mareep":1, "Marill":1, "Marowak":1, "Masquerain":1, "Mawile":1, "Mawile-Mega":1, "Medicham":1, "Medicham-Mega":1, "Meditite":1, "Meowstic":1, "Meowstic-F":1, "Metapod":1, "Mewtwo":1, "Mewtwo-Mega-X":1, "Mewtwo-Mega-Y":1, "Mienfoo":1, "Mienshao":1, "Mightyena":1, "Miltank":1, "Mime Jr.":1, "Minun":1, "Moltres":1, "Mothim":1, "Mr. Mime":1, "Munchlax":1, "Murkrow":1, "Nidoking":1, "Nidoqueen":1, "Nidoran-M":1, "Nidoran-F":1, "Nidorina":1, "Nidorino":1, "Nincada":1, "Ninjask":1, "Noctowl":1, "Noibat":1, "Noivern":1, "Nosepass":1, "Octillery":1, "Oddish":1, "Onix":1, "Pachirisu":1, "Pancham":1, "Pangoro":1, "Panpour":1, "Pansage":1, "Pansear":1, "Patrat":1, "Pawniard":1, "Pelipper":1, "Phantump":1, "Pichu":1, "Pidgeot":1, "Pidgeotto":1, "Pidgey":1, "Pikachu":1, "Piloswine":1, "Pinsir":1, "Pinsir-Mega":1, "Plusle":1, "Politoed":1, "Poliwag":1, "Poliwhirl":1, "Poliwrath":1, "Poochyena":1, "Probopass":1, "Psyduck":1, "Pumpkaboo-Small":1, "Pumpkaboo":1, "Pumpkaboo-Large":1, "Pumpkaboo-Super":1, "Pupitar":1, "Purrloin":1, "Pyroar":1, "Quagsire":1, "Quilladin":1, "Qwilfish":1, "Raichu":1, "Ralts":1, "Relicanth":1, "Remoraid":1, "Reuniclus":1, "Rhydon":1, "Rhyhorn":1, "Rhyperior":1, "Riolu":1, "Roggenrola":1, "Roselia":1, "Roserade":1, "Rotom":1, "Rotom-Heat":1, "Rotom-Wash":1, "Rotom-Frost":1, "Rotom-Fan":1, "Rotom-Mow":1, "Sableye":1, "Salamence":1, "Sandile":1, "Sandshrew":1, "Sandslash":1, "Sawk":1, "Scatterbug":1, "Scizor":1, "Scizor-Mega":1, "Scolipede":1, "Scrafty":1, "Scraggy":1, "Scyther":1, "Seadra":1, "Seaking":1, "Sentret":1, "Seviper":1, "Sharpedo":1, "Shedinja":1, "Shelgon":1, "Shellder":1, "Shelmet":1, "Shuckle":1, "Shuppet":1, "Sigilyph":1, "Simipour":1, "Simisage":1, "Simisear":1, "Skarmory":1, "Skiddo":1, "Skiploom":1, "Skitty":1, "Skorupi":1, "Skrelp":1, "Skuntank":1, "Sliggoo":1, "Slowbro":1, "Slowking":1, "Slowpoke":1, "Slugma":1, "Slurpuff":1, "Smeargle":1, "Smoochum":1, "Sneasel":1, "Snorlax":1, "Snover":1, "Snubbull":1, "Solosis":1, "Solrock":1, "Spearow":1, "Spewpa":1, "Spinarak":1, "Spinda":1, "Spoink":1, "Spritzee":1, "Squirtle":1, "Staraptor":1, "Staravia":1, "Starly":1, "Starmie":1, "Staryu":1, "Steelix":1, "Stunfisk":1, "Stunky":1, "Sudowoodo":1, "Surskit":1, "Swablu":1, "Swalot":1, "Swanna":1, "Swellow":1, "Swinub":1, "Swirlix":1, "Swoobat":1, "Sylveon":1, "Taillow":1, "Talonflame":1, "Tauros":1, "Teddiursa":1, "Tentacool":1, "Tentacruel":1, "Throh":1, "Timburr":1, "Torkoal":1, "Toxicroak":1, "Trapinch":1, "Trevenant":1, "Trubbish":1, "Tyranitar":1, "Tyranitar-Mega":1, "Tyrantrum":1, "Tyrunt":1, "Umbreon":1, "Ursaring":1, "Vanillish":1, "Vanillite":1, "Vanilluxe":1, "Vaporeon":1, "Venipede":1, "Venusaur":1, "Venusaur-Mega":1, "Vespiquen":1, "Vibrava":1, "Victreebel":1, "Vileplume":1, "Vivillon":1, "Volbeat":1, "Voltorb":1, "Wailmer":1, "Wailord":1, "Wartortle":1, "Watchog":1, "Weavile":1, "Weedle":1, "Weepinbell":1, "Whirlipede":1, "Whiscash":1, "Whismur":1, "Wigglytuff":1, "Wingull":1, "Wobbuffet":1, "Woobat":1, "Wooper":1, "Wormadam":1, "Wormadam-Sandy":1, "Wormadam-Trash":1, "Wynaut":1, "Xerneas":1, "Yanma":1, "Yanmega":1, "Yveltal":1, "Zangoose":1, "Zapdos":1, "Zigzagoon":1, "Zoroark":1, "Zorua":1, "Zubat":1, "Zweilous":1, "Zygarde":1
			};
			if (!(set.species in validKalosDex)) {
				return [set.species + " is not in the Kalos Pokedex."];
			}
		}
	},
	hoennpokedex: {
		effectType: 'Rule',
		onValidateSet: function (set) {
			var hoennDex = {
				"Abra":1, "Absol":1, "Aggron":1, "Alakazam":1, "Altaria":1, "Anorith":1, "Armaldo":1, "Aron":1, "Azumarill":1, "Azurill":1, "Bagon":1, "Baltoy":1, "Banette":1, "Barboach":1, "Beautifly":1, "Beldum":1, "Bellossom":1, "Blaziken":1, "Breloom":1, "Budew":1, "Cacnea":1, "Cacturne":1, "Camerupt":1, "Carvanha":1, "Cascoon":1, "Castform":1, "Chimecho":1, "Chinchou":1, "Chingling":1, "Clamperl":1, "Claydol":1, "Combusken":1, "Corphish":1, "Corsola":1, "Cradily":1, "Crawdaunt":1, "Crobat":1, "Delcatty":1, "Dodrio":1, "Doduo":1, "Donphan":1, "Dusclops":1, "Dusknoir":1, "Duskull":1, "Dustox":1, "Electrike":1, "Electrode":1, "Exploud":1, "Feebas":1, "Flygon":1, "Froslass":1, "Gallade":1, "Gardevoir":1, "Geodude":1, "Girafarig":1, "Glalie":1, "Gloom":1, "Golbat":1, "Goldeen":1, "Golduck":1, "Golem":1, "Gorebyss":1, "Graveler":1, "Grimer":1, "Grovyle":1, "Grumpig":1, "Gulpin":1, "Gyarados":1, "Hariyama":1, "Heracross":1, "Horsea":1, "Huntail":1, "Igglybuff":1, "Illumise":1, "Jigglypuff":1, "Kadabra":1, "Kecleon":1, "Kingdra":1, "Kirlia":1, "Koffing":1, "Lairon":1, "Lanturn":1, "Latias":1, "Latios":1, "Lileep":1, "Linoone":1, "Lombre":1, "Lotad":1, "Loudred":1, "Ludicolo":1, "Lunatone":1, "Luvdisc":1, "Machamp":1, "Machoke":1, "Machop":1, "Magcargo":1, "Magikarp":1, "Magnemite":1, "Magneton":1, "Magnezone":1, "Makuhita":1, "Manectric":1, "Marill":1, "Marshtomp":1, "Masquerain":1, "Mawile":1, "Medicham":1, "Meditite":1, "Metagross":1, "Metang":1, "Mightyena":1, "Milotic":1, "Minun":1, "Mudkip":1, "Muk":1, "Natu":1, "Ninetales":1, "Ninjask":1, "Nosepass":1, "Numel":1, "Nuzleaf":1, "Oddish":1, "Pelipper":1, "Phanpy":1, "Pichu":1, "Pikachu":1, "Pikachu-Belle":1, "Pikachu-Cosplay":1, "Pikachu-Libre":1, "Pikachu-PhD":1, "Pikachu-Pop-Star":1, "Pikachu-Rock-Star":1, "Pinsir":1, "Plusle":1, "Poochyena":1, "Probopass":1, "Psyduck":1, "Raichu":1, "Ralts":1, "Regice":1, "Regirock":1, "Registeel":1, "Relicanth":1, "Rhydon":1, "Rhyhorn":1, "Rhyperior":1, "Roselia":1, "Roserade":1, "Sableye":1, "Salamence":1, "Sandshrew":1, "Sandslash":1, "Sceptile":1, "Seadra":1, "Seaking":1, "Sealeo":1, "Seedot":1, "Seviper":1, "Sharpedo":1, "Shedinja":1, "Shelgon":1, "Shiftry":1, "Shroomish":1, "Shuppet":1, "Silcoon":1, "Skarmory":1, "Skitty":1, "Slaking":1, "Slakoth":1, "Slugma":1, "Snorunt":1, "Solrock":1, "Spheal":1, "Spinda":1, "Spoink":1, "Starmie":1, "Staryu":1, "Surskit":1, "Swablu":1, "Swalot":1, "Swampert":1, "Swellow":1, "Taillow":1, "Tentacool":1, "Tentacruel":1, "Torchic":1, "Torkoal":1, "Trapinch":1, "Treecko":1, "Tropius":1, "Vibrava":1, "Vigoroth":1, "Vileplume":1, "Volbeat":1, "Voltorb":1, "Vulpix":1, "Wailmer":1, "Wailord":1, "Walrein":1, "Weezing":1, "Whiscash":1, "Whismur":1, "Wigglytuff":1, "Wingull":1, "Wobbuffet":1, "Wurmple":1, "Wynaut":1, "Xatu":1, "Zangoose":1, "Zigzagoon":1, "Zubat":1
			};
			if (!(set.species in hoennDex)) {
				return [set.species + " is not in the Hoenn Pokedex."];
			}
		}
	},
	potd: {
		effectType: 'Rule',
		onStart: function () {
			if (Config.potd) {
				this.add('rule', "Pokemon of the Day: " + this.getTemplate(Config.potd).name);
			}
		}
	},
	teampreviewvgc: {
		effectType: 'Rule',
		onStartPriority: -10,
		onStart: function () {
			this.add('clearpoke');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
		},
		onTeamPreview: function () {
			this.makeRequest('teampreview', 4);
		}
	},
	teampreview1v1: {
		effectType: 'Rule',
		onStartPriority: -10,
		onStart: function () {
			this.add('clearpoke');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
		},
		onTeamPreview: function () {
			this.makeRequest('teampreview', 1);
		}
	},
	teampreview: {
		effectType: 'Rule',
		onStartPriority: -10,
		onStart: function () {
			this.add('clearpoke');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
		},
		onTeamPreview: function () {
			this.makeRequest('teampreview');
		}
	},
	teampreviewgbu: {
		effectType: 'Rule',
		onStartPriority: -10,
		onStart: function () {
			this.add('clearpoke');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
		},
		onTeamPreview: function () {
			this.makeRequest('teampreview', 3);
		}
	},
	littlecup: {
		effectType: 'Rule',
		onValidateSet: function (set) {
			var template = this.getTemplate(set.species || set.name);
			if (template.prevo) {
				return [set.species + " isn't the first in its evolution family."];
			}
			if (!template.nfe) {
				return [set.species + " doesn't have an evolution family."];
			}
		}
	},
	speciesclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Species Clause: Limit one of each Pokémon');
		},
		onValidateTeam: function (team, format) {
			var speciesTable = {};
			for (var i = 0; i < team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (speciesTable[template.num]) {
					return ["You are limited to one of each Pokémon by Species Clause.", "(You have more than one " + template.baseSpecies + ")"];
				}
				speciesTable[template.num] = true;
			}
		}
	},
	nicknameclause: {
		effectType: 'Rule',
		onValidateTeam: function (team, format) {
			var nameTable = {};
			for (var i = 0; i < team.length; i++) {
				var name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pokémon must have different nicknames.",  "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
			// Illegality of impersonation of other species is
			// hardcoded in team-validator.js, so we are done.
		}
	},
	itemclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Item Clause: Limit one of each item');
		},
		onValidateTeam: function (team, format) {
			var itemTable = {};
			for (var i = 0; i < team.length; i++) {
				var item = toId(team[i].item);
				if (!item) continue;
				if (itemTable[item]) {
					return ["You are limited to one of each item by Item Clause.", "(You have more than one " + this.getItem(item).name + ")"];
				}
				itemTable[item] = true;
			}
		}
	},
	abilityclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Ability Clause: Limit two of each ability');
		},
		onValidateTeam: function (team, format) {
			var abilityTable = {};
			for (var i = 0; i < team.length; i++) {
				var ability = toId(team[i].ability);
				if (!ability) continue;
				if (ability in abilityTable) {
					if (abilityTable[ability] >= 2) {
						return ["You are limited to two of each ability by the Ability Clause.", "(You have more than two " + this.getAbility(ability).name + ")"];
					}
					abilityTable[ability]++;
				} else {
					abilityTable[ability] = 1;
				}
			}
		}
	},
	ateclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', '-ate Clause: Limit one of Aerilate/Refrigerate/Pixilate');
		},
		onValidateTeam: function (team, format) {
			var ateAbility = false;
			for (var i = 0; i < team.length; i++) {
				var ability = toId(team[i].ability);
				if (ability === 'refrigerate' || ability === 'pixilate' || ability === 'aerilate') {
					if (ateAbility) return [team[i].name + " has more than one of Aerilate/Refrigerate/Pixilate, which is banned by -ate Clause."];
					ateAbility = true;
				}
			}
		}
	},
	ohkoclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'OHKO Clause: OHKO moves are banned');
		},
		onValidateSet: function (set) {
			var problems = [];
			if (set.moves) {
				for (var i in set.moves) {
					var move = this.getMove(set.moves[i]);
					if (move.ohko) problems.push(move.name + ' is banned by OHKO Clause.');
				}
			}
			return problems;
		}
	},
	evasionabilitiesclause: {
		effectType: 'Banlist',
		name: 'Evasion Abilities Clause',
		banlist: ['Sand Veil', 'Snow Cloak'],
		onStart: function () {
			this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
		}
	},
	evasionmovesclause: {
		effectType: 'Banlist',
		name: 'Evasion Moves Clause',
		banlist: ['Minimize', 'Double Team'],
		onStart: function () {
			this.add('rule', 'Evasion Moves Clause: Evasion moves are banned');
		}
	},
	endlessbattleclause: {
		effectType: 'Banlist',
		name: 'Endless Battle Clause',
		// implemented in battle-engine.js

		// A Pokémon has a confinement counter, which starts at 0:
		// +1 confinement whenever:
		// - it has no available moves other than Struggle
		// - it was forced to switch by a stale opponent before it could do its
		//   action for the turn
		// - it intentionally switched out the turn after it switched in against
		//   a stale Pokémon
		// - it shifts in Triples against a stale Pokémon
		// - it has gone 5 turns without losing PP (mimiced/transformed moves
		//   count only if no foe is stale)
		// confinement reset to 0 whenever:
		// - it uses PP while not Transformed/Impostered
		// - if it has at least 2 confinement, and begins a turn without losing
		//   at least 1% of its max HP from the last time its confinement counter
		//   was 0 - user also becomes half-stale if not already half-stale, or
		//   stale if already half-stale

		// A Pokémon is also considered stale if:
		// - it has gained a Leppa berry through any means besides starting
		//   with one
		// - OR it has eaten a Leppa berry it isn't holding

		onStart: function () {
			this.add('rule', 'Endless Battle Clause: Forcing endless battles is banned');
		}
	},
	moodyclause: {
		effectType: 'Banlist',
		name: 'Moody Clause',
		banlist: ['Moody'],
		onStart: function () {
			this.add('rule', 'Moody Clause: Moody is banned');
		}
	},
	swaggerclause: {
		effectType: 'Banlist',
		name: 'Swagger Clause',
		banlist: ['Swagger'],
		onStart: function () {
			this.add('rule', 'Swagger Clause: Swagger is banned');
		}
	},
	batonpassclause: {
		effectType: 'Banlist',
		name: 'Baton Pass Clause',
		onStart: function () {
			this.add('rule', 'Baton Pass Clause: Limit one Baton Passer, can\'t pass Spe and other stats simultaneously');
		},
		onValidateTeam: function (team, format) {
			var BPcount = 0;
			for (var i = 0; i < team.length; i++) {
				if (team[i].moves.indexOf('Baton Pass') >= 0) {
					BPcount++;
				}
				if (BPcount > 1) {
					return [team[i].name + " has Baton Pass, but you are limited to one Baton Pass user by Baton Pass Clause."];
				}
			}
		},
		onValidateSet: function (set, format, setHas) {
			if (!('batonpass' in setHas)) return;

			// check if Speed is boosted
			var speedBoosted = false;
			for (var i = 0; i < set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.boosts && move.boosts.spe > 0) {
					speedBoosted = true;
					break;
				}
			}
			var boostSpeed = ['flamecharge', 'geomancy', 'motordrive', 'rattled', 'speedboost', 'steadfast', 'weakarmor', 'salacberry'];
			if (!speedBoosted) {
				for (var i = 0; i < boostSpeed.length; i++) {
					if (boostSpeed[i] in setHas) {
						speedBoosted = true;
						break;
					}
				}
			}
			if (!speedBoosted) return;

			// check if non-Speed boosted
			var nonSpeedBoosted = false;
			for (var i = 0; i < set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.boosts && (move.boosts.atk > 0 || move.boosts.def > 0 || move.boosts.spa > 0 || move.boosts.spd > 0)) {
					nonSpeedBoosted = true;
					break;
				}
			}
			var boostNonSpeed = ['acupressure', 'starfberry', 'curse', 'metalclaw', 'meteormash', 'poweruppunch', 'rage', 'rototiller', 'fellstinger', 'bellydrum', 'download', 'justified', 'moxie', 'sapsipper', 'defiant', 'angerpoint', 'cellbattery', 'liechiberry', 'snowball', 'weaknesspolicy', 'diamondstorm', 'flowershield', 'skullbash', 'steelwing', 'stockpile', 'cottonguard', 'ganlonberry', 'keeberry', 'chargebeam', 'fierydance', 'geomancy', 'lightningrod', 'stormdrain', 'competitive', 'absorbbulb', 'petayaberry', 'charge', 'apicotberry', 'luminousmoss', 'marangaberry'];
			if (!nonSpeedBoosted) {
				for (var i = 0; i < boostNonSpeed.length; i++) {
					if (boostNonSpeed[i] in setHas) {
						nonSpeedBoosted = true;
						break;
					}
				}
			}
			if (!nonSpeedBoosted) return;

			return [(set.name || set.species) + " can Baton Pass both Speed and a different stat, which is banned by Baton Pass Clause."];
		}
	},
	hppercentagemod: {
		effectType: 'Rule',
		name: 'HP Percentage Mod',
		onStart: function () {
			this.add('rule', 'HP Percentage Mod: HP is shown in percentages');
			this.reportPercentages = true;
		}
	},
	exacthpmod: {
		effectType: 'Rule',
		name: 'Exact HP Mod',
		onStart: function () {
			this.add('rule', 'Exact HP Mod: Exact HP is shown');
			this.reportExactHP = true;
		}
	},
	cancelmod: {
		effectType: 'Rule',
		onStart: function () {
			this.supportCancel = true;
		}
	},
	sleepclausemod: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Sleep Clause Mod: Limit one foe put to sleep');
		},
		onSetStatus: function (status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'slp') {
				for (var i = 0; i < target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.hp && pokemon.status === 'slp') {
						if (!pokemon.statusData.source || pokemon.statusData.source.side !== pokemon.side) {
							this.add('-message', 'Sleep Clause Mod activated.');
							return false;
						}
					}
				}
			}
		}
	},
	freezeclausemod: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Freeze Clause Mod: Limit one foe frozen');
		},
		onSetStatus: function (status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'frz') {
				for (var i = 0; i < target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.status === 'frz') {
						this.add('-message', 'Freeze Clause activated.');
						return false;
					}
				}
			}
		}
	},
	sametypeclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Same Type Clause: Pokémon in a team must share a type');
		},
		onValidateTeam: function (team, format, teamHas) {
			if (!team[0]) return;
			var template = this.getTemplate(team[0].species);
			var typeTable = template.types;
			if (!typeTable) return ["Your team must share a type."];
			for (var i = 1; i < team.length; i++) {
				template = this.getTemplate(team[i].species);
				if (!template.types) return ["Your team must share a type."];

				typeTable = typeTable.intersect(template.types);
				if (!typeTable.length) return ["Your team must share a type."];
			}
			if (format.id === 'monotype') {
				// Very complex bans
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Steel':
					if (teamHas['aegislash']) return ["Aegislash is banned from Steel monotype teams."];
					break;
				}
			}
		}
	},
	megarayquazaclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Mega Rayquaza Clause: You cannot mega evolve Rayquaza');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				if (this.sides[0].pokemon[i].speciesid === 'rayquaza') this.sides[0].pokemon[i].canMegaEvo = false;
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				if (this.sides[1].pokemon[i].speciesid === 'rayquaza') this.sides[1].pokemon[i].canMegaEvo = false;
			}
		}
	}
};
