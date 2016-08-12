cleannicknameclause: {
        effectType: 'Rule',
        onStart: function () {
            this.add('rule', "Clean Nickname Clause: only ASCII characters may be used to name Pokémon");
        },
        validateSet: function (pokemon) {
            if (!pokemon.name) return;
            pokemon.name = pokemon.name.replace(/[^\u0000-\u007F]/g, '');
        }
    }
