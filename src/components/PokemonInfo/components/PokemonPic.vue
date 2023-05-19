<template>
    <q-card-section>
        <q-card-section class="q-pb-none">
            <q-img
                :src="sprites[picIndex]"
            />
        </q-card-section>
        <q-card-section class="q-pt-none flex flex-center q-gutter-sm">
            <q-badge
                v-for="(sprite, index) in sprites"
                :key="`${sprite}-dot`"
                :color="picIndex === index ? 'black' : 'white'"
                rounded
                @click="ChoosePic(index)"
                class="cursor-pointer"
            />
        </q-card-section>
        <q-card-section class="q-pt-none flex flex-center">
            <q-btn
                icon="fas fa-arrow-left"
                dense
                unelevated
                @click="PreviousPic"
                class="q-mr-md"
            />
            <q-btn
                icon="fas fa-arrow-right"
                dense
                unelevated
                @click="NextPic"
            />
        </q-card-section>
    </q-card-section>
</template>

<script>
import PokemonInfoMixin from '../PokemonInfoMixin'

export default {
    name: 'PokemonPic',
    mixins: [PokemonInfoMixin],
    data() {
        return {
            picIndex: 0
        }
    },
    methods: {
        NextPic() {
            this.picIndex++;

            if (this.picIndex >= this.sprites.length)
                this.picIndex = 0;
        },
        PreviousPic() {
            this.picIndex--;

            if (this.picIndex < 0)
                this.picIndex = this.sprites.length - 1;
        },
        ChoosePic(index) {
            this.picIndex = index;
        }
    }
}
</script>