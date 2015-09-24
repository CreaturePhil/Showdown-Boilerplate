exports.BattleScripts = {
	init: function () {
		for (var i in this.data.Pokedex){
			// TMs for weather setting moves
			var tms = {
				"Normal": "clearsky",
				"Fighting": "warzone",
				"Flying": "strongwinds",
				"Poison": "aciddance",
				"Bug": "plague",
				"Ghost": "sinisterfog",
				"Steel": "metalmeteor",
				"Grass": "pollenstorm",
				"Electric": "thunderstorm",
				"Psychic": "mindstorm",
				"Dragon": "meteorstorm",
				"Dark": "blackhole",
				"Fairy": "pixiedust",
			}
			var types = this.modData('Pokedex', i).types;
			for (var i in types) {
				if (tms[types[i]]){
					this.modData('Learnsets', i).learnset[tms[types[i]]] = ['6T'];
				}
			}
		}
		// reserved for ability changes
	}
}
