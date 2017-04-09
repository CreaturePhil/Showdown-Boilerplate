'use strict';

exports.BattleMovedex = {
	"acrobatics": {
		num: 512,
		accuracy: 100,
		basePower: 55,
		basePowerCallback: function (pokemon, target, move) {
			if (!pokemon.item && !pokemon.ability) {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		desc: "Power doubles if the user has no held item.",
		shortDesc: "Power doubles if the user has no held item.",
		id: "acrobatics",
		isViable: true,
		name: "Acrobatics",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		secondary: false,
		target: "any",
		type: "Flying",
		zMovePower: 100,
		contestType: "Cool",
	},
	"incinerate": {
		num: 510,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "The target loses its held item if it is a Berry or a Gem. This move cannot cause Pokemon with the Ability Sticky Hold to lose their held item. Items lost to this move cannot be regained with Recycle or the Ability Harvest.",
		shortDesc: "Destroys the foe(s) Berry/Gem.",
		id: "incinerate",
		name: "Incinerate",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (pokemon, source) {
			let item = pokemon.getItem(), item2 = pokemon.getAbility();
			if ((item.isBerry || item.isGem) && pokemon.takeItem(source)) {
				this.add('-enditem', pokemon, item.name, '[from] move: Incinerate');
			}
			if ((item2.isBerry || item2.isGem) && pokemon.takeItem(source)) {
				this.add('-enditem', pokemon, item2.name, '[from] move: Incinerate');
			}
		},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Fire",
		zMovePower: 120,
		contestType: "Tough",
	},
	"judgment": {
		num: 449,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move's type depends on the user's held Plate.",
		shortDesc: "Type varies based on the held Plate.",
		id: "judgment",
		isViable: true,
		name: "Judgment",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			const item = pokemon.getItem(), item2 = pokemon.getAbility();
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate;
				return;
			}
			if (item2.id && item2.onPlate && !item2.zMove) {
				move.type = item2.onPlate;
			}
		},
		secondary: false,
		target: "normal",
		type: "Normal",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"knockoff": {
		num: 282,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "If the target is holding an item that can be removed from it, ignoring the Ability Sticky Hold, this move's power is multiplied by 1.5. If the user has not fainted, the target loses its held item. This move cannot remove Z-Crystals, cause Pokemon with the Ability Sticky Hold to lose their held item, cause Pokemon that can Mega Evolve to lose the Mega Stone for their species, or cause a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, or a Silvally to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, or Memory respectively. Items lost to this move cannot be regained with Recycle or the Ability Harvest.",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "knockoff",
		isViable: true,
		name: "Knock Off",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, source, target, move) {
			let item = target.getItem(), item2 = target.getAbility();
			if (!this.singleEvent('TakeItem', item, {id: item.id, 'target': target}, target, source, move, item) && !this.singleEvent('TakeItem', item2, {id: item2.id, 'target': target}, target, source, move, item2)) return;
			if (item2.id || item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
				let item2 = target.takeItem();
				if (item2) {
					this.add('-enditem', target, item2.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 120,
		contestType: "Clever",
	},
	"recycle": {
		num: 278,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user regains the item it last used, if it is not holding an item. Fails if the user was not holding an item, if the item was a popped Air Balloon, if the item was picked up by a Pokemon with the Ability Pickup, or if the item was lost to Bug Bite, Covet, Incinerate, Knock Off, Pluck, or Thief. Items thrown with Fling can be regained.",
		shortDesc: "Restores the item the user last used.",
		id: "recycle",
		name: "Recycle",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onHit: function (pokemon) {
			if ((pokemon.item || !pokemon.lastItem) && (pokemon.ability || !pokemon.lastItem2)) return false;
			pokemon.setItem(pokemon.lastItem);
			this.add('-item', pokemon, pokemon.getItem(), '[from] move: Recycle');
			pokemon.setItem(pokemon.lastItem2, pokemon, {item2: true});
			this.add('-item', pokemon, pokemon.getAbility(), '[from] move: Recycle');
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {spe: 2},
		contestType: "Clever",
	},
};