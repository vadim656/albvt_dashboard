<template>
  <table class="min-w-full divide-y divide-gray-200 rounded-md">
    <thead class="bg-gray-50 border-b border-gray-400">
      <tr>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
        >
          ID
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
          Заказы<br />
          <span class="text-xs"> Всего / Сегодня</span>
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Сумма<br />
          <span class="text-xs "> Всего / Ставка</span>
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          + Всех<br />
          <span class="text-xs"> запросов</span>
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Перевел
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Остаток
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
           Пациенты<br />
          <span class="text-xs">всего</span>
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Специальность
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Чек
        </th>
      </tr>
    </thead>
    <tbody v-if="data_users" class=" divide-y divide-gray-400">
      <table-row-vrach
        v-for="(item, i) in data_users"
        :key="item.id"
        :item="item"
        :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
      />
    </tbody>
    
  </table>
</template>

<script>
import tableRowVrach from './table-row-vrach.vue'
export default {
  components: { tableRowVrach },
  props: {
    data_users: Array
  }
}
</script>

<style></style>
