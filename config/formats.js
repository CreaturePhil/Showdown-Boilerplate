'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// SM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "SM Singles (beta)",
	},
	{
		name: "[Gen 7] OU",

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Pokebank OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587188/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Bank-Uber', 'Power Construct', 'Shadow Tag'],
	},
	{
		name: "[Gen 7] Pokebank Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>"],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] Pokebank LC",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>"],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: ['Drifloon', 'Gligar', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Yanma', 'Eevium Z', 'Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 7] Pokebank Anything Goes",

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] Battle Spot Singles",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587201/\">Battle Spot Singles Viability Ranking</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
		requirePentagon: true,
		onValidateSet: function (set) {
			let localDex = {
				"Abra":1, "Absol":1, "Aegislash":1, "Aerodactyl":1, "Alakazam":1, "Alomomola":1, "Araquanid":1, "Arcanine":1, "Archen":1, "Archeops":1, "Ariados":1, "Axew":1, "Azumarill":1, "Azurill":1, "Bagon":1, "Barboach":1, "Bastiodon":1, "Bayleef":1, "Beldum":1, "Bellsprout":1, "Bewear":1, "Blissey":1, "Boldore":1, "Bonsly":1, "Bounsweet":1, "Braviary":1, "Brionne":1, "Bruxish":1, "Budew":1, "Butterfree":1, "Buzzwole":1, "Carbink":1, "Carracosta":1, "Carvanha":1, "Castform":1, "Caterpie":1, "Celesteela":1, "Chandelure":1, "Chansey":1, "Charjabug":1, "Chikorita":1, "Chinchou":1, "Clefable":1, "Clefairy":1, "Cleffa":1, "Cloyster":1, "Comfey":1, "Conkeldurr":1, "Corsola":1, "Cottonee":1, "Crabominable":1, "Crabrawler":1, "Cranidos":1, "Crobat":1, "Croconaw":1, "Cubone":1, "Cutiefly":1, "Cyndaquil":1, "Dartrix":1, "Decidueye":1, "Deino":1, "Delibird":1, "Dewott":1, "Dewpider":1, "Dhelmise":1, "Diglett":1, "Ditto":1, "Doublade":1, "Dragonair":1, "Dragonite":1, "Drampa":1, "Dratini":1, "Drifblim":1, "Drifloon":1, "Drowzee":1, "Dugtrio":1, "Duosion":1, "Eelektrik":1, "Eelektross":1, "Eevee":1, "Electabuzz":1, "Electivire":1, "Elekid":1, "Emboar":1, "Emolga":1, "Espeon":1, "Exeggcute":1, "Exeggutor":1, "Fearow":1, "Feebas":1, "Feraligatr":1, "Finneon":1, "Flareon":1, "Fletchinder":1, "Fletchling":1, "Flygon":1, "Fomantis":1, "Fraxure":1, "Froslass":1, "Gabite":1, "Garbodor":1, "Garchomp":1, "Gastly":1, "Gastrodon":1, "Gengar":1, "Geodude":1, "Gible":1, "Gigalith":1, "Glaceon":1, "Glalie":1, "Golbat":1, "Goldeen":1, "Golduck":1, "Golem":1, "Golisopod":1, "Goodra":1, "Goomy":1, "Gothita":1, "Gothitelle":1, "Gothorita":1, "Granbull":1, "Graveler":1, "Grimer":1, "Growlithe":1, "Grubbin":1, "Gumshoos":1, "Gurdurr":1, "Guzzlord":1, "Gyarados":1, "Hakamo-o":1, "Happiny":1, "Hariyama":1, "Haunter":1, "Haxorus":1, "Herdier":1, "Honchkrow":1, "Honedge":1, "Horsea":1, "Hydreigon":1, "Hypno":1, "Igglybuff":1, "Incineroar":1, "Jangmo-o":1, "Jigglypuff":1, "Jolteon":1, "Kadabra":1, "Kangaskhan":1, "Kartana":1, "Kingdra":1, "Klang":1, "Klefki":1, "Klink":1, "Klinklang":1, "Komala":1, "Kommo-o":1, "Krokorok":1, "Krookodile":1, "Lampent":1, "Lanturn":1, "Lapras":1, "Leafeon":1, "Leavanny":1, "Ledian":1, "Ledyba":1, "Lilligant":1, "Lillipup":1, "Litten":1, "Litwick":1, "Lucario":1, "Lumineon":1, "Lurantis":1, "Luvdisc":1, "Luxio":1, "Luxray":1, "Lycanroc":1, "Machamp":1, "Machoke":1, "Machop":1, "Magby":1, "Magikarp":1, "Magmar":1, "Magmortar":1, "Magnemite":1, "Magneton":1, "Magnezone":1, "Makuhita":1, "Mamoswine":1, "Mandibuzz":1, "Mankey":1, "Mareanie":1, "Marill":1, "Marowak":1, "Masquerain":1, "Meganium":1, "Meowth":1, "Metagross":1, "Metang":1, "Metapod":1, "Milotic":1, "Miltank":1, "Mimikyu":1, "Minior":1, "Misdreavus":1, "Mismagius":1, "Morelull":1, "Mudbray":1, "Mudsdale":1, "Muk":1, "Munchlax":1, "Murkrow":1, "Nihilego":1, "Ninetales":1, "Nosepass":1, "Oranguru":1, "Oricorio":1, "Oshawott":1, "Palossand":1, "Pancham":1, "Pangoro":1, "Paras":1, "Parasect":1, "Passimian":1, "Pelipper":1, "Persian":1, "Petilil":1, "Phantump":1, "Pheromosa":1, "Pichu":1, "Pignite":1, "Pikachu":1, "Pikipek":1, "Piloswine":1, "Pinsir":1, "Politoed":1, "Poliwag":1, "Poliwhirl":1, "Poliwrath":1, "Popplio":1, "Porygon":1, "Porygon-Z":1, "Porygon2":1, "Primarina":1, "Primeape":1, "Probopass":1, "Psyduck":1, "Pyukumuku":1, "Quilava":1, "Raichu":1, "Rampardos":1, "Raticate":1, "Rattata":1, "Relicanth":1, "Reuniclus":1, "Rhydon":1, "Rhyhorn":1, "Rhyperior":1, "Ribombee":1, "Riolu":1, "Rockruff":1, "Roggenrola":1, "Roselia":1, "Roserade":1, "Rowlet":1, "Rufflet":1, "Sableye":1, "Salamence":1, "Salandit":1, "Salazzle":1, "Samurott":1, "Sandile":1, "Sandshrew":1, "Sandslash":1, "Sandygast":1, "Scizor":1, "Scolipede":1, "Scyther":1, "Seaking":1, "Sealeo":1, "Serperior":1, "Servine":1, "Sewaddle":1, "Sharpedo":1, "Shelgon":1, "Shellder":1, "Shellos":1, "Shieldon":1, "Shiinotic":1, "Shinx":1, "Silvally":1, "Skarmory":1, "Slaking":1, "Slakoth":1, "Sliggoo":1, "Slowbro":1, "Slowking":1, "Slowpoke":1, "Smeargle":1, "Sneasel":1, "Snivy":1, "Snorlax":1, "Snorunt":1, "Snubbull":1, "Solosis":1, "Spearow":1, "Spheal":1, "Spinarak":1, "Spinda":1, "Staraptor":1, "Staravia":1, "Starly":1, "Starmie":1, "Staryu":1, "Steenee":1, "Stoutland":1, "Stufful":1, "Sudowoodo":1, "Surskit":1, "Swadloon":1, "Swinub":1, "Sylveon":1, "Talonflame":1, "Tapu Bulu":1, "Tapu Fini":1, "Tapu Koko":1, "Tapu Lele":1, "Tauros":1, "Tentacool":1, "Tentacruel":1, "Tepig":1, "Timburr":1, "Tirtouga":1, "Togedemaru":1, "Togekiss":1, "Togepi":1, "Togetic":1, "Torkoal":1, "Torracat":1, "Totodile":1, "Toucannon":1, "Toxapex":1, "Trapinch":1, "Trevenant":1, "Trubbish":1, "Trumbeak":1, "Tsareena":1, "Turtonator":1, "Tynamo":1, "Type: Null":1, "Typhlosion":1, "Umbreon":1, "Vanillish":1, "Vanillite":1, "Vanilluxe":1, "Vaporeon":1, "Venipede":1, "Vibrava":1, "Victreebel":1, "Vigoroth":1, "Vikavolt":1, "Vullaby":1, "Vulpix":1, "Wailmer":1, "Wailord":1, "Walrein":1, "Weavile":1, "Weepingbel":1, "Whimsicott":1, "Whirlipede":1, "Whiscash":1, "Wigglytuff":1, "Wimpod":1, "Wingull":1, "Wishiwashi":1, "Xurkitree":1, "Yungoos":1, "Zubat":1, "Zweilous":1,
			};
			let template = this.getTemplate(set.species || set.name);
			if (!(template.baseSpecies in localDex)) {
				return [template.baseSpecies + " is not permitted in Battle Spot Singles."];
			}
		},
	},

	// SM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "SM Doubles (beta)",
	},
	{
		name: "Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Pokebank Doubles OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3586596/\">Doubles OU Metagame Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "[Gen 7] Pokebank Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] VGC 2017",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3586596/\">VGC 2017 Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex'],
		banlist: ['Illegal', 'Unreleased', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega'],
		requirePentagon: true,
	},

	// ORAS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Singles",
	},
	{
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3573990/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	},
	{
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3582473/\">np: UU Stage 7.3</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555277/\">UU Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Baton Pass'],
	},
	{
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3583022/\">np: RU Stage 19</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'UU', 'BL2', 'Drizzle', 'Drought'],
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3576747/\">np: NU Stage 15</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555650/\">NU Viability Ranking</a>",
		],

		ruleset: ['RU', 'Baton Pass Speed Clause'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3578583/\">np: PU Stage 9</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],

		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'NU', 'BL4', 'Chatter'],
	},
	{
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	},
	{
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/cap/\">CAP Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['Allow CAP'],
	},
	{
		name: "Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>",
		],

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
        name: "RU Theorymon",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3568052/\">np: RU Stage 15</a>",
            "&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
        ],

        mod: 'rutheorymon',

        ruleset: ['UU'],
        banlist: ['UU', 'BL2'],
  },
	{
		name: "[Gen 6] Random Battle",

		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Custom Game",


		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// ORAS Doubles/Triples
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Doubles/Triples",
	},
	{
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580680/\">np: Doubles OU Stage 5</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	},
	{
		name: "Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: [
			'Aegislash', 'Amoonguss', 'Arcanine', 'Azumarill', 'Bisharp', 'Breloom', 'Charizard-Mega-Y', 'Charizardite Y',
			'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Ferrothorn', 'Garchomp', 'Gardevoir-Mega', 'Gardevoirite',
			'Gastrodon', 'Gengar', 'Greninja', 'Heatran', 'Hitmontop', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi',
			'Kangaskhan-Mega', 'Kangaskhanite', 'Keldeo', 'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Milotic',
			'Politoed', 'Raichu', 'Rotom-Wash', 'Scizor', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon', 'Talonflame',
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcanion', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	},
	{
		name: "VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580592/\">VGC 2016 Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: [
			'Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy', 'Darkrai',
			'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Volcanion', 'Soul Dew',
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
		name: "Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560820/\">Battle Spot Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560824/\">Battle Spot Doubles Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Random Doubles Battle",

		gameType: 'doubles',
		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles Custom Game",

		gameType: 'doubles',

		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>",
		],

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Triples Custom Game",

		gameType: 'triples',

		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 2,
	},
	{
		name: "[Gen 7] Balanced Hackmons",

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Chatter', 'Extreme Evoboost'],
	},
	{
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547279/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558034/\">STABmons Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['Ignore STAB Moves', 'Diggersby', 'Kyurem-Black', 'Porygon-Z', 'Thundurus', 'Aerodactylite', 'Altarianite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},
	// Randomized Metas
	///////////////////////////////////////////////////////////////////
	{
		name: "0v0",
		section: "Randomized Metas",
		column: 2,
		team: 'random', // Just so a team can be generated so the "battle" can occur
		ruleset: [],
		onBegin: function () {
			this.p1.team = this.p2.team = [];
			this.p1.pokemon = this.p2.pokemon = [];
			this.p1.pokemonLeft = this.p2.pokemonLeft = 0;
			let p = 'p' + (this.random(2) + 1);
			this.win(this[p]);
		},
	},
	{
                name: "[Experimental] School",
                section: "Randomized Metas",
                mod: 'seasonalschool',
                team: 'random',
                ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
                onBegin: function() {
                        this.add('-message', "Welcome back to school! Your class schedule is Gym, Math, Lunch, History, and Music! Be sure to get a good night's sleep on school nights!");
                },
                onSwitchIn: function(pokemon) {
                        let halfHour = (pokemon.side.battle.turn - 1) % 15;
                        let classType = '';
                        if (halfHour >= 0 && halfHour < 3)
                                classType = 'Fighting'; //First Period: Gym
                        if (halfHour >= 3 && halfHour < 6)
                                classType = 'Psychic'; //Second Period: Math
                        if (halfHour >= 6 && halfHour < 8)
                                classType = 'Poison'; //Lunch Hour
                        if (halfHour >= 8 && halfHour < 11)
                                classType = 'Rock'; //Third Period: History
                        if (halfHour >= 11 && halfHour < 14)
                                classType = 'Normal'; //Fourth Period: Music
                        if (halfHour == 14)
                                classType = 'Fairy';


                        if (!pokemon.hasType(classType))
                                if (pokemon.addType(classType))
                                        if (classType != '')
                                                this.add('-start', pokemon, 'typeadd', classType); //Add type corresponding to current class
                },
                onBasePower: function(basePower, attacker, defender, move) {
                        let halfHour = (attacker.side.battle.turn - 1) % 15;
                        if (halfHour >= 3 && halfHour < 6)
                                if (!this.willMove(defender)) {
                                        this.debug('Analytic boost');
                                        return this.chainModify([0x14CD, 0x1000]);
                                }
                },
                //onResidual: function(pokemon) {
                //    let halfHour = (pokemon.side.battle.turn - 1) % 15;
                //    if (halfHour >= 6 && halfHour < 8)
                //        this.heal(pokemon.maxhp / 16);
                //},
        },
	{
		name: "[Gen 7] Challenge Cup",
		section: "Randomized Metas",
		column: 2,

		mod: 'gen7',
		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],
		section: "Randomized Metas",

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},

	{
		name: "[Seasonal] Fireworks Frenzy",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "Randomized Metas",
		column: 2,

		team: 'randomSeasonalFireworks',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "A fireworks show is starting!");
			// this.add('-weather', 'Fireworks'); // un-comment when the client supports custom named weathers
		},
		onResidual: function () {
			if (this.isWeather('')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			if (!target.hasType('Fire')) this.damage(target.maxhp / 16, target, null, 'exploding fireworks');
		},
	},
	{
		name: "Battle Factory",
		section: "Randomized Metas",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "Rock, Paper, Scissors",
		desc: ["&bullet; Test your luck with RPS!"],
		section: "Randomized Metas",
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		mod: 'rpg',
		team: 'randomRPS',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "ROCK!");
			this.add('message', "PAPER!");
			this.add('message', "SCISSORS!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				for (let j = 0; j < pokemon.moveset.length; j++) {
					let moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target.volatiles['flipside']) return;
			if (move && move.id === 'retreat') return;
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/Zarel/Pokemon-Showdown/blob/129d35d5eefb295b1ec24f3e1985a586da3f049c/mods/seasonal/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.


			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			let sentences = [];
			let sentence = '';
			if(name === 'rock') {
				this.add('Rock!');
			}
			if(name === 'paper') {
				this.add('Paper!');
			}
			if(name === 'scissors') {
				this.add('Scissors!');
			}
		},
		onModifyPokemon: function (pokemon) {
			let name = toId(pokemon.name);
		},
	},
	{
		name: "Dragon Heaven Super Staff Bros [Beta]",
		desc: ["&bullet; The staff here becomes a Pokemon and battles!"],
		section: "Randomized Metas",
		mod: 'dhssb',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|Dragon Heaven Super Staff Bros. <b>RAWWWWWWWWWWWWWR!!!!</b>");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
				if (name=="diarmuidodyna")
				{
					pokemon.types[1]="Ice";
				}
				if (name=="thetruefalcon")
				{
					pokemon.types[1]="Fighting";
				}
				if (name=="thetruefalcon")
				{
					pokemon.types=["Dragon"];
				}
				for (let j = 0; j < pokemon.moveset.length; j++) {
					let moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		onNegateImmunity: function (pokemon, type) {
			if (pokemon.volatiles['flipside']) return false;
			const foes = pokemon.side.foe.active;
			if (foes.length && foes[0].volatiles['samuraijack'] && pokemon.hasType('Dark') && type === 'Psychic') return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target.volatiles['flipside']) return;
			if (move && move.id === 'retreat') return;
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.


			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			let sentences = [];
			let sentence = '';
			if(name === 'spandan') {
				this.add('c|~Spandan|o shit waddup!');
			}
			if(name === 'thetruefalcon') {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
			if(name === 'diarmuidodyna') {
				this.add('c|&Diarmuid O\'Dyna|OMG can i help yoU?');
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
			if(name === 'hydrostatics') {
				this.add('c|+Hydrostatics|Gl, Hf Kid');
			}
			if(name === 'quietchimchar') {
				this.add('c| Quiet Chimchar|Introducing the best starter ever!!');
			}
			if(name === 'alphapaul71') {
				this.add('c| Alpha Paul☯71|!htmlbox');
				this.add('raw|<button name="parseCommand" value="/user alphapaul71">My Owner!</button>');
			}
                        if(name === 'zmeeed') {
                                this.add("c|@Zmeeed|For Mother Russia!");
                        }
			if(name === 'digitaledge') {
				this.add('c|&Digital Edge|__**Mo is our lord and savior!**__');
			}
			if(name === 'snakexzero5') {
				this.add('c| SnakeXZero5|A project on Friday and its Monday, YAY!');
			}
			if (name === 'elcrest') {
				this.add('c| Elcrest|Get ready to be blown away.');
			}
			if(name === 'classyz') {
				pokemon.addVolatile('simpleinnate', pokemon);
				this.add('c|&ClassyZ|pro tip: if u kill me go straight to hell do not pass go do not collect $200');
			}
			if(name === 'flygonerz') {
				this.add('c|@Flygonerz|The Sand Dweller has arrived');
			}
			if(name === 'pieddychomp') {
				this.add('c|&PI★EddyChomp|Hey guys, watch me KO this guy lmao xaa :)');
			}
			if(name === 'snaq') {
				this.add('c|~Snaq|Sup duds');
			}
			if(name === 'snaquaza') {
				this.add('c|~Snaquaza|Wait, why ain\'t I playing Random Haxmons instead?');
			}
			if(name === 'thegodofhaxorus') {
				this.add('c| The God of Haxorus|Hi! I\'m a **Hax**orus :3');
			}
			if(name === 'loominite') {
				this.add('c|+Loominite|Okay, lets go :I');
			}
			if(name === 'eternalmayhem') {
				this.add('c| Eternal Mayhem|Let the music overcome you, control you.');
			}
			if(name === 'charizard8888') {
				this.add('c|&charizard8888|It\'s **Outragin\' Time !!**');
			}
			if(name === 'theswordbreaker') {
				this.add('c|@Theswordbreaker|It\'s time to break some blades >:)');
			}
			if(name === 'ransei') {
				this.add('c|~Ransei|yo');
			}
			if(name === 'xprienzo') {
 				this.add('c|⚔XpRienzo ☑-☑|Wait, was I supposed to do something?');
 			}
 			if (name === 'batterbotto') {
 				this.add('c|*BatterBotto|Beep Boop');
 			}
 			if (name === 'flareondriod') {
 				this.add('c|*FlareonDriod|Beep Beep');
 			}
 			if (name === 'dragitbot') {
 				this.add('c|*Dragitbot|Boop Boop');
 			}
 			if (name === 'outrageousbot') {
 				this.add('c|*OutrageousBoT|Boop Beep');
 			}
 			if (name === 'shivam rustagi') {
 				this.add('c|%shivam rustagi|__**i am here to destroy ur life!**__');
 			}
		},
		onFaint: function (pokemon, source, effect) {
			let name = toId(pokemon.name);
			//let opp = toId(source.name);
			if (name === 'spandan') {
				this.add('c|~Spandan|Gr8 b8, m8. I rel8, str8 appreci8, and congratul8. I r8 this b8 an 8/8. Plz no h8, I\'m str8 ir8. Cre8 more, can\'t w8. We should convers8, I won\'t ber8, my number is 8888888, ask for N8. No calls l8 or out of st8. If on a d8, ask K8 to loc8. Even with a full pl8, I always have time to communic8 so don\'t hesit8');
			}
			if(name === 'diarmuidodyna') {
				this.add('c|&Diarmuid O\'Dyna|awwww okieee');
			}
			if(name === 'alphapaul71') {
				this.add('c| Alpha Paul☯71|RIP Me feelsbd');
			}
			if(name === 'hydrostatics') {
				this.add('c|+Hydrostatics|Cya next time Kid. I will not take it easy on you from next time.');
			}
			if(name === 'quietchimchar') {
				this.add('c| Quiet Chimchar|I\'ll get you next time!');
			}
                        if(name == 'zmeeed') {
                                this.add("c|@Zmeeed|CYKABLYAT");
                        }
			if(name === 'digitaledge') {
				this.add('c|&Digital Edge|u haxor u didnt get haxed');
			}
			if (name === 'elcrest') {
				this.add('c| Elcrest|It seems that I can\'t control my turbulence....');
			}
			if(name === 'snakexzero5') {
				this.add('c| SnakeXZero5|I JUST FORGOT THERES A SUDDEN PROJECT TOMMOROW');
			}
			if(name === 'classyz') {
				this.add('c|&ClassyZ|go straight to hell do not pass go do not collect $200');
			}
			if(name === 'flygonerz') {
				this.add('c|@Flygonerz|Plox nerf, Ninten__doh__!');
			}
			if(name === 'pieddychomp') {
				this.add("c|&PI★EddyChomp|Fuck this shit, I got rekt. I\'ll get MY REVENGE! RAWR!!!!");
			}
			if(name === 'snaq') {
				this.add("c|~Snaq|rip in pieces");
			}
			if(name === 'snaquaza') {
				this.add("c|~Snaquaza|Back to the real meta");
			}
			if(name === 'loominite') {
				this.add('c|+Loominite|eh, i\'m out!');
			}
			if (name === 'thegodofhaxorus') {
				this.add('c| The God of Haxorus|My own hax against me -3-');
			}
			if (name === 'charizard8888') {
				this.add('c|&charizard8888|I\'m Outta here!');
			}
			if(name === 'theswordbreaker') {
				this.add('c|@Theswordbreaker|Feh....I.....resign from this farce....ehh');
			}
			if (name === 'xprienzo') {
 				this.add('c|⚔XpRienzo ☑-☑|Bleh');
 			}
 			if(name === 'eternalmayhem') {
				this.add('c| Eternal Mayhem|The music was too powerful.');
			}
 			if (name === 'ransei') {
 				this.add('c|~Ransei|ripsei');
 			}
 			if (name === 'batterbotto') {
 				this.add('c|*BatterBotto|Beep Boop');
 			}
 			if (name === 'flareondriod') {
 				this.add('c|*FlareonDriod|Beep Beep');
 			}
 			if (name === 'dragitbot') {
 				this.add('c|*Dragitbot|Boop Boop');
 			}
 			if (name === 'outrageousbot') {
 				this.add('c|*OutrageousBoT|Boop Beep');
 			}
 			if (name === 'shivam rustagi') {
 				this.add('c|%shivam rustagi|u will be cursed for ever');
 			}
//Wreck phrase test
/*			if(opp=="hydrostatics")
			this.add("c|~Hydrostatics|Git Gud Kid");
			if(opp=="tejas10")
			this.add("c|+Tejas10|Cena sucks!");
			if(opp=="Lost Cause 146")
			this.add("c|$Lost Cause 146|you cannot stop me.");
*/
		},
		// Special switch-out events for some mons.
		onSwitchOut: function (pokemon) {
			let name = toId(pokemon.name);

			if (!pokemon.illusion) {
				if (name === 'hippopotas') {
					this.add('-message', 'The sandstorm subsided.');
				}
			}
			//Switchout phrase
			if(name=="spandan") this.add("c|~Spandan|brb");
			if(name=="shivam rustagi") this.add("c|%shivam rustagi|I'll be back to haunt u till eternity"); //testing, hope it works

			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
		},
		onModifyPokemon: function (pokemon) {
			let name = toId(pokemon.name);
		},
	},
	{
		name: "[Main] Super Staff Bros. Melee",
		section: "Randomized Metas",
		mod: 'ssbm',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|Super Staff Bros. <b>MELEEEEEEEEEEEEEE</b>!!");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				for (let j = 0; j < pokemon.moveset.length; j++) {
					let moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Here we add some flavour or design immunities.
		onImmunity: function (type, pokemon) {
			if (toId(pokemon.name) === 'juanma' && type === 'Fire') {
				this.add('-message', "Did you think fire would stop __him__? You **fool**!");
				return false;
			}
		},
		onNegateImmunity: function (pokemon, type) {
			if (pokemon.volatiles['flipside']) return false;
			const foes = pokemon.side.foe.active;
			if (foes.length && foes[0].volatiles['samuraijack'] && pokemon.hasType('Dark') && type === 'Psychic') return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target.volatiles['flipside']) return;
			if (move && move.id === 'retreat') return;
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Adaptability');
				}
				if (name === 'reisen' && pokemon.getAbility().id === 'hugepower') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Tough Claws');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
					this.add('-ability', pokemon, 'Simple');
				}
				if (name === 'dreameatergengar' && pokemon.getAbility().id === 'shadowtag') {
					pokemon.setAbility('infiltrator');
					this.add('-ability', pokemon, 'Infiltrator');
				}
				if (name === 'overneat' && pokemon.getAbility().id === 'speedboost') {
					pokemon.setAbility('noguard');
					this.add('-ability', pokemon, 'No Guard');
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, 'Shed Skin');
				}
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
			}
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/Zarel/Pokemon-Showdown/blob/129d35d5eefb295b1ec24f3e1985a586da3f049c/mods/seasonal/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Adaptability');
				}
				if (name === 'reisen' && pokemon.getAbility().id === 'hugepower') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Tough Claws');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
					this.add('-ability', pokemon, 'Simple');
				}
				if (name === 'dreameatergengar' && pokemon.getAbility().id === 'shadowtag') {
					pokemon.setAbility('infiltrator');
					this.add('-ability', pokemon, 'Infiltrator');
				}
				if (name === 'overneat' && pokemon.getAbility().id === 'speedboost') {
					pokemon.setAbility('noguard');
					this.add('-ability', pokemon, 'No Guard');
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, 'Shed Skin');
				}
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
			} else {
				// Bypass one mega limit.
				pokemon.canMegaEvo = this.canMegaEvo(pokemon);
			}

			// Innate effects.
			if (name === 'ascriptmaster') {
				pokemon.addVolatile('ascriptinnate', pokemon);
			}
			if (name === 'atomicllamas') {
				pokemon.addVolatile('baddreamsinnate', pokemon);
			}
			if (name === 'blastchance') {
				pokemon.addVolatile('flipside', pokemon);
			}
			if (name === 'bondie') {
				pokemon.addVolatile('crabstance', pokemon);
			}
			if (name === 'clefairy') {
				pokemon.addVolatile('coldsteel', pokemon);
			}
			if (name === 'duck') {
				pokemon.addVolatile('firstblood', pokemon);
			}
			if (name === 'eeveegeneral') {
				this.add('detailschange', pokemon, pokemon.details); //run mega evo animation
				this.add('-mega', pokemon, 'Eevee', null);
				for (let i = 0; i < pokemon.stats.length; i++) {
					pokemon.stats[i] += 50;
				}
			}
			if (name === 'formerhope') {
				pokemon.addVolatile('cursedbodyinnate', pokemon);
			}
			if (name === 'galbia' || name === 'aurora') {
				this.setWeather('sandstorm');
			}
			if (name === 'rodan') {
				pokemon.addVolatile('gonnamakeyousweat', pokemon);
			}
			if (name === 'giagantic') {
				pokemon.addVolatile('deltastreaminnate', pokemon);
			}
			if (name === 'hashtag') {
				this.boost({spe:1}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'haund') {
				pokemon.addVolatile('prodigy', pokemon);
			}
			if (name === 'innovamania' && !pokemon.illusion) {
				this.boost({atk:6, def:6, spa:6, spd:6, spe:6, accuracy:6}, pokemon, pokemon, 'divine grace');
			}
			if (name === 'jackhiggins') {
				this.setWeather('sunnyday');
			}
			if (name === 'lemonade') {
				pokemon.addVolatile('adaptabilityinnate', pokemon);
			}
			if (name === 'manu11') {
				pokemon.addVolatile('arachnophobia', pokemon);
			}
			if (name === 'marshmallon') {
				this.boost({def: 1}, pokemon, pokemon, 'fur coat innate');
			}
			if (name === 'mizuhime' || name === 'kalalokki' || name === 'sweep') {
				this.setWeather('raindance');
			}
			if (name === 'nv') {
				pokemon.addVolatile('cuteness', pokemon);
			}
			if (name === 'pikachuun') {
				this.boost({spe: 1}, pokemon, pokemon, 'Reisen Cosplay');
			}
			if (name === 'qtrx') {
				pokemon.addVolatile('qtrxinnate', pokemon);
			}
			if (name === 'raseri') {
				this.useMove('hypnosis', pokemon);
			}
			if (name === 'rssp1') {
				pokemon.addVolatile('speedboostinnate', pokemon);
			}
			if (name === 'scythernoswiping') {
				pokemon.addVolatile('mountaineerinnate', pokemon);
			}
			if (name === 'sigilyph') {
				pokemon.addVolatile('samuraijack', pokemon);
			}
			if (name === 'sonired') {
				this.boost({def: -1, spd: -1, atk: 1, spe: 1}, pokemon, pokemon, 'Weak Skin');
			}
			if (name === 'snobalt') {
				pokemon.addVolatile('amityabsorb', pokemon);
			}
			if (name === 'spacebass') {
				pokemon.addVolatile('badtrip', pokemon);
			}
			if (name === 'sparktrain') {
				pokemon.addVolatile('refrigerateinnate', pokemon);
			}
			if (name === 'specsmegabeedrill') {
				pokemon.addVolatile('weed', pokemon);
			}
			if (name === 'starmei') {
				this.useMove('cosmicpower', pokemon);
			}
			if (name === 'talkingtree') {
				this.useMove('synthesis', pokemon);
				this.useMove('bulkup', pokemon);
			}
			if (name === 'teremiare') {
				pokemon.addVolatile('coinflip', pokemon);
			}
			if (name === 'trickster' || name === 'blitzamirin') {
				let target = pokemon.battle[pokemon.side.id === 'p1' ? 'p2' : 'p1'].active[0];
				let targetBoosts = {};
				let sourceBoosts = {};
				for (let i in target.boosts) {
					targetBoosts[i] = target.boosts[i];
					sourceBoosts[i] = pokemon.boosts[i];
				}
				target.setBoost(sourceBoosts);
				pokemon.setBoost(targetBoosts);
				this.add('-swapboost', pokemon, target);
			}
			if (name === 'unfixable') {
				pokemon.addVolatile('ironbarbsinnate', pokemon);
			}
			if (name === 'urkerab') {
				pokemon.addVolatile('focusenergy', pokemon);
				this.useMove('magnetrise', pokemon);
			}
			if (name === 'uselesstrainer') {
				pokemon.addVolatile('ninja', pokemon);
			}
			if (name === 'winry') {
				pokemon.addVolatile('hellacute', pokemon);
			}

			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			let sentences = [];
			let sentence = '';

			if (name === 'acast') {
				this.add('c|%Acast|__A wild Castform appeared!__');
			}
			if (name === 'ace') {
				this.add('c|@Ace|Lmaonade');
			}
			if (name === 'aelita') {
				this.add('c|%Aelita|Transfer, Aelita. Scanner, Aelita. Virtualization!');
			}
			if (name === 'ajhockeystar') {
				this.add('c|+ajhockeystar|Here comes the greatest hockey player alive!');
			}
			if (name === 'albacore') {
				this.add('c|@Albacore|do I have to?');
			}
			if (name === 'albert') {
				this.add('c|+Albert|Art is risk.');
			}
			if (name === 'always') {
				sentence = (pokemon.side.foe.active.length && pokemon.side.foe.active[0].hp ? pokemon.side.foe.active[0].name : "... ohh nobody's there...");
				this.add('c|+Always|Oh it\'s ' + sentence);
			}
			if (name === 'am') {
				this.add('c|+AM|Lucky and Bad');
			}
			if (name === 'andy') {
				this.add('c|%AndrewGoncel|:I');
			}
			if (name === 'antemortem') {
				this.add('c|&antemortem|I Am Here To Oppress Users');
			}
			if (name === 'anttya') {
				this.add('c|+Anttya|Those crits didn\'t even matter');
			}
			if (name === 'anty') {
				this.add('c|+Anty|mhm');
			}
			if (name === 'articuno') {
				this.add('c|%Articuno|Abolish the patriarchy!');
			}
			if (name === 'ascriptmaster') {
				this.add("c|@Ascriptmaster|It's time for a hero to take the stage!");
			}
			if (name === 'astara') {
				this.add('c|%Ast☆arA|I\'d rather take a nap, I hope you won\'t be a petilil shit, Eat some rare candies and get on my level.');
			}
			if (name === 'asty') {
				this.add('c|@Asty|Top kek :^)');
			}
			if(name === 'spandan') {
				this.add('c|~Spandan|o shit waddup!');
			}
			if(name === 'classyz') {
				this.add('c|%ClassyZ|pro tip: if u kill me go straight to hell do not pass go do not collect $200');
			}
			if(name === 'flygonerz') {
				this.add('c|@Flygonerz|The Sand Dweller has arrived');
			}
			if(name === 'pieddychomp') {
				this.add('c|&PI★EddyChomp|Hey guys, watch me KO this guy lmao xaa :)');
			}
			if(name === 'thegodofhaxorus') {
				this.add('c|@The God of Haxorus|Hi! I\'m a **Hax**orus :3');
			}
			if(name === 'loominite') {
				this.add('c|&Loominite|Okay, lets go :I');
			}
			if(name === 'charizard8888') {
				this.add('c|&charizard8888|It\'s **Outragin\' Time !!**');
			}
			if(name === 'ransei') {
				this.add('c|~Ransei|yo');
			}
			if(name === 'xprienzo') {
 				this.add('c|⚔XpRienzo ☑-☑|Wait, was I supposed to do something?');
 			}
			if (name === 'atomicllamas') {
				this.add('c|&atomicllamas|(celebrate)(dog)(celebrate)');
			}
			if (name === 'aurora') {
				this.add('c|@Aurora|Best of luck to all competitors!');
			}
			if (name === 'reisen') {
				this.add('c|%Reisen|Fite me irl bruh.');
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|Grovel peasant, you are in the presence of the RNGesus');
			}
			if (name === 'biggie') {
				sentences = ["Now I'm in the limelight cause I rhyme tight", "HAPPY FEET! WOMBO COMBO!", "You finna mess around and get dunked on"];
				this.add('c|@biggie|' + sentences[this.random(3)]);
			}
			if (name === 'blastchance') {
				this.add("c|+Blast Chance|MAN BALAMAR");
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|How Can Mirrors Be Real If Our Eyes Aren\'t Real? ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'bludz') {
				this.add('c|+bludz|420 blaze it');
			}
			if (name === 'bondie') {
				this.add('c|+Bondie|__(\\/) snip snip (\\/)__');
			}
			if (name === 'bottt') {
				this.add('c|boTTT|Beep, boop');
			}
			if (name === 'brandon') {
				this.add("c|+Brrandon|Life's too short to take it seriously ALL the time.");
			}
			if (name === 'bumbadadabum') {
				this.add('c|@bumbadadabum|Time for card games on motorcycles!');
				if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'Scotteh') this.add('c|@bumbadadabum|Also, fuck you Scotteh');
			}
			if (name === 'bummer') {
				this.add("c|&Bummer|Oh hi.");
			}
			if (name === 'chaos') {
				this.add("c|~chaos|I always win");
			}
			if (name === 'ciran') {
				this.add("c|+Ciran|You called?");
			}
			if (name === 'clefairy') {
				this.add('c|+Clefairy|google "dj clefairyfreak" now');
			}
			if (name === 'coolstorybrobat') {
				sentence = [
					"Time to GET SLAYED", "BRUH!", "Ahem! Gentlemen...", "I spent 6 months training in the mountains for this day!",
					"Shoutout to all the pear...",
				][this.random(5)];
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'crestfall') {
				this.add('c|%Crestfall|To say that we\'re in love is dangerous');
			}
			if (name === 'deathonwings') {
				this.add('c|+Death on Wings|rof');
			}
			if (name === 'dirpz') {
				this.add('c|+Dirpz|IT\'S A WATER/FAIRY TYPE!!11!');
			}
			if (name === 'dmt') {
				this.add('c|+DMT|DMT');
			}
			if (name === 'dreameatergengar') {
				this.add('c|+Dream Eater Gengar|Goodnight sweet prince.');
			}
			if (name === 'duck') {
				this.add('c|@Duck|Don\'t duck with me!');
			}
			if (name === 'e4flint') {
				this.add('c|+E4 Flint|hf lul');
			}
			if (name === 'eeveegeneral') {
				sentences = ['yo', 'anyone seen goku?'];
				this.add('c|~Eevee General|' + sentences[this.random(2)]);
			}
			if (name === 'eyan') {
				this.add('c|@Eyan|░░░░░░░░▄▄▄▀▀▀▄▄███▄░░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░░░░▄▀▀░░░░░░░▐░▀██▌░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░░▄▀░░░░▄▄███░▌▀▀░▀█░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌░░░░░░░░░░░░░░░ ');
				this.add('c|@Eyan|░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄░░░░░░░░░');
				this.add('c|@Eyan|░░░░░░░░░░░░░▐░░░░▐███████████▄░░░░░░');
				this.add('c|@Eyan|░░░░░le░░░░░░░▐░░░░▐█████████████▄░░░');
				this.add('c|@Eyan|░░░░toucan░░░░░░▀▄░░░▐██████████████▄');
				this.add('c|@Eyan|░░░░░░has░░░░░░░░▀▄▄████████████████▄');
				this.add('c|@Eyan|░░░░░arrived░░░░░░░░░░░░█▀██████░░░░░');
				this.add('c|@Eyan|WELCOME TO COMPETITIVE TOUCANNING');
			}
			if (name === 'feliburn') {
				this.add('c|@Feliburn|you don\'t go hand to hand with a fighter noob');
			}
			if (name === 'fireburn') {
				this.add('c|+Fireburn|:V');
			}
			if (name === 'flyingkebab') {
				this.add("c|+Flying Kebab|Kebab > Pizza");
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|I have Hope');
			}
			if (name === 'freeroamer') {
				this.add('c|%Freeroamer|lol this is a wrap');
			}
			if (name === 'frysinger') {
				this.add("c|+Frysinger|Nice boosts kid.");
			}
			if (name === 'fx') {
				this.add("c|+f(x)|love is 4 wawawawawawawalls");
			}
			if (name === 'galbia') {
				this.add('c|@galbia|(dog)');
			}
			if (name === 'galom') {
				this.add('c|+Galom|To the end.');
			}
			if (name === 'rodan') { // don't delete
				this.add("c|+RODAN|Here I Come, Rougher Than The Rest of 'Em.");
			}
			if (name === 'geoffbruedly') {
				this.add("c|%GeoffBruedly|FOR WINRY");
			}
			if (name === 'giagantic') {
				this.add("c|%Giagantic|e.e");
			}
			if (name === 'golui') {
				this.add("c|+Golui|Golly gee");
			}
			if (name === 'goodmorningespeon') {
				this.add("c|+GoodMorningEspeon|type /part to continue participating in this battle :)");
			}
			if (name === 'grimauxiliatrix') {
				this.add("c|%grimAuxiliatrix|ᕕ( ᐛ )ᕗ");
			}
			if (name === 'halite') {
				this.add('c|@Halite|You’re gonna get haxxed kid :^)');
			}
			if (name === 'hannah') {
				this.add('c|+Hannahh|♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥');
			}
			if (name === 'hashtag') {
				this.add("c|#Hashtag|hey opponent, you get 5 hashtag points if you forfeit right now ;}");
			}
			if (name === 'haund') {
				this.add('c|%Haund|le balanced normal flying bird has arrived');
			}
			if (name === 'healndeal') {
				this.add('c|+HeaLnDeaL|screw clerics');
			}
			if (name === 'himynamesl') {
				this.add('c|@HiMyNamesL|There’s no such thing as winning or losing. There is won and there is lost, there is victory and defeat. There are absolutes. Everything in between is still left to fight for.');
				this.add('c|@HiMyNamesL|' + pokemon.side.foe.name + ' will have won only when there is no one left to stand against them. Until then, there is only the struggle, because tides do what tides do – they turn.');
			}
			if (name === 'hippopotas') {
				this.add('-message', '@Hippopotas\'s Sand Stream whipped up a sandstorm!');
			}
			if (name === 'hollywood') {
				this.add('c|+hollywood|Kappa');
			}
			if (name === 'ih8ih8sn0w') {
				this.add('c|+ih8ih8sn0w|*sips tea*');
			}
			if (name === 'imanalt') {
				this.add('c|+imanalt|muh bulk');
			}
			if (name === 'imas234') {
				this.add('c|@imas234|hlo');
			}
			if (name === 'innovamania') {
				sentences = ['Don\'t take this seriously', 'These Black Glasses sure look cool', 'Ready for some fun?( ͡° ͜ʖ ͡°)', '( ͡° ͜ʖ ͡°'];
				this.add('c|@innovamania|' + sentences[this.random(4)]);
			}
			if (name === 'iplaytennislol') {
				this.add('c|%iplaytennislol|KACAW');
			}
			if (name === 'iyarito') {
				this.add('c|+Iyarito|Welp');
			}
			if (name === 'jackhiggins') {
				this.add("c|+Jack Higgins|Ciran was right, fun deserved to be banned");
			}
			if (name === 'jasmine') {
				this.add("c|+Jasmine|I'm still relevant!");
			}
			if (name === 'jdarden') {
				this.add('c|@jdarden|Did someone call for some BALK?');
			}
			if (name === 'jetpack') {
				this.add('c|+Jetpack|You\'ve met with a terrible fate, haven\'t you?');
			}
			if (name === 'joim') {
				let dice = this.random(8);
				if (dice === 1) {
					this.add('c|~Joim|░░░░░░░░░░░░▄▐');
					this.add('c|~Joim|░░░░░░▄▄▄░░▄██▄');
					this.add('c|~Joim|░░░░░▐▀█▀▌░░░░▀█▄');
					this.add('c|~Joim|░░░░░▐█▄█▌░░░░░░▀█▄');
					this.add('c|~Joim|░░░░░░▀▄▀░░░▄▄▄▄▄▀▀');
					this.add('c|~Joim|░░░░▄▄▄██▀▀▀▀');
					this.add('c|~Joim|░░░█▀▄▄▄█░▀▀');
					this.add('c|~Joim|░░░▌░▄▄▄▐▌▀▀▀');
					this.add('c|~Joim|▄░▐░░░▄▄░█░▀▀ U HAVE BEEN SPOOKED');
					this.add('c|~Joim|▀█▌░░░▄░▀█▀░▀');
					this.add('c|~Joim|░░░░░░░▄▄▐▌▄▄ BY THE');
					this.add('c|~Joim|░░░░░░░▀███▀█░▄');
					this.add('c|~Joim|░░░░░░▐▌▀▄▀▄▀▐▄ SPOOKY SKILENTON');
					this.add('c|~Joim|░░░░░░▐▀░░░░░░▐▌');
					this.add('c|~Joim|░░░░░░█░░░░░░░░█');
					this.add('c|~Joim|░░░░░▐▌░░░░░░░░░█');
					this.add('c|~Joim|░░░░░█░░░░░░░░░░▐▌ SEND THIS TO 7 PPL OR SKELINTONS WILL EAT YOU');
				} else {
					sentences = [
						"Finally a good reason to punch a teenager in the face!", "WUBBA LUBBA DUB DUB",
						"``So here we are again, it's always such a pleasure.``", "My ex-wife still misses me, BUT HER AIM IS GETTING BETTER!",
						"A man chooses, a slave obeys.", "You're gonna have a bad time.", "Would you kindly let me win?",
						"I'm sorry, but I only enjoy vintage memes from the early 00's.",
					];
					sentence = sentences[this.random(8)];
					this.add('c|~Joim|' + sentence);
				}
			}
			if (name === 'juanma') {
				this.add("c|+Juanma|Okay, well, sometimes, science is more art than science, " + pokemon.side.name + ". A lot of people don't get that.");
			}
			if (name === 'kalalokki') {
				this.add('c|+Kalalokki|(•_•)');
				this.add('c|+Kalalokki|( •_•)>⌐■-■');
				this.add('c|+Kalalokki|(⌐■_■)');
			}
			if (name === 'kidwizard') {
				this.add('c|+Kid Wizard|Eevee General room mod me.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|Enter stage left');
			}
			if (name === 'legitimateusername') {
				sentence = ["This isn't my fault.", "I'm not sorry."][this.random(2)];
				this.add('c|@LegitimateUsername|``' + sentence + '``');
			}
			if (name === 'lemonade') {
				this.add('c|+Lemonade|Pasta');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|n_n!');
			}
			if (name === 'lj') {
				this.add('c|%LJDarkrai|Powerfulll');
			}
			if (name === 'lyto') {
				sentences = ["This is divine retribution!", "I will handle this myself!", "Let battle commence!"];
				this.add('c|@Lyto|' + sentences[this.random(3)]);
			}
			if (name === 'macle') {
				this.add("c|+macle|Follow the Frog Blog");
			}
			if (name === 'manu11') {
				this.add("c|@manu 11|/me is pet by ihateyourpancreas");
			}
			if (name === 'marshmallon') {
				this.add("c|%Marshmallon|Marshtomb be like");
				this.add("c|%Marshmallon|- He sees you when you're sleeping -");
				this.add("c|%Marshmallon|- He knows when you're awake -");
				this.add("c|%Marshmallon|- He knows if you've been bad or good -");
				this.add("c|%Marshmallon|- So be good for goodness sake -");
			}
			if (name === 'mattl') {
				this.add('c|+MattL|If you strike me down, I shall become more powerful than you can possibly imagine.');
			}
			if (name === 'mcmeghan') {
				this.add("c|&McMeghan|A Game of Odds");
			}
			if (name === 'megazard') {
				this.add('c|+Megazard|New tricks');
			}
			if (name === 'mizuhime') {
				this.add('c|+Mizuhime|Thou Shalt Double Laser From The Edge');
			}
			if (name === 'nv') {
				this.add('c|+nv|Who tf is nv?');
			}
			if (name === 'omegaxis') {
				this.add('c|+Omega-Xis|lol this isn’t even my final form');
			}
			if (name === 'orday') {
				this.add('c|%Orda-Y|❄');
			}
			if (name === 'overneat') {
				this.add('c|+Overneat|tsk, tsk, is going to be funny');
			}
			if (name === 'paradise') {
				this.add('c|%Paradise~|I sexually identify as a hazard setter');
			}
			if (name === 'pikachuun') {
				sentences = ['Reisen is best waifu', 'Hey look I coded myself into the game', 'sup (\'.w.\')'];
				this.add('c|+Pikachuun|' + sentences[this.random(3)]);
			}
			if (name === 'pluviometer') {
				this.add('c|+pluviometer|p^2laceholder');
			}
			if (name === 'qtrx') {
				sentences = ["cutie are ex", "q-trix", "quarters", "cute T-rex", "Qatari", "random letters", "spammy letters", "asgdf"];
				this.add("c|@qtrx|omg DONT call me '" + sentences[this.random(8)] + "' pls respect my name its very special!!1!");
			}
			if (name === 'quitequiet') {
				this.add("c|@Quite Quiet|I'll give it a shot.");
			}
			if (name === 'raseri') {
				this.add('c|&Raseri|gg');
			}
			if (name === 'raven') {
				this.add('c|&Raven|Are you ready? Then let the challenge... Begin!');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|Get Rekeri\'d :]');
			}
			if (name === 'rosiethevenusaur') {
				sentences = ['!dt party', 'Are you Wifi whitelisted?', 'Read the roomintro!'];
				this.add('c|@RosieTheVenusaur|' + sentences[this.random(3)]);
			}
			if (name === 'rssp1') {
				this.add('c|+rssp1|Witness the power of the almighty Rufflet!');
			}
			if (name === 'sailorcosmos') {
				this.add("c|+SailorCosmos|Cosmos Prism Power Make Up!");
			}
			if (name === 'scotteh') {
				this.add('c|&Scotteh|─────▄▄████▀█▄');
				this.add('c|&Scotteh|───▄██████████████████▄');
				if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'bumbadadabum') this.add('c|@bumbadadabum|Fuck you Scotteh');
				this.add('c|&Scotteh|─▄█████.▼.▼.▼.▼.▼.▼.▼');
			}
			if (name === 'scpinion') {
				this.add('c|@scpinion|/me welcomes funbro');
			}
			if (name === 'scythernoswiping') {
				this.add('c|%Scyther NO Swiping|/me prepares to swipe victory');
			}
			if (name === 'shrang') {
				this.add('raw| [15:30] @<b>Scrappie</b>: It is I, the great and powerful shrang, who is superior to you proles in every conceivable way.');
			}
			if (name === 'sigilyph') {
				this.add('c|@Sigilyph|Prepare to feel the mighty power of an exploding star!');
			}
			if (name === 'sirdonovan') {
				this.add('c|&sirDonovan|Oh, a battle? Let me finish my tea and crumpets');
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|\\_$-_-$_/');
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|By the power vested in me from the great Lord Tomohawk...');
			}
			if (name === 'snowy') {
				this.add('c|+Snowy|Why do a lot of black people call each other monica?');
			}
			if (name === 'solarisfox') {
				this.add('raw|<div class="chat chatmessage-solarisfox"><small>%</small><b><font color="#2D8F1E"><span class="username" data-name="SolarisFox">SolarisFox</span>:</font></b> <em><marquee behavior="alternate" scrollamount=3 scrolldelay="60" width="108">[Intense vibrating]</marquee></em></div>');
			}
			if (name === 'sonired') {
				this.add('c|+Sonired|~');
			}
			if (name === 'spacebass') {
				this.add('c|@SpaceBass|He aims his good ear best he can towards conversation and sometimes leans in awkward toward your seat');
				this.add('c|@SpaceBass|And if by chance one feels their space too invaded, then try your best to calmly be discreet');
				this.add('c|@SpaceBass|Because this septic breathed man that stands before you is a champion from days gone by');
			}
			if (name === 'sparktrain') {
				this.add('c|+sparktrain|hi');
			}
			if (name === 'specsmegabeedrill') {
				this.add('c|+SpecsMegaBeedrill|(◕‿◕✿)');
			}
			if (name === 'spy') {
				sentences = ['curry consumer', 'try to keep up', 'fucking try to knock me down', 'Sometimes I slather myself in vasoline and pretend I\'m a slug', 'I\'m really feeling it!'];
				this.add('c|+Spy|' + sentences[this.random(5)]);
			}
			if (name === 'starmei') {
				this.add('c|+Starmei|Starmei wins again');
			}
			if (name === 'starry') {
				this.add('c|%starry|oh');
			}
			if (name === 'steamroll') {
				this.add('c|@Steamroll|Banhammer ready!');
			}
			if (name === 'sunfished') {
				this.add('c|+Sunfished|*raptor screeches*');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|(ninjacat)(beer)');
			}
			if (name === 'talkingtree') {
				this.add('c|+talkingtree|I am Groot n_n');
			}
			if (name === 'teg') {
				this.add("c|+TEG|It's __The__ Eevee General");
			}
			if (name === 'temporaryanonymous') {
				sentences = ['Hey, hey, can I gently scramble your insides (just for laughs)? ``hahahaha``', 'check em', 'If you strike me down, I shall become more powerful than you can possibly imagine! I have a strong deathrattle effect and I cannot be silenced!'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(3)]);
			}
			if (name === 'teremiare') {
				this.add('c|%Teremiare|I like to call it skill');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Give me my robe, put on my crown!');
			}
			if (name === 'tone114') {
				this.add('c|+TONE114|Haven\'t you heard the new sensation sweeping the nation?');
			}
			if (name === 'trickster') {
				sentences = ["heh….watch out before you get cut on my edge", "AaAaAaAAaAaAAa"];
				this.add('c|@Trickster|' + sentences[this.random(2)]);
			}
			if (name === 'unfixable') {
				this.add('c|+unfixable|eevee general sucks lol');
			}
			if (name === 'urkerab') {
				this.add('j|urkerab');
			}
			if (name === 'uselesstrainer') {
				sentences = ['huehuehuehue', 'PIZA', 'SPAGUETI', 'RAVIOLI RAVIOLI GIVE ME THE FORMUOLI', 'get ready for PUN-ishment', 'PIU\' RUSPE PER TUTTI, E I MARO\'???'];
				this.add('c|@useless trainer|' + sentences[this.random(6)]);
			}
			if (name === 'vapo') {
				this.add('c|%Vapo|/me vapes');
			}
			if (name === 'vexeniv') {
				this.add('c|+Vexen IV|The Arcana is the means by which all is revealed.');
			}
			if (name === 'winry') {
				this.add('c|@Winry|fight me irl');
			}
			if (name === 'xfix') {
				if (this.random(2)) {
					// The classic one
					const hazards = {stealthrock: 1, spikes: 1, toxicspikes: 1, burnspikes: 1, stickyweb: 1};
					let hasHazards = false;
					for (const hazard in hazards) {
						if (pokemon.side.getSideCondition(hazard)) {
							hasHazards = true;
							break;
						}
					}
					if (hasHazards) {
						this.add('c|+xfix|(no haz... too late)');
					} else {
						this.add('c|+xfix|(no hazards, attacks only, final destination)');
					}
				} else {
					this.add("c|+xfix|//starthunt 1 + 1 | 2 | 2 + 2 | 4 | Opponent's status soon (answer with three letters) | FNT :)");
				}
			}
			if (name === 'xjoelituh') {
				this.add("c|%xJoelituh|I won't be haxed again, you will be the next one. UUUUUU");
			}
			if (name === 'xshiba') { // dd
				this.add("c|+xShiba|LINDA IS INDA");
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|Your mom');
			}
			if (name === 'zebraiken') {
				pokemon.phraseIndex = this.random(3);
				//  Zeb's faint and entry phrases correspond to each other.
				if (pokemon.phraseIndex === 2) {
					this.add('c|&Zebraiken|bzzt n_n');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|&Zebraiken|bzzt *_*');
				} else {
					this.add('c|&Zebraiken|bzzt o_o');
				}
			}
			if (name === 'zeroluxgiven') {
				this.add('c|%Zero Lux Given|This should be an electrifying battle!');
			}
			if (name === 'zodiax') {
				this.add('c|%Zodiax|Introducing 7 time Grand Champion to the battle!');
			}
		},
		onFaint: function (pokemon, source, effect) {
			let name = toId(pokemon.name);

			if (name === 'innovamania') {
				pokemon.side.addSideCondition('healingwish', pokemon, this);
			}
			// Add here salty tears, that is, custom faint phrases.
			let sentences = [];
			// This message is different from others, as it triggers when
			// opponent faints
			if (source && source.name === 'galbia') {
				this.add('c|@galbia|literally 2HKOged');
			}
			// Actual faint phrases
			if (name === 'acast') {
				this.add('c|%Acast|If only I had more screens...');
			}
			if (name === 'ace') {
				this.add('c|@Ace|inhale all of this');
			}
			if (name === 'aelita') {
				this.add('c|%Aelita|CODE: LYOKO. Tower deactivated...');
			}
			if (name === 'ajhockeystar') {
				this.add('c|+ajhockeystar|You may have beaten me in battle, but never in hockey.');
			}
			if (name === 'albacore') {
				this.add('c|@Albacore|Joke\'s on you, I was just testing!');
			}
			if (name === 'albert') {
				this.add("c|+Albert|You may be good looking, but you're not a piece of art.");
			}
			if (name === 'always') {
				this.add('c|+Always|i swear to fucking god how can a single person be this lucky after getting played all the fucking way. you are a mere slave you glorified heap of trash.');
			}
			if (name === 'am') {
				this.add('c|+AM|RIP');
			}
			if (name === 'andy') {
				this.add('c|%AndrewGoncel|wow r00d! :c');
			}
			if (name === 'antemortem') {
				this.add('c|&antemortem|FUCKING CAMPAIGNERS');
			}
			if (name === 'anttya') {
				this.add('c|+Anttya|Can\'t beat hax ¯\\_(ツ)_/¯');
			}
			if (name === 'anty') {
				this.add('c|+Anty|k');
			}
			if (name === 'articuno') {
				this.add('c|%Articuno|This is why you don\'t get any girls.');
			}
			if (name === 'ascriptmaster') {
				this.add('c|@Ascriptmaster|Farewell, my friends. May we meet another day...');
			}
			if (name === 'astara') {
				sentences = ['/me twerks into oblivion', 'good night ♥', 'Astara Vista Baby'];
				this.add('c|%Ast☆arA|' + sentences[this.random(3)]);
			}
			if (name === 'asty') {
				this.add('c|@Asty|Bottom kek :^(');
			}
			if (name === 'spandan') {
				this.add('c|~Spandan|Gr8 b8, m8. I rel8, str8 appreci8, and congratul8. I r8 this b8 an 8/8. Plz no h8, I\'m str8 ir8. Cre8 more, can\'t w8. We should convers8, I won\'t ber8, my number is 8888888, ask for N8. No calls l8 or out of st8. If on a d8, ask K8 to loc8. Even with a full pl8, I always have time to communic8 so don\'t hesit8');
			}
			if(name === 'classyz') {
				this.add('c|%ClassyZ|go straight to hell do not pass go do not collect $200');
			}
			if(name === 'flygonerz') {
				this.add('c|@Flygonerz|Plox nerf, Ninten__doh__!');
			}
			if(name === 'pieddychomp') {
				this.add("c|&PI★EddyChomp|Fuck this shit, I got rekt. I\'ll get MY REVENGE! RAWR!!!!");
			}
			if(name === 'loominite') {
				this.add('c|&Loominite|eh, i\'m out!');
			}
			if (name === 'thegodofhaxorus') {
				this.add('c|@The God of Haxorus|My own hax against me -3-');
			}
			if (name === 'charizard8888') {
				this.add('c|&charizard8888|I\'m Outta here!');
			}
			if (name === 'xprienzo') {
 				this.add('c|⚔XpRienzo ☑-☑|Bleh');
 			}
 			if (name === 'ransei') {
 				this.add('c|~Ransei|ripsei');
 			}
			if (name === 'atomicllamas') {
				this.add('c|&atomicllamas|(puke)');
			}
			if (name === 'aurora') {
				this.add('c|@Aurora|are you serious you\'re so bad oh my god haxed ughhhhh');
			}
			if (name === 'reisen') {
				this.add("c|%Reisen|No need for goodbye. I'll see you on the flip side.");
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|There is no need to be mad');
			}
			if (name === 'biggie') {
				sentences = ['It was all a dream', 'It\'s gotta be the shoes', 'ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ'];
				this.add('c|@biggie|' + sentences[this.random(3)]);
			}
			if (name === 'blastchance') {
				this.add("c|+Blast Chance|**oh no!**");
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|The Mirror Can Lie It Doesn\'t Show What\'s Inside ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'bludz') {
				this.add('c|+bludz|zzz');
			}
			if (name === 'bondie') {
				this.add('c|+Bondie|Sigh...');
			}
			if (name === 'bottt') {
				this.add("c| boTTT|No longer being maintained...");
			}
			if (name === 'brandon') {
				this.add("c|+Brrandon|Always leave the crowd wanting more~");
			}
			if (name === 'bumbadadabum') {
				this.add("c|@bumbadadabum|Find another planet make the same mistakes.");
			}
			if (name === 'bummer') {
				this.add('c|&Bummer|Thanks for considering me!');
			}
			if (name === 'chaos') {
				this.add('c|~chaos|//forcewin chaos');
				if (this.random(1000) === 420) {
					// Shouldn't happen much, but if this happens it's hilarious.
					this.add('c|~chaos|actually');
					this.add('c|~chaos|//forcewin ' + pokemon.side.name);
					this.win(pokemon.side);
				}
			}
			if (name === 'ciran') {
				this.add("c|+Ciran|Fun is still banned in the Wi-Fi room!");
			}
			if (name === 'clefairy') {
				this.add('c|+Clefairy|flex&no flex zone nightcore remix dj clefairyfreak 2015');
			}
			if (name === 'coolstorybrobat') {
				let sentence = [
					"Lol I got slayed", "BRUH!", "I tried", "Going back to those mountains to train brb", "I forgot what fruit had... tasted like...",
				][this.random(5)];
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'crestfall') {
				this.add("c|%Crestfall|Her pistol go (bang bang, boom boom, pop pop)");
			}
			if (name === 'deathonwings') {
				this.add('c|+Death on Wings|DEG\'s a nub');
			}
			if (name === 'dirpz') {
				this.add('c|+Dirpz|sylveon is an eeeveeeeeeelutioooooon....');
			}
			if (name === 'dmt') {
				this.add('c|+DMT|DMT');
			}
			if (name === 'dreameatergengar') {
				this.add('c|+Dream Eater Gengar|In the darkness I fade. Remember ghosts don\'t die!');
			}
			if (name === 'duck') {
				this.add('c|@Duck|Duck you!');
			}
			if (name === 'e4flint') {
				this.add('c|#E4 Flint|+n1');
				this.add('c|+sparkyboTTT|nice 1');
			}
			if (name === 'eeveegeneral') {
				sentences = ["bye room, Electrolyte is in charge", "/me secretly cries", "inap!"];
				this.add("c|~Eevee General|" + sentences[this.random(3)]);
			}
			if (name === 'eyan') {
				this.add("c|@Eyan|;-;7");
			}
			if (name === 'feliburn') {
				this.add('c|@Feliburn|gg la verga de tu madre');
			}
			if (name === 'fireburn') {
				this.add('c|+Fireburn|>:Y');
			}
			if (name === 'flyingkebab') {
				this.add("c|+Flying Kebab|" + ["I\'ll see you in hell!", "/me vanishes to the depths of hell"][this.random(2)]);
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|Now I have Former Hope.');
			}
			if (name === 'freeroamer') {
				this.add('c|%Freeroamer|how do people get these matchups...');
			}
			if (name === 'frysinger') {
				this.add("c|+Frysinger|/me teleports away from the battle and eats a senzu bean");
			}
			if (name === 'fx') {
				this.add("c|+f(x)|mirror, mirror");
			}
			if (name === 'galbia') {
				this.add('c|@galbia|(dog)');
			}
			if (name === 'galom') {
				this.add('c|+Galom|GAME OVER.');
			}
			if (name === 'rodan') {
				this.add("c|+RODAN|The Great Emeralds power allows me to feel... ");
			}
			if (name === 'geoffbruedly') {
				this.add("c|%GeoffBruedly|IM SORRY WINRY");
			}
			if (name === 'giagantic') {
				this.add("c|%Giagantic|x.x");
			}
			if (name === 'golui') {
				this.add("c|+Golui|Freeze in hell");
			}
			if (name === 'goodmorningespeon') {
				this.add("c|+GoodMorningEspeon|gg wp good hunt would scavenge again");
			}
			if (name === 'grimauxiliatrix') {
				this.add("c|%grimAuxiliatrix|∠( ᐛ 」∠)_");
			}
			if (name === 'halite') {
				this.add('c|@Halite|Today was your lucky day...');
			}
			if (name === 'hannah') {
				this.add('c|+Hannahh|Nooo! ;~;');
			}
			if (name === 'hashtag') {
				this.add("c|#Hashtag|fukn immigrants,,, slash me spits");
			}
			if (name === 'haund') {
				this.add('c|%Haund|omg noob team report');
			}
			if (name === 'healndeal') {
				this.add('c|+HeaLnDeaL|sadface I should have been a Sylveon');
			}
			if (name === 'himynamesl') {
				this.add('c|@HiMyNamesL|hey ' + pokemon.side.name + ', get good');
			}
			if (name === 'hippopotas') {
				this.add('-message', 'The sandstorm subsided.');
			}
			if (name === 'hollywood') {
				this.add('c|+hollywood|BibleThump');
			}
			if (name === 'ih8ih8sn0w') {
				this.add('c|+ih8ih8sn0w|nice hax :(');
			}
			if (name === 'imanalt') {
				this.add('c|+imanalt|bshax imo');
			}
			if (name === 'imas234') {
				this.add('c|@imas234|bg no re');
			}
			if (name === 'innovamania') {
				sentences = ['Did you rage quit?', 'How\'d you lose with this set?'];
				this.add('c|@innovamania|' + sentences[this.random(2)]);
			}
			if (name === 'iplaytennislol') {
				this.add('c|%iplaytennislol|/me des');
			}
			if (name === 'iyarito') {
				this.add('c|+Iyarito|Owwnn ;_;');
			}
			if (name === 'jackhiggins') {
				this.add("c|+Jack Higgins|I blame HiMyNamesL");
			}
			if (name === 'jasmine') {
				this.add("raw|<div class=\"broadcast-red\"><b>The server is restarting soon.</b><br />Please finish your battles quickly. No new battles can be started until the server resets in a few minutes.</div>");
			}
			if (name === 'jdarden') {
				this.add('c|@jdarden|;-;7');
			}
			if (name === 'jetpack') {
				this.add('c|+Jetpack|You shouldn\'t of done that. ;_;');
			}
			if (name === 'joim') {
				sentences = ['AVENGE ME, KIDS! AVEEEENGEEE MEEEEEE!!', 'OBEY!', '``This was a triumph, I\'m making a note here: HUGE SUCCESS.``', '``Remember when you tried to kill me twice? Oh how we laughed and laughed! Except I wasn\'t laughing.``', '``I\'m not even angry, I\'m being so sincere right now, even though you broke my heart and killed me. And tore me to pieces. And threw every piece into a fire.``'];
				this.add('c|~Joim|' + sentences[this.random(4)]);
			}
			if (name === 'juanma') {
				this.add("c|+Juanma|I guess you were right, now you must be the happiest person in the world, " + pokemon.side.name + "! You get to be major of 'I-told-you-so' town!");
			}
			if (name === 'kalalokki') {
				this.add('c|+Kalalokki|(⌐■_■)');
				this.add('c|+Kalalokki|( •_•)>⌐■-■');
				this.add('c|+Kalalokki|(x_x)');
			}
			if (name === 'kidwizard') {
				this.add('c|+Kid Wizard|Go to hell.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|' + ['Alas poor me', 'Goodnight sweet prince'][this.random(2)]);
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``This isn\'t brave. It\'s murder. What did I ever do to you?``');
			}
			if (name === 'lemonade') {
				this.add('c|+Lemonade|Pasta');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|u_u!');
			}
			if (name === 'lj') {
				this.add('c|%LJDarkrai|.Blast');
			}
			if (name === 'lyto') {
				this.add('c|@Lyto|' + ['Unacceptable!', 'Mrgrgrgrgr...'][this.random(2)]);
			}
			if (name === 'macle') {
				this.add("c|+macle|Follow the Frog Blog - https://gonefroggin.wordpress.com/");
			}
			if (name === 'manu11') {
				this.add("c|@manu 11|so much hax, why do I even try");
			}
			if (name === 'marshmallon') {
				this.add("c|%Marshmallon|Shoutouts to sombolo and Rory Mercury ... for this trash set -_-");
			}
			if (name === 'mattl') {
				this.add('c|+MattL|Forgive me. I feel it again... the call from the light.');
			}
			if (name === 'mcmeghan') {
				this.add("c|&McMeghan|Out-odded");
			}
			if (name === 'megazard') {
				this.add('c|+Megazard|Old dog');
			}
			if (name === 'mizuhime') {
				this.add('c|+Mizuhime|I got Gimped.');
			}
			if (name === 'nv') {
				this.add('c|+nv|Too cute for this game ;~;');
			}
			if (name === 'omegaxis') {
				this.add('c|+Omega-Xis|bull shit bull sHit thats ✖️ some bullshit rightth ere right✖️there ✖️✖️if i do ƽaү so my selｆ ‼️ i say so ‼️ thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ‼️ HO0ОଠＯOOＯOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ ‼️ Bull shit');
			}
			if (name === 'orday') {
				this.add('c|%Orda-Y|❄_❄');
			}
			if (name === 'overneat') {
				this.add('c|+Overneat|Ugh! I failed you Iya-sama');
			}
			if (name === 'paradise') {
				this.add('c|%Paradise~|RIP THE DREAM');
			}
			if (name === 'pikachuun') {
				sentences = ['press f to pay respects ;_;7', 'this wouldn\'t have happened in my version', 'wait we were battling?'];
				this.add('c|+Pikachuun|' + sentences[this.random(3)]);
			}
			if (name === 'pluviometer') {
				this.add('c|+pluviometer|GP 2/2');
			}
			if (name === 'qtrx') {
				sentences = ['Keyboard not found; press **Ctrl + W** to continue...', 'hfowurfbiEU;DHBRFEr92he', 'At least my name ain\'t asgdf...'];
				this.add('c|@qtrx|' + sentences[this.random(3)]);
			}
			if (name === 'quitequiet') {
				this.add('c|@Quite Quiet|Well, I tried at least.');
			}
			if (name === 'raseri') {
				this.add('c|&Raseri|you killed a mush :(');
			}
			if (name === 'raven') {
				this.add('c|&Raven|I failed the challenge, and for that, I must lose a life. At least I had one to lose in the first place, nerd.');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|lucky af :[');
			}
			if (name === 'rssp1') {
				this.add('c|+rssp1|Witness the power of the almighty Rufflet!');
			}
			if (name === 'rosiethevenusaur') {
				this.add('c|@RosieTheVenusaur|' + ['SD SKARM SHALL LIVE AGAIN!!!', 'Not my WiFi!'][this.random(2)]);
			}
			if (name === 'sailorcosmos') {
				this.add("c|+SailorCosmos|Cosmos Gorgeous Retreat!");
			}
			if (name === 'scotteh') {
				this.add('c|&Scotteh|▄███████▄.▲.▲.▲.▲.▲.▲');
				this.add('c|&Scotteh|█████████████████████▀▀');
			}
			if (name === 'scpinion') {
				this.add("c|@scpinion|guys, I don't even know how to pronounce scpinion");
			}
			if (name === 'scythernoswiping') {
				this.add('c|%Scyther NO Swiping|Aww man!');
			}
			if (name === 'shrang') {
				this.add('c|@shrang|FUCKING 2 YO KID');
			}
			if (name === 'sigilyph') {
				this.add('c|@Sigilyph|FROM THE BACK FROM THE BACK FROM THE BACK FROM THE BACK **ANDD**');
			}
			if (name === 'sirdonovan') {
				this.add('-message', 'RIP sirDonovan');
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|!learn skitty, roleplay');
				this.add('raw|<div class="infobox">In Gen 6, Skitty <span class="message-learn-cannotlearn">can\'t</span> learn Role Play</div>');
			}
			if (name === 'solarisfox') {
				this.add('c|%SolarisFox|So long, and thanks for all the fish.');
			}
			if (name === 'sonired') {
				this.add('c|+Sonired|sigh lucky players.');
			}
			if (name === 'sparktrain') {
				this.add('c|+sparktrain|nice');
			}
			if (name === 'spy') {
				sentences = ['lolhax', 'crit mattered', 'bruh cum @ meh', '>thinking Pokemon takes any skill'];
				this.add('c|+Spy|' + sentences[this.random(4)]);
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|Blasphemy!');
			}
			if (name === 'snowy') {
				this.add('c|+Snowy|i never understood this i always hear them be like "yo whats up monica" "u tryna blaze monica"');
			}
			if (name === 'spacebass') {
				this.add('c|@SpaceBass|And the tales of whales and woe off his liquored toungue will flow, the light will soft white twinkle off the cataracts in his eye');
				this.add("c|@SpaceBass|So if by chance you're cornered near the bathroom, or he blocks you sprawled in his aisle seat");
				this.add("c|@SpaceBass|Embrace the chance to hear some tales of greatness, 'cause he's the most interesting ball of toxins you're ever apt to meet");
			}
			if (name === 'specsmegabeedrill') {
				this.add('c|+SpecsMegaBeedrill|Tryhard.');
			}
			if (name === 'starmei') {
				this.add('c|+Starmei|//message AM, must be nice being this lucky');
			}
			if (name === 'starry') {
				this.add('c|%starry|o-oh');
			}
			if (name === 'steamroll') {
				this.add('c|@Steamroll|Not my problem anymore!');
			}
			if (name === 'sunfished') {
				this.add('c|+Sunfished|*raptor screeches*');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|You offended :C');
			}
			if (name === 'talkingtree') {
				this.add('c|+talkingtree|I am Groot u_u');
			}
			if (name === 'teg') {
				sentences = ['Save me, Joim!', 'Arcticblast is the worst OM leader in history'];
				this.add('c|+TEG|' + sentences[this.random(2)]);
			}
			if (name === 'temporaryanonymous') {
				sentences = [';_;7', 'This kills the tempo', 'I\'m kill. rip.', 'S-senpai! Y-you\'re being too rough! >.<;;;;;;;;;;;;;;;;;', 'A-at least you checked my dubs right?', 'B-but that\'s impossible! This can\'t be! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHGH'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(6)]);
			}
			if (name === 'teremiare') {
				this.add('c|%Teremiare|sigh...');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Oh how wrong we were to think immortality meant never dying.');
			}
			if (name === 'tone114') {
				this.add('c|+TONE114|I don\'t have to take this. I\'m going for a walk.');
			}
			if (name === 'trickster') {
				this.add('c|@Trickster|UPLOADING VIRUS.EXE \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 99% COMPLETE');
			}
			if (name === 'unfixable') {
				this.add('c|+unfixable|i may be dead but my eyebrows are better than yours will ever be');
			}
			if (name === 'urkerab') {
				this.add('l|urkerab');
			}
			if (name === 'uselesstrainer') {
				sentences = ['TIME TO SET UP', 'One day I\'ll become a beautiful butterfly'];
				this.add('c|@useless trainer|' + sentences[this.random(2)]);
			}
			if (name === 'vapo') {
				this.add('c|%Vapo|( ; _> ;)');
			}
			if (name === 'vexeniv') {
				this.add('c|+Vexen IV|brb burning my dread');
			}
			if (name === 'winry') {
				this.add('c|@Winry|I AM NOT A WEEB');
			}
			if (name === 'xfix') {
				const foe = pokemon.side.foe.active[0];
				if (foe.name === 'xfix') {
					this.add("c|+xfix|(I won. I lost. I... huh... ~~can somebody tell me what actually happened?~~)");
				} else if (foe.ability === 'magicbounce') {
					this.add('c|+xfix|(How do mirrors work... oh right, when you use a mirror, your opponent has a mirror as well... or something, ~~that\'s how you "balance" this game~~)');
				} else {
					this.add('c|+xfix|~~That must have been a glitch. Hackers.~~');
				}
			}
			if (name === 'xjoelituh') {
				this.add("c|%xJoelituh|THAT FOR SURE MATTERED. Blame Nayuki. I'm going to play CSGO then.");
			}
			if (name === 'xshiba') {
				this.add("c|+xShiba|Lol that feeling when you just win but get haxed..");
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|your mom');
				// Followed by the usual '~Zarel fainted'.
				this.add('-message', '~Zarel used your mom!');
			}
			if (name === 'zebraiken') {
				if (pokemon.phraseIndex === 2) {
					this.add('c|&Zebraiken|bzzt u_u');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|&Zebraiken|bzzt ._.');
				} else {
					// Default faint.
					this.add('c|&Zebraiken|bzzt x_x');
				}
			}
			if (name === 'zeroluxgiven') {
				this.add('c|%Zero Lux Given|I\'ve been beaten, what a shock!');
			}
			if (name === 'zodiax') {
				this.add('c|%Zodiax|We need to go full out again soon...');
			}
		},
		// Special switch-out events for some mons.
		onSwitchOut: function (pokemon) {
			let name = toId(pokemon.name);

			if (!pokemon.illusion) {
				if (name === 'hippopotas') {
					this.add('-message', 'The sandstorm subsided.');
				}
			}

			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
		},
		onModifyPokemon: function (pokemon) {
			let name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			// qtrx only has one move anyway.
			if (name !== 'qtrx') {
				let moves = pokemon.moveset;
				if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
					for (let i = 0; i < 3; i++) {
						if (!moves[i].disabled) {
							pokemon.disableMove(moves[i].id, false);
							moves[i].disabled = true;
						}
					}
				}
			}
		},
		// Specific residual events for custom moves.
		// This allows the format to have kind of custom side effects and volatiles.
		onResidual: function (battle) {
			// Deal with swapping from qtrx's mega signature move.
			let swapmon1, swapmon2;
			let swapped = false;
			for (let i = 1; i < 6 && !swapped; i++) {
				swapmon1 = battle.sides[0].pokemon[i];
				if (swapmon1.swapping && swapmon1.hp > 0) {
					swapmon1.swapping = false;
					for (let j = 1; j < 6; j++) {
						swapmon2 = battle.sides[1].pokemon[j];
						if (swapmon2.swapping && swapmon2.hp > 0) {
							swapmon2.swapping = false;

							this.add('message', "Link standby... Please wait.");
							swapmon1.side = battle.sides[1];
							swapmon1.fullname = swapmon1.side.id + ': ' + swapmon1.name;
							swapmon1.id = swapmon1.fullname;
							swapmon2.side = battle.sides[0];
							swapmon2.fullname = swapmon2.side.id + ': ' + swapmon2.name;
							swapmon2.id = swapmon2.fullname;
							let oldpos = swapmon1.position;
							swapmon1.position = swapmon2.position;
							swapmon2.position = oldpos;
							battle.sides[0].pokemon[i] = swapmon2;
							battle.sides[1].pokemon[j] = swapmon1;

							this.add("c|\u2605" + swapmon1.side.name + "|Bye-bye, " + swapmon2.name + "!");
							this.add("c|\u2605" + swapmon2.side.name + "|Bye-bye, " + swapmon1.name + "!");
							if (swapmon1.side.active[0].hp && swapmon2.side.active[0].hp) {
								this.add('-anim', swapmon1.side.active, "Healing Wish", swapmon1.side.active);
								this.add('-anim', swapmon2.side.active, "Aura Sphere", swapmon2.side.active);
								this.add('message', swapmon2.side.name + " received " + swapmon2.name + "! Take good care of " + swapmon2.name + "!");
								this.add('-anim', swapmon2.side.active, "Healing Wish", swapmon2.side.active);
								this.add('-anim', swapmon1.side.active, "Aura Sphere", swapmon1.side.active);
								this.add('message', swapmon1.side.name + " received " + swapmon1.name + "! Take good care of " + swapmon1.name + "!");
							} else {
								this.add('message', swapmon2.side.name + " received " + swapmon2.name + "! Take good care of " + swapmon2.name + "!");
								this.add('message', swapmon1.side.name + " received " + swapmon1.name + "! Take good care of " + swapmon1.name + "!");
							}
							swapped = true;
							break;
						}
					}
				}
			}
		},
	},
	{
		name: "Challenge Cup 1v1",
		section: "Randomized Metas",

		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "Monotype Random Battle",
		section: "Randomized Metas",

		team: 'random',

		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],
		section: "Randomized Metas",

		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles Hackmons Cup",
		section: "Randomized Metas",

		gameType: 'doubles',
		team: 'randomHC',

		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Triples Hackmons Cup",
		section: "Randomized Metas",

		gameType: 'triples',
		team: 'randomHC',

		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
		{
		name: "[Seasonal] Octoberfest",
		section: "Randomized Metas",

		team: 'randomSeasonalOF',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod'],
		onModifyMove: function(move) {
			if (move.id === 'trick') {
				delete move.onHit;
				switch (this.random(17)) {
				case 0:
					move.onTryHit = function() {
						this.add('-message', 'Trick: Kick on the nuts!');
					};
					move.category = 'Physical';
					move.type = 'Normal';
					move.basePower = 200;
					break;
				case 1:
					move.onTryHit = function() {
						this.add('-message', 'Trick: Fireworks at your feet!');
					};
					move.category = 'Special';
					move.type = 'Fire';
					move.basePower = 200;
					break;
				case 2:
					move.onTryHit = function() {
						this.add('-message', 'Trick: Doused with water!');
					};
					move.category = 'Special';
					move.type = 'Water';
					move.basePower = 200;
					break;
				case 3:
					move.onTryHit = function() {
						this.add('-message', 'Trick: Bombed with rotten eggs!');
					};
					move.category = 'Special';
					move.type = 'Poison';
					move.basePower = 200;
					break;
				case 4:
					move.onTryHit = function() {
						this.add('-message', 'Trick: You got scared by a real-looking costume!');
					};
					move.category = 'Physical';
					move.type = 'Dark';
					move.basePower = 200;
					break;
				case 5:
					move.onTryHit = function() {
						this.add('-message', 'Trick: You got hit in the head!');
					};
					move.volatileStatus = 'confusion';
					break;
				case 6:
					move.onTryHit = function() {
						this.add('-message', 'Trick: Your arms were maimed!');
					};
					move.volatileStatus = 'disable';
					break;
				case 7:
					move.onTryHit = function() {
						this.add('-message', "Trick: You've been taunted by those meddling kids!");
					};
					move.volatileStatus = 'taunt';
					break;
				case 8:
					move.onTryHit = function() {
						this.add('-message', 'Treat: You got some yummy seeds!');
					};
					move.volatileStatus = 'leechseed';
					break;
				case 9:
					move.onTryHit = function() {
						this.add('-message', 'Trick: Your car was stolen!');
					};
					move.volatileStatus = 'embargo';
					break;
				case 10:
					move.onTryHit = function() {
						this.add('-message', "Trick: You're haunted and you're going to die!");
					};
					move.volatileStatus = 'perishsong';
					break;
				case 11:
					move.onTryHit = function() {
						this.add('-message', 'Trick: A ghost cursed you!');
					};
					move.volatileStatus = 'curse';
					break;
				case 12:
					move.onTryHit = function() {
						this.add('-message', "Trick: You're tormented by the constant tricking!");
					};
					move.volatileStatus = 'torment';
					break;
				case 13:
					move.onTryHit = function() {
						this.add('-message', 'Treat: Om nom nom roots!');
					};
					move.volatileStatus = 'ingrain';
					break;
				case 14:
					move.onTryHit = function() {
						this.add('-message', 'Treat: Uhm, these candy taste weird...');
					};
					var boosts = {};
					var possibleBoosts = ['atk','def','spa','spd','spe','accuracy','evasion'].randomize();
					boosts[possibleBoosts[0]] = 2;
					boosts[possibleBoosts[1]] = -1;
					boosts[possibleBoosts[2]] = -1;
					move.boosts = boosts;
					break;
				case 15:
					move.onTryHit = function() {
						this.add('-message', "Trick: You're tired of running after teenagers with your baseball bat.");
					};
					move.volatileStatus = 'mustrecharge';
					break;
				case 16:
					move.onTryHit = function() {
						this.add('-message', "Treat: You got candy!");
					};
					move.heal = [1,2];
					break;
				}
			} else if (move.id === 'present') {
				move.accuracy = 100;
				move.basePower = 0;
				move.category = 'Status';
				move.volatileStatus = 'confusion';
				move.pp = 10;
				move.priority = 0;
				move.name = 'Offer Beer';
				move.boosts = {'atk':-1, 'spa':-1, 'def':1, 'spd':1, 'spe':-1, 'accuracy':-1, 'evasion':1};
				move.onTryHit = function() {
					this.add('-message', "Oh, why, thank you! This beer is delicious!");
				};
				move.effect = {
					onBeforeMove: function(pokemon, target, move) {
						if (this.random(10) < 3) {
							this.useMove('Sing', target);
							return;
						}
					}
				};
			}
		}
	},
	{
		name: "Random Haxmons",
		section: "Randomized Metas",

		team: 'random',
		ruleset: ['OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
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
        name: "Random Camomons",
        desc: [
            "Pok&eacute;mon change type to match their first two moves.",
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
        ],
        section: "Randomized Metas",
        team: 'random',

        ruleset: ['OU'],
        onBegin: function () {
            let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
            for (let i = 0, len = allPokemon.length; i < len; i++) {
                let pokemon = allPokemon[i];
                let types = [this.getMove(pokemon.moves[0]).type];
                if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
                pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
                pokemon.types = pokemon.template.types = types;
            }
        },
        onAfterMega: function (pokemon) {
            let types = [this.getMove(pokemon.moves[0]).type];
            if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
            pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
            pokemon.types = pokemon.template.types = types;
        },
    },
    {
        name: "Random Camomons Plus Plus",
        desc: [
            "Pok&eacute;mon change type to match their moves. Hence, a Pokemon can now have a maximum of 4 types.",
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
        ],
        section: "Randomized Metas",
        team: 'random',

        ruleset: ['Random Battle', 'Team Preview'],
        onBegin: function () {
            let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
            for (let i = 0, len = allPokemon.length; i < len; i++) {
                let pokemon = allPokemon[i];
                let types = [this.getMove(pokemon.moves[0]).type], type = {};
                type[this.getMove(pokemon.moves[0]).type]=true;
                for(let j=1;j<pokemon.moves.length;j++)
                {
                if (pokemon.moves[j] && !type[this.getMove(pokemon.moves[j]).type]) { types.push(this.getMove(pokemon.moves[j]).type); type[this.getMove(pokemon.moves[j]).type]=true; }
                }
                pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
                pokemon.types = pokemon.template.types = types;
            }
        },
        onSwitchIn(pokemon) {
                this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
        onAfterMega: function (pokemon) {
            let types = [this.getMove(pokemon.moves[0]).type], type = {};
                type[this.getMove(pokemon.moves[0]).type]=true;
                for(let j=1;j<pokemon.moves.length;j++)
                {
                if (pokemon.moves[j] && !type[this.getMove(pokemon.moves[j]).type]) { types.push(this.getMove(pokemon.moves[j]).type); type[this.getMove(pokemon.moves[j]).type]=true; }
                }
                pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
                pokemon.types = pokemon.template.types = types;
        },
    },
		{
		name:"Random Open House",
		desc: ["Every 5 turns, one of Trick Room, Magic Room or Wonder Room is set up.","&bullet; <a href=\"http://www.smogon.com/forums/threads/open-house.3584274/\">Open House</a>"],
		section: "Randomized Metas",
		mod:"openhouse",
		team: 'random',
		ruleset: ["Team Preview",'Random Battle'],
		onBegin: function()
		{
			this.houses = ["Wonder Room","Trick Room","Magic Room"];
			this.nexthouse = this.houses[this.random(3)];
			this.add("-message","Starting next turn, the battle will take place in the "+this.nexthouse+"!");
		},
		onResidualOrder:999,
		onResidual: function()
		{
			if(this.turn%5==4)
			{
				let nexthouse = this.houses[this.random(3)];
				while(nexthouse==this.curhouse) nexthouse = this.houses[this.random(3)];
				this.nexthouse = nexthouse;
				this.add("-message","Starting next turn, the battle will take place in the "+this.nexthouse+"!");
			}
		}
	},
	{
		name: "Random Meta Man",
		desc: [
			"When a Pokemon faints, the opposing Pokemon replaces its current ability with the fainted Pokemon's and gains its last-used move in a new slot (for up to 9 total moves). These changes last the entire match. If a Pokemon faints before using a move during the match, no move is gained by the opponent.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/meta-man.3565966/\">Meta Man</a>",
		],
		team: 'random',
		ruleset: ['Team Preview', 'Random Battle'],
		section: "Randomized Metas",
		mod: "metaman",
		onFaint: function(pokemon)
		{
			this.add("-message",pokemon.side.foe.pokemon[0].name+" received "+pokemon.name+"'s "+this.data.Abilities[pokemon.ability].name+"!");
			pokemon.side.foe.pokemon[0].setAbility(pokemon.ability);
			pokemon.side.foe.pokemon[0].baseAbility = pokemon.ability;
			let lastMove = pokemon.lastM;
			let has
			if(pokemon.side.foe.pokemon[0].moveset.length<=9 && lastMove && !pokemon.side.foe.pokemon[0].hasMove(lastMove.id))
			{
				pokemon.side.foe.pokemon[0].moveset.push(lastMove);
				pokemon.side.foe.pokemon[0].baseMoveset.push(lastMove);
				this.add("-message",pokemon.side.foe.pokemon[0].name+" received "+pokemon.name+"'s "+pokemon.lastM.move+"!");
			}
		},
	},

	{
	    name: "Random Top Percentage",
	    section: "Randomized Metas",
	    mod: 'toppercentage',
	    desc:["&lt; <a href=\"http://www.smogon.com/forums/threads/top-percentage.3564459/\">Top Percentage</a>"],
	    ruleset: ['Random Battle',"Team Preview"],
	    team: "random",
	    onBegin: function() {
			this.add("raw|Welcome to Top Percentage! The first Player to deal 400% damage wins! HAHAHAH!");
		for (var i = 0; i < this.sides.length; i++) {
		    this.sides[i].metaCount = 400;
		}
	    },
	    onAfterDamage: function(damage, target, source, move) {
		//only should work if does not make target faint
		let percentage = 100 * damage / target.maxhp;
		if (damage >= target.hp) {
		    percentage = 100 * target.hp / target.maxhp;
		}
		target.side.metaCount -= percentage;
		this.add('-message', target.side.name+" has " + Math.round(target.side.metaCount) + "% left!");
		if (target.side.metaCount <= 0.1) {
		    //note: making this 0.1 because I got 1.10 times 10^-15 once
		    //something silly with rounding
		    //this works well enough
	            this.add('raw|'+target.side.foe.name+" has dealt 400% damage!");
		    this.win(target.side.foe);
		}
	    },
		/*onAfterDamage: function(damage, target, source, move) {

		},*/
	},
	       {
		    name: "Random Pokebilities",
		    desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/pok%C3%A9bilities.3510241/\">Pokebilities</a>"],
		    section: "Randomized Metas",
		    mod: 'pokebilities',
		    ruleset: ["Random Battle"],
                    team:'random',
		    onSwitchInPriority: 1,
		    onBegin: function() {
			let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
		        for (let p = 0; p < this.sides.length; p++) {
		            for (let i = 0; i < this.sides[p].pokemon.length; i++) {
		                let pokemon = this.sides[p].pokemon[i];
		                let template = this.getTemplate(pokemon.species);
		                this.sides[p].pokemon[i].innates = [];
		                for (let a in template.abilities) {
		                    if (toId(template.abilities[a]) != pokemon.ability)
				    {
					if(statusability[toId(template.abilities[a])])
		                        this.sides[p].pokemon[i].innates.push("other" + toId(template.abilities[a]));
					else
		                        this.sides[p].pokemon[i].innates.push(toId(template.abilities[a]));
				    }
		                }
		            }
		        }
		    },
		    onSwitchIn: function(pokemon) {
		        for (let i = 0; i < pokemon.innates.length; i++) {
		            if (!pokemon.volatiles[pokemon.innates[i]])
		                pokemon.addVolatile(pokemon.innates[i]);
		        }
		    },
		    onAfterMega: function(pokemon) {
		        for (let i = 0; i < pokemon.innates.length; i++) {
		            pokemon.removeVolatile(pokemon.innates[i]);
		        }
		    },
	},
	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">AG Resources</a>",
		],

		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "Balanced Hackmons",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3489849/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3566051/\">BH Suspects and Bans</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571384/\">BH Resources</a>",
		],

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Kyogre-Primal', 'Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter'],
	},
	{
		name: "1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3496773/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536109/\">1v1 Resources</a>",
		],
		section: 'Other Metagames',

		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Perish Song', 'Chansey + Charm + Seismic Toss',
		],
	},
	{
		name: "Monotype",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3575778/\">Monotype Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Charizardite X', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Sablenite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
	},
	{
		name: "Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Ubers'],
		banlist: ['Baton Pass', 'Dynamic Punch', 'Electrify', 'Zap Cannon'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (itemTable[item] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item] && (item.id === 'blueorb' || item.id === 'redorb')) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item] = true;
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || uberStones.indexOf(item.id) >= 0) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528058/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3578707/\">AAA Resources</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Arceus', 'Archeops', 'Bisharp', 'Chatot', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Dragonite', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia', 'Rayquaza', 'Regigigas',
			'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Smeargle', 'Snorlax', 'Suicune', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal', 'Zekrom',
			'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Shadow Tag', 'Dynamic Punch', 'Zap Cannon',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Illusion': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	},
	{
		name: "Classic Hackmons",
		section: "Other Metagames",
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		maxLevel: 100,
		defaultLevel: 100,
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species);
			let item = this.getItem(set.item);
			let problems = [];
			if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
			if (item.isNonstandard) {
				problems.push(item.name + ' is not a real item.');
			}
			let ability = {};
			if (set.ability) ability = this.getAbility(set.ability);
			if (ability.isNonstandard) {
				problems.push(ability.name + ' is not a real ability.');
			}
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
				if (set.moves.length > 4) {
					problems.push((set.name || set.species) + ' has more than four moves.');
				}
			}
			return problems;
		}
	},
	{
		name: "Tier Shift",
		desc: [
			"Pok&eacute;mon below OU/BL get all their stats boosted. UU/BL2 get +5, RU/BL3 get +10, NU/BL4 get +15, and PU or lower get +20.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554765/\">Tier Shift</a>",
		],

		mod: 'tiershift',
		ruleset: ['OU'],
		banlist: ['Damp Rock'],
	},
	{
		name: "Inverse Battle",
		desc: [
			"Battle with an inverted type chart.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3518146/\">Inverse Battle</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526371/\">Inverse Battle Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Diggersby', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Serperior',
			'Shaymin-Sky', 'Snorlax', 'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Shadow Tag',
		],
		onNegateImmunity: false,
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "LC UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3562639/\">LC UU</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3562640/\">LC UU Viability Ranking</a>",
		],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Anorith', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Cottonee', 'Croagunk', 'Diglett',
			'Drifloon', 'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus', 'Gastly', 'Gothita', 'Honedge',
			'Larvesta', 'Magnemite', 'Mienfoo', 'Munchlax', 'Omanyte', 'Onix', 'Pawniard', 'Ponyta', 'Porygon', 'Scraggy',
			'Shellder', 'Snivy', 'Snubbull', 'Spritzee', 'Staryu', 'Stunky', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby',
			'Corphish', 'Houndour', 'Pancham', 'Skrelp', 'Vulpix', 'Zigzagoon', 'Shell Smash', 'Sticky Web',
		],
	},
	{
		name: "2v2 Doubles",
		desc: [
			"Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547040/\">2v2 Doubles</a>",
		],

		gameType: 'doubles',

		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['Doubles OU'],
		banlist: ['Kangaskhanite', 'Perish Song'],
	},
	{
		name: "Meta Man",
		desc: [
			"When a Pokemon faints, the opposing Pokemon replaces its current ability with the fainted Pokemon's and gains its last-used move in a new slot (for up to 9 total moves). These changes last the entire match. If a Pokemon faints before using a move during the match, no move is gained by the opponent.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/meta-man.3565966/\">Meta Man</a>",
		],
		section: "Other Metagames",
		mod: "metaman",
		ruleset: ['OU'],
		onFaint: function(pokemon)
		{
			this.add("-message",pokemon.side.foe.pokemon[0].name+" received "+pokemon.name+"'s "+this.data.Abilities[pokemon.ability].name+"!");
			pokemon.side.foe.pokemon[0].setAbility(pokemon.ability);
			pokemon.side.foe.pokemon[0].baseAbility = pokemon.ability;
			let lastMove = pokemon.lastM;
			let has
			if(pokemon.side.foe.pokemon[0].moveset.length<=9 && lastMove && !pokemon.side.foe.pokemon[0].hasMove(lastMove.id))
			{
				pokemon.side.foe.pokemon[0].moveset.push(lastMove);
				pokemon.side.foe.pokemon[0].baseMoveset.push(lastMove);
				this.add("-message",pokemon.side.foe.pokemon[0].name+" received "+pokemon.name+"'s "+pokemon.lastM.move+"!");
			}
		},
	},
	{
	    name: "Top Percentage",
	    section: "Other Metagames",
	    mod: 'toppercentage',
	    desc:["&lt; <a href=\"http://www.smogon.com/forums/threads/top-percentage.3564459/\">Top Percentage</a>"],
	    ruleset: ['OU'],
	    onBegin: function() {
			this.add("raw|Welcome to Top Percentage! The first Player to deal 400% damage wins! HAHAHAH!");
		for (var i = 0; i < this.sides.length; i++) {
		    this.sides[i].metaCount = 400;
		}
	    },
	    onDamage: function(damage, target) {
		//only should work if does not make target faint
		let percentage = 100 * damage / target.maxhp;
		if (damage >= target.hp) {
		    percentage = 100 * target.hp / target.maxhp;
		}
		target.side.metaCount -= percentage;
		this.add('-message', target.side.name+" has " + Math.round(target.side.metaCount) + "% left!");
		if (target.side.metaCount <= 0.1) {
		    //note: making this 0.1 because I got 1.10 times 10^-15 once
		    //something silly with rounding
		    //this works well enough
	            this.add('-message', target.side.foe.name+" has dealt 400% damage!");
		    this.win(target.side.foe);
		}
	    }
	},
	{
			name:"Partners in Crime",
		        section: "Other Metagames",
		        desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/partners-in-crime.3559988/\">Partners in Crime</a>"],
		        ruleset: ["Doubles OU"],
		        mod: "pic",
		        gameType:"doubles",
		        banlist: ["Huge Power","Kangaskhanite", "Mawilite","Medichamite","Pure Power","Wonder Guard"],
			onBegin: function()
			{
					for(let i=1;i<=2;i++)
					{
						for(let j=0;j<this["p"+i].pokemon.length;j++)
						{
							this["p"+i].pokemon[j].om = this["p"+i].pokemon[j].moveset;
							this["p"+i].pokemon[j].obm = this["p"+i].pokemon[j].baseMoveset;
						}
					}
			},
		        onSwitchIn: function(pokemon)
		        {
		        	let side = pokemon.side.id, partner = (pokemon.position==0)?1:0;
		        	if(pokemon.isActive && this[side].pokemon[partner].isActive)
		        	{
		        		let partl = this[side].pokemon[partner].obm.length, pokl = pokemon.obm.length;
		        		this[side].pokemon[partner].moveset = this[side].pokemon[partner].om.concat(pokemon.om);
		        		this[side].pokemon[partner].baseMoveset = this[side].pokemon[partner].obm.concat(pokemon.obm);
		        		pokemon.moveset = pokemon.om.concat(this[side].pokemon[partner].om);
		        		pokemon.baseMoveset = pokemon.obm.concat(this[side].pokemon[partner].obm);
					for(let i=0;i<this[side].pokemon[partner].moveset.length;i++)
					{
						if(!this[side].pokemon[partner].volatiles.choicelock)
						{
							this[side].pokemon[partner].moveset[i].disabled=false;
							this[side].pokemon[partner].moveset[i].disabledSource = '';
							this[side].pokemon[partner].baseMoveset[i].disabled=false;
							this[side].pokemon[partner].baseMoveset[i].disabledSource = '';
						}
					}
					for(let i=0;i<pokemon.moveset.length;i++)
					{
						if(!pokemon.volatiles.choicelock)
						{
							pokemon.moveset[i].disabled=false;
							pokemon.moveset[i].disabledSource = '';
							pokemon.baseMoveset[i].disabled=false;
							pokemon.baseMoveset[i].disabledSource = '';
						}
					}
		        		if(Object.keys(this[side].pokemon[partner].volatiles).indexOf(toId(pokemon.ability))<0 && this[side].pokemon[partner].ability != pokemon.ability)
		        		{
		        			if(this[side].pokemon[partner].innate) this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate);
		        			this[side].pokemon[partner].innate = toId(pokemon.ability);
		        			this[side].pokemon[partner].addVolatile(this[side].pokemon[partner].innate);
		        		}
		        		if(Object.keys(pokemon.volatiles).indexOf(toId(this[side].pokemon[partner].ability))<0 && this[side].pokemon[partner].ability != pokemon.ability)
		        		{
		        			if(pokemon.innate) pokemon.removeVolatile(pokemon.innate);
		        			pokemon.innate = toId(this[side].pokemon[partner].ability);
		        			pokemon.addVolatile(pokemon.innate);
		        		}
		        	}
		        },
		        onAfterMega: function(pokemon)
		        {
		        	let side = pokemon.side.id, partner = (pokemon.position==0)?1:0;
		        	if(Object.keys(this[side].pokemon[partner].volatiles).indexOf(toId(pokemon.ability))<0 && this[side].pokemon[partner].ability != pokemon.ability)
		        	{
		        			if(this[side].pokemon[partner].innate) this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate);
		        			this[side].pokemon[partner].innate = toId(pokemon.ability);
		        			this[side].pokemon[partner].addVolatile(this[side].pokemon[partner].innate);
		        	}
		        },
		        onFaint: function(pokemon)
		        {
		        	let side = pokemon.side.id, partner = (pokemon.position==0)?1:0;
		        	if(this[side].pokemon[partner].isActive)
		        	{
		        		this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate)
		        		delete this[side].pokemon[partner].innate;
		        	}
		        	this[side].pokemon[partner].moveset = this[side].pokemon[partner].om;
		        	this[side].pokemon[partner].baseMoveset = this[side].pokemon[partner].obm;
		        },
		},
	{
		name: "Averagemons",
		desc: [
			"Every Pok&eacute;mon has a stat spread of 100/100/100/100/100/100.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a>",
		],
		section: "Other Metagames",


		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Smeargle', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Sableye + Prankster',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Light Ball', 'Soul Dew', 'Thick Club', 'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
	},
	{
		name: "Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a>",
		],


		mod: 'hiddentype',
		ruleset: ['OU'],
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU'],
	},
	{
		name: "Gen-NEXT OU",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},
	{
		section: "Old OMotMs",
		column: 3,
	},
	{
		name: "Follow The Leader",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3565685/\">Follow The Leader</a>"],
		section: "Old OMotMs",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Regigigas', 'Shedinja', 'Slaking', 'Smeargle', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew',
			'Arena Trap', 'Gale Wings', 'Huge Power', 'Imposter', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
		validateSet: function (set, teamHas) {
			let species = toId(set.species);
			let template = this.tools.getTemplate(species);
			if (!template.exists || template.isNonstandard) return ["" + set.species + " is not a real Pok\u00E9mon."];
			if (template.battleOnly) template = this.tools.getTemplate(template.baseSpecies);
			if (this.tools.getBanlistTable(this.format)[template.id] || template.tier in {'Uber': 1, 'Unreleased': 1} && template.species !== 'Aegislash') {
				return ["" + template.species + " is banned by Follow The Leader."];
			}

			if (!teamHas.donorTemplate) teamHas.donorTemplate = template;
			let name = set.name;
			if (name === set.species) delete set.name;
			set.species = teamHas.donorTemplate.species;
			let problems = this.validateSet(set, teamHas, teamHas.donorTemplate);

			set.species = template.species;
			set.name = (name === set.species ? "" : name);

			return problems;
		},
	},
    	{
        name: "Gifts of the Gods",
        desc: [
            "Each Pok&eacute;mon receives one base stat, depending on its position, from the Uber.",
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3579610/\">Gifts of the Gods</a>",
        ],
        section: "Old OMotMs",
        column: 3,

        ruleset: ['Ubers', 'Baton Pass Clause'],
        banlist: ['Uber > 1', 'AG ++ Uber', 'Blissey', 'Chansey', 'Eviolite', 'Mawilite', 'Medichamite', 'Sablenite', 'Soul Dew', 'Huge Power', 'Pure Power', 'Shadow Tag'],
        onBegin: function () {
            let stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
            for (let j = 0; j < this.sides.length; j++) {
                // onBegin happens before Mega Rayquaza clause
                let uber = this.sides[j].pokemon.find(pokemon => ['AG', 'Uber'].includes(this.getTemplate(pokemon.canMegaEvo || pokemon.baseTemplate).tier)) || this.sides[j].pokemon[0];
                for (let i = 0, len = this.sides[j].pokemon.length; i < len; i++) {
                    let pokemon = this.sides[j].pokemon[i];
                    ["baseTemplate", "canMegaEvo"].forEach(key => {
                        if (pokemon[key]) {
                            let template = Object.assign({}, this.getTemplate(pokemon[key]));
                            template.baseStats = Object.assign({}, template.baseStats);
                            template.baseStats[stats[i]] = uber.baseTemplate.baseStats[stats[i]];
                            pokemon[key] = template;
                        }
                    });
                    pokemon.formeChange(pokemon.baseTemplate);
                    if (i === 0 && !pokemon.template.maxHP) {
                        pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
                    }
                }
            }
        },
    	},
	{
   name: "Gods and Followers",
	 desc: [
		 "The Pok&eacute;mon in the first slot is the God; the Followers must share a type with the God. If the God Pok&eacute;mon faints, the Followers are inflicted with Curse.",
		 "&bullet; <a href=\"https://www.smogon.com/forums/threads/3545230/\">Gods and Followers</a>",
	 ],
   section: "Old OMotMs",

   mod: 'godsandfollowers',
   ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Followers Clause', 'Cancel Mod'],
   banlist: ['Illegal']
},
	{
		name: "Haxmons",
		section: "Old OMotMs",

		ruleset: ['OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
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
        name: "Inheritance",
        desc: [
                "Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.",
                "&bullet; <a href=\"https://www.smogon.com/forums/threads/3529252/\">Inheritance</a>",
        ],

        ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 'Evasion Moves Clause', 'OKHO Clause', 'Swagger Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
        banlist: ['Unreleased', 'Illegal', 'Assist', 'Chatter'],
        customBans: {
                receiver: {
                        arceus: 1,
                        archeops: 1,
                        darkrai: 1,
                        deoxys: 1,
                        deoxysattack: 1,
                        deoxysspeed: 1,
                        dialga: 1,
                        giratina: 1,
                        giratinaorigin: 1,
                        groudon: 1,
                        hooh: 1,
                        hoopaunbound: 1,
                        keldeo: 1,
                        kyogre: 1,
                        kyuremblack: 1,
                        kyuremwhite: 1,
                        lugia: 1,
                        mewtwo: 1,
                        palkia: 1,
                        rayquaza: 1,
                        regigigas: 1,
                        reshiram: 1,
                        shayminsky: 1,
                        shedinja: 1,
                        slaking: 1,
                        xerneas: 1,
                        yveltal: 1,
                        zekrom: 1
                },
                donor: {
                        masquerain: 1,
                        sableye: 1,
                        smeargle: 1
                },
                inheritedAbilities: {
                        arenatrap: 1,
                        galewings: 1,
                        hugepower: 1,
                        imposter: 1,
                        parentalbond: 1,
                        purepower: 1,
                        shadowtag: 1,
                        wonderguard: 1
                },
                items: {
                        blazikenite: 1,
                        gengarite: 1,
                        kangaskhanite: 1,
                        mawilite: 1,
                        salamencite: 1,
                        souldew: 1
                }
        },
        noChangeForme: true,
        noChangeAbility: true,
        getEvoFamily: function(species) {
                let template = Tools.getTemplate(species);
                while (template.prevo) {
                        template = Tools.getTemplate(template.prevo);
                }
                return template.speciesid;
        },
        onValidateTeam: function(team, format, teamHas) {
                // Donor Clause
                let evoFamilyLists = [];
                for (let i = 0; i < team.length; i++) {
                        let set = team[i];
                        if (!set.abilitySources) continue;
                        evoFamilyLists.push(new Set(set.abilitySources.map(format.getEvoFamily)));
                }

                // Checking actual full incompatibility would require expensive algebra.
                // Instead, we only check the trivial case of multiple PokÃ©mon only legal for exactly one family. FIXME?
                let requiredFamilies = Object.create(null);
                for (let i = 0; i < evoFamilyLists.length; i++) {
                        let evoFamilies = evoFamilyLists[i];
                        if (evoFamilies.size !== 1) continue;
                        evoFamilies = Array.from(evoFamilies);
                        if (requiredFamilies[evoFamilies[0]]) return ["You are limited to one inheritance from each family by the Donor Clause.", "(You inherit more than once from " + this.getTemplate(evoFamilies[0]).species + "'s.)"];
                        requiredFamilies[evoFamilies[0]] = 1;
                }
        },
        validateSet: function(set, teamHas) {
                if (!this.format.abilityMap) {
                        let abilityMap = Object.create(null);
                        for (let speciesid in this.tools.data.Pokedex) {
                                let pokemon = this.tools.data.Pokedex[speciesid];
                                if (pokemon.num < 1 || pokemon.num > 720) continue;
                                for (let key in pokemon.abilities) {
                                        let abilityId = toId(pokemon.abilities[key]);
                                        if (abilityMap[abilityId]) {
                                                abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](speciesid);
                                        } else {
                                                abilityMap[abilityId] = [speciesid];
                                        }
                                }
                        }
                        this.format.abilityMap = abilityMap;
                }

                this.format.noChangeForme = false;
                let problems = this.tools.getFormat('Pokemon').onChangeSet.call(this.tools, set, this.format) || [];
                this.format.noChangeForme = true;

                if (problems.length) return problems;

                let species = toId(set.species);
                let template = this.tools.getTemplate(species);
                if (!template.exists) return ["" + set.species + " is not a real Pok\u00E9mon."];
                if (template.isUnreleased) return ["" + set.species + " is unreleased."];
                if (template.speciesid in this.format.customBans.receiver) {
                        return ["" + set.species + " is banned."];
                } else if (!this.tools.data.FormatsData[species] || !this.tools.data.FormatsData[species].tier) {
                        if (toId(template.baseSpecies) in this.format.customBans.receiver) {
                                return ["" + template.baseSpecies + " is banned."];
                        }
                }

                let name = set.name;

                let abilityId = toId(set.ability);
                if (!abilityId) return ["" + (set.name || set.species) + " must have an ability."];
                let pokemonWithAbility = this.format.abilityMap[abilityId];
                if (!pokemonWithAbility) return ["" + set.ability + " is an invalid ability."];
                let isBaseAbility = Object.values(template.abilities).map(toId).indexOf(abilityId) >= 0;
                if (!isBaseAbility && abilityId in this.format.customBans.inheritedAbilities) return ["" + set.ability + " is banned from being passed down."];

                // Items must be fully validated here since we may pass a different item to the base set validator.
                let item = this.tools.getItem(set.item);
                if (item.id) {
                        if (!item.exists) return ["" + set.item + " is an invalid item."];
                        if (item.isUnreleased) return ["" + (set.name || set.species) + "'s item " + item.name + " is unreleased."];
                        if (item.id in this.format.customBans.items) return ["" + item.name + " is banned."];
                }

                let validSources = set.abilitySources = []; // evolutionary families
                for (let i = 0; i < pokemonWithAbility.length; i++) {
                        let donorTemplate = this.tools.getTemplate(pokemonWithAbility[i]);
                        let evoFamily = this.format.getEvoFamily(donorTemplate);

                        if (validSources.indexOf(evoFamily) >= 0) {
                                // The existence of a legal set has already been established.
                                // We only keep iterating to find all legal donor families (Donor Clause).
                                // Skip this redundant iteration.
                                continue;
                        }

                        if (set.name === set.species) delete set.name;
                        if (donorTemplate.species !== set.species && toId(donorTemplate.species) in this.format.customBans.donor) {
                                problems = ["" + donorTemplate.species + " is banned from passing abilities down."];
                                continue;
                        } else if (donorTemplate.species !== set.species && abilityId in this.format.customBans.inheritedAbilities) {
                                problems = ["The ability " + this.tools.getAbility(abilityId).name + " is banned from being passed down."];
                                continue;
                        }
                        set.species = donorTemplate.species;
                        if (donorTemplate.species !== template.species && donorTemplate.requiredItem) {
                                // Bypass forme validation. Relevant to inherit from Giratina-O, and Mega/Primal formes.
                                set.item = donorTemplate.requiredItem;
                        }
                        problems = this.validateSet(set, teamHas) || [];
                        if (!problems.length) {
                                validSources.push(evoFamily);
                        }
                        if (validSources.length > 1) {
                                // This is an optimization only valid for the current basic implementation of Donor Clause.
                                // Remove if the FIXME? above actually gets fixed.
                                break;
                        }
                }

                // Restore the intended species, name and item.
                set.species = template.species;
                set.name = (name === set.species ? "" : name);
                set.item = item.name;

                if (!validSources.length && pokemonWithAbility.length > 1) {
                        return ["" + (set.name || set.species) + " set is illegal."];
                }
                if (!validSources.length) {
                        problems.unshift("" + (set.name || set.species) + " has an illegal set with an ability from " + this.tools.getTemplate(pokemonWithAbility[0]).name);
                        return problems;
                }
        }
	},
	{
		name: "Megamons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a>"],
		section: "Old OMotMs",

		ruleset: ['Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Mega Rayquaza Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Gengar-Mega', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'],
		onValidateTeam: function (team) {
			let problems = [];
			let kyurems = 0;
			for (let i = 0; i < team.length; i++) {
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
			let item = this.getItem(set.item);
			let template = this.getTemplate(set.species);
			let problems = [];
			let totalEV = 0;

			if (set.species === set.name) delete set.name;
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' does not exist.');
					}
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (template.isNonstandard) {
				problems.push(set.species + ' does not exist.');
			}
			if (this.getAbility(set.ability).isNonstandard) {
				problems.push(set.ability + ' does not exist.');
			}
			if (item.isNonstandard) {
				if (item.isNonstandard === 'gen2') {
					problems.push(item.name + ' does not exist outside of gen 2.');
				} else {
					problems.push(item.name + ' does not exist.');
				}
			}
			for (let k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			if (template.gender) {
				if (set.gender !== template.gender) {
					set.gender = template.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = undefined;
				}
			}

			let baseTemplate = this.getTemplate(template.baseSpecies);
			if (set.ivs && baseTemplate.gen >= 6 && (template.eggGroups[0] === 'Undiscovered' || template.species === 'Manaphy') && !template.prevo && !template.nfe && template.species !== 'Unown' && template.baseSpecies !== 'Pikachu' && (template.baseSpecies !== 'Diancie' || !set.shiny)) {
				let perfectIVs = 0;
				for (let i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " must have at least three perfect IVs because it's a legendary in gen 6.");
			}

			let moves = [];
			if (set.moves) {
				let hasMove = {};
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					let moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			let battleForme = template.battleOnly && template.species;
			if (battleForme && !template.isMega) {
				if (template.requiredAbility && set.ability !== template.requiredAbility) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredAbility + "."); // Darmanitan-Zen
				}
				if (template.requiredItem && item.name !== template.requiredItem) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredItem + '.'); // Primal
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredMove + "."); // Meloetta-Pirouette
				}
				if (!format.noChangeForme) set.species = template.baseSpecies; // Fix forme for Aegislash, Castform, etc.
			} else {
				if (template.requiredItem && item.name !== template.requiredItem && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to hold " + template.requiredItem + '.'); // Plate/Drive/Griseous Orb
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0 && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to have the move " + template.requiredMove + "."); // Keldeo-Resolute
				}

				if (item.forcedForme && template.species === this.getTemplate(item.forcedForme).baseSpecies && !format.noChangeForme) {
					set.species = item.forcedForme;
				}
			}

			if (set.species !== template.species) {
				template = this.getTemplate(set.species);
				if (!format.noChangeAbility) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (template.abilities[i] !== set.ability) continue;
						legalAbility = true;
						break;
					}
					if (!legalAbility) {
						set.ability = template.abilities['0'];
					}
				}
			}

			if (set.shiny && template.unobtainableShiny) {
				problems.push("It's currently not possible to get a shiny " + template.species + ".");
			}

			return problems;
		},
		onSwitchIn: function (pokemon) {
			let item = pokemon.getItem();
			if (item.megaEvolves && pokemon.template.species === item.megaEvolves) {
				pokemon.canMegaEvo = item.megaStone;
			}
		},
	},
	{
        name: "Metagamiate",
        desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3502303/\">Metagamiate</a>"],

		section: "Old OMotMs",

        ruleset: ['OU'],
        banlist: ['Dragonite', 'Kyurem-Black'],
        onModifyMovePriority: -1,
        onModifyMove: function (move, pokemon) {
            if (move.type === 'Normal' && move.id !== 'hiddenpower' && !pokemon.hasAbility(['aerilate', 'pixilate', 'refrigerate'])) {
                let types = pokemon.getTypes();
                let type = types.length < 2 || !pokemon.set.shiny ? types[0] : types[1];
                move.type = type;
                move.isMetagamiate = true;
            }
        },
        onBasePowerPriority: 8,
        onBasePower: function (basePower, attacker, defender, move) {
            if (!move.isMetagamiate) return;
            return this.chainModify([0x14CD, 0x1000]);
        },
    },
    {
		name: "Nature Swap",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3577739/\">Nature Swap</a>"],
		section: "Old OMotMs",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Chansey', 'Cloyster'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let nature = pokemon.battle.getNature(pokemon.set.nature);
				if (nature.plus !== nature.minus) {
					["baseTemplate", "canMegaEvo"].forEach(key => {
						if (pokemon[key]) {
							let template = Object.assign({}, this.getTemplate(pokemon[key]));
							template.baseStats = Object.assign({}, template.baseStats);
							let plus = template.baseStats[nature.plus];
							let minus = template.baseStats[nature.minus];
							template.baseStats[nature.plus] = minus;
							template.baseStats[nature.minus] = plus;
							pokemon[key] = template;
						}
					});
					pokemon.formeChange(pokemon.baseTemplate);
				}
			}
		},
	},
	 {
        name: "No Status",
        section: "Old OMotMs",
        ruleset: ['OU'],
        validateSet: function (set) {
            var problems = [];
            if (set.moves) {
                for (var i = 0; i < set.moves.length; i++) {
                    var move = this.getMove(set.moves[i]);
                    if (move.category === 'Status') problems.push(move.name + ' is banned due to it being a Status move.');
                }
            }
            return problems;
        }
    },
	{
        name: "Protean Palace",
				desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/protean-palace.3496299/\">Protean Palace</a>"],
				section: "Old OMotMs",
				column: 2,

        ruleset: ['Pokemon', 'Standard', 'Team Preview'],
        banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
        onPrepareHit: function (source, target, move) {
            var type = move.type;
            if (type && type !== '???' && source.getTypes().join() !== type) {
                if (!source.setType(type)) return;
                this.add('-start', source, 'typechange', type);
            }
        }
    },


	{
        	name: "Anti-Vaxxers",
		desc: ["All type-based immunities cease to apply."],
        	section: "New Other Metagames",
        	column: 3,
        	mod: "antivaxxers",
        	ruleset: ["OU"],
	},
	{
		name: "Ascension",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3546114/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],
		section: "New Other Metagames",
		mod: "ascension",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
			 name: "Bad \'n Boosted",
			 section: "New Other Metagames",

			 mod: 'bnb',
			 ruleset: ['Ubers'],
			 banlist: ['Eviolite', 'Huge Power', 'Pure Power']
	 },

   	{
        name: "Balanced Hackmons Plus",
        section: "New Other Metagames",

        mod: 'bhplus',
        ruleset: ['Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod'],
        banlist: ['Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter'],
        onModifyMove: function (move, pokemon) {
            if (move.id === 'naturepower') {
                move.onTryHit = function (target, source) {
                    var moveToUse = 'earthquake';
                    if (this.isTerrain('electricterrain')) {
                        moveToUse = 'thunderbolt';
                    } else if (this.isTerrain('grassyterrain')) {
                        moveToUse = 'energyball';
                    } else if (this.isTerrain('mistyterrain')) {
                        moveToUse = 'moonblast';
                    }
                    this.useMove(moveToUse, source, target);
                }
            }
        },
        validateSet: function (set) {
            var template = this.tools.getTemplate(set.species);
            var item = this.tools.getItem(set.item);
            var problems = [];

            if (set.species === set.name) delete set.name;
            if (template.isNonstandard) {
                problems.push(set.species + ' is not a real Pokemon.');
            }
            if (item.isNonstandard) {
                problems.push(item.name + ' is not a real item.');
            }
            var ability = {};
            if (set.ability) ability = this.tools.getAbility(set.ability);
            if (ability.isNonstandard) {
                problems.push(ability.name + ' is not a real ability.');
            }
            if (set.moves) {
                for (var i = 0; i < set.moves.length; i++) {
                    var move = this.tools.getMove(set.moves[i]);
                    if (move.isNonstandard) {
                        problems.push(move.name + ' is not a real move.');
                    }
                }
                if (set.moves.length > 4) {
                    problems.push((set.name || set.species) + ' has more than four moves.');
                }
            }
            if (set.level && set.level > 100) {
                problems.push((set.name || set.species) + ' is higher than level 100.');
            }
            return problems;
        }
    },
    {
    	 name: "Baton Pass Marathon",
    	 desc:["&bullet; <a href=\"http://www.smogon.com/forums/threads/baton-pass-marathon-coded-looking-for-a-server.3517800\">Baton Pass Marathon</a>",],
    	 section: "New Other Metagames",
    	 mod: 'batonpassmarathon',

    	 ruleset: ['OU'],
    	 banlist: ['Perish Song', 'Sand Attack', 'Flash', 'Kinesis', 'Mud-Slap', 'Smokescreen', 'Acupressure'],
    	 onFaint: function (pokemon) {
    	      pokemon.clearVolatile();
    	 }
	},

	{
		 name: "Camomons",
		 desc: [
				 "Pok&eacute;mon change type to match their first two moves.",
				 "&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		 ],
		 section: "New Other Metagames",

		 ruleset: ['OU'],
		 onBegin: function () {
				 let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
				 for (let i = 0, len = allPokemon.length; i < len; i++) {
						 let pokemon = allPokemon[i];
						 let types = [this.getMove(pokemon.moves[0]).type];
						 if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
						 pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
						 pokemon.types = pokemon.template.types = types;
				 }
		 },
		 onAfterMega: function (pokemon) {
				 let types = [this.getMove(pokemon.moves[0]).type];
				 if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
				 pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				 pokemon.types = pokemon.template.types = types;
		 },
 },
    	{
		name: "Cross Evolution",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3569577/\">Cross Evolution</a>"],
		section: "Other Metagames",

		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Rule:nicknameclause'],
		onValidateTeam: function (team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (nameTable[name]) {
						return ["Your Pokémon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
		validateSet: function (set, teamHas) {
			let crossTemplate = this.tools.getTemplate(set.name);
			if (!crossTemplate.exists) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			if (!template.exists) return ["The Pokemon '" + set.species + "' does not exist."];
			if (!template.evos.length) return ["" + template.species + " cannot cross evolve because it doesn't evolve."];
			if (crossTemplate.species == 'Shedinja') return ["" + template.species + " cannot cross evolve into " + crossTemplate.species + " because it is banned."];
			if (crossTemplate.battleOnly || !crossTemplate.prevo) return ["" + template.species + " cannot cross evolve into " + crossTemplate.species + " because it isn't an evolution."];
			let crossPrevoTemplate = this.tools.getTemplate(crossTemplate.prevo);
			if (!crossPrevoTemplate.prevo !== !template.prevo) return ["" + template.species + " cannot cross into " + crossTemplate.species + " because they are not consecutive evolutionary stages."];

			// Make sure no stat is too high/low to cross evolve to
			let stats = {'hp': 'HP', 'atk': 'Attack', 'def': 'Defense', 'spa': 'Special Attack', 'spd': 'Special Defense', 'spe': 'Speed'};
			for (let statid in template.baseStats) {
				let evoStat = template.baseStats[statid] + crossTemplate.baseStats[statid] - crossPrevoTemplate.baseStats[statid];
				if (evoStat < 1) {
					return ["" + template.species + " cannot cross evolve to " + crossTemplate.species + " because its " + stats[statid] + " would be too low."];
				} else if (evoStat > 255) {
					return ["" + template.species + " cannot cross evolve to " + crossTemplate.species + " because its " + stats[statid] + " would be too high."];
				}
			}

			let mixedTemplate = Object.assign({}, template);
			// Ability test
			let ability = this.tools.getAbility(set.ability);
			if (ability.name !== 'Huge Power' && ability.name !== 'Pure Power' && ability.name !== 'Shadow Tag') mixedTemplate.abilities = crossTemplate.abilities;

			mixedTemplate.learnset = Object.assign({}, template.learnset);
			let newMoves = 0;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (!this.checkLearnset(move, template)) continue;
				if (this.checkLearnset(move, crossTemplate)) continue;
				if (++newMoves > 2) continue;
				mixedTemplate.learnset[move] = ['6T'];
			}
			return this.validateSet(set, teamHas, mixedTemplate);
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
                                if (pokemon.set.name === pokemon.set.species) continue;
				let crossTemplate = this.getTemplate(pokemon.name);
				if (!crossTemplate.exists) continue;
				try {
				let template = pokemon.baseTemplate;
				let crossPrevoTemplate = this.getTemplate(crossTemplate.prevo);
				let mixedTemplate = Object.assign({}, template);
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species + '-' + crossTemplate.species;
				mixedTemplate.weightkg = Math.max(0.1, template.weightkg + crossTemplate.weightkg - crossPrevoTemplate.weightkg);
				mixedTemplate.nfe = false;

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = template.baseStats[statid] + crossTemplate.baseStats[statid] - crossPrevoTemplate.baseStats[statid];
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				if (crossTemplate.types[0] !== crossPrevoTemplate.types[0]) mixedTemplate.types[0] = crossTemplate.types[0];
				if (crossTemplate.types[1] !== crossPrevoTemplate.types[1]) mixedTemplate.types[1] = crossTemplate.types[1] || crossTemplate.types[0];
				if (mixedTemplate.types[0] === mixedTemplate.types[1]) mixedTemplate.types.length = 1;

				pokemon.baseTemplate = mixedTemplate;
				pokemon.formeChange(mixedTemplate);
				pokemon.crossEvolved = true;
				} catch (e) {
					this.add('-hint', 'Failed to cross evolve ' + pokemon.baseTemplate.species + ' to ' + crossTemplate.species + '. Please report this error so that it can be fixed.');
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			if (pokemon.crossEvolved) {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
	},
	{
	name:"Imprisoned",
	section:"New Other Metagames",
	ruleset:['OU'],
	desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/imprisoned.3580920/\">Imprisoned</a>"],
	onBegin: function()
	{
		this.p1.impris = [];
		this.p2.impris = [];
		this.isImpris=function(side,move)
		{
			let b=false;
			for(let i=0;i<this[side].impris.length;i++)
				if(this[side].impris[i]==move)
					b=true;
			return b;
		}
	},
	onDisableMove: function(pokemon)
	{
		let side=pokemon.side.id;
		for(let j=0;j<pokemon.moves.length;j++)
		{
			let curmove=pokemon.moves[j];
			if(this.isImpris(side,curmove))
				pokemon.disableMove(curmove);
		}
	},
	onTryMove: function(source, target, move)
	{
		let side=target.side.id,opside=source.side.id;
		if(!this.isImpris(side,move.id))
			this[side].impris.push(move.id);
		for(let i=0;i<this[opside].pokemon.length;i++)
		{
			for(let j=0;j<this[opside].pokemon[i].moves.length;j++)
			{
				let curmove=this[opside].pokemon[i].moves[j];
				if(this.isImpris(opside,curmove))
					this[opside].pokemon[i].disableMove(curmove);
			}
		}
	},
},
    {
		name: "The All-Stars Metagame",
		section: "New Other Metagames",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-all-stars-metagame-v2-enter-the-pu-a-pokemon-from-each-tier.3510864//\">The All-Stars Metagame</a>"],
		banlist: [],

		onValidateTeam: function(team){
			let ouMons = 0, uuMons = 0, ruMons = 0, nuMons = 0, puMons = 0, problems = [], check = true, template;
			for(let i = 0; i < team.length; i++){
           		let item = this.getItem(team[i].item);
           		if(item.megaStone) template = this.getTemplate(team[i].item.megaStone);
           		else template = this.getTemplate(team[i].species);
           		let ability = this.getAbility(template.ability);
           		let tier = template.tier;
	            for(var j in team[i].moves){
            		var move = this.getMove(team[i].moves[j]);
            		if(move.id == "chatter") tier = "NU";}
            		//Bans Drought + Drizzle users to OU
            	if(ability.id == "drizzle" || ability.id == "drought") tier = "OU";
            		//Bans Chatter to NU
            	if(tier == "OU" || tier == "BL") ouMons++;
				if(tier == "UU" || tier == "BL2") uuMons++;
				if(tier == "RU" || tier == "BL3") ruMons++;
				if(tier == "NU" || tier == "BL4") nuMons++;
				if(tier == "PU") puMons++;}
			while(check){
				if(1 < ouMons) problems.push("You are able to only bring a maximum of 1 OU / BL Pokemon.");
				if(2 < uuMons) problems.push("You are able to only bring a maximum of 2 UU / BL2 Pokemon.");
				if(1 < ruMons) problems.push("You are able to only bring a maximum of 1 RU / BL3 Pokemon.");
				if(1 < nuMons) problems.push("You are able to only bring a maximum of 1 NU / BL4 Pokemon.");
				if(1 < puMons) problems.push("You are able to only bring a maximum of 1 PU Pokemon.");
				else check = false;}
		return problems;
	},
},
    {
	     name: "Lockdown",
	     desc: [
	     		"&bullet; <a href=\"http://www.smogon.com/forums/threads/lockdown-now-playable.3565472/\">Lockdown</a>",
	     ],
	     section: "New Other Metagames",
	     mod: 'lockdown',

	     ruleset: ['OU'],
	     banlist: ['Damp Rock', 'Heat Rock', 'Smooth Rock', 'Icy Rock'],

	     onTryHitSide: function (target, source, move) {
	       console.log("trying hitting side");
	       let lockdownMoves = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'];
	       if (lockdownMoves.indexOf(move.id) > -1 && this.turn > 6) return false;
	     },
	     onTryHitField: function (target, source, move) {
	       console.log("trying hitting field");
	       let lockdownMoves = ['sunnyday', 'raindance', 'hail', 'sandstorm', 'magicroom', 'wonderroom', 'trickroom', 'gravity', 'electricterrain', 'mistyterrain', 'grassyterrain', 'mudsport', 'watersport'];
	       if (lockdownMoves.indexOf(move.id) > -1 && this.turn > 6) return false;
	   }
   	},
	{
	    name: "Mirror Move",
	    desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/mirror-move.3572990/\">Mirror Move</a>"],
	    section: "New Other Metagames",
	    ruleset: ["OU"],
	    banlist: ["Imprison"],
	    mod: "mirrormove",
	    onBegin: function() {
		for (let p = 0; p < this.sides.length; p++) {
		    for (let i = 0; i < this.sides[p].pokemon.length; i++) {
			this.sides[p].pokemon[i].om = [{}];
			this.sides[p].pokemon[i].obm = [{}];
			for (let k in this.sides[p].pokemon[i].baseMoveset[0]) {
			    this.sides[p].pokemon[i].om[0][k] = this.sides[p].pokemon[i].moveset[0][k];
			    this.sides[p].pokemon[i].obm[0][k] = this.sides[p].pokemon[i].baseMoveset[0][k];
			}
			if (this.sides[p].pokemon[i].baseMoveset[1]) {
			    this.sides[p].pokemon[i].om[1] = {};
			    this.sides[p].pokemon[i].obm[1] = {};
			    for (let k in this.sides[p].pokemon[i].baseMoveset[1]) {
				this.sides[p].pokemon[i].om[1][k] = this.sides[p].pokemon[i].moveset[1][k];
				this.sides[p].pokemon[i].obm[1][k] = this.sides[p].pokemon[i].baseMoveset[1][k];
			    }
			}
		    }
		}
	    },
	    onValidateSet(set) {
		if (set.moves.length > 2)
		    return ["You are allowed to bring only 2 moves on a Pokemon.", "(" + set.species + " has more than 2 moves)"]
	    }
	},
	{
		name: "Nature's Fear",
		section: "New Other Metagames",
		ruleset:['OU'],
		desc: ["All pokes have a special \"Intimidate\" on top on their ability, which means it still have their original Ability. This Intimidate lowers opposing stats by 1 stage based on negative (may be changed to positive if it's better) side of the Nature. For example, if you send out a Timid natured pokemon, your opponent's Attack is lowered.",
		       "&bullet; <a href=\"http://www.smogon.com/forums/threads/natures-fear.3584688/\">Nature's Fear</a>"],
		onSwitchIn: function (pokemon) {
			let foeactive = pokemon.side.foe.active, nature = {};
			if(!this.getNature(pokemon.set.nature).minus) return;
			nature[this.getNature(pokemon.set.nature).minus]=-1;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Nature\'s Fear', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost(nature, foeactive[i], pokemon);
				}
			}
		},
		onAfterMega: function (pokemon) {
			let foeactive = pokemon.side.foe.active, nature = {};
			if(!this.getNature(pokemon.set.nature).minus) return;
			nature[this.getNature(pokemon.set.nature).minus]=-1;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Nature\'s Fear', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost(nature, foeactive[i], pokemon);
				}
			}
		},
	},
   	{
        name: "Offensification",
        desc: [
        	"All attacks are caclulated from the user's highest attacking stat.",
		"&bullet; <a href=\"http://www.smogon.com/forums/threads/offensification-hoopa-u-banned.3524512/\">Offensification</a>",
        ],
        section: "New Other Metagames",
        ruleset: ['Pokemon', 'Standard', 'Team Preview'],
        banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Flatter', 'Kyurem-Black'],
        onModifyMove: function (move, pokemon) {
            if (pokemon.stats.atk > pokemon.stats.spa) {
                move.category = (move.category === "Status") ? "Status" : "Physical";
            } else if (pokemon.stats.spa > pokemon.stats.atk) {
                move.category = (move.category === "Status") ? "Status" : "Special";
            }

            if (move.id === 'bellydrum') {
                move.onHit = function (target) {
                    if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
                        return false;
                    }
                    this.directDamage(target.maxhp / 2);
                    if (target.stats.atk >= target.stats.spa) {
                        target.setBoost({atk: 6});
                        this.add('-setboost', target, 'atk', '6', '[from] move: Belly Drum');
                    } else {
                        target.setBoost({spa: 6});
                        this.add('-setboost', target, 'spa', '6', '[from] move: Belly Drum');
                    }
                }
            }
        },
        onBoost: function (boost, target, source, effect) {
            var boostee = target;
            if (source && target === source) boostee = source;
            var phys = false;
            if (boostee.stats.atk > boostee.stats.spa) phys = true;
            var spec = false;
            if (boostee.stats.atk < boostee.stats.spa) spec = true;
            if (phys || spec) {
                for (var i in boost) {
                    if (phys && i === 'spa') {
                        if (boost['atk']) boost['atk'] += boost[i];
                        else boost['atk'] = boost[i];
                        boost[i] = 0;
                    } else if (phys && i === 'spd') {
                        if (boost['def']) boost['def'] += boost[i];
                        else boost['def'] = boost[i];
                        boost[i] = 0;
                    } else if (spec && i === 'atk') {
                        if (boost['spa']) boost['spa'] += boost[i];
                        else boost['spa'] = boost[i];
                        boost[i] = 0;
                    } else if (spec && i === 'def') {
                        if (boost['spd']) boost['spd'] += boost[i];
                        else boost['spd'] = boost[i];
                        boost[i] = 0;
                    }
                }
            }
        }
    },
    {
    name: "Open House",
    section: "New Other Metagames",

    ruleset: ['OU'],
    banlist: [],



    onBegin: function() {
        this.randnumber = Math.floor(Math.random() * 3);
        this.randNo2 = Math.floor(Math.random() * 2);
        this.condition = "";
        if (this.randnumber === 0) {
            this.condition = "Magic Room";
        } else if (this.randnumber === 1) {
            this.condition = "Trick Room";
        } else {
            this.condition = "Wonder Room";
        }
        this.add("The battle will begin in the " + this.condition + "!");
    },
    onResidualOrder: 999,
    onResidual: function() {
        if (this.turn % 4 === 0) {
            if (this.condition === "Wonder Room") {
                if (this.randNo2 === 1) {
                    this.condition = "Magic Room";
                    this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
                    this.addPsuedoWeather(toId(this.condition));
                }
            } else {
                this.condition = "Trick Room";
                this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
                this.addPsuedoWeather(toId(this.condition));
            }
            if (this.condition === "Magic Room") {
                if (this.randNo2 === 1) {
                    this.condition = "Trick Room";
                    this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
                    this.addPsuedoWeather(toId(this.condition));
                } else {
                    this.condition = "Wonder Room";
                    this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
                    this.addPsuedoWeather(toId(this.condition));
                }
            }
            if (this.condition === "Trick Room") {
                if (this.randNo2 === 1) {
                    this.condition = "Wonder Room";
                    this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
                    this.addPsuedoWeather(toId(this.condition));
                } else {
                    this.condition = "Magic Room";
                    this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
                    this.addPsuedoWeather(toId(this.condition));
                }
            }
        }
    }

},
	{
		name: "No Haxmons",
		section: "New Other Metagames",

		ruleset: ['OU', 'Freeze Clause'],
		banlist: [],
		onModifyMovePriority: -100,
		onModifyMove: function (move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			move.willCrit = false;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	{
     name: "Palette Pals",
     section: "New Other Metagames",
     desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/palette-pals-formerly-tradeoff.3578405/\">Palette Pals</a>"],
     ruleset: ['OU'],
     banlist: ['Huge Power', 'Pure Power', 'Medichamite', 'Kyurem-Black', 'Slaking', 'Regigigas', 'Light Ball', 'Eviolite', 'Deep Sea Tooth', 'Deep Sea Scale', 'Thick Club'],
     onBegin: function () {
       for (let j = 0; j < this.sides.length; j++) {
         let allPokemon = this.sides[j].pokemon;
         let colorArray = [];
         for (let i = 0, len = allPokemon.length; i < len; i++) {
           let pokemon = allPokemon[i];
           let color = pokemon.template.color;
           if (colorArray.indexOf(color) > -1) {
             let copyIndex = colorArray.indexOf(color);
             let copycat = allPokemon[copyIndex];

             //Thanks to Nature Swap code for premise!!
             ["baseTemplate", "canMegaEvo"].forEach(key => {
               if (pokemon[key]) {

                 let template = Object.assign({}, this.getTemplate(pokemon[key]));
                 template.baseStats = Object.assign({}, template.baseStats);
                 let template2 = Object.assign({}, this.getTemplate(copycat.baseTemplate));
                 template2.baseStats = Object.assign({}, template2.baseStats);
                 template.baseStats = template2.baseStats;
                 pokemon[key] = template;
               }
             });
             pokemon.formeChange(pokemon.baseTemplate);

             //adjust for hp
             	if (pokemon.species !== "Shedinja") {
        		let hp = pokemon.baseTemplate.baseStats['hp'];
             		hp = Math.floor(Math.floor(2 * hp + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
             		pokemon.maxhp = hp;
             		pokemon.hp = hp;
             	}
           }
           colorArray.push(color);
         }
       }
     }
   },
{
	name:"Recyclables",
	section:"New Other Metagames",
desc:["&bullet;<a href=\"http://www.smogon.com/forums/threads/recyclables.3581818/\">Recyclables</a>: <br />If the item on a Pokemon was not knocked off, it will be recycled at the end of every turn."],
	ruleset:['OU'],
		onResidualOrder: 999, //This will always occur as the last possible occurence of the turn's residual phase.
        onResidual: function () {
            if ((this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem)&&!(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
            {
            	this.p2.pokemon[0].setItem(this.p2.pokemon[0].lastItem);
			this.add('-item', this.p2.pokemon[0], this.p2.pokemon[0].getItem(), '[from] move: Recycle');
			//return false;
            }
            else if (!(this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem)&&(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
            {
            	this.p1.pokemon[0].setItem(this.p1.pokemon[0].lastItem);
			this.add('-item', this.p1.pokemon[0], this.p1.pokemon[0].getItem(), '[from] move: Recycle');
			//return false;
            }
            else if (!(this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem)&&!(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
            {
            	this.p1.pokemon[0].setItem(this.p1.pokemon[0].lastItem);
			this.add('-item', this.p1.pokemon[0], this.p1.pokemon[0].getItem(), '[from] move: Recycle');
            	this.p2.pokemon[0].setItem(this.p2.pokemon[0].lastItem);
			this.add('-item', this.p2.pokemon[0], this.p2.pokemon[0].getItem(), '[from] move: Recycle');
            }
            else return false;
        }
},
	{
        name: "The Negative Metagame",
        desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-negative-metagame-playable-on-aqua.3529936/\">The Negative Metagame</a>"],
        section: "New Other Metagames",

        mod: 'thenegativemetagame',
        ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Swagger Clause', 'Team Preview', 'Evasion Moves Clause'],
        banlist: ['DeepSeaTooth', 'DeepSeaScale', 'Eviolite', 'Huge Power', 'Light Ball', 'Pure Power', 'Smeargle', 'Thick Club', 'Illegal', 'Unreleased']
    	},
         {
		name: "Therianmons",
	    section: "New Other Metagames",
	    desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/therianmons.3566303/\">Therianmons</a>"],
	    ruleset: ['OU'],

	    onBegin: function() {
	    	for (let j = 0; j < this.sides.length; j++) {
	            let allPokemon = this.sides[j].pokemon;
	            for (let i = 0, len = allPokemon.length; i < len; i++) {
	                let pokemon = allPokemon[i];
	                //Thanks to Nature Swap code for premise!!
	                ["baseTemplate", "canMegaEvo"].forEach(key => {
	                    if (pokemon[key]) {

	                        let template = Object.assign({}, this.getTemplate(pokemon[key]));
	                        template.baseStats = Object.assign({}, template.baseStats);
	                        if(pokemon.set.ivs.spa==30 && pokemon.set.ivs.spd==30 && pokemon.set.ivs.atk==30 && pokemon.set.ivs.def==30 && pokemon.set.ivs.hp==30)
	                        {
	                        	template.baseStats.atk-=15;
	                        	template.baseStats.def+=10;
	                        	template.baseStats.spa-=15;
	                        	template.baseStats.spd+=10;
	                        	template.baseStats.spe+=10;
	                        }
	                        else if(pokemon.set.ivs.spa==30 && pokemon.set.ivs.spd==30)
	                        {
	                        	template.baseStats.atk+=20;
	                        	template.baseStats.spa-=10;
	                        	template.baseStats.spe-=10;
	                        }
	                        else if(pokemon.set.ivs.spa==30)
	                        {
	                        	template.baseStats.spa+=20;
	                        	template.baseStats.atk-=10;
	                        	template.baseStats.spe-=10;
	                        }
	                        pokemon[key] = template;
	                    }
	                });
	                pokemon.formeChange(pokemon.baseTemplate);
	            }
	           }
	    },
	},
	{
	name:"The Great Pledge",
	section:"New Other Metagames",
	ruleset:['OU'],
	desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-great-pledge.3581858/\">The Great Pledge</a>"],
	onBegin: function()
	{
		this.p1.pledge= {
			terrain:"",
			duration:0
			}
		this.p2.pledge=
			{
			terrain:"",
			duration:0
			}
	},
	onResidual: function()
	{
		if(this.p2.pledge.duration>4 && this.p2.pledge.terrain!="")
		{
			this.add('-sideend', this.p2, this.p2.pledge.terrain);
			this.p2.pledge.duration=0;
			this.p2.pledge.terrain="";
		}
		else if(this.p2.pledge.terrain!="")
			this.p2.pledge.duration++;
		if(this.p1.pledge.duration>4 && this.p1.pledge.terrain!="")
		{
			this.add('-sideend', this.p1, this.p1.pledge.terrain);
			this.p1.pledge.duration=0;
			this.p1.pledge.terrain="";
		}
		else if(this.p1.pledge.terrain!="")
			this.p1.pledge.duration++;
		if(this.p1.terrain=="Fire Pledge")
		{
			if (this.p1.pokemon[0] && !this.p1.pokemon[0].hasType('Fire')) {
				this.damage(this.p1.pokemon[0].maxhp / 8, this.p1.pokemon[0]);
			}
		}
		if(this.p2.terrain=="Fire Pledge")
		{
			if (this.p2.pokemon[0] && !this.p2.pokemon[0].hasType('Fire')) {
				this.damage(this.p2.pokemon[0].maxhp / 8, this.p2.pokemon[0]);
			}
		}
	},
	onModifySpe: function (spe, pokemon)
	{
		if(this[pokemon.side.id].pledge.terrain=="Grass Pledge")
		return this.chainModify(0.25);
	},
	onModifyMove: function (move, source)
	{
		if(this[source.side.id].pledge.terrain=="Water Pledge")
		{
			if (move.secondaries && move.id !== 'secretpower') {
					this.debug('doubling secondary chance');
					for (let i = 0; i < move.secondaries.length; i++) {
						move.secondaries[i].chance *= 2;
					}
				}
		}
	},
	onSwitchIn: function(pokemon)
	{
		var pledgetype = function()
		{
			if(pokemon.types[0]=='Water') return 'water';
			if(pokemon.types[0]=='Grass') return 'grass';
			if(pokemon.types[0]=='Fire') return 'fire';
			if(pokemon.types[1]=='Water') return 'water';
			if(pokemon.types[1]=='Grass') return 'grass';
			if(pokemon.types[1]=='Fire') return 'fire';
		}
		if(pledgetype()=='fire')
		{
			if(pokemon.baseHpType=="Grass")
			{
				this.add('-sidestart', this[tSide], 'Fire Pledge');
				pokemon.side.foe.pledge.terrain="Fire Pledge";
				pokemon.side.foe.pledge.duration=0;
			}
			if(pokemon.baseHpType=="Water")
			{
				this.add('-sidestart', this[tSide], 'Water Pledge');
				pokemon.side.foe.pledge.terrain="Water Pledge";
				pokemon.side.foe.pledge.duration=0;
			}
		}
		if(pledgetype()=='grass')
		{
			if(pokemon.baseHpType=="Fire")
			{
				this.add('-sidestart', this[tSide], 'Fire Pledge');
				pokemon.side.foe.pledge.terrain="Fire Pledge";
				pokemon.side.foe.pledge.duration=0;
			}
			if(pokemon.baseHpType=="Water")
			{
				this.add('-sidestart', this[tSide], 'Grass Pledge');
				pokemon.side.foe.pledge.terrain="Grass Pledge";
				pokemon.side.foe.pledge.duration=0;
			}
		}
		if(pledgetype()=='water')
		{
			if(pokemon.baseHpType=="Grass")
			{
				this.add('-sidestart', this[tSide], 'Grass Pledge');
				pokemon.side.foe.pledge.terrain="Grass Pledge";
				pokemon.side.foe.pledge.duration=0;
			}
			if(pokemon.baseHpType=="Fire")
			{
				this.add('-sidestart', this[tSide], 'Water Pledge');
				pokemon.side.foe.pledge.terrain="Water Pledge";
				pokemon.side.foe.pledge.duration=0;
			}
		}
	},
},
	{
		name: "Trademarked",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/trademarked.3572949/\">Trademarked</a>"],
		section: "New Other Metagames",
		column: 1,

		mod: 'trademarked',
		ruleset: ['OU','trademarkclause'],
		banlist: ['Slaking','Regigigas'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set, teamHas).length) return [];
			let ability = this.tools.getAbility(set.ability);
			let template = this.tools.getTemplate(set.species);
			if (!set.moves.includes(ability.id) && !set.moves.includes(ability.name) && !this.checkLearnset(ability.id, template, {set: set})) {
				template = Object.assign({}, template);
				template.abilities = {0: ability.name};
			}
			return this.validateSet(set, teamHas, template);
		},
	},

	 {
        name: "Type Omelette",
        section: "New Other Metagames",


        ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
        banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Landorus', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite'],
        mod: 'mileseggsworth', //This is a pun, and was the most popular in name submissions.
        //Since this metagame uses custom types, let's make the types known to the players.
        onSwitchIn: function (pokemon) {
            var typeStr = pokemon.types[0];
            if (pokemon.types[1]) typeStr += '/' + pokemon.types[1]
            this.add('-start', pokemon, 'typechange', typeStr);
        }
    	},
	{
		name: "Universal Ubers",
		section: "New Other Metagames",
		mod: 'primordialpokemon',

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: []
	},
	{
        	name: "VoltTurn Mayhem",
        	desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/voltturn-mayhem-lcotm.3527847/\">VoltTurn Mayhem</a>"],
	        section: "New Other Metagames",

        	ruleset: ['Pokemon', 'Standard', 'Team Preview'],
        	banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
        	onModifyMove: function (move) {
	     if (move.target && !move.nonGhostTarget && (move.target === "normal" || move.target === "any" || move.target === "randomNormal" || move.target === "allAdjacent" || move.target === "allAdjacentFoes")) {
        	        move.selfSwitch = true;
        	    }
        	}
    	},
	{
		name: "Diversitype",
		section: "Experimental Metas",
		ruleset: ['OU'],
		onBegin: function()
		{
			for(let p=0;p<this.sides.length;p++)
			{
				for(let i=0;i<this.sides[p].pokemon.length;i++)
				{
					let pokemon = this.sides[p].pokemon[i];
					if(pokemon.types[1]) this.sides[p].pokemon[i].type2 = this.sides[p].pokemon[i].types[1];
				        this.sides[p].pokemon[i].types[1] = this.sides[p].pokemon[i].hpType || "Dark";
				        if(pokemon.types[0] === pokemon.types[1]) this.sides[p].pokemon[i].types.length = 1;
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
		        let types = pokemon.types;
			this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
		},
		onModifyMove: function(move, pokemon)
		{
			if(pokemon.type2 && move.type == pokemon.type2) move.type = pokemon.hpType || "Dark";
		},
		onAfterMega: function(pokemon) {
			if(pokemon.type2 === pokemon.types[1]) {
				pokemon.types[1] = pokemon.hpType;
				if(pokemon.types[0] === pokemon.types[1]) pokemon.types.length = 1;
			}
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
	{
		name: "Enchanted Items Balanced Hackmons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3570431/\">Enchanted Items</a>"],
		section: "Experimental Metas",
		column: 3,

		mod: 'enchanteditems',
		ruleset: ['Balanced Hackmons'],
		banlist: ['Bug Gem', 'Electric Gem', 'Fire Gem',
			'Ice Gem', 'Persim Berry', 'Poison Gem', 'Poke Ball', 'Steel Gem', 'Wave Incense','Aguav Berry',
		],
		onValidateSet: function (set) {

			let bannedAbilities = {'Arena Trap': 1, 'Huge Power': 1, 'Parental Bond': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
		onValidateTeam: function (team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getItem(ability.item).name + ")"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				item = this.getItem(item);
				ability = item.ability;
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + " or " + item.name + ")"];
				}
			}
		},
		onFaint: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	{
		name: "Enchanted Items Hackmons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3570431/\">Enchanted Items</a>"],
		section: "Experimental Metas",
		column: 4,

		mod: 'enchanteditems',
		ruleset: ['HP Percentage Mod'],
		banlist: ['Ignore Illegal Abilities','Ignore Illegal Moves'],
		onFaint: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	{
		name: "Enchanted Items Plus",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/enchanted-items-enchanted-items-plus-announced.3570431/page-20#post-6939744\">Enchanted Items Plus</a>"],
		section: "Experimental Metas",
		column: 2,

		mod: 'enchanteditems',
		ruleset: ['Ubers'],
		banlist: ['Ignore Illegal Abilities', 'Shedinja','Imposter',
			'Bug Gem', 'Electric Gem', 'Fire Gem',
			'Ice Gem', 'Poison Gem', 'Poke Ball', 'Steel Gem', 'Dark Gem','Psychic Gem',
		],
		onValidateSet: function (set) {

			let bannedAbilities = {'Arena Trap': 1, 'Huge Power': 1, 'Parental Bond': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Wonder Guard': 1,'Contrary': 1,'Simple': 1, 'Imposter':1, 'Simple':1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
			let ability = this.getAbility(set.ability);
			let item = this.getItem(set.item);
			if (ability.item && ability.item === item.id) {
				return ["You are not allowed to have " + ability.name + " and " + item.name + " on the same Pokémon."];
			}
		},
		onValidateTeam: function (team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getItem(ability.item).name + ")"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				item = this.getItem(item);
				ability = item.ability;
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + " or " + item.name + ")"];
				}
			}
		},
		onFaint: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	{
		name: "Multibility",
		desc: [
	     		"&bullet; Put your second ability in the item slot.",
	     	],
		section: "Experimental Metas",
		mod: 'franticfusions',
		ruleset: ['OU'],
		banlist: ["Illegal", 'Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter'],
 		onBegin: function() {
                        let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				if(this.getAbility(toId(pokemon.item))) {
                                	pokemon.abilitwo = toId(pokemon.item);
					pokemon.item = "";
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
		        if(pokemon.abilitwo && this.getAbility(pokemon.abilitwo)) {
				let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
				let sec = statusability[pokemon.abilitwo]? "other"+pokemon.abilitwo : pokemon.abilitwo;
				pokemon.addVolatile(sec, pokemon);//Second Ability! YAYAYAY
			}
		},
		validateSet: function(set, teamHas) {
			let item = set.item;
			if(this.tools.getAbility(toId(item)))
			{
				set.item = '';
				let problems = this.validateSet(set, teamHas) || [];
				let abilitwo = this.tools.getAbility(toId(item));
				let bans = {'arenatrap': true, 'contrary': true, 'furcoat': true, 'hugepower': true, 'imposter': true, 'parentalbond': true, 'purepower': true, 'shadowtag': true, 'trace': true, 'simple': true, 'wonderguard': true, 'moody': true};
				if(bans[toId(abilitwo.id)]) problems.push(set.species + "'s ability "+ abilitwo.name +" is banned by Multibility.");
				if(abilitwo.id === toId(set.ability)) problems.push("You cannot have two of "+abilitwo.name+" on the same Pokemon.");
				set.item = item;
				return problems;
			}
		},
		onValidateTeam: function (team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getAbility(toId(team[i].item)).name + " [Item])"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				ability = this.getAbility(item);
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + ")"];
				}
			}
		},
	},
	{//Thanks urkerab for the Cross Evolution code :)
		name: "Frantic Fusions",
		desc: [
	     		"&bullet; A non pet mod version of Fusion Evolution. <BR /> &bullet; The resultant Pokemon has the primary types of the parents, and the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse if needed.",
	     	],
		section: "Experimental Metas",
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ["Uber", 'Unreleased', 'Shadow Tag', 'Soul Dew', "Assist", "Shedinja", "Huge Power", "Pure Power", 'Medichamite'],
 		onBegin: function() {
                        let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
                                if (pokemon.set.name === pokemon.set.species) continue;
				let fusionTemplate = this.getTemplate(pokemon.name);
				if (!fusionTemplate.exists) continue;
				try {
				let template = pokemon.baseTemplate;
				let mixedTemplate = Object.assign({}, template);
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species + '-' + fusionTemplate.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg)/2)

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid])/2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
                if(mixedTemplate.types[0] !== fusionTemplate.types[0]) mixedTemplate.types[1]=fusionTemplate.types[0];
                else mixedTemplate.types.length = 1;
				pokemon.baseTemplate = mixedTemplate;
				pokemon.fusion = true;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
				pokemon.formeChange(mixedTemplate);
				} catch (e) {
					this.add('-hint', 'Failed to fuse ' + pokemon.baseTemplate.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
	        let types = pokemon.types;
	        pokemon.fusetype = types;
			let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
			let sec = statusability[pokemon.abilitwo]? "other"+pokemon.abilitwo : pokemon.abilitwo;
			pokemon.addVolatile(sec);//Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
		        pokemon.types = pokemon.fusetype;
		        this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
		        if (!set.name || set.name === set.species) return;
		        let template = this.getTemplate(set.species);
		        let fusionTemplate = this.getTemplate(set.name);
			let banlist= {"shedinja":true,"hugepower":true,"purepower":true};
			if (!fusionTemplate.exists) return;let unobtainable = {'Darmanitan-Zen':true , 'Greninja-Ash':true , 'Zygarde-Complete':true, 'Meloetta-Pirouette':true, 'Castform-Snowy':true , 'Castform-Sunny':true , 'Castform-Rainy':true, 'Aegislash-Blade':true};
			let types = Object.keys(this.data.TypeChart);
			for(let i = 0; i < types.length; i++) {
				unobtainable["Silvally-"+types[i]] = true;
			}
			if(unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with "+fusionTemplate.species+" since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if(fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. ("+set.species+" has nickname "+set.name+")");
			if(fusionTemplate.tier == "Uber") problems.push("You cannot fuse with an Uber. ("+template.species+" has nickname "+fusionTemplate.species+")");
			if(banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. ("+template.species+" has nickname "+ fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega?this.getTemplate(template.species.substring(0,template.species.length-5)).prevo:template.prevo;

			if(!this.data.Learnsets[toId(fusionTemplate.species)])
			{
			        fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
			        fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if(!template.learnset)
			{
			        template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			}
			else
			        template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset))
			} while (template && template.species && !added[template.species]);
			while(prevo)
			{
			        movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
			        prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega?this.getTemplate(fusionTemplate.species.substring(0,fusionTemplate.species.length-5)).prevo:fusionTemplate.prevo;
			while(prevo)
			{
			        movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
			        prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for(let kek =0;kek<movepool.length;kek++) moves[movepool[kek]]=true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function (team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
	{//Thanks urkerab for the Cross Evolution code :)
		name: "Frantic Fusions [New]",
		desc: [
	     		"&bullet; A non pet mod version of Fusion Evolution. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
	     	],
		section: "Experimental Metas",
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ["Uber",'Unreleased', 'Shadow Tag', 'Soul Dew', "Assist", "Shedinja", "Huge Power", "Pure Power", 'Medichamite'],
 		onBegin: function() {
                        let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
                                if (pokemon.set.name === pokemon.set.species) continue;
				let fusionTemplate = this.getTemplate(pokemon.name);
				if (!fusionTemplate.exists) continue;
				try {
				let template = pokemon.baseTemplate;
				let mixedTemplate = Object.assign({}, template);
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species + '-' + fusionTemplate.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg)/2)

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid])/2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				let shiny = (pokemon.set.shiny && fusionTemplate.types[1])? 1 : 0;
                if(mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1]=fusionTemplate.types[shiny];
                else mixedTemplate.types.length = 1;
				pokemon.baseTemplate = mixedTemplate;
				pokemon.fusion = true;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
				pokemon.formeChange(mixedTemplate);
				} catch (e) {
					this.add('-hint', 'Failed to fuse ' + pokemon.baseTemplate.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
	        let types = pokemon.types;
	        pokemon.fusetype = types;
			let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
			let sec = (statusability[pokemon.abilitwo])? ("other"+pokemon.abilitwo) : (pokemon.abilitwo);
			pokemon.addVolatile(sec);//Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
		        pokemon.types = pokemon.fusetype;
		        this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
		        if (!set.name || set.name === set.species) return;
		        let template = this.getTemplate(set.species);
		        let fusionTemplate = this.getTemplate(set.name);
			let banlist= {"shedinja":true,"hugepower":true,"purepower":true};
			if (!fusionTemplate.exists) return;
			let unobtainable = {'Darmanitan-Zen':true , 'Greninja-Ash':true , 'Zygarde-Complete':true, 'Meloetta-Pirouette':true, 'Castform-Snowy':true , 'Castform-Sunny':true , 'Castform-Rainy':true, 'Aegislash-Blade':true};
			let types = Object.keys(this.data.TypeChart);
			for(let i = 0; i < types.length; i++) {
				unobtainable["Silvally-"+types[i]] = true;
			}
			if(unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with "+fusionTemplate.species+" since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if(fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. ("+set.species+" has nickname "+set.name+")");
			if(fusionTemplate.tier == "Uber") problems.push("You cannot fuse with an Uber. ("+template.species+" has nickname "+fusionTemplate.species+")");
			if(banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. ("+template.species+" has nickname "+ fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega?this.getTemplate(template.species.substring(0,template.species.length-5)).prevo:template.prevo;

			if(!this.data.Learnsets[toId(fusionTemplate.species)])
			{
			        fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
			        fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if(!template.learnset)
			{
			        template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			}
			else
			        template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset))
			} while (template && template.species && !added[template.species]);
			while(prevo)
			{
			        movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
			        prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega?this.getTemplate(fusionTemplate.species.substring(0,fusionTemplate.species.length-5)).prevo:fusionTemplate.prevo;
			while(prevo)
			{
			        movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
			        prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for(let kek =0;kek<movepool.length;kek++) moves[movepool[kek]]=true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function (team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
	/*{
	    name: "Frantic Fusions[OMotM Version]",
	    desc: [
		"&bullet; A non pet mod version of Fusion Evolution. <BR /> &bullet; The resultant Pokemon has the primary types of the parents, and the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse if needed.",
	    ],
	    section: "Experimental Metas",
	    mod: 'franticfusions',
	    ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	    banlist: ["Uber", 'Unreleased', 'Shadow Tag', 'Soul Dew', "Assist", "Shedinja", "Huge Power", "Pure Power", 'Medichamite'],
	    onBegin: function() {
		let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
		for (let i = 0, len = allPokemon.length; i < len; i++) {
		    let pokemon = allPokemon[i];
		    let crossTemplate = this.tools.getTemplate(toId(pokemon.ability));
		    if (pokemon.set.ability === toId(pokemon.set.species) || !crossTemplate.exists) {
			this.add("-hint", "Skipping Fusion for " + pokemon.set.species + ".");
			pokemon.set.ability = pokemon.baseTemplate.abilities[0];
			pokemon.ability = pokemon.baseTemplate.abilities[0];
			pokemon.baseAbility = pokemon.baseTemplate.abilities[0];
			continue;
		    }
		    if (pokemon.set.ability === toId(pokemon.set.species) || !this.tools.getAbility(pokemon.set.ability).name) {
			this.add("-hint", "Skipping Fusion for " + pokemon.set.species + ".");
			continue;
		    }
		    try {
			let template = pokemon.baseTemplate;
			let mixedTemplate = Object.assign({}, template);
			mixedTemplate.baseSpecies = mixedTemplate.species = template.species + '-' + crossTemplate.species;
			mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + crossTemplate.weightkg) / 2)

			mixedTemplate.baseStats = {};
			for (let statid in template.baseStats) {
			    mixedTemplate.baseStats[statid] = (template.baseStats[statid] + crossTemplate.baseStats[statid]) / 2;
			}
			pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

			mixedTemplate.types = template.types.slice();
			if (mixedTemplate.types[0] != crossTemplate.types[0]) mixedTemplate.types[1] = crossTemplate.types[0];
			else mixedTemplate.types.length = 1;
			pokemon.baseTemplate = mixedTemplate;
			pokemon.fusion = true;
			pokemon.abilitwo = crossTemplate.abilities['0'];
			pokemon.ability = template.abilities['0'];
			pokemon.baseAbility = template.abilities['0'];
			pokemon.formeChange(mixedTemplate);
		    } catch (e) {
			this.add('-hint', 'Failed to fuse ' + pokemon.baseTemplate.species + ' and ' + crossTemplate.species + '. Please report this error so that it can be fixed.');
		    }
		}
	    },
	    onSwitchInPriority: 1,
	    onSwitchIn: function(pokemon) {
		let types = pokemon.types;
		pokemon.fusetype = types;
		if (pokemon.fusion) {
		    this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
		}
		let statusability = {
		    "aerilate": true,
		    "aurabreak": true,
		    "flashfire": true,
		    "parentalbond": true,
		    "pixilate": true,
		    "refrigerate": true,
		    "sheerforce": true,
		    "slowstart": true,
		    "truant": true,
		    "unburden": true,
		    "zenmode": true
		};
		let sec = statusability[pokemon.abilitwo] ? "other" + pokemon.abilitwo : pokemon.abilitwo;
		pokemon.addVolatile(sec, pokemon); //Second Ability! YAYAYAY
	    },
	    onAfterMega: function(pokemon) {
		pokemon.types = pokemon.fusetype;
		this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
	    },
	    validateSet: function(set, teamHas) {
		let problems = [];
		let ability = set.ability;
		if (!this.tools.data.Pokedex[ability] && !this.tools.data.Abilities[ability]) return ["The ability/Pokemon " + ability + " does not exist."];
		if (this.tools.getAbility(set.ability).id || set.ability === toId(set.species)) return;
		if (this.tools.data.Pokedex[ability]) {
		    set.ability = this.tools.data.Pokedex[toId(set.species)].abilities['0'];
		    problems = this.validateSet(set, teamHas) || [];
		    set.ability = ability;
		}
		let template = this.tools.data.Pokedex[toId(set.species)];
		let crossTemplate = this.tools.data.Pokedex[toId(set.ability)];
		let banlist = {
		    "shedinja": true,
		    "hugepower": true,
		    "purepower": true
		};
		if (!crossTemplate.exists) return;
		if (crossTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
		if (crossTemplate.tier == "Uber") problems.push("You cannot fuse with an Uber. (" + template.species + " has nickname " + crossTemplate.species + ")");
		if (banlist[toId(crossTemplate.species)]) problems.push("Fusing with " + crossTemplate.species + " is banned. (" + template.species + " has nickname " + crossTemplate.species + ")");
		let added = {};
		let movepool = [];
		let abilitwo = crossTemplate.abilities['0'];
		let abilione = template.abilities['0'];
		let bans = {
		    'arenatrap': true,
		    'contrary': true,
		    'furcoat': true,
		    'hugepower': true,
		    'imposter': true,
		    'parentalbond': true,
		    'purepower': true,
		    'shadowtag': true,
		    'trace': true,
		    'simple': true,
		    'wonderguard': true,
		    'moody': true
		};
		if (bans[toId(abilitwo)]) problems.push(crossTemplate.species + "'s ability " + abilitwo + " is banned by Multibility.");
		if (bans[toId(abilione)]) problems.push(template.species + "'s ability " + abilione + " is banned by Multibility.");
		if (abilitwo === abilione) problems.push("You cannot have two of " + abilitwo + " on the same Pokemon.");
		let prevo = template.isMega ? this.tools.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;
		if (!this.data.Learnsets[toId(crossTemplate.species)]) {
		    crossTemplate.learnset = this.data.Learnsets[toId(crossTemplate.species.split("-")[0])].learnset;
		} else crossTemplate.learnset = this.data.Learnsets[toId(crossTemplate.species)].learnset;
		if (!template.learnset) {
		    template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
		} else template.learnset = this.data.Learnsets[toId(template.species)].learnset;
		do {
		    added[template.species] = true;
		    movepool = movepool.concat(Object.keys(template.learnset));
		    movepool = movepool.concat(Object.keys(crossTemplate.learnset))
		} while (template && template.species && !added[template.species]);
		while (prevo) {
		    movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
		    prevo = this.tools.getTemplate(prevo).prevo;
		}
		prevo = crossTemplate.isMega ? this.tools.getTemplate(crossTemplate.species.substring(0, crossTemplate.species.length - 5)).prevo : crossTemplate.prevo;
		while (prevo) {
		    movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
		    prevo = this.tools.getTemplate(prevo).prevo;
		}
		let moves = {};
		for (let kek = 0; kek < movepool.length; kek++) moves[movepool[kek]] = true;
		for (let i in set.moves) {
		    let move = toId(set.moves[i]);
		    if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
		    if (!moves[move]) {
			problems.push(set.species + " cannot learn " + set.moves[i] + ".");
		    }
		}
		return problems;
	    },
	    onValidateTeam: function(team) {
		let nameTable = {};
		for (let i = 0; i < team.length; i++) {
		    let ability = team[i].ability;
		    if (ability) {
			if (ability === toId(team[i].species)) continue;
			if (nameTable[ability] && !(this.tools.getAbility(ability))) {
			    return ["You can have only one of a fusion mon.", "(You have more than one " + ability + ")"];
			}
			nameTable[ability] = true;
		    }
		}
	    },
	},*/
	{
		    name: "Pokebilities",
		    desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/pok%C3%A9bilities.3510241/\">Pokebilities</a>"],
		    section: "Experimental Metas",
		    mod: 'pokebilities',
		    ruleset: ["OU"],
		    onSwitchInPriority: 1,
		    onBegin: function() {
			let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
		        for (let p = 0; p < this.sides.length; p++) {
		            for (let i = 0; i < this.sides[p].pokemon.length; i++) {
		                let pokemon = this.sides[p].pokemon[i];
		                let template = this.getTemplate(pokemon.species);
		                this.sides[p].pokemon[i].innates = [];
		                for (let a in template.abilities) {
		                    if (toId(template.abilities[a]) != pokemon.ability)
				    {
					if(statusability[toId(template.abilities[a])])
		                        this.sides[p].pokemon[i].innates.push("other" + toId(template.abilities[a]));
					else
		                        this.sides[p].pokemon[i].innates.push(toId(template.abilities[a]));
				    }
		                }
		            }
		        }
		    },
		    onSwitchIn: function(pokemon) {
		        for (let i = 0; i < pokemon.innates.length; i++) {
		            if (!pokemon.volatiles[pokemon.innates[i]])
		                pokemon.addVolatile(pokemon.innates[i]);
		        }
		    },
		    onAfterMega: function(pokemon) {
		        for (let i = 0; i < pokemon.innates.length; i++) {
		            pokemon.removeVolatile(pokemon.innates[i]);
		        }
		    },
	},
	{
		name: "Trademarked Enchantment",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3570431/\">Enchanted Items</a> + <a href=\"http://www.smogon.com/forums/threads/trademarked.3572949/\">Trademarked</a>."],
		section: "Experimental Metas",
		column: 2,

		mod: 'tme',
		ruleset: ['OU'],
		banlist: ['Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter',
			'Bug Gem', 'Dark Gem', 'Dragon Gem', 'Electric Gem', 'Fairy Gem', 'Fire Gem',
			'Ice Gem', 'Poison Gem', 'Poke Ball', 'Psychic Gem', 'Steel Gem', 'Wave Incense',
		],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set, teamHas).length) return [];
			let ability = this.tools.getAbility(set.ability);
			let template = this.tools.getTemplate(set.species);
			if (!set.moves.includes(ability.id) && !set.moves.includes(ability.name) && !this.checkLearnset(ability.id, template, {set: set})) {
				template = Object.assign({}, template);
				template.abilities = {0: ability.name};
			}
			return this.validateSet(set, teamHas, template);
		},
		onValidateSet: function (set) {
			let ability = this.getAbility(set.ability);
			let item = this.getItem(set.item);
			if (ability.item && ability.item === item.id) {
				return ["You are not allowed to have " + ability.name + " and " + item.name + " on the same Pokémon."];
			}
		},
		onValidateTeam: function (team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getItem(ability.item).name + ")"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				item = this.getItem(item);
				ability = item.ability;
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + " or " + item.name + ")"];
				}
			}
		},
		onFaint: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
{ 		name: "Nature Swap Megamons", 		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a> + <a href=\"https://www.smogon.com/forums/threads/3577739/\">Nature Swap</a>"], 		section: "Experimental Metas", 		searchShow: false, 		mod: 'nsmm', 		ruleset: ['Ubers'],
onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let nature = pokemon.battle.getNature(pokemon.set.nature);
				if (nature.plus !== nature.minus) {
					["baseTemplate", "canMegaEvo"].forEach(key => {
						if (pokemon[key]) {
							let template = Object.assign({}, this.getTemplate(pokemon[key]));
							template.baseStats = Object.assign({}, template.baseStats);
							let plus = template.baseStats[nature.plus];
							let minus = template.baseStats[nature.minus];
							template.baseStats[nature.plus] = minus;
							template.baseStats[nature.minus] = plus;
							pokemon[key] = template;
						}
					});
					pokemon.formeChange(pokemon.baseTemplate);
				}
			}
		},
	},
	{
		name: "Mix and Mega Balanced Hackmons",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>",
		],
		section: "Experimental Metas",
		column: 2,

		mod: 'mnmbh',
		ruleset: ['Balanced Hackmons'],
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			/*let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || uberStones.indexOf(item.id) >= 0) return ["" + template.species + " is not allowed to hold " + item.name + "."];*/
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "Choonmons δ",
		desc: ["Choonmons is a pet mod created by Choon. Yup.<br>&bullet; <a href=\"http://www.smogon.com/forums/threads/3546063/\">Choonmons Thread</a>"],
		section: "Experimental Metas",
		mod: 'choonmons',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Lucarionite', 'Mawilite', 'Salamencite'],

		onSwitchIn: function (pokemon) {
			let changed = {'Venusaur-Mega-X':true, 'Blastoise':true, 'Butterfree':true, 'Pikachu':true, 'Raichu':true, 'Golduck':true, 'Happiny':true, 'Blissey':true, 'Gyarados':true, 'Aerodactyl':true, 'Feraligatr-Mega':true, 'Sceptile':true};
			let bt = pokemon.baseTemplate;
			if (bt.baseSpecies in changed || (bt.actualSpecies && bt.actualSpecies in changed)) {
				let types = bt.types;
				let bTypes = (types.length === 1 || types[1] === 'caw') ? types[0] : types.join('/');
				this.add('-start', pokemon, 'typechange', bTypes, '[silent]');
			}
			if (bt.actualSpecies) this.add('-start', pokemon, bt.actualSpecies, '[silent]'); //Show the pokemon's actual species
		},
		onSwitchOut: function (pokemon) {
			if (pokemon.baseTemplate.actualSpecies) this.add('-end', pokemon, pokemon.baseTemplate.actualSpecies, '[silent]');
		},
	},
	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 4,
	},
	{
		name: "[Gen 3] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dex/rs/formats/uu/\">ADV UU</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548578/\">ADV UU Viability Ranking</a>",
		],

		mod: 'gen3',
		ruleset: ['[Gen 3] OU'],
		banlist: ['OU', 'BL'],
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "BW2 Singles",
		column: 4,
	},
	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
	},
	{
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	},
	{
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	},
	{
		name: "[Gen 5] GBU Singles",

		mod: 'gen5',

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Random Battle",

		mod: 'gen5',

		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Custom Game",

		mod: 'gen5',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: 'BW2 Doubles',
		column: 4,
	},
	{
		name: "[Gen 5] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533424/\">BW2 Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533421/\">BW2 Doubles Viability Ranking</a>",
		],

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Jirachi',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop',
		],
	},
	{
		name: "[Gen 5] GBU Doubles",

		mod: 'gen5',
		gameType: 'doubles',

		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Doubles Custom Game",

		mod: 'gen5',
		gameType: 'doubles',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// DPP Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Singles",
		column: 4,
	},
	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	},
	{
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	},
	{
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['LC Uber', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma', 'Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 4] Custom Game",

		mod: 'gen4',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},

	// DPP Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Doubles",
		column: 4,
	},
	{
		name: "[Gen 4] Doubles Custom Game",

		mod: 'gen4',
		gameType: 'doubles',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 4,
	},
	{
		name: "[Gen 3] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',

		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',

		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",

		mod: 'gen2',

		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',

		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',

		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] OU (tradeback)",

		mod: 'gen1',

		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Allow Tradeback', 'Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',

		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Stadium",

		mod: 'stadium',

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',

		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Aurora] OU",
		column: 5,
		mod: 'aurora',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Bank-Uber', 'Power Construct', 'Shadow Tag'],
	},
	{
		section: "What If",
        	column: 5,
	},
	{
        name: "[Gen 1] OU + Heal Bell",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1healbell',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Sleep Talk",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1sleeptalk',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Hidden Power",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1hiddenpower',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Substitute",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1substitute',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Rapid Spin & Spikes",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1rapidspin',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Shadow Ball",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1shadowball',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Toxic",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
        ],

        mod: 'gen1toxic',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 1] OU + Jellicent",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen1jellicent',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },/*
    {
        name: "[Gen 2] OU + No Special Split",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2specialsplit',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },*/
    {
        name: "[Gen 2] OU + Abilities",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2abilities',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 2] OU + No Steel-Types",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2steeltypes',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 2] OU + Hyper Beam Glitch",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2hyperbeam',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 2] OU + Calm Mind",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2calmmind',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 2] OU + DPP Evolutions",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2dpp',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },/*
    {
        name: "[Gen 2] OU + Predictable Phazing",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
        ],

        mod: 'gen2phazing',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber'],
    },*/
    {
        name: "[Gen 3] OU + Gastrodon",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3gastrodon',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },
    {
        name: "[Gen 3] OU + Sand Sp. Def Boost",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3sand',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },
    {
        name: "[Gen 3] OU + U-turn",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3uturn',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },
    {
        name: "[Gen 3] OU + Trick Room",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3trickroom',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },/*
    {
        name: "[Gen 3] OU + Gen 2 Moves",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3gen2',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },*/
    {
        name: "[Gen 3] OU + Choice Scarf",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3choicescarf',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },
    {
        name: "[Gen 3] OU + Gyro Ball",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
        ],

        mod: 'gen3gyroball',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Smeargle + Ingrain'],
    },
    {
        name: "[Gen 4] OU + No Stealth Rock",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        mod: 'gen4',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
        banlist: ['Uber', 'Stealth Rock'],
    },
    {
        name: "[Gen 4] OU + Team Preview",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 4] OU + No Type Split",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        mod: 'gen4split',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 4] OU + Air Balloon",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        mod: 'gen4balloon',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 4] OU + No Choice Items",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
        banlist: ['Uber', 'Choice Scarf', 'Choice Specs', 'Choice Band'],
    },
    {
        name: "[Gen 4] OU + Weather",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        mod: 'gen4weather',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 4] OU + Knock Off",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
        ],

        mod: 'gen4knockoff',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
        banlist: ['Uber'],
    },
    {
        name: "[Gen 5] OU + Fairy & Mega",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],

        mod: 'gen5fairy',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },
    {
        name: "[Gen 5] OU + Explosion Buff",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],

        mod: 'gen5explosion',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },/*
    {
        name: "[Gen 5] OU + No EVs & IVs",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],

        mod: 'gen5evs',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },*/
    {
        name: "[Gen 5] OU + Gen 6 Steel-Types",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],

        mod: 'gen5gen6',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },
    {
        name: "[Gen 5] OU + Dream World",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],

        mod: 'gen5dreamworld',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },
    {
        name: "[Gen 5] OU + Defog",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],

        mod: 'gen5defog',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },
    /*{
        name: "[Gen 5] OU + Spikes",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
        ],
        section: "What If",

        mod: 'gen5spikes',
        ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
        banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
    },*/
];
