'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Foresight', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should negate Normal and Fighting immunities', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Smeargle", ability: 'owntempo', moves: ['foresight', 'vitalthrow', 'tackle']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Dusknoir", ability: 'prankster', moves: ['recover']}]);
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.commitDecisions();
		assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
		battle.choose('p1', 'move 3');
		battle.commitDecisions();
		assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
	});

	it('should ignore the effect of positive evasion stat stages', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Smeargle", ability: 'owntempo', moves: ['avalanche', 'foresight']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Forretress", ability: 'sturdy', moves: ['synthesis']}]);
		battle.choose('p1', 'move 2');
		battle.commitDecisions();
		battle.boost({evasion: 6}, battle.p2.active[0]);
		for (let i = 0; i < 16; i++) {
			battle.commitDecisions();
			assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
		}
	});

	it('should not ignore the effect of negative evasion stat stages', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Smeargle", ability: 'owntempo', moves: ['zapcannon', 'dynamicpunch', 'foresight']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Zapdos", ability: 'owntempo', moves: ['roost']}]);
		battle.choose('p1', 'move 3');
		battle.commitDecisions();
		battle.boost({spe: 6, evasion: -6}, battle.p2.active[0]);
		for (let i = 0; i < 16; i++) {
			battle.commitDecisions();
			assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
		}
	});
});
