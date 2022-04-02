<template>
  <v-card flat>
    <v-card-title>
      Create Game
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-select
              v-model="room.settings.gameMode"
              :items="gameMods"
              item-text="title"
              item-value="id"
              label="Game mode"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="room.settings.maxPlayers"
              :items="[2,3,4,5]"
              label="Number of players"
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center">
        <v-col md="1">
          <v-btn
            color="primary"
            @click="createRoom"
          >
            create
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Create',
  nuxtI18n: {
    paths: {
      uk: '/cabinet/create',
      en: '/cabinet/create',
    },
  },
  layout: 'cabinetLayout',
  data() {
    return {
      valid: false,
      gameMods: [
        {
          id: '1',
          title: 'Classic',
        },
      ],
      room: {
        adminUserId: null,
        playersIds: [],
        invitesPlayersIds: [],
        bansPlayersIds: [],
        settings: {
          maxPlayers: 4,
          gameMode: 0,
        },
      },
    };
  },
  computed: {
    ...mapState('auth', [
      'fullUser',
    ]),
  },
  mounted() {
    this.setDefaultUserInfo();
  },
  methods: {
    setDefaultUserInfo() {
      this.room.adminUserId = this.fullUser.userId;
      this.room.playersIds.push(this.fullUser.userId);
    },
    pushToSearchPage() {
      this.$router.push(this.localePath({ name: 'Cabinet-Search' }));
    },
    async createRoom() {
      try {
        this.$spinner.start();
        await this.$fire.database.ref('rooms').push().set(this.room);
        await this.pushToSearchPage();
      } catch (e) {
        console.log(e);
      } finally {
        this.$spinner.finish();
      }
    },
  },
};
</script>
