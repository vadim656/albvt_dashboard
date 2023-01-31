<template>
  <div class="flex w-full flex-col" v-if="usersPermissionsUser">
  <b-back/>
    <section class="grid grid-cols-[2fr,3fr] border-b border-gray-300 pb-2">
      <div class="flex flex-col justify-between gap-4">
        <div class="text-2xl font-semibold">
          {{ usersPermissionsUser.data.attributes.FIO_user }}
        </div>

        <div class="flex gap-3 font-medium text-gray-900 tracking-wider">
          <span
            class="text-sm  flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 2 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 2"
          >
            Заказы
          </span>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-sm text-neutral-500">Телефон:</span>
          <span class="font-semibold text-sm">{{
            usersPermissionsUser.data.attributes.Phone
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-neutral-500">Дата рождения:</span>
          <span class="font-semibold text-sm">{{
            usersPermissionsUser.data.attributes.DataRozgdeniya
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-neutral-500">E-mail:</span>
          <span class="font-semibold text-sm">{{
            usersPermissionsUser.data.attributes.email
          }}</span>
        </div>
      </div>
    </section>
    <section class="pt-2">
      <div v-if="activeTab == 2">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 border-b border-gray-400">
            <tr>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
              >
                № заказа
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top text-gray-600  tracking-wider"
              >
                Дата заказа
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Сумма заказа
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Статус оплаты
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Промокод
              </th>
            </tr>
          </thead>
          <tbody class=" divide-y divide-gray-400">
            <table-pacient-orders
            v-for="(item, i) in usersPermissionsUser.data.attributes.zakazies
                .data"
              :item="item"
              :key="item.id"
              :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
            />
           
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import USER_ID from '~/gql/queries/USER_ID.gql'
import BBack from '../../components/b-back.vue'
import tablePacientOrders from '../../components/pacient/table-pacient-orders.vue'

export default {
  components: { tablePacientOrders, BBack },
  middleware: 'auth',
  layout: 'main',
  data () {
    return {
      activeTab: 2
    }
  },
  apollo: {
    usersPermissionsUser: {
      query: USER_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  }
}
</script>

<style></style>
