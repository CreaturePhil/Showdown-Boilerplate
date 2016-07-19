exports.BattleScripts = {
    init: function () {
        for (var i in this.data.Pokedex) {
            //Variable Initialization
            var pokemon = this.data.Pokedex[i];
            var types = pokemon.types;
            var eggGroups = pokemon.eggGroups;
            var typeObj = {
                Amorphous: 'Ghost',
                Bug: 'Bug',
                Ditto: 'Normal',
                Dragon: 'Dragon',
                Fairy: 'Fairy',
                Field: 'Ground',
                Flying: 'Flying',
                Grass: 'Grass',
                'Human-like': 'Fighting',
                Monster: 'Dark',
                Mineral: 'Rock',
                Undiscovered: 'Psychic',
                'Water 1': 'Water',
                'Water 2': 'Water',
                'Water 3': 'Water'
            };
            var eggTypes = [];
            var newTypes = [];
            //types: The unmodified types of the Pokemon.
            //eggGroups: The egg groups of the Pokemon.
            //typeObj: The relationship between the egg groups of the Pokemon and the new types.
            //eggTypes: The types that correspond to the egg groups of the Pokemon.
            //newTypes: The modified types of the Pokemon.
          
            //Type Judgment
            if (typeObj[eggGroups[0]]) {
                eggTypes = [typeObj[eggGroups[0]]];
            } else { //Error Prevention
                eggTypes = ['Normal'];
            }
            if (eggGroups[1] && typeObj[eggGroups[1]]) eggTypes[1] = typeObj[eggGroups[1]];
            if (eggTypes.length === 2 && eggTypes[0] === eggTypes[1]) eggTypes = [eggTypes[0]]; //Water X + Water Y special case
          
            //Type Determination
            if (eggTypes.length === 1) {
                if (types.length === 1 && types[0] === eggTypes[0]) {
                    newTypes = types;
                } else if (types.length === 2 && types.indexOf(eggTypes[0]) > -1) {
                    newTypes = types;
                } else {
                    newTypes = [types[0], eggTypes[0]];
                }
            } else if (eggTypes.length === 2) {
                newTypes = eggTypes;
            } else { //Error Prevention
                newTypes = ['Normal'];
            }
          
            //Finalize Modification
            this.modData('Pokedex', i).types = newTypes;
        }
    }
};
