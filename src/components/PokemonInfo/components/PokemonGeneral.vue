<template>
    <q-card-section class="text-black">
        <q-list class="bg-summary">
            <q-item>
                <q-item-section avatar class="text-bold">
                    Number
                </q-item-section>
                <q-item-section class="row q-col-gutter-md text-right">
                    <div class="col-auto">
                        {{ id }}
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar class="text-bold">
                    Type
                </q-item-section>
                <q-item-section class="row q-col-gutter-md text-right">
                    <div class="col-auto">
                        <pokemon-type-badge :type="type" v-for="type in types" :key="type"/>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar class="text-bold">
                    Peso:
                </q-item-section>
                <q-item-section class="text-right">
                    {{weight}} Kg
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar class="text-bold">
                    Altura:
                </q-item-section>
                <q-item-section class="text-right">
                    {{height}} m
                </q-item-section>
            </q-item>
        </q-list>
    </q-card-section>
</template>

<script>
import PokemonInfoMixin from '../PokemonInfoMixin.js';
import PokemonTypeBadge from 'src/components/PokemonTypeBadge.vue';

export default {
    name: "PokemonGeneral",
    mixins: [PokemonInfoMixin],
    components: {
        PokemonTypeBadge
    }
}
</script>