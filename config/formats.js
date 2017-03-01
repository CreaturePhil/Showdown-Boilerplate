'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// Randomized Metas
	///////////////////////////////////////////////////////////////////
	{
		section: "Randomized Metas",
		column: 1,
	},
	{
		name: "[Gen 7] BH Battle Factory",

		mod: 'gen7',
		team: 'randomFactory',
		ruleset: ['Pokemon', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles Hackmons Cup",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Triples Hackmons Cup",

		gameType: 'triples',
		team: 'randomHC',

		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Challenge Cup",
		column: 1,

		mod: 'gen7',
		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Dragon Heaven Super Staff Bros",
		desc: ["&bullet; The staff here becomes a Pokemon and battles! <br> &bullet; <a href=\"https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md\">Movesets</a>"],
		mod: 'dhssb',
		team: 'randomSeasonalMelee',
		ruleset: ['PotD', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function() {
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
				if (name == "thetruefalcon")
				{
					pokemon.types[1] = "Fighting";
				}
				if (name == "theswordbreaker")
				{
					pokemon.types = ["Dragon"];
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
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function(pokemon) {
			let name = toId(pokemon.name);
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (this.data.Statuses[name] && this.data.Statuses[name].exists) {
				pokemon.addVolatile(name, pokemon);
			}
			if (name === 'thetruefalcon') {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
		onModifyPokemon: function(pokemon) {
			let name = toId(pokemon.name);
		},
	},
	{
		name: "[Gen 7] [Main] Super Staff Bros. Melee",
		mod: 'ssbm',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function() {
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
		onImmunity: function(type, pokemon) {
			if (toId(pokemon.name) === 'juanma' && type === 'Fire') {
				this.add('-message', "Did you think fire would stop __him__? You **fool**!");
				return false;
			}
		},
		onNegateImmunity: function(pokemon, type) {
			if (pokemon.volatiles['flipside']) return false;
			const foes = pokemon.side.foe.active;
			if (foes.length && foes[0].volatiles['samuraijack'] && pokemon.hasType('Dark') && type === 'Psychic') return false;
		},
		onEffectiveness: function(typeMod, target, type, move) {
			if (!target.volatiles['flipside']) return;
			if (move && move.id === 'retreat') return;
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function(pokemon) {
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
		onSwitchIn: function(pokemon) {
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
				this.boost({
					spe: 1
				}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'haund') {
				pokemon.addVolatile('prodigy', pokemon);
			}
			if (name === 'innovamania' && !pokemon.illusion) {
				this.boost({
					atk: 6,
					def: 6,
					spa: 6,
					spd: 6,
					spe: 6,
					accuracy: 6
				}, pokemon, pokemon, 'divine grace');
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
				this.boost({
					def: 1
				}, pokemon, pokemon, 'fur coat innate');
			}
			if (name === 'mizuhime' || name === 'kalalokki' || name === 'sweep') {
				this.setWeather('raindance');
			}
			if (name === 'nv') {
				pokemon.addVolatile('cuteness', pokemon);
			}
			if (name === 'pikachuun') {
				this.boost({
					spe: 1
				}, pokemon, pokemon, 'Reisen Cosplay');
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
				this.boost({
					def: -1,
					spd: -1,
					atk: 1,
					spe: 1
				}, pokemon, pokemon, 'Weak Skin');
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
			if (name === 'spandan') {
				this.add('c|~Spandan|o shit waddup!');
			}
			if (name === 'classyz') {
				this.add('c|%ClassyZ|pro tip: if u kill me go straight to hell do not pass go do not collect $200');
			}
			if (name === 'flygonerz') {
				this.add('c|@Flygonerz|The Sand Dweller has arrived');
			}
			if (name === 'pieddychomp') {
				this.add('c|&PI★EddyChomp|Hey guys, watch me KO this guy lmao xaa :)');
			}
			if (name === 'thegodofhaxorus') {
				this.add('c|@The God of Haxorus|Hi! I\'m a **Hax**orus :3');
			}
			if (name === 'loominite') {
				this.add('c|&Loominite|Okay, lets go :I');
			}
			if (name === 'charizard8888') {
				this.add('c|&charizard8888|It\'s **Outragin\' Time !!**');
			}
			if (name === 'ransei') {
				this.add('c|~Ransei|yo');
			}
			if (name === 'xprienzo') {
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
					const hazards = {
						stealthrock: 1,
						spikes: 1,
						toxicspikes: 1,
						burnspikes: 1,
						stickyweb: 1
					};
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
		onFaint: function(pokemon, source, effect) {
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
			if (name === 'classyz') {
				this.add('c|%ClassyZ|go straight to hell do not pass go do not collect $200');
			}
			if (name === 'flygonerz') {
				this.add('c|@Flygonerz|Plox nerf, Ninten__doh__!');
			}
			if (name === 'pieddychomp') {
				this.add("c|&PI★EddyChomp|Fuck this shit, I got rekt. I\'ll get MY REVENGE! RAWR!!!!");
			}
			if (name === 'loominite') {
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
		onSwitchOut: function(pokemon) {
			let name = toId(pokemon.name);

			if (!pokemon.illusion) {
				if (name === 'hippopotas') {
					this.add('-message', 'The sandstorm subsided.');
				}
			}

			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
		},
		onModifyPokemon: function(pokemon) {
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
		onResidual: function(battle) {
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
		name: "[Gen 7] Monotype Random Battle",

		mod: 'gen7',
		team: 'random',
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Random Benjamin Butterfree",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/benjamin-butterfree-aka-pokemon-deevolution.3581895/\">Benjamin Butterfee (Pokemon DeEvolution)</a>"],
		mod: 'bb',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', "Team Preview"],
		onAfterDamage: function(damage, target, source, move) {
			if (!target.willDevolve) return;
			let template = target.template.isMega ? this.getTemplate(this.getTemplate(target.template.baseSpecies).prevo) : this.getTemplate(target.template.prevo);
			target.willDevolve = false;
			target.formeChange(template);
			target.baseTemplate = template;
			target.details = template.species + (target.level === 100 ? '' : ', L' + target.level) + (target.gender === '' ? '' : ', ' + target.gender) + (target.set.shiny ? ', shiny' : '');
			this.add('detailschange', target, target.details);
			this.add('-message', "" + target.name + " has de-volved into " + template.name + "!");
			target.setAbility(template.abilities['0']);
			target.baseAbility = target.ability;
			let newHP = Math.floor(Math.floor(2 * target.template.baseStats['hp'] + target.set.ivs['hp'] + Math.floor(target.set.evs['hp'] / 4) + 100) * target.level / 100 + 10);
			target.hp = newHP;
			target.maxhp = newHP;
			this.add('-heal', target, target.getHealth, '[silent]');
			this.heal(target.maxhp, target, source, 'devolution', '[silent]');
			let movepool = template.learnset;
			let prevo = template.prevo;
			while (prevo) {
				let learnset = this.getTemplate(prevo).learnset;
				for (let i in learnset) {
					movepool[i] = learnset[i];
				}
				prevo = this.getTemplate(prevo).prevo;
			}
			let newmoves = [],
				newbasemoves = [];
			for (let i = 0; i < target.baseMoveset.length; i++) {
				if (movepool[target.baseMoveset[i].id]) {
					newbasemoves.push(target.baseMoveset[i]);
					newmoves.push(target.moveset[i]);
				}
			}
			target.baseMoveset = newbasemoves;
			target.moveset = newmoves;
			target.clearBoosts();
			this.add('-clearboost', target, "[silent]");
			target.species = target.template.species;
			target.canMegaEvo = false;
			target.cureStatus('[silent]');
			target.volatiles = {};
		},
	},
	{
		name: "[Gen 7] Random Camomon",
		desc: [
			"Pok&eacute;mon change type to match their first two moves.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		],
		team: 'random',

		ruleset: ['[Gen 7] OU'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let types = [this.getMove(pokemon.moves[0]).type];
				if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
				pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				pokemon.types = pokemon.template.types = types;
			}
		},
		onAfterMega: function(pokemon) {
			let types = [this.getMove(pokemon.moves[0]).type];
			if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
			pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
			pokemon.types = pokemon.template.types = types;
		},
	},
	{
		name: "[Gen 7] Random Camomons++",
		desc: [
			"Pok&eacute;mon change type to match their moves. Hence, a Pokemon can now have a maximum of 4 types.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		],
		team: 'random',

		ruleset: ['Random Battle', 'Team Preview'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let types = [this.getMove(pokemon.moves[0]).type],
					type = {};
				type[this.getMove(pokemon.moves[0]).type] = true;
				for (let j = 1; j < pokemon.moves.length; j++)
				{
					if (pokemon.moves[j] && !type[this.getMove(pokemon.moves[j]).type]) {
						types.push(this.getMove(pokemon.moves[j]).type);
						type[this.getMove(pokemon.moves[j]).type] = true;
					}
				}
				pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				pokemon.types = pokemon.template.types = types;
			}
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onAfterMega: function(pokemon) {
			let types = [this.getMove(pokemon.moves[0]).type],
				type = {};
			type[this.getMove(pokemon.moves[0]).type] = true;
			for (let j = 1; j < pokemon.moves.length; j++)
			{
				if (pokemon.moves[j] && !type[this.getMove(pokemon.moves[j]).type]) {
					types.push(this.getMove(pokemon.moves[j]).type);
					type[this.getMove(pokemon.moves[j]).type] = true;
				}
			}
			pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
			pokemon.types = pokemon.template.types = types;
		},
	},

	{
		name: "[Gen 7] Random Haxmons",

		team: 'random',
		ruleset: ['[Gen 7] OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
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
		name: "[Gen 7] Random Open House",
		desc: ["Every 5 turns, one of Trick Room, Magic Room or Wonder Room is set up.", "&bullet; <a href=\"http://www.smogon.com/forums/threads/open-house.3584274/\">Open House</a>"],
		mod: "openhouse",
		team: 'random',
		ruleset: ["Team Preview", 'Random Battle'],
		onBegin: function()
		{
			this.houses = ["Wonder Room", "Trick Room", "Magic Room"];
			this.nexthouse = this.houses[this.random(3)];
			this.add("-message", "Starting next turn, the battle will take place in the " + this.nexthouse + "!");
		},
		onResidualOrder: 999,
		onResidual: function()
		{
			if (this.turn % 5 == 4)
			{
				let nexthouse = this.houses[this.random(3)];
				while (nexthouse == this.curhouse) nexthouse = this.houses[this.random(3)];
				this.nexthouse = nexthouse;
				this.add("-message", "Starting next turn, the battle will take place in the " + this.nexthouse + "!");
			}
		}
	},
	{
		name: "[Gen 7] Random Meta Man",
		desc: [
			"When a Pokemon faints, the opposing Pokemon replaces its current ability with the fainted Pokemon's and gains its last-used move in a new slot (for up to 9 total moves). These changes last the entire match. If a Pokemon faints before using a move during the match, no move is gained by the opponent.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/meta-man.3565966/\">Meta Man</a>",
		],
		team: 'random',
		ruleset: ['Team Preview', 'Random Battle'],
		mod: "metaman",
		onFaint: function(pokemon)
		{
			this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + this.data.Abilities[pokemon.ability].name + "!");
			pokemon.side.foe.pokemon[0].setAbility(pokemon.ability);
			pokemon.side.foe.pokemon[0].baseAbility = pokemon.ability;
			let lastMove = pokemon.lastM;
			let has
			if (pokemon.side.foe.pokemon[0].moveset.length <= 9 && lastMove && !pokemon.side.foe.pokemon[0].hasMove(lastMove.id))
			{
				pokemon.side.foe.pokemon[0].moveset.push(lastMove);
				pokemon.side.foe.pokemon[0].baseMoveset.push(lastMove);
				this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + pokemon.lastM.move + "!");
			}
		},
	},
	{
		name: "[Gen 7] Random Top Percentage",
		mod: 'toppercentage',
		desc: ["&lt; <a href=\"http://www.smogon.com/forums/threads/top-percentage.3564459/\">Top Percentage</a>"],
		ruleset: ['Random Battle', "Team Preview"],
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
			this.add('-message', target.side.name + " has " + Math.round(target.side.metaCount) + "% left!");
			if (target.side.metaCount <= 0.1) {
				//note: making this 0.1 because I got 1.10 times 10^-15 once
				//something silly with rounding
				//this works well enough
				this.add('raw|' + target.side.foe.name + " has dealt 400% damage!");
				this.win(target.side.foe);
			}
		},
	},
	{
		name: "[Gen 7] Random Pokebilities",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/pokébilities.3588652\">Pokebilities</a>: A Pokemon can have all of its abilities at the same time."],
		ruleset: ["Random Battle"],
		team: 'random',
		mod: 'pokebilities',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onSwitchInPriority: 1,
		onBegin: function() {
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
			let bans = this.data.Formats.gen7ou.banlist;
			bans.push("Battle Bond");
			for (let p = 0; p < this.sides.length; p++) {
				for (let i = 0; i < this.sides[p].pokemon.length; i++) {
					let pokemon = this.sides[p].pokemon[i];
					let template = this.getTemplate(pokemon.species);
					this.sides[p].pokemon[i].innates = [];

					for (let a in template.abilities) {
						if (toId(a) == 'h' && template.unreleasedHidden) continue;
						if (toId(template.abilities[a]) === pokemon.ability) continue;
						if (statusability[toId(template.abilities[a])])
							this.sides[p].pokemon[i].innates.push("other" + toId(template.abilities[a]));
						else
							this.sides[p].pokemon[i].innates.push(toId(template.abilities[a]));
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

	// SM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "SM Singles",
	},
	{
		name: "[Gen 7] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587188/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag'],
	},
	{
		name: "[Gen 7] Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>"],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3591786/\">UU Metagame Discussion</a>"],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'BL', 'Power Construct', 'Mewnium Z', 'Baton Pass'],
	},
	{
		name: "[Gen 7] RU (alpha)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587352/\">RU Metagame Discussion</a>"],

		mod: 'gen7',
		ruleset: ['[Gen 7] UU'],
		banlist: [
			'Amoonguss', 'Azumarill', 'Azelf', 'Bewear', 'Bisharp', 'Blissey', 'Breloom', 'Cobalion', 'Conkeldurr', 'Decidueye', 'Dhelmise',
			'Diggersby', 'Dragonite', 'Empoleon', 'Forretress', 'Gengar', 'Gigalith', 'Gliscor', 'Gyarados', 'Hippowdon', 'Hydreigon',
			'Infernape', 'Jirachi', 'Keldeo', 'Krookodile', 'Latias', 'Magneton', 'Mamoswine', 'Mandibuzz', 'Mew', 'Muk-Alola', 'Necrozma',
			'Porygon-Z', 'Primarina', 'Raikou', 'Salamence', 'Scizor', 'Serperior', 'Starmie', 'Staraptor', 'Sylveon', 'Tentacruel',
			'Terrakion', 'Thundurus', 'Tornadus-Therian', 'Tsareena', 'Victini', 'Volcanion', 'Volcarona', 'Weavile', 'Zygarde-10%',
			'Aerodactylite', 'Blastoisinite', 'Sharpedonite', 'Slowbronite',
		],
	},
	{
		name: "[Gen 7] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/sm/formats/lc/\">LC Banlist</a>",
		],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: ['Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Yanma', 'Eevium Z', 'Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 7] Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587473/\">Battle Spot Singles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587201/\">Battle Spot Singles Viability Ranking</a>",
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Battle Spot Special 2",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3592974/\">Battle Spot Special</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Soul Dew', 'Battle Bond'],
		onValidateTeam: function(team) {
			let special = {
				'Mewtwo': 1,
				'Mew': 1,
				'Lugia': 1,
				'Ho-Oh': 1,
				'Celebi': 1,
				'Kyogre': 1,
				'Groudon': 1,
				'Rayquaza': 1,
				'Jirachi': 1,
				'Deoxys': 1,
				'Dialga': 1,
				'Palkia': 1,
				'Giratina': 1,
				'Phione': 1,
				'Manaphy': 1,
				'Darkrai': 1,
				'Shaymin': 1,
				'Arceus': 1,
				'Victini': 1,
				'Reshiram': 1,
				'Zekrom': 1,
				'Kyurem': 1,
				'Keldeo': 1,
				'Meloetta': 1,
				'Genesect': 1,
				'Xerneas': 1,
				'Yveltal': 1,
				'Zygarde': 1,
				'Diancie': 1,
				'Hoopa': 1,
				'Volcanion': 1,
				'Cosmog': 1,
				'Cosmoem': 1,
				'Solgaleo': 1,
				'Lunala': 1,
				'Necrozma': 1,
				'Magearna': 1
			};
			let hasSpecial = false;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (template.baseSpecies in special) {
					if (hasSpecial) return ["Only one of the following can be used per team: Mewtwo, Mew, Lugia, Ho-Oh, Celebi, Kyogre, Groudon, Rayquaza, Jirachi, Deoxys, Dialga, Palkia, Giratina, Phione, Manaphy, Darkrai, Shaymin, Arceus, Victini, Reshiram, Zekrom, Kyurem, Keldeo, Meloetta, Genesect, Xerneas, Yveltal, Zygarde, Diancie, Hoopa, Volcanion, Cosmog, Cosmoem, Solgaleo, Lunala, Necrozma, Magearna."];
					hasSpecial = true;
				}
			}
		},
	},
	{
		name: "[Gen 7] Alola Friendly",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3591710/\">Alola Friendly</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex'],
		banlist: ['Illegal', 'Unreleased', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// SM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "SM Doubles",
	},
	{
		name: "Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles OU",
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
		name: "[Gen 7] Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
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
		requirePlus: true,
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////
	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 7] Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">AG Resources</a>",
		],
		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Chatter', 'Extreme Evoboost'],
		validateSet: function(set, teamHas) {
			let problems = this.validateSet(set, teamHas) || [];
			set.moves.forEach(move => {
				if (this.tools.data.Movedex[toId(move)].isZ) {
					problems.push((set.name || set.species) + " has a Crystal Free Z-Move, which is banned by Balanced Hackmons.");
				}
			});
			return problems;
		},
	},
	{
		name: "[Gen 7] 1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587523/\">1v1</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss',
		],
	},
	{
		name: "[Gen 7] Monotype",
		desc: [
			"All the Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587204/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3589809/\">Monotype Viability Ranking</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kartana', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591580/\">Mix and Mega Resources</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass'],
		onValidateTeam: function(team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
				}
			}
		},
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function(pokemon) {
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
		onSwitchOut: function(pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587901/\">Almost Any Ability</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Aegislash', 'Arceus', 'Archeops', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala',
			'Mewtwo', 'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite',
		],
		onValidateSet: function(set) {
			let bannedAbilities = {
				'Arena Trap': 1,
				'Comatose': 1,
				'Contrary': 1,
				'Fur Coat': 1,
				'Huge Power': 1,
				'Imposter': 1,
				'Parental Bond': 1,
				'Pure Power': 1,
				'Simple': 1,
				'Speed Boost': 1,
				'Water Bubble': 1,
				'Wonder Guard': 1
			};
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
		name: "[Gen 7] Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketched move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587743/\">Sketchmons</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Allow One Sketch',
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Landorus-Base', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite',
			'Arena Trap + Dark Void', 'Arena Trap + Grass Whistle', 'Arena Trap + Hypnosis', 'Arena Trap + Relic Song', 'Arena Trap + Sing', 'Arena Trap + Sleep Powder',
		],
		noSketch: ['Celebrate', 'Conversion', "Forest's Curse", 'Geomancy', 'Happy Hour', 'Hold Hands', 'Lovely Kiss', 'Purify', 'Shell Smash', 'Shift Gear', 'Sketch', 'Spore', 'Trick-or-Treat'],
		onValidateTeam: function(team) {
			let sketchedMoves = {};
			for (let i = 0; i < team.length; i++) {
				let move = team[i].sketchmonsMove;
				if (!move) continue;
				if (move in sketchedMoves) {
					return ["You are limited to sketching one of each move by Move Clause.", "(You have sketched " + this.getMove(move).name + " more than once)"];
				}
				sketchedMoves[move] = (team[i].name || team[i].species);
			}
		},
	},
	{
		name: "[Gen 7] Classic Hackmons",
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		maxLevel: 100,
		defaultLevel: 100,
		onValidateSet: function(set) {
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
		name: "[Gen 7] Tier Shift",
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
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
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let template = pokemon.baseTemplate;
				let tier = template.tier;
				if (pokemon.set.item) {
					let item = this.getItem(pokemon.set.item);
					if (item.megaEvolves === template.species) tier = this.getTemplate(item.megaStone).tier;
				}
				if (tier.charAt(0) === '(') tier = tier.slice(1, -1);
				let boost = (tier in boosts) ? boosts[tier] : 0;
				let baseStats = {};
				for (let statName in template.baseStats) {
					baseStats[statName] = this.clampIntRange(template.baseStats[statName] + boost, 1, 255);
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);
				pokemon.template = template;
				pokemon.formeChange(template);
			}
		},
		ruleset: ['[Gen 7] OU'],
	},
	{
		name: "[Gen 7] Inverse Battle",
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
		onEffectiveness: function(typeMod, target, type, move) {
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
		name: "[Gen 7] Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591194/\">Hidden Type</a>",
		],
		mod: 'hiddentype',
		ruleset: ['[Gen 7] OU'],
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],

		mod: 'theorymon',
		ruleset: ['OU'],
	},
	{
		name: "Gen-NEXT OU",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},
	// New Other Metagames ///////////////////////////////////////////////////////////////////
	{
		section: "New Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 7] All Terrain",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3596038/\">All Terrain</a>: All Terrain is a metagame in which all terrains are active permanently. Yes, Grassy, Electric, Misty and Psychic terrain are all active all at once."],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Nature Power', 'Secret Power', 'Camoflauge', 'Raichu-Alola'],
		unbanlist: ["Landorus"],
		mod: 'allterrain',
		onBegin: function() {
			this.setTerrain('allterrain');
		},
	},
	{
		name: "[Gen 7] Automagic",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3594333/\">Automagic</a>: Whenever an attack activates a secondary effect, any setup moves in that Pokemon's movepool are activated too."],
		ruleset: ['[Gen 7] OU'],
		mod: 'automagic',
		onAfterSecondaryEffect: function(target, source, move) {
			let moreSetup = ['bellydrum'];
			if (!source.types.includes("Ghost")) moreSetup.push("curse");
			source.baseMoveset.forEach(curmove => {
				let move = this.getMove(curmove.id);
				if (moreSetup.includes(move.id) || (move.category === "Status" && move.boosts && move.target === "self")) {
					this.useMove(move, source);
					curmove.pp = target.hasAbility("pressure") ? (curmove.pp - 2) : (curmove.pp - 1);
				}
			});
		},
		onAfterMove: function(source, target, move) {
			if (move.id !== "genesissupernova") return;
			source.baseMoveset.forEach(curmove => {
				let move = this.getMove(curmove.id);
				let isDead = target.hp === undefined || target.hp <= 0;
				if ((move.id === 'bellydrum' || (move.category === "Status" && move.boosts && move.target === "self")) && this.terrain === "psychicterrain") {
					this.useMove(move, source);
					curmove.pp = target.hasAbility("pressure") ? (curmove.pp - 2) : (curmove.pp - 1);
				}
			});
		},
	},
	{
		name: "[Gen 7] Bad \'n Boosted",
		desc: ["&bullet; All the stats of a pokemon which are 70 or below get doubled.<br>For example, Growlithe's stats are 55/70/45/70/50/60 in BnB they become 110/140/90/140/100/120<br><b>Banlist:</b>Eviolite, Huge Power, Pure Power"],
		mod: 'bnb',
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Eviolite', 'Huge Power', 'Pure Power', 'Eevium Z']
	},
	{
		name: "[Gen 7] Cross Evolution",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3569577/\">Cross Evolution</a>"],

		ruleset: ['[Gen 7] Ubers', 'Baton Pass Clause'],
		banlist: ['Rule:nicknameclause'],
		onValidateTeam: function(team) {
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
		validateSet: function(set, teamHas) {
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
			let stats = {
				'hp': 'HP',
				'atk': 'Attack',
				'def': 'Defense',
				'spa': 'Special Attack',
				'spd': 'Special Defense',
				'spe': 'Speed'
			};
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
		onBegin: function() {
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
		onSwitchIn: function(pokemon) {
			if (pokemon.crossEvolved) {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] Full Potential",
		desc: ['&bullet; <a href="http://www.smogon.com/forums/threads/3596777/">Full Potential</a>: In this metagame, every Pokemon uses their highest raw stat as their attacking stat.'],
		ruleset: ['[Gen 7] OU'],
		//team: 'random',
		mod: 'fullpotential',
		banlist: ['Pheromosa', 'Shuckle', 'Speed Boost'],
	},
	{
		name: "[Gen 7] Gods and Followers",
		desc: [
			"The Pok&eacute;mon in the first slot is the God; the Followers must share a type with the God. If the God Pok&eacute;mon faints, the Followers are inflicted with Embargo.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3589187/\">Gods and Followers</a>",
		],
		mod: 'godsandfollowers',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Followers Clause', 'Cancel Mod'],
		banlist: ['Illegal']
	},
	{
		name: "[Gen 7] Inheritance",
		desc: [
			"Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592844/\">Inheritance</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Kyurem-Black', 'Pheromosa', 'Regigigas', 'Shedinja', 'Slaking', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
		bannedDonors: ['Araquanid', 'Azumarill', 'Azurill', 'Blaziken', 'Bunnelby', 'Carvanha', 'Chatot', 'Combusken', 'Dewpider', 'Diggersby', 'Diglett', 'Ditto', 'Dugtrio', 'Golett', 'Golurk', 'Liepard', 'Machamp', 'Machoke', 'Machop', 'Marill', 'Medicham', 'Meditite', 'Meowstic', 'Purrloin', 'Scolipede', 'Sharpedo', 'Smeargle', 'Torchic', 'Trapinch', 'Venipede', 'Whirlipede'],
		noChangeForme: true,
		noChangeAbility: true,
		getEvoFamily: function (species) {
			let template = Tools.getTemplate(species);
			while (template.prevo) {
				template = Tools.getTemplate(template.prevo);
			}
			return template.speciesid;
		},
		validateSet: function (set, teamHas) {
			if (!this.format.abilityMap) {
				let abilityMap = Object.create(null);
				for (let speciesid in this.tools.data.Pokedex) {
					let pokemon = this.tools.data.Pokedex[speciesid];
					if (pokemon.num < 1 || pokemon.species in this.format.banlistTable || this.format.bannedDonors.includes(pokemon.species)) continue;
					if (this.tools.data.FormatsData[speciesid].requiredItem || this.tools.data.FormatsData[speciesid].requiredMove) continue;
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
			if (!template.exists) return [`The Pokemon "${set.species}" does not exist.`];
			if (template.isUnreleased) return [`${template.species} is unreleased.`];
			if (template.tier === 'Uber' || template.species in this.format.banlistTable) return [`${template.species} is banned.`];

			let name = set.name;

			let abilityId = toId(set.ability);
			if (!abilityId || !(abilityId in this.tools.data.Abilities)) return [`${name} needs to have a valid ability.`];
			let pokemonWithAbility = this.format.abilityMap[abilityId];
			if (!pokemonWithAbility) return [`"${set.ability}" is not available on a legal Pokemon.`];

			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).
			let validSources = set.abilitySources = []; // evolutionary families
			for (let i = 0; i < pokemonWithAbility.length; i++) {
				let donorTemplate = this.tools.getTemplate(pokemonWithAbility[i]);
				let evoFamily = this.format.getEvoFamily(donorTemplate);

				if (validSources.indexOf(evoFamily) >= 0) continue;

				if (set.name === set.species) delete set.name;
				set.species = donorTemplate.species;
				problems = this.validateSet(set, teamHas) || [];
				if (!problems.length) {
					canonicalSource = donorTemplate.species;
					validSources.push(evoFamily);
				}
				if (validSources.length > 1) {
					// Specific for the basic implementation of Donor Clause (see onValidateTeam).
					break;
				}
			}

			set.species = template.species;
			if (!validSources.length && pokemonWithAbility.length > 1) {
				return [`${template.species}'s set is illegal.`];
			}
			if (!validSources.length) {
				problems.unshift(`${template.species} has an illegal set with an ability from ${this.tools.getTemplate(pokemonWithAbility[0]).name}.`);
				return problems;
			}

			// Protocol: Include the data of the donor species in the `name` data slot.
			// Afterwards, we are going to reset the name to what the user intended. :]
			set.ability = `${set.ability}0${canonicalSource}`;
		},
		onValidateTeam: function (team, format) {
			// Donor Clause
			let evoFamilyLists = [];
			for (let i = 0; i < team.length; i++) {
				let set = team[i];
				if (!set.abilitySources) continue;
				evoFamilyLists.push(set.abilitySources.map(format.getEvoFamily));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			// This clause has only gotten more complex over time, so this is probably a won't fix.
			let requiredFamilies = Object.create(null);
			for (let i = 0; i < evoFamilyLists.length; i++) {
				let evoFamilies = evoFamilyLists[i];
				if (evoFamilies.length !== 1) continue;
				let [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) requiredFamilies[familyId] = 1;
				requiredFamilies[familyId]++;
				if (requiredFamilies[familyId] > 2) return [`You are limited to up to two inheritances from each evolution family by the Donor Clause.`, `(You inherit more than twice from ${this.getTemplate(familyId).species}).`];
			}
		},
		onBegin: function () {
			for (let pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
				if(pokemon.baseAbility.includes('0')) {
					let donor = pokemon.baseAbility.split('0')[1];
					pokemon.donor = toId(donor);
					pokemon.baseAbility = pokemon.baseAbility.split('0')[0];
					pokemon.ability = pokemon.baseAbility;
				}
			}
		},
		onSwitchIn: function (pokemon) {
			if (!pokemon.donor) return;
			let donorTemplate = this.getTemplate(pokemon.donor);
			if (!donorTemplate.exists) return;
			// Place volatiles on the Pokémon to show the donor details.
			this.add('-start', pokemon, donorTemplate.species, '[silent]');
		},
	},
	{
		name: "[Gen 7] Lockdown",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3593815\">Lockdown</a>",
			"At the end of Turn 6, battlefield changes become permanent.",
		],
		mod: 'lockdown',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Damp Rock', 'Heat Rock', 'Smooth Rock', 'Icy Rock', 'Terrain Extender'],
		unbanlist: ['Genesect'],
		onBegin: function() {
			this.lockdownMoves = ['sunnyday', 'raindance', 'hail', 'sandstorm', 'magicroom', 'wonderroom', 'trickroom', 'gravity', 'electricterrain', 'mistyterrain', 'grassyterrain', 'psychicterrain', 'mudsport', 'watersport'];
			this.lockdownHazards = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'];
		},
		onTryHitSide: function(target, source, move) {
			if (this.lockdownHazards.indexOf(move.id) > -1 && this.turn > 6) return false;
		},
		onTryHitField: function(target, source, move) {
			if (this.lockdownMoves.indexOf(move.id) > -1 && this.turn > 6) return false;
		},
		onResidualOrder: 999,
		onResidual: function() {
			if (this.turn !== 6) return;
			let pseudo = ['magicroom', 'wonderroom', 'trickroom', 'gravity', 'mudsport', 'watersport'];
			this.add("-message", "The Lockdown has commenced! Battlefield changes are now permanent!");
			if (this.weatherData.duration) this.weatherData.duration = 0;
			if (this.terrainData.duration) this.terrainData.duration = 0;
			for (let i in this.pseudoWeather) {
				if (pseudo.includes(i)) {
					this.pseudoWeather[i].duration = 0;
				}
			}
		},
	},
	{
		name: "[Gen 7] Mergemons",
		desc: [
			"Pok&eacute;mon gain the movepool of the previous and the next fully evolved Pok&eacute;mon, according to the Pok&eacute;dex.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591780/\">Mergemons</a>",
		],

		mod: 'mergemons',
		ruleset: ['[Gen 7] OU'],
		banlist: [],
	},
	{
		name: "[Gen 7] Offensification",
		desc: [
			"All attacks are caclulated from the user's highest attacking stat.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/offensification-hoopa-u-banned.3524512/\">Offensification</a>",
		],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Flatter', 'Kyurem-Black'],
		mod:'gen7',
		onModifyMove: function(move, pokemon) {
			if (pokemon.stats.atk > pokemon.stats.spa) {
				move.category = (move.category === "Status") ? "Status" : "Physical";
			} else if (pokemon.stats.spa > pokemon.stats.atk) {
				move.category = (move.category === "Status") ? "Status" : "Special";
			}

			if (move.id === 'bellydrum') {
				move.onHit = function(target) {
					if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
						return false;
					}
					this.directDamage(target.maxhp / 2);
					if (target.stats.atk >= target.stats.spa) {
						target.setBoost({
							atk: 6
						});
						this.add('-setboost', target, 'atk', '6', '[from] move: Belly Drum');
					} else {
						target.setBoost({
							spa: 6
						});
						this.add('-setboost', target, 'spa', '6', '[from] move: Belly Drum');
					}
				}
			}
		},
		onBoost: function(boost, target, source, effect) {
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
		name: "[Gen 7] Pokebilities",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3588652/\">Pokebilities</a>: A Pokemon has all of its abilities active at the same time."],
		mod: 'pokebilities',
		ruleset: ["OU"],
		onSwitchInPriority: 1,
		onBegin: function() {
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
			for (let p = 0; p < this.sides.length; p++) {
				for (let i = 0; i < this.sides[p].pokemon.length; i++) {
					let pokemon = this.sides[p].pokemon[i];
					let template = this.getTemplate(pokemon.species);
					this.sides[p].pokemon[i].innates = [];
					let bans = this.data.Formats.gen7ou.banlist;
					bans.push("Battle Bond");
					for (let a in template.abilities) {
						for (let k = 0; k < bans.length; k++) {
							if (toId(bans[k]) === toId(template.abilities[a])) continue;
						}

						if (toId(a) == 'h' && template.unreleasedHidden) continue;
						if (toId(template.abilities[a]) == pokemon.ability) continue;
						if (statusability[toId(template.abilities[a])])
							this.sides[p].pokemon[i].innates.push("other" + toId(template.abilities[a]));
						else
							this.sides[p].pokemon[i].innates.push(toId(template.abilities[a]));
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
		name: "[Gen 7] Trademarked",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/trademarked.3572949/\">Trademarked</a>"],
		column: 1,

		mod: 'trademarked',
		ruleset: ['[Gen 7] OU', 'trademarkclause'],
		banlist: ['Slaking', 'Regigigas', 'Nature Power'],
		validateSet: function(set, teamHas) {
			if (!this.validateSet(set, teamHas).length) return [];
			let ability = this.tools.getAbility(set.ability);
			let template = this.tools.getTemplate(set.species);
			if (!set.moves.includes(ability.id) && !set.moves.includes(ability.name) && !this.checkLearnset(ability.id, template, {
					set: set
				})) {
				template = Object.assign({}, template);
				template.abilities = {
					0: ability.name
				};
			}
			return this.validateSet(set, teamHas, template);
		},

	},
	// Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Pet Mods",
		column: 3,
	},
	{
		name: "Ascension",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3546114/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],
		mod: "ascension",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 7] Choonmons δ",
		desc: ["Choonmons is a pet mod created by Choon. Yup.<br>&bullet; <a href=\"http://www.smogon.com/forums/threads/3546063/\">Choonmons Thread</a>"],
		mod: 'choonmons',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Lucarionite', 'Mawilite', 'Salamencite'],

		onSwitchIn: function(pokemon) {
			let changed = {
				'Venusaur-Mega-X': true,
				'Blastoise': true,
				'Butterfree': true,
				'Pikachu': true,
				'Raichu': true,
				'Golduck': true,
				'Happiny': true,
				'Blissey': true,
				'Gyarados': true,
				'Aerodactyl': true,
				'Feraligatr-Mega': true,
				'Sceptile': true
			};
			let bt = pokemon.baseTemplate;
			if (bt.baseSpecies in changed || (bt.actualSpecies && bt.actualSpecies in changed)) {
				let types = bt.types;
				let bTypes = (types.length === 1 || types[1] === 'caw') ? types[0] : types.join('/');
				this.add('-start', pokemon, 'typechange', bTypes, '[silent]');
			}
			if (bt.actualSpecies) this.add('-start', pokemon, bt.actualSpecies, '[silent]'); //Show the pokemon's actual species
		},
		onSwitchOut: function(pokemon) {
			if (pokemon.baseTemplate.actualSpecies) this.add('-end', pokemon, pokemon.baseTemplate.actualSpecies, '[silent]');
		},
	},
	{
		name: "[Gen 2] Traps",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'traps',
		ruleset: ['[Gen 2] OU'],
		onBegin: function () {
			this.arenaTrap = ['diglett', 'dugtrio'];
			this.magnetPull = ['magnemite', 'magneton'];
		},
		onSwitchIn: function(pokemon) {
			if(this.arenaTrap.includes(toId(pokemon.species))) {
				pokemon.addVolatile('arenatrap');
				return;
			}
			if(this.shadowTag.includes(toId(pokemon.species))) {
				pokemon.addVolatile('arenatrap');
				return;
			}
			if(pokemon.species === 'Wobbuffet') {
				pokemon.addVolatile('shadowtag');
				return;
			}
		}
	},
	{
		name: "[Gen 7] Move Mastery",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/move-mastery.3590075/\">Move Mastery</a>"],
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 'Evasion Moves Clause', 'OHKO Clause', 'Swagger Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal'],
		mod: 'gen7',
		validateSet: function(set, teamHas) {
			if (!this.validateSet(set, teamHas).length) return [];
			let ability = this.tools.getAbility(set.ability);
			let template = this.tools.getTemplate(set.species);
			let movemasters = {
				adaptability: [],
				angerpoint: ["Frost Breath", "Storm Throw"],
				anticipation: [],
				aromaveil: ["Taunt", "Torment", "Encore", "Disable", "Heal Block", "Attract"],
				battlearmor: ["Frost Breath", "Storm Throw"],
				bigpecks: ["Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech"],
				blaze: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				bulletproof: ["Acid Spray", "Aura Sphere", "Barrage", "Beak Blast", "Bullet Seed", "Egg Bomb", "Electro Ball", "Energy Ball", "Focus Blast", "Gyro Ball", "Ice Ball", "Magnet Bomb", "Mist Ball", "Mud Bomb", "Octazooka", "Rock Wrecker", "Searing Shot", "Seed Bomb", "Shadow Ball", "Sludge Bomb", "Weather Ball", "Zap Cannon"],
				chlorophyll: ["Sunny Day"],
				clearbody: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				comatose: ["Hex", "Wake-Up Slap", "Sleep Talk", "Snore", "Uproar", "Rest"],
				competitive: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				compoundeyes: [],
				corrosion: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic"],
				damp: ["Self-Destruct", "Explosion"],
				dancer: ["Feather Dance", "Fiery Dance", "Dragon Dance", "Lunar Dance", "Petal Dance", "Revelation Dance", "Quiver Dance", "Swords Dance", "Teeter Dance"],
				dazzling: ["Fake Out", "Extreme Speed", "Feint", "First Impression", "Accelerock", "Aqua Jet", "Baby-Doll Eyes", "Bullet Punch", "Ice Shard", "Ion Deluge", "Mach Punch", "Powder", "Quick Attack", "Shadow Sneak", "Sucker Punch", "Vacuum Wave", "Water Shuriken"],
				defiant: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				dryskin: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool", "Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				filter: [],
				flareboost: ["Beak Blast", "Blaze Kick", "Blue Flare", "Ember", "Fire Blast", "Fire Fang", "Fire Punch", "Flamethrower", "Flame Wheel", "Flare Blitz", "Fling", "Heat Wave", "Ice Burn", "Inferno", "Lava Plume", "Sacred Fire", "Scald", "Searing Shot", "Steam Eruption", "Tri Attack", "Will-O-Wisp"],
				flashfire: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create", "Will-O-Wisp"],
				flowergift: ["Sunny Day"],
				fluffy: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				grasspelt: ["Grassy Terrain"],
				harvest: ["Sunny Day"],
				heatproof: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				heavymetal: ["Autotomize", "Grass Knot", "Heat Crash", "Heavy Slam", "Low Kick", "Sky Drop"],
				hypercutter: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento"],
				icebody: ["Hail"],
				immunity: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				infiltrator: ["Light Screen", "Reflect", "Safeguard", "Substitute"],
				innerfocus: ["Air Slash", "Astonish", "Bite", "Bone Club", "Dark Pulse", "Dragon Rush", "Extrasensory", "Fake Out", "Fire Fang", "Fling", "Headbutt", "Heart Stamp", "Hyper Fang", "Ice Fang", "Icicle Crash", "Iron Head", "Needle Arm", "Rock Slide", "Rolling Kick", "Sky Attack", "Snore", "Steamroller", "Stomp", "Thunder Fang", "Twister", "Waterfall", "Zen Headbutt", "Zing Zap"],
				insomnia: ["Dark Void", "Grass Whistle", "Hypnosis", "Lovely Kiss", "Relic Song", "Rest", "Sing", "Sleep Powder", "Spore", "Yawn"],
				ironfist: ["Bullet Punch", "Comet Punch", "Dizzy Punch", "Drain Punch", "Dynamic Punch", "Fire Punch", "Focus Punch", "Hammer Arm", "Ice Hammer", "Ice Punch", "Mach Punch", "Mega Punch", "Meteor Mash", "Power-Up Punch", "Shadow Punch", "Sky Uppercut", "Thunder Punch"],
				justified: ["Assurance", "Beat Up", "Bite", "Brutal Swing", "Crunch", "Dark Pulse", "Darkest Lariat", "Feint Attack", "Fling", "Foul Play", "Hyperspace Fury", "Knock Off", "Night Daze", "Night Slash", "Payback", "Power Trip", "Punishment", "Pursuit", "Snarl", "Sucker Punch", "Thief", "Throat Chop"],
				keeneye: ["Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				levitate: ["Bone Club", "Bone Rush", "Bonemerang", "Bulldoze", "Dig", "Drill Run", "Earth Power", "Earthquake", "High Horsepower", "Land's Wrath", "Magnitude", "Mud Slap", "Mud Bomb", "Mud Shot", "Precipice Blades", "Sand Attack", "Stomping Tantrum", "Thousand Arrows", "Thousand Waves", "Gravity", "Smack Down", "Spikes", "Toxic Spikes", "Sticky Web"],
				lightmetal: ["Autotomize", "Grass Knot", "Heat Crash", "Heavy Slam", "Low Kick", "Sky Drop"],
				lightningrod: ["Bolt Strike", "Charge Beam", "Discharge", "Eerie Impulse", "Electrify", "Electro Ball", "Electroweb", "Fusion Bolt", "Ion Deluge", "Nuzzle", "Parabolic Charge", "Shock Wave", "Spark", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Volt Switch", "Volt Tackle", "Wild Charge", "Zap Cannon", "Zing Zap"],
				limber: ["Body Slam", "Bolt Strike", "Bounce", "Discharge", "Dragon Breath", "Fling", "Force Palm", "Freeze Shock", "Glare", "Lick", "Nuzzle", "Spark", "Stun Spore", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Tri Attack", "Volt Tackle", "Zap Cannon"],
				liquidooze: ["Absorb", "Drain Punch", "Draining Kiss", "Dream Eater", "Giga Drain", "Horn Leech", "Leech Life", "Leech Seed", "Mega Drain", "Oblivion Wing", "Parabolic Charge"],
				liquidvoice: ["Boomburst", "Bug Buzz", "Chatter", "Clanging Scales", "Confide", "Disarming Voice", "Echoed Voice", "Grass Whistle", "Growl", "Heal Bell", "Hyper Voice", "Metal Sound", "Noble Roar", "Parting Shot", "Perish Song", "Relic Song", "Roar", "Round", "Screech", "Sing", "Snarl", "Snore", "Sparkling Aria", "Supersonic", "Uproar"],
				magmaarmor: ["Blizzard", "Freeze-Dry", "Ice Beam", "Ice Fang", "Ice Punch", "Powder Snow", "Tri Attack"],
				megalauncher: ["Aura Sphere", "Dark Pulse", "Dragon Pulse", "Heal Pulse", "Origin Pulse", "Water Pulse"],
				merciless: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				minus: ["Magnetic Flux", "Gear Up"],
				motordrive: ["Bolt Strike", "Charge Beam", "Discharge", "Eerie Impulse", "Electrify", "Electro Ball", "Electroweb", "Fusion Bolt", "Ion Deluge", "Nuzzle", "Parabolic Charge", "Shock Wave", "Spark", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Volt Switch", "Volt Tackle", "Wild Charge", "Zap Cannon", "Zing Zap"],
				naturalcure: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				oblivious: ["Taunt", "Attract"],
				overcoat: ["Cotton Spore", "Poison Powder", "Powder", "Rage Powder", "Sleep Powder", "Spore", "Stun Spore"],
				overgrow: ["Absorb", "Bullet Seed", "Energy Ball", "Frenzy Plant", "Giga Drain", "Grass Knot", "Grass Pledge", "Horn Leech", "Leaf Blade", "Leaf Storm", "Leaf Tornado", "Leafage", "Magical Leaf", "Mega Drain", "Needle Arm", "Petal Blizzard", "Petal Dance", "Power Whip", "Razor Leaf", "Seed Bomb", "Seed Flare", "Solar Beam", "Solar Blade", "Trop Kick", "Vine Whip", "Wood Hammer"],
				owntempo: ["Chatter", "Confuse Ray", "Confusion", "Dizzy Punch", "Dynamic Punch", "Flatter", "Hurricane", "Psybeam", "Rock Climb", "Signal Beam", "Supersonic", "Swagger", "Sweet Kiss", "Teeter Dance", "Water Pulse"],
				plus: ["Magnetic Flux", "Gear Up"],
				poisonheal: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				prismarmor: [],
				raindish: ["Rain Dance"],
				rattled: ["Attack Order", "Bug Bite", "Bug Buzz", "Fell Stinger", "First Impression", "Fury Cutter", "Infestation", "Leech Life", "Lunge", "Megahorn", "Pin Missile", "Pollen Puff", "Signal Beam", "Silver Wind", "Steamroller", "Struggle Bug", "Twineedle", "U-turn", "X-Scissor", "Assurance", "Beat Up", "Bite", "Brutal Swing", "Crunch", "Dark Pulse", "Darkest Lariat", "Feint Attack", "Fling", "Foul Play", "Hyperspace Fury", "Knock Off", "Night Daze", "Night Slash", "Payback", "Power Trip", "Punishment", "Pursuit", "Snarl", "Sucker Punch", "Thief", "Throat Chop", "Astonish", "Hex", "Lick", "Moongeist Beam", "Night Shade", "Ominous Wind", "Phantom Force", "Shadow Ball", "Shadow Bone", "Shadow Claw", "Shadow Force", "Shadow Punch", "Shadow Sneak", "Spirit Shackle"],
				reckless: ["Take Down", "Double-Edge", "Submission", "Volt Tackle", "Flare Blitz", "Brave Bird", "Wood Hammer", "Head Smash", "Wild Charge", "Head Charge", "High Jump Kick"],
				regenerator: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				rockhead: ["Take Down", "Double-Edge", "Submission", "Volt Tackle", "Flare Blitz", "Brave Bird", "Wood Hammer", "Head Smash", "Wild Charge", "Head Charge"],
				sandforce: ["Bone Club", "Bone Rush", "Bonemerang", "Bulldoze", "Dig", "Drill Run", "Earth Power", "Earthquake", "High Horsepower", "Land's Wrath", "Magnitude", "Mud Slap", "Mud Bomb", "Mud Shot", "Precipice Blades", "Sand Attack", "Stomping Tantrum", "Thousand Arrows", "Thousand Waves", "Accelerock", "Ancient Power", "Diamond Storm", "Head Smash", "Power Gem", "Rock Blast", "Rock Slide", "Rock Throw", "Rock Tomb", "Rock Wrecker", "Rollout", "Smack Down", "Stone Edge", "Anchor Shot", "Bullet Punch", "Doom Desire", "Flash Cannon", "Gear Grind", "Gyro Ball", "Heavy Slam", "Iron Head", "Iron Tail", "Magnet Bomb", "Metal Burst", "Metal Claw", "Meteor Mash", "Mirror Shot", "Smart Strike", "Steel Wing", "Sunsteel Strike"],
				sandrush: ["Sandstorm"],
				sandveil: ["Sandstorm"],
				sapsipper: ["Absorb", "Bullet Seed", "Energy Ball", "Frenzy Plant", "Giga Drain", "Grass Knot", "Grass Pledge", "Horn Leech", "Leaf Blade", "Leaf Storm", "Leaf Tornado", "Leafage", "Magical Leaf", "Mega Drain", "Needle Arm", "Petal Blizzard", "Petal Dance", "Power Whip", "Razor Leaf", "Seed Bomb", "Seed Flare", "Solar Beam", "Solar Blade", "Trop Kick", "Vine Whip", "Wood Hammer", "Cotton Spore", "Forest's Curse", "Grass Whistle", "Leech Seed", "Sleep Powder", "Spore", "Strength Sap", "Stun Spore", "Worry Seed"],
				scrappy: ["Barrage", "Bind", "Body Slam", "Boomburst", "Chip Away", "Comet Punch", "Constrict", "Covet", "Crush Claw", "Crush Grip", "Cut", "Dizzy Punch", "Double-Edge", "Double Hit", "Double Slap", "Echoed Voice", "Egg Bomb", "Endeavor", "Explosion", "Extreme Speed", "Facade", "Fake Out", "False Swipe", "Feint", "Flail", "Frustration", "Fury Attack", "Fury Swipes", "Giga Impact", "Guillotine", "Head Charge", "Headbutt", "Hidden Power", "Hold Back", "Horn Attack", "Horn Drill", "Hyper Beam", "Hyper Fang", "Hyper Voice", "Judgement", "Last Resort", "Mega Kick", "Mega Punch", "Multi-Attack", "Natural Power", "Pay Day", "Pound", "Quick Attack", "Rage", "Rapid Spin", "Razor Wind", "Relic Song", "Retaliate", "Return", "Revelation Dance", "Rock Climb", "Round", "Scratch", "Secret Power", "Self-Destruct", "Skull Bash", "Slam", "Slash", "Smelling Salts", "Snore", "Sonic Boom", "Spike Cannon", "Spit Up", "Stomp", "Strength", "Super Fang", "Swift", "Tackle", "Tail Slap", "Take Down", "Techno Blast", "Thrash", "Tri Attack", "Trump Card", "Uproar", "Vice Grip", "Weather Ball", "Wrap", "Wring Out", "Arm Thrust", "Aura Sphere", "Brick Break", "Circle Throw", "Close Combat", "Counter", "Cross Chop", "Double Kick", "Drain Punch", "Dynamic Punch", "Final Gambit", "Flying Press", "Focus Blast", "Focus Punch", "Force Palm", "Hammer Arm", "High Jump Kick", "Jump Kick", "Karate Chop", "Low Kick", "Low Sweep", "Mach Punch", "Power-Up Punch", "Revenge", "Reversal", "Rock Smash", "Rolling Kick", "Sacred Sword", "Secret Sword", "Seismic Toss", "Sky Uppercut", "Storm Throw", "Submission", "Superpower", "Triple Kick", "Vacuum Wave", "Vital Throw", "Wake-Up Slap"],
				sheerforce: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge"],
				shellarmor: ["Frost Breath", "Storm Throw"],
				shielddust: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge"],
				simple: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge", "Bulk Up", "Coil", "Curse", "Dragon Dance", "Growth", "Hone Claws", "Howl", "Meditate", "Sharpen", "Shift Gear", "Work Up", "Acupressure", "Shell Smash", "Swagger", "Swords Dance", "Belly Drum", "Baby-Doll Eyes", "Growl", "Noble Roar", "Parting Shot", "Play Nice", "Strength Sap", "Tearful Look", "Tickle", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Cosmic Power", "Defend Order", "Defense Curl", "Flower Shield", "Harden", "Magnetic Flux", "Stockpile", "Withdraw", "Acid Armor", "Barrier", "Iron Defense", "Cotton Guard", "Leer", "Tail Whip", "Screech", "Calm Mind", "Flatter", "Rototiller", "Quiver Dance", "Geomancy", "Nasty Plot", "Tail Glow", "Confide", "Captivate", "Eerie Impulse", "Charge", "Amnesia", "Fake Tears", "Metal Sound", "Double Team", "Minimize", "Defog", "Sweet Scent", "Kinesis", "Sand Attack", "Smokescreen", "Dragon Dance", "Rock Polish", "Sticky Web", "Toxic Thread", "Cotton Spore", "Scary Face", "String Shot"],
				skilllink: ["Arm Thrust", "Barrage", "Bone Rush", "Bullet Seed", "Comet Punch", "Double Slap", "Fury Attack", "Fury Swipes", "Icicle Spear", "Pin Missile", "Rock Blast", "Spike Cannon", "Tail Slap", "Water Shuriken", "Bonemerang", "Double Hit", "Double Kick", "Dual Chop", "Gear Grind", "Twineedle", "Triple Kick"],
				slushrush: ["Hail"],
				sniper: ["Frost Breath", "Storm Throw"],
				snowcloak: ["Hail"],
				solarpower: ["Sunny Day"],
				solidrock: [],
				soulheart: ["Self-Destruct", "Explosion", "Healing Wish", "Lunar Dance", "Memento"],
				soundproof: ["Boomburst", "Bug Buzz", "Chatter", "Clanging Scales", "Confide", "Disarming Voice", "Echoed Voice", "Grass Whistle", "Growl", "Heal Bell", "Hyper Voice", "Metal Sound", "Noble Roar", "Parting Shot", "Perish Song", "Relic Song", "Roar", "Round", "Screech", "Sing", "Snarl", "Snore", "Sparkling Aria", "Supersonic", "Uproar"],
				stakeout: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				steadfast: ["Air Slash", "Astonish", "Bite", "Bone Club", "Dark Pulse", "Dragon Rush", "Extrasensory", "Fake Out", "Fire Fang", "Fling", "Headbutt", "Heart Stamp", "Hyper Fang", "Ice Fang", "Icicle Crash", "Iron Head", "Needle Arm", "Rock Slide", "Rolling Kick", "Sky Attack", "Snore", "Steamroller", "Stomp", "Thunder Fang", "Twister", "Waterfall", "Zen Headbutt", "Zing Zap"],
				steelworker: ["Anchor Shot", "Bullet Punch", "Doom Desire", "Flash Cannon", "Gear Grind", "Gyro Ball", "Heavy Slam", "Iron Head", "Iron Tail", "Magnet Bomb", "Metal Burst", "Metal Claw", "Meteor Mash", "Mirror Shot", "Smart Strike", "Steel Wing", "Sunsteel Strike"],
				stickyhold: ["Covet", "Thief", "Bug Bite", "Pluck", "Incinerate", "Knock Off", "Trick", "Switcheroo"],
				stormdrain: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				strongjaw: ["Bite", "Crunch", "Fire Fang", "Hyper Fang", "Ice Fang", "Poison Fang", "Psychic Fangs", "Thunder Fang"],
				suctioncups: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				surgesurfer: ["Electric Terrain"],
				swarm: ["Attack Order", "Bug Bite", "Bug Buzz", "Fell Stinger", "First Impression", "Fury Cutter", "Infestation", "Leech Life", "Lunge", "Megahorn", "Pin Missile", "Pollen Puff", "Signal Beam", "Silver Wind", "Steamroller", "Struggle Bug", "Twineedle", "U-turn", "X-Scissor"],
				sweetveil: ["Dark Void", "Grass Whistle", "Hypnosis", "Lovely Kiss", "Relic Song", "Rest", "Sing", "Sleep Powder", "Spore", "Yawn"],
				swiftswim: ["Rain Dance"],
				tangledfeet: ["Chatter", "Confuse Ray", "Confusion", "Dizzy Punch", "Dynamic Punch", "Flatter", "Hurricane", "Psybeam", "Rock Climb", "Signal Beam", "Supersonic", "Swagger", "Sweet Kiss", "Teeter Dance", "Water Pulse"],
				technician: [],
				thickfat: ["Aurora Beam", "Avalanche", "Blizzard", "Freeze-Dry", "Freeze Shock", "Frost Breath", "Glaciate", "Ice Ball", "Ice Beam", "Ice Burn", "Ice Fang", "Ice Hammer", "Ice Punch", "Ice Shard", "Icicle Crash", "Icicle Spear", "Icy Wind", "Powder Snow", "Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				tintedlens: [],
				torrent: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				toxicboost: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				triage: ["Aqua Ring", "Floral Healing", "Grassy Terrain", "Heal Pulse", "Healing Wish", "Ingrain", "Leech Seed", "Pain Split", "Present", "Purify", "Strength Sap", "Wish", "Heal Order", "Milk Drink", "Moonlight", "Morning Sun", "Recover", "Rest", "Roost", "Shore Up", "Slack Off", "Soft-Boiled", "Synthesis", "Absorb", "Drain Punch", "Draining Kiss", "Dream Eater", "Giga Drain", "Horn Leech", "Leech Life", "Leech Seed", "Mega Drain", "Oblivion Wing", "Parabolic Charge"],
				unaware: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge", "Bulk Up", "Coil", "Curse", "Dragon Dance", "Growth", "Hone Claws", "Howl", "Meditate", "Sharpen", "Shift Gear", "Work Up", "Acupressure", "Shell Smash", "Swagger", "Swords Dance", "Belly Drum", "Baby-Doll Eyes", "Growl", "Noble Roar", "Parting Shot", "Play Nice", "Strength Sap", "Tearful Look", "Tickle", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Cosmic Power", "Defend Order", "Defense Curl", "Flower Shield", "Harden", "Magnetic Flux", "Stockpile", "Withdraw", "Acid Armor", "Barrier", "Iron Defense", "Cotton Guard", "Leer", "Tail Whip", "Screech", "Calm Mind", "Flatter", "Rototiller", "Quiver Dance", "Geomancy", "Nasty Plot", "Tail Glow", "Confide", "Captivate", "Eerie Impulse", "Charge", "Amnesia", "Fake Tears", "Metal Sound", "Double Team", "Minimize", "Defog", "Sweet Scent", "Kinesis", "Sand Attack", "Smokescreen"],
				unburden: ["Fling", "Covet", "Thief", "Bug Bite", "Pluck", "Incinerate", "Knock Off", "Trick", "Switcheroo"],
				vitalspirit: ["Dark Void", "Grass Whistle", "Hypnosis", "Lovely Kiss", "Relic Song", "Rest", "Sing", "Sleep Powder", "Spore", "Yawn"],
				voltabsorb: ["Bolt Strike", "Charge Beam", "Discharge", "Eerie Impulse", "Electrify", "Electro Ball", "Electroweb", "Fusion Bolt", "Ion Deluge", "Nuzzle", "Parabolic Charge", "Shock Wave", "Spark", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Volt Switch", "Volt Tackle", "Wild Charge", "Zap Cannon", "Zing Zap"],
				waterabsorb: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				waterbubble: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool", "Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create", "Beak Blast", "Ice Burn", "Tri Attack", "Will-O-Wisp", "Fling"],
				watercompaction: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				waterveil: ["Beak Blast", "Blaze Kick", "Blue Flare", "Ember", "Fire Blast", "Fire Fang", "Fire Punch", "Flamethrower", "Flame Wheel", "Flare Blitz", "Fling", "Heat Wave", "Ice Burn", "Inferno", "Lava Plume", "Sacred Fire", "Scald", "Searing Shot", "Steam Eruption", "Tri Attack", "Will-O-Wisp"],
				whitesmoke: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
			};
			let allMoves = this.tools.data.Movedex;
			for (let i in allMoves) {
				let move = allMoves[i];
				if (template.types.includes(move.type)) {
					movemasters.adaptability.push(move.id);
				}
				if (this.tools.getImmunity(move, template) && this.tools.getEffectiveness(move, template) > 0) {
					movemasters.anticipation.push(move.id);
					movemasters.solidrock.push(move.id);
					movemasters.filter.push(move.id);
					movemasters.prismarmor.push(move.id);
				}
				if (this.tools.getEffectiveness(move, template) < 1) {
					movemasters.tintedlens.push(move.id);
				}
				if (move.basePower <= 60) {
					movemasters.technician.push(move.id);
				}
				if (move.accuracy < 100) {
					movemasters.compoundeyes.push(move.id);
				}
			}
			if (movemasters[ability.id]) {
				let moves = movemasters[ability.id];
				for (let j = 0; j < moves.length; j++) {
					if (template.learnset[toId(moves[j])]) continue;
					template.learnset[toId(moves[j])] = ["7T"];
				}
				return this.validateSet(set, teamHas, template);
			}
		}
	},
	{
		name: "[Gen 7] Pokemon: The New First Generation",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/pokemon-the-new-first-gen-submissions-for-new-pokemon-over.3578653/>Pokemon: The New First Generation</a>",
		       "&bullet; <a href=https://docs.google.com/spreadsheets/d/1RT8-Ntryi_SvlD_AwBCPWTso7bFZNpAGX4F7wuHBPQY/edit>Pokemon: The New First Gen Spreadhseet</a>",
		       "&bullet; Use /dgen <Pokemon/Item/Ability/Move> for more info",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'thefirstnewgen',
	},
	{
		name: "Universal Ubers",
		mod: 'primordialpokemon',

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: []
	},
	{
		name: "[Gen 7] Z-Moves Everywhere",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/z-moves-everywhere-slate-4-ninetales-torkoal-groudon-submissions-phase-extended.3592186/>Z-Moves Everywhere</a>"],
		ruleset: ['[Gen 7] Ubers'],
		mod: 'zmoveseverywhere',
	},
	// Old Other Metagames ///////////////////////////////////////////////////////////////////
	{
		section: "Old Other Metagames",
		column: 4,
	},
	{
		name: "Anti-Vaxxers",
		desc: ["All type-based immunities cease to apply."],
		mod: "antivaxxers",
		ruleset: ['OU'],
	},
	{
		name: "Follow The Leader",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3565685/\">Follow The Leader</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Regigigas', 'Shedinja', 'Slaking', 'Smeargle', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew',
			'Arena Trap', 'Gale Wings', 'Huge Power', 'Imposter', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
		validateSet: function(set, teamHas) {
			let species = toId(set.species);
			let template = this.tools.getTemplate(species);
			if (!template.exists || template.isNonstandard) return ["" + set.species + " is not a real Pok\u00E9mon."];
			if (template.battleOnly) template = this.tools.getTemplate(template.baseSpecies);
			if (this.tools.getBanlistTable(this.format)[template.id] || template.tier in {
					'Uber': 1,
					'Unreleased': 1
				} && template.species !== 'Aegislash') {
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

		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Uber > 1', 'AG ++ Uber', 'Blissey', 'Chansey', 'Eviolite', 'Mawilite', 'Medichamite', 'Sablenite', 'Soul Dew', 'Huge Power', 'Pure Power', 'Shadow Tag'],
		onBegin: function() {
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
		name: "Haxmons",

		ruleset: ['OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
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
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547279/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558034/\">STABmons Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['Ignore STAB Moves', 'Diggersby', 'Kyurem-Black', 'Porygon-Z', 'Thundurus', 'Aerodactylite', 'Altarianite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},

	{
		name: "Megamons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a>"],

		ruleset: ['Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Mega Rayquaza Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Gengar-Mega', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'],
		onValidateTeam: function(team) {
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
		onChangeSet: function(set, format) {
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
		onSwitchIn: function(pokemon) {
			let item = pokemon.getItem();
			if (item.megaEvolves && pokemon.template.species === item.megaEvolves) {
				pokemon.canMegaEvo = item.megaStone;
			}
		},
	},
	{
		name: "Metagamiate",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3502303/\">Metagamiate</a>"],

		ruleset: ['OU'],
		banlist: ['Dragonite', 'Kyurem-Black'],
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower' && !pokemon.hasAbility(['aerilate', 'pixilate', 'refrigerate'])) {
				let types = pokemon.getTypes();
				let type = types.length < 2 || !pokemon.set.shiny ? types[0] : types[1];
				move.type = type;
				move.isMetagamiate = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (!move.isMetagamiate) return;
			return this.chainModify([0x14CD, 0x1000]);
		},
	},
	{
		name: "Nature Swap",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3577739/\">Nature Swap</a>"],

		ruleset: ['OU'],
		banlist: ['Chansey', 'Cloyster'],
		onBegin: function() {
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
		name: "Meta Man",
		desc: [
			"When a Pokemon faints, the opposing Pokemon replaces its current ability with the fainted Pokemon's and gains its last-used move in a new slot (for up to 9 total moves). These changes last the entire match. If a Pokemon faints before using a move during the match, no move is gained by the opponent.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/meta-man.3565966/\">Meta Man</a>",
		],
		mod: "metaman",
		ruleset: ['OU'],
		onFaint: function(pokemon)
		{
			this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + this.data.Abilities[pokemon.ability].name + "!");
			pokemon.side.foe.pokemon[0].setAbility(pokemon.ability);
			pokemon.side.foe.pokemon[0].baseAbility = pokemon.ability;
			let lastMove = pokemon.lastM;
			let has
			if (pokemon.side.foe.pokemon[0].moveset.length <= 9 && lastMove && !pokemon.side.foe.pokemon[0].hasMove(lastMove.id))
			{
				pokemon.side.foe.pokemon[0].moveset.push(lastMove);
				pokemon.side.foe.pokemon[0].baseMoveset.push(lastMove);
				this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + pokemon.lastM.move + "!");
			}
		},
	},
	{
		name: "Top Percentage",
		mod: 'toppercentage',
		desc: ["&lt; <a href=\"http://www.smogon.com/forums/threads/top-percentage.3564459/\">Top Percentage</a>"],
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
			this.add('-message', target.side.name + " has " + Math.round(target.side.metaCount) + "% left!");
			if (target.side.metaCount <= 0.1) {
				//note: making this 0.1 because I got 1.10 times 10^-15 once
				//something silly with rounding
				//this works well enough
				this.add('-message', target.side.foe.name + " has dealt 400% damage!");
				this.win(target.side.foe);
			}
		}

	},
	{
		name: "Baton Pass Marathon",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/baton-pass-marathon-coded-looking-for-a-server.3517800\">Baton Pass Marathon</a>", ],
		mod: 'batonpassmarathon',

		ruleset: ['OU'],
		banlist: ['Perish Song', 'Sand Attack', 'Flash', 'Kinesis', 'Mud-Slap', 'Smokescreen', 'Acupressure'],
		onFaint: function(pokemon) {
			pokemon.clearVolatile();
		}
	},
	{

		name: "Camomons",
		desc: [
			"Pok&eacute;mon change type to match their first two moves.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		],

		ruleset: ['OU'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let types = [this.getMove(pokemon.moves[0]).type];
				if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
				pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				pokemon.types = pokemon.template.types = types;
			}
		},
		onAfterMega: function(pokemon) {
			let types = [this.getMove(pokemon.moves[0]).type];
			if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
			pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
			pokemon.types = pokemon.template.types = types;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onSwitchIn: function(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},

	{
		name: "Imprisoned",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/imprisoned.3580920/\">Imprisoned</a>"],
		onBegin: function()
		{
			this.p1.impris = [];
			this.p2.impris = [];
			this.isImpris = function(side, move)
			{
				let b = false;
				for (let i = 0; i < this[side].impris.length; i++)
					if (this[side].impris[i] == move)
						b = true;
				return b;
			}
		},
		onDisableMove: function(pokemon)
		{
			let side = pokemon.side.id;
			for (let j = 0; j < pokemon.moves.length; j++)
			{
				let curmove = pokemon.moves[j];
				if (this.isImpris(side, curmove))
					pokemon.disableMove(curmove);
			}
		},
		onTryMove: function(source, target, move)
		{
			let side = target.side.id,
				opside = source.side.id;
			if (!this.isImpris(side, move.id))
				this[side].impris.push(move.id);
			for (let i = 0; i < this[opside].pokemon.length; i++)
			{
				for (let j = 0; j < this[opside].pokemon[i].moves.length; j++)
				{
					let curmove = this[opside].pokemon[i].moves[j];
					if (this.isImpris(opside, curmove))
						this[opside].pokemon[i].disableMove(curmove);
				}
			}
		},
	},
	{
		name: "The All-Stars Metagame",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-all-stars-metagame-v2-enter-the-pu-a-pokemon-from-each-tier.3510864//\">The All-Stars Metagame</a>"],
		banlist: [],

		onValidateTeam: function(team) {
			let ouMons = 0,
				uuMons = 0,
				ruMons = 0,
				nuMons = 0,
				puMons = 0,
				problems = [],
				check = true,
				template;
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (item.megaStone) template = this.getTemplate(team[i].item.megaStone);
				else template = this.getTemplate(team[i].species);
				let ability = this.getAbility(template.ability);
				let tier = template.tier;
				for (var j in team[i].moves) {
					var move = this.getMove(team[i].moves[j]);
					if (move.id == "chatter") tier = "NU";
				}
				//Bans Drought + Drizzle users to OU
				if (ability.id == "drizzle" || ability.id == "drought") tier = "OU";
				//Bans Chatter to NU
				if (tier == "OU" || tier == "BL") ouMons++;
				if (tier == "UU" || tier == "BL2") uuMons++;
				if (tier == "RU" || tier == "BL3") ruMons++;
				if (tier == "NU" || tier == "BL4") nuMons++;
				if (tier == "PU") puMons++;
			}
			while (check) {
				if (1 < ouMons) problems.push("You are able to only bring a maximum of 1 OU / BL Pokemon.");
				if (2 < uuMons) problems.push("You are able to only bring a maximum of 2 UU / BL2 Pokemon.");
				if (1 < ruMons) problems.push("You are able to only bring a maximum of 1 RU / BL3 Pokemon.");
				if (1 < nuMons) problems.push("You are able to only bring a maximum of 1 NU / BL4 Pokemon.");
				if (1 < puMons) problems.push("You are able to only bring a maximum of 1 PU Pokemon.");
				else check = false;
			}
			return problems;
		},
	},
	{
		name: "Mirror Move",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/mirror-move.3572990/\">Mirror Move</a>"],
		ruleset: ['OU'],
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
		ruleset: ['OU'],
		desc: ["All pokes have a special \"Intimidate\" on top on their ability, which means it still have their original Ability. This Intimidate lowers opposing stats by 1 stage based on negative (may be changed to positive if it's better) side of the Nature. For example, if you send out a Timid natured pokemon, your opponent's Attack is lowered.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/natures-fear.3584688/\">Nature's Fear</a>"
		],
		onSwitchIn: function(pokemon) {
			let foeactive = pokemon.side.foe.active,
				nature = {};
			if (!this.getNature(pokemon.set.nature).minus) return;
			nature[this.getNature(pokemon.set.nature).minus] = -1;
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
		onAfterMega: function(pokemon) {
			let foeactive = pokemon.side.foe.active,
				nature = {};
			if (!this.getNature(pokemon.set.nature).minus) return;
			nature[this.getNature(pokemon.set.nature).minus] = -1;
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
		name: "Open House",
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

		ruleset: ['OU', 'Freeze Clause'],
		banlist: [],
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
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
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/palette-pals-formerly-tradeoff.3578405/\">Palette Pals</a>"],
		ruleset: ['OU'],
		banlist: ['Huge Power', 'Pure Power', 'Medichamite', 'Kyurem-Black', 'Slaking', 'Regigigas', 'Light Ball', 'Eviolite', 'Deep Sea Tooth', 'Deep Sea Scale', 'Thick Club'],
		onBegin: function() {
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
		name: "Recyclables",
		desc: ["&bullet;<a href=\"http://www.smogon.com/forums/threads/recyclables.3581818/\">Recyclables</a>: <br />If the item on a Pokemon was not knocked off, it will be recycled at the end of every turn."],
		ruleset: ['OU'],
		onResidualOrder: 999, //This will always occur as the last possible occurence of the turn's residual phase.
		onResidual: function() {
			if ((this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem) && !(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
			{
				this.p2.pokemon[0].setItem(this.p2.pokemon[0].lastItem);
				this.add('-item', this.p2.pokemon[0], this.p2.pokemon[0].getItem(), '[from] move: Recycle');
				//return false;
			}
			else if (!(this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem) && (this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
			{
				this.p1.pokemon[0].setItem(this.p1.pokemon[0].lastItem);
				this.add('-item', this.p1.pokemon[0], this.p1.pokemon[0].getItem(), '[from] move: Recycle');
				//return false;
			}
			else if (!(this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem) && !(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
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
		mod: 'thenegativemetagame',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Swagger Clause', 'Team Preview', 'Evasion Moves Clause'],
		banlist: ['DeepSeaTooth', 'DeepSeaScale', 'Eviolite', 'Huge Power', 'Light Ball', 'Pure Power', 'Smeargle', 'Thick Club', 'Illegal', 'Unreleased']
	},
	{
		name: "Therianmons",
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
							if (pokemon.set.ivs.spa == 30 && pokemon.set.ivs.spd == 30 && pokemon.set.ivs.atk == 30 && pokemon.set.ivs.def == 30 && pokemon.set.ivs.hp == 30)
							{
								template.baseStats.atk -= 15;
								template.baseStats.def += 10;
								template.baseStats.spa -= 15;
								template.baseStats.spd += 10;
								template.baseStats.spe += 10;
							}
							else if (pokemon.set.ivs.spa == 30 && pokemon.set.ivs.spd == 30)
							{
								template.baseStats.atk += 20;
								template.baseStats.spa -= 10;
								template.baseStats.spe -= 10;
							}
							else if (pokemon.set.ivs.spa == 30)
							{
								template.baseStats.spa += 20;
								template.baseStats.atk -= 10;
								template.baseStats.spe -= 10;
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
		name: "The Great Pledge",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-great-pledge.3581858/\">The Great Pledge</a>"],
		onBegin: function()
		{
			this.p1.pledge = {
				terrain: "",
				duration: 0
			}
			this.p2.pledge = {
				terrain: "",
				duration: 0
			}
		},
		onResidual: function()
		{
			if (this.p2.pledge.duration > 4 && this.p2.pledge.terrain != "")
			{
				this.add('-sideend', this.p2, this.p2.pledge.terrain);
				this.p2.pledge.duration = 0;
				this.p2.pledge.terrain = "";
			}
			else if (this.p2.pledge.terrain != "")
				this.p2.pledge.duration++;
			if (this.p1.pledge.duration > 4 && this.p1.pledge.terrain != "")
			{
				this.add('-sideend', this.p1, this.p1.pledge.terrain);
				this.p1.pledge.duration = 0;
				this.p1.pledge.terrain = "";
			}
			else if (this.p1.pledge.terrain != "")
				this.p1.pledge.duration++;
			if (this.p1.terrain == "Fire Pledge")
			{
				if (this.p1.pokemon[0] && !this.p1.pokemon[0].hasType('Fire')) {
					this.damage(this.p1.pokemon[0].maxhp / 8, this.p1.pokemon[0]);
				}
			}
			if (this.p2.terrain == "Fire Pledge")
			{
				if (this.p2.pokemon[0] && !this.p2.pokemon[0].hasType('Fire')) {
					this.damage(this.p2.pokemon[0].maxhp / 8, this.p2.pokemon[0]);
				}
			}
		},
		onModifySpe: function(spe, pokemon)
		{
			if (this[pokemon.side.id].pledge.terrain == "Grass Pledge")
				return this.chainModify(0.25);
		},
		onModifyMove: function(move, source)
		{
			if (this[source.side.id].pledge.terrain == "Water Pledge")
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
				if (pokemon.types[0] == 'Water') return 'water';
				if (pokemon.types[0] == 'Grass') return 'grass';
				if (pokemon.types[0] == 'Fire') return 'fire';
				if (pokemon.types[1] == 'Water') return 'water';
				if (pokemon.types[1] == 'Grass') return 'grass';
				if (pokemon.types[1] == 'Fire') return 'fire';
			}
			if (pledgetype() == 'fire')
			{
				if (pokemon.baseHpType == "Grass")
				{
					this.add('-sidestart', this[tSide], 'Fire Pledge');
					pokemon.side.foe.pledge.terrain = "Fire Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
				if (pokemon.baseHpType == "Water")
				{
					this.add('-sidestart', this[tSide], 'Water Pledge');
					pokemon.side.foe.pledge.terrain = "Water Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
			}
			if (pledgetype() == 'grass')
			{
				if (pokemon.baseHpType == "Fire")
				{
					this.add('-sidestart', this[tSide], 'Fire Pledge');
					pokemon.side.foe.pledge.terrain = "Fire Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
				if (pokemon.baseHpType == "Water")
				{
					this.add('-sidestart', this[tSide], 'Grass Pledge');
					pokemon.side.foe.pledge.terrain = "Grass Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
			}
			if (pledgetype() == 'water')
			{
				if (pokemon.baseHpType == "Grass")
				{
					this.add('-sidestart', this[tSide], 'Grass Pledge');
					pokemon.side.foe.pledge.terrain = "Grass Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
				if (pokemon.baseHpType == "Fire")
				{
					this.add('-sidestart', this[tSide], 'Water Pledge');
					pokemon.side.foe.pledge.terrain = "Water Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
			}
		},
	},
	{
		name: "Type Omelette",


		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		desc: [" &bullet; <a href=http://www.smogon.com/forums/threads/type-omelette-coded-looking-for-server.3540328/>Type Omelette</a>"],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Landorus', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite'],
		mod: 'mileseggsworth', //This is a pun, and was the most popular in name submissions.
		//Since this metagame uses custom types, let's make the types known to the players.
		onSwitchIn: function(pokemon) {
			var typeStr = pokemon.types[0];
			if (pokemon.types[1]) typeStr += '/' + pokemon.types[1]
			this.add('-start', pokemon, 'typechange', typeStr);
		}
	},
	{
		name: "VoltTurn Mayhem",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/voltturn-mayhem-lcotm.3527847/\">VoltTurn Mayhem</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onModifyMove: function(move) {
			if (move.target && !move.nonGhostTarget && (move.target === "normal" || move.target === "any" || move.target === "randomNormal" || move.target === "allAdjacent" || move.target === "allAdjacentFoes")) {
				move.selfSwitch = true;
			}
		}
	},
	{
		name: "Move Equality",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/move-equality-playable-whirlpool-fire-spin-infestation-sand-tomb-are-now-banned-see-post-193.3539145/\">Move Equality</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Metagrossite', 'Landorus', 'Mud Slap', 'Keldeo'],
		onModifyMove: function(move, pokemon) {
			//Account for all moves affected by minimize, terrains/weathers, or two-turn moves (besides earthquake and dragon rush as they're already 100 BP)
			var forbid = ['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'phantomforce', 'shadowforce'];
			if (!move.priority && !move.basePowerCallback && !move.onBasePower && move.basePower && move.category !== 'Status' && forbid.indexOf(move.id) === -1) move.basePower = 100;
			if (!move.priority && move.multihit) {
				if (typeof(move.multihit) === 'number') {
					move.basePower = 100 / move.multihit;
				} else {
					move.basePower = 100 / move.multihit[1];
				}
			}
			if (move.type === 'Flying' && move.category !== 'Status') move.basePower = 100;
		}
	},
	{
		name: "Move Equality 1v1",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/move-equality-playable-whirlpool-fire-spin-infestation-sand-tomb-are-now-banned-see-post-193.3539145/\">Move Equality</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Metagrossite', 'Landorus', 'Mud Slap', 'Keldeo'],
		onModifyMove: function(move, pokemon) {
			//Account for all moves affected by minimize, terrains/weathers, or two-turn moves (besides earthquake and dragon rush as they're already 100 BP)
			var forbid = ['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'phantomforce', 'shadowforce'];
			if (!move.priority && !move.basePowerCallback && !move.onBasePower && move.basePower && move.category !== 'Status' && forbid.indexOf(move.id) === -1) move.basePower = 100;
			if (!move.priority && move.multihit) {
				if (typeof(move.multihit) === 'number') {
					move.basePower = 100 / move.multihit;
				} else {
					move.basePower = 100 / move.multihit[1];
				}
			}
			if (move.type === 'Flying' && move.category !== 'Status') move.basePower = 100;
		},
		validateTeam: function(team, format) {
			if (team.length > 3) return ['You may only bring up to three Pokémon.'];
		},
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Mega Mania",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/mega-mania-playable-on-aqua.3525444/\">Mega Mania</a>"],
		mod: "megamania",
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Mega Mania'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Regigigas', 'Slaking', 'Ignore Illegal Abilities']
	},
	{
		name: "Technician Tower",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/technician-tower-2-0-now-playable-on-the-aqua-server.3521635/\">Technician Tower</a>"],
		mod: 'technichiantower',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Technician', 'Skill Link'],
		validateSet: function(set) {
			for (var i in set.moves) {
				var move = this.getMove(string(set.moves[i]));
				if (move.basePower && move.basePower >= 90) return ['The move ' + move.name + ' is banned because it has >90 Base Power.'];
				if (move.id === 'frustration' && set.happiness < 105) return ['The move Frustration is banned because Pokemon ' + (set.name || set.species) + ' has less than 105 happiness'];
				if (move.id === 'return' && set.happiness > 150) return ['The move Return is banned because Pokemon ' + (set.name || set.species) + 'has more than 150 happiness'];
				if (move.basePowerCallback && !(move.id in {
						'frustration': 1,
						'return': 1
					})) return ['The move ' + move.name + ' is banned because it has a variable BP'];
				if (move.basePower && move.basePower > 63 && set.ability in {
						'Pixilate': 1,
						'Aerilate': 1,
						'Refrigerate': 1
					}) return ['The move ' + move.name + ' is banned for Pokemon with an -ate ability.']
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
	},
	{
		name: "Hawluchange",
		ruleset: ['OU'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		desc: [" &bullet; <a href=http://www.smogon.com/forums/threads/hawluchange-now-playable.3529847/>"],
		mod: "hawluchange",
		onModifyMove: function(move, pokemon) {
			if (move.id === 'flyingpress') {
				move.type = pokemon.types[0];
				if (pokemon.types[1]) {
					move.onEffectiveness = function(typeMod, type, move) {
						return typeMod + this.getEffectiveness(pokemon.types[1], type);
					}
				} else {
					move.onEffectiveness = function(typeMod, type, move) {
						return typeMod;
					}
				}
			}
		}
	},
	{
		name: "Type Exchange",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/type-exchange.3556479/\">Type Exchange Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/type-exchange.3556479/page-2#post-6547201/\">Gothitelle & Gothorita Quick Ban</a>"
		],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', /*'Shadow Tag',*/ 'Gothitelle', 'Gothorita'],
		onBegin: function() {
			[this.p1.pokemon, this.p2.pokemon].forEach(function(pokemons) {
				let last_pokemon = {
					types: pokemons[pokemons.length - 1].types,
					typesData: pokemons[pokemons.length - 1].typesData,
				};
				for (let i = pokemons.length - 1; i > 0; i--) {
					pokemons[i].types = pokemons[i - 1].types;
					pokemons[i].typesData = pokemons[i - 1].typesData;
				}
				pokemons[0].types = last_pokemon.types;
				pokemons[0].typesData = last_pokemon.typesData;
			})
		},
	},
	{
		name: "Immunimons",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/immunimons.3516996/\">Immunimons</a>"],

		ruleset: ['OU'],
		banlist: [],
		onTryHit: function(target, source, move) {
			if (target === source || move.type === '???' || move.id === 'struggle') return;
			if (target.hasType(move.type)) {
				this.add('-debug', 'immunimons immunity [' + move.id + ']');
				return null;
			}
		},
		onDamage: function(damage, target, source, effect) {
			if ((source.hasType('Rock') && effect.id === 'stealthrock') || (source.hasType('Ground') && effect.id === 'spikes')) {
				this.add('-debug', 'immunimons immunity [' + effect.id + ']');
				return false;
			}
		},
	},
	{
		name: "Acid Rain",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/acid-rain.3518506/\">Acid Rain</a>"],

		mod: 'acidrain',
		onBegin: function() {
			this.setWeather('raindance');
			delete this.weatherData.duration;
			this.add('-message', "Eh, close enough.");
		},
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Weather Ball', 'Castform']
	},
	{
		name: "Partners in Crime",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/partners-in-crime.3559988/\">Partners in Crime</a>"],
		ruleset: ['Doubles OU'],
		mod: "pic",
		gameType: "doubles",
		banlist: ["Huge Power", "Kangaskhanite", "Mawilite", "Medichamite", "Pure Power", "Wonder Guard"],
		onBegin: function()
		{
			for (let i = 1; i <= 2; i++)
			{
				for (let j = 0; j < this["p" + i].pokemon.length; j++)
				{
					this["p" + i].pokemon[j].om = this["p" + i].pokemon[j].moveset;
					this["p" + i].pokemon[j].obm = this["p" + i].pokemon[j].baseMoveset;
				}
			}
		},
		onSwitchIn: function(pokemon)
		{
			let side = pokemon.side.id,
				partner = (pokemon.position == 0) ? 1 : 0;
			if (pokemon.isActive && this[side].pokemon[partner].isActive)
			{
				let partl = this[side].pokemon[partner].obm.length,
					pokl = pokemon.obm.length;
				this[side].pokemon[partner].moveset = this[side].pokemon[partner].om.concat(pokemon.om);
				this[side].pokemon[partner].baseMoveset = this[side].pokemon[partner].obm.concat(pokemon.obm);
				pokemon.moveset = pokemon.om.concat(this[side].pokemon[partner].om);
				pokemon.baseMoveset = pokemon.obm.concat(this[side].pokemon[partner].obm);
				for (let i = 0; i < this[side].pokemon[partner].moveset.length; i++)
				{
					if (!this[side].pokemon[partner].volatiles.choicelock)
					{
						this[side].pokemon[partner].moveset[i].disabled = false;
						this[side].pokemon[partner].moveset[i].disabledSource = '';
						this[side].pokemon[partner].baseMoveset[i].disabled = false;
						this[side].pokemon[partner].baseMoveset[i].disabledSource = '';
					}
				}
				for (let i = 0; i < pokemon.moveset.length; i++)
				{
					if (!pokemon.volatiles.choicelock)
					{
						pokemon.moveset[i].disabled = false;
						pokemon.moveset[i].disabledSource = '';
						pokemon.baseMoveset[i].disabled = false;
						pokemon.baseMoveset[i].disabledSource = '';
					}
				}
				if (Object.keys(this[side].pokemon[partner].volatiles).indexOf(toId(pokemon.ability)) < 0 && this[side].pokemon[partner].ability != pokemon.ability)
				{
					if (this[side].pokemon[partner].innate) this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate);
					this[side].pokemon[partner].innate = toId(pokemon.ability);
					this[side].pokemon[partner].addVolatile(this[side].pokemon[partner].innate);
				}
				if (Object.keys(pokemon.volatiles).indexOf(toId(this[side].pokemon[partner].ability)) < 0 && this[side].pokemon[partner].ability != pokemon.ability)
				{
					if (pokemon.innate) pokemon.removeVolatile(pokemon.innate);
					pokemon.innate = toId(this[side].pokemon[partner].ability);
					pokemon.addVolatile(pokemon.innate);
				}
			}
		},
		onAfterMega: function(pokemon)
		{
			let side = pokemon.side.id,
				partner = (pokemon.position == 0) ? 1 : 0;
			if (Object.keys(this[side].pokemon[partner].volatiles).indexOf(toId(pokemon.ability)) < 0 && this[side].pokemon[partner].ability != pokemon.ability)
			{
				if (this[side].pokemon[partner].innate) this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate);
				this[side].pokemon[partner].innate = toId(pokemon.ability);
				this[side].pokemon[partner].addVolatile(this[side].pokemon[partner].innate);
			}
		},
		onFaint: function(pokemon)
		{
			let side = pokemon.side.id,
				partner = (pokemon.position == 0) ? 1 : 0;
			if (this[side].pokemon[partner].isActive)
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
		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Smeargle', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Sableye + Prankster',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Light Ball', 'Soul Dew', 'Thick Club', 'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
	},
	{
		name: "No Status",
		desc: ["&bullet; All Status moves are banned <br> &bullet; <a href=\"http://www.smogon.com/forums/threads/no-status.3542555/\">No Status</a>"],
		ruleset: ['OU'],
		validateSet: function(set) {
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
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onPrepareHit: function(source, target, move) {
			var type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type);
			}
		}
	},
	{
		section: "Experimental Metas",
		column: 3,
	},
	{
		name: "[Gen 7] Z-Shift",
		desc: ["&bullet; In Z-Shift, the Type, Base Power and Priority of the move in the first slot is transferred to the Z-Move being used.<br><br>Necrozma @ <b>Electrium Z</b>  <br>Ability: Prism Armor  <br>EVs: 252 HP / 252 SpA / 4 SpD<br>Modest Nature  <br>IVs: 0 Atk  <br>- <b>Prismatic Laser</b> <br>- Dark Pulse  <br>- <b>Charge Beam</b>  <br>- Moonlight<br><br>So if this is the set then<br><b>Z-Charge Beam:</b> 160 Base Power, 90% Accuracy, Psychic type move with 70% chance to raise the user's SpA by 1 stage"],
		ruleset: ['[Gen 7] OU'],
		mod: 'zshift',
		onValidateSet: function(set) {
			let problems = [];
			set.moves.forEach(move => {
				let moveData = this.getMove(move);
				if (moveData.multihit) {
					problems.push((set.name || set.species) + " has " + moveData.name + ", which is a multihit move and is banned by Z-Shift.")
				}
			});
			return problems;
		},
		onPrepareHit: function(target, source, move) {
			if (!(move.isZ && move.baseMove)) return;
			this.attrLastMove('[still]');
			this.add('-anim', target, move.baseMove, source);
		},
	},
	{
		name: "Enchanted Items Hackmons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3570431/\">Enchanted Items</a>"],

		mod: 'enchanteditems',
		ruleset: ['HP Percentage Mod'],
		banlist: ['Ignore Illegal Abilities', 'Ignore Illegal Moves'],
		onFaint: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	{
		name: "Enchanted Items Plus",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/enchanted-items-enchanted-items-plus-announced.3570431/page-20#post-6939744\">Enchanted Items Plus</a>"],

		mod: 'enchanteditems',
		ruleset: ['Ubers'],
		banlist: ['Ignore Illegal Abilities', 'Shedinja', 'Imposter',
			'Bug Gem', 'Electric Gem', 'Fire Gem',
			'Ice Gem', 'Poison Gem', 'Poke Ball', 'Steel Gem', 'Dark Gem', 'Psychic Gem',
		],
		onValidateSet: function(set) {

			let bannedAbilities = {
				'Arena Trap': 1,
				'Huge Power': 1,
				'Parental Bond': 1,
				'Pure Power': 1,
				'Shadow Tag': 1,
				'Wonder Guard': 1,
				'Contrary': 1,
				'Simple': 1,
				'Imposter': 1,
				'Simple': 1
			};
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
		onValidateTeam: function(team) {
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
		onFaint: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	{
		name: "[Gen 7] Multibility",
		desc: [
			"&bullet; Put your second ability in the item slot.",
		],
		mod: 'franticfusions',
		ruleset: ['[Gen 7] OU'],
		banlist: ["Illegal", 'Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				if (this.getAbility(toId(pokemon.item))) {
					pokemon.abilitwo = toId(pokemon.item);
					pokemon.item = "";
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			if (pokemon.abilitwo && this.getAbility(pokemon.abilitwo)) {
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
			}
		},
		validateSet: function(set, teamHas) {
			let item = set.item;
			if (this.tools.getAbility(toId(item)))
			{
				set.item = '';
				let problems = this.validateSet(set, teamHas) || [];
				let abilitwo = this.tools.getAbility(toId(item));
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
				if (bans[toId(abilitwo.id)]) problems.push(set.species + "'s ability " + abilitwo.name + " is banned by Multibility.");
				if (abilitwo.id === toId(set.ability)) problems.push("You cannot have two of " + abilitwo.name + " on the same Pokemon.");
				set.item = item;
				return problems;
			}
		},
		onValidateTeam: function(team) {
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
	{ //Thanks urkerab for the Cross Evolution code :)
		name: "[Gen 7] Frantic Fusions",
		desc: [
			"&bullet; <a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/franticfusions/README.md>Frantic Fusions</a> <br> &bullet; A metagame where you are able to fuse two Pokemon. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
		],
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Uber', 'Unreleased', 'Shadow Tag', "Assist", "Shedinja", "Huge Power", "Pure Power", 'Medichamite', 'Swoobat'],
		suspect: "Nothing Right now",
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
					mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
					mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2)

					mixedTemplate.baseStats = {};
					for (let statid in template.baseStats) {
						mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
					}
					pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

					mixedTemplate.types = template.types.slice();
					let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
					if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
					else mixedTemplate.types.length = 1;
					pokemon.baseTemplate = mixedTemplate;
					pokemon.fusion = fusionTemplate.baseSpecies;
					pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
					pokemon.formeChange(mixedTemplate);
				} catch (e) {
					this.add('-hint', 'Failed to fuse ' + pokemon.baseTemplate.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) pokemon.fusetype = types;
			else
				pokemon.types = pokemon.fusetype;
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
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
			if (pokemon.abilitwo !== pokemon.ability) {
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
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			let banlist = {
				"shedinja": true,
				"hugepower": true,
				"purepower": true
			};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true,
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			if (toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (toId(fusionTemplate.tier) === "cap" || toId(template.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)])
			{
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if (!template.learnset)
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
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
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
			if (problems) return problems;
		},
		onValidateTeam: function(team) {
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
	{
		name: "[Gen 7] Frantic Fusions Ubers",
		desc: [
			"&bullet; A metagame where you are able to fuse two Pokemon. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
		],
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased'],
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
					mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
					mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2)

					mixedTemplate.baseStats = {};
					for (let statid in template.baseStats) {
						mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
					}
					pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

					mixedTemplate.types = template.types.slice();
					let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
					if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
					else mixedTemplate.types.length = 1;
					pokemon.baseTemplate = mixedTemplate;
					pokemon.fusion = fusionTemplate.baseSpecies;
					pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
					pokemon.formeChange(mixedTemplate);
				} catch (e) {
					this.add('-hint', 'Failed to fuse ' + pokemon.baseTemplate.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) pokemon.fusetype = types;
			else
				pokemon.types = pokemon.fusetype;
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
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
			if (pokemon.abilitwo !== pokemon.ability) {
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
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			//let banlist= {"shedinja":true,"hugepower":true,"purepower":true};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			//if(toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. ("+template.species+" has nickname "+fusionTemplate.species+")");
			if (toId(fusionTemplate.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			//if(banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. ("+template.species+" has nickname "+ fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) /*&& !banlist[toId(template.abilities[a])]*/ ) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)])
			{
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if (!template.learnset)
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
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
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
			if (problems) return problems;
		},
		onValidateTeam: function(team) {
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
	{
		name: "Mix and Mega Balanced Hackmons",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>",
		],
		column: 4,

		mod: 'mnmbh',
		ruleset: ['Balanced Hackmons'],
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			/*let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || uberStones.indexOf(item.id) >= 0) return ["" + template.species + " is not allowed to hold " + item.name + "."];*/
		},
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function(pokemon) {
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
		onSwitchOut: function(pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	/*{
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
		name: "[Gen 2] Traps",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'traps',
		ruleset: ['[Gen 2] OU'],
		onBegin: function () {
			this.arenaTrap = ['diglett', 'dugtrio'];
			this.magnetPull = ['magnemite', 'magneton'];
		},
		onSwitchIn: function(pokemon) {
			if(this.arenaTrap.includes(toId(pokemon.species))) {
				pokemon.addVolatile('arenatrap');
				return;
			}
			if(this.shadowTag.includes(toId(pokemon.species))) {
				pokemon.addVolatile('arenatrap');
				return;
			}
			if(pokemon.species === 'Wobbuffet') {
				pokemon.addVolatile('shadowtag');
				return;
			}
		}
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
	},*/
	{
		section: "Istor",
		column: 3,
	},
	{
		name: "[Istor] OU",
		mod: 'istor',
		desc: [
			"&bullet; A new region with new Pokemon, Moves, Abilities and a lot more",
			"&bullet; <a href=\"https://github.com/XpRienzo/DragonHeaven/blob/master/mods/istor/README.md\">Istor</a>",
			"&bullet; Use /distor <Pokemon/Item/Ability/Move> and /learnistor <Pokemon>, <move>for more info",
		],
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause', 'Freeze Clause Mod'],
		banlist: ['Uber', 'Uber', 'Power Construct', 'Shadow Tag'],
	},
	{
		name: "[Istor] Doubles OU",

		mod: 'istor',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview', 'Freeze Clause Mod'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "[Istor] Random Battle",

		mod: 'istor',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Freeze Clause Mod'],
	},
	{
		name: "[Istor] Random Doubles Battle",

		mod: 'istor',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Istor] Balanced Hackmons",

		mod: 'istor',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Chatter', 'Extreme Evoboost'],
	},
	{
		section: "Fakemon",
		column: 3,
	},
	{
		name: "[Fakemon] Random Battle",
		mod: 'fakemon',
		team: 'randomFotW',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Freeze Clause Mod'],
		fotw: "Jawnado",
	},
];
