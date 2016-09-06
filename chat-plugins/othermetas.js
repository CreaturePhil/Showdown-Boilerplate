'use strict';

const ProcessManager = require('./../process-manager');

const MAX_PROCESSES = 1;
const RESULTS_MAX_LENGTH = 10;

const PM = exports.PM = new ProcessManager({
	maxProcesses: MAX_PROCESSES,
	execFile: __filename,
	onMessageUpstream: function (message) {
		// Protocol:
		// "[id]|JSON"
		let pipeIndex = message.indexOf('|');
		let id = +message.substr(0, pipeIndex);
		let result = JSON.parse(message.slice(pipeIndex + 1));

		if (this.pendingTasks.has(id)) {
			this.pendingTasks.get(id)(result);
			this.pendingTasks.delete(id);
			this.release();
		}
	},
	onMessageDownstream: function (message) {
		// protocol:
		// "[id]|{data, sig}"
		let pipeIndex = message.indexOf('|');
		let id = message.substr(0, pipeIndex);

		let data = JSON.parse(message.slice(pipeIndex + 1));
		process.send(id + '|' + JSON.stringify(this.receive(data)));
	},
	receive: function (data) {
		let result;
		try {
			switch (data.cmd) {
			case 'randpoke':
			case 'dexsearch':
				result = runDexsearch(data.target, data.cmd, data.canAll, data.message);
				break;
			case 'movesearch':
				result = runMovesearch(data.target, data.cmd, data.canAll, data.message);
				break;
			case 'itemsearch':
				result = runItemsearch(data.target, data.cmd, data.canAll, data.message);
				break;
			case 'learn':
				result = runLearn(data.target, data.message);
				break;
			default:
				result = null;
			}
		} catch (err) {
			require('./../crashlogger')(err, 'A search query', data);
			result = {error: "Sorry! Our search engine crashed on your query. We've been automatically notified and will fix this crash."};
		}
		return result;
	},
	isChatBased: true,
});

if (process.send && module === process.mainModule) {
	// This is a child process!

	global.Config = require('../config/config');

	if (Config.crashguard) {
		process.on('uncaughtException', err => {
			require('../crashlogger')(err, 'A dexsearch process', true);
		});
	}

	global.Tools = require('../tools');
	global.toId = Tools.getId;
	Tools.includeData();
	Tools.includeMods();
	global.TeamValidator = require('../team-validator');

	process.on('message', message => PM.onMessageDownstream(message));
	process.on('disconnect', () => process.exit());

	require('../repl').start('dexsearch', cmd => eval(cmd));
} else if (!PM.maxProcesses) {
	process.nextTick(() => Tools.includeMods());
}//All this isfrom datasearch.js
let rebuild = function(zom)
		{
    		var k="";
		for(var i=0;i<zom.length;i++)
		{
			if(zom.charAt(i)===' '||zom.charAt(i)==='-'||zom.charAt(i)==='.'||zom.charAt(i)==='/'||zom.charAt(i)==='+')
				continue;
			else
				k=k+zom.charAt(i);
		}
		return k.toLowerCase();
		}

