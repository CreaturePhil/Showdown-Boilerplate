"use strict";

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'charizard8888': {
				species: 'Charizard-Mega-X', ability: 'Refrigerate', item: 'Charizardite X', gender: 'M',
				moves: ['fakeout', 'extremespeed', 'earthquake'],
				signatureMove: "ggm8",
				evs: {spd:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'ClassyZ': {
				species: 'Scizor', ability: 'Technician', item: 'Scizorite', gender: 'F', shiny: true,
				moves: ['machpunch', 'bulletpunch', 'swordsdance'], name: 'classy',
				signatureMove: 'Hyperspeed Punch',
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'PI EddyChomp': {
				species: 'Garchomp-Mega', ability: 'Epic Claws', item: 'Leftovers',
				moves: ['precipiceblades', 'dragonclaw', 'sacredfire'],
				signatureMove: "evalchomp",
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant',
			},
			'Digital Edge': {
				species: 'Jirachi', ability: 'Serene Grace', item: 'Choice Scarf',
				moves: ['iciclecrash', 'ironhead', 'uturn'],
				signatureMove: "Sacred Hax",
				evs: {atk:252, spd:4, spe:252}, nature: 'Adamant',
			},
			'Ransei': {
				species: 'Rayquaza', ability: 'Wonder Breaker', item: 'Life Orb', gender: ['M'],shiny:true,
				moves: ['dragonpulse', 'tailglow', 'dracometeor'],
				signatureMove: "Legend's Ambition",
				evs: {hp:248, atk:252, spa:252, spe:252}, nature: 'Mild',
			},
			'Flygonerz': {
				species: 'Flygon', ability: 'Magic Claws', item: 'Focus Sash', gender: ['F'],shiny:true,
				moves: ['dragonrush', 'thousandarrows', 'gunkshot'],
				signatureMove: "Dragon Shift",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},
			'Spandan': {
			    species: 'Salamence', ability: 'Multiscale', item: 'Salamencite', gender: 'M',
				moves: ['extremespeed', 'shiftgear', 'boomburst'],
				signatureMove: "Yo MaMMa Joke",
				evs: {hp: 252, atk:252, def:252, spa:252, spd:252, spe:252}, nature: 'Naive',
			},
			'SnakeXZero5': {
			    species: 'Sneasel', ability: 'Knowledge', item: 'Liechi Berry', gender: 'M',
				moves: ['icepunch', 'knockoff', 'fakeout'],
				signatureMove: "Logic Power",
				evs: {atk:252, spd:6, spe:252}, nature: 'Adamant',
			},
			'The God of Haxorus': {
				species: 'Haxorus', ability: 'Blessed Hax', item: 'Life Orb', gender: 'M',
				moves: ['ironhead', 'diamondstorm', 'sacredfire'],
				signatureMove: "Haxing Rage",
				evs: {atk:252, spe:252, spd:4}, nature: 'Adamant',
			},
			'XpRienzo ☑-☑': {
 				species: 'Reshiram', ability: 'Adaptability', item: 'Charcoal', gender: 'M',
 				moves: ['fusionflare', 'spacialrend', 'voltswitch'],
 				signatureMove: "blehflame",
 				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
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
