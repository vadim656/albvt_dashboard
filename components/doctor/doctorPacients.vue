<template>
  <tr @click="pushRoute" class="  bg-white group cursor-pointer  anime">
    <td
      class="anime-td anime font-bold"
    >
      {{ item.id }}
    </td>
    <td
      class="anime-td anime"
    >
      {{ item.attributes.FIO_user }}
    </td>
    <td
      class="anime-td anime"
    >
      {{ summOrders }}
    </td>
    <td
      class="anime-td anime"
    >
      {{ summOrdersDone }}
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
  },
  methods: {
     pushRoute () {
      this.$router.push('/pacient/' + this.item.id).catch(() => {})
    },
  },
}
</script>

<style></style>
