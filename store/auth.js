import cloneDeep from 'lodash/cloneDeep';

export const state = () => ({
  user: null,
  fullUser: null,
});
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, authUser) {
    if (authUser) {
      const { uid, email, emailVerified } = authUser;
      state.user = { uid, email, emailVerified };
    } else {
      state.user = null;
    }
  },
  SET_FULL_USER(state, fullUser) {
    state.fullUser = cloneDeep(fullUser);
  },
};
export const actions = {
  async onAuthStateChangedAction({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      commit('ON_AUTH_STATE_CHANGED_MUTATION', null);
    } else {
      commit('ON_AUTH_STATE_CHANGED_MUTATION', authUser);
      await dispatch('getFullUser');
    }
  },
  async getFullUser({ state, commit }) {
    if (state.user) {
      const fullUser = await this.$fire.database.ref(`users/${state.user.uid}`).get();
      commit('SET_FULL_USER', fullUser.val());
    }
  },
};
