<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="fixed inset-0 w-full min-h-screen flex items-center justify-center bg-semi-75"
      @click.self="close"
    >
      <div class="relative w-full max-w-2xl shadow-lg rounded-lg p-8">
        <button
          aria-label="close"
          class="absolute top-0 right-0 text-3xl text-white my-2 mx-4"
          @click.prevent="close"
        >
          <i class="fa fa-times-circle"></i>
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>


<script src="./CModal.js">
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.bg-semi-75 {
  background-color: rgba(0, 0, 0, 0.75);
}
</style>