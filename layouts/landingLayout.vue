<template>
  <v-app dark>
    <LandingLayoutHeader />
    <v-main>
      <LandingLayoutBackGround />
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import LandingLayoutHeader from '~/components/Layout/LandingLayout/LandingLayoutHeader';
import LandingLayoutBackGround from '~/components/Layout/LandingLayout/LandingLayoutBackGround';

export default {
  name: 'LandingLayout',
  components: {
    LandingLayoutHeader,
    LandingLayoutBackGround,
  },
  middleware: ['loggedIn'],
};
</script>
