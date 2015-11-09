'use strict';

const assert = require('assert');

let userUtils = require('./../../dev-tools/users-utils.js');
let User = userUtils.User;

describe('Rooms features', function () {
	describe('Rooms', function () {
		describe('Rooms.get', function () {
			it('should be a function', function () {
				assert.strictEqual(typeof Rooms.get, 'function');
			});

			it('should be equal to `Rooms`', function () {
				assert.strictEqual(Rooms.get, Rooms);
			});
		});
		describe('Rooms.rooms', function () {
			it('should have null prototype', function () {
				assert.strictEqual(Object.getPrototypeOf(Rooms.rooms), null);
			});

			it('should not have a native `constructor`', function () {
				assert.ok(Rooms.rooms.constructor === undefined || Rooms.rooms.constructor instanceof Rooms.Room);
			});
		});
	});

	describe('BattleRoom', function () {
		let room;
		afterEach(function () {
			if (room) room.expire();
		});

		it('should allow two users to join the battle', function () {
			let p1 = new User();
			let p2 = new User();
			let packedTeam = 'Weavile||lifeorb||swordsdance,knockoff,iceshard,iciclecrash|Jolly|,252,,,4,252|||||';
			let options = [{rated: false, tour: false}, {rated: false, tour: true}, {rated: true, tour: false}, {rated: true, tour: true}];
			options.forEach(function (option) {
				room = Rooms.global.startBattle(p1, p2, 'customgame', packedTeam, packedTeam, option);
				if (room.active) return assert.ok(room.battle.players.none(null)); // Automatically joined
				assert.ok(room.joinBattle(p1, packedTeam));
				assert.ok(room.joinBattle(p2, packedTeam));
			});
		});
	});
});
