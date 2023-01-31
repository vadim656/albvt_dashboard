<template>
  <tr @click="pushRoute" class=" border-b border-gray-400 group cursor-pointer" v-if="user">
    <td
      class="group-hover:bg-gray-200 px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900 anime"
    >
      {{ user.id }}
    </td>
    <td
      class="group-hover:bg-gray-200 px-4 py-4 whitespace-nowrap text-sm text-gray-600 anime"
    >
      <span v-if="user.attributes.FIO_user !== null">
        {{ setName }}
      </span>
      <span v-else class="text-red-500">Ошибка в ФИО!</span>
    </td>
    <td
      class="group-hover:bg-gray-200 px-4 py-4 whitespace-nowrap text-sm text-gray-600 anime"
    >
      <span>{{ getOrders }}</span>
    </td>
    <td
      class="group-hover:bg-gray-200 px-4 py-4 whitespace-nowrap text-sm text-gray-600 anime"
    >
      <span>{{ getSummOrders.toLocaleString('ru-RU') }}₽</span>
    </td>
    <td
      class="group-hover:bg-gray-200 px-4 py-4 whitespace-nowrap text-sm text-gray-600 anime"
    >
      <span>{{ getPayOrders.toLocaleString('ru-RU') }}₽</span>
    </td>
    <td
      class="group-hover:bg-gray-200 px-4 py-4 whitespace-nowrap text-sm text-gray-600 anime"
    >
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
  },
  methods: {
    pushRoute () {
      this.$router.push('/pacient/' + this.user.id).catch(() => {})
    }
  }
}
</script>

<style></style>
