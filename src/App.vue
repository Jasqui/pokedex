<template>
    <div id="q-app">
        <router-view v-if="configLoaded"/>
        <q-inner-loading :showing="loading">
            <q-spinner-dots color="primary" size="3em"/>
        </q-inner-loading>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name: 'App',
    data() {
        return {
            loading: false,
            configLoaded: false
        };
    },
    mounted() {
        this.LoadCONFIG();
    },
    methods: {
        async LoadCONFIG() {
            this.loading = true;

            await this.$axios(`config.json`)
                .then(response => {
                    Vue.prototype.$CONFIG = response.data;
                })
                .catch(_ => {
                    console.error('ERROR: Falta el config.json')
                })

            this.loading = false;
            this.configLoaded = true;
        }
    }
}
</script>
