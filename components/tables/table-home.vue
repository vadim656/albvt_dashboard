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
          Тип офиса
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Город
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Адрес
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Врачи
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Заказы
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-right text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Сумма
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-right text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Действия
        </th>
      </tr>
    </thead>
    <tbody v-if="data_home" class=" divide-y divide-gray-400">
      <table-home-row
        v-for="(item, i) in data_home"
        :key="item.id"
        :item="item"
        :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
      />
    </tbody>
  </table>
</template>

<script>
import TableHomeRow from './table-home-row.vue'
export default {
  components: { TableHomeRow },
  props: {
    data_home: Array
  }
}
</script>

<style></style>
