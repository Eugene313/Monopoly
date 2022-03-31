<template>
  <v-row justify="center">
    <v-card
      width="500"
      class="text-left"
    >
      <v-card-title>
        Log In
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
          />
          <v-btn
            class="mr-4"
            @click="login"
          >
            submit
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignOut',
  nuxtI18n: {
    paths: {
      uk: '/auth/signin',
      en: '/auth/signin',
    },
  },
  layout: 'landingLayout',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', [
      'onAuthStateChangedAction',
    ]),
    async login() {
      try {
        const user = await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password);
        await this.onAuthStateChangedAction({
          authUser: user,
        });
        await this.$router.push(this.localePath({ name: 'Game-Search' }));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
