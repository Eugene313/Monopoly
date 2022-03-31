export const state = () => ({
  user: null,
});
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, authUser) => {
    if (authUser) {
      const { uid, email, emailVerified } = authUser;
      state.user = { uid, email, emailVerified };
    } else {
      state.user = null;
    }
  },
};
export const actions = {
  onAuthStateChangedAction: ({ commit }, { authUser, claims }) => {
    if (!authUser) {
      commit('ON_AUTH_STATE_CHANGED_MUTATION', null);
    } else {
      commit('ON_AUTH_STATE_CHANGED_MUTATION', authUser);
    }
  },
};
