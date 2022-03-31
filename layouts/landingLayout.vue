<template>
  <v-app dark>
    <LandingLayoutHeader />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import LandingLayoutHeader from '~/components/Layout/LandingLayout/LandingLayoutHeader';

export default {
  name: 'LandingLayout',
  components: {
    LandingLayoutHeader,
  },
  middleware: ['loggedIn'],
};
</script>
