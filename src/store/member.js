import {
  getMember, getMembers, createMember, getMemberAndUpdate, deleteMember, getMatchedMembers,
} from '@/services/members.service';

const mutations = {
  setMembers(state, members) {
    state.members = members;
    state.loadingStatus = false;
  },
  setMember(state, member) {
    state.member = member;
    state.loadingStatus = false;
  },
  findedMembers(state, members) {
    state.membersFinded = members;
    state.loadingStatus = false;
  },
  setNewMember(state, member) {
    state.member = member;
    state.memberCreated = member;
    state.loadingStatus = false;
  },
  setUpdatedMember(state, updatedMember) {
    state.memberUpdated = updatedMember;
  },
  setDeletedMember(state, { message }) {
    state.memberDeleted = message;
  },
  setMemberError(state, error) {
    state.memberError = error;
  },
  setloadingStatus(state, status) {
    state.loadingStatus = status;
  },
};

const actions = {
  async fetchMembers({ commit }, page) {
    commit('setloadingStatus', true);
    try {
      const members = await getMembers(page);
      commit('setMembers', members);
    } catch (err) {
      commit('setMemberError', err);
    }
  },
  async fetchMemberOnReload({ commit }, id) {
    commit('setloadingStatus', true);
    try {
      const member = await getMember(id);
      commit('setMember', member);
    } catch (err) {
      commit('setMemberError', err);
    }
  },
  fetchMember({ commit }, member) {
    commit('setMember', member);
  },
  async searchMembers({ commit }, text) {
    commit('setloadingStatus', true);
    try {
      const members = await getMatchedMembers(text);
      console.log(members);
      commit('findedMembers', members);
    } catch (err) {
      commit('setMemberError', err);
    }
  },
  async addNewMember({ commit }, { image, member }) {
    commit('setloadingStatus', true);
    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      Object.entries(member).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const newMember = await createMember(formData);
      commit('setNewMember', newMember);
    } catch (err) {
      commit('setMemberError', err);
    }
  },
  async updateMember({ commit }, { id, member, image }) {
    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      Object.entries(member).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const updatedMember = await getMemberAndUpdate(id, formData);
      commit('setUpdatedMember', updatedMember);
    } catch (err) {
      commit('setMemberError', err);
    }
  },
  async deleteThisMember({ commit }, id) {
    try {
      const message = await deleteMember(id);
      commit('setDeletedMember', { message, id });
    } catch (err) {
      commit('setMemberError', err);
    }
  },
};
const getters = {
  members: ({ members }) => members,
  member: ({ member }) => member,
  membersFinded: ({ membersFinded }) => membersFinded,
  memberCreated: ({ memberCreated }) => memberCreated,
  memberDeleted: ({ memberDeleted }) => memberDeleted,
  membersLoaded: ({ membersLoaded }) => membersLoaded,
  memberUpdated: ({ memberUpdated }) => memberUpdated,
  loadingStatus: ({ loadingStatus }) => loadingStatus,
  memberError: ({ memberError }) => memberError,
};

const state = () => ({
  members: [],
  member: {},
  membersFinded: [],
  memberCreated: {},
  memberDeleted: '',
  membersLoaded: false,
  memberUpdated: false,
  loadingStatus: false,
  memberError: null,
});

export default {
  mutations,
  actions,
  getters,
  state,
};
