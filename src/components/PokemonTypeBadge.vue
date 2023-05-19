<template>
    <q-badge
        :label="type"
        :color="`type-${type}`"
        :text-color="`type-${type}`"
        class="text-uppercase"
    />
</template>

<script>
export default {
    name: "PokemonTypeBadge",
    props: {
        type: String
    }
}
</script>