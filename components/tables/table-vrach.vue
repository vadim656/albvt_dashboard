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
          <div class="flex gap-1 items-center justify-between">
            <div>
              Заказы<br />
              <span class="text-xs"> Всего / Сегодня</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </th>
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top  font-medium text-gray-600  tracking-wider"
        >
          <div class="flex gap-1  items-center justify-between">
            <div>
              Сумма<br />
              <span class="text-xs "> Всего / Ставка</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
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
          <div class="flex gap-1 items-center justify-between">
            <div>
              Пациенты<br />
              <span class="text-xs">всего</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </th>
        <!-- <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Специальность
        </th> -->
        <th
          scope="col"
          class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
        >
          Чек
        </th>
      </tr>
    </thead>
    <tbody v-if="users" class=" divide-y divide-gray-400">
      <table-row-vrach
        v-for="(item, i) in users"
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
  },
  computed: {
    users () {
      return this.data_users
    }
  }
}
</script>

<style></style>
