'use strict';
 
exports.BattleMovedex = {
skydrop: {
        inherit: true,
        onTryHit: function (target, source, move) {
            if (target.fainted) return false;
            if (source.removeVolatile(move.id)) {
                if (target !== source.volatiles['twoturnmove'].source) return false;
            } else {
                if (target.volatiles['substitute'] || target.side === source.side) {
                    return false;
                }
                if (target.getWeight() >= 200) {
                    this.add('-fail', target, 'move: Sky Drop', '[heavy]');
                    return null;
                }
 
                this.add('-prepare', source, move.name, target);
                source.addVolatile('twoturnmove', target);
                return null;
            }
        },
    },
spikes: {
        inherit: true,
        effect: {
            // this is a side condition
            onStart: function (side) {
                this.add('-sidestart', side, 'Spikes');
                this.effectData.layers = 1;
            },
            onRestart: function (side) {
                if (this.effectData.layers >= 3) return false;
                this.add('-sidestart', side, 'Spikes');
                this.effectData.layers++;
            },
            onSwitchIn: function (pokemon) {
                if (!pokemon.isGrounded() && !pokemon.hasType('Flying')) return;
                let damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
                this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
            },
        },
},
toxicspikes: {
        inherit: true,
        effect: {
            // this is a side condition
            onStart: function (side) {
                this.add('-sidestart', side, 'move: Toxic Spikes');
                this.effectData.layers = 1;
            },
            onRestart: function (side) {
                if (this.effectData.layers >= 2) return false;
                this.add('-sidestart', side, 'move: Toxic Spikes');
                this.effectData.layers++;
            },
            onSwitchIn: function (pokemon) {
                if (!pokemon.isGrounded() && !pokemon.hasType('Flying')) return;
                if (!pokemon.runImmunity('Poison')) return;
                if (pokemon.hasType('Poison')) {
                    this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
                    pokemon.side.removeSideCondition('toxicspikes');
                } else if (this.effectData.layers >= 2) {
                    pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
                } else {
                    pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
                }
            },
        },
},
stickyweb: {
        inherit: true,
        effect: {
            onStart: function (side) {
                this.add('-sidestart', side, 'move: Sticky Web');
            },
            onSwitchIn: function (pokemon) {
                if (!pokemon.isGrounded() && !pokemon.hasType('Flying')) return;
                this.add('-activate', pokemon, 'move: Sticky Web');
                this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.getMove('stickyweb'));
            },
        },
},
leechseed: {
        inherit: true,
        onTryHit: function (target) {
            return undefined;
        },
},
};
