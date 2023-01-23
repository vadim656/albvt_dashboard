<template>
  <tr class="  bg-white group  anime cursor-pointer">
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ item.attributes.UID }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ dateOrder }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ item.attributes.SummOrder.toLocaleString('ru-RU') }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
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
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ item.attributes.PromoVrach }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap flex items-center flex-wrap gap-3 text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
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
        <a-modal-order ref="modalOrder" :key="item.id">
          <div class="w-full flex justify-between items-center gap-3">
            <span class="text-xs text-gray-500"
              >ID: {{ item.attributes.UID }}</span
            >
            <button
              @click="$refs.modalOrder.active = false"
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
          <div class="flex flex-wrap gap-2 items-start text-sm">
            <button
              class="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 anime cursor-pointer"
            >
              <nuxt-link :to="/orders/ + item.id">Состав</nuxt-link>
            </button>
            <button
              v-if="item.attributes.Status == true"
              class="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 anime cursor-pointer"
            >
              Результаты
            </button>
          </div>
        </a-modal-order>
      </div>
    </td>
  </tr>
</template>

<script>
import aModalOrder from '~/components/a-modal-order.vue'
export default {
  props: {
    item: Object
  },
  components: { aModalOrder },
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
    openCTXMenu (id) {
      if (this.$refs.modalOrder.active == true) {
        this.$refs.modalOrder.active = false
        this.$refs.modalOrder.id = null
      } else {
        this.$refs.modalOrder.active = true
        this.$refs.modalOrder.id = id
      }
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
