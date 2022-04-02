<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    floating
    color="#fff"
  >
    <v-list shaped>
      <v-list-item-group>
        <v-list-item
          v-for="item in menu"
          :key="item.name"
          :to="localePath({ name: item.name })"
          nuxt
        >
          <v-list-item-avatar>
            <v-icon v-if="item.icon">
              {{ item.icon }}
            </v-icon>
            <v-img
              v-else
              alt="user"
              :src="item.avatarUrl"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list subheader>
      <v-subheader>
        Friends ({{ friends.length }})
      </v-subheader>
      <v-list-item v-if="!friends.length">
        <v-list-item-content>
          <v-list-item-subtitle>
            You have no friends
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="friend in friends"
        :key="friend.userId"
      >
        <v-list-item-avatar>
          <v-img
            alt=""
            :src="friend.avatartUrl || defaultPhoto"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ friend.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import defaultPhoto from '~/static/image/profile-avatart.png';

export default {
  name: 'CabinetLayoutMenu',
  data() {
    return {
      defaultPhoto,
      friends: [],
    };
  },
  computed: {
    ...mapState('layout', [
      'drawer',
    ]),
    ...mapState('auth', [
      'fullUser',
    ]),
    drawerState: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.setDrawer(value);
      },
    },
    menu() {
      return [
        {
          name: 'Cabinet-Profile',
          avatarUrl: this.fullUser?.avatarUrl || this.defaultPhoto,
          title: this.fullUser?.name,
        },
        {
          name: 'Cabinet-Search',
          icon: 'mdi-magnify',
          title: 'Search Game',
        },
        {
          name: 'Cabinet-Create',
          icon: 'mdi-plus',
          title: 'Create Game',
        },
        {
          name: 'Cabinet-SearchFriends',
          icon: 'mdi-account-search',
          title: 'Search Friends',
        },
        {
          name: 'Cabinet-History',
          icon: 'mdi-history',
          title: 'History',
        },
      ];
    },
  },
  async mounted() {
    await this.getFriends();
  },
  methods: {
    ...mapActions('layout', [
      'setDrawer',
    ]),
    async getFriends() {
      const senderRequest = await this.$fire.database.ref('friends').orderByChild('senderId').equalTo(this.fullUser.userId).get();
      const receiverRequest = await this.$fire.database.ref('friends').orderByChild('receiverId').equalTo(this.fullUser.userId).get();
      let result = {};
      if (senderRequest) {
        result = {
          ...result,
          ...senderRequest.val(),
        };
      }
      if (receiverRequest) {
        result = {
          ...result,
          ...receiverRequest.val(),
        };
      }
      const confirmRequests = Object.values(result).filter(r => r.status === 'confirm');
      const friendsIds = [];
      for (const request of confirmRequests) {
        if (request.receiverId !== this.fullUser.userId) {
          friendsIds.push(request.receiverId);
        }
        if (request.senderId !== this.fullUser.userId) {
          friendsIds.push(request.senderId);
        }
      }
      for (const friend of friendsIds) {
        const user = await this.$fire.database.ref('users').child(friend).get();
        this.friends.push(user.val());
      }
    },
  },
};
</script>
