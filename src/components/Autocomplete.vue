<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    flat
    return-object
    clearable
    no-filter
    hide-details
    hide-no-data
    item-text="name"
    label="Пошук в списку..."
    solo
    prepend-inner-icon="mdi-magnify"
  >
  <template v-slot:item="{ item }">
    <v-list-item-avatar
      color="indigo"
      class="headline font-weight-light white--text"
    >
      <img :src="item.avatar || avatarDefault ">
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        v-text="`${item.surName} ${item.name} ${item.middleName}`"
      >
      </v-list-item-title>
      <v-list-item-subtitle v-text="item.phoneNumber"></v-list-item-subtitle>
    </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-text="item.dateOfBirth"></v-list-item-action-text>
        </v-list-item-action>
      </template>
    </v-autocomplete>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    avatarDefault: 'https://res.cloudinary.com/dqe6ahyux/image/upload/v1607687084/iig3kvdvjgcvhezmkpht.png',
    search: null,
    model: null,
    debounce: null,
    val: '',
  }),
  computed: {
    ...mapGetters({
      items: 'membersFinded',
      isLoading: 'loadingStatus',
    }),
  },
  watch: {
    search(val) {
      if (!this.isLoading) {
        if (val !== '') {
          this.searchResult(val);
        }
      }
    },
    model(member) {
      this.fetchMember(member);
      if (this.$route.name === 'Member') {
        this.$router.replace({ name: 'Member', params: { id: member._id } });
      } else {
        this.$router.push({ name: 'Member', params: { id: member._id } });
      }
    },
  },
  methods: {
    ...mapActions({
      searchMembers: 'searchMembers',
      fetchMember: 'fetchMember',
    }),
    searchResult(val) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchMembers(val);
      }, 600);
    },
  },
};
</script>
