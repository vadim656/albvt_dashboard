<template>
  <div>
    <section>
      <b-pagination
        :total="total"
        v-model="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :page-input="hasInput"
        :page-input-position="inputPosition"
        :debounce-page-input="inputDebounce"
      >
      </b-pagination>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  layout: 'main',
  data () {
    return {
      total: 200,
      current: 10,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: '',
      size: '',
      isRounded: true,
      hasInput: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      inputPosition: '',
      inputDebounce: ''
    }
  },
  name: 'IndexPage'
}
</script>
