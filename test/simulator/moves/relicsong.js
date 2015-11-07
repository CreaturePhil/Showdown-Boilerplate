'use strict';

const assert = require('assert');
let battle;

describe('Relic Song', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should transform Meloetta into its Pirouette forme', function () {
		battle = BattleEngine.Battle.construct();
		battle.join('p1', 'Guest 1', 1, [{species: "Meloetta", ability: 'serenegrace', moves: ['relicsong']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Registeel", ability: 'clearbody', moves: ['rest']}]);
		battle.commitDecisions();
		assert.strictEqual(battle.p1.active[0].template.speciesid, 'meloettapirouette');
	});

	it('should pierce through substitutes', function () {
		battle = BattleEngine.Battle.construct();
		battle.join('p1', 'Guest 1', 1, [{species: "Deoxys-Attack", ability: 'victorystar', item: 'laggingtail', moves: ['splash', 'relicsong']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Caterpie", level: 2, ability: 'naturalcure', item: 'focussash', moves: ['substitute', 'rest']}]);
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].item, '');
	});
});

describe('Relic Song [Gen 5]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should not pierce through substitutes', function () {
		battle = BattleEngine.Battle.construct('battle-relicsong-bw', 'gen5customgame');
		battle.join('p1', 'Guest 1', 1, [{species: "Deoxys-Attack", ability: 'victorystar', item: 'laggingtail', moves: ['splash', 'relicsong']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Caterpie", level: 2, ability: 'naturalcure', item: 'focussash', moves: ['substitute', 'rest']}]);
		battle.commitDecisions();
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].item, 'focussash');
	});

	it('should transform Meloetta into its Pirouette forme even if it hits a substitute', function () {
		battle = BattleEngine.Battle.construct();
		battle.join('p1', 'Guest 1', 1, [{species: "Meloetta", ability: 'serenegrace', moves: ['relicsong']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Registeel", ability: 'prankster', moves: ['substitute']}]);
		battle.commitDecisions();
		assert.strictEqual(battle.p1.active[0].template.speciesid, 'meloettapirouette');
	});
});
