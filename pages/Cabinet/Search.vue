<template>
  <div class="search">
    <v-card
      v-if="userAdminRooms.length"
      flat
      class="mb-10"
    >
      <v-card-title>
        Your game
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item
                v-for="(room, roomKey) in userAdminRooms"
                :key="roomKey"
              >
                <v-row>
                  <v-col>
                    <v-avatar />
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      v-if="userInviteRooms.length"
      class="mb-10"
      flat
    >
      <v-card-title>
        Invite games
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item
                v-for="(room, roomKey) in userInviteRooms"
                :key="roomKey"
              >
                Invite games
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      v-if="otherRooms.length"
      class="mb-10"
      flat
    >
      <v-card-title>
        All games
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item
                v-for="(room, roomKey) in otherRooms"
                :key="roomKey"
              >
                All game
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Search',
  nuxtI18n: {
    paths: {
      uk: '/cabinet/search',
      en: '/cabinet/search',
    },
  },
  layout: 'cabinetLayout',
  data() {
    return {
      rooms: {},
    };
  },
  computed: {
    ...mapState('auth', [
      'fullUser',
    ]),
    userAdminRooms() {
      return Object.values(this.rooms).filter(r => r.playersIds.includes(this.fullUser?.userId));
    },
    userInviteRooms() {
      return Object.values(this.rooms).filter(r => (r.invitesPlayersIds || []).includes(this.fullUser?.userId));
    },
    otherRooms() {
      return Object.values(this.rooms).filter(r => !(r.invitesPlayersIds || []).includes(this.fullUser?.userId) && !r.playersIds.includes(this.fullUser?.userId));
    },
  },
  async mounted() {
    try {
      this.$spinner.start();
      await this.getRooms();
      await this.addRoomsWatcher();
    } catch (e) {
      console.log(e);
    } finally {
      this.$spinner.finish();
    }
  },
  methods: {
    getUsers() {
      const usersIds = [];
      for (const key in this.rooms) {
        console.log(key);
      }
      console.log(usersIds);
    },
    async getRooms() {
      this.rooms = (await this.$nuxt.$fire.database.ref('rooms').get()).val() || {};
    },
    addRoomsWatcher() {
      this.$fire.database.ref('rooms').on('child_added', this.updateRooms);
    },
    updateRooms(snapshot) {
      this.$set(this.rooms, snapshot.key, snapshot.val() || {});
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
