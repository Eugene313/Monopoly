export default ({ redirect, $fire, store }) => {
  if (!store.state.auth.user) {
    redirect(store.localePath({ name: 'Auth-SignIn' }));
  }
};
