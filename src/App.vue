<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      flat
      outlined
    >
      <v-btn
        v-if="$route.name ==='Member'"
        @click="$router.go(-1)"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        v-if="$route.name !=='Member'"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title class="title mr-6 hidden-sm-and-down">
      Список
    </v-toolbar-title>
    <Autocomlete/>
    </v-app-bar>
    <v-navigation-drawer
      clipped
      app
      v-model="drawer"
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <img :src="$auth.user.picture">
        </v-avatar>
        {{ $auth.user.email }}
        <v-spacer/>
        <v-btn @click="logout">
          Выйти
        </v-btn>
      </v-sheet>
      <v-divider/>

      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          :to="route"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  <router-view/>
  </v-app>
</template>

<script>

export default {
  components: {
    Autocomlete: () => import('./components/Autocomplete'),
  },
  data: () => ({
    drawer: null,
    logoutTimer: null,
    events: ['click', 'mousemove', 'scroll', 'keypress', 'load'],
    links: [
      ['mdi-account-search', 'Список', '/list'],
      ['mdi-account-plus', 'Додати', '/add'],
    ],
  }),
  mounted() {
    this.events.forEach((event) => {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimer();
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    setTimer() {
      this.logoutTimer = setTimeout(this.logout, 1.8e+6);
    },
    resetTimer() {
      clearTimeout(this.logoutTimer);
      this.setTimer();
    },
  },
};
</script>
