<template>
  <tr class="  bg-white group  anime">
    <td
      @click="toReq(req.id)"
      class="anime-td cursor-pointer hover:text-blue-500  anime font-bold"
    >
      {{ req.attributes.UID }}
    </td>
    <td class="anime-td cursor-pointer hover:text-blue-500  anime">
      <span v-if="req.attributes.users_permissions_user.data">{{
        req.attributes.users_permissions_user.data.attributes.FIO_user.replace(
          /(\S+) (\S)\S* (\S)\S*/,
          '$1 $2. $3.'
        )
      }}</span>
      <span v-else>Нет</span>
    </td>
    <td class="anime-td  anime">
      <span>{{ dateConf }}</span>
    </td>
    <td class="anime-td  anime">
      {{ req.attributes.Summ.toLocaleString('ru-RU') }}₽
    </td>
    <td class="anime-td  anime">
      <div
        v-if="req.attributes.Done == true"
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
      <div
        v-else-if="req.attributes.Done == false"
        class="text-red-500 flex items-center gap-1"
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
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        Ожидает оплаты
      </div>
    </td>
    <!-- <td
      class="px-4 py-4 whitespace-nowrap text-sm group-hover:bg-gray-200 text-gray-900  anime "
    >
      <div class="relative w-6 h-6">
        <div @click="openCTXMenu(req.id)">
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
        <a-modal-order ref="modalreq" :key="req.id">
          <div class="w-full flex justify-between items-center gap-3">
            <span class="text-xs text-gray-500"
              >ID: {{ req.attributes.UID }}</span
            >
            <button
              @click="$refs.modalreq.active = false"
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
            <nuxt-link :to="`/requests/` + req.id">Подробнее</nuxt-link>
              
            </button>
          </div>
        </a-modal-order>
      </div>
    </td> -->
  </tr>
</template>
<script>
import aModalOrder from '../a-modal-order.vue'
// import UPDATE_req from '~/gql/mutations/UPDATE_req.gql'

export default {
  components: { aModalOrder },
  props: {
    req: Object
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
  computed: {
    dateConf () {
      var date = new Date(this.req.attributes.createdAt)
      return date.toLocaleString('ru', this.options)
    }
  },
  methods: {
    toReq (id) {
      this.$router.push(`/requests/` + id)
    },
    openCTXMenu (id) {
      if (this.$refs.modalreq.active == true) {
        this.$refs.modalreq.active = false
        this.$refs.modalreq.id = null
      } else {
        this.$refs.modalreq.active = true
        this.$refs.modalreq.id = id
      }
    }
  }
}
</script>

<style></style>
