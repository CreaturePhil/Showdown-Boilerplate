exports.BattleScripts = {
    init: function () 
    {
        for (var i in this.data.Pokedex) 
        {
            for(var j in this.data.Pokedex[i].baseStats)
            {
                if(this.modData('Pokedex', i).baseStats[j]>145)
                    this.modData('Pokedex', i).baseStats[j]=5;
                else
                    this.modData('Pokedex', i).baseStats[j]=150-this.data.Pokedex[i].baseStats[j];
            }
        }
    }
};
