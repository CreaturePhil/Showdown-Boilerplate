'use strict';

const baseAssert = require('assert');
const AssertionError = baseAssert.AssertionError;

const assert = exports = module.exports = function assert(value, message) {
	return baseAssert(value, message);
};
Object.assign(assert, baseAssert);

assert.bounded = function (value, range, message) {
	if (value >= range[0] && value <= range[1]) return;
	throw new AssertionError({
		actual: value,
		expected: `[${value[0]}, ${value[1]}]`,
		operator: '\u2208',
		message: message,
		stackStartFunction: assert.bounded,
	});
};

assert.atLeast = function (value, threshold, message) {
	if (value >= threshold) return;
	throw new AssertionError({
		actual: value,
		expected: `${threshold}`,
		operator: '>=',
		message: message,
		stackStartFunction: assert.atLeast,
	});
};

assert.atMost = function (value, threshold, message) {
	if (value <= threshold) return;
	throw new AssertionError({
		actual: value,
		expected: `${threshold}`,
		operator: '<=',
		message: message,
		stackStartFunction: assert.atMost,
	});
};

assert.species = function (pokemon, species, message) {
	const actual = pokemon.template.species;
	if (actual === species) return;
	throw new AssertionError({
		message: message || `Expected ${pokemon} species to be ${species}, not ${actual}.`,
		stackStartFunction: assert.species,
	});
};

assert.fainted = function (pokemon, message) {
	if (!pokemon.hp) return;
	throw new AssertionError({
		message: message || `Expected ${pokemon} to be fainted.`,
		stackStartFunction: assert.fainted,
	});
};

assert.fullHP = function (pokemon, message) {
	if (pokemon.hp === pokemon.maxhp) return;
	throw new AssertionError({
		message: message || `Expected ${pokemon} to be fully healed, not at ${pokemon.hp}/${pokemon.maxhp}.`,
		stackStartFunction: assert.fullHP,
	});
};

assert.holdsItem = function (pokemon, message) {
	if (pokemon.item) return;
	throw new AssertionError({
		message: message || `Expected ${pokemon} to hold an item`,
		stackStartFunction: assert.holdsItem,
	});
};

assert.statStage = function (pokemon, statName, stage, message) {
	const actual = pokemon.boosts[statName];
	if (actual === stage) return;
	throw new AssertionError({
		message: message || `Expected ${pokemon}'s ${statName} at stage ${stage}, not at ${actual}.`,
		stackStartFunction: assert.statStage,
	});
};

assert.hurts = function (pokemon, fn, message) {
	const prevHP = pokemon.hp;
	fn();
	if (pokemon.hp < prevHP) return;
	throw new AssertionError({
		actual: pokemon.hp,
		expected: `${prevHP}`,
		operator: '<',
		message: message || `Expected ${pokemon} to be hurt.`,
		stackStartFunction: assert.hurts,
	});
};

assert.hurtsBy = function (pokemon, damage, fn, message) {
	// Support of healing effects is intentional.
	const prevHP = pokemon.hp;
	fn();
	const actual = prevHP - pokemon.hp;
	if (actual === damage) return;
	throw new AssertionError({
		actual: actual,
		expected: damage,
		operator: '===',
		message: message || `Expected ${pokemon} to be hurt by ${damage}, not by ${actual}.`,
		stackStartFunction: assert.hurtsBy,
	});
};

assert.constant = function (getter, fn, message) {
	const initialValue = getter();
	fn();
	const finalValue = getter();
	if (finalValue === initialValue) return;
	throw new AssertionError({
		message: message || `Expected value to remain as ${initialValue}, not to change to ${finalValue}.`,
		stackStartFunction: assert.constant,
	});
};

assert.sets = function (getter, value, fn, message) {
	assert.notStrictEqual(getter(), value, `Function was prematurely equal to ${value}.`);
	fn();
	const finalValue = getter();
	if (finalValue === value) return;
	throw new AssertionError({
		actual: finalValue,
		expected: value,
		operator: '===',
		message: message,
		stackStartFunction: assert.sets,
	});
};

const assertMethods = Object.getOwnPropertyNames(assert).concat(Object.getOwnPropertyNames(baseAssert)).filter(methodName => {
	return methodName !== 'constructor' && methodName !== 'AssertionError' && typeof assert[methodName] === 'function';
});
assert.false = function (value, message) {
	if (!value) return;
	throw new AssertionError({
		actual: `!${value}`,
		expected: true,
		operator: '===',
		message: message,
		stackStartFunction: assert.false,
	});
};
for (let methodName of assertMethods) {
	const lastArgIndex = assert[methodName].length - 1;
	assert.false[methodName] = function () {
		try {
			assert[methodName].apply(null, arguments);
		} catch (err) {
			return;
		}
		throw new AssertionError({
			message: lastArgIndex < arguments.length ? arguments[lastArgIndex] : `Expected '${methodName}' assertion to fail.`,
			stackStartFunction: assert.false[methodName],
		});
	};
}
