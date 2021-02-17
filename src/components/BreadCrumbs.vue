<template>
  <v-breadcrumbs :items="crumbs">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    crumbs() {
      if (this.$route.name === 'Home') {
        return [{ to: '/', text: 'Пошук', disabled: true }];
      }
      return [
        {
          to: '/',
          text: 'Пошук',
          disabled: false,
        },
        {
          text: this.$route.meta.breadCrumb,
          disabled: true,
        },
      ];
    },
  },
};
</script>
