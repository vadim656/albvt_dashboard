<template>
  <tr class="  bg-white group  anime ">
    <td @click="pushRoute" class="anime-td anime font-bold ">
      <span class="hover:text-blue-500 cursor-pointer">{{
        item.attributes.UID
      }}</span>
    </td>
    <td class="anime-td anime">
      {{ dateRu }}
    </td>
    <td class="anime-td anime">
      {{ item.attributes.SummOrder }}
    </td>
    <td class="anime-td anime">
      <span v-if="item.attributes.users.data.length">{{ item.attributes.users.data[0].attributes.FIO_user }}</span>
    <span v-else>Ошибка</span>
    </td>
    <td class="anime-td anime">
      <span v-if="item.attributes.Status == true" class="text-green-500"
        >Оплачен</span
      >
      <span v-else class="text-red-500">Ожидает оплаты</span>
    </td>

  </tr>
</template>

<script>


export default {
  components: {  },
  props: {
    item: Object
  },
  data () {
    return {
      file: '',
      oplataCheck: false,
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
  methods: {
    pushRoute () {
      this.$router.push('/orders/' + this.item.id).catch(() => {})
    }
  },
  computed: {
    dateRu () {
      var date = new Date(this.item.attributes.createdAt)
      return date.toLocaleString('en-GB')
    }
  }
}
</script>

<style></style>
