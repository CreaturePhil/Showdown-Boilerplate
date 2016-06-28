'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Heal Block', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should prevent Pokemon from gaining HP from residual recovery items', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: 'Hippowdon', ability: 'sandstream', moves: ['healblock']}]);
		battle.join('p2', 'Guest 2', 1, [{species: 'Spiritomb', ability: 'pressure', item: 'leftovers', moves: ['calmmind']}]);
		battle.commitDecisions();
		assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
	});

	it('should prevent Pokemon from consuming HP recovery items', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: 'Sableye', ability: 'prankster', moves: ['healblock']}]);
		battle.join('p2', 'Guest 2', 1, [{species: 'Pansage', ability: 'gluttony', item: 'berryjuice', moves: ['bellydrum']}]);
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].item, 'berryjuice');
		assert.strictEqual(battle.p2.active[0].hp, Math.ceil(battle.p2.active[0].maxhp / 2));
	});

	it('should disable the use of healing moves', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: 'Spiritomb', ability: 'pressure', moves: ['healblock']}]);
		battle.join('p2', 'Guest 2', 1, [{species: 'Cresselia', ability: 'levitate', moves: ['recover']}]);
		battle.commitDecisions();
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].lastMove, 'struggle');
	});

	it('should prevent Pokemon from using draining moves', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: 'Sableye', ability: 'prankster', moves: ['healblock']}]);
		battle.join('p2', 'Guest 2', 1, [{species: 'Venusaur', ability: 'overgrow', moves: ['gigadrain']}]);
		battle.commitDecisions();
		assert.strictEqual(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});

	it('should prevent abilities from recovering HP', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: 'Sableye', ability: 'prankster', moves: ['healblock', 'surf']}]);
		battle.join('p2', 'Guest 2', 1, [{species: 'Quagsire', ability: 'waterabsorb', moves: ['bellydrum', 'calmmind']}]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].hp, hp);
	});

	it('should prevent Leech Seed from healing HP', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: 'Starmie', ability: 'noguard', moves: ['healblock']}]);
		battle.join('p2', 'Guest 2', 1, [{species: 'Venusaur', ability: 'overgrow', moves: ['substitute', 'leechseed']}]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p2', 'move 2');
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].hp, hp);
		assert.notStrictEqual(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});
});

describe('Heal Block [Gen 5]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should prevent Pokemon from gaining HP from residual recovery items', function () {
		battle = common.gen(5).createBattle([
			[{species: 'Hippowdon', ability: 'sandstream', moves: ['healblock']}],
			[{species: 'Spiritomb', ability: 'pressure', item: 'leftovers', moves: ['calmmind']}],
		]);
		battle.commitDecisions();
		assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
	});

	it('should prevent Pokemon from consuming HP recovery items', function () {
		battle = common.gen(5).createBattle([
			[{species: 'Sableye', ability: 'prankster', moves: ['healblock']}],
			[{species: 'Pansage', ability: 'gluttony', item: 'sitrusberry', moves: ['bellydrum']}],
		]);
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].item, 'sitrusberry');
		assert.strictEqual(battle.p2.active[0].hp, Math.ceil(battle.p2.active[0].maxhp / 2));
	});

	it('should disable the use of healing moves', function () {
		battle = common.gen(5).createBattle([
			[{species: 'Spiritomb', ability: 'pressure', moves: ['healblock']}],
			[{species: 'Cresselia', ability: 'levitate', moves: ['recover']}],
		]);
		battle.commitDecisions();
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].lastMove, 'struggle');
	});

	it('should prevent abilities from recovering HP', function () {
		battle = common.gen(5).createBattle([
			[{species: 'Sableye', ability: 'prankster', moves: ['healblock', 'surf']}],
			[{species: 'Quagsire', ability: 'waterabsorb', moves: ['bellydrum', 'calmmind']}],
		]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].hp, hp);
	});

	it('should prevent draining moves from healing HP', function () {
		battle = common.gen(5).createBattle([
			[{species: 'Sableye', ability: 'prankster', moves: ['healblock']}],
			[{species: 'Venusaur', ability: 'overgrow', moves: ['substitute', 'gigadrain']}],
		]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p2', 'move 2');
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].hp, hp);
		assert.notStrictEqual(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});

	it('should prevent Leech Seed from healing HP', function () {
		battle = common.gen(5).createBattle([
			[{species: 'Starmie', ability: 'noguard', moves: ['healblock']}],
			[{species: 'Venusaur', ability: 'overgrow', moves: ['substitute', 'leechseed']}],
		]);
		let hp = battle.p2.active[0].hp;
		battle.choose('p2', 'move 2');
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].hp, hp);
		assert.notStrictEqual(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});
});

describe('Heal Block [Gen 4]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should disable the use of healing moves', function () {
		battle = common.gen(4).createBattle([
			[{species: 'Spiritomb', ability: 'pressure', moves: ['healblock']}],
			[{species: 'Cresselia', ability: 'levitate', moves: ['recover']}],
		]);
		battle.commitDecisions();
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].lastMove, 'struggle');
	});

	it('should block the effect of Wish', function () {
		battle = common.gen(4).createBattle([
			[{species: 'Spiritomb', ability: 'pressure', moves: ['healblock']}],
			[{species: 'Deoxys', ability: 'pressure', moves: ['wish']}],
		]);
		battle.commitDecisions();
		battle.commitDecisions();
		assert.notStrictEqual(battle.p2.active[0].hp, battle.p2.active[0].maxhp);
	});

	it('should prevent draining moves from healing HP', function () {
		battle = common.gen(4).createBattle([
			[{species: 'Sableye', ability: 'prankster', moves: ['healblock']}],
			[{species: 'Venusaur', ability: 'overgrow', moves: ['substitute', 'gigadrain']}],
		]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p2', 'move 2');
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].hp, hp);
		assert.notStrictEqual(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});

	it('should allow HP recovery items to activate', function () {
		battle = common.gen(4).createBattle([
			[{species: 'Spiritomb', ability: 'pressure', moves: ['healblock', 'shadowball']}],
			[{species: 'Abra', level: 1, ability: 'synchronize', item: 'leftovers', moves: ['teleport', 'endure']}, {species: 'Abra', level: 1, ability: 'synchronize', item: 'sitrusberry', moves: ['teleport', 'endure']}],
		]);
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.notStrictEqual(battle.p2.active[0].hp, 1);
		battle.choose('p2', 'switch 2');
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].item, '');
		assert.notStrictEqual(battle.p2.active[0].hp, 1);
	});

	it('should allow abilities that recover HP to activate', function () {
		battle = common.gen(4).createBattle([
			[{species: 'Sableye', ability: 'keeneye', moves: ['healblock', 'surf']}],
			[{species: 'Quagsire', ability: 'waterabsorb', moves: ['bellydrum', 'calmmind']}],
		]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.notStrictEqual(battle.p2.active[0].hp, hp);
	});

	it('should prevent Leech Seed from healing HP', function () {
		battle = common.gen(4).createBattle([
			[{species: 'Starmie', ability: 'noguard', moves: ['healblock']}],
			[{species: 'Venusaur', ability: 'overgrow', moves: ['substitute', 'leechseed']}],
		]);
		battle.commitDecisions();
		let hp = battle.p2.active[0].hp;
		battle.choose('p2', 'move 2');
		battle.commitDecisions();
		assert.strictEqual(battle.p2.active[0].hp, hp);
		assert.notStrictEqual(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});
});
