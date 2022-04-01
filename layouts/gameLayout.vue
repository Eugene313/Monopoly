<template>
  <v-app>
    <Background />
    <GameLayoutHeader />
    <GameLayoutMenu />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Background from '~/components/Common/Background';
import GameLayoutHeader from '~/components/Layout/GameLayout/GameLayoutHeader';
import GameLayoutMenu from '~/components/Layout/GameLayout/GameLayoutMenu';

export default {
  name: 'GameLayout',
  components: {
    Background,
    GameLayoutHeader,
    GameLayoutMenu,
  },
  middleware: ['auth'],
};
</script>
