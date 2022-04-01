<template>
  <v-card flat>
    <v-card-title>
      Profile
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  name: 'Profile',
  nuxtI18n: {
    paths: {
      uk: '/game/profile',
      en: '/game/profile',
    },
  },
  layout: 'gameLayout',
};
</script>
