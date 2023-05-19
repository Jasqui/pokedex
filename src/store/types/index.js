import axios from 'axios';
import Vue from 'vue';

export default {
    namespaced: true,
    state: function() {
        return {
            types: [],
            loadingTypes: false
        }
    },
    mutations: {
        SetTypes(state, payload) {
            state.types = payload
        }
    },
    getters: {
        typesLoaded: function (state) {
            return !!state.types && state.types.length && !state.loadingTypes;
        }
    },
    actions: {
        async LoadPokemonTypes({ commit }) {
            this.loadingTypes = true;
            
            await axios.get(`${Vue.prototype.$CONFIG.API_URL}type`)
                .then(response => {
                    commit('SetTypes', response.data.results);
                });
            
            this.loadingTypes = false;
        }
    }
}