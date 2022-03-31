<template>
  <v-row justify="center">
    <v-card
      width="500"
      class="text-left"
    >
      <v-card-title>
        Registration
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            v-model="name"
            label="Name"
            required
          />
          <v-text-field
            v-model="phoneNumber"
            label="Phone"
            required
          />
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
            @click="registration"
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
  name: 'Registration',
  nuxtI18n: {
    paths: {
      uk: '/auth/registration',
      en: '/auth/registration',
    },
  },
  layout: 'landingLayout',
  data() {
    return {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', [
      'onAuthStateChangedAction',
    ]),
    async registration() {
      try {
        const { user } = await this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password);
        await user.updateProfile({
          displayName: this.name,
          phoneNumber: this.phoneNumber,
        });
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
