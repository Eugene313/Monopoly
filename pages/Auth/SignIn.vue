<template>
  <div class="sign-in">
    <v-card
      width="500"
      height="max-content"
    >
      <v-card-title>
        Sign In
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            v-model="email"
            label="E-mail"
            required
            prepend-icon="mdi-email"
          />
          <v-text-field
            v-model="password"
            label="Password"
            required
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-row justify="center">
            <v-col md="auto">
              <v-btn
                color="success"
                @click="login"
              >
                <v-icon>
                  mdi-check
                </v-icon>
                Sign in
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
  </div>
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
      showPassword: false,
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
        this.$spinner.start();
        const user = await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password);
        await this.onAuthStateChangedAction({
          authUser: user,
        });
        await this.$router.push(this.localePath({ name: 'Game-Search' }));
      } catch (e) {
        console.log(e);
      } finally {
        this.$spinner.finish();
      }
    },
  },
};
</script>
<style lang="sass">
.sign-in
  display: flex
  justify-content: center
  width: 100%
  height: 100%
</style>
