'use strict';

exports.BattleScripts = {
	init: function () {
		Object.values(this.data.Items).forEach(item => {
			if (this.data.Abilities[item.id]) return;
			this.data.Abilities[item.id] = Object.assign({}, item);
			this.data.Abilities[item.id].effectType = 'Item';
			this.data.Abilities[item.id].isSecond = true;
		});
	},
	nextTurn: function () {
		this.turn++;
		let allStale = true;
		let oneStale = false;
		for (let i = 0; i < this.sides.length; i++) {
			for (let j = 0; j < this.sides[i].active.length; j++) {
				let pokemon = this.sides[i].active[j];
				if (!pokemon) continue;
				pokemon.moveThisTurn = '';
				pokemon.usedItemThisTurn = false;
				pokemon.newlySwitched = false;

				pokemon.maybeDisabled = false;
				for (let entry of pokemon.moveset) {
					entry.disabled = false;
					entry.disabledSource = '';
				}
				this.runEvent('DisableMove', pokemon);
				if (!pokemon.ateBerry) pokemon.disableMove('belch');

				if (pokemon.lastAttackedBy) {
					if (pokemon.lastAttackedBy.pokemon.isActive) {
						pokemon.lastAttackedBy.thisTurn = false;
					} else {
						pokemon.lastAttackedBy = null;
					}
				}

				pokemon.trapped = pokemon.maybeTrapped = false;
				this.runEvent('TrapPokemon', pokemon);
				if (!pokemon.knownType || this.getImmunity('trapped', pokemon)) {
					this.runEvent('MaybeTrapPokemon', pokemon);
				}
				// Disable the faculty to cancel switches if a foe may have a trapping ability
				let foeSide = pokemon.side.foe;
				for (let k = 0; k < foeSide.active.length; ++k) {
					let source = foeSide.active[k];
					if (!source || source.fainted) continue;
					let template = (source.illusion || source).template;
					if (!template.abilities) continue;
					for (let abilitySlot in template.abilities) {
						let abilityName = template.abilities[abilitySlot];
						if (abilityName === source.ability) {
							// pokemon event was already run above so we don't need
							// to run it again.
							continue;
						}
						let banlistTable = this.getFormat().banlistTable;
						if (banlistTable && !('illegal' in banlistTable) && !this.getFormat().team) {
							// hackmons format
							continue;
						} else if (abilitySlot === 'H' && template.unreleasedHidden) {
							// unreleased hidden ability
							continue;
						}
						let ability = this.getAbility(abilityName);
						if (banlistTable && ability.id in banlistTable) continue;
						if (pokemon.knownType && !this.getImmunity('trapped', pokemon)) continue;
						this.singleEvent('FoeMaybeTrapPokemon',
							ability, {}, pokemon, source);
					}
				}

				if (pokemon.fainted) continue;
				if (pokemon.isStale < 2) {
					if (pokemon.isStaleCon >= 2) {
						if (pokemon.hp >= pokemon.isStaleHP - pokemon.maxhp / 100) {
							pokemon.isStale++;
							if (this.firstStaleWarned && pokemon.isStale < 2) {
								switch (pokemon.isStaleSource) {
								case 'struggle':
									this.add('html', '<div class="broadcast-red">' + Chat.escapeHTML(pokemon.name) + ' isn\'t losing HP from Struggle. If this continues, it will be classified as being in an endless loop.</div>');
									break;
								case 'drag':
									this.add('html', '<div class="broadcast-red">' + Chat.escapeHTML(pokemon.name) + ' isn\'t losing PP or HP from being forced to switch. If this continues, it will be classified as being in an endless loop.</div>');
									break;
								case 'switch':
									this.add('html', '<div class="broadcast-red">' + Chat.escapeHTML(pokemon.name) + ' isn\'t losing PP or HP from repeatedly switching. If this continues, it will be classified as being in an endless loop.</div>');
									break;
								}
							}
						}
						pokemon.isStaleCon = 0;
						pokemon.isStalePPTurns = 0;
						pokemon.isStaleHP = pokemon.hp;
					}
					if (pokemon.isStalePPTurns >= 5) {
						if (pokemon.hp >= pokemon.isStaleHP - pokemon.maxhp / 100) {
							pokemon.isStale++;
							pokemon.isStaleSource = 'ppstall';
							if (this.firstStaleWarned && pokemon.isStale < 2) {
								this.add('html', '<div class="broadcast-red">' + Chat.escapeHTML(pokemon.name) + ' isn\'t losing PP or HP. If it keeps on not losing PP or HP, it will be classified as being in an endless loop.</div>');
							}
						}
						pokemon.isStaleCon = 0;
						pokemon.isStalePPTurns = 0;
						pokemon.isStaleHP = pokemon.hp;
					}
				}
				if (pokemon.getMoves().length === 0) {
					pokemon.isStaleCon++;
					pokemon.isStaleSource = 'struggle';
				}
				if (pokemon.isStale < 2) {
					allStale = false;
				} else if (pokemon.isStale && !pokemon.staleWarned) {
					oneStale = pokemon;
				}
				if (!pokemon.isStalePPTurns) {
					pokemon.isStaleHP = pokemon.hp;
					if (pokemon.activeTurns) pokemon.isStaleCon = 0;
				}
				if (pokemon.activeTurns) {
					pokemon.isStalePPTurns++;
				}
				pokemon.activeTurns++;
			}
			this.sides[i].faintedLastTurn = this.sides[i].faintedThisTurn;
			this.sides[i].faintedThisTurn = false;
		}
		let banlistTable = this.getFormat().banlistTable;
		if (banlistTable && 'Rule:endlessbattleclause' in banlistTable) {
			if (oneStale) {
				let activationWarning = '<br />If all active Pok&eacute;mon go in an endless loop, Endless Battle Clause will activate.';
				if (allStale) activationWarning = '';
				let loopReason = '';
				switch (oneStale.isStaleSource) {
				case 'struggle':
					loopReason = ": it isn't losing HP from Struggle";
					break;
				case 'drag':
					loopReason = ": it isn't losing PP or HP from being forced to switch";
					break;
				case 'switch':
					loopReason = ": it isn't losing PP or HP from repeatedly switching";
					break;
				case 'getleppa':
					loopReason = ": it got a Leppa Berry it didn't start with";
					break;
				case 'useleppa':
					loopReason = ": it used a Leppa Berry it didn't start with";
					break;
				case 'ppstall':
					loopReason = ": it isn't losing PP or HP";
					break;
				case 'ppoverflow':
					loopReason = ": its PP overflowed";
					break;
				}
				this.add('html', '<div class="broadcast-red">' + Chat.escapeHTML(oneStale.name) + ' is in an endless loop' + loopReason + '.' + activationWarning + '</div>');
				oneStale.staleWarned = true;
				this.firstStaleWarned = true;
			}
			if (allStale) {
				this.add('message', "All active Pok\u00e9mon are in an endless loop. Endless Battle Clause activated!");
				let leppaPokemon = null;
				for (let i = 0; i < this.sides.length; i++) {
					for (let j = 0; j < this.sides[i].pokemon.length; j++) {
						let pokemon = this.sides[i].pokemon[j];
						if (toId(pokemon.set.item) === 'leppaberry' || toId(pokemon.set.ability) === 'leppaberry') {
							if (leppaPokemon) {
								leppaPokemon = null; // both sides have Leppa
								this.add('-message', "Both sides started with a Leppa Berry.");
							} else {
								leppaPokemon = pokemon;
							}
							break;
						}
					}
				}
				if (leppaPokemon) {
					this.add('-message', "" + leppaPokemon.side.name + "'s " + leppaPokemon.name + " started with a Leppa Berry and loses.");
					this.win(leppaPokemon.side.foe);
					return;
				}
				this.win();
				return;
			}
		} else {
			if (allStale && !this.staleWarned) {
				this.staleWarned = true;
				this.add('html', '<div class="broadcast-red">If this format had Endless Battle Clause, it would have activated.</div>');
			} else if (oneStale) {
				this.add('html', '<div class="broadcast-red">' + Chat.escapeHTML(oneStale.name) + ' is in an endless loop.</div>');
				oneStale.staleWarned = true;
			}
		}

		if (this.gameType === 'triples' && !this.sides.filter(side => side.pokemonLeft > 1).length) {
			// If both sides have one Pokemon left in triples and they are not adjacent, they are both moved to the center.
			let actives = [];
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					if (!this.sides[i].active[j] || this.sides[i].active[j].fainted) continue;
					actives.push(this.sides[i].active[j]);
				}
			}
			if (actives.length > 1 && !this.isAdjacent(actives[0], actives[1])) {
				this.swapPosition(actives[0], 1, '[silent]');
				this.swapPosition(actives[1], 1, '[silent]');
				this.add('-center');
			}
		}

		this.add('turn', this.turn);

		this.makeRequest('move');
	},
	pokemon: {
		hasAbility: function (ability) {
			return false;
		},
		hasItem: function (item) {
			if (this.ignoringItem()) return false;
			let ownItem = this.item;
			if (!Array.isArray(item)) {
				return ownItem === toId(item) || ownItem === toId(this.ability);
			}
			return item.map(toId).includes(ownItem) || item.map(toId).includes(toId(this.ability));
		},
		setAbility: function (ability, source, effect, noForce) {
			return false;
		},
		isGrounded: function (negateImmunity) {
			if ('gravity' in this.battle.pseudoWeather) return true;
			if ('ingrain' in this.volatiles) return true;
			if ('smackdown' in this.volatiles) return true;
			if (this.hasItem('ironball')) return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return !this.hasItem('airballoon');
		},
		transformInto: function (pokemon, user, effect) {
			let template = pokemon.template;
			if (pokemon.fainted || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5)) {
				return false;
			}
			if (!template.abilities || (pokemon && pokemon.transformed && this.battle.gen >= 2) || (user && user.transformed && this.battle.gen >= 5)) {
				return false;
			}
			if (!this.formeChange(template, pokemon)) {
				return false;
			}
			this.transformed = true;

			this.types = pokemon.types;
			this.addedType = pokemon.addedType;
			this.knownType = this.side === pokemon.side && pokemon.knownType;

			for (let statName in this.stats) {
				this.stats[statName] = pokemon.stats[statName];
			}
			this.moveset = [];
			this.moves = [];
			this.set.ivs = (this.battle.gen >= 5 ? this.set.ivs : pokemon.set.ivs);
			this.hpType = (this.battle.gen >= 5 ? this.hpType : pokemon.hpType);
			this.hpPower = (this.battle.gen >= 5 ? this.hpPower : pokemon.hpPower);
			for (let i = 0; i < pokemon.moveset.length; i++) {
				let moveData = pokemon.moveset[i];
				let moveName = moveData.move;
				if (moveData.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveset.push({
					move: moveName,
					id: moveData.id,
					pp: moveData.maxpp === 1 ? 1 : 5,
					maxpp: this.battle.gen >= 5 ? (moveData.maxpp === 1 ? 1 : 5) : moveData.maxpp,
					target: moveData.target,
					disabled: false,
					used: false,
					virtual: true,
				});
				this.moves.push(toId(moveName));
			}
			for (let j in pokemon.boosts) {
				this.boosts[j] = pokemon.boosts[j];
			}
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			this.setAbility(pokemon.ability, this, {id: 'transform'});

			// Change formes based on held items (for Transform)
			// Only ever relevant in Generation 4 since Generation 3 didn't have item-based forme changes
			if (this.battle.gen === 4) {
				if (this.template.num === 487) {
					// Giratina formes
					if (this.template.species === 'Giratina' && this.hasItem('griseousorb')) {
						this.formeChange('Giratina-Origin');
						this.battle.add('-formechange', this, 'Giratina-Origin');
					} else if (this.template.species === 'Giratina-Origin' && !this.hasItem('griseousorb')) {
						this.formeChange('Giratina');
						this.battle.add('-formechange', this, 'Giratina');
					}
				}
				if (this.template.num === 493) {
					// Arceus formes
					let items = [Tools.getItem(this.item), Tools.getItem(this.ability)];
					let targetForme = (item[0] && item[0].onPlate ? 'Arceus-' + item[0].onPlate : 'Arceus');
					if (targetForme === 'Arceus') targetForme = (item[1] && item[1].onPlate ? 'Arceus-' + item[1].onPlate : 'Arceus');
					if (this.template.species !== targetForme) {
						this.formeChange(targetForme);
						this.battle.add('-formechange', this, targetForme);
					}
				}
			}

			return true;
		},
		getItem: function () {
			return this.battle.getItem(this.item) || this.battle.getItem(this.ability);
		},
		eatItem: function (item, source, sourceEffect) {
			if (!this.hp || !this.isActive) return false;
			if (!this.item || this.getAbility().isBerry) {
				if(!this.ability) return false;
				let id = toId(item);
				if (id && this.ability !== id) return false;

				if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
				if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
				item = this.battle.getItem(this.ability);
				if (this.battle.runEvent('UseItem', this, null, null, item) && this.battle.runEvent('TryEatItem', this, null, null, item)) {
					this.battle.add('-enditem', this, item, '[eat]');

					this.battle.singleEvent('Eat', item, {id: item.id, target: this}, this, source, sourceEffect);
					this.battle.runEvent('EatItem', this, null, null, item);

					this.lastItem2 = this.ability;
					this.ability = '';
					this.usedItemThisTurn = true;
					this.ateBerry = true;
					this.battle.runEvent('AfterUseItem', this, null, null, item);
					return true;
				}
				return false;
			}

			let id = toId(item);
			if (id && this.item !== id) return false;

			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
			item = this.getItem();
			if (this.battle.runEvent('UseItem', this, null, null, item) && this.battle.runEvent('TryEatItem', this, null, null, item)) {
				this.battle.add('-enditem', this, item, '[eat]');

				this.battle.singleEvent('Eat', item, this.itemData, this, source, sourceEffect);
				this.battle.runEvent('EatItem', this, null, null, item);

				this.lastItem = this.item;
				this.item = '';
				this.itemData = {id: '', target: this};
				this.usedItemThisTurn = true;
				this.ateBerry = true;
				this.battle.runEvent('AfterUseItem', this, null, null, item);
				return true;
			}
			return false;
		},
		useItem: function (item, source, sourceEffect) {
			if ((!this.hp && !this.getItem().isGem) || !this.isActive) return false;
			if (!this.item) {
				if (!this.ability) return false;
				let id = toId(item);
				if (id && this.ability !== id) return false;

				if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
				if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
				item = this.battle.getItem(this.ability);
				if (this.battle.runEvent('UseItem', this, null, null, item)) {
					switch (item.id) {
					case 'redcard':
						this.battle.add('-enditem', this, item, '[of] ' + source);
						break;
					default:
						if (!item.isGem) {
							this.battle.add('-enditem', this, item);
						}
						break;
					}

					this.battle.singleEvent('Use', item, {id: item.id, target: this}, this, source, sourceEffect);

					this.lastItem2 = this.ability;
					this.ability = '';
					this.usedItemThisTurn = true;
					this.battle.runEvent('AfterUseItem', this, null, null, item);
					return true;
				}
				return false;
			}

			let id = toId(item);
			if (id && this.item !== id) return false;

			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
			item = this.getItem();
			if (this.battle.runEvent('UseItem', this, null, null, item)) {
				switch (item.id) {
				case 'redcard':
					this.battle.add('-enditem', this, item, '[of] ' + source);
					break;
				default:
					if (!item.isGem) {
						this.battle.add('-enditem', this, item);
					}
					break;
				}

				this.battle.singleEvent('Use', item, this.itemData, this, source, sourceEffect);

				this.lastItem = this.item;
				this.item = '';
				this.itemData = {id: '', target: this};
				this.usedItemThisTurn = true;
				this.battle.runEvent('AfterUseItem', this, null, null, item);
				return true;
			}
			return false;
		},
		takeItem: function (source) {
			if (!this.isActive) return false;
			if (!this.item) {
				if(!this.ability) return false;
				if (!source) source = this;
				let item = this.battle.getItem(this.ability);
				if (this.battle.runEvent('TakeItem', this, source, null, item)) {
					this.ability = '';
					return item;
				}
				return false;
			}
			if (!source) source = this;
			let item = this.getItem();
			if (this.battle.runEvent('TakeItem', this, source, null, item)) {
				this.item = '';
				this.itemData = {id: '', target: this};
				return item;
			}
			return false;
		},
		setItem: function (item, source, effect) {
			if (!this.hp || !this.isActive) return false;
			item = this.battle.getItem(item);

			let effectid;
			if (this.battle.effect) effectid = this.battle.effect.id;
			if (item.id === 'leppaberry' && effectid !== 'trick' && effectid !== 'switcheroo') {
				this.isStale = 2;
				this.isStaleSource = 'getleppa';
			}
			if(effect && effect.item2) {
				this.lastItem = this.ability;
				this.ability = item.id;
				if (item.id) {
					this.battle.singleEvent('Start', item, {id: item.id, target: this}, this, source, effect);
				}
				if (this.lastItem) this.usedItemThisTurn = true;
				return true;
			}
			this.lastItem = this.item;
			this.item = item.id;
			this.itemData = {id: item.id, target: this};
			if (item.id) {
				this.battle.singleEvent('Start', item, this.itemData, this, source, effect);
			}
			if (this.lastItem) this.usedItemThisTurn = true;
			return true;
		},
	},
	getZMove: function (move, pokemon, skipChecks) {
		let item = pokemon.getItem(), item2 = this.getItem(pokemon.ability);
		if (!skipChecks) {
			if (pokemon.side.zMoveUsed) return;
			if (!item.zMove && !item2.zMove) return;
			if ((item.zMoveUser && !item.zMoveUser.includes(pokemon.species)) && item.zMoveUser && !item.zMoveUser.includes(pokemon.species)) return;
			let moveData = pokemon.getMoveData(move);
			if (!moveData || !moveData.pp) return; // Draining the PP of the base move prevents the corresponding Z-move from being used.
		}

		if (item.zMoveFrom) {
			if (move.name === item.zMoveFrom) return item.zMove;
		} else if (item.zMove === true) {
			if (move.type === item.zMoveType) {
				if (move.category === "Status") {
					return move.name;
				} else if (move.zMovePower) {
					return this.zMoveTable[move.type];
				}
			}
		} else if (item2.zMoveFrom) {
			if (move.name === item2.zMoveFrom) return item2.zMove;
		} else if (item2.zMove === true) {
			if (move.type === item2.zMoveType) {
				if (move.category === "Status") {
					return move.name;
				} else if (move.zMovePower) {
					return this.zMoveTable[move.type];
				}
			}
		}
	},
	getZMoveCopy: function (move, pokemon) {
		move = this.getMove(move);
		let zMove;
		if (pokemon) {
			let item = pokemon.getItem(), item2 = this.getItem(pokemon.ability);
			if (move.name === item.zMoveFrom) {
				return this.getMoveCopy(item.zMove);
			}
			if (move.name === item2.zMoveFrom) {
				return this.getMoveCopy(item2.zMove);
			}
		}

		if (move.category === 'Status') {
			zMove = this.getMoveCopy(move);
			zMove.isZ = true;
			return zMove;
		}
		zMove = this.getMoveCopy(this.zMoveTable[move.type]);
		zMove.basePower = move.zMovePower;
		zMove.category = move.category;
		return zMove;
	},
	canZMove: function (pokemon) {
		if (pokemon.side.zMoveUsed) return;
		let item = pokemon.getItem(), item2 = this.getItem(pokemon.ability);
		if (!item.zMove && !item2.zMove) return;
		if ((item.zMoveUser && !item.zMoveUser.includes(pokemon.species)) && (item2.zMoveUser && !item2.zMoveUser.includes(pokemon.species))) return;
		let atLeastOne = false;
		let zMoves = [];
		for (let i = 0; i < pokemon.moves.length; i++) {
			let move = this.getMove(pokemon.moves[i]);
			let zMoveName = this.getZMove(move, pokemon, true) || '';
			if (zMoveName) {
				let zMove = this.getMove(zMoveName);
				if (!zMove.isZ && zMove.category === 'Status') zMoveName = "Z-" + zMoveName;
				zMoves.push({move: zMoveName, target: zMove.target});
			} else {
				zMoves.push(null);
			}
			if (zMoveName) atLeastOne = true;
		}
		if (atLeastOne) return zMoves;
	},
	canMegaEvo: function (pokemon) {
		let altForme = pokemon.baseTemplate.otherFormes && this.getTemplate(pokemon.baseTemplate.otherFormes[0]);
		let item = pokemon.getItem(), item2 = this.getItem(pokemon.ability);
		if (altForme && altForme.isMega && altForme.requiredMove && pokemon.moves.includes(toId(altForme.requiredMove)) && (!item.zMove && !item2.zMove)) return altForme.species;
		if (item.megaStone === pokemon.species || item2.megaStone === pokemon.species) return false;
		if (item.megaEvolves !== pokemon.baseTemplate.baseSpecies) {
			if (item2.megaEvolves === pokemon.baseTemplate.baseSpecies) {
				return item2.megaStone;
			}
			else {
				return false;
			}
		}
		return item.megaStone;
	},
};