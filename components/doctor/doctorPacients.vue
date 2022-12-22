<template>
  <tr class="  bg-white group  anime cursor-pointer">
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ item.id }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ item.attributes.FIO_user }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ summOrders }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ summOrdersDone }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap flex items-center flex-wrap gap-3 text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      <button
        class="font-medium text-gray-900 tracking-wider  group-hover:text-white anime rounded-md"
      >
        Подробнее
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    }
  },
  computed: {
    summOrders () {
      const data = this.item.attributes.zakazies.data
      const summZap = data.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.SummOrder,
        0
      )
      return summZap
    },
    summOrdersDone () {
      const data = this.item.attributes.zakazies.data
      const orderDone= data.filter((x) => x.attributes.Status == true)
      const summZap = orderDone.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.SummOrder,
        0
      )
      return summZap
    }
  }
}
</script>

<style></style>
