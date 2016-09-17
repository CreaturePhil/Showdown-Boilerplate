'use strict';

exports.BattleMovedex = {
        "copycat": {
                num: 383,
                accuracy: true,
                basePower: 0,
                category: "Status",
                desc: "The user uses the last move used by any Pokemon, including itself. Fails if no move has been used, or if the last move used was Assist, Belch, Bestow, Chatter, Circle Throw, Copycat, Counter, Covet, Destiny Bond, Detect, Dragon Tail, Endure, Feint, Focus Punch, Follow Me, Helping Hand, Hold Hands, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Protect, Rage Powder, Roar, Sketch, Sleep Talk, Snatch, Spiky Shield, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
                shortDesc: "Uses the last move used in the battle.",
                id: "copycat",
                name: "Copycat",
                pp: 20,
                priority: 0,
                flags: {},
                onHit: function(pokemon) {
                        let noCopycat = {
                                assist: 1,
                                bestow: 1,
                                chatter: 1,
                                circlethrow: 1,
                                copycat: 1,
                                counter: 1,
                                covet: 1,
                                destinybond: 1,
                                detect: 1,
                                dragontail: 1,
                                endure: 1,
                                feint: 1,
                                focuspunch: 1,
                                followme: 1,
                                helpinghand: 1,
                                mefirst: 1,
                                metronome: 1,
                                mimic: 1,
                                mirrorcoat: 1,
                                mirrormove: 1,
                                naturepower: 1,
                                protect: 1,
                                ragepowder: 1,
                                roar: 1,
                                sketch: 1,
                                sleeptalk: 1,
                                snatch: 1,
                                struggle: 1,
                                switcheroo: 1,
                                thief: 1,
                                transform: 1,
                                trick: 1,
                                whirlwind: 1
                        };
                        if (pokemon.ability == "copycat") {
                                noCopycat.batonpass = 1;
                                noCopycat.partingshot = 1;
                        }
                        if (!this.lastMove || noCopycat[this.lastMove]) {
                                return false;
                        }
                        this.useMove(this.lastMove, pokemon);
                },
                secondary: false,
                target: "self",
                type: "Normal",
                contestType: "Cute",
        },
        "batonpass": {
                num: 226,
                accuracy: true,
                basePower: 0,
                category: "Status",
                desc: "The user is replaced with another Pokemon in its party. The selected Pokemon has the user's stat stage changes, confusion, and certain move effects transferred to it.",
                shortDesc: "User switches, passing stat changes and more.",
                id: "batonpass",
                isViable: true,
                name: "Baton Pass",
                pp: 40,
                priority: 0,
                flags: {},
                selfSwitch: 'copyvolatile',
                onAfterMove: function(pokemon)
                {
                    this[pokemon.side.id].lastPshot=this.turn;
                },
                onTryHit: function(target)
                {
                    let oppside;
                    if(target.side.id=='p1')oppside='p2';
                    if(target.side.id=='p2')oppside='p1';
                    if(this[oppside].lastPshot==this.turn)
                        return false;
                },
                secondary: false,
                target: "self",
                type: "Normal",
                contestType: "Cute",
        },
        "partingshot": {
                num: 575,
                accuracy: 100,
                basePower: 0,
                category: "Status",
                desc: "Lowers the target's Attack and Special Attack by 1 stage. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
                shortDesc: "Lowers target's Atk, Sp. Atk by 1. User switches.",
                id: "partingshot",
                isViable: true,
                name: "Parting Shot",
                pp: 20,
                priority: 0,
                flags: {
                        protect: 1,
                        reflectable: 1,
                        mirror: 1,
                        sound: 1,
                        authentic: 1
                },
                selfSwitch: true,
                boosts: {
                        atk: -1,
                        spa: -1,
                },
                onAfterMove: function(pokemon)
                {
                    this[pokemon.side.id].lastPshot=this.turn;
                },
                onTryHit: function(target)
                {
                    let oppside;
                    if(target.side.id='p1')oppside='p2';
                    if(target.side.id='p2')oppside='p1';
                    if(this[oppside].lastPshot==this.turn)
                        return false;
                },
                secondary: false,
                target: "normal",
                type: "Dark",
                contestType: "Cool",
        },
};
