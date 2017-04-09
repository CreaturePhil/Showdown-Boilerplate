'use strict';

exports.BattleScripts = {
    init: function()
    	{
    			Object.values(this.data.Abilities).forEach(ability => {
    				if(ability.id=="trace")
    				{
    					this.data.Statuses["trace"] = {
							onUpdate: function (pokemon) {
								let possibleTargets = [];
								for (let i = 0; i < pokemon.side.foe.active.length; i++) {
									if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
								}
								while (possibleTargets.length) {
									let rand = 0;
									if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
									let target = possibleTargets[rand];
									let ability = this.getAbility(target.innate);
									let bannedAbilities = {flowergift:1, forecast:1, illusion:1, imposter:1, multitype:1, stancechange:1, trace:1, zenmode:1};
									if (bannedAbilities[target.innate]) {
										possibleTargets.splice(rand, 1);
										continue;
									}
									this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
									pokemon.removeVolatile(pokemon.innate);
									pokemon.innate = ability.id;
									pokemon.addVolatile(ability.id);
									return;
								}
							},
							id: "trace",
							name: "Trace",
							effectType: "Ability",
						}
    				}
    				else
    				{
    					this.data.Statuses[ability.id] = ability;
    					this.data.Statuses[ability.id].effectType = "Ability";
    				}
    			});
    	},
      useMove: function (move, pokemon, target, sourceEffect) {
        if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
    		move = this.getMoveCopy(move);
    		if (this.activeMove) move.priority = this.activeMove.priority;
    		let baseTarget = move.target;
    		if (!target && target !== false) target = this.resolveTarget(pokemon, move);
    		if (move.target === 'self' || move.target === 'allies') {
    			target = pokemon;
    		}
    		if (sourceEffect) move.sourceEffect = sourceEffect.id;
    		let moveResult = false;

    		this.setActiveMove(move, pokemon, target);

    		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
    		if (baseTarget !== move.target) {
    			// Target changed in ModifyMove, so we must adjust it here
    			// Adjust before the next event so the correct target is passed to the
    			// event
    			target = this.resolveTarget(pokemon, move);
    		}
    		move = this.runEvent('ModifyMove', pokemon, target, move, move);
    		if (baseTarget !== move.target) {
    			// Adjust again
    			target = this.resolveTarget(pokemon, move);
    		}
    		if (!move) return false;

    		let attrs = '';
    		if (pokemon.fainted) {
    			return false;
    		}

    		if (move.flags['charge'] && !pokemon.volatiles[move.id]) {
    			attrs = '|[still]'; // suppress the default move animation
    		}

    		let movename = move.name;
    		if (move.id === 'hiddenpower') movename = 'Hidden Power';
    		if (sourceEffect) attrs += '|[from]' + this.getEffect(sourceEffect);
    		this.addMove('move', pokemon, movename, target + attrs);

    		if (target === false) {
    			this.attrLastMove('[notarget]');
    			this.add('-notarget');
    			if (move.target === 'normal') pokemon.isStaleCon = 0;
    			return true;
    		}

    		let targets = pokemon.getMoveTargets(move, target);

    		if (!sourceEffect) {
    			let extraPP = 0;
    			for (let i = 0; i < targets.length; i++) {
    				let ppDrop = this.singleEvent('DeductPP', targets[i].getAbility(), targets[i].abilityData, targets[i], pokemon, move);
    				if (ppDrop !== true) {
    					extraPP += ppDrop || 0;
    				}
    			}
    			if (extraPP > 0) {
    				pokemon.deductPP(move, extraPP);
    			}
    		}

    		if (!this.runEvent('TryMove', pokemon, target, move)) {
    			return true;
    		}

    		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

    		if (move.ignoreImmunity === undefined) {
    			move.ignoreImmunity = (move.category === 'Status');
    		}

    		let damage = false;
    		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
    			damage = this.tryMoveHit(target, pokemon, move);
    			if (damage || damage === 0 || damage === undefined) moveResult = true;
    		} else if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes') {
    			if (move.selfdestruct) {
    				this.faint(pokemon, pokemon, move);
    			}
    			if (!targets.length) {
    				this.attrLastMove('[notarget]');
    				this.add('-notarget');
    				return true;
    			}
    			if (targets.length > 1) move.spreadHit = true;
    			damage = 0;
    			let hitTargets = [];
    			for (let i = 0; i < targets.length; i++) {
    				let hitResult = this.tryMoveHit(targets[i], pokemon, move, true);
    				if (hitResult || hitResult === 0 || hitResult === undefined) {
    					moveResult = true;
    					hitTargets.push(targets[i].toString().substr(0, 3));
    				}
    				damage += hitResult || 0;
    			}
    			if (move.spreadHit) this.attrLastMove('[spread] ' + hitTargets.join(','));
    			if (!pokemon.hp) pokemon.faint();
    		} else {
    			target = targets[0];
    			let lacksTarget = target.fainted;
    			if (!lacksTarget) {
    				if (move.target === 'adjacentFoe' || move.target === 'adjacentAlly' || move.target === 'normal' || move.target === 'randomNormal') {
    					lacksTarget = !this.isAdjacent(target, pokemon);
    				}
    			}
    			if (lacksTarget) {
    				this.attrLastMove('[notarget]');
    				this.add('-notarget');
    				if (move.target === 'normal') pokemon.isStaleCon = 0;
    				return true;
    			}
    			damage = this.tryMoveHit(target, pokemon, move);
    			if (damage || damage === 0 || damage === undefined) moveResult = true;
    		}
    		if (!pokemon.hp) {
    			this.faint(pokemon, pokemon, move);
    		}

    		if (!moveResult) {
    			this.singleEvent('MoveFail', move, null, target, pokemon, move);
    			return true;
    		}

    		if (move.selfdestruct) {
    			this.faint(pokemon, pokemon, move);
    		}
        if (!move.negateSecondary && !(pokemon.hasAbility('sheerforce') && pokemon.volatiles['sheerforc'])) {
  			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
  			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
  		}
  		return true;
  	},
      tryMoveHit: function (target, pokemon, move, spreadHit) {
        if (move.selfdestruct && spreadHit) pokemon.hp = 0;

        this.setActiveMove(move, pokemon, target);
        let hitResult = true;

        hitResult = this.singleEvent('PrepareHit', move, {}, target, pokemon, move);
        if (!hitResult) {
          if (hitResult === false) this.add('-fail', target);
          return false;
        }
        this.runEvent('PrepareHit', pokemon, target, move);

        if (!this.singleEvent('Try', move, null, pokemon, target, move)) {
          return false;
        }

        if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
          if (move.target === 'all') {
            hitResult = this.runEvent('TryHitField', target, pokemon, move);
          } else {
            hitResult = this.runEvent('TryHitSide', target, pokemon, move);
          }
          if (!hitResult) {
            if (hitResult === false) this.add('-fail', target);
            return true;
          }
          return this.moveHit(target, pokemon, move);
        }

        if (move.ignoreImmunity === undefined) {
          move.ignoreImmunity = (move.category === 'Status');
        }

        if (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type] && !target.runImmunity(move.type, true)) {
          return false;
        }

        if (move.flags['powder'] && target !== pokemon && !this.getImmunity('powder', target)) {
          this.debug('natural powder immunity');
          this.add('-immune', target, '[msg]');
          return false;
        }

        hitResult = this.runEvent('TryHit', target, pokemon, move);
        if (!hitResult) {
          if (hitResult === false) this.add('-fail', target);
          return false;
        }

        let boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

        // calculate true accuracy
        let accuracy = move.accuracy;
        let boosts, boost;
        if (accuracy !== true) {
          if (!move.ignoreAccuracy) {
            boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
            boost = this.clampIntRange(boosts['accuracy'], -6, 6);
            if (boost > 0) {
              accuracy *= boostTable[boost];
            } else {
              accuracy /= boostTable[-boost];
            }
          }
          if (!move.ignoreEvasion) {
            boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
            boost = this.clampIntRange(boosts['evasion'], -6, 6);
            if (boost > 0) {
              accuracy /= boostTable[boost];
            } else if (boost < 0) {
              accuracy *= boostTable[-boost];
            }
          }
        }
        if (move.ohko) { // bypasses accuracy modifiers
          if (!target.isSemiInvulnerable()) {
            accuracy = 30;
            if (pokemon.level >= target.level) {
              accuracy += (pokemon.level - target.level);
            } else {
              this.add('-immune', target, '[ohko]');
              return false;
            }
          }
        } else {
          accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
        }
        if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
          accuracy = true; // bypasses ohko accuracy modifiers
        } else {
          accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
        }
        if (accuracy !== true && this.random(100) >= accuracy) {
          if (!move.spreadHit) this.attrLastMove('[miss]');
          this.add('-miss', pokemon, target);
          return false;
        }

        if (move.breaksProtect) {
          let broke = false;
          for (let i in {kingsshield:1, protect:1, spikyshield:1}) {
            if (target.removeVolatile(i)) broke = true;
          }
          if (this.gen >= 6 || target.side !== pokemon.side) {
            for (let i in {craftyshield:1, matblock:1, quickguard:1, wideguard:1}) {
              if (target.side.removeSideCondition(i)) broke = true;
            }
          }
          if (broke) {
            if (move.id === 'feint') {
              this.add('-activate', target, 'move: Feint');
            } else {
              this.add('-activate', target, 'move: ' + move.name, '[broken]');
            }
          }
        }

        let totalDamage = 0;
        let damage = 0;
        pokemon.lastDamage = 0;
        if (move.multihit) {
          let hits = move.multihit;
          if (hits.length) {
            // yes, it's hardcoded... meh
            if (hits[0] === 2 && hits[1] === 5) {
              if (this.gen >= 5) {
                hits = [2, 2, 3, 3, 4, 5][this.random(6)];
              } else {
                hits = [2, 2, 2, 3, 3, 3, 4, 5][this.random(8)];
              }
            } else {
              hits = this.random(hits[0], hits[1] + 1);
            }
          }
          hits = Math.floor(hits);
          let nullDamage = true;
          let moveDamage;
          // There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
          let isSleepUsable = move.sleepUsable || this.getMove(move.sourceEffect).sleepUsable;
          let i;
          for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
            if (pokemon.status === 'slp' && !isSleepUsable) break;

            if (move.multiaccuracy && i > 0) {
              accuracy = move.accuracy;
              if (accuracy !== true) {
                if (!move.ignoreAccuracy) {
                  boosts = this.runEvent('ModifyBoost', pokemon, null, null, Object.assign({}, pokemon.boosts));
                  boost = this.clampIntRange(boosts['accuracy'], -6, 6);
                  if (boost > 0) {
                    accuracy *= boostTable[boost];
                  } else {
                    accuracy /= boostTable[-boost];
                  }
                }
                if (!move.ignoreEvasion) {
                  boosts = this.runEvent('ModifyBoost', target, null, null, Object.assign({}, target.boosts));
                  boost = this.clampIntRange(boosts['evasion'], -6, 6);
                  if (boost > 0) {
                    accuracy /= boostTable[boost];
                  } else if (boost < 0) {
                    accuracy *= boostTable[-boost];
                  }
                }
              }
              accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
              if (!move.alwaysHit) {
                accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
                if (accuracy !== true && this.random(100) >= accuracy) break;
              }
            }

            moveDamage = this.moveHit(target, pokemon, move);
            if (moveDamage === false) break;
            if (nullDamage && (moveDamage || moveDamage === 0 || moveDamage === undefined)) nullDamage = false;
            // Damage from each hit is individually counted for the
            // purposes of Counter, Metal Burst, and Mirror Coat.
            damage = (moveDamage || 0);
            // Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
            totalDamage += damage;
            this.eachEvent('Update');
          }
          if (i === 0) return true;
          if (nullDamage) damage = false;
          this.add('-hitcount', target, i);
        } else {
          damage = this.moveHit(target, pokemon, move);
          totalDamage = damage;
        }

        if (move.recoil && totalDamage) {
          this.damage(this.calcRecoilDamage(totalDamage, move), pokemon, target, 'recoil');
        }

        if (move.struggleRecoil) {
          this.directDamage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1), pokemon, pokemon, {id: 'strugglerecoil'});
        }

        if (target && pokemon !== target) target.gotAttacked(move, damage, pokemon);

        if (move.ohko) this.add('-ohko');

        if (!damage && damage !== 0) return damage;

        if (target && !move.negateSecondary && !(pokemon.hasAbility('sheerforce') && pokemon.volatiles['sheerforc'])) {
    			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
    			this.runEvent('AfterMoveSecondary', target, pokemon, move);
    		}

    		return damage;
    	},
}
