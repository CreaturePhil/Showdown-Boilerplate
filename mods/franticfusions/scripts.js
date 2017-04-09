'use strict';

exports.BattleScripts = {
	init: function()
	{
			Object.values(this.data.Abilities).forEach(ability => {
				let abi = {};
				let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
				for(let i in ability) abi[i] = ability[i];
				if(statusability[abi.id])
				{
					this.data.Statuses["other"+ability.id] = abi;
					this.data.Statuses["other"+ability.id].effectType = "Ability";
					this.data.Statuses["other"+ability.id]["name"] = "Other "+ability["name"];
					this.data.Statuses["other"+ability.id].noCopy = true;
					this.data.Statuses["other"+ability.id]["id"] = "other"+ability.id;
				}
				else
				{
					this.data.Statuses[ability.id] = abi;
					this.data.Statuses[ability.id].effectType = "Ability";
					this.data.Statuses[ability.id].noCopy = true;
				}
				this.data.Statuses.trace = {
					desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, and Zen Mode.",
					shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
					onUpdate: function (pokemon) {
						let possibleTargets = [];
						for (let i = 0; i < pokemon.side.foe.active.length; i++) {
							if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
						}
						while (possibleTargets.length) {
							let rand = 0;
							if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
							let target = possibleTargets[rand];
							let ability = this.getAbility(target.abilitwo);
							let bannedAbilities = {flowergift:1, forecast:1, illusion:1, imposter:1, multitype:1, stancechange:1, trace:1, zenmode:1};
							if (bannedAbilities[target.ability]) {
								possibleTargets.splice(rand, 1);
								continue;
							}
							this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
							let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
							let abe = statusability[ability.id] ? ("other"+ability.id) : ability.id;
							pokemon.removeVolatile("trace", pokemon);
							pokemon.addVolatile(abe, pokemon);
							return;
						}
					},
					id: "trace",
					name: "Trace",
					effectType: "Ability", 
					noCopy:true,
				};
		});
	},
	getZMove: function (move, pokemon, skipChecks, underlyingMove) {
		let item = pokemon.getItem();
		if (!skipChecks) {
			if (pokemon.side.zMoveUsed) return;
			if (!item.zMove) return;
			if (item.zMoveUser && !item.zMoveUser.includes(pokemon.species) && !item.zMoveUser.includes(pokemon.fusion)) return;
			let moveData = pokemon.getMoveData(move);
			if (!moveData || !moveData.pp) return; // Draining the PP of the base move prevents the corresponding Z-move from being used.
		}

		if (item.zMoveFrom) {
			if (move.name === item.zMoveFrom) return item.zMove;
		} else if (item.zMove === true) {
			if (move.type === item.zMoveType) {
				if (move.category === "Status") {
					return (underlyingMove ? '' : 'Z-') + move.name;
				} else {
					return this.zMoveTable[move.type];
				}
			}
		}
	},
	canZMove: function (pokemon) {
		if (pokemon.side.zMoveUsed) return;
		let item = pokemon.getItem();
		if (!item.zMove) return;
		if (item.zMoveUser && !item.zMoveUser.includes(pokemon.species) && !item.zMoveUser.includes(pokemon.fusion)) return;
		let atLeastOne = false;
		let zMoves = [];
		for (let i = 0; i < pokemon.moves.length; i++) {
			let move = this.getMove(pokemon.moves[i]);
			let zMoveName = this.getZMove(move, pokemon, true) || '';
			if (zMoveName) {
				let zMove = this.getMove(zMoveName);
				zMoves.push({move: zMoveName, target: zMove.target});
			} else {
				zMoves.push(null);
			}
			if (zMoveName) atLeastOne = true;
		}
		if (atLeastOne) return zMoves;
	},
	pokemon: {
		hasAbility: function(ability) {
			if (this.ignoringAbility()) return false;
			if (this.volatiles[ability] || this.volatiles["other"+ability]) return true;
			let ownAbility = this.ability;
			if (!Array.isArray(ability)) {
				return ownAbility === toId(ability);
			}
			return ability.map(toId).includes(ownAbility);
		}
	},
};
