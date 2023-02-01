<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="flex justify-end w-full items-center gap-1">
      <section class=" w-full flex justify-end gap-4">
        <div class="relative w-full max-w-[360px]">
          <input
            type="text"
            @input="search($event.target.value)"
            v-model="searchInput"
            class="w-full border rounded-md p-2"
            placeholder="Поиск по врачам"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 absolute top-3 right-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <div
            v-if="searchResults"
            v-click-outside="externalClick"
            class="absolute top-12  bg-white drop-shadow-md rounded-md z-[99] w-full overflow-hidden"
          >
            <div class="flex flex-col -gap-1">
              <nuxt-link
                :to="`/vrach/` + item.id"
                v-for="item in searchResults"
                :key="item.id"
                class="py-3 border-b border-[#212121]/30 flex flex-col  cursor-pointer  gap-2 w-full hover:bg-[#212121]/10 anime p-2"
              >
                <div class="w-full flex items-center">
                  <span class="text-left text-xs">ID {{ item.id }} </span>
                </div>
                <div class="w-full flex items-center">
                  <span class="text-left font-bold text-sm truncate ">
                    {{ item.attributes.FIO_user }}
                  </span>
                </div>
                <!-- <div class="w-full flex items-center  flex-end">
                <span class=" text-sm text-right text-[#343434]/70  w-full">{{
                  item.attributes.users_permissions_user.data.attributes
                    .speczialnosts.data[0].attributes.Name
                }}</span>
              </div> -->
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          v-if="usersPermissionsUsersVrach"
          class=" flex justify-center items-center gap-2"
        >
          Всего:
          <span>{{ usersPermissionsUsersVrach.meta.pagination.total }}</span>
        </div>
      </section>
    </nav>
    <div class="w-full flex flex-col gap-2">
      <section
        class="flex flex-col gap-4"
        v-if="usersPermissionsUsers !== undefined"
      >
        <div
          class="rounded-md overflow-hidden border border-gray-400 drop-shadow-lg"
        >
          <table-vrach
            v-if="userResult !== undefined"
            :data_users="userResult"
          />
          <span v-else>Загрузка...</span>
        </div>
        <div
          class="py-12 flex justify-center"
          v-if="usersPermissionsUsers !== undefined"
        ></div>
      </section>
    </div>
    <span>test</span>
    <div>
      <vue-good-table :columns="columns" :rows="testUsersTable.result" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import aSelect from '~/components/a-select.vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import vClickOutside from 'v-click-outside'

import ALL_VRACHI_DATE from '~/gql/queries/all-vrachi-filters.gql'
import ALL_VRACHI from '~/gql/queries/all-vrachi.gql'
import SEARCH_VRACH from '~/gql/queries/SEARCH_VRACH.gql'
import TableVrach from '~/components/tables/table-vrach.vue'
import ALL_VRACHI_PROMO from '~/gql/queries/ALL_VRACHI_PROMO.gql'

var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}

