<template>
  <div>SignOut</div>
</template>
<script>
export default {
  name: 'SignOut',
  layout: 'gameLayout',
  nuxtI18n: {
    paths: {
      uk: '/auth/signout',
      en: '/auth/signout',
    },
  },
  async asyncData({ $fire, app, store }) {
    try {
      await $fire.auth.signOut();
      await app.router.push(store.localePath({ path: '/' }));
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
