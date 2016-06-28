'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Battle#on', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should allow the addition of one or more event handlers to the battle engine', function () {
		battle = common.createBattle([
			[{species: 'Pidgeot', ability: 'keeneye', moves: ['bulkup']}],
			[{species: 'Talonflame', ability: 'galewings', moves: ['peck']}],
		]);
		let eventCount = 0;
		let eventCount2 = 0;
		battle.on('Hit', battle.getFormat(), function () {
			eventCount++;
		});
		battle.on('Hit', battle.getFormat(), function () {
			eventCount++;
			eventCount2++;
		});
		battle.on('ModifyDamage', battle.getFormat(), function () {
			return 5;
		});
		battle.commitDecisions();
		assert.strictEqual(eventCount, 4);
		assert.strictEqual(eventCount2, 2);
		assert.strictEqual(battle.p1.active[0].maxhp - battle.p1.active[0].hp, 5);
	});

	it('should support and resolve priorities correctly', function () {
		battle = common.createBattle([
			[{species: 'Pidgeot', ability: 'keeneye', moves: ['bulkup']}],
			[{species: 'Talonflame', ability: 'galewings', moves: ['peck']}],
		]);
		let eventCount = 0;
		let modHandler = function (count) {
			return function () {
				assert.strictEqual(eventCount, count);
				eventCount++;
			};
		};
		for (let i = 0; i < 9; i++) {
			battle.on('ModifyDamage', battle.getFormat(), -i, modHandler(i));
		}
		battle.commitDecisions();
		assert.strictEqual(eventCount, 9);
	});

	it('should throw if a callback is not given for the event handler', function () {
		battle = common.createBattle([
			[{species: 'Pidgeot', ability: 'keeneye', moves: ['bulkup']}],
			[{species: 'Talonflame', ability: 'galewings', moves: ['peck']}],
		]);
		assert.throws(battle.on, TypeError);
		assert.throws(function () {battle.on('Hit');}, TypeError);
		assert.throws(function () {battle.on('Hit', battle.getFormat());}, TypeError);
	});
});
