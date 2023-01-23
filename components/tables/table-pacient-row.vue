<template>
  <tr class=" border-b border-gray-400" v-if="user">
    <td class="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
      {{ user.id }}
    </td>
    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
      <nuxt-link :to="/pacient/ + user.id" v-if="user.attributes.FIO_user !== null">
        {{ setName }}
      </nuxt-link>
      <span v-else class="text-red-500">Ошибка в ФИО!</span>
    </td>
    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
      <span>{{ getOrders }}</span>
    </td>
    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
      <span>{{ getSummOrders.toLocaleString('ru-RU') }}₽</span>
    </td>
    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
      <span>{{ getPayOrders.toLocaleString('ru-RU') }}₽</span>
    </td>
    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
      <span>{{ getAllDoctors }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: Object
  },
  computed: {
    setName () {
      return this.user.attributes.FIO_user.replace(
        /(\S+) (\S)\S* (\S)\S*/,
        '$1 $2. $3.'
      )
    },
    getOrders () {
      if (this.user.attributes.zakazies.data.length) {
        return this.user.attributes.zakazies.data.length
      } else {
        return 0
      }
    },
    getSummOrders () {
      if (this.user.attributes.zakazies.data.length) {
        const data = this.user.attributes.zakazies.data
        const summ = data.reduce((a, b) => a + b.attributes.SummOrder, 0)

        return summ
      } else {
        return 0
      }
    },
    getAllDoctors () {
      if (this.user.attributes.users_permissions_users.data.length) {
        return this.user.attributes.users_permissions_users.data.length
      } else {
        return 0
      }
    },
    getPayOrders () {
      if (this.user.attributes.zakazies.data.length) {
        const data = this.user.attributes.zakazies.data
        const dataPay = data.filter(x => x.attributes.Status == true)
        const summ = dataPay.reduce((a, b) => a + b.attributes.SummOrder, 0)
        return summ
      } else {
        return 0
      }
    }
  }
}
</script>

<style></style>
