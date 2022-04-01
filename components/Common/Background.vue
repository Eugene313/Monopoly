<template>
  <div class="background">
    <div
      v-for="cube in cubes"
      :key="cube"
      class="background_cube"
    >
      <div class="background_cube-wrap">
        <div
          v-for="row in cube.rows"
          :key="row"
          class="background_cube-row"
        >
          <div
            v-for="dot in row"
            :key="dot"
            class="background_cube-dot"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Background',
  data() {
    return {
      cubes: [],
    };
  },
  mounted() {
    this.createCubes();
  },
  methods: {
    createCubes() {
      for (let i = 0; i < 10; i++) {
        if (i === 0) {
          this.cubes.push({ rows: { 1: 0, 2: 1, 3: 0 } });
        } else if (i === 1 || i === 7) {
          this.cubes.push({ rows: { 1: 1, 2: 0, 3: 1 } });
        } else if (i === 2) {
          this.cubes.push({ rows: { 1: 1, 2: 1, 3: 1 } });
        } else if (i === 3 || i === 6) {
          this.cubes.push({ rows: { 1: 2, 2: 0, 3: 2 } });
        } else if (i === 4 || i === 8) {
          this.cubes.push({ rows: { 1: 2, 2: 1, 3: 2 } });
        } else if (i === 5 || i === 9) {
          this.cubes.push({ rows: { 1: 2, 2: 2, 3: 2 } });
        }
      }
    },
    getCount(cubeIndex) {
      return { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 1, 8: 2, 9: 3, 10: 4 }[cubeIndex];
    },
  },
};
</script>
<style lang="sass">
.background
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: hidden
  background: rgb(90 86 86 / 10%)
.background_cube
  position: absolute
  list-style: none
  width: 20px
  height: 20px
  animation: animate 25s linear infinite
  bottom: -150px
  border-radius: 8px
  background: white
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)
  .background_cube-wrap
    width: 100%
    height: 100%
    padding: 8% 0
  .background_cube-row
    width: 100%
    height: 32%
    display: flex
    justify-content: space-around
    align-items: center
  .background_cube-dot
    border-radius: 50%
    background: black
    width: 20%
    height: 74%
  &:nth-child(1)
    left: 25%
    width: 80px
    height: 80px
    animation-delay: 0s
  &:nth-child(2)
    left: 10%
    width: 20px
    height: 20px
    animation-delay: 2s
    animation-duration: 12s
    .background_cube-wrap
      transform: rotateZ(45deg)
  &:nth-child(3)
    left: 70%
    width: 20px
    height: 20px
    animation-delay: 4s
    .background_cube-wrap
      transform: rotateZ(45deg)
  &:nth-child(4)
    left: 40%
    width: 60px
    height: 60px
    animation-delay: 0s
    animation-duration: 18s
  &:nth-child(5)
    left: 65%
    width: 20px
    height: 20px
    animation-delay: 0s
  &:nth-child(6)
    left: 75%
    width: 110px
    height: 110px
    animation-delay: 3s
  &:nth-child(7)
    left: 35%
    width: 150px
    height: 150px
    animation-delay: 7s
  &:nth-child(8)
    left: 50%
    width: 25px
    height: 25px
    animation-delay: 15s
    animation-duration: 45s
    .background_cube-wrap
      transform: rotateZ(45deg)
  &:nth-child(9)
    left: 20%
    width: 15px
    height: 15px
    animation-delay: 2s
    animation-duration: 35s
    .background_cube-wrap
      transform: rotateZ(45deg)
  &:nth-child(10)
    left: 85%
    width: 150px
    height: 150px
    animation-delay: 0s
    animation-duration: 11s
@keyframes animate
  0%
    transform: translateY(0) rotate(0deg)
  100%
    transform: translateY(-1000px) rotate(720deg)
</style>
