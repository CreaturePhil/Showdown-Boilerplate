// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		section: "ORAS Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Unrated Random Battle",
		section: "ORAS Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3521201/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536420/\">OU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite']
	},
	{
		name: "OU (no Mega)",
		section: "ORAS Singles",

		ruleset: ['OU'],
		onBegin: function () {
			for (var i = 0; i < this.p1.pokemon.length; i++) {
				this.p1.pokemon[i].canMegaEvo = false;
			}
			for (var i = 0; i < this.p2.pokemon.length; i++) {
				this.p2.pokemon[i].canMegaEvo = false;
			}
		}
	},
	{
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: []
	},
	{
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3542640/\">np: UU Stage 3.2</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541343/\">UU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Alakazite', 'Altarianite', 'Diancite', 'Heracronite', 'Galladite', 'Gardevoirite', 'Lopunnite', 'Medichamite',
			'Metagrossite', 'Pidgeotite', 'Pinsirite', 'Drizzle', 'Drought', 'Shadow Tag'
		]
	},
	{
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3538971/\">np: RU Stage 10</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3538036/\">RU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['UU'],
		banlist: ['UU', 'BL2', 'Galladite', 'Houndoominite', 'Pidgeotite']
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3542109/\">np: NU Stage 7</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523692/\">NU Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'Cameruptite', 'Glalitite', 'Steelixite']
	},
	{
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3490462/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3496013/\">LC Viability Ranking</a>"
		],
		section: "ORAS Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger']
	},
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535064/\">Anything Goes Viability Ranking</a>"
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal']
	},
	/*{
		name: "CAP Naviathan Playtest",
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Allow CAP', 'Syclant', 'Revenankh', 'Pyroak', 'Fidgit', 'Stratagem', 'Arghonaut', 'Kitsunoh', 'Cyclohm', 'Colossoil', 'Krilowatt', 'Voodoom',
			'Tomohawk', 'Necturna', 'Mollux', 'Aurumoth', 'Malaconda', 'Cawmodore', 'Volkraken', 'Plasmanta',
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect',
			'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew'
		]
	},*/
	{
		name: "Battle Spot Singles",
		section: "ORAS Singles",

		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		banlist: ['Tornadus + Defiant', 'Thundurus + Defiant', 'Landorus + Sheer Force'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 3) return ['You must bring at least three Pok\u00e9mon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Custom Game",
		section: "ORAS Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Doubles Battle",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545903/\">np: Doubles OU Stage 3</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>"
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom', 'Salamencite', 'Soul Dew', 'Dark Void',
			'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore'
		]
	},
	{
		name: "Doubles OU (suspect test)",
		section: "ORAS Doubles",

		gameType: 'doubles',
		challengeShow: false,
		ruleset: ['Doubles OU'],
		banlist: []
	},
	{
		name: "Doubles Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void']
	},
	{
		name: "Doubles UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: ['Abomasnow', 'Aegislash', 'Amoonguss', 'Azumarill', 'Bisharp', 'Breloom', 'Charizard', 'Conkeldurr', 'Cresselia',
			'Diancie', 'Dragonite', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoir', 'Gengar', 'Greninja', 'Gyarados', 'Heatran',
			'Hitmontop', 'Hoopa', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi', 'Kangaskhan', 'Keldeo', 'Kyurem-Black', 'Landorus', 'Landorus-Therian', 'Latios', 'Ludicolo',
			'Metagross', 'Mew', 'Milotic', 'Ninetales', 'Politoed', 'Rotom-Wash', 'Sableye', 'Scizor', 'Scrafty', 'Serperior', 'Shaymin-Sky', 'Suicune',
			'Sylveon', 'Talonflame', 'Terrakion', 'Thundurus', 'Thundurus-Therian', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcarona', 'Weavile', 'Whimsicott', 'Zapdos'
		]
	},
	{
		name: "Doubles NU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles UU'],
		banlist: ['Snorlax', 'Machamp', 'Lopunny', 'Galvantula', 'Mienshao', 'Infernape', 'Aromatisse', 'Clawitzer', 'Kyurem', 'Flygon',
			'Lucario', 'Alakazam', 'Gastrodon', 'Bronzong', 'Chandelure', 'Dragalge', 'Mamoswine', 'Genesect', 'Arcanine', 'Volcarona',
			'Aggron', 'Manectric', 'Salamence', 'Tornadus', 'Porygon2', 'Latias', 'Meowstic', 'Ninetales', 'Crobat', 'Blastoise',
			'Darmanitan', 'Sceptile', 'Jirachi', 'Goodra', 'Deoxys-Attack', 'Milotic', 'Victini', 'Hariyama', 'Crawdaunt', 'Aerodactyl',
			'Abomasnow', 'Krookodile', 'Cofagrigus', 'Druddigon', 'Escavalier', 'Dusclops', 'Slowbro', 'Slowking', 'Eelektross', 'Spinda',
			'Cloyster', 'Raikou', 'Thundurus-Therian', 'Swampert', 'Nidoking', 'Aurorus', 'Granbull', 'Braviary'
		]
	},
	{
		name: "Battle Spot Doubles (VGC 2015)",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3524352/\">VGC 2015 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3530547/\">VGC 2015 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3500650/\">VGC Learning Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526666/\">Sample Teams for VGC 2015</a>"
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Tornadus + Defiant', 'Thundurus + Defiant', 'Landorus + Sheer Force'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pok\u00e9mon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Battle Spot Special 11",
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Battle Spot Doubles (VGC 2015)'],
		banlist: ['Charizard', 'Gengar', 'Kangaskhan', 'Tyranitar', 'Gardevoir', 'Mawile', 'Salamence', 'Garchomp', 'Rotom',
			'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Heatran', 'Cresselia', 'Amoonguss', 'Bisharp',
			'Terrakion', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Therian', 'Greninja', 'Talonflame', 'Aegislash', 'Sylveon'
		],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pok\u00e9mon.'];
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Pikachu Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Arceus', 'Raikou', 'Thundurus', 'Thundurus-Therian', 'Zapdos', 'Zekrom'],
		validateTeam: function (team, format) {
			if (team.length < 4) return ['You must bring at least four Pok\u00e9mon.'];
			for (var i = 0; i < team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (!template.types || template.types.indexOf('Electric') < 0) return ["Only Electric-type Pok\u00e9mon are allowed."];
			}
		},
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Doubles Hackmons Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3511522/\">Smogon Triples</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540390/\">Smogon Triples Viability Ranking</a>"
		],
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Smogon Triples",
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Perish Song'
		]
	},
	{
		name: "Battle Spot Triples",
		section: "ORAS Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Tornadus + Defiant', 'Thundurus + Defiant', 'Landorus + Sheer Force'],
		requirePentagon: true,
		validateTeam: function (team, format) {
			if (team.length < 6) return ['You must have six Pok\u00e9mon.'];
		}
	},
	{
		name: "Triples Hackmons Cup",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "Triples Custom Game",
		section: "ORAS Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "No Status",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542555/\">No Status</a>"],
		section: "OM of the Month",
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina-Origin', 'Greninja',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Landorus', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew'
		],
		validateSet: function (set) {
			var problems = [];
			if (set.moves) {
				for (var i in set.moves) {
					var move = this.getMove(set.moves[i]);
					if (move.category === 'Status') problems.push(set.species + "'s move " + move.name + " is banned by No Status.");
				}
			}
			return problems;
		}
	},
	{
		name: "MonsJustMons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3514696/\">MonsJustMons</a>"],
		section: "OM of the Month",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Arceus', 'Archeops', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Slaking', 'Xerneas', 'Yveltal', 'Zekrom'
		],
		validateSet: function (set) {
			set.item = '';
			set.ability = 'None';
			set.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			set.ivs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			set.nature = '';
		}
	},
	{
		name: "[Seasonal] Rainbow Road",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "OM of the Month",

		team: "randomRainbow",
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "The last attack on each Pok\u00e9mon is based on their Pok\u00e9dex color.");
			this.add('-message', "Red/Pink beats Yellow/Green, which beats Blue/Purple, which beats Red/Pink.");
			this.add('-message', "Using a color move on a Pok\u00e9mon in the same color group is a neutral hit.");
			this.add('-message', "Use /details [POKEMON] to check its Pok\u00e9dex color.");

			var allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			var physicalnames = {
				'Red': 'Crimson Crash', 'Pink': 'Rose Rush', 'Yellow': 'Saffron Strike', 'Green': 'Viridian Slash',
				'Blue': 'Blue Bombardment', 'Purple': 'Indigo Impact'
			};
			var specialnames = {
				'Red': 'Scarlet Shine', 'Pink': 'Coral Catapult', 'Yellow': 'Golden Gleam', 'Green': 'Emerald Flash',
				'Blue': 'Cerulean Surge', 'Purple': 'Violet Radiance'
			};
			for (var i = 0; i < allPokemon.length; i++) {
				var pokemon = allPokemon[i];
				var color = pokemon.template.color;
				var category = (pokemon.stats.atk > pokemon.stats.spa ? 'Physical' : 'Special');
				var last = pokemon.moves.length - 1;
				var move = (category === 'Physical' ? physicalnames[color] : specialnames[color]);
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(move);
					pokemon.moveset[last].move = move;
					pokemon.baseMoveset[last].move = move;
				}
			}
		},
		onBeforeTurn: function (pokemon) {
			var side = pokemon.side;
			side.item = '';

			var decisions = [];
			var decision, i;
			if (side.hadItem || this.random(4) === 0) { // Can never get 2 consecutive turns of items
				side.hadItem = false;
				return;
			}
			switch (this.random(8)) {
			case 0:
				side.item = 'lightning';
				side.hadItem = true;
				this.add('message', "Lightning suddenly struck " + side.name + " and shrank their Pok\u00e9mon!");
				this.add('-start', pokemon, 'shrunken', '[silent]');
				break;
			case 1:
				side.item = 'blooper';
				side.hadItem = true;
				this.add('message', "A Blooper came down and splattered ink all over " + side.name + "'s screen!");
				this.add('-start', pokemon, 'blinded', '[silent]');
				break;
			case 2:
				if (pokemon.isGrounded()) {
					side.item = 'banana';
					side.hadItem = true;
					this.add('message', side.name + " slipped on a banana peel!");
					this.add('-start', pokemon, 'slipped', '[silent]');
					pokemon.addVolatile('flinch');
				}
				break;
			case 3:
				if (!side.sideConditions['goldenmushroom']) {
					side.item = 'goldmushroom';
					side.hadItem = true;
					this.add('message', side.name + " collected a Golden Mushroom, giving them a speed boost!");
					this.add('-start', pokemon, 'goldenmushroom', '[silent]');
					side.addSideCondition('goldenmushroom');
					side.sideConditions['goldenmushroom'].duration = 3;
					// Get all relevant decisions from the Pokemon and tweak speed.
					for (i = 0; i < this.queue.length; i++) {
						if (this.queue[i].pokemon === pokemon) {
							decision = this.queue[i];
							decision.speed = pokemon.getStat('spe');
							decisions.push(decision);
							// Cancel the decision
							this.queue.splice(i, 1);
							i--;
						}
					}
					for (i = 0; i < decisions.length; i++) {
						this.insertQueue(decisions[i]);
					}
				}
				break;
			case 4:
			case 5:
				if (!side.sideConditions['goldenmushroom']) {
					side.item = 'mushroom';
					side.hadItem = true;
					this.add('message', side.name + " collected a Mushroom, giving them a quick speed boost!");
					this.add('-start', pokemon, 'mushroom', '[silent]');
					side.addSideCondition('mushroom');
					side.sideConditions['mushroom'].duration = 1;
					// Get all relevant decisions from the Pokemon and tweak speed.
					for (i = 0; i < this.queue.length; i++) {
						if (this.queue[i].pokemon === pokemon) {
							decision = this.queue[i];
							decision.speed = pokemon.getStat('spe');
							decisions.push(decision);
							// Cancel the decision
							this.queue.splice(i, 1);
							i--;
						}
					}
					for (i = 0; i < decisions.length; i++) {
						this.insertQueue(decisions[i]);
					}
				}
				break;
			default:
				if (side.pokemonLeft - side.foe.pokemonLeft >= 2) {
					side.item = 'blueshell';
					side.hadItem = true;
					this.add('message', "A Blue Spiny Shell flew over the horizon and crashed into " + side.name + "!");
					this.damage(pokemon.maxhp / 2, pokemon, pokemon, this.getMove('judgment'), true);
				}
			}
		},
		onAccuracy: function (accuracy, target, source, move) {
			if (source.hasAbility('keeneye')) return;
			var modifier = 1;
			if (source.side.item === 'blooper' && !source.hasAbility('clearbody')) {
				modifier *= 0.4;
			}
			if (target.side.item === 'lightning') {
				modifier *= 0.8;
			}
			return this.chainModify(modifier);
		},
		onDisableMove: function (pokemon) {
			// Enforce Choice Item locking on color moves
			// Technically this glitches with Klutz, but Lopunny is Brown and will never appear :D
			if (!pokemon.ignoringItem() && pokemon.getItem().isChoice && pokemon.lastMove === 'swift') {
				var moves = pokemon.moveset;
				for (var i = 0; i < moves.length; i++) {
					if (moves[i].id !== 'swift') {
						pokemon.disableMove(moves[i].id, false);
					}
				}
			}
		},
		onEffectivenessPriority: -5,
		onEffectiveness: function (typeMod, target, type, move) {
			if (move.id !== 'swift') return;
			// Only calculate color effectiveness once
			if (target.types[0] !== type) return 0;
			var targetColor = target.template.color;
			var sourceColor = this.activePokemon.template.color;
			var effectiveness = {
				'Red': {'Red': 0, 'Pink': 0, 'Yellow': 1, 'Green': 1, 'Blue': -1, 'Purple': -1},
				'Pink': {'Red': 0, 'Pink': 0, 'Yellow': 1, 'Green': 1, 'Blue': -1, 'Purple': -1},
				'Yellow': {'Red': -1, 'Pink': -1, 'Yellow': 0, 'Green': 0, 'Blue': 1, 'Purple': 1},
				'Green': {'Red': -1, 'Pink': -1, 'Yellow': 0, 'Green': 0, 'Blue': 1, 'Purple': 1},
				'Blue': {'Red': 1, 'Pink': 1, 'Yellow': -1, 'Green': -1, 'Blue': 0, 'Purple': 0},
				'Purple': {'Red': 1, 'Pink': 1, 'Yellow': -1, 'Green': -1, 'Blue': 0, 'Purple': 0}
			};
			return effectiveness[sourceColor][targetColor];
		},
		onModifyDamage: function (damage, source, target, effect) {
			if (source === target || effect.effectType !== 'Move') return;
			if (target.side.item === 'lightning') return this.chainModify(2);
			if (source.side.item === 'lightning') return this.chainModify(0.5);
		},
		onModifySpe: function (speMod, pokemon) {
			if (pokemon.side.sideConditions['goldenmushroom'] || pokemon.side.sideConditions['mushroom']) {
				return this.chainModify(1.75);
			}
		},
		onResidual: function (battle) {
			var side;
			for (var i = 0; i < battle.sides.length; i++) {
				side = battle.sides[i];
				if (side.sideConditions['goldenmushroom'] && side.sideConditions['goldenmushroom'].duration === 1) {
					this.add('-message', "The effect of " + side.name + "'s Golden Mushroom wore off.");
					this.add('-end', side.active[0], 'goldenmushroom', '[silent]');
					side.removeSideCondition('goldenmushroom');
				}
				switch (side.item) {
				case 'lightning':
					this.add('-end', side.active[0], 'shrunken', '[silent]');
					break;
				case 'blooper':
					this.add('-end', side.active[0], 'blinded', '[silent]');
					break;
				case 'banana':
					this.add('-end', side.active[0], 'slipped', '[silent]');
					break;
				case 'mushroom':
					this.add('-end', side.active[0], 'mushroom', '[silent]');
				}

				side.item = '';
			}
		},
		onModifyMove: function (move, pokemon) {
			if (move.id !== 'swift') return;
			var physicalnames = {
				'Red': 'Crimson Crash', 'Pink': 'Rose Rush', 'Yellow': 'Saffron Strike', 'Green': 'Viridian Slash',
				'Blue': 'Blue Bombardment', 'Purple': 'Indigo Impact'
			};
			var specialnames = {
				'Red': 'Scarlet Shine', 'Pink': 'Coral Catapult', 'Yellow': 'Golden Gleam', 'Green': 'Emerald Flash',
				'Blue': 'Cerulean Surge', 'Purple': 'Violet Radiance'
			};
			var color = pokemon.template.color;
			move.category = (pokemon.stats.atk > pokemon.stats.spa ? 'Physical' : 'Special');
			move.name = (move.category === 'Physical' ? physicalnames[color] : specialnames[color]);
			move.basePower = 100;
			move.accuracy = 100;
			move.type = '???';
			if (move.category === 'Physical') move.flags['contact'] = true;
		},
		onPrepareHit: function (pokemon, target, move) {
			if (move.id !== 'swift') return;
			var animations = {
				'Crimson Crash': 'Flare Blitz', 'Scarlet Shine': 'Fusion Flare', 'Rose Rush': 'Play Rough',
				'Coral Catapult': 'Moonblast', 'Saffron Strike': 'Bolt Strike',	'Golden Gleam': 'Charge Beam',
				'Viridian Slash': 'Power Whip', 'Emerald Flash': 'Solarbeam', 'Blue Bombardment': 'Waterfall',
				'Cerulean Surge': 'Hydro Pump', 'Indigo Impact': 'Poison Jab', 'Violet Radiance': 'Gunk Shot'
			};
			this.attrLastMove('[anim] ' + animations[move.name]);
		},
		onSwitchInPriority: -9,
		onSwitchIn: function (pokemon) {
			if (!pokemon.hp) return;
			this.add('-start', pokemon, pokemon.template.color, '[silent]');
			if (pokemon.side.item === 'lightning') {
				this.add('-start', pokemon, 'shrunken', '[silent]');
			}
			if (pokemon.side.sideConditions['goldenmushroom']) {
				this.add('-start', pokemon, 'goldenmushroom', '[silent]');
			}
		},
		onSwitchOut: function (pokemon) {
			this.add('-end', pokemon, pokemon.template.color, '[silent]');
		}
	},
	{
		name: "CAP",
		section: "Other Metagames",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Allow CAP']
	},
	{
		name: "Battle Factory",
		section: "Other Metagames",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause']
	},
	{
		name: "Challenge Cup 1v1",
		section: "Other Metagames",

		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview 1v1'],
		onBegin: function () {
			this.debug('Cutting down to 1');
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Balanced Hackmons",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3489849/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3515725/\">Balanced Hackmons Suspect Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3525676/\">Balanced Hackmons Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Kyogre-Primal', 'Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter']
	},
	{
		name: "1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3496773/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536109/\">1v1 Viability Ranking</a>"
		],
		section: 'Other Metagames',

		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview 1v1'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky',
			'Xerneas', 'Yveltal', 'Zekrom', 'Focus Sash', 'Kangaskhanite', 'Soul Dew'
		],
		validateTeam: function (team, format) {
			if (team.length > 3) return ['You may only bring up to three Pok\u00e9mon.'];
		},
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Monotype",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3517737/\">Monotype Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Shaymin-Sky', 'Slowbronite', 'Soul Dew'
		]
	},
	{
		name: "Tier Shift",
		desc: [
			"Pok&eacute;mon below OU/BL get all their stats boosted. UU/BL2 get +5, RU/BL3 get +10, and NU or lower get +15.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3532973/\">Tier Shift</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536719/\">Tier Shift Viability Ranking</a>"
		],
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU'],
		banlist: ['Shadow Tag', 'Swift Swim', 'Chatter']
	},
	{
		name: "PU",
		desc: [
			"The unofficial tier below NU.",
			"&bullet; <a href=\"https://www.smogon.com/forums/forums/pu.327/\">PU</a>"
		],
		section: "Other Metagames",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Altarianite', 'Beedrillite', 'Lopunnite', 'Chatter', 'Shell Smash + Baton Pass']
	},
	{
		name: "Inverse Battle",
		desc: [
			"Battle with an inverted type chart.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3518146/\">Inverse Battle</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526371/\">Inverse Battle Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Diggersby', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Serperior',
			'Shaymin-Sky', 'Snorlax', 'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew'
		],
		onNegateImmunity: function (pokemon, type) {
			if (type in this.data.TypeChart && this.runEvent('Immunity', pokemon, null, null, type)) return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		}
	},
	{
		name: "Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528058/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3538917/\">Almost Any Ability Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja', 'Slaking', 'Smeargle', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal',
			'Zekrom',
			'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Chatter'
		],
		validateSet: function (set) {
			var bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				var template = this.getTemplate(set.species || set.name);
				var legalAbility = false;
				for (var i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		}
	},
	{
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3493081/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3512215/\">STABmons Viability Ranking</a>"
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore STAB Moves',
			'Arceus', 'Blaziken', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Diggersby', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja',
			'Groudon', 'Ho-Oh', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus', 'Lugia', 'Mewtwo', 'Palkia',
			'Porygon-Z', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Sylveon', 'Xerneas', 'Yveltal', 'Zekrom',
			'Aerodactylite', 'Altarianite', 'Gengarite', 'Kangaskhanite', "King's Rock", 'Lopunnite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Razor Fang',
			'Salamencite', 'Slowbronite', 'Soul Dew'
		]
	},
	{
		name: "LC UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3523929/\">LC UU</a>"],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Cottonee', 'Croagunk', 'Diglett',
			'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus', 'Gastly', 'Gothita', 'Honedge', 'Larvesta',
			'Lileep', 'Magnemite', 'Mienfoo', 'Munchlax', 'Omanyte', 'Onix', 'Pawniard', 'Ponyta', 'Porygon', 'Scraggy',
			'Shellder', 'Snivy', 'Snubbull', 'Spritzee', 'Staryu', 'Stunky', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby',
			'Shell Smash', 'Corphish', 'Pancham', 'Vulpix', 'Zigzagoon'
		]
	},
	{
		name: "Hackmons Cup",
		section: "Other Metagames",

		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "2v2 Doubles",
		desc: [
			"Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505227/\">2v2 Doubles</a>"
		],
		section: "Other Metagames",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles OU'],
		banlist: ['Perish Song'],
		validateTeam: function (team, format) {
			if (team.length > 4) return ['You may only bring up to four Pok\u00e9mon.'];
		},
		onBegin: function () {
			this.p1.pokemon = this.p1.pokemon.slice(0, 2);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 2);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Averagemons",
		desc: [
			"Every Pok&eacute;mon has a stat spread of 100/100/100/100/100/100.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a>"
		],
		section: "Other Metagames",

		searchShow: false,
		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Sableye + Prankster', 'Shedinja', 'Smeargle', 'Venomoth',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Gengarite', 'Kangaskhanite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter'
		]
	},
	{
		name: "Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a>"
		],
		section: "Other Metagames",

		searchShow: false,
		mod: 'hiddentype',
		ruleset: ['OU']
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3541537/\">OU Theorymon</a>"],
		section: "Other Metagames",

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU']
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber']
	},
	{
		name: "Monotype Random Battle",
		section: "Other Metagames",

		team: 'randomMonotype',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	
	// Past VGC
	///////////////////////////////////////////////////////////////////
	
	{
		name: "VGC 2010",
		section: "Past VGC",
		gameType: 'doubles',
		searchShow: true,
		
		mod: 'gen4',
		maxForcedLevel: 50,
		ruleset: ['Species Clause', 'Item Clause'],
		banlist: ['Unreleased', 'Illegal', 'Soul Dew', 'Huntail + Shell Smash + Sucker Punch', 'Manaphy', 'Mew', 'Arceus', 'Shaymin', 'Darkrai', 'Celebi', 'Jirachi', 'Deoxys', 'Phione'],
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		},
		validateTeam: function (team) {
			if (team.length < 4) return ['You must bring at least four Pokémon.'];
			var legendCount = 0;
			for (var i = 0; i < 4; i++) {
				var pokemon = Tools.getTemplate(team[i].species || team[i].name);
				if (pokemon.species in {'Mewtwo': 1, 'Lugia': 1, 'Ho-Oh': 1, 'Rayquaza': 1, 'Kyogre': 1, 'Groudon': 1, 'Dialga': 1, 'Palkia': 1, 'Giratina': 1}) legendCount ++;
			}
			if (legendCount > 2) return ['You can\'t use more than two of these pokemon: Mewtwo, Lugia, Ho-Oh, Rayquaza, Kyogre, Groudon, Dialga, Palkia, Giratina.'];
		}
	},
	
	// Random Metagames
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Haxmons",
		section: "Random Metagames",

		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Sleep Clause Mod', 'Freeze Clause'],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 0;
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		}
	},
	{
		name: "Random Inverse Battle",
		section: "Random Metagames",
		mod: 'inverse',

		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Sleep Clause Mod']
	},
	{
		name: "Random Sky Battle",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomSky',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Random Ubers",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomUber',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Random LC",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomLC',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Random CAP",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomCap',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Random MonoGen",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomMonoGen',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod']
	},
	{
		name: "Challenge Cup 2-vs-2",
		section: "Random Metagames",
		mod: 'randoms',

		gameType: 'doubles',
		team: 'randomCC',
		searchShow: true,
		ruleset: ['Pokemon', 'Team Preview 2v2', 'HP Percentage Mod'],
		onBegin: function () {
			this.debug('Cutting down to 2');
			this.p1.pokemon = this.p1.pokemon.slice(0, 2);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 2);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Challenge Cup Metronome",
		section: "Random Metagames",
		mod: 'randoms',

		searchShow: true,
		team: 'randomMetro',
		ruleset: ['Pokemon', 'HP Percentage Mod']
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522693\">BW Resources</a>"],
		section: "BW2 Singles",
		column: 3,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Soul Dew']
	},
	{
		name: "[Gen 5] Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522693\">BW Resources</a>"],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: []
	},
	{
		name: "[Gen 5] UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522693\">BW Resources</a>"],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning']
	},
	{
		name: "[Gen 5] RU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522693\">BW Resources</a>"],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning']
	},
	{
		name: "[Gen 5] NU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522693\">BW Resources</a>"],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist']
	},
	{
		name: "[Gen 5] LC",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522693\">BW Resources</a>"],
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Scyther', 'Sneasel', 'Tangela']
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview GBU'],
		banlist: ['Dark Void', 'Sky Drop'],
		onBegin: function () {
			this.debug('cutting down to 3');
			this.p1.pokemon = this.p1.pokemon.slice(0, 3);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 3);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "[Gen 5] Custom Game",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Doubles OU",
		section: 'BW2 Doubles',
		column: 3,

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop'
		]
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview VGC'],
		banlist: ['Dark Void', 'Sky Drop'],
		onBegin: function () {
			this.debug('cutting down to 4');
			this.p1.pokemon = this.p1.pokemon.slice(0, 4);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 4);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "[Gen 5] Doubles Custom Game",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod']
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522692\">DPP Resources</a>"],
		section: "Past Generations",
		column: 3,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 4] Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522692\">DPP Resources</a>"],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus']
	},
	{
		name: "[Gen 4] UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522692\">DPP Resources</a>"],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL']
	},
	{
		name: "[Gen 4] LC",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522692\">DPP Resources</a>"],
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma']
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 4] Doubles Custom Game",
		section: 'Past Generations',

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod']
	},
	{
		name: "[Gen 3] OU",
		section: "Past Generations",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522690\">ADV Resources</a>"],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain']
	},
	{
		name: "[Gen 3] Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522690\">ADV Resources</a>"],
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers']
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 2] OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522689\">GSC Resources</a>"],
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 2] Random Battle",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard']
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522688\">RBY Resources</a>"],
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber']
	},
	{
		name: "[Gen 1] Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3509218/#post-5522688\">RBY Resources</a>"],
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: []
	},
	{
		name: "[Gen 1] OU (tradeback)",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Random Battle",
		section: "Past Generations",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] Challenge Cup",
		section: "Past Generations",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod']
	},
	{
		name: "[Gen 1] Stadium",
		section: "Past Generations",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember'
		]
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod']
	}
];
