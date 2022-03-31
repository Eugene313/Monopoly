<template>
  <div class="game-play_bord">
    <div class="game-play_bord-center">
      <img
        src="~/static/image/monopoly-logo.png"
        alt="logo"
        class="game-play_bord-center_image"
      >
    </div>
    <GamePlayBoardField
      v-for="(field, fieldIndex) in board"
      :key="field.position"
      :field="field"
      :field-index="fieldIndex"
      class="game-play_bord-field"
    />
  </div>
</template>
<script>
import GamePlayBoardField from '~/components/Game/Play/GamePlayBoard/GamePlayBoardField';

export default {
  name: 'GamePlayBoard',
  components: {
    GamePlayBoardField,
  },
  props: {
    board: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="sass">
  .game-play_bord
    width: 830px
    height: 830px
    background: #262c2f
    position: relative
    font-family: 'Comic Sans MS', 'sans-serif'
    box-shadow: 0 0 0 3px #484848
    color: white
    .game-play_bord-center
      display: flex
      justify-content: center
      align-items: center
      position: absolute
      width: 630px
      height: 630px
      top: 100px
      left: 100px
      box-shadow: inset 0 0 2px 1px #4a4a4a
    .game-play_bord-center_image
      width: 500px
      transform: rotate(-45deg) translateY(-26px)
</style>
