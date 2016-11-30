'use strict';

exports.BattleScripts = {
   switchIn: function (pokemon, pos) {
     if (!pokemon || pokemon.isActive) return false;
     if (!pos) pos = 0;
     let side = pokemon.side;
     if (pos >= side.active.length) {
       throw new Error("Invalid switch position");
     }
     if (side.active[pos]) {
       let oldActive = side.active[pos];
       let foeActive = side.foe.active[0];
       let lastMove = this.getMove(oldActive.lastMove);
       let foeMove = this.getMove(foeActive.lastMove);
       if ((lastMove === 'voltswitch' || lastMove === 'uturn' || lastMove === 'partingshot') || (foeMove.id === 'whirlwind' || foeMove.id === 'roar' || foeMove.id === 'dragontail' || foeMove.id === 'circlethrow')) {
         oldActive.clearVolatile();
       }
       pokemon.copyVolatileFrom(oldActive);
       if (this.cancelMove(oldActive)) {
         for (let i = 0; i < side.foe.active.length; i++) {
           if (side.foe.active[i].isStale >= 2) {
             oldActive.isStaleCon++;
             oldActive.isStaleSource = 'drag';
             break;
           }
         }
       }
       if (oldActive.switchCopyFlag === 'copyvolatile') {
         delete oldActive.switchCopyFlag;
       }
     }
     pokemon.isActive = true;
     //this.runEvent('BeforeSwitchIn', pokemon);
     if (side.active[pos]) {
       let oldActive = side.active[pos];
       oldActive.isActive = false;
       oldActive.isStarted = false;
       oldActive.usedItemThisTurn = false;
       oldActive.position = pokemon.position;
       pokemon.position = pos;
       side.pokemon[pokemon.position] = pokemon;
       side.pokemon[oldActive.position] = oldActive;
       this.cancelMove(oldActive);
       oldActive.clearVolatile();
     }
     side.active[pos] = pokemon;
     pokemon.activeTurns = 0;
     for (let m in pokemon.moveset) {
       pokemon.moveset[m].used = false;
     }
     this.add('switch', pokemon, pokemon.getDetails);
     let statArray = ['atk', 'def', 'spa', 'spd', 'spe'];
     for (let i = 0; i < statArray.length; i++) {
       if (pokemon.boosts[statArray[i]] !== 0) {
         this.add('-boost', pokemon, statArray[i], pokemon.boosts[statArray[i]], '[silent]');
       }
     }
     let volArray = Object.getOwnPropertyNames(pokemon.volatiles);
     for (let i = 0; i < volArray.length; i++) {
       let currentVol = volArray[i];
       this.add('-start', pokemon, currentVol);
     }
     pokemon.update();
     this.insertQueue({pokemon: pokemon, choice: 'runSwitch'});
   }
};
