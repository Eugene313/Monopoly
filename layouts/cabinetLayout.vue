<template>
  <v-app>
    <Background />
    <CabinetLayoutHeader />
    <CabinetLayoutMenu />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Background from '~/components/Common/Background';
import CabinetLayoutHeader from '~/components/Layout/CabinetLayout/CabinetLayoutHeader';
import CabinetLayoutMenu from '~/components/Layout/CabinetLayout/CabinetLayoutMenu';

export default {
  name: 'GameLayout',
  components: {
    Background,
    CabinetLayoutHeader,
    CabinetLayoutMenu,
  },
  middleware: ['auth'],
};
</script>
