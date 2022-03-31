export const actions = {
  async nuxtServerInit({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user;
      await dispatch('auth/onAuthStateChangedAction', {
        authUser,
        claims,
        token,
      });
    }
  },
};
