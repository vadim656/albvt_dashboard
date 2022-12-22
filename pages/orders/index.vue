<template>
  <div class="flex w-full flex-col gap-6">
    <table-orders v-if="orders" :data="orders.data" />
    <div
      class="py-12 flex justify-center"
      v-if="
        orders !== undefined &&
          orders.meta.pagination.pageCount >= 2
      "
    >
      <div class="flex gap-3">
        <button
          v-for="(item, i) in orders.meta.pagination.pageCount"
          :key="i"
          class=" w-10 h-10 flex items-center justify-center rounded-full text-white"
          :class="[page == i + 1 ? 'bg-blue-500' : 'bg-blue-400']"
          @click="page = i + 1"
        >
          {{ i + 1 }}
        </button>
      </div>
    </div>
    <span v-else>Загрузка...</span>
  </div>
</template>

<script>
import tableOrders from '../../components/tables/table-orders.vue'
import ORDERS from '../../gql/queries/ORDERS.gql'
export default {
  components: { tableOrders },
  layout: 'main',
  apollo: {
    orders: {
      query: ORDERS,
      pollInterval: 5000,
      variables () {
        return {
          PAGE: this.page
        }
      }
    }
  },
  data() {
    return {
      page: 1
    }
  },
}
</script>

<style></style>
