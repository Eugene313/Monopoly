<template>
  <v-app-bar
    app
    flat
    color="#ffffff00"
  >
    <v-app-bar-nav-icon
      @click="setDrawer(!drawer)"
    />
    <v-spacer />
    <v-btn
      v-if="user"
      text
      @click="logOut"
    >
      <v-icon left>
        mdi-play
      </v-icon>
      LogOut
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LayoutHeader',
  computed: {
    ...mapState('layout', [
      'drawer',
    ]),
    ...mapState('auth', [
      'user',
    ]),
  },
  methods: {
    ...mapActions('layout', [
      'setDrawer',
    ]),
    logOut() {
      this.$router.push(this.localePath({ name: 'Auth-SignOut' }));
    },
  },
};
</script>
