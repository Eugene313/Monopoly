<template>
  <v-app>
    <Background />
    <GameLayoutUsers />
    <v-main>
      <nuxt />
    </v-main>
    <GameLayoutChat />
  </v-app>
</template>
<script>
import Background from '~/components/Common/Background';
import GameLayoutUsers from '~/components/Layout/GameLayout/GameLayoutUsers';
import GameLayoutChat from '~/components/Layout/GameLayout/GameLayoutChat';

export default {
  name: 'GameLayout',
  components: {
    Background,
    GameLayoutUsers,
    GameLayoutChat,
  },
  middleware: ['auth'],
};
</script>
