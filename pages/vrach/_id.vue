<template>
  <div>
    <div
      class="text-gray-800 flex flex-col gap-2"
      v-if="usersPermissionsUser "
    >
      <b-back />
      <div class="flex flex-col justify-between gap-4" v-if="user">
        <span class="text-2xl font-semibold flex items-center gap-2">
          {{ user.data.attributes.FIO_user }}
          <svg
            v-if="userInfo == false"
            @click="userInfo = !userInfo"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          <svg
            v-else-if="userInfo == true"
            @click="userInfo = !userInfo"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <div class="grid grid-cols-6 gap-2 mb-4" v-if="userInfo == true">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-neutral-500">Телефон:</span>
            <span class="font-semibold text-sm">{{
              user.data.attributes.Phone
            }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-neutral-500">Дата рождения:</span>
            <span class="font-semibold text-sm">{{
              user.data.attributes.DataRozgdeniya
            }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-neutral-500">E-mail:</span>
            <span class="font-semibold text-sm">{{
              user.data.attributes.email
            }}</span>
          </div>
          <div
            @click="closeModal"
            class="flex flex-col gap-1 relative cursor-pointer"
          >
            <span class="text-sm text-neutral-500">Ставка:</span>
            <span class="font-semibold text-sm flex gap-1 items-center">
              {{ user.data.attributes.Stavka }}%
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 hover:text-blue-500 anime"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-neutral-500">Промокод:</span>
            <span class="font-semibold text-sm">{{
              user.data.attributes.Promo
            }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-neutral-500">Специальность:</span>
            <span class="font-semibold text-sm">{{
              user.data.attributes.speczialnosts.data[0].attributes.Name
            }}</span>
          </div>
        </div>
      </div>
      <section class="border-b border-gray-300 pb-2">
        <div class="text-neutral-700">
          <div class="grid grid-cols-7 gap-2">
            <div
              class="bg-white border border-neutral-100 p-3 rounded-md flex flex-col"
            >
              <span class="text-sm text-neutral-600">Все запросы</span>
              <span class="font-bold text-xl"
                >{{ parseInt(allZapros).toLocaleString('ru-RU') }}₽</span
              >
            </div>
            <div
              class="bg-white border border-neutral-100 p-3 rounded-md flex flex-col"
            >
              <span class="text-sm text-neutral-600">Перевел</span>
              <span class="font-bold text-xl"
                >{{ parseInt(allZaprosDone).toLocaleString('ru-RU') }}₽</span
              >
            </div>
            <div
              class="bg-white border border-neutral-100 p-3 rounded-md flex flex-col"
            >
              <span class="text-sm text-neutral-600">Остаток</span>
              <span class="font-bold text-xl"
                >{{ parseInt(allZaprosFalse).toLocaleString('ru-RU') }}₽</span
              >
            </div>
            <div
              class="bg-white border border-neutral-100 p-3 rounded-md flex flex-col"
            >
              <span class="text-sm text-neutral-600">Заказы</span>
              <span v-if="orders" class="font-bold text-xl">{{
                ordersLength
              }}</span>
              <span v-else>Ошибка</span>
            </div>

            <div
              class="bg-white border border-neutral-100 p-3 rounded-md flex flex-col"
            >
              <span class="text-sm text-neutral-600">Сумма заказов</span>
              <span v-if="orders" class="font-bold text-xl"
                >{{
                  parseInt(summOrders.summZaprosAll).toLocaleString('ru-RU')
                }}₽</span
              ><span v-else>Ошибка</span>
            </div>
            <div
              class="bg-white border border-neutral-100 p-3 rounded-md flex flex-col"
            >
              <span class="text-sm text-neutral-600">Оплачено</span>
              <span v-if="orders" class="font-bold text-xl"
                >{{
                  parseInt(summOrders.oplacheno).toLocaleString('ru-RU')
                }}₽</span
              >
              <span v-else>Ошибка</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="flex gap-3 font-medium text-gray-900 tracking-wider">
          <button
            class="text-sm flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 2 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 2"
          >
            Запросы ({{
              usersPermissionsUser.data.attributes.zaprosy_vrachejs.data.length
            }})
          </button>
          <button
            class="text-sm flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 1 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 1"
          >
            Пациенты ({{
              usersPermissionsUser.data.attributes.Pacientis.data.length
            }})
          </button>
          <button
            class="text-sm flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 3 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 3"
          >
            Заказы ({{ ordersLength }})
          </button>
        </div>
      </section>
      <section class="pt-2">
        <div v-if="activeTab == 1">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 border-b border-gray-400">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600 tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                >
                  ФИО
                </th>

                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                >
                  Сумма всех заказов
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                >
                  Оплачено
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-400">
              <doctor-pacients
                v-for="(item, i) in usersPermissionsUser.data.attributes
                  .Pacientis.data"
                :item="item"
                :key="item.id"
                :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
              />
            </tbody>
          </table>
        </div>
        <div v-if="activeTab == 2">
          <div v-if="usersPermissionsUser" class="">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 border-b border-gray-400">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600 tracking-wider"
                  >
                    № запроса
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Дата
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Сумма
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Статус
                  </th>

                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-400">
                <doctor-zapros
                  v-for="(item, i) in usersPermissionsUser.data.attributes
                    .zaprosy_vrachejs.data"
                  :item="item"
                  :key="item.id"
                  :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
                  @reFetch="reFetch"
                />
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="activeTab == 3">
          <div class="">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 border-b border-gray-400">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600 tracking-wider"
                  >
                    № заказа
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Дата
                  </th>

                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Сумма
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Пациент
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600 tracking-wider"
                  >
                    Статус
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-400" v-if="orders">
                <doctor-order
                  v-for="(item, i) in ordersAllFetch.data"
                  :item="item"
                  :key="item.id"
                  :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <a-modal ref="modal">
        <div class="flex flex-col gap-4">
          Изменить ставку врача
          <input
            type="number"
            min="0"
            max="100"
            v-model="stavka"
            :placeholder="usersPermissionsUser.data.attributes.Stavka"
            class="border rounded-md border-gray-400 p-1"
          />
          <span class="text-xs text-gray-600">Число от 0 до 100</span>
          <div class="flex items-center gap-4">
            <button
              @click="reUseStavka"
              class="flex items-center justify-center px-3 py-2 rounded-md text-white bg-green-500"
            >
              Сохранить
            </button>
            <button
              @click="closeModal"
              class="flex items-center justify-center px-3 py-2 rounded-md text-white bg-red-500"
            >
              Отменить
            </button>
          </div>
        </div>
      </a-modal>
    </div>
    <span v-else>Загрузка...</span>
  </div>
</template>

<script>
import AModal from '~/components/a-modal.vue'
import DoctorPacients from '~/components/doctor/doctorPacients.vue'
import doctorZapros from '~/components/doctor/doctorZapros.vue'
import VRACH_ID from '~/gql/queries/VRACH_ID.gql'
import ORDER_PROMO from '~/gql/queries/ORDER_PROMO.gql'
import EDIT_STAVKA from '~/gql/mutations/EDIT_STAVKA.gql'
import BBack from '~/components/b-back.vue'
import DoctorOrder from '../../components/doctor/doctorOrder.vue'

export default {
  components: { doctorZapros, DoctorPacients, AModal, BBack, DoctorOrder },
  middleware: 'auth',
  layout: 'main',
  apollo: {
    usersPermissionsUser: {
      query: VRACH_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    },
    orders: {
      query: ORDER_PROMO,
      loadingKey: 'loading',
      variables () {
        return {
          PROMO: this.userPromo
        }
      }
    }
  },
  data () {
    return {
      activeTab: 2,
      stavka: null,
      userInfo: false
    }
  },
  methods: {
    reFetch () {
      this.$apollo.queries.usersPermissionsUser.refetch()
    },
    closeModal () {
      this.$refs.modal.active = !this.$refs.modal.active
    },
    reUseStavka () {
      const val = Number(this.stavka)
      this.$apollo
        .mutate({
          mutation: EDIT_STAVKA,
          variables: {
            STAVKA: val,
            ID: this.usersPermissionsUser.data.id
          }
        })
        .then(data => {
          this.closeModal()
          this.$apollo.queries.usersPermissionsUser.refetch()
          this.$toast.success('Обновление ставки: Успешно!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
        .catch(error => {
          this.$toast.error('Обновление ставки: Что то пошло не так!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
    }
  },
  computed: {
    user () {
      return this.usersPermissionsUser
    },
    userPromo () {
      if (this.usersPermissionsUser) {
        return this.usersPermissionsUser.data.attributes.Promo
      } else {
        const test = 'nyD66v'
        return test
      }
    },
    ordersLength () {
      if (this.orders) {
        return this.orders.data.length
      }
    },
    ordersAllFetch () {
      if (this.orders) {
        return this.orders
      }
    },
    summOrders () {
      const data = this.orders.data.map(x => x.attributes.SummOrder)
      const oplachenoAll = this.orders.data.filter(
        x => x.attributes.Status == true
      )
      const oplacheno = oplachenoAll.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.SummOrder,
        0
      )

      const summZaprosAll = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
      return { summZaprosAll, oplacheno, oplachenoAll }
    },
    allZapros () {
      const data =
        this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data
      const summZap = data.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.Summ,
        0
      )
      return summZap.toFixed(0)
    },
    allZaprosFalse () {
      const data =
        this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data
      const dataHFitreder = data.filter(x => x.attributes.Done == false)
      const summZap = dataHFitreder.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.Summ,
        0
      )
      return summZap.toFixed(0)
    },
    allZaprosDone () {
      const data =
        this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data
      const dataHFitreder = data.filter(x => x.attributes.Done == true)
      const summZap = dataHFitreder.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.Summ,
        0
      )
      return summZap.toFixed(0)
    },
    zaprosCheck () {
      const data =
        this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data
      const dataHFitreder = data.filter(x => x.attributes.Done == false)

      return dataHFitreder.length
    },
    allZaprosLength () {
      const data =
        this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data

      return data.length
    }
  }
}
</script>

<style></style>
