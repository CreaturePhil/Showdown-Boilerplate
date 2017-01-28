'use strict';
exports.BattleStatuses = {
	classyz: {
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
		}
	},
	spandan: {
		effectType: 'Ability',
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
			this.add('c|~Spandan|DONT PANIC FIXED');
			this.add('raw|<div class="broadcast-green"><h3>The Crash has been fixed.</h3><p align=right style="font-size:20px;"></div>');
		},
		onSwitchOut: function(pokemon) {
			this.add("c|~Spandan|brb");
		}
	},
	thetruefalcon: {
		exists: true,
		onStart: function() {
			this.add('c|%The True Falcon|Hi all');
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	hydrostatics: {
		exists: true,
		onStart: function() {
			this.add('c|+Hydrostatics|Gl, Hf Kid');
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	quietchimchar: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	alphapaul71: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	zmeeed: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	digitaledge: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	snakexzero5: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	elcrest: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	flygonerz: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	pieddychomp: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	snaq: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	thegodofhaxorus: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	loominite: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	eternalmayhem: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	charizard8888: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	theswordbreaker: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	ransei: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	xprienzo: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	batterbotto: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	flareondriod: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	dragitbot: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	outrageousbot: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	shivamrustagi: {
		exists: true,
		onStart: function() {
		},
		onFaint: function(pokemon) {
		},
		onSwitchOut: function(pokemon) {
		}
	},
	"levitate": {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		// airborneness implemented in battle-engine.js:BattlePokemon#isGrounded
		id: "levitate",
		name: "Levitate",
		effectType: "Ability",
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
