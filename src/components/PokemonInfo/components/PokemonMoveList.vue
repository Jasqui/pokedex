<template>
    <q-card-section class="text-black">
        <q-card-section class="bg-summary q-pa-none">
            <q-card-section>
                Movimientos
            </q-card-section>
            <q-separator/>
            <q-card-section class="row">
                <q-card-section v-for="move in parsedMoves" :key="move" class="col-6 text-uppercase">
                    <q-badge :label="move" multi-line :color="`type-${firstTypeName}`"/>
                </q-card-section>
            </q-card-section>
        </q-card-section>
    </q-card-section>
</template>

<script>
import PokemonInfoMixin from '../PokemonInfoMixin.js';

export default {
    name: "PokemonDescription",
    mixins: [PokemonInfoMixin],
    computed: {
        parsedMoves() {
            return this.moves && this.moves.map(m => {
                return m.move.name.split('-').join(' ');
            }) || [];
        }
    }
}
</script>