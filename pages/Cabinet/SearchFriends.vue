<template>
  <v-card flat>
    <v-card-title>
      Search friends
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="searchValue"
        label="User email"
        outlined
        @input="searchUsersHandler"
      />
      <v-list v-if="searchUsers">
        <v-list-item
          v-for="searchUser in searchUsers"
          :key="searchUser.userId"
        >
          <v-list-item-avatar>
            <v-img
              alt=""
              :src="searchUser.avatartUrl || defaultPhoto"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ searchUser.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn
              v-if="isAddSearchUserAvailable(searchUser.userId).add"
              color="primary"
              @click="addToFriend(searchUser.userId)"
            >
              <v-icon class="mr-2">
                mdi-account-plus
              </v-icon>
              add
            </v-btn>
            <v-btn
              v-if="isAddSearchUserAvailable(searchUser.userId).pending"
              color="primary"
              :disabled="true"
            >
              <v-icon class="mr-2">
                mdi-account-plus
              </v-icon>
              Sending
            </v-btn>
            <v-btn
              v-if="isAddSearchUserAvailable(searchUser.userId).confirm"
              color="primary"
              @click="confirmRequest(searchUser.userId)"
            >
              <v-icon class="mr-2">
                mdi-account-plus
              </v-icon>
              Confirm
            </v-btn>
            <v-btn
              v-if="isAddSearchUserAvailable(searchUser.userId).delete"
              color="error"
              @click="deleteFriend(searchUser.userId)"
            >
              <v-icon class="mr-2">
                mdi-account-minus
              </v-icon>
              Remove
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';
import defaultPhoto from '~/static/image/profile-avatart.png';

export default {
  name: 'SearchFriends',
  nuxtI18n: {
    paths: {
      uk: '/cabinet/search-friends',
      en: '/cabinet/search-friends',
    },
  },
  layout: 'cabinetLayout',
  data() {
    return {
      defaultPhoto,
      searchValue: '',
      searchUsers: null,
      userRequests: null,
      searchUserRequests: null,
    };
  },
  computed: {
    ...mapState('auth', [
      'fullUser',
    ]),
  },
  async mounted() {
    await this.getUserToSearchUsersRequests();
    await this.getSearchUsersToUserRequests();
    await this.watchUserRequest();
    await this.watchSearchUsersRequest();
  },
  methods: {
    isAddSearchUserAvailable(searchUserId) {
      const result = {
        add: true,
        pending: false,
        confirm: false,
        delete: false,
      };
      if (this.userRequests) {
        for (const key in this.userRequests) {
          const request = this.userRequests[key];
          if (request.receiverId === searchUserId && request.status === 'await') {
            result.add = false;
            result.pending = true;
            result.confirm = false;
            result.delete = false;
          } else if (request.receiverId === searchUserId && request.status === 'confirm') {
            result.add = false;
            result.pending = false;
            result.confirm = false;
            result.delete = true;
          }
        }
      }
      if (this.searchUserRequests) {
        for (const key in this.searchUserRequests) {
          const request = this.searchUserRequests[key];
          if (request.senderId === searchUserId && request.status === 'await') {
            result.add = false;
            result.pending = false;
            result.confirm = true;
            result.delete = false;
          } else if (request.senderId === searchUserId && request.status === 'confirm') {
            result.add = false;
            result.pending = false;
            result.confirm = false;
            result.delete = true;
          }
        }
      }
      return result;
    },
    async getUserToSearchUsersRequests() {
      const request = await this.$fire.database.ref('friends').orderByChild('senderId').equalTo(this.fullUser.userId).get();
      if (request.val()) {
        this.userRequests = request.val();
      } else {
        this.userRequests = null;
      }
    },
    async getSearchUsersToUserRequests() {
      const request = await this.$fire.database.ref('friends').orderByChild('receiverId').equalTo(this.fullUser.userId).get();
      if (request.val()) {
        this.searchUserRequests = request.val();
      } else {
        this.searchUserRequests = null;
      }
    },
    async watchUserRequest() {
      await this.$fire.database.ref('friends').orderByChild('senderId').equalTo(this.fullUser.userId).on('value', this.updateUserRequest);
    },
    async watchSearchUsersRequest() {
      await this.$fire.database.ref('friends').orderByChild('receiverId').equalTo(this.fullUser.userId).on('value', this.updateSearchUsersRequest);
    },
    updateUserRequest(snapshot) {
      const request = snapshot.val();
      if (request) {
        this.userRequests = request;
      } else {
        this.userRequests = null;
      }
    },
    updateSearchUsersRequest(snapshot) {
      const request = snapshot.val();
      if (request) {
        this.searchUserRequests = request;
      } else {
        this.searchUserRequests = null;
      }
    },
    async searchUsersHandler() {
      const searchUsers = await this.$fire.database.ref('users').orderByChild('email').startAt(this.searchValue).get();
      if (this.searchValue) {
        this.searchUsers = searchUsers.val();
      } else {
        this.searchUsers = null;
      }
      if (this.searchUsers) {
        delete this.searchUsers[this.fullUser.userId];
      }
    },
    async addToFriend(searchUserId) {
      try {
        this.$spinner.start();
        const requestKey = this.$fire.database.ref('friends').push().key;
        await this.$fire.database.ref(`friends/${requestKey}/`).update({
          requestKey,
          receiverId: searchUserId,
          senderId: this.fullUser.userId,
          status: 'await',
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.$spinner.finish();
      }
    },
    async confirmRequest(searchUserId) {
      try {
        this.$spinner.start();
        const request = Object.values(this.searchUserRequests).find(r => r.senderId === searchUserId);
        const requestKey = request.requestKey;
        await this.$fire.database.ref(`friends/${requestKey}`).update({
          status: 'confirm',
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.$spinner.finish();
      }
    },
    async deleteFriend(searchUserId) {
      try {
        this.$spinner.start();
        const request = Object.values(this.searchUserRequests).find(r => r.senderId === searchUserId);
        const requestKey = request.requestKey;
        await this.$fire.database.ref(`friends/${requestKey}`).remove();
      } catch (e) {
        console.log(e);
      } finally {
        this.$spinner.finish();
      }
    },
  },
};
</script>
