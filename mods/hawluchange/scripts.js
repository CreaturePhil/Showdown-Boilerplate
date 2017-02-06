exports.BattleScripts = {
    init: function () {
        for (var i in this.data.Learnsets) {
            this.modData('Learnsets', i).learnset.flyingpress = ['6L1'];
        }
    }
};
