<template>
  <v-app>
    <Background />
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
import Background from '~/components/Common/Background';
import LayoutHeader from '~/components/Layout/LayoutHeader';
import LayoutMenu from '~/components/Layout/LayoutMenu';

export default {
  name: 'DefaultLayout',
  components: {
    Background,
    LayoutHeader,
    LayoutMenu,
  },
  middleware: ['auth'],
};
</script>
