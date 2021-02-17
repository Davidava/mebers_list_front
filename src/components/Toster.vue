<template>
  <v-snackbar
    text
    right
    :color="toster.color"
    :top="toster.top"
    v-model="toster.model"
  >
    {{toster.text}}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    toster: {
      type: Object,
      default: () => ({
        model: {
          type: Boolean,
          default: false,
        },
        text: {
          type: String,
          default: '',
        },
        top: {
          type: Boolean,
          default: false,
        },
        color: {
          type: String,
          default: 'default',
        },
      }),
    },
  },
};
</script>
