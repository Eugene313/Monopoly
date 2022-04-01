<template>
  <v-app>
    <Background />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import Background from '~/components/Common/Background';

export default {
  name: 'LandingLayout',
  components: {
    Background,
  },
  middleware: ['loggedIn'],
};
</script>
