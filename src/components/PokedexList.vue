<template>
    <div class="row q-col-gutter-sm" v-show="!loadingAllPokemon">
        <q-infinite-scroll @load="LoadInfiniteScrollPokemon" :offset="250" >
            <div class="col-12 row q-col-gutter-sm full-width">
                <div v-for="(pokemon, index) in pokemons" :key="index" class="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                    <pokemon-card-summary :pokemon="pokemon"/>
                </div>
            </div>
            <template v-slot:loading>
                <div class="row justify-center q-my-md col-12">
                    <q-spinner-dots color="summary" size="40px" />
                </div>
            </template>
        </q-infinite-scroll>
    </div>
</template>

<script>
import PokemonCardSummary from 'src/components/PokemonCardSummary';
import { QSpinnerDots } from 'quasar';

export default {
    name: "PokedexList",
    components: {
        PokemonCardSummary
    },
    data() {
        return {
            pokemons: [],
            next: null,
            previous: null,
            initialLimit: 51,
            history: {},
            maxPokemon: 1281,
            loadingAllPokemon: false
        }
    },
    methods: {
        async LoadInfiniteScrollPokemon(index, done = (_ => null)) {
            if (this.loadedAll) {
                done();
                return;
            }

            let request = `${this.$CONFIG.API_URL}pokemon?limit=${this.initialLimit}`;
            
            if (this.next) {
                request = this.next;
            }

            if (this.history[request]) {
                this.ProcessInfiniteScrollResponse(this.history[request]);
                done()
                return;
            }

            await this.$axios(request)
                .then(response => {
                    this.ProcessInfiniteScrollResponse(response.data)
                    this.SaveHistory(response.data, request);

                    done() 
                })
                .catch(response => {
                    window.scrollTo(0, window.pageYOffset - 20)
                })


            done();
        },
        async LoadAllPokemons() {
            let request = `${this.$CONFIG.API_URL}pokemon?limit=${this.maxPokemon}`;

            return await this.$axios(request)
                .then(response => {
                    
                    this.pokemons = response.data.results;
                    this.next = null;
                    this.previous = null;
                })
        },
        ResetList() {
            this.pokemons = [];
            this.next = null;
            window.scrollTo(0, 0);

            this.LoadInfiniteScrollPokemon(0)
        },
        async PreLoadList() {
            this.$q.loading.show({
                message: "Espere mientras los atrapamos a todos...",
                spinner: QSpinnerDots,
                spinnerColor: "summary",
                backgroundColor: "pokedex",
                messageColor: "white",
                delay: 0
            })

            this.loadingAllPokemon = true;

            await this.LoadAllPokemons();

            this.loadingAllPokemon = false;

            this.$q.loading.hide()
        },
        ProcessInfiniteScrollResponse(responseData) {
            this.pokemons = [...this.pokemons, ...responseData.results];
            this.next = responseData.next;
            this.previous = responseData.previous;
        },
        SaveHistory(responseData, request) {
            if(!request || !responseData)
                return;
            this.$set(this.history, request, responseData);
        }
    },
    computed: {
        loadedAll() {
            return this.pokemons.length === this.maxPokemon;
        }
    }
}
</script>