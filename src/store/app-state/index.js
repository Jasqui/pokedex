const cacheKey = 'jemersoft-jasqui-pokedex-preferences';

export default {
    namespaced: true,
    state: function() {
        return {
            preferences: {
                hideWeight: false
            }
        }
    },
    mutations: {
        SetHideWeight(state, payload) {
            state.preferences.hideWeight = payload;
        },
        SetPokedexPreferences(state, payload) {
            for (var i in state.preferences) {
                if (state.preferences.hasOwnProperty(i) && payload[i] != undefined) {
                    state.preferences[i] = payload[i];
                }
            }
        }
    },
    getters: {
        pokedexPreferences(state) {
            return state.preferences;
        }
    },
    actions: {
        LoadCachedPreferences({ commit, dispatch }) {
            let cachedPref = localStorage.getItem(cacheKey);

            if (!cachedPref) {
                dispatch('CachePreferences');
                return;
            }

            try {
                cachedPref = JSON.parse(cachedPref);

                commit('SetPokedexPreferences', cachedPref)
            } catch(_) {
                console.error('ERROR Loading Cached Preferences')
                dispatch('CachePreferences');
            }
        },
        CachePreferences({ state }) {
            localStorage.setItem(cacheKey, JSON.stringify(state.preferences));
        }
    }
}