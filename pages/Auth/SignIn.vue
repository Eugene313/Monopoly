<template>
  <div class="sign-in">
    <div class="sign-in_logo">
      <img
        src="~/static/favicon.svg"
        alt="logo"
      >
    </div>
    <div class="sign-in_form">
      <div class="sign-in_form-title">
        Welcome to Monopoly Play!
      </div>
      <div class="sign-in_form-description">
        Please sign-in to your account and start playing
      </div>
      <form @submit.prevent="checkForm">
        <v-text-field
          v-model="email"
          label="E-mail"
          :error-messages="emailErrors"
          outlined
          prepend-inner-icon="mdi-at"
          placeholder="email.example.com"
          @blur="$v.email.$touch()"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :error-messages="passwordErrors"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          outlined
          prepend-inner-icon="mdi-key-variant"
          @blur="$v.password.$touch()"
          @click:append="showPassword = !showPassword"
        />
        <div class="sign-in_form-forgot-password">
          <nuxt-link :to="localePath({ name: 'Auth-ForgotPassword' })">
            Forgot Password?
          </nuxt-link>
        </div>
        <div class="sign-in_form-action">
          <v-btn
            type="submit"
            color="primary"
            block
          >
            <v-icon>
              mdi-check
            </v-icon>
            Sign in
          </v-btn>
        </div>
        <div class="sign-in_sing-up">
          <span>New on our platform?</span>
          <nuxt-link :to="localePath({ name: 'Auth-SignUp' })">
            Create an account
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'SignOut',
  nuxtI18n: {
    paths: {
      uk: '/auth/signin',
      en: '/auth/signin',
    },
  },
  layout: 'authLayout',
  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) { return errors; }
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) { return errors; }
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters');
      !this.$v.password.required && errors.push('Password is required.');
      return errors;
    },
  },
  methods: {
    ...mapActions('auth', [
      'onAuthStateChangedAction',
    ]),
    checkForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },
    async login() {
      try {
        this.$spinner.start();
        const user = await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password);
        await this.onAuthStateChangedAction({
          authUser: user,
        });
        await this.$router.push(this.localePath({ name: 'Game-Search' }));
      } catch (e) {
        console.log(e.message);
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
  justify-content: space-between
  width: 100%
  height: 100%
  .sign-in_logo
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    img
      width: 400px
  .sign-in_form
    min-width: 480px
    background: white
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    padding: 40px 60px
  .sign-in_form-title
    margin-bottom: 8px
    color: rgba(94,86,105,.87)
    font-weight: 600
    font-size: 24px
  .sign-in_form-description
    max-width: 300px
    margin-bottom: 20px
    color: rgba(94,86,105,.68)
    font-size: 14px
  .sign-in_form-forgot-password
    display: flex
    justify-content: flex-end
    margin-bottom: 24px
    a
      text-decoration: none
      color: #9155fd
  .sign-in_form-action
    display: flex
    justify-content: center
    margin-bottom: 24px
  .sign-in_sing-up
    display: flex
    justify-content: center
    span
      color: #5e5669ad
      margin-right: 5px
    a
      text-decoration: none
      color: #9155fd
@media (max-width: 1200px)
  .sign-in
    justify-content: center
    .sign-in_logo
      display: none
    .sign-in_form
      width: 100%
      padding: 10px
      min-width: auto
</style>
