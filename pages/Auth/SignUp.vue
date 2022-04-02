<template>
  <div class="sign-up">
    <div class="sign-up_logo">
      <img
        src="~/static/favicon.svg"
        alt="logo"
      >
    </div>
    <div class="sign-up_form">
      <div class="sign-up_form-title">
        Welcome to Monopoly Play!
      </div>
      <div class="sign-up_form-description">
        Please register your account and start playing
      </div>
      <form @submit.prevent="checkForm">
        <v-text-field
          v-model="user.name"
          label="Name"
          outlined
          :error-messages="nameErrors"
          prepend-inner-icon="mdi-account"
          @blur="$v.user.name.$touch()"
        />
        <v-select
          v-model="user.gender"
          :items="genderTypes"
          item-text="title"
          item-value="id"
          label="Gender"
          outlined
          :error-messages="genderErrors"
          prepend-inner-icon="mdi-gender-male-female"
          @blur="$v.user.gender.$touch()"
        />
        <v-text-field
          v-model="user.phone"
          type="number"
          label="Phone"
          outlined
          :error-messages="phoneErrors"
          prepend-inner-icon="mdi-cellphone"
          @blur="$v.user.phone.$touch()"
        />
        <v-text-field
          v-model="user.email"
          label="E-mail"
          outlined
          :error-messages="emailErrors"
          prepend-inner-icon="mdi-at"
          @blur="$v.user.email.$touch()"
        />
        <v-text-field
          v-model="user.password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          outlined
          :error-messages="passwordErrors"
          prepend-inner-icon="mdi-key-variant"
          @click:append="showPassword = !showPassword"
          @blur="$v.user.password.$touch()"
        />
        <v-text-field
          v-model="user.confirmPassword"
          label="Confirm password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          outlined
          :error-messages="confirmPasswordErrors"
          prepend-inner-icon="mdi-key-variant"
          @click:append="showPassword = !showPassword"
          @blur="$v.user.confirmPassword.$touch()"
        />
        <div class="sign-up_form-action">
          <v-btn
            type="submit"
            color="primary"
            block
          >
            <v-icon>
              mdi-check
            </v-icon>
            Sign up
          </v-btn>
        </div>
        <div class="sign-up_sign-in">
          <span>Already have an account?</span>
          <nuxt-link :to="localePath({ name: 'Auth-SignIn' })">
            Sign in
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { email, minLength, maxLength, required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'SignUp',
  nuxtI18n: {
    paths: {
      uk: '/auth/signup',
      en: '/auth/signup',
    },
  },
  layout: 'authLayout',
  data() {
    return {
      showPassword: false,
      genderTypes: [
        { id: 1, title: 'Male' },
        { id: 2, title: 'Female' },
      ],
      user: {
        userId: null,
        name: '',
        gender: null,
        avatarUrl: '',
        avatarKey: '',
        rank: 0,
        games: 0,
        gamesWins: 0,
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        xp: 0,
        penalties: 0,
        friends: '',
        currentGameId: '',
        currentRoomId: '',
      },
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
      },
      gender: {
        required,
      },
      phone: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(200),
      },
      email: {
        required,
        email,
        maxLength: maxLength(200),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(200),
      },
      confirmPassword: {
        required,
        sameAs: sameAs('confirmPassword'),
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) { return errors; }
      !this.$v.user.name.required && errors.push('Name is required');
      !this.$v.user.name.minLength && errors.push('Name must be at least 3 characters');
      !this.$v.user.name.maxLength && errors.push('Name must be at most 200 characters long');
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.user.gender.$dirty) { return errors; }
      !this.$v.user.gender.required && errors.push('Gender is required');
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.user.phone.$dirty) { return errors; }
      !this.$v.user.phone.required && errors.push('Phone is required');
      !this.$v.user.phone.minLength && errors.push('Phone must be at least 6 characters');
      !this.$v.user.phone.maxLength && errors.push('Phone must be at most 200 characters long');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) { return errors; }
      !this.$v.user.email.email && errors.push('Must be valid E-mail');
      !this.$v.user.email.required && errors.push('E-mail is required');
      !this.$v.user.email.maxLength && errors.push('E-mail must be at most 200 characters long');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) { return errors; }
      !this.$v.user.password.minLength && errors.push('Password must be at least 6 characters');
      !this.$v.user.password.required && errors.push('Password is required.');
      !this.$v.user.password.maxLength && errors.push('Password must be at most 200 characters long');
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.user.confirmPassword.$dirty) { return errors; }
      !this.$v.user.confirmPassword.required && errors.push('Confirm password is required');
      !this.$v.user.confirmPassword.sameAs && errors.push('Passwords do not match');
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
        this.registration();
      }
    },
    async registration() {
      try {
        this.$spinner.start();
        const { user } = await this.$fire.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        this.user.userId = user.uid;
        delete this.user.password;
        delete this.user.confirmPassword;
        await this.$fire.database.ref(`users/${user.uid}`).set(this.user);
        await this.onAuthStateChangedAction({ authUser: user });
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
.sign-up
  display: flex
  justify-content: space-between
  width: 100%
  height: 100%
  .sign-up_logo
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    img
      width: 400px
  .sign-up_form
    min-width: 480px
    background: white
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    padding: 40px 60px
  .sign-up_form-title
    margin-bottom: 8px
    color: rgba(94,86,105,.87)
    font-weight: 600
    font-size: 24px
  .sign-up_form-description
    max-width: 300px
    margin-bottom: 20px
    color: rgba(94,86,105,.68)
    font-size: 14px
  .sign-up_form-forgot-password
    display: flex
    justify-content: flex-end
    margin-bottom: 24px
    a
      text-decoration: none
      color: #9155fd
  .sign-up_form-action
    display: flex
    justify-content: center
    margin-bottom: 24px
  .sign-up_sign-in
    display: flex
    justify-content: center
    span
      color: #5e5669ad
      margin-right: 5px
    a
      text-decoration: none
      color: #9155fd
@media (max-width: 1200px)
  .sign-up
    justify-content: center
    .sign-up_logo
      display: none
    .sign-up_form
      width: 100%
      padding: 10px
      min-width: auto
</style>
