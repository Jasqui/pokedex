<template>
    <q-card-section>
        <q-list class="bg-summary text-black" bordered separator>
            <q-item>
                <q-item-label class="text-body1">
                    Descripción
                </q-item-label>
            </q-item>
            <q-item v-for="entry in flavorTextEntries" :key="entry.version.name">
                <q-item-section>
                    <q-item-label lines="1" caption>
                        {{ entry.version.name }}
                    </q-item-label>
                    <q-item-label class="text-body2">
                        {{ entry.flavor_text }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-card-section>
</template>

<script>
import PokemonInfoMixin from '../PokemonInfoMixin.js';

export default {
    name: "PokemonDescription",
    mixins: [PokemonInfoMixin],
    data() {
        return {
            flavorTextEntries: []
        }
    },
    mounted() {
        this.LoadData();
    },
    methods: {
        LoadData() {
            if (!this.species)
                return;

            this.$axios(this.species.url)
                .then(response => {
                    this.ParseData(response.data);
                })
        },
        ParseData(responseData) {
            this.flavorTextEntries = responseData.flavor_text_entries.filter(r => {
                return r && r.language && r.language.name === 'es';
            });
        }
    },
    watch: {
        species() {
            this.LoadData()
        }
    }
}
</script>