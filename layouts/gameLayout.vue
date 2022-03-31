<template>
  <v-app dark>
    <GameLayoutUsers />
    <v-main>
      <nuxt />
    </v-main>
    <GameLayoutChat />
  </v-app>
</template>
<script>
import GameLayoutUsers from '~/components/Layout/GameLayout/GameLayoutUsers';
import GameLayoutChat from '~/components/Layout/GameLayout/GameLayoutChat';

export default {
  name: 'GameLayout',
  components: {
    GameLayoutUsers,
    GameLayoutChat,
  },
  middleware: ['auth'],
};
</script>
