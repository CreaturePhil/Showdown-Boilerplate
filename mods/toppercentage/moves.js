'use strict';

exports.BattleMovedex = {
    perishsong: {
        inherit: true,
        effect: {
            duration: 4,
            onEnd: function(target) {
                target.side.metaCount -= (100 * target.hp / target.maxhp);
                this.add('-start', target, 'perish0');
                console.log(target.id + ": " + target.side.metaCount);
                this.add('-message', target.id.slice(4) + ": " + Math.round(target.side.metaCount));
                target.faint();
                if (target.side.metaCount <= 0.1) {
                    this.win(target.side.foe);
                }
            },
            onResidual: function(pokemon) {
                let duration = pokemon.volatiles['perishsong'].duration;
                this.add('-start', pokemon, 'perish' + duration);
            }
        }
    },
    destinybond: {
        inherit: true,
        effect: {
            onFaint: function(target, source, effect) {
                if (!source || !effect) return;
                if (effect.effectType === 'Move' && !effect.isFutureMove) {
                    this.add('-activate', target, 'Destiny Bond');
                    source.faint();
                    console.log(source.id + ": " + source.side.metaCount);
                    this.add('-message', source.id.slice(4) + ": " + Math.round(source.side.metaCount));

                    if (source.side.metaCount <= 0.1) {
                        this.win(source.side.foe);
                    }
                }
            }
        }
    }
}
