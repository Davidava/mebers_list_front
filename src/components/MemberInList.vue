<template>
  <v-list two-line>
    <template v-for="(item, index) in members">
      <v-list-item
        @click="push(item)"
        :key="index"
      >
        <v-list-item-avatar>
          <v-img
            :src="item.avatar || avatarDefault"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-html="`${item.surName} ${item.name} ${item.middleName}`"
          />
          <v-list-item-subtitle
            v-html="item.phoneNumber"
          />
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-text="item.dateOfBirth"
          />
        </v-list-item-action>
      </v-list-item>
      <v-divider
        v-if="index < members.length - 1"
        :key="index+10"
      />
    </template>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    avatarDefault: 'https://res.cloudinary.com/dqe6ahyux/image/upload/v1607687084/iig3kvdvjgcvhezmkpht.png',
  }),
  props: {
    members: {
      type: Array,
      default: () => ([
      ]),
    },
  },
  methods: {
    ...mapActions({
      fetchMember: 'fetchMember',
    }),
    push(item) {
      this.fetchMember(item);
      this.$router.push({ name: 'Member', params: { id: item._id } });
    },
  },
};
</script>
