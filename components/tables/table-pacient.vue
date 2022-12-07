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
            Заказы Всего
          </th>
          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            Сумма Всего
          </th>

          <th
            scope="col"
            class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
          >
            Всего врачей
          </th>
        </tr>
      </thead>
      <tbody v-if="data_users !== undefined">
        <tr
          class=" border-b border-gray-400"
          :class="[user.id % 2 ? 'bg-white' : 'bg-gray-100']"
          v-for="user in data_users"
          :key="user.id"
        >
          <td
            class="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
          >
            {{ user.id }}
          </td>
           <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
            {{ user.attributes.FIO_user.replace(/(\S+) (\S)\S* (\S)\S*/, '$1 $2. $3.') }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
            <span>{{ user.Orders }}</span>
          </td>
          <td
            class="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-600"
          >
            <span>{{ user.sumOrders.toLocaleString('ru-RU') }}</span>
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
              <span v-if="user.vrachis >= 1">{{user.vrachis}}</span>
              <span v-else>0</span>
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data_users: Array
  }
}
</script>

<style></style>
