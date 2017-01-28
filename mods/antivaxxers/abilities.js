'use strict';
 
exports.BattleAbilities = {
"arenatrap": {
        inherit: true,
        onFoeTrapPokemon: function (pokemon) {
            if (!this.isAdjacent(pokemon, this.effectData.target)) return;
            if (pokemon.isGrounded() || pokemon.hasType('Flying')) {
                pokemon.tryTrap(true);
            }
        },
        onFoeMaybeTrapPokemon: function (pokemon, source) {
            if (!source) source = this.effectData.target;
            if (!this.isAdjacent(pokemon, source)) return;
            if (pokemon.isGrounded() || pokemon.hasType('Flying')) {
                pokemon.maybeTrapped = true;
            }
        },
    },
};
