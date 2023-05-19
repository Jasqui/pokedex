<template>
    <q-dialog ref="modal">
        <q-card class="bg-summary">
            <q-card-section class="text-h5">
                <q-icon name="fas fa-info" class="q-pb-sm"/> 
                Info

                <q-btn
                    icon="fas fa-times"
                    @click="Hide"
                    flat
                    dense
                    round
                    size="sm"
                    class="absolute-top-right"
                />
            </q-card-section>

            <q-separator/>

            <q-card-section class="text-caption">
                SPA creada por David Hernández (jasquidev@gmail.com) - 2023
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "InfoPopup",
    methods: {
        Show() {
            this.$refs.modal.show();
        },
        Hide() {
            this.$refs.modal.hide();
        }
    }
}
</script>