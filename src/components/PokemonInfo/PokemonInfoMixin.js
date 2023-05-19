import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('PokemonInfo', ['selectedPokemonData']),
        pokemon() { return this.selectedPokemonData || {}; },
        name() { return this.pokemon.name},
        height() { return this.pokemon.height },
        weight() { return this.pokemon.weight },
        id() { return this.pokemon.id },
        stats() { return this.pokemon.stats },
        types() { return this.pokemon.types && this.pokemon.types.map(t => t.type.name) },
        indices() { return this.pokemon.game_indices },
        firstTypeName() { return this.types && this.types[0] },
        species() { return this.pokemon.species },
        moves() { return this.pokemon.moves },
        sprites() {
            let spritesMapped = this.pokemon.sprites && Object.values(this.pokemon.sprites) || [];

            let defaultPic = this.pokemon.sprites && this.pokemon.sprites.front_default;

            spritesMapped = spritesMapped.filter(s => s && typeof s === 'string' && s != defaultPic);

            spritesMapped.unshift(defaultPic);
        
            return spritesMapped;
        },
    }
}