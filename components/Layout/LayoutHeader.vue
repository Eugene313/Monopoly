<template>
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon
      @click="setDrawer(!drawer)"
    />
    <nuxt-link :to="localePath('/')">
      <v-img
        max-width="200"
        max-height="60"
        src="/image/monopoly-logo-png-transparent.png"
      />
    </nuxt-link>
    <v-btn
      class="ml-5"
      color="success"
      @click="toCreateGamePage"
    >
      <v-icon left>
        mdi-play
      </v-icon>
      Play
    </v-btn>
    <v-spacer />
    <v-btn
      v-if="user"
      class="ml-5 error"
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
    toCreateGamePage() {
      this.$router.push(this.localePath({ name: 'Game-Create' }));
    },
    logOut() {
      this.$router.push(this.localePath({ name: 'Auth-SignOut' }));
    },
  },
};
</script>
