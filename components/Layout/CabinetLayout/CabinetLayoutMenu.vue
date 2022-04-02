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
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import defaultPhoto from '~/static/image/profile-avatart.png';

export default {
  name: 'CabinetLayoutMenu',
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
          avatarUrl: this?.fullUser?.avatarUrl || defaultPhoto,
          title: this?.fullUser?.name,
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
          name: 'Cabinet-History',
          icon: 'mdi-history',
          title: 'History',
        },
      ];
    },
  },
  methods: {
    ...mapActions('layout', [
      'setDrawer',
    ]),
  },
};
</script>
