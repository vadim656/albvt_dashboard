<template>
  <div
    v-show="active"
    class="top-0 left-0 absolute w-screen h-screen flex justify-center items-center"
  >
    <div
      @click="active = !active"
      class="bg-gray-900/30 absolute w-screen h-screen z-[99] "
    ></div>
    <div
      class=" p-6 rounded-md bg-white flex justify-center items-center z-[100] drop-shadow-lg"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>

<style></style>
