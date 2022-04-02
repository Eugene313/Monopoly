<template>
  <div class="play">
    <div class="play-chat" />
    <GamePlayBoard
      :board="board"
    />
    <div class="play-users" />
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import GamePlayBoard from '~/components/Game/Play/GamePlayBoard';
import companyes from '~/constans/companyes';
import actions from '~/constans/actions';

export default {
  name: 'GamePlay',
  components: {
    GamePlayBoard,
  },
  layout: 'gameLayout',
  nuxtI18n: {
    paths: {
      uk: '/game/play/:id',
      en: '/game/play/:id',
    },
  },
  data() {
    return {
      startCoordinates: {
        x: 730,
        y: 730,
        z: 0,
      },
      defaultSize: {
        width: '70px',
        height: '100px',
      },
      cornerSize: {
        width: '100px',
        height: '100px',
      },
      board: [],
    };
  },
  mounted() {
    this.createBord();
  },
  methods: {
    createBordGrid() {
      let coordinates = cloneDeep(this.startCoordinates);
      for (let index = 0; index < 40; index++) {
        if (index === 0) {
          this.board.push({
            position: index + 1,
            size: this.cornerSize,
            coordinates,
          });
        } else if (index > 0 && index < 10) {
          coordinates = cloneDeep({
            ...coordinates,
            x: coordinates.x - 70,
          });
          this.board.push({
            position: index + 1,
            size: this.defaultSize,
            coordinates,
          });
        } else if (index === 10) {
          coordinates = cloneDeep({
            ...coordinates,
            x: coordinates.x - 100,
          });
          this.board.push({
            position: index + 1,
            size: this.cornerSize,
            coordinates,
          });
          coordinates = cloneDeep({
            ...coordinates,
            x: coordinates.x + 15,
            y: coordinates.y - 15,
            z: coordinates.z + 90,
          });
        } else if (index > 10 && index < 20) {
          coordinates = cloneDeep({
            ...coordinates,
            y: coordinates.y - 70,
          });
          this.board.push({
            position: index + 1,
            size: this.defaultSize,
            coordinates,
          });
        } else if (index === 20) {
          coordinates = cloneDeep({
            ...coordinates,
            y: coordinates.y - 85,
            x: coordinates.x - 15,
          });
          this.board.push({
            position: index + 1,
            size: this.cornerSize,
            coordinates,
          });
          coordinates = cloneDeep({
            ...coordinates,
            x: coordinates.x + 30,
            z: coordinates.z + 90,
          });
        } else if (index > 20 && index < 30) {
          coordinates = cloneDeep({
            ...coordinates,
            x: coordinates.x + 70,
          });
          this.board.push({
            position: index + 1,
            size: this.defaultSize,
            coordinates,
          });
        } else if (index === 30) {
          coordinates = cloneDeep({
            ...coordinates,
            x: coordinates.x + 70,
          });
          this.board.push({
            position: index + 1,
            size: this.cornerSize,
            coordinates,
          });
          coordinates = cloneDeep({
            ...coordinates,
            z: coordinates.z + 90,
            y: coordinates.y + 15,
            x: coordinates.x + 15,
          });
        } else if (index > 30 && index < 40) {
          coordinates = cloneDeep({
            ...coordinates,
            y: coordinates.y + 70,
          });
          this.board.push({
            position: index + 1,
            size: this.defaultSize,
            coordinates,
          });
        }
      }
    },
    setCompanyes() {
      for (const company of companyes) {
        this.board[company.position - 1].company = company;
      }
    },
    setActions() {
      for (const action of actions) {
        this.board[action.position - 1].action = action;
      }
    },
    createBord() {
      this.createBordGrid();
      this.setCompanyes();
      this.setActions();
    },
  },
};
</script>
<style lang="sass">
.play
  display: flex
  justify-content: center
  min-height: 100%
  padding-top: 10px
  perspective: 1000px
</style>