exports.commands= {
	'ei':function(target,room,user)
	{
		let abilities =
		{
			aerilate : 'Air Balloon',
			adaptability : 'Apicot Berry',
			adapt : 'Apicot Berry',
			analytic:'Water Gem',
			anticipation : 'Black Belt',
			arenatrap : 'Bug Gem',
			aromaveil : 'Black Glasses',
			aurabreak : 'Black Sludge',
			baddreams : 'BrightPowder',
			battlearmor : 'Cell Battery',
			bigpecks : 'Charcoal',
			blaze : 'Charti Berry',
			bulletproof : 'Chesto Berry',
			cheekpouch : 'Chilan Berry',
			chlorophyll : 'Chople Berry',
			clearbody : 'Coba Berry',
			cloudnine : 'Colbur Berry',
			colorchange : 'Custap Berry',
			competitive : 'Damp Rock',
			compoundeyes : 'Dragon Fang',
			contrary : 'Dark Gem',
			cursedbody : 'Eject Button',
			cutecharm : 'Expert Belt',
			damp : 'Flame Orb',
			darkaura : 'Focus Band',
			defeatist : 'Full Incense',
			defiant : 'Ganlon Berry',
			deltastream : 'Grepa Berry',
			desolateland : 'Grip Claw',
			desoland : 'Grip Claw',
			download : 'Haban Berry',
			drizzle : 'Hard Stone',
			drought : 'Heat Rock',
			dryskin : 'Iapapa Berry',
			earlybird : 'Icy Rock',
			effectspore : 'Kasib Berry',
			fairyaura : 'Kebia Berry',
			filter : 'Kee Berry',
			flamebody : 'Kelpsy Berry',
			flareboost : 'King\'s Rock',
			flashfire : 'Lagging Tail',
			flowergift : 'Lansat Berry',
			flowerveil : 'Lax Incense',
			forecast : 'Leppa Berry',
			forewarn : 'Liechi Berry',
			friendguard : 'Luminous Moss',
			frisk : 'Magnet',
			furcoat : 'Dragon Gem',
			fc : 'Dragon Gem',
			galewings : 'Maranga Berry',
			gw : 'Maranga Berry',
			gluttony : 'Metal Coat',
			gooey: 'Metronome',
			grasspelt : 'Micle Berry',
			guts: 'Miracle Seed',
			harvest : 'Muscle Band',
			healer : 'Mystic Water',
			heatproof : 'Never-Melt Ice',
			heavymetal : 'Occa Berry',
			honeygather : 'Odd Incense',
			hugepower : 'Electric Gem',
			hustle : 'Passho Berry',
			hydration : 'Payapa Berry',
			hypercutter : 'Petaya Berry',
			icebody : 'Poison Barb',
			illuminate : 'Quick Claw',
			illusion : 'Razor Claw',
			immunity : 'Razor Fang',
			imposter : 'Fairy Gem',
			infiltrator : 'Rindo Berry',
			innerfocus : 'Rock Incense',
			insomnia : 'Rose Incense',
			intimidate : 'Red Card',
			intim : 'Red Card',
			ironbarbs : 'Roseli Berry',
			ironfist : 'Safety Goggles',
			justified : 'Salac Berry',
			keeneye : 'Scope Lens',
			klutz : 'Sea Incense',
			leafguard : 'Sharp Beak',
			levitate : 'Nomel Berry',
			lightmetal : 'Shell Bell',
			lightningrod : 'Shuca Berry',
			limber : 'Silk Scarf',
			liquidooze : 'SilverPowder',
			mbounce : 'Smooth Rock',
			magicbounce : 'Smooth Rock',
			magicguard : 'Snowball',
			mguard : 'Snowball',
			magician : 'Soft Sand',
			magmaarmor : 'Spell Tag',
			magnetpull : 'Starf Berry',
			marvelscale : 'Sticky Barb',
			megalauncher : 'Tanga Berry',
			minus : 'TwistedSpoon',
			moldbreaker : 'Wacan Berry',
			moody : 'Wave Incense',
			motordrive : 'Weakness Policy',
			moxie : 'White Herb',
			multiscale : 'Wide Lens',
			multitype : 'Wise Glasses',
			mummy : 'Yache Berry',
			naturalcure : 'Zoom Lens',
			noguard : 'Adamant Orb',
			normalize : 'Burn Drive',
			oblivious : 'Chill Drive',
			overcoat : 'DeepSeaScale',
			overgrow : 'DeepSeaTooth',
			owntempo : 'Douse Drive',
			parentalbond : 'Fire Gem',
			pbond : 'Fire Gem',
			pickpocket : 'Light Ball',
			pickup : 'Lucky Punch',
			pixilate : 'Griseous Orb',
			plus : 'Lustrous Orb',
			poisonheal : 'Metal Powder',
			ph : 'Metal Powder',
			poisonpoint : 'Quick Powder',
			poisontouch : 'Shock Drive',
			prankster : 'Mail',
			prank : 'Soul Dew',
			pressure : 'Stick',
			primordialsea : 'Thick Club',
			primsea : 'Thick Club',
			protean : 'Aguav Berry',
			purepower : 'Ice Gem',
			quickfeet : 'Aspear Berry',
			raindish : 'Binding Band',
			rattled : 'Cheri Berry',
			reckless : 'Destiny Knot',
			refrigerate : 'Enigma Berry',
			fridge : 'Enigma Berry',
			regen : 'Figy Berry',
			regenerator : 'Figy Berry',
			rivalry : 'Float Stone',
			rockhead : 'Iron Ball',
			roughskin : 'Jaboca Berry',
			runaway : 'Macho Brace',
			sandforce : 'Mago Berry',
			sandrush : 'Oran Berry',
			sandstream : 'Pecha Berry',
			sandveil : 'Persim Berry',
			sapsipper : 'Rawst Berry',
			scrappy : 'Ring Target',
			serenegrace : 'Rowap Berry',
			serenevil : 'Rowap Berry',
			shadowtag : 'Poison Gem',
			shedskin : 'Wiki Berry',
			sheerforce : 'Armor Fossil',
			sf : 'Armor Fossil',
			shellarmor : 'Belue Berry',
			shielddust : 'Bluk Berry',
			simple : 'Psychic Gem',
			skilllink : 'Cherish Ball',
			slowstart : 'Claw Fossil',
			sniper : 'Cornn Berry',
			snowcloak : 'Cover Fossil',
			snowwarning : 'Dive Ball',
			solarpower : 'Dome Fossil',
			solidrock : 'Dream Ball',
			soundproof : 'Durin Berry',
			speedboost : 'Dusk Ball',
			stall : 'Electrizer',
			stancechange : 'Energy Powder',
			static : 'Fast Ball',
			steadfast : 'Freind Ball',
			stench : 'Great Ball',
			stickyhold : 'Heal Ball',
			stormdrain : 'Heavy Ball',
			strongjaw : 'Helix Fossil',
			sturdy : 'Hondew Berry',
			suctioncups : 'Level Ball',
			superluck : 'Love Ball',
			swarm : 'Lure Ball',
			sweetveil : 'Luxury Ball',
			swiftswim : 'Magost Berry',
			symbiosis : 'Master Ball',
			synchronize : 'Moon Ball',
			tangledfeet : 'Nanab Berry',
			technician : 'Nest Ball',
			tech : 'Nest Ball',
			telepathy : 'Net Ball',
			thickfat : 'Old Amber',
			tintedlens : 'Pamtre Berry',
			torrent : 'Park Ball',
			toughclaws : 'Pinap Berry',
			toxicboost : 'Plume Fossil',
			trace : 'Poke Ball',
			truant : 'Pomeg Berry',
			unaware : 'Qualot Berry',
			unburden : 'Quick Ball',
			unnerve : 'Rabuta Berry',
			victorystar : 'Rare Bone',
			vitalspirit : 'Razz Berry',
			voltabsorb : 'Repeat Ball',
			waterabsorb : 'Root Fossil',
			waterveil : 'Safari Ball',
			weakarmor : 'Skull Fossil',
			whitesmoke : 'Spelon Berry',
			wonderguard : 'Steel Gem',
			wg : 'Steel Gem',
			wonderskin : 'Sport Ball',
			zenmode : 'Tamato Berry',
			aftermath : 'Premier Ball'
		};
		let text = "";
	        let abe = rebuild(target.toLowerCase());
	        if(target=='')
	        	text+="Usage: ``.ei <Ability>``"
			else if(target=='bans')
	        	text+="The current banlist for Enchanted Items is: Ubers, Kyurem-Black, Chatter, Shedinja, and the held abilities of Arena Trap, Contrary, Fur Coat, Huge Power, Imposter, Parental Bond, Pure Power, Shadow Tag, Simple, Trace(temporarily) and Wonder Guard.";
	        else if(target=='retain')
	        	text+="These items retain their effects in EI: Assault Vest, Choice Band, Choice Scarf, Choice Specs, Eviolite, Focus Sash, Leftovers, Life Orb, Light Clay, Lum Berry, Mental Herb, Power Herb, Rocky Helmet, Sitrus Berry, Toxic Orb, Mega Stones and Type Plates."
	        else if(target=='turboblaze' || target == 'teravolt')
	        	text+="Please use Mold Breaker instead of that ability, because it doesn't have an Enchanted Item anymore. The Enchanted Item for Mold Breaker is: Wacan Berry.";
	        else if(abilities[abe]==undefined)
	        	text+="Sorry, that ability does not exist."
	        else
	        	text+="The Enchanted Item for "+target+" is <b>"+abilities[abe]+"</b>.";
	        this.sendReplyBox(text);
	},
	fuse: function(target, room, user) {
        let text = "";
        let separated = target.split(",");
        let name = (("" + separated[0]).trim()).toLowerCase();
        let name2 = (("" + separated[1]).trim()).toLowerCase();
        name = rebuild(name);
        name2 = rebuild(name2);
	let pokemen=Tools.data.Pokedex;
        if (pokemen[name] == undefined || pokemen[name2] == undefined)
        {
                this.say(room, "Error: Pokemon not found")
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
                if (pokemen[name].types[0] != pokemen[name2].types[0])
                        type = type + '/' + pokemen[name2].types[0];
                let bst = baseStats['avehp'] + baseStats['aveatk'] + baseStats['avedef'] + baseStats['avespa'] + baseStats['avespd'] + baseStats['avespe'];
                text = "Stats: " + baseStats['avehp'] + "/" + baseStats['aveatk'] + "/" + baseStats['avedef'] + "/" + baseStats['avespa'] + "/" + baseStats['avespd'] + "/" + baseStats['avespe'] + " <b>BST</b>:" + bst + " <b>Type:</b> " + type;
                this.sendReplyBox(text);
        }
},
};
