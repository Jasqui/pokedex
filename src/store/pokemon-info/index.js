export default {
    namespaced: true,
    state: function () {
        return {
            selectedPokemonData: null
        }
    },
    mutations: {
        SetSelectedPokemon(state, payload) {
            state.selectedPokemonData = payload;
        }
    }
}
