<template>
  <div
    class="game-play_bord-field"
    :style="fieldStyles"
  >
    <div
      v-if="field.company"
      class="game-play_bord-field_company"
    >
      <div
        :style="companyHeaderStyle"
        class="game-play_bord-field_company-header"
      />
      <div class="game-play_bord-field_company-body">
        <div class="game-play_bord-field_company-title">
          {{ field.company.title.toUpperCase() }}
        </div>
        <div class="game-play_bord-field_company-amount">
          M{{ field.company.amount }}
        </div>
      </div>
    </div>
    <div
      v-if="field.action"
      class="game-play_bord-field_company"
    >
      <img
        :src="field.action.imageUrl"
        :alt="field.action.title"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    field: {
      type: Object,
      default: () => ({}),
    },
    fieldIndex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    fieldStyles() {
      return {
        width: this.field.size.width,
        height: this.field.size.height,
        transform: `translateX(${this.field.coordinates.x}px) translateY(${this.field.coordinates.y}px) rotateZ(${this.field.coordinates.z || 0}deg)`,
      };
    },
    companyHeaderStyle() {
      return {
        background: this.field.company.color,
      };
    },
  },
};
</script>
<style lang="sass">
.game-play_bord-field
  position: absolute
  box-shadow: inset 0 0 0 1px #4a4a4a
  display: flex
  align-items: center
  justify-content: center
  font-size: 18px
  .game-play_bord-field_company
    max-width: 100%
    max-height: 100%
    width: 100%
    height: 100%
    overflow: hidden
    display: flex
    flex-direction: column
    justify-content: space-between
  .game-play_bord-field_company-header
    height: 15px
    border-top: 1px solid #4a4a4a
    border-right: 1px solid #4a4a4a
    border-left: 1px solid #4a4a4a
    border-bottom: 2px solid #4a4a4a
    flex: 1
  .game-play_bord-field_company-body
    flex: 4
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 10px
  .game-play_bord-field_company-title
    font-size: 7px
    text-align: center
    font-weight: bold
  .game-play_bord-field_company-amount
    font-size: 9px
    text-align: center
    font-weight: bold
</style>
