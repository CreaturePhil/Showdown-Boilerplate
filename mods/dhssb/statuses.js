'use strict';
exports.BattleStatuses = {
	zapmaster2010: {
		exists: true,
		effectType: 'Ability',
		onStart: function () {
			this.add('c|+Zapmaster2010|Boi, tell me where the muffins at. llamashades');
		},
		onFaint: function(pokemon) {
			this.add('c|+Zapmaster2010|Nuuu. llamacry');
		},
	},
	flurbel: {
		exists: true,
		effectType: 'Ability',
		onStart: function () {
			this.add('c|$Flurbel|F*ck gligod');
		},
		onFaint: function(pokemon) {
			this.add('c|$Flurbel|my spirit will haunt you :]');
		},
		onSwitchOut: function (pokemon) {
			this.add('c|$Flurbel|i ain\'t done with you');
		},
	},
	classyz: {
		exists: true,
		effectType: 'Ability',
		onStart: function () {
			this.add('c|&ClassyZ|pro tip: if u kill me go straight to hell do not pass go do not collect $200');
		},
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
		onFaint: function(pokemon) {
			this.add('c|&ClassyZ|go straight to hell do not pass go do not collect $200');
		},
	},
	bbgun999: {
		exists: true,
		onStart: function (pokemon) {
			this.boost({def:-2,spd:-2});
		},
		onModifyMove: function (move) {
			if (move.id === "closecombat") {
				move.category = "Special";
			}
		},
	},
	spandan: {
		exists: true,
		onStart: function() {
			this.add('j|Spandan');
			this.add('raw|<center><div class="broadcast-red"><b>The server has crashed!</b><br>Please wait for an administrator to fix it.</div></center>');
		},
		onFaint: function(pokemon) {
			this.add('raw|<div class="broadcast-red"><b>Pokemon Showdown crashed!</b><br>Don\'t worry, we\'re working on fixing it.</div>');
			this.add('raw|[<font color="FF00FF">DragonHeaven</font>] <font color="909090">Spandamn</font> pushed <b>1</b> new commit to <font color="800080">master</font>: <a href="https://hastebin.com/raw/ocavinuyot" target="_blank">https://git.io/vMbyi</a><br><font color="FF00FF">DragonHeaven</font>/<font color="800080">master</font> <a href="https://hastebin.com/raw/ocavinuyot" target="_blank"><font color="606060">a79bac</font></a> Update server.js');
			this.add('c|~|Spandan used /hotpatch formats');
			this.add('c|~|Spandan used /hotpatch chat');
			this.add('c|~|Spandan used /hotpatch dnsbl');
			this.add('c|~|Spandan used /hotpatch battles');
			this.add('c|&Spandan|DONT PANIC FIXED');
			this.add('raw|<div class="broadcast-green"><h3>The Crash has been fixed.</h3><p align=right style="font-size:20px;"></div>');
			if(this.random(10000) === 420) {
				this.add('c|~Spandan|Okay so apparently whenever I switch out, the server uncrashes. This uncrashing can be a bit crashy. The chanceof this happening is only 1 in 10000. And it happened now. THE UNCRASHING. ONE OF YOU IS GONNA WIN.')
				let winner = pokemon.battle['p'+(this.random(2)+1)];
				pokemon.battle.win(winner);
				if(pokemon.side === winner) this.add("c|~Spandan|Thats how I roll. UNCRASHING THINGS. I liek. 8/8. shittupostu. gege "+winner.name);
				else this.add("c|~Spandan|HOW THE HELL DID YOU HACK!?!>?!?!/!??!/!?!/!?1/1 YES I AM TOALKNIG TO YOU "+winner.name.toUpperCase()+" !??!/1/1/!~/1/1/1/1?");
			}
		},
		onSwitchOut: function(pokemon) {
			this.add("c|&Spandan|brb");
		},
	},
	thetruefalcon: {
		exists: true,
		onStart: function() {
			this.add('c|%The True Falcon|Hi all');
		},
		onFaint: function(pokemon) {
			this.add('c|%The True Falcon|Bye all');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	flufi: {
		exists: true,
		onStart: function() {
		},
		onImmunity: function (type, pokemon) {
			if (type === 'Ground') {
				return false;
			}
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		},
	},
	winona: {
		exists: true,
		onStart: function() {
			this.add('c|$Winona|feelsbrb');
		},
		onFaint: function(pokemon) {
			this.add('raw|<div class="chat"><small>$</small><button name="parseCommand" value="/user Winona" style="background: none ; border: 0 ; padding: 0 5px 0 0 ; font-family: &quot;verdana&quot; , &quot;helvetica&quot; , &quot;arial&quot; , sans-serif ; font-size: 9pt ; cursor: pointer"><b><font color="#8BA725">Winona:</font></b></button><em class="mine">Le RIP me <img src="http://i.imgur.com/wp51rIg.png" title="feelsbn" width="50" height="50"></em></div>');
		},
		onSwitchOut: function(pokemon) {
			this.add("raw|I'm gonna use the Joestar family's secret technique m8 feelsgn");
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
	},
	hydrostatics: {
		exists: true,
		onStart: function() {
			this.add('c| Hydrostatics|Gl, Hf Kid');
		},
		onFaint: function(pokemon) {
			this.add('c| Hydrostatics|Cya next time Kid. I will not take it easy on you from next time.');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	quietchimchar: {
		exists: true,
		onStart: function() {
				this.add('c| Quiet Chimchar|Introducing the best starter ever!!');
		},
		onFaint: function(pokemon) {
				this.add('c| Quiet Chimchar|I\'ll get you next time!');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	alphapaul71: {
		exists: true,
		onStart: function() {
				this.add('c| Alpha Paul☯71|!htmlbox');
				this.add('raw|<button name="parseCommand" value="/user alphapaul71">My Owner!</button>');
		},
		onFaint: function(pokemon) {
				this.add('c| Alpha Paul☯71|RIP Me feelsbd');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	zmeeed: {
		exists: true,
		onStart: function() {
				this.add("c|@Zmeeed|For Mother Russia!");
		},
		onFaint: function(pokemon) {
			this.add("c|@Zmeeed|CYKABLYAT");
		},
		onSwitchOut: function(pokemon) {
		},
	},
	digitaledge: {
		exists: true,
		onStart: function() {
				this.add('c|&Digital Edge|__**Mo is our lord and savior!**__');
		},
		onFaint: function(pokemon) {
				this.add('c|&Digital Edge|u haxor u didnt get haxed');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	snakexzero5: {
		exists: true,
		onStart: function() {
				this.add('c| SnakeXZero5|A project on Friday and its Monday, YAY!');
		},
		onFaint: function(pokemon) {
				this.add('c| SnakeXZero5|I JUST FORGOT THERES A SUDDEN PROJECT TOMMOROW');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	elcrest: {
		exists: true,
		onStart: function() {
				this.add('c| Elcrest|Get ready to be blown away.');
		},
		onFaint: function(pokemon) {
				this.add('c| Elcrest|It seems that I can\'t control my turbulence....');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	flygonerz: {
		exists: true,
		onStart: function() {
				this.add('c|@Flygonerz|The Sand Dweller has arrived');
		},
		onFaint: function(pokemon) {
				this.add('c|@Flygonerz|Plox nerf, Ninten__doh__!');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	pieddychomp: {
		exists: true,
		onStart: function() {
				this.add('c|&PI★EddyChomp|Hey guys, watch me KO this guy lmao xaa :)');
		},
		onFaint: function(pokemon) {
				this.add("c|&PI★EddyChomp|Fuck this shit, I got rekt. I\'ll get MY REVENGE! RAWR!!!!");
		},
		onSwitchOut: function(pokemon) {
		},
	},
	snaq: {
		exists: true,
		onStart: function() {
				this.add('c| Snaq|Sup duds');
		},
		onFaint: function(pokemon) {
				this.add("c| Snaq|rip in pieces");
		},
		onSwitchOut: function(pokemon) {
		},
	},
	snaquaza: {
		exists: true,
		onStart: function() {
			this.add('c|~Snaquaza|Wait, why ain\'t I playing Random Haxmons instead?');
		},
		onFaint: function(pokemon) {
			this.add("c|~Snaquaza|Back to the real meta");
		},
		onCriticalHit: false,
		onModifyMove: function (move) {
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		},
		onSwitchOut: function(pokemon) {
		},
	},
	thegodofhaxorus: {
		exists: true,
		onStart: function() {
				this.add('c| The God of Haxorus|Hi! I\'m a **Hax**orus :3');
		},
		onFaint: function(pokemon) {
				this.add('c| The God of Haxorus|My own hax against me -3-');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	loominite: {
		exists: true,
		onStart: function() {
				this.add('c|+Loominite|Okay, lets go :I');
		},
		onFaint: function(pokemon) {
				this.add('c|+Loominite|eh, i\'m out!');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	eternalmayhem: {
		exists: true,
		onStart: function() {
				this.add('c| Eternal Mayhem|Let the music overcome you, control you.');
		},
		onFaint: function(pokemon) {
				this.add('c| Eternal Mayhem|The music was too powerful.');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	charizard8888: {
		exists: true,
		onStart: function() {
				this.add('raw|<div class="chat"><small>*</small><button name="parseCommand" value="/user charizard8888" style="background: none ; border: 0 ; padding: 0 5px 0 0 ; font-family: &quot;verdana&quot; , &quot;helvetica&quot; , &quot;arial&quot; , sans-serif ; font-size: 9pt ; cursor: pointer"><b><font color="#AE830F">charizard8888:</font></b></button><em class="mine">Enjoy my battle theme while everything gets rekt! <img src="https://cdn.rawgit.com/CreaturePhil/dem-feels/master/emotes/feelsfdra.png" title="feelsfdra" width="50" height="50"></em></div>');
				this.add('raw|<audio style="width: 99.6% ; border: 6px solid #FFA000 ; color: green" controls="" src="http://www.youtubeinmp3.com/fetch/?video=/www.youtube.com/watch?v=12eZvb108xc">Your user agent does not support the HTML5 Audio element.</audio>')
		},
		onFaint: function(pokemon) {
				this.add('c|&charizard8888|I\'m Outta here!');
			this.add('raw|<div class="chat"><small>*</small><button name="parseCommand" value="/user charizard8888" style="background: none ; border: 0 ; padding: 0 5px 0 0 ; font-family: &quot;verdana&quot; , &quot;helvetica&quot; , &quot;arial&quot; , sans-serif ; font-size: 9pt ; cursor: pointer"><b><font color="#AE830F">charizard8888:</font></b></button><em class="mine">Enjoy my battle theme while everything gets rekt! <img src="https://cdn.rawgit.com/CreaturePhil/dem-feels/master/emotes/feelsfdra.png" title="feelsfdra" width="50" height="50"></em></div>');
			this.add('raw|<audio style="width: 99.6% ; border: 6px solid #FFA000 ; color: green" controls="" src="http://www.youtubeinmp3.com/fetch/?video=/www.youtube.com/watch?v=12eZvb108xc">Your user agent does not support the HTML5 Audio element.</audio>')
		},
		onFaint: function(pokemon) {
			this.add('c|&charizard8888|I\'m Outta here!');
		},
		onSwitchOut: function(pokemon) {
			this.add("c|&charizard8888|brb");
		},
	},
	theswordbreaker: {
		exists: true,
		onStart: function() {
				this.add('c|@Theswordbreaker|It\'s time to break some blades >:)');
		},
		onFaint: function(pokemon) {
				this.add('c|@Theswordbreaker|Feh....I.....resign from this farce....ehh');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	ransei: {
		exists: true,
		onStart: function() {
				this.add('c|~Ransei|yo');
		},
		onFaint: function(pokemon) {
 				this.add('c|~Ransei|ripsei');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	xprienzo: {
		exists: true,
		onStart: function() {
				this.add('c|⚔XpRienzo ☑-☑|Wait, was I supposed to do something?');
		},
		onFaint: function(pokemon) {
 				this.add('c|⚔XpRienzo ☑-☑|Bleh');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	batterbotto: {
		exists: true,
		onStart: function() {
				this.add('c|*BatterBotto|Beep Boop');
		},
		onFaint: function(pokemon) {
 				this.add('c|*BatterBotto|Beep Boop');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	flareondriod: {
		exists: true,
		onStart: function() {
 				this.add('c|*FlareonDriod|Beep Beep');
		},
		onFaint: function(pokemon) {
 				this.add('c|*FlareonDriod|Beep Beep');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	dragitbot: {
		exists: true,
		onStart: function() {
 				this.add('c|*Dragitbot|Boop Boop');
		},
		onFaint: function(pokemon) {
 				this.add('c|*Dragitbot|Boop Boop');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	outrageousbot: {
		exists: true,
		onStart: function() {
 				this.add('c|*OutrageousBoT|Boop Beep');
		},
		onFaint: function(pokemon) {
 				this.add('c|*OutrageousBoT|Boop Beep');
		},
		onSwitchOut: function(pokemon) {
		},
	},
	shivamrustagi: {
		exists: true,
		onStart: function() {
				this.add('c|%shivam rustagi|__**i am here to destroy ur life!**__');
		},
		onFaint: function(pokemon) {
 			this.add('c|%shivam rustagi|u will be cursed for ever');
		},
		onSwitchOut: function(pokemon) {
			this.add("c|%shivam rustagi|I'll be back to haunt u till eternity");
		},
	},
	russianwinter: {
		effectType: 'Weather',
		duration: 0,
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			if(target.name=="Zmeeed") return;
			this.damage(target.maxhp / 4);
		},
		onEnd: function () {
			this.add('-weather', 'none');
		},
	},
};
