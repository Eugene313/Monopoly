<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    clipped
  >
    <v-list>
      <v-list-item v-if="user">
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
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import defaultPhoto from '~/static/image/profile-avatart.png';

export default {
  name: 'LayoutMenu',
  data() {
    return {
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
      'user',
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
      return this.user.photoURL || defaultPhoto;
    },
    userName() {
      return this.user.displayName || 'Profile';
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
