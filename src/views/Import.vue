<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col cols="11" sm="10" md="8" lg="6">
          <v-card class="elevation-12">
            <v-form
              ref="form"
              v-model="validFields"
            >
              <v-card-text>
                <v-spacer/>
                <AvatarPicker
                :img="avatarUrl"
                @upload-avatar="uploadAvatar($event)"
                />
                <TextFields
                  :member="newMember"
                  :fieldRules="rulesFields"
                  :valid="validFields"
                />
                <v-card-actions>
                  <v-btn
                    text
                    @click="resetForms"
                  >
                    скасувати
                  </v-btn>
                  <v-spacer/>
                  <v-btn
                    text
                    color="success"
                    v-if="!preloader"
                    :disabled="!validFields"
                    @click="submitNewMember"
                  >
                    видправити
                  </v-btn>
                  <v-progress-circular
                    color="primary"
                    indeterminate
                    v-if="preloader"
                  />
                </v-card-actions>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <TosterComponent
        :toster="toster"
      />
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Import',
  components: {
    AvatarPicker: () => import('../components/AvatarPicker'),
    TextFields: () => import('../components/TextFields'),
    TosterComponent: () => import('../components/Toster'),
  },

  data: () => ({
    newMember: {},
    avatarUrl: undefined,
    avatarFileImg: '',
    toster: {
      model: false,
      top: false,
      text: '',
      color: 'default',
    },
    preloader: false,
    validFields: true,
    rulesFields: [
      (v) => !!v || 'field is required',
    ],
  }),

  computed: {
    ...mapGetters({
      memberCreated: 'memberCreated',
    }),
  },

  watch: {
    memberCreated() {
      this.preloader = false;
      this.showMessage('Член успішно створений');
      setTimeout(() => this.$router.push(`member/${this.memberCreated._id}`), 1000);
    },
  },

  methods: {
    ...mapActions({
      addNewMember: 'addNewMember',
    }),
    showMessage(message, error) {
      if (error) {
        this.toster.color = 'error';
        this.toster.top = true;
      }
      this.toster.text = message;
      this.toster.model = true;
      setTimeout(() => { this.toster.model = false; }, 1000);
    },
    uploadAvatar(ev) {
      const file = ev.target.files[0];
      this.avatarFileImg = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.avatarUrl = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    resetForms() {
      this.$refs.form.reset();
      this.avatarFileImg = '';
    },
    submitNewMember() {
      if (this.userRole === 'User') {
        this.showMessage('У вас немає прав для цієї дії', true);
      } else {
        this.preloader = true;
        this.addNewMember({ image: this.avatarFileImg, member: this.newMember });
      }
    },
  },
};
</script>
