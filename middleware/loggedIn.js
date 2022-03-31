export default ({ app, redirect, $fire, store }) => {
  if (store.state.auth.user) {
    redirect(store.localePath('Game-Search'));
  }
};
