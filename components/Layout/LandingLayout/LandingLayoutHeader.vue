<template>
  <v-app-bar
    app
    flat
    color="#ffffff00"
  >
    <v-spacer />
    <v-btn
      text
      class="ml-5"
      @click="login"
    >
      Sign in
    </v-btn>
    <v-btn
      class="ml-5"
      outlined
      @click="registration"
    >
      Sign up
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'LandingLayoutHeader',
  methods: {
    login() {
      this.$router.push(this.localePath({ name: 'Auth-SignIn' }));
    },
    registration() {
      this.$router.push(this.localePath({ name: 'Auth-Registration' }));
    },
  },
};
</script>
