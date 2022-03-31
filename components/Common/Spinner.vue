<template>
  <transition name="fade-spinner">
    <div
      v-if="loadingState"
      class="spinner"
    >
      <img
        src="~/static/image/spinner.gif"
        alt="spinner"
      >
    </div>
  </transition>
</template>
<script>

export default {
  name: 'Spinner',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    loadingState() {
      if (this.$store) {
        return this.$store.state.layout.loading || this.loading;
      }
      return this.loading;
    },
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>
<style>
.spinner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #ffffffb5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999999;
}
.fade-spinner-enter-active, .fade-spinner-leave-active {
  transition: opacity .5s;
}
.fade-spinner-enter, .fade-spinner-leave-to {
  opacity: 0;
}
</style>
