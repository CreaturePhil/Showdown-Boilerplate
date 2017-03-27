"use strict";

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'Zygardeorder' : { /* Eyy will edit it soon */
				species: 'Zygarde-10%', ability: 'Rawr', item: 'Leftovers', gender: 'M',
				moves: ['thousandarrows', 'spectralthief', 'uturn'],
				signaturMove: "Rawrr",
				evs: {hp: 252, atk:252, spd: 252, def: 252, spe: 252},
				nature:'Jolly',
			},
			'Flurbel' : {
				species: 'Lillipup', ability: 'Contrary Plus Plus', item: 'Eviolite', gender: 'M',
				moves: ['vcreate', 'superpower', 'dragonascent'],
				signatureMove: "The Netherlands First",
				evs: {hp: 252, atk:252, spd: 252, def: 252, spe: 252},
				nature: 'Impish',
			},
			'Winona' : {
				species: 'Exeggutor-Alola', ability: 'Dank Zone', item: 'Sitrus Berry', gender: 'M',
				moves: ['icehammer', 'woodhammer', 'dragonhammer'],
				signatureMove: "Super Duper Wombo Combo",
				evs: {hp: 252, spa:252, spd: 252, def: 252},
				nature: 'Quiet',
			},
			'The True Falcon' : {
				species: 'Samurott', ability: 'Ultra Technical', item: 'Assault Vest', gender: 'M',
				moves: ['icepunch', 'waterfall', 'sacred sword'],
				signatureMove: "Heroic Beatdown",evs: {hp: 252, atk:252, def:4}, nature: 'Adamant',
			},
			'flufi' : {
				species: 'Raichu', ability: 'Static Boost', item: 'Life Orb', gender: 'M',
				moves: ['thunder', 'draco meteor', 'focus blast'],
				signatureMove: "Mythic Form",evs: {hp:188, spa:252, spe:64}, nature: 'Modest',
			},
			'BBgun999' : {
				species: 'Goodra', ability: 'Contrary', item: 'Rocky Helmet', gender: 'Male',
				moves: ['draco meteor', 'overheat', 'close combat'],
				signatureMove: "Power Lick",evs: {hp: 252, def: 4, spd: 252}, nature: 'Naughty',
			},
			'Zmeeed': {
				species: 'Latios', ability: 'Russian Winter', item: 'Soul Dew', gender: 'M',
				moves: ['psystrike', 'aurasphere', 'blizzard'],
				signatureMove: "Rush B",
				evs: {spd:4, spa:252, spe:252}, nature: 'Timid',
			},
			'Loominite': {
				species: 'Giratina-Origin', ability: 'The Underlord', item: 'Griseous Orb', gender: 'M', shiny:true,
				moves: ['willowisp', 'shadowball', 'dragonpulse'],
				signatureMove: "The Loom Effect",
				evs: {hp:252, spa: 252, def:252}, nature: 'Modest',
			},
			'charizard8888': {
				species: 'Charizard-Mega-X', ability: 'Refrigerate', item: 'Firium Z', gender: 'M',
				moves: ['fakeout', 'extremespeed', 'flareblitz'],
				signatureMove: "ggm8",
				evs: {spd:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Quiet Chimchar': {
				species: 'Chimchar', ability: 'Flame Guard', item: 'Focus Sash', gender: 'M',
				moves: ['batonpass', 'firepunch', 'uturn'],
				signatureMove: "Cha Cha Dance",
				evs: {hp:4, atk:252, spe:252}, nature: 'Quiet',
			},
			'Elcrest': {
				species: 'Dratini', ability: 'Water Change', item: 'Unknown Sash', gender: 'M',
				moves: ['dragondance', 'outrage', 'raindance'],
				signatureMove: "Turbulence",
				evs: {spe:252, atk:252, hp:4}, nature: 'Jolly',
			},
			'ClassyZ': {
				species: 'Scizor-Mega', ability: 'Technician', item: 'Scizorite', gender: 'F', shiny: true,
				moves: ['machpunch', 'bulletpunch', 'swordsdance'],
				signatureMove: 'Hyperspeed Punch',
				evs: {atk:252, spd:4, hp:252}, nature: 'Adamant',
			},
			
			'PI EddyChomp': {
				species: 'Garchomp-Mega', ability: 'Epic Claws', item: 'Focus Sash',
				moves: ['precipiceblades', 'dragonclaw', 'sacredfire'],
				signatureMove: "GARCHOMP EPICNESS",
				evs: {atk:252, def:252, spe:252, spd:252}, nature: 'Jolly',
			},
			'Snaq': {
				species: 'Magikarp', ability: 'Parting Shot Spam', item: 'Air Balloon',
				moves: ['splash'],
				evs: {}, nature: 'Serious',
			},
			'Snaquaza': {
				species: 'Lapras', ability: 'Shell Armor', item: 'Leftovers',
				moves: ['icebeam', 'surf', 'ancientpower'],
				signatureMove: "Ice Shard",
				evs: {hp:252, atk:252, def:252, spa:252, spd:252, spe:252}, nature: 'Serious',
			},
			'Hydrostatics': {
				species: 'Palkia', ability: 'Pressure Breaker', item: 'Leftovers', gender: 'M' , shiny:true,
				moves: ['coreenforcer', 'hydropump', 'flashcannon'],
				signatureMove: "Space Compress",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest',
			},
			'Digital Edge': {
				species: 'Flareon', ability: 'Flair Hax', item: 'Focus Sash', 
				moves: ['iciclecrash', 'ironhead', 'uturn'],
				signatureMove: "Sacred Hax",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'Ransei': {
				species: 'Rayquaza', ability: 'Wonder Breaker', item: 'Ransium Z', gender: ['M'],shiny:true,
				moves: ['dragonpulse', 'tailglow', 'dracometeor'],
				signatureMove: "Legend's Ambition",
				evs: {hp:248, atk:252, spa:252, spe:252}, nature: 'Mild',
			},
			'Flygonerz': {
				species: 'Flygon', ability: 'Tough Bounce', item: 'Focus Sash', gender: ['F'],shiny:true,
				moves: ['outrage', 'thousandarrows', 'extremespeed'],
				signatureMove: "Dragon Shift",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Eternal Mayhem': {
				species: 'Kyurem-B', ability: 'Breakthrough', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['outrage','icebeam','fusionbolt'], name: 'Eternal Mayhem',
				signatureMove: "Dragon Symphony",
				evs: {spe:252, spa:252, atk:252}, nature: 'Naughty',
			},
			'Spandan': {
				species: 'Salamence', ability: 'Multiscale', item: 'Salamencite', gender: 'M',
				moves: ['extremespeed', 'shiftgear', 'boomburst'],
				signatureMove: "Yo MaMMa Joke",
				evs: {hp: 252, atk:252, def:252, spa:252, spd:252, spe:252}, nature: 'Naive',
			},
			'SnakeXZero5': {
				species: 'Weavile', ability: 'Knowledge', item: 'Liechi Berry', gender: 'M',
				moves: ['icepunch', 'knockoff', 'fakeout'],
				signatureMove: "Logic Power",
				evs: {atk:252, spd:252, spe:252}, nature: 'Adamant',
			},
			'Theswordbreaker': {
				species: 'Arceus-Dragon', ability: 'Breaking Point', item: 'Draco Plate', gender: 'M',
				moves: ['spacialrend', 'focusblast', 'blizzard'],
				signatureMove: "Wait and hope",
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			},
			'The God of Haxorus': {
				species: 'Haxorus', ability: 'Blessed Hax', item: 'Life Orb', gender: 'M',
				moves: ['ironhead', 'diamondstorm', 'sacredfire'],
				signatureMove: "Haxing Rage",
				evs: {atk:252, spe:252, spd:252, def:252}, nature: 'Adamant',
			},
			'XpRienzo ☑-☑': {
				species: 'Reshiram', ability: 'Adaptability', item: 'Charcoal', gender: 'M',
				moves: ['coreenforcer', 'psystrike', 'voltswitch'],
				signatureMove: "blehflame",
				evs: {spa:252, spd:252, spe:252, def:252}, nature: 'Timid',
			},
			'BatterBotto': {
				species: 'Dragonite', ability: 'Protean', item: 'Iron Ball', gender: 'M', shiny:true,
				moves: ['highjumpkick', 'extremespeed', 'vcreate'],
				signatureMove: "massacre",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'OutrageousBoT': {
				species: 'Gyarados', ability: 'Dragon Fury', item: 'Life Orb', gender: 'M',
				moves: ['outrage', 'dragondance', 'dracometeor'],
				signatureMove: "Raging Lake",
				evs: {spa:252, spd:4, spe:252}, nature: 'Jolly',
			},
			'FlareonDriod': {
				species: 'Flareon', ability: 'Slowchat', item: 'Charcoal', gender: 'F', shiny:true,
				moves: ['vcreate', 'recover', 'bellydrum'],
				signatureMove: "banhammah",
				evs: {hp: 252, atk: 252, spe:252, def:252, spd:252}, nature: 'Jolly',
			},
			'Dragitbot': {
				species: 'Dratini', ability: 'Hidden', item: 'Leftovers', gender: 'F',
				moves: ['swordsdance', 'agility', 'nastyplot'],
				signatureMove: "superswitch",
				evs: {hp:252, def:252, spd:252}, nature: 'Bold',
			},
			'shivam rustagi': {
				species: 'Giratina', ability: 'Bad Dreams', item: 'Leftovers', gender: 'M',
				moves: ['shadowball', 'dragonpulse', 'dreameater'],
				signatureMove: "secretkiller",
				evs: {spa:252, spd:252, spe:4}, nature: 'Adamant',
			},
		};

		// Generate the team randomly.
		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.level = 100;
			set.name = name;
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
