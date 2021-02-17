<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col vcols="12" sm="10" md="8" lg="6">
          <v-card
            v-if="!loading"
            class="elevation-12"
          >
            <v-form
              ref="form"
              v-model="validFields"
            >
              <v-card-text>
                <v-spacer/>
                <AvatarPicker
                :img="avatarUrl"
                :reedOnly="!changeCurrentMember"
                @upload-avatar="uploadAvatar($event)"
                />
                <TextFields
                  :member="currentMember"
                  :fieldRules="rulesFields"
                  :fieldReadonly="!changeCurrentMember"
                />
                <v-card-actions>
                  <v-btn
                    v-show="changeCurrentMember"
                    text
                    @click="reset()"
                  >
                    скасувати
                  </v-btn>
                  <v-spacer/>
                  <v-btn
                    v-show="showButtons"
                    text
                    dark
                    color="primary"
                    :disabled="changeCurrentMember"
                    @click="buttonDeleteAction()"
                  >
                    Видалити
                  </v-btn>
                  <v-dialog
                    max-width="290"
                    v-model="dialogButtonDelete"
                  >
                    <DialogAction
                      :dialog="dialogButtonDelete"
                      @dialog-disagree="dialogButtonDelete=false"
                      @dialog-agree="deleteMember()"
                    />
                  </v-dialog>
                  <v-btn
                    v-show="showButtons"
                    text
                    color="success"
                    :disabled="!validFields"
                    @click="updateCurrentMember()"
                  >
                    {{textButtonUpdate}}
                  </v-btn>
                  <v-progress-circular
                      v-if="preloader"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                </v-card-actions>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <Toster
        :toster="toster"
      />
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Member',
  components: {
    AvatarPicker: () => import('../components/AvatarPicker'),
    TextFields: () => import('../components/TextFields'),
    DialogAction: () => import('../components/ButtonDelete'),
    Toster: () => import('../components/Toster'),
  },

  data: () => ({
    avatarUrl: '',
    avatarFileImg: '',
    currentMember: {},
    loading: false,
    toster: {
      model: false,
      top: false,
      text: '',
      color: 'default',
    },
    dialogButtonDelete: false,
    preloader: false,
    showButtons: false,
    textButtonUpdate: 'редагувати',
    changeCurrentMember: false,
    validFields: true,
    rulesFields: [
      (v) => !!v || 'field is required',
    ],
  }),

  computed: {
    ...mapGetters({
      member: 'member',
      memberUpdated: 'memberUpdated',
      memberDeleted: 'memberDeleted',
    }),
  },
  watch: {
    member() {
      this.getCurrentMember();
      this.loading = false;
    },
    memberUpdated() {
      this.fetchMembers();
      this.stopPreloader();
      this.showMessage('Член успішно оновлений');
    },
    memberDeleted() {
      this.fetchMembers();
      this.stopPreloader();
      this.showMessage('Член успішно видалений');
      setTimeout(() => this.$router.replace('/'), 1000);
    },
  },

  mounted() {
    if (!this.member.name) {
      this.loading = true;
      this.fetchMemberOnReload(this.$route.params.id);
    }
    this.getCurrentMember();
    this.checkUser();
  },

  methods: {
    ...mapActions({
      fetchMember: 'fetchMember',
      fetchMembers: 'fetchMembers',
      fetchMemberOnReload: 'fetchMemberOnReload',
      updateMember: 'updateMember',
      deleteThisMember: 'deleteThisMember',
    }),
    getCurrentMember() {
      this.currentMember = { ...this.member };
      this.avatarUrl = this.currentMember.avatar;
    },
    checkUser() {
      if (this.$auth.isAdmin) {
        this.showButtons = true;
      }
    },
    showMessage(message, error) {
      if (error) {
        this.toster.color = 'error';
        this.toster.top = true;
      }
      this.toster.text = message;
      this.toster.model = true;
      setTimeout(() => { this.toster.model = false; }, 1000);
    },
    runPreloader() {
      this.showButtons = false;
      this.preloader = true;
    },
    stopPreloader() {
      this.showButtons = true;
      this.preloader = false;
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
    updateCurrentMember() {
      if (this.changeCurrentMember === false) {
        this.changeCurrentMember = true;
        this.textButtonUpdate = 'надіслати';
      } else {
        this.changeCurrentMember = false;
        this.runPreloader();
        console.log(this.currentMember);
        this.updateMember({
          id: this.$route.params.id, member: this.currentMember, image: this.avatarFileImg,
        });
        this.textButtonUpdate = 'редагувати';
      }
    },
    reset() {
      this.changeCurrentMember = false;
      this.getCurrentMember();
      this.textButtonUpdate = 'редагувати';
    },
    buttonDeleteAction() {
      this.dialogButtonDelete = true;
    },
    deleteMember() {
      this.dialogButtonDelete = false;
      this.runPreloader();
      this.deleteThisMember(this.$route.params.id);
    },
  },
};
</script>
