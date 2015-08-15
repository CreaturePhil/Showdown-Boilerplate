exports.BattleFormats = {
	teampreview2v2: {
		onStartPriority: -10,
		onStart: function () {
			this.add('clearpoke');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
		},
		onTeamPreview: function () {
			this.makeRequest('teampreview', 2);
		}
	}
};