export default {
  apollo: {
    usersPermissionsUsers: {
      query () {
        if (this.date.start) {
          return ALL_VRACHI_DATE
        } else {
          return ALL_VRACHI
        }
      },
      variables () {
        if (this.date.start) {
          return {
            GTE: this.DateIso.start,
            LTE: this.DateIso.end
          }
        }
      }
    },
    usersPermissionsUsersVrach: {
      query: gql`
        query ALL_VRACHI_STAT {
          usersPermissionsUsersVrach: usersPermissionsUsers(
            filters: { RoleUser: { eq: "Vrach" } }
          ) {
            meta {
              pagination {
                total
              }
            }
          }
        }
      `,
      loadingKey: 'loading',
      pollInterval: 10000
    }
  },
  middleware: 'auth',
  components: { aSelect, VueDatePicker, TableVrach },
  layout: 'main',
  data () {
    return {
      date: new Date().toLocaleString('ru', options),
      locale: { lang: 'ru' },
      today: new Date().toLocaleString('ru', options),
      searchInput: '',
      searchResults: null,
      isDays: false,
      loading: true,
      ActiveSelect1: 'Оплата: Все',
      ActiveSelect2: 'Запрос -',
      ActiveSelect3: 'Перевод -',
      columns: [
        {
          label: 'ID',
          field: 'id'
        },
        {
          label: 'ФИО',
          field: 'fio'
        },
        {
          label: 'Заказы',
          field: 'orders',
          type: 'number'
        },
        {
          label: 'Сумма',
          field: 'score',
          type: 'number'
        },

        {
          label: 'Все запросы',
          field: 'allZapros',
          type: 'number'
        },

        {
          label: 'Перевел',
          field: 'perevel',
          type: 'number'
        },

        {
          label: 'Остаток',
          field: 'ostatok',
          type: 'number'
        },

        {
          label: 'Пациенты',
          field: 'score',
          type: 'number'
        },

        {
          label: 'Чек',
          field: 'score',
          type: 'number'
        }
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343 },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343
        },
        {
          id: 3,
          name: 'Susan',
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343
        },
        {
          id: 4,
          name: 'Chris',
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343
        },
        {
          id: 5,
          name: 'Dan',
          age: 40,
          createdAt: '2011-10-21',
          score: 0.03343
        },
        {
          id: 6,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343
        }
      ]
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    externalClick () {
      this.searchResults = []
      this.searchInput = ''
    },
    select1 (a) {
      this.ActiveSelect1 = a
    },
    select2 (b) {
      this.ActiveSelect2 = b
    },
    select3 (q) {
      this.ActiveSelect3 = q
    },

    async search (value) {
      if (value.length >= 3) {
        const lowerCase = value[0].toUpperCase() + value.slice(1)
        try {
          const res = await this.$apollo.query({
            query: SEARCH_VRACH,
            variables: {
              FIO: lowerCase
            }
          })

          if (res) {
            this.loading = false
            const data = res.data.usersPermissionsUsers.data
            this.searchResults = data
          }
        } catch (err) {
          this.loading = false
        }
      } else {
        this.searchResults = []
      }
    }
  },
  computed: {
    DateIso () {
      const d = new Date(this.date.end)
      d.setDate(d.getDate() + 1)
      const date = {
        start: new Date(this.date.start).toISOString(),
        end: d.toISOString()
      }
      return date
    },
    userResult () {
      return this.usersPermissionsUsers.data
    },
    testUsersTable () {
      const users = this.userResult
      const result = []

      for (let i = 0; i < users.length; i++) {
        let user = {
          id: null,
          fio: '',
          orders: 0,
          summ1: 0,
          allZapros: 0,
          perevel: 0,
          ostatok: 0,
          pacients: 0,
          check: true
        }

        user.id = users[i].id
        user.fio = users[i].attributes.FIO_user.replace(
          /(\S+) (\S)\S* (\S)\S*/,
          '$1 $2. $3.'
        )

        // allOrders

         this.$apollo
          .query({
            query: ALL_VRACHI_PROMO,
            variables: {
              ID: users[i].attributes.Promo
            }
          })
          .then(({ data }) => {
           user.orders = data.orders.data.length
          })


        // allZapros
        const mapZapros = users[i].attributes.zaprosy_vrachejs.data.map(
          x => x.attributes.Summ
        )

        const summZap = mapZapros.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
        user.allZapros = parseInt(summZap)

        // allZaprosDone

        const dataHFitreder2 = users[i].attributes.zaprosy_vrachejs.data.filter(
          x => x.attributes.Done == true
        )
        const summZap2 = dataHFitreder2.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.attributes.Summ,
          0
        )
        user.perevel = parseInt(summZap2)

        // allZaprosFalse

        const dataHFitreder3 = users[i].attributes.zaprosy_vrachejs.data.filter(
          x => x.attributes.Done == false
        )
        const summZap3 = dataHFitreder3.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.attributes.Summ,
          0
        )
        user.ostatok = parseInt(summZap3)

        // result

        result.push(user)
      }

      return { users, result }
    }
  }
}
</script>

<style></style>
