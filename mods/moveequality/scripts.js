exports.BattleScripts = {
    init: function () {
        for (var i in this.data.Movedex) {
            var move = this.data.Movedex[i];
            if (move.priority === 0
                && move.category !== 'Status') {
                var basePower = move.basePower;
                switch (move.multihit) {
                    case 2:
                        basePower = 45;
                    break;
                    case [2, 5]:
                        basePower = 25;
                    break;
                    case 3:
                        basePower = 30;
                    break;
                    default:
                        basePower = 90;
                    break;
                }
              
                this.modData('Movedex', i).basePower = basePower || 90;
                this.modData('Movedex', i).accuracy = 100;
                this.modData('Movedex', i).basePowerCallback = undefined;
                this.modData('Movedex', i).onBasePower = undefined;
            }
        }
    }
}
