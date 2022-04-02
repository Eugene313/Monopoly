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
      uk: '/cabinet/profile',
      en: '/cabinet/profile',
    },
  },
  layout: 'cabinetLayout',
};
</script>
