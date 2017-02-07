exports.BattleFormats = {
   "godclause": {
     effectType: 'Rule',
     onValidateTeam: function (team) {
       var problems = [];
       
       for (var i = 1; i < team.length; i++) {
         var pokemon = team[i];
         var j=0;
         var name = pokemon.name || pokemon.species;
         var template = this.getTemplate(pokemon.species);
         if (template.tier === 'Uber') {
             j++;
         }
         if(j>1)
            problems.push("You cannot use " + name + " as non-god.");
     }
   }
   },
};
