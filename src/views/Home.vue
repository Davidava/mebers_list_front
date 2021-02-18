<template>
  <v-main>
    <v-container>
      <MemberComponent :members="members.docs"/>
      <div class="text-center">
        <v-pagination
          @input="pagination"
          v-model="page"
          :length="members.totalPages"
          :total-visible="7"
        ></v-pagination>
  </div>
      </v-container>
    </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    MemberComponent: () => import('../components/MemberInList'),
  },
  data() {
    return {
      page: +this.$route.query.page || 1,
    };
  },
  watch: {
    $route() {
      this.fetchMembers(this.page);
    },
  },
  mounted() {
    if (!this.members.docs) {
      this.fetchMembers(this.page);
    }
  },
  computed: {
    ...mapGetters({
      members: 'members',
      loadingStatus: 'loadingStatus',
    }),
  },
  methods: {
    ...mapActions({
      fetchMembers: 'fetchMembers',
    }),
    pagination(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
    },
  },
};
</script>
