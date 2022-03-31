<template>
  <v-card>
    <v-card-title>
      Create Game
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-select
              v-model="game.type"
              :items="gameTypes"
              item-text="title"
              item-value="id"
              label="Game type"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="game.mode"
              :items="gameMods"
              item-text="title"
              item-value="id"
              label="Game mode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="game.playersCount"
              :items="[2,3,4,5]"
              label="Number of players"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center">
        <v-col md="1">
          <v-btn
            color="success"
            @click="createGame"
          >
            create
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'GameCreate',
  nuxtI18n: {
    paths: {
      uk: '/game/create',
      en: '/game/create',
    },
  },
  data() {
    return {
      games: [],
      valid: false,
      game: {
        id: Date.now(),
        playersCount: 2,
        type: 'offline',
        mode: 'classic',
      },
      gameTypes: [
        {
          id: 'offline',
          title: 'Offline',
        },
      ],
      gameMods: [
        {
          id: 'classic',
          title: 'Classic',
        },
      ],
    };
  },
  mounted() {
    this.getLocalGames();
    const roomModel = {
      room_id: 'hUjA0U5w',
      v: 2,
      game_mode: 0,
      game_submode: 0,
      game_2x2: 0,
      status: 0,
      flags: {
        ts_created: 1648741295,
        disposition_mode: 0,
        vip: 0,
        is_tournament: 0,
      },
      admin: null,
      players: [[1972021, 1964099]],
      players_joined: {},
      invites: [[]],
      bans: [],
      settings: {
        maxplayers: 4,
        private: 0,
        autostart: 0,
        game_timers: 1,
        br_corner: 2,
        restarts: 0,
        pm_allowed: 1,
        contract_protests: 0,
      },
    };
    console.log(roomModel);
  },
  methods: {
    getLocalGames() {
      this.games = JSON.parse(localStorage.getItem('games')) || [];
    },
    saveGameToLocalStorage() {
      this.games.push(this.game);
      localStorage.setItem('games', JSON.stringify(this.games));
    },
    pushToGamePage() {
      this.$router.push(this.localePath({
        name: 'Game-Play',
        params: {
          id: this.game.id,
        },
      }));
    },
    createGame() {
      this.saveGameToLocalStorage();
      this.pushToGamePage();
    },
  },
};
</script>
