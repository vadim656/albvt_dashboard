<template>
  <tr class="  bg-white group  anime ">
    <td class="anime-td anime">
      {{ item.id }}
    </td>
    <td class="anime-td anime">
      <span v-if="item.attributes.Invitro == true">Инвитро</span>
      <span v-else>Больница</span>
    </td>
    <td class="anime-td anime">
      <span v-if="item.attributes.area_invitro.data !== null">
        {{
          item.attributes.area_invitro.data.attributes.sityes_invitros.data[0]
            .attributes.Name
        }}</span
      >
      <span v-else class="text-red-500 font-bold">Недозаполнили</span>
    </td>
    <td :title="item.attributes.Name" class="anime-td anime">
      {{ item.attributes.Name }}
    </td>
    <td class="anime-td anime">
      {{ item.attributes.users.data.length }}
    </td>
    <td class="anime-td anime">
      {{ InfoOrders.allOrders.length }}
    </td>
    <td class="anime-td anime">
      {{ InfoOrders.summ.toLocaleString('ru-RU') }} ₽
    </td>
    <td class="anime-td anime flex justify-end">
      <div class="relative w-6 h-6">
        <div @click="openCTXMenu(item.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hover:text-blue-500 anime"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <a-modal-order ref="modalitem" :key="item.id">
          <div class="w-full flex justify-between items-center gap-3">
            <span class="text-xs text-gray-500">ID: {{ item.id }}</span>
            <button
              @click="$refs.modalitem.active = false"
              class="text-xs text-gray-500 flex items-center gap-1"
            >
              Скрыть
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-wrap gap-2 items-start text-sm text-gray-900">
            <span>Режим работы</span>
            <span v-html="item.attributes.GegimRaboty"></span>
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ item.attributes.Phone }}</span
            >
          </div>
        </a-modal-order>
      </div>
    </td>
  </tr>
</template>
<script>
import aModalorder from '../a-modal-order.vue'

export default {
  components: { aModalorder },
  props: {
    item: Object
  },
  data () {
    return {
      activeMenu: 1
    }
  },
  methods: {
    openCTXMenu (id) {
      if (this.$refs.modalitem.active == true) {
        this.$refs.modalitem.active = false
        this.$refs.modalitem.id = null
      } else {
        this.$refs.modalitem.active = true
        this.$refs.modalitem.id = id
      }
    }
  },
  computed: {
    InfoOrders () {
      const allOrders = this.item.attributes.zakazies.data.map(
        x => x.attributes.SummOrder
      )
      const summ = allOrders.reduce((a, b) => a + b, 0)

      return { allOrders, summ }
    }
  }
}
</script>

<style></style>
