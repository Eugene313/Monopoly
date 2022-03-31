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
              v-for="(room, roomKey) in rooms"
              :key="roomKey"
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
                    @click="pushToGamePage(room)"
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
      rooms: [],
    };
  },
  mounted() {
    try {
      this.getRooms();
      this.addRoomsWatcher();
    } catch (e) {
      console.log(e);
    };
  },
  methods: {
    async getRooms() {
      this.rooms = (await this.$nuxt.$fire.database.ref('rooms').get()).val();
    },
    addRoomsWatcher() {
      this.$fire.database.ref('rooms').on('child_added', this.updateRooms);
    },
    updateRooms(snapshot) {
      console.log(snapshot);
      this.$set(this.rooms, snapshot.key, snapshot.val());
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
