exports.BattleItems = {
	"abomasite": {
		inherit: true,
		m4aEvolves: "-Mega",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies || this.getTemplate(source.baseTemplate.baseSpecies + m4aEvolves).tier === 'M4A') return false;
			return true;
		},
		desc: "Mega-evolves Abomasnow or holder."
	},
	"charizarditex": {
		iinherit: true,
		m4aEvolves: "-Mega-X",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies || this.getTemplate(source.baseTemplate.baseSpecies + m4aEvolves).tier === 'M4A') return false;
			return true;
		},
		desc: "Mega-evolves Charizard into Mega Charizard X or holder into it's Mega-X forme."
	},
	"charizarditey": {
		inherit: true,
		m4aEvolves: "-Mega-Y",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies || this.getTemplate(source.baseTemplate.baseSpecies + m4aEvolves).tier === 'M4A') return false;
			return true;
		},
		desc: "Mega-evolves Charizard into Mega Charizard Y or holder into it's Mega-Y forme."
	},
}
