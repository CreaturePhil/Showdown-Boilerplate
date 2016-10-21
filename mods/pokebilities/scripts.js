'use strict';

exports.BattleScripts = {
	init: function()
	{
			Object.values(this.data.Abilities).forEach(ability => {
				//let statusability = {"aerilate":true,"aurabreak":true,"flashfire":true,"parentalbond":true,"pixilate":true,"refrigerate":true,"sheerforce":true,"slowstart":true,"truant":true,"unburden":true,"zenmode":true}
				this.data.Statuses[ability.id] = ability;
				this.data.Statuses[ability.id].effectType = "Ability";
				this.data.Statuses[ability.id].noCopy = true;
				this.data.Statuses[ability.id]["id"] = "other"+ability.id;
				this.data.Statuses[ability.id]["name"] = "Other "+ability.name;
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
