exports.BattleScripts = {
    init: function () {
        for (var i in this.data.Moves) {
            if (this.data.Moves[i].priority === 0) {
                var basePower = this.data.Moves[i].basePower;
                switch (this.data.Moves[i].multihit) {
                    case 2:
                        basePower = 45;
                    break;
                    case 3:
                        basePower = 15;
                    break;
                    case [2, 5]:
                        basePower = 25;
                    break;
                    default:
                        basePower = 90;
                    break;
                }
            
                var basePowerCallback;
                if (this.data.Moves[i].id === 'triplekick') {
                    basePowerCallback = function (pokemon) {
                        pokemon.addVolatile('triplekick');
                        return 15 * pokemon.volatiles['triplekick'].hit;
                    }
                }
                this.modData('Moves', i).basePower = basePower;
                this.modData('Moves', i).accuracy = 100;
                if (basePowerCallback) this.modData('Moves', i).basePowerCallback = basePowerCallback;
                this.modData('Moves', i).onBasePower = undefined;
            }
        }
    }
}
