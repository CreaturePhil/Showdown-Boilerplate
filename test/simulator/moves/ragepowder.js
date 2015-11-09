'use strict';

const assert = require('assert');
let battle;

describe('Rage Powder', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should redirect single-target moves towards it if it is a valid target', function () {
		this.timeout(5000);

		battle = BattleEngine.Battle.construct('battle-followme', 'triplescustomgame');
		battle.join('p1', 'Guest 1', 1, [
			{species: 'Amoonguss', ability: 'overcoat', item: 'safetygoggles', moves: ['ragepowder']},
			{species: 'Venusaur', ability: 'overcoat', moves: ['growth']},
			{species: 'Ivysaur', ability: 'overcoat', moves: ['growth']}
		]);
		battle.join('p2', 'Guest 2', 1, [
			{species: 'Abra', ability: 'synchronize', moves: ['absorb']},
			{species: 'Kadabra', ability: 'synchronize', moves: ['absorb']},
			{species: 'Alakazam', ability: 'synchronize', moves: ['absorb']}
		]);
		battle.commitDecisions();
		let hitCount = [0, 0, 0];
		battle.p1.active[0].damage = function () {
			hitCount[0]++;
			return BattleEngine.BattlePokemon.prototype.damage.apply(this, arguments);
		};
		battle.p1.active[1].damage = function () {
			hitCount[1]++;
			return BattleEngine.BattlePokemon.prototype.damage.apply(this, arguments);
		};
		battle.p1.active[2].damage = function () {
			hitCount[2]++;
			return BattleEngine.BattlePokemon.prototype.damage.apply(this, arguments);
		};
		battle.choose('p2', 'move 1 2, move 1 2, move 1 2');
		battle.commitDecisions();
		assert.strictEqual(hitCount[0], 2);
		assert.strictEqual(hitCount[1], 1);
		assert.strictEqual(hitCount[2], 0);
	});

	it('should not affect Pokemon with Powder immunities', function () {
		battle = BattleEngine.Battle.construct('battle-followme', 'triplescustomgame');
		battle.join('p1', 'Guest 1', 1, [
			{species: 'Amoonguss', ability: 'overcoat', moves: ['growth']},
			{species: 'Venusaur', ability: 'overcoat', moves: ['ragepowder']},
			{species: 'Ivysaur', ability: 'overcoat', moves: ['growth']}
		]);
		battle.join('p2', 'Guest 2', 1, [
			{species: 'Squirtle', ability: 'naturalcure', moves: ['absorb']},
			{species: 'Escavalier', ability: 'overcoat', moves: ['absorb']},
			{species: 'Alakazam', ability: 'synchronize', item: 'safetygoggles', moves: ['absorb']}
		]);
		battle.commitDecisions();
		let hitCount = [0, 0, 0];
		battle.p1.active[0].damage = function () {
			hitCount[0]++;
			return BattleEngine.BattlePokemon.prototype.damage.apply(this, arguments);
		};
		battle.p1.active[1].damage = function () {
			hitCount[1]++;
			return BattleEngine.BattlePokemon.prototype.damage.apply(this, arguments);
		};
		battle.p1.active[2].damage = function () {
			hitCount[2]++;
			return BattleEngine.BattlePokemon.prototype.damage.apply(this, arguments);
		};
		battle.choose('p2', 'move 1 3, move 1 1, move 1 1');
		battle.commitDecisions();
		assert.strictEqual(hitCount[0], 2);
		assert.strictEqual(hitCount[1], 1);
		assert.strictEqual(hitCount[2], 0);
	});
});
