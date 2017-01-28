'use strict';

exports.BattleMovedex = {
    perishsong: {
        inherit: true,
        effect: {
            duration: 4,
            onEnd: function (target) {
                this.add('-start', target, 'perish0');
                if(!target.devolve()) target.faint();
            },
            onResidual: function (pokemon) {
                let duration = pokemon.volatiles['perishsong'].duration;
                this.add('-start', pokemon, 'perish' + duration);
            },
        },
    },
    destinybond: {
        inherit: true,
        effect: {
            onStart: function (pokemon) {
                this.add('-singlemove', pokemon, 'Destiny Bond');
            },
            onFaint: function (target, source, effect) {
                if (!source || !effect || target.side === source.side) return;
                if (effect.effectType === 'Move' && !effect.isFutureMove) {
                    this.add('-activate', target, 'move: Destiny Bond');
                    if(!source.devolve()) source.faint();
                }
            },
            onBeforeMovePriority: -1,
            onBeforeMove: function (pokemon, target, move) {
                if (move.id === 'destinybond') return;
                this.debug('removing Destiny Bond before attack');
                pokemon.removeVolatile('destinybond');
            },
            onMoveAborted: function (pokemon, target, move) {
                pokemon.removeVolatile('destinybond');
            },
            onBeforeSwitchOutPriority: 1,
            onBeforeSwitchOut: function (pokemon) {
                pokemon.removeVolatile('destinybond');
            },
        },
    }
};