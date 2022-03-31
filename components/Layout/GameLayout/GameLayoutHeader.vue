<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
  >
    <v-spacer />
    <v-btn
      color="error"
      @click="confirmQuitGame"
    >
      Quit Game
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Do you really want to leave the game ?
        </v-card-title>
        <v-card-text>
          If you leave the game you can't come back
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error darken-1"
            text
            @click="quitGame"
          >
            Quit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script>
export default {
  name: 'GameLayoutHeader',
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    confirmQuitGame() {
      this.dialog = true;
    },
    toGameSearchPage() {
      this.$router.push(this.localePath({ name: 'Game-Search' }));
    },
    quitGame() {
      this.toGameSearchPage();
    },
  },
};
</script>
