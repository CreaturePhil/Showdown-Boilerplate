'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Normalize', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should change most of the user\'s moves to Normal-type', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Delcatty", ability: 'normalize', moves: ['grassknot']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Latias", ability: 'colorchange', moves: ['endure']}]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Normal'));
	});

	it('should not change Hidden Power to Normal-type', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Delcatty", ability: 'normalize', moves: ['hiddenpowerfighting']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Latias", ability: 'colorchange', moves: ['endure']}]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Fighting'));
	});

	it('should not change Techno Blast to Normal-type if the user is holding a Drive', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Delcatty", ability: 'normalize', item: 'dousedrive', moves: ['technoblast']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Latias", ability: 'colorchange', moves: ['endure']}]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Water'));
	});

	it('should not change Judgment to Normal-type if the user is holding a Plate', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Delcatty", ability: 'normalize', item: 'zapplate', moves: ['judgment']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Latias", ability: 'colorchange', moves: ['endure']}]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Electric'));
	});

	it('should not change Weather Ball to Normal-type if sun, rain, or hail is an active weather', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Delcatty", ability: 'normalize', item: 'laggingtail', moves: ['weatherball']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Latias", ability: 'colorchange', moves: ['sunnyday']}]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Fire'));
	});

	it('should not change Natural Gift to Normal-type if the user is holding a Berry', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Delcatty", ability: 'normalize', item: 'chopleberry', moves: ['naturalgift']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Latias", ability: 'colorchange', moves: ['endure']}]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Fighting'));
	});
});

describe('Normalize [Gen 4]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should change most of the user\'s moves to Normal-type', function () {
		battle = common.gen(4).createBattle([
			[{species: "Delcatty", ability: 'normalize', moves: ['grassknot']}],
			[{species: "Latias", ability: 'colorchange', moves: ['endure']}],
		]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Normal'));
	});

	it('should change Hidden Power to Normal-type', function () {
		battle = common.gen(4).createBattle([
			[{species: "Delcatty", ability: 'normalize', moves: ['hiddenpowerfire']}],
			[{species: "Latias", ability: 'colorchange', moves: ['endure']}],
		]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Normal'));
	});

	it('should change Judgment to Normal-type even if the user is holding a Plate', function () {
		battle = common.gen(4).createBattle([
			[{species: "Delcatty", ability: 'normalize', item: 'pixieplate', moves: ['judgment']}],
			[{species: "Latias", ability: 'colorchange', moves: ['endure']}],
		]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Normal'));
	});

	it('should change Weather Ball to Normal-type even if sun, rain, or hail is an active weather', function () {
		battle = common.gen(4).createBattle([
			[{species: "Delcatty", ability: 'normalize', item: 'laggingtail', moves: ['weatherball']}],
			[{species: "Latias", ability: 'colorchange', moves: ['sunnyday']}],
		]);
		battle.commitDecisions();
		assert.ok(battle.p2.active[0].hasType('Normal'));
	});
});
