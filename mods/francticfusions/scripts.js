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
							if (bannedAbilities[ability]) {
								possibleTargets.splice(rand, 1);
								continue;
							}
							this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
							let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true};
							let sec = statusability[pokemon.abilitwo]? "other"+pokemon.abilitwo : pokemon.abilitwo;
							pokemon.addVolatile(sec, pokemon);
							return;
						}
					},
					id: "trace",
					name: "Trace",
					rating: 3,
					num: 36,
					effectType: "Ability", 
					noCopy: true
				};
			});
	},
	pokemon: {
		isGrounded(negateImmunity) {
			if ('gravity' in this.battle.pseudoWeather) return true;
			if ('ingrain' in this.volatiles) return true;
			if ('smackdown' in this.volatiles) return true;
			let item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			if (!negateImmunity && this.hasType('Flying')) return false;
			if ((this.hasAbility('levitate') || this.volatiles["otherlevitate"]) && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		}
	},
};
