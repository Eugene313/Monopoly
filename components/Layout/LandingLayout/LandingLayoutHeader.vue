<template>
  <v-app-bar
    app
    flat
    color="#ffffff00"
  >
    <v-btn
      color="success"
      class="ml-5"
      @click="goToCabinetSearch"
    >
      PLay
    </v-btn>
    <v-spacer />
    <v-btn
      v-if="!fullUser"
      text
      class="ml-5"
      @click="login"
    >
      Sign in
    </v-btn>
    <v-btn
      v-if="!fullUser"
      class="ml-5"
      outlined
      @click="registration"
    >
      Sign up
    </v-btn>
    <v-btn
      v-if="fullUser"
      outlined
      @click="logOut"
    >
      LogOut
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'LandingLayoutHeader',
  computed: {
    ...mapState('auth', [
      'fullUser',
    ]),
  },
  methods: {
    login() {
      this.$router.push(this.localePath({ name: 'Auth-SignIn' }));
    },
    registration() {
      this.$router.push(this.localePath({ name: 'Auth-SignUp' }));
    },
    logOut() {
      this.$router.push(this.localePath({ name: 'Auth-SignOut' }));
    },
    goToCabinetSearch() {
      this.$router.push(this.localePath({ name: 'Cabinet-Search' }));
    },
  },
};
</script>
