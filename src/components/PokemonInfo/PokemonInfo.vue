<template>
    <q-card unelevated bordered :class="cardCssClass" v-if="pokemon" class="overflow-hidden">
        <q-card-section class="text-h3 text-capitalize">
            {{ name }}
        </q-card-section>
        <pokemon-pic />
        <pokemon-general />
        <pokemon-descriptions />
        <pokemon-move-list />
    </q-card>
</template>

<script>
import PokemonInfoMixin from './PokemonInfoMixin.js';
import PokemonPic from './components/PokemonPic.vue';
import PokemonGeneral from './components/PokemonGeneral.vue';
import PokemonDescriptions from './components/PokemonDescriptions.vue';
import PokemonMoveList from './components/PokemonMoveList.vue';

export default {
    name: "PokemonInfo",
    mixins: [PokemonInfoMixin],
    computed: {
        cardCssClass() {
            if (!this.firstTypeName)
                return;

            return `bg-type-${this.firstTypeName} text-type-${this.firstTypeName}`
        }
    },
    components: {
        PokemonPic, PokemonGeneral, PokemonDescriptions, PokemonMoveList
    }
}
</script>