<template>
  <div class="registrations">
    <v-card
      width="480"
      flat
      class="pa-10"
    >
      <v-card-text>
        <p>Welcome to Monopoly Play!</p>
        <p>Please register your account and start playing</p>
        <form>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
            outlined
          />
          <v-select
            v-model="user.gender"
            :items="genderTypes"
            item-text="title"
            item-value="id"
            label="Gender"
            outlined
          />
          <v-text-field
            v-model="user.phone"
            label="Phone"
            required
            outlined
          />
          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
            outlined
          />
          <v-text-field
            v-model="user.password"
            label="Password"
            required
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            outlined
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="user.confirmPassword"
            label="Confirm password"
            required
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            outlined
            @click:append="showPassword = !showPassword"
          />
          <v-row justify="center">
            <v-col md="5">
              <v-btn
                color="primary"
                class="mr-4"
                @click="registration"
              >
                <v-icon>
                  mdi-check
                </v-icon>
                Registration
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
  methods: {
    ...mapActions('auth', [
      'onAuthStateChangedAction',
    ]),
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
.registrations
  display: flex
  justify-content: flex-end
  height: 100%
</style>
