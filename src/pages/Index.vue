<template>
    <q-page class="row justify-center">
        <div class="col-md-12 col-lg-10">
            <pokedex-list ref="pokeList"/>
        </div>
    </q-page>
</template>

<script>
import PokedexList from 'src/components/PokedexList.vue';

export default {
    name: 'PageIndex',
    components: {
        PokedexList
    },
    methods: {
        ResetList() {
            this.$refs.pokeList.ResetList();
        },
        PreLoadList() {
            this.$refs.pokeList.PreLoadList();
        }
    }
}
</script>
