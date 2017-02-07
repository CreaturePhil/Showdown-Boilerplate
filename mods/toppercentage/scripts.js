'use strict';

exports.BattleScripts = {
    useMove: function(move, pokemon, target, sourceEffect) {

        //addition
        if (move.selfdestruct) {
            pokemon.side.metaCount -= 100 * (pokemon.hp / pokemon.maxhp);
            console.log(pokemon.id + ": " + pokemon.side.metaCount);
            this.add('-message', pokemon.id.slice(4) + ": " + Math.round(pokemon.side.metaCount));
            if (pokemon.side.metaCount <= 0.1) {
                this.win(pokemon.side.foe);
            }
        }

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
            for (let i = 0; i < targets.length; i++) {
                let hitResult = this.tryMoveHit(targets[i], pokemon, move, true);
                if (hitResult || hitResult === 0 || hitResult === undefined) moveResult = true;
                damage += hitResult || 0;
            }
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

        if (!move.negateSecondary && !(pokemon.hasAbility('sheerforce') && pokemon.volatiles['sheerforce'])) {
            this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
            this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
        }
        return true;
    }
}
