<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50 border-b border-gray-400">
        <tr>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
          >
            №
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            ФИО
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            Заказы <br><span class="text-xs">(всего)</span> 
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            Сумма <br><span class="text-xs">(всего)</span> 
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            Оплачено
          </th>

          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            Всего врачей
          </th>
        </tr>
      </thead>
      <tbody>
        <table-pacient-row
          :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
          v-for="(user, i) in data_users"
          :key="user.id"
          :user="user"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import tablePacientRow from './table-pacient-row.vue'
export default {
  components: { tablePacientRow },
  props: {
    data_users: Array
  }
}
</script>

<style></style>
