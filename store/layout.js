export const state = () => ({
  drawer: true,
});
export const mutations = {
  setDrawer(state, value) {
    state.drawer = value;
  },
};
export const actions = {
  setDrawer({ commit }, value) {
    commit('setDrawer', value);
  },
};
