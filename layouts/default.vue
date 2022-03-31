<template>
  <v-app dark>
    <LayoutHeader />
    <LayoutMenu />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import LayoutHeader from '~/components/Layout/LayoutHeader';
import LayoutMenu from '~/components/Layout/LayoutMenu';

export default {
  name: 'DefaultLayout',
  components: {
    LayoutHeader,
    LayoutMenu,
  },
  middleware: ['auth'],
};
</script>
