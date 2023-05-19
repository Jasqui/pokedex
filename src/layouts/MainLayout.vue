<template>
    <q-layout view="lHh LpR lFf" class="bg-pokedex">
        <q-drawer
            v-model="showLeftDrawer"
            side="left"
            
            content-class="bg-pokedex"
        >
            <pokemon-info />
            <div class="q-mini-drawer-hide absolute" style="top: 20px; right: -10px">
                <q-btn
                    dense
                    round
                    unelevated
                    color="summary"
                    text-color="black"
                    icon="fas fa-times"
                    @click="showLeftDrawer = false"
                />
            </div>
        </q-drawer>

        <q-drawer
            v-model="showRightDrawer"
            side="right"
            mini
            content-class="bg-red-12"
        >
            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                <q-list padding class="text-white">
                    <q-item>
                        <q-img basic src="imgs/logo.png" height="42px" width="42px"/>
                    </q-item>

                    <q-separator inset color="pokedex" size="2px"/>

                    <!-- <q-item clickable v-ripple @click="PreLoadList" class="q-mt-sm">
                        <q-item-section avatar>
                            <q-icon name="fas fa-spinner" />
                            <q-tooltip>
                                Precargar lista
                            </q-tooltip>
                        </q-item-section>
                    </q-item> -->
                    
                    <q-item clickable v-ripple @click="ResetList" class="q-mt-sm">
                        <q-item-section avatar>
                            <q-icon name="fas fa-rotate-right" />
                            <q-tooltip>
                                Resetear lista
                            </q-tooltip>
                        </q-item-section>
                    </q-item>

                    <q-item class="absolute" style="bottom: 10px; left: 17px" clickable v-ripple @click="OpenInfoPopup">
                        <q-item-section avatar>
                            <q-icon name="fas fa-info" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container v-if="typesLoaded">
            <router-view ref="page"/>
        </q-page-container>

        <info-popup ref="infoPopup" />
    </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import PokemonInfo from 'src/components/PokemonInfo/PokemonInfo.vue'
import InfoPopup from 'src/components/InfoPopup.vue';

export default {
    name: 'MainLayout',
    data () {
        return {
            showLeftDrawer: false,
            showRightDrawer: true
        }
    },
    components: {
        PokemonInfo, InfoPopup
    },
    mounted() {
        this.LoadPokemonTypes();
    },
    methods: {
        ...mapActions('Types', ['LoadPokemonTypes']),
        ...mapActions('AppState', ['LoadCachedPreferences']),
        ...mapMutations('PokemonInfo', ['SetSelectedPokemon']),

        ResetList() {
            this.$refs.page.ResetList();
        },
        PreLoadList() {
            this.$refs.page.PreLoadList();
        },
        OpenInfoPopup() {
            this.$refs.infoPopup.Show();
        }
    },
    computed: {
        ...mapState('PokemonInfo', ['selectedPokemonData']),
        ...mapState('Types', ['loadingTypes']),
        ...mapGetters('Types', ['typesLoaded'])
    },
    watch: {
        selectedPokemonData() {
            if (!this.selectedPokemonData)
                return;

            this.showLeftDrawer = true;
        },
        showLeftDrawer() {
            if (!this.showLeftDrawer) {
                this.SetSelectedPokemon(null);
            }
        }
    }
}
</script>
