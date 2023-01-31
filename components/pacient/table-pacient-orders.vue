<template>
  <tr @click="pushRouter" class="  bg-white group  anime cursor-pointer">
    <td class="anime-td anime font-bold">
      {{ item.attributes.UID }}
    </td>
    <td class="anime-td anime">
      {{ dateOrder }}
    </td>
    <td class="anime-td anime">
      {{ item.attributes.SummOrder.toLocaleString('ru-RU') }}
    </td>
    <td class="anime-td anime">
      <div
        v-if="item.attributes.Status == true"
        class="text-green-500 flex items-center gap-1"
      >
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
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        Оплачен
      </div>
      <div v-else class="text-red-500 flex items-center gap-1">
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
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        Не оплачен
      </div>
    </td>
    <td class="anime-td anime">
      {{ item.attributes.PromoVrach }}
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
      activeMenu: 1,
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
    pushRouter () {
      this.$router.push('/orders/' + this.item.id).catch(() => {})
    }
  },
  computed: {
    dateOrder () {
      const date = new Date(this.item.attributes.createdAt)
      const dateFinal = date.toLocaleString('en-GB')
      return dateFinal
    }
  }
}
</script>

<style></style>
