<template>
  <div class="rounded-md overflow-hidden border border-gray-400 drop-shadow-lg">
    <table class="min-w-full divide-y divide-gray-200  ">
      <thead class="bg-gray-50 border-b border-gray-400">
        <tr>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            № Заказа
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            Пациент
          </th>
          
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            Сумма заказа
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            Статус
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            Действия
          </th>
        </tr>
      </thead>
      <tbody v-if="data && sortOrders" class=" divide-y divide-gray-400">
        <table-orders-row
          v-for="(order, i) in sortOrders"
          :key="order.id"
          :order="order"
          :class="[i % 2 ? 'bg-white' : 'bg-slate-100']"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import tableOrdersRow from './table-orders-row.vue'
export default {
  components: { tableOrdersRow },
  props: {
    data: Array
  },
  computed: {
    sortOrders () {
      const dataSort = this.data.sort(function (a, b) {
        if (a.attributes.StatusOplata < b.attributes.StatusOplata) {
          return 1
        }
        if (a.attributes.Status > b.attributes.Status) {
          return 1
        }
        if (a.attributes.StatusOplata > b.attributes.Status) {
          return 1
        }
        return 0
      })
      return dataSort
    }
  }
}
</script>

<style></style>
