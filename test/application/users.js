'use strict';

const assert = require('assert');

let userUtils = require('./../../dev-tools/users-utils.js');
let Connection = userUtils.Connection;
let User = userUtils.User;

describe('Users features', function () {
	describe('Users', function () {
		describe('get', function () {
			it('should be a function', function () {
				assert.strictEqual(typeof Users.get, 'function');
			});

			it('should be equal to `Users`', function () {
				assert.strictEqual(Users.get, Users);
			});
		});
		describe('users', function () {
			it('should have null prototype', function () {
				assert.strictEqual(Object.getPrototypeOf(Users.users), null);
			});

			it('should not have a native `constructor`', function () {
				assert.ok(Users.users.constructor === undefined || Users.users.constructor instanceof Users.User);
			});
		});
		describe('User', function () {
			describe('#disconnectAll', function () {
				[1, 2].forEach(function (totalConnections) {
					it('should drop all ' + totalConnections + ' connection(s) and mark as inactive', function () {
						let user = new User();
						let iterations = totalConnections;
						while (--iterations) user.mergeConnection(new Connection());

						user.disconnectAll();
						assert.strictEqual(user.connections.length, 0);
						assert.strictEqual(user.connected, false);
					});

					it('should unref all ' + totalConnections + ' connection(s)', function () {
						let user = new User();
						let iterations = totalConnections;
						while (--iterations) user.mergeConnection(new Connection());

						let connections = user.connections.slice();

						user.disconnectAll();
						for (let i = 0; i < totalConnections; i++) {
							assert.strictEqual(Users.connections[connections[i].id], undefined);
						}
					});

					it('should clear `user` property for all ' + totalConnections + ' connection(s)', function () {
						let user = new User();
						let iterations = totalConnections;
						while (--iterations) user.mergeConnection(new Connection());
						let connections = user.connections.slice();

						user.disconnectAll();
						for (let i = 0; i < totalConnections; i++) {
							assert.strictEqual(connections[i].user, null);
						}
					});
				});
			});
			describe('#ban', function () {
				afterEach(function () {
					for (let ip in Users.bannedIps) {
						delete Users.bannedIps[ip];
					}
				});

				it('should disconnect every user at that IP', function () {
					let users = ['127.0.0.1', '127.0.0.1'].map(function (ip) {return new User(new Connection(ip));});
					users[0].ban();
					assert.strictEqual(users[0].connected, false);
					assert.strictEqual(users[1].connected, false);
				});

				it('should not disconnect users at other IPs', function () {
					let users = ['127.0.0.1', '127.0.0.2'].map(function (ip) {return new User(new Connection(ip));});
					users[0].ban();
					assert.strictEqual(users[1].connected, true);
				});

				it('should update IP count properly', function () {
					let user = new User();
					user.ban();
					for (let ip in user.ips) {
						assert.strictEqual(user.ips[ip], 0);
					}
				});
			});
		});
	});
});
