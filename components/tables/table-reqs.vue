<template>
  <div class="">
    <table class="min-w-full divide-y divide-gray-200  rounded-md  border border-gray-400 drop-shadow-lg">
      <thead class="bg-gray-50 border-b border-gray-400">
        <tr>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            № Запроса
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            ФИО Врача
          </th>

          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            Дата
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            Сумма
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
      <tbody v-if="data_req && sortOrders" class=" divide-y divide-gray-400">

        <table-reqs-row
          v-for="(req, i) in sortOrders"
          :key="req.id"
          :req="req"
          :class="[i % 2 ? 'bg-white' : 'bg-slate-100']"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableReqsRow from './table-reqs-row.vue'
export default {
  components: { TableReqsRow },
  props: {
    data_req: Array
  },
  computed: {
    sortOrders () {
      const dataSort = this.data_req.sort(function (a, b) {
        if (a.attributes.Done > b.attributes.Done) {
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
