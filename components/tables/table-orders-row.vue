<template>
  <tr class="  bg-white group  anime cursor-pointer">
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-bold group-hover:bg-gray-200 text-gray-900  anime "
    >

      {{ order.attributes.UID }}
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm  group-hover:bg-gray-200 text-gray-900  anime "
    >
    <span v-if="order.attributes.users.data.length > 0">
    <nuxt-link :to="/pacient/ + order.attributes.users.data[0].id">{{ order.attributes.users.data[0].attributes.FIO_user }}</nuxt-link>
    </span>
    <span v-else>Нет</span>
    
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm  group-hover:bg-gray-200 text-gray-900  anime "
    >
      {{ order.attributes.SummOrder }}₽
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm font-semibold group-hover:bg-gray-200 text-gray-900  anime "
    >
      <div
        v-if="
          order.attributes.Status == true &&
            order.attributes.StatusOplata == false
        "
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
        v-if="
          order.attributes.Status == false &&
            order.attributes.StatusOplata == true
        "
        class="text-yellow-500 flex items-center gap-1"
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
      <div
        v-if="
          order.attributes.Status == false &&
            order.attributes.StatusOplata == false
        "
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
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        Ожидает подтверждения
      </div>
    </td>
    <td
      class="px-4 py-4 whitespace-nowrap text-sm group-hover:bg-gray-200 text-gray-900  anime "
    >
      <div class="relative w-6 h-6">
        <div @click="openCTXMenu(order.id)">
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
        <a-modal-order ref="modalOrder" :key="order.id">
          <div class="w-full flex justify-between items-center gap-3">
            <span class="text-xs text-gray-500"
              >ID: {{ order.attributes.UID }}</span
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
              @click="updateOrderStatus(order.id)"
              v-if="
                order.attributes.Status == false &&
                  order.attributes.StatusOplata == false
              "
              class="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 anime cursor-pointer"
            >
              Подтвердить заказ
            </button>
            <a
              :href="
                `https://api.albvt.ru/admin/content-manager/collectionType/api::order.order/` +
                  order.id
              "
              target="_blank"
              v-if="
                order.attributes.Status == false &&
                  order.attributes.StatusOplata == false
              "
              class="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 anime cursor-pointer"
            >
              Изменить заказ
            </a>
            <button
              class="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 anime cursor-pointer"
            >
            <nuxt-link :to="/orders/ + order.id">Состав</nuxt-link>
              
            </button>
            <button
              v-if="
                order.attributes.Status == true &&
                  order.attributes.StatusOplata == false
              "
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
import aModalOrder from '../a-modal-order.vue'
import UPDATE_ORDER from '../../gql/mutations/UPDATE_ORDER.gql'

export default {
  components: { aModalOrder },
  props: {
    order: Object
  },
  data () {
    return {
      activeMenu: 1
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
    },
    updateOrderStatus (id) {
      this.$apollo
        .mutate({
          mutation: UPDATE_ORDER,
          variables: {
            ID: id
          }
        })
        .then(data => {
          this.$toast.success('Подтвержение заказа: Успешно!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
          this.$emit('reFetch')
          this.openCTXMenu(this.order.id)
        })
        .catch(error => {
          this.$toast.error('Подтвержение заказа: Что то пошло не так!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
    }
  }
}
</script>

<style></style>
