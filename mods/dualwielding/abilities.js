'use strict';

exports.BattleAbilities = {
	"airballoon": {
		inherit: true,
		effectType: 'Item',
		isSecond: true,
		// airborneness implemented in battle-engine.js:BattlePokemon#isGrounded
		onAfterDamage: function (damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move' && effect.id !== 'confused') {
				this.add('-enditem', target, 'Air Balloon');
				target.ability = '';
				target.lastItem2 = 'airballoon';
				this.runEvent('AfterUseItem', target, null, null, 'airballoon');
			}
		},
		onAfterSubDamage: function (damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move' && effect.id !== 'confused') {
				this.add('-enditem', target, 'Air Balloon');
				target.ability = ''
				target.lastItem2 = 'airballoon';
			}
		},
	},
};