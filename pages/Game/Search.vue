<template>
  <v-card>
    <v-card-title>
      Search Game
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-list>
            <v-list-item
              v-for="game in games"
              :key="game.id"
            >
              <v-list-item-action>
                <v-icon>
                  mdi-play
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    color="success"
                    @click="pushToGamePage(game)"
                  >
                    play
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Search',
  nuxtI18n: {
    paths: {
      uk: '/game/search',
      en: '/game/search',
    },
  },
  data() {
    return {
      games: [],
    };
  },
  mounted() {
    console.log(this.$fire.auth.currentUser, 'fire');
    console.log(this.$store.state.auth.user, 'store');
    this.getGames();
  },
  methods: {
    getGames() {
      this.games = JSON.parse(localStorage.getItem('games')) || [];
    },
    pushToGamePage(game) {
      this.$router.push(this.localePath({
        name: 'Game-Play',
        params: {
          id: game.id,
        },
      }));
    },
  },
};
</script>
