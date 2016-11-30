'use strict';

exports.BattleScripts = {
	gen: 5,
	randomSet: function (template, slot, teamDetails) {
		if (slot === undefined) slot = 1;
		let baseTemplate = (template = this.getTemplate(template));
		let name = template.name;

		if (!template.exists || (!template.randomBattleMoves && !template.learnset)) {
			template = this.getTemplate('unown');

			let err = new Error('Template incompatible with random battles: ' + name);
			require('./../../crashlogger.js')(err, 'The randbat set generator');
		}

		if (template.battleOnly) name = template.baseSpecies;

		let movePool = (template.randomBattleMoves ? template.randomBattleMoves.slice() : Object.keys(template.learnset));
		let moves = [];
		let ability = '';
		let item = '';
		let evs = {
			hp: 85,
			atk: 85,
			def: 85,
			spa: 85,
			spd: 85,
			spe: 85,
		};
		let ivs = {
			hp: 31,
			atk: 31,
			def: 31,
			spa: 31,
			spd: 31,
			spe: 31,
		};
		let hasType = {};
		hasType[template.types[0]] = true;
		if (template.types[1]) {
			hasType[template.types[1]] = true;
		}
		let hasAbility = {};
		hasAbility[template.abilities[0]] = true;
		if (template.abilities[1]) {
			hasAbility[template.abilities[1]] = true;
		}
		if (template.abilities['H']) {
			hasAbility[template.abilities['H']] = true;
		}
		let availableHP = 0;
		for (let i = 0, len = movePool.length; i < len; i++) {
			if (movePool[i].substr(0, 11) === 'hiddenpower') availableHP++;
		}

		let SetupException = {
			extremespeed:1, suckerpunch:1, superpower:1,
			dracometeor:1, leafstorm:1, overheat:1,
		};
		let counterAbilities = {
			'Adaptability':1, 'Contrary':1, 'Hustle':1, 'Iron Fist':1, 'Sheer Force':1, 'Skill Link':1,
		};

		let hasMove, counter;

		do {
			hasMove = {};
			for (let k = 0; k < moves.length; k++) {
				if (moves[k].substr(0, 11) === 'hiddenpower') {
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moves[k]] = true;
				}
			}

			while (moves.length < 4 && movePool.length) {
				let moveid = this.sampleNoReplace(movePool);
				if (moveid.substr(0, 11) === 'hiddenpower') {
					availableHP--;
					if (hasMove['hiddenpower']) continue;
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moveid] = true;
				}
				moves.push(moveid);
			}

			counter = this.queryMoves(moves, hasType, hasAbility, movePool);

			for (let k = 0; k < moves.length; k++) {
				let moveid = moves[k];
				let move = this.getMove(moveid);
				let rejected = false;
				let isSetup = false;

				switch (moveid) {

				// Not very useful without their supporting moves
				case 'batonpass':
					if (!counter.setupType && !counter['speedsetup'] && !hasMove['substitute'] && !hasMove['wish'] && !hasAbility['Speed Boost']) rejected = true;
					break;
				case 'focuspunch':
					if (!hasMove['substitute'] || counter.damagingMoves.length < 2) rejected = true;
					break;
				case 'perishsong':
					if (!hasMove['protect']) rejected = true;
					break;
				case 'rest': {
					let sleepTalk = movePool.indexOf('sleeptalk');
					if (sleepTalk >= 0) {
						movePool.splice(sleepTalk, 1);
						rejected = true;
					}
					break;
				}
				case 'sleeptalk':
					if (!hasMove['rest']) rejected = true;
					break;
				case 'storedpower':
					if (!counter.setupType && !hasMove['cosmicpower']) rejected = true;
					break;

				// Set up once and only if we have the moves for it
				case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
					if (counter.setupType !== 'Physical' || counter['physicalsetup'] > 1) rejected = true;
					if (counter.Physical + counter['physicalpool'] < 2 && !hasMove['batonpass'] && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					isSetup = true;
					break;
				case 'calmmind': case 'nastyplot': case 'quiverdance': case 'tailglow':
					if (counter.setupType !== 'Special' || counter['specialsetup'] > 1) rejected = true;
					if (counter.Special + counter['specialpool'] < 2 && !hasMove['batonpass'] && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					isSetup = true;
					break;
				case 'growth': case 'shellsmash': case 'workup':
					if (counter.setupType !== 'Mixed' || counter['mixedsetup'] > 1) rejected = true;
					if (counter.damagingMoves.length + counter['physicalpool'] + counter['specialpool'] < 2 && !hasMove['batonpass']) rejected = true;
					if (moveid === 'growth' && !hasMove['sunnyday']) rejected = true;
					isSetup = true;
					break;
				case 'agility': case 'autotomize': case 'rockpolish':
					if (counter.damagingMoves.length < 2 && !counter.setupType && !hasMove['batonpass']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (!counter.setupType) isSetup = true;
					break;

				// Bad after setup
				case 'circlethrow': case 'dragontail':
					if (!!counter['speedsetup'] || hasMove['encore'] || hasMove['roar'] || hasMove['whirlwind']) rejected = true;
					break;
				case 'fakeout': case 'superfang':
					if (counter.setupType || hasMove['substitute'] || hasMove['switcheroo'] || hasMove['trick']) rejected = true;
					break;
				case 'haze': case 'knockoff': case 'magiccoat': case 'pursuit': case 'spikes': case 'stealthrock': case 'toxicspikes': case 'waterspout':
					if (counter.setupType || !!counter['speedsetup'] || (hasMove['rest'] && hasMove['sleeptalk'])) rejected = true;
					break;
				case 'healingwish':
					if (counter.setupType || !!counter['recovery'] || hasMove['substitute']) rejected = true;
					break;
				case 'nightshade': case 'seismictoss':
					if (counter.stab || counter.setupType || counter.damagingMoves.length > 2) rejected = true;
					break;
				case 'protect':
					if (counter.setupType && (hasAbility['Guts'] || hasAbility['Speed Boost']) && !hasMove['batonpass']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'roar':
					if (counter.setupType || hasMove['dragontail']) rejected = true;
					break;
				case 'switcheroo': case 'trick':
					if (counter.Physical + counter.Special < 3 || hasMove['lightscreen'] || hasMove['reflect'] || hasMove['trickroom']) rejected = true;
					break;
				case 'trickroom':
					if (counter.setupType || !!counter['speedsetup'] || counter.damagingMoves.length < 2) rejected = true;
					if (hasMove['lightscreen'] || hasMove['reflect']) rejected = true;
					break;
				case 'uturn':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['batonpass']) rejected = true;
					break;
				case 'voltswitch':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['batonpass'] || hasMove['magnetrise'] || hasMove['uturn']) rejected = true;
					break;

				// Bit redundant to have both
				// Attacks:
				case 'bugbite':
					if (hasMove['uturn']) rejected = true;
					break;
				case 'dragonclaw':
					if (hasMove['dragontail'] || hasMove['outrage']) rejected = true;
					break;
				case 'dragonpulse':
					if (hasMove['dracometeor']) rejected = true;
					break;
				case 'boltstrike':
					if (!counter.setupType && hasMove['fusionbolt']) rejected = true;
					break;
				case 'discharge': case 'thunder':
					if (hasMove['voltswitch']) rejected = true;
					break;
				case 'fusionbolt':
					if (counter.setupType && hasMove['boltstrike']) rejected = true;
					break;
				case 'thunderbolt':
					if (hasMove['discharge'] || hasMove['thunder'] || hasMove['voltswitch']) rejected = true;
					break;
				case 'crosschop': case 'highjumpkick':
					if (hasMove['closecombat']) rejected = true;
					break;
				case 'drainpunch':
					if (hasMove['closecombat'] || hasMove['crosschop'] || hasMove['highjumpkick']) rejected = true;
					break;
				case 'fierydance': case 'flamethrower':
					if (hasMove['blueflare'] || hasMove['fireblast'] || hasMove['lavaplume'] || hasMove['overheat']) rejected = true;
					break;
				case 'firepunch':
					if (hasMove['flareblitz']) rejected = true;
					break;
				case 'overheat':
					if (counter.setupType === 'Special' || hasMove['fireblast']) rejected = true;
					break;
				case 'airslash':
					if (hasMove['hurricane']) rejected = true;
					break;
				case 'bravebird': case 'drillpeck': case 'pluck':
					if (hasMove['acrobatics']) rejected = true;
					break;
				case 'solarbeam':
					if ((!hasMove['sunnyday'] && template.species !== 'Ninetales') || hasMove['gigadrain'] || hasMove['leafstorm']) rejected = true;
					break;
				case 'gigadrain':
					if ((!counter.setupType && hasMove['leafstorm']) || hasMove['petaldance']) rejected = true;
					break;
				case 'leafstorm':
					if (counter.setupType && hasMove['gigadrain']) rejected = true;
					break;
				case 'bonemerang': case 'earthpower':
					if (hasMove['earthquake']) rejected = true;
					break;
				case 'icebeam':
					if (hasMove['blizzard']) rejected = true;
					break;
				case 'return':
					if (hasMove['bodyslam'] || hasMove['facade'] || hasMove['doubleedge'] || hasMove['tailslap']) rejected = true;
					break;
				case 'weatherball':
					if (!hasMove['sunnyday']) rejected = true;
					break;
				case 'poisonjab':
					if (hasMove['gunkshot']) rejected = true;
					break;
				case 'psychic':
					if (hasMove['psyshock']) rejected = true;
					break;
				case 'ancientpower':
					if (hasMove['paleowave']) rejected = true;
					break;
				case 'rockblast': case 'rockslide':
					if (hasMove['stoneedge'] || hasMove['headsmash']) rejected = true;
					break;
				case 'stoneedge':
					if (hasMove['headsmash']) rejected = true;
					break;
				case 'hydropump':
					if (hasMove['razorshell'] || hasMove['scald']) rejected = true;
					break;
				case 'surf':
					if (hasMove['hydropump'] || hasMove['scald']) rejected = true;
					break;
				case 'waterfall':
					if (hasMove['aquatail']) rejected = true;
					break;

				// Status:
				case 'cottonguard':
					if (hasMove['reflect']) rejected = true;
					break;
				case 'encore': case 'suckerpunch':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'lightscreen':
					if (hasMove['calmmind']) rejected = true;
					break;
				case 'moonlight': case 'painsplit': case 'recover': case 'roost': case 'softboiled': case 'synthesis':
					if (hasMove['rest'] || hasMove['wish']) rejected = true;
					break;
				case 'substitute':
					if (hasMove['pursuit'] || hasMove['uturn'] || hasMove['voltswitch']) rejected = true;
					break;
				case 'thunderwave':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['discharge'] || hasMove['trickroom']) rejected = true;
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'willowisp':
					if (hasMove['lavaplume'] || hasMove['scald']) rejected = true;
					break;
				}

				// Some Pokemon require recovery
				if (!counter.recovery && template.baseStats.hp >= 165 && movePool.indexOf('wish') >= 0) {
					if (move.category === 'Status' || !hasType[move.type] && !move.damage) rejected = true;
				}

				// This move doesn't satisfy our setup requirements:
				if ((move.category === 'Physical' && counter.setupType === 'Special') || (move.category === 'Special' && counter.setupType === 'Physical')) {
					if (!SetupException[move.id] && (!hasType[move.type] || counter.stab > 1 || counter[move.category] < 2)) rejected = true;
				}
				if (counter.setupType && !isSetup && counter.setupType !== 'Mixed' && move.category !== counter.setupType && counter[counter.setupType] < 2 && !hasMove['batonpass'] && moveid !== 'rest' && moveid !== 'sleeptalk') {
					if (move.category !== 'Status' || counter[counter.setupType] + counter.Status > 3 && counter['physicalsetup'] + counter['specialsetup'] < 2) rejected = true;
				}
				if (counter.setupType === 'Special' && move.id === 'hiddenpower' && counter['Special'] <= 2 && !hasType[move.type] && !counter['Physical'] && counter['specialpool']) {
					// Hidden Power isn't good enough
					if ((!hasType['Ghost'] || !counter['Ghost'] || move.type !== 'Fighting') && (!hasType['Electric'] || move.type !== 'Ice')) rejected = true;
				}
				if (move.priority !== 0 && (!!counter['speedsetup'])) {
					rejected = true;
				}

				// Remove rejected moves from the move list
				if (rejected && (movePool.length - availableHP || availableHP && (move.id === 'hiddenpower' || !hasMove['hiddenpower']))) {
					moves.splice(k, 1);
					break;
				}

				// Handle Hidden Power IVs
				if (move.id === 'hiddenpower') {
					let HPivs = this.getType(move.type).HPivs;
					for (let iv in HPivs) {
						ivs[iv] = HPivs[iv];
					}
				}
			}
			if (moves.length === 4 && !counter.stab && !hasMove['metalburst'] && (counter['physicalpool'] || counter['specialpool'])) {
				if (counter.damagingMoves.length === 0) {
					// A set shouldn't have no attacking moves
					moves.splice(this.random(moves.length), 1);
				} else if (counter.damagingMoves.length === 1) {
					let damagingid = counter.damagingMoves[0].id;
					if (movePool.length - availableHP || availableHP && (damagingid === 'hiddenpower' || !hasMove['hiddenpower'])) {
						if (!counter.damagingMoves[0].damage && template.species !== 'Porygon2') {
							moves.splice(counter.damagingMoveIndex[damagingid], 1);
						}
					}
				} else if (!counter.damagingMoves[0].damage && !counter.damagingMoves[1].damage && template.species !== 'Porygon2') {
					// If you have three or more attacks, and none of them are STAB, reject one of them at random
					let rejectableMoves = [];
					let baseDiff = movePool.length - availableHP;
					for (let l = 0; l < counter.damagingMoves.length; l++) {
						if (counter.damagingMoves[l].id === 'technoblast') continue;
						if (baseDiff || availableHP && (!hasMove['hiddenpower'] || counter.damagingMoves[l].id === 'hiddenpower')) {
							rejectableMoves.push(counter.damagingMoveIndex[counter.damagingMoves[l].id]);
						}
					}
					if (rejectableMoves.length) {
						moves.splice(rejectableMoves[this.random(rejectableMoves.length)], 1);
					}
				}
			}
		} while (moves.length < 4 && movePool.length);

		// If Hidden Power has been removed, reset the IVs
		if (!hasMove['hiddenpower']) {
			ivs = {
				hp: 31,
				atk: 31,
				def: 31,
				spa: 31,
				spd: 31,
				spe: 31,
			};
		}

		let abilities = Object.values(baseTemplate.abilities);
		abilities.sort((a, b) => this.getAbility(b).rating - this.getAbility(a).rating);
		let ability0 = this.getAbility(abilities[0]);
		let ability1 = this.getAbility(abilities[1]);
		let ability2 = this.getAbility(abilities[2]);
		ability = ability0.name;
		if (abilities[1]) {
			if (abilities[2] && ability2.rating === ability1.rating) {
				if (this.random(2)) ability1 = ability2;
			}
			if (ability0.rating <= ability1.rating) {
				if (this.random(2)) ability = ability1.name;
			} else if (ability0.rating - 0.6 <= ability1.rating) {
				if (!this.random(3)) ability = ability1.name;
			}

			let rejectAbility = false;
			if (ability in counterAbilities) {
				// Adaptability, Contrary, Hustle, Iron Fist, Sheer Force, Skill Link
				rejectAbility = !counter[toId(ability)];
			} else if (ability === 'Blaze') {
				rejectAbility = !counter['Fire'];
			} else if (ability === 'Chlorophyll') {
				rejectAbility = !hasMove['sunnyday'] && !teamDetails['sun'];
			} else if (ability === 'Compound Eyes' || ability === 'No Guard') {
				rejectAbility = !counter['inaccurate'];
			} else if (ability === 'Defiant' || ability === 'Moxie') {
				rejectAbility = !counter['Physical'] && !hasMove['batonpass'];
			} else if (ability === 'Gluttony' || ability === 'Moody') {
				rejectAbility = true;
			} else if (ability === 'Lightning Rod') {
				rejectAbility = template.types.indexOf('Ground') >= 0;
			} else if (ability === 'Limber') {
				rejectAbility = template.types.indexOf('Electric') >= 0;
			} else if (ability === 'Overgrow') {
				rejectAbility = !counter['Grass'];
			} else if (ability === 'Poison Heal') {
				rejectAbility = abilities.indexOf('Technician') >= 0 && !!counter['technician'];
			} else if (ability === 'Prankster') {
				rejectAbility = !counter['Status'];
			} else if (ability === 'Reckless' || ability === 'Rock Head') {
				rejectAbility = !counter['recoil'];
			} else if (ability === 'Sand Veil') {
				rejectAbility = !teamDetails['sand'];
			} else if (ability === 'Serene Grace') {
				rejectAbility = !counter['serenegrace'] || template.id === 'chansey' || template.id === 'blissey';
			} else if (ability === 'Simple') {
				rejectAbility = !counter.setupType && !hasMove['flamecharge'] && !hasMove['stockpile'];
			} else if (ability === 'Snow Cloak') {
				rejectAbility = !teamDetails['hail'];
			} else if (ability === 'Sturdy') {
				rejectAbility = !!counter['recoil'] && !counter['recovery'];
			} else if (ability === 'Swarm') {
				rejectAbility = !counter['Bug'];
			} else if (ability === 'Swift Swim') {
				rejectAbility = !hasMove['raindance'] && !teamDetails['rain'];
			} else if (ability === 'Technician') {
				rejectAbility = !counter['technician'] || (abilities.indexOf('Skill Link') >= 0 && counter['skilllink'] >= counter['technician']);
			} else if (ability === 'Torrent') {
				rejectAbility = !counter['Water'];
			}

			if (rejectAbility) {
				// Only switch if the alternative doesn't suck
				if (ability === ability1.name) {
					ability = ability0.name;
				} else if (ability1.rating > 1) {
					ability = ability1.name;
				}
			}
			if (abilities.indexOf('Chlorophyll') >= 0 && ability !== 'Solar Power' && hasMove['sunnyday']) {
				ability = 'Chlorophyll';
			}
			if (abilities.indexOf('Guts') >= 0 && ability !== 'Quick Feet' && hasMove['facade']) {
				ability = 'Guts';
			}
			if (abilities.indexOf('Swift Swim') >= 0 && hasMove['raindance']) {
				ability = 'Swift Swim';
			}
		}

		item = 'Leftovers';
		if (template.requiredItem) {
			item = template.requiredItem;

		// First, the extra high-priority items
		} else if (template.species === 'Marowak') {
			item = 'Thick Club';
		} else if (template.species === 'Deoxys-Attack') {
			item = (slot === 0 && hasMove['stealthrock']) ? 'Focus Sash' : 'Life Orb';
		} else if (template.species === 'Farfetch\'d') {
			item = 'Stick';
		} else if (template.species === 'Pikachu') {
			item = 'Light Ball';
		} else if (template.species === 'Shedinja' || template.species === 'Smeargle') {
			item = 'Focus Sash';
		} else if (template.species === 'Unown') {
			item = 'Choice Specs';
		} else if (template.species === 'Wobbuffet' && hasMove['destinybond'] && this.random(2)) {
			item = 'Custap Berry';
		} else if (ability === 'Imposter') {
			item = 'Choice Scarf';
		} else if (hasMove['trick'] && hasMove['gyroball'] && (ability === 'Levitate' || hasType['Flying'])) {
			item = 'Macho Brace';
		} else if (hasMove['trick'] && hasMove['gyroball']) {
			item = 'Iron Ball';
		} else if (hasMove['switcheroo'] || hasMove['trick']) {
			let randomNum = this.random(2);
			if (counter.Physical >= 3 && (template.baseStats.spe >= 95 || randomNum)) {
				item = 'Choice Band';
			} else if (counter.Special >= 3 && (template.baseStats.spe >= 95 || randomNum)) {
				item = 'Choice Specs';
			} else {
				item = 'Choice Scarf';
			}
		} else if (template.evos.length) {
			item = 'Eviolite';
		} else if (hasMove['rest'] && !hasMove['sleeptalk'] && ability !== 'Natural Cure' && ability !== 'Shed Skin') {
			item = 'Chesto Berry';
		} else if (ability === 'Harvest') {
			item = 'Sitrus Berry';
		} else if (hasMove['lightscreen'] && hasMove['reflect']) {
			item = 'Light Clay';
		} else if (hasMove['acrobatics']) {
			item = 'Flying Gem';
		} else if (hasMove['shellsmash']) {
			item = 'White Herb';
		} else if (hasMove['facade'] || ability === 'Poison Heal' || ability === 'Toxic Boost') {
			item = 'Toxic Orb';
		} else if (hasMove['raindance']) {
			item = 'Damp Rock';
		} else if (hasMove['sunnyday']) {
			item = 'Heat Rock';
		} else if (ability === 'Magic Guard' && hasMove['psychoshift']) {
			item = 'Flame Orb';
		} else if (ability === 'Sheer Force' || ability === 'Magic Guard') {
			item = 'Life Orb';
		} else if (ability === 'Unburden' && (counter['Physical'] || counter['Special'])) {
			// Give Unburden mons a random Gem of the type of one of their damaging moves
			let eligibleTypes = [];
			for (let i = 0; i < moves.length; i++) {
				let move = this.getMove(moves[i]);
				if (!move.basePower && !move.basePowerCallback) continue;
				eligibleTypes.push(move.type);
			}
			item = eligibleTypes[this.random(eligibleTypes.length)] + ' Gem';
		} else if (ability === 'Guts') {
			if (hasMove['drainpunch']) {
				item = 'Flame Orb';
			} else {
				item = 'Toxic Orb';
			}

		// Medium priority
		} else if (hasMove['lightscreen'] || hasMove['reflect']) {
			item = 'Light Clay';
		} else if (counter.Physical >= 4 && !hasMove['fakeout'] && !hasMove['suckerpunch'] && !hasMove['flamecharge'] && !hasMove['rapidspin']) {
			item = this.random(3) ? 'Choice Band' : 'Expert Belt';
		} else if (counter.Special >= 4) {
			item = this.random(3) ? 'Choice Specs' : 'Expert Belt';
		} else if (this.getEffectiveness('Ground', template) >= 2 && ability !== 'Levitate' && !hasMove['magnetrise']) {
			item = 'Air Balloon';
		} else if ((hasMove['eruption'] || hasMove['waterspout']) && !counter['Status']) {
			item = 'Choice Scarf';
		} else if (hasMove['substitute'] && hasMove['reversal']) {
			let eligibleTypes = [];
			for (let i = 0; i < moves.length; i++) {
				let move = this.getMove(moves[i]);
				if (!move.basePower && !move.basePowerCallback) continue;
				eligibleTypes.push(move.type);
			}
			item = eligibleTypes[this.random(eligibleTypes.length)] + ' Gem';
		} else if (hasMove['detect'] || hasMove['protect'] || hasMove['substitute']) {
			item = 'Leftovers';
		} else if ((hasMove['flail'] || hasMove['reversal']) && ability !== 'Sturdy') {
			item = 'Focus Sash';
		} else if (ability === 'Iron Barbs') {
			item = 'Rocky Helmet';
		} else if (template.baseStats.hp + template.baseStats.def + template.baseStats.spd >= 285) {
			item = 'Leftovers';
		} else if (counter.Physical + counter.Special >= 3 && counter.setupType) {
			item = 'Life Orb';
		} else if (counter.Physical + counter.Special >= 4) {
			item = 'Expert Belt';
		} else if (slot === 0 && ability !== 'Sturdy' && !counter['recoil']) {
			item = 'Focus Sash';
		} else if (hasMove['outrage']) {
			item = 'Lum Berry';

		// This is the "REALLY can't think of a good item" cutoff
		} else if (this.getEffectiveness('Rock', template) >= 1) {
			item = 'Leftovers';
		} else if (hasType['Poison']) {
			item = 'Black Sludge';
		} else if (this.getImmunity('Ground', template) && this.getEffectiveness('Ground', template) >= 1 && ability !== 'Levitate' && !hasMove['magnetrise']) {
			item = 'Air Balloon';
		} else if (counter.Status <= 1 && ability !== 'Sturdy' && !hasMove['rapidspin']) {
			item = 'Life Orb';
		} else {
			item = 'Leftovers';
		}

		if (item === 'Leftovers' && hasType['Poison']) {
			item = 'Black Sludge';
		}

		let levelScale = {
			Uber: 73,
			OU: 75,
			BL: 76,
			UU: 77,
			BL2: 78,
			RU: 79,
			BL3: 80,
			NU: 81,
		};
		let customScale = {
			Blaziken: 74, 'Deoxys-Defense': 74, Landorus: 74, Manaphy: 74, Thundurus: 74, 'Tornadus-Therian': 74, Unown: 85,
		};
		let level = levelScale[template.tier] || 75;
		if (customScale[template.name]) level = customScale[template.name];

		// Minimize confusion damage
		if (!counter['Physical']) {
			evs.atk = 0;
			ivs.atk = hasMove['hiddenpower'] ? ivs.atk - 30 : 0;
		}

		if (hasMove['gyroball'] || hasMove['trickroom']) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		return {
			name: name,
			moves: moves,
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level: level,
			shiny: !this.random(1024),
		};
	},
	randomTeam: function (side) {
		let pokemonLeft = 0;
		let pokemon = [];

		let excludedTiers = {'LC':1, 'LC Uber':1, 'NFE':1, 'CAP':1};

		let pokemonPool = [];
		for (let id in this.data.FormatsData) {
			let template = this.getTemplate(id);
			if (!excludedTiers[template.tier] && template.randomBattleMoves) {
				pokemonPool.push(id);
			}
		}

		let typeCount = {};
		let typeComboCount = {};
		let baseFormes = {};
		let uberCount = 0;
		let nuCount = 0;
		let teamDetails = {stealthRock: 0, toxicSpikes: 0, rapidSpin: 0};

		while (pokemonPool.length && pokemonLeft < 6) {
			let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			// Limit to one of each species; Spiky-eared Pichu is not available
			if (!template.exists || template.gen >= this.gen || baseFormes[template.baseSpecies] || template.species === 'Pichu-Spiky-eared') continue;

			let tier = template.tier;
			switch (tier) {
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'NU':
				// NUs are limited to 2 but have a 20% chance of being added anyway
				if (nuCount > 1 && this.random(5) >= 1) continue;
			}

			// Adjust rate for species with multiple formes
			switch (template.baseSpecies) {
			case 'Arceus':
				if (this.random(17) >= 1) continue;
				break;
			case 'Basculin': case 'Castform':
				if (this.random(2) >= 1) continue;
				break;
			case 'Genesect':
				if (this.random(5) >= 1) continue;
				break;
			case 'Meloetta':
				if (this.random(2) >= 1) continue;
				break;
			}

			// Limit 2 of any type
			let types = template.types;
			let skip = false;
			for (let t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 && this.random(5) >= 1) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			let set = this.randomSet(template, pokemon.length, teamDetails);

			// Illusion shouldn't be the last Pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit 1 of any type combination
			let typeCombo = types.join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in typeComboCount) continue;

			pokemon.push(set);
			pokemonLeft++;

			// Increment counters
			baseFormes[template.baseSpecies] = 1;

			for (let t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;

			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'NU') {
				nuCount++;
			}

			if (set.ability === 'Drizzle' || set.moves.indexOf('raindance') >= 0) {
				teamDetails['rain'] = 1;
			} else if (set.ability === 'Drought' || set.moves.indexOf('sunnyday') >= 0) {
				teamDetails['sun'] = 1;
			} else if (set.ability === 'Sand Stream') {
				teamDetails['sand'] = 1;
			} else if (set.ability === 'Snow Warning') {
				teamDetails['hail'] = 1;
			}
		}
		return pokemon;
	},
};
