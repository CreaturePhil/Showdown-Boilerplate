/*

List of flags and their descriptions:

authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
bullet: Has no effect on Pokemon with the Ability Bulletproof.
charge: The user is unable to make a move between turns.
contact: Makes contact.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Ability Overcoat, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Ability Mega Launcher.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Ability Iron Fist.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Ability Magic Bounce.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Ability Soundproof.

*/

'use strict';

exports.BattleMovedex = {
	"rock": {
		num: 1000,
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Ability Sturdy are immune.",
		shortDesc: "OHKOs the target. Fails if user is a lower level.",
		id: "rock",
		name: "Rock",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		ohko: true,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	"paper": {
		num: 1001,
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Ability Sturdy are immune.",
		shortDesc: "OHKOs the target. Fails if user is a lower level.",
		id: "paper",
		name: "Paper",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		ohko: true,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	"scissors": {
		num: 1002,
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Ability Sturdy are immune.",
		shortDesc: "OHKOs the target. Fails if user is a lower level.",
		id: "scissors",
		name: "Scissors",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		ohko: true,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},

};
