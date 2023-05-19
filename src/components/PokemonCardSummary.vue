<template>
    <q-card class="bg-summary cursor-pointer full-height" @click="onPokemonClick" v-if="pokeData" v-ripple clickable>
        <q-card-section class="text-bold text-overline text-capitalize q-pb-none">
            {{ pokeData.name }}
        </q-card-section>
        <q-card-section class="q-py-none text-caption" v-if="!pokedexPreferences.hideWeight">
            <q-icon name="fas fa-weight-scale"/> {{ weight }} Kg
        </q-card-section>
        <q-card-section class="q-py-none">
            <q-img :src="sprite" basic/>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <pokemon-type-badge :type="typeData.type.name" v-for="typeData in pokeData.types" :key="typeData.type.name"/>
        </q-card-section>
    </q-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import PokemonTypeBadge from 'src/components/PokemonTypeBadge.vue';

export default {
    name: "PokemonCardSummary",
    props: {
        pokemon: Object
    },
    components: {
        PokemonTypeBadge
    },
    data() {
        return {
            pokeData: null,
            loading: false
        }
    },
    mounted() {
        this.LoadPokeData();
    },
    methods: {
        ...mapMutations('PokemonInfo', ['SetSelectedPokemon']),
        onPokemonClick() {
            this.SetSelectedPokemon(this.pokeData);
        },
        LoadPokeData() {
            this.pokeData = null;

            if (!this.pokemon)
                return;

            this.$axios(this.pokemon.url)
                .then(response => {
                    this.pokeData = response.data;
                })
        }
    },
    computed: {
        ...mapGetters('AppState', ['pokedexPreferences']),
        sprite() { return this.pokeData && this.pokeData.sprites && this.pokeData.sprites.front_default; },
        weight() { return this.pokeData && this.pokeData.weight; }
    },
    watch: {
        pokemon() {
            this.LoadPokeData();
        }
    }
}
</script>