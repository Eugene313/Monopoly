<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    floating
    color="#ffffff00"
  >
    <v-list shaped>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item v-if="fullUser">
          <v-list-item-avatar>
            <v-img
              alt="user"
              :src="userPhoto"
              :width="30"
              :height="40"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ userName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in menu"
          :key="item.name"
          @click="toRoute(item.name)"
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import defaultPhoto from '~/static/image/profile-avatart.png';

export default {
  name: 'GameLayoutMenu',
  data() {
    return {
      selectedItem: this.$route.name,
      menu: [
        {
          name: 'Game-Search',
          icon: 'mdi-magnify',
          title: 'Search Game',
        },
        {
          name: 'Game-Create',
          icon: 'mdi-plus',
          title: 'Create Game',
        },
        {
          name: 'Game-History',
          icon: 'mdi-history',
          title: 'History',
        },
      ],
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
    userPhoto() {
      return this.fullUser.avatarUrl || defaultPhoto;
    },
    userName() {
      return this.fullUser.name || 'Profile';
    },
  },
  methods: {
    ...mapActions('layout', [
      'setDrawer',
    ]),
    toRoute(name) {
      this.$router.push(this.localePath({ name }));
    },
  },
};
</script>
