<template>
  <div class="relative flex items-center w-full min-w-[110px] max-w-[220px] " :tabindex="tabindex" @blur="open = false">
    <div
      class="bg-[#4F4F4F] hover:bg-[#5B5B5B] anime text-white text-sm py-2 pl-4 px-2 w-full flex j justify-between items-center rounded-lg gap-1 cursor-pointer hover:drop-shadow-xl anime"
      :class="{ open: open }"
      @click="open = !open"
    >
      {{ selected }}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="{ 'rotate-180': open }" class="w-4 text-white h-4 ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </div>
    

    <div
      class=" bg-[#4F4F4F] text-white absolute z-[3]  left-0 right-0 top-10 border-2 rounded-lg"
      :class="{ hidden: !open }"
    >
      <div
        class="cursor-pointer p-2 bg-white text-gray-900 border-b group text-sm   hover:bg-[#F5F5F5] flex items-center justify-between"
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option
          open = false
          $emit('input', option)
        "
      >
        {{ option }}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-[#343434] hidden group-hover:block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false
    }
  }
}
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}
</style>
