exports.BattleItems = {
    "megastone": {
        id: "megastone",
        name: "Mega Stone",
        spritenum: 575,
        onTakeItem: function (item, source) {
            return false;
        },
        num: -1,
        gen: 6,
        desc: "Mega-evolves all Pokemon (Mega Mania)"
    }
}
