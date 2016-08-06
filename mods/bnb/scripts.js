exports.BattleScripts = {
    init: function () {
        for (var i in this.data.Pokedex) {
            for (var stat in this.data.Pokedex[i].baseStats) {
                var baseStat = this.data.Pokedex[i].baseStats[stat];
                if (baseStat <= 70) {
                    this.modData('Pokedex', i).baseStats[stat] =  this.data.Pokedex[i].baseStats[stat] * 2;
                }
            }
        }
    }
};
