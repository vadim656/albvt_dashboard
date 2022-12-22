<template>
  <div
    v-click-outside="externalClick"
    v-if="active"
    class="absolute top-0 right-0 flex flex-wrap gap-3 text-sm bg-white drop-shadow-md rounded-md p-4 z-[3]"
  >
    <slot />
    
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  data () {
    return {
      active: false,
      id: null
    }
  },
  methods: {
    externalClick () {
      this.active = false
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
}
</script>

<style></style>
