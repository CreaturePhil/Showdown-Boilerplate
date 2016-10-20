'use strict';

exports.BattleScripts = {
	init: function()
	{
			Object.values(this.data.Abilities).forEach(ability => {
				this.data.Statuses["poke"+ability.id] = ability;
				this.data.Statuses["poke"+ability.id] = "poke"+ability.id;
				this.data.Statuses["poke"+ability.name] = "Pokebility "+ability.name;
				this.data.Statuses["poke"+ability.id].effectType = "Ability";
				this.data.Statuses["poke"+ability.id].noCopy = true;
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
			if ((this.hasAbility('levitate') || this.volatiles["pokelevitate"]) && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		}
	},
};
