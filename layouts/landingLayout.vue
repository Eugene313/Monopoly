<template>
  <v-app>
    <Background />
    <LandingLayoutHeader />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import LandingLayoutHeader from '~/components/Layout/LandingLayout/LandingLayoutHeader';
import Background from '~/components/Common/Background';

export default {
  name: 'LandingLayout',
  components: {
    LandingLayoutHeader,
    Background,
  },
};
</script>
