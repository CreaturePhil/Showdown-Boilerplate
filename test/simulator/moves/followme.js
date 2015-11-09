'use strict';

const assert = require('assert');
let battle;

describe('Follow Me', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should redirect single-target moves towards it if it is a valid target', function () {
		this.timeout(5000);

		battle = BattleEngine.Battle.construct('battle-followme', 'triplescustomgame');
		battle.join('p1', 'Guest 1', 1, [
			{species: 'Clefable', ability: 'unaware', moves: ['followme']},
			{species: 'Clefairy', ability: 'unaware', moves: ['calmmind']},
			{species: 'Cleffa', ability: 'unaware', moves: ['calmmind']}
		]);
		battle.join('p2', 'Guest 2', 1, [
			{species: 'Abra', ability: 'synchronize', moves: ['lowkick']},
			{species: 'Kadabra', ability: 'synchronize', moves: ['lowkick']},
			{species: 'Alakazam', ability: 'synchronize', moves: ['lowkick']}
		]);
		battle.commitDecisions(); // Team Preview
		let hitCount = 0;
		battle.on('Damage', battle.getFormat(), function (damage, pokemon) {
			if (pokemon.template.speciesid === 'clefable') {
				hitCount++;
			}
		});
		battle.choose('p2', 'move 1 2, move 1 2, move 1 2');
		battle.commitDecisions();
		assert.strictEqual(hitCount, 2);
	});

	it('should not redirect self-targetting moves', function () {
		battle = BattleEngine.Battle.construct('battle-followme-self', 'doublescustomgame');
		battle.join('p1', 'Guest 1', 1, [
			{species: 'Clefable', ability: 'unaware', moves: ['followme']},
			{species: 'Clefairy', ability: 'unaware', moves: ['softboiled']}
		]);
		battle.join('p2', 'Guest 2', 1, [
			{species: 'Alakazam', ability: 'synchronize', moves: ['howl']},
			{species: 'Kadabra', ability: 'synchronize', moves: ['howl']}
		]);
		battle.commitDecisions(); // Team Preview
		battle.commitDecisions();
		assert.strictEqual(battle.p1.active[0].boosts['atk'], 0);
		assert.strictEqual(battle.p2.active[0].boosts['atk'], 1);
		assert.strictEqual(battle.p2.active[1].boosts['atk'], 1);
	});
});
