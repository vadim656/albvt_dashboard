<template>
  <div class="flex w-full flex-col gap-6">
    <div>
      <span v-if="rows.length < 0">Загружаю...</span>
      <vue-good-table
        v-else
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true,
          placeholder: 'Поиск по врачам'
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          perPageDropdown: [10, 50, 100],
          nextLabel: 'Дальше',
          prevLabel: 'Назад',
          rowsPerPageLabel: 'Показать по',
          ofLabel: 'из'
        }"
        @on-row-click="onRowClickVrach"
        styleClass="vgt-table striped bordered !text-sm"
      >
        <template slot="table-column" slot-scope="props">
          <span v-if="props.column.label == 'Заказы всего'">
            <div>
              Заказы<br />
              <span class="text-xs"> Всего / Сегодня</span>
            </div>
          </span>
          <span v-else-if="props.column.label == 'Сумма'">
            <div>
              Сумма<br />
              <span class="text-xs "> Всего / Ставка</span>
            </div>
          </span>
          <span v-else> {{ props.column.label }}</span>
        </template>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'summ1'">
            <span
              >{{ props.row.summ1.toLocaleString('ru-RU') }}
              <span class="font-normal">
                <sup>{{ props.row.stavka }}%</sup>
              </span>
            </span>
          </span>
          <span v-else-if="props.column.field == 'allZapros'">
            <span>{{ props.row.allZapros.toLocaleString('ru-RU') }} </span>
          </span>
          <span v-else-if="props.column.field == 'perevel'">
            <span>{{ props.row.perevel.toLocaleString('ru-RU') }} </span>
          </span>
          <span v-else-if="props.column.field == 'ostatok'">
            <span>{{ props.row.ostatok.toLocaleString('ru-RU') }} </span>
          </span>
          <span v-else-if="props.column.field == 'ordersAll'">
            <span>
              {{ props.row.ordersAll }}
              <sup>{{ props.row.ordersToday }}</sup></span
            >
          </span>
          <span
            v-else-if="props.column.field == 'check'"
            class="flex justify-center items-center"
          >
            <svg
              v-if="props.row.check == 0 && props.row.check !== 0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
            <div v-else-if="props.row.check > 0" class="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span
                class="absolute -top-1.5 -right-1.5 text-xs w-4 h-4 flex justify-center items-center bg-white rounded-full text-gray-900"
                >{{ props.row.check }}</span
              >
            </div>
            <svg
              v-if="props.row.check == 0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </span>
        </template>
      </vue-good-table>
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
      },
      loadingKey: 'loading',
      pollInterval: 5000
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
      isDays: false,
      columns: [
        {
          label: 'ID',
          field: 'id',
          sortable: false,
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },
        {
          label: 'ФИО',
          field: 'fio',
          sortable: false,
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },
        {
          label: 'Заказы всего',
          field: 'ordersAll',
          type: 'number',
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },
        {
          label: 'Сумма',
          field: 'summ1',
          type: 'number',
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },

        {
          label: 'Все запросы',
          field: 'allZapros',
          type: 'number',
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },

        {
          label: 'Перевел',
          field: 'perevel',
          type: 'number',
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },

        {
          label: 'Остаток',
          field: 'ostatok',
          type: 'number',
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },

        {
          label: 'Пациенты',
          field: 'pacients',
          type: 'number',
          tdClass: '!text-left',
          thClass: '!text-left !align-middle'
        },

        {
          label: 'Чек',
          field: 'check',
          thClass: ' !align-middle'
        }
      ],
      tableVisible: false,
      rows: []
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
    timeoutData () {
      setTimeout(() => {
        this.tableVisible = true
      }, 1500)
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
    onRowClickVrach (data) {
      console.log(data.row.id)
      this.$router.push('/vrach/' + data.row.id)
    },
    checkUser (id) {
      return new Promise((resolve, reject) => {
        this.$apollo
          .query({
            query: ALL_VRACHI_PROMO,
            variables: {
              ID: id
            }
          })
          .then(response => {
            resolve(response.data.orders) // return response data to calling function
          })
      })
    },
    dataVrach () {
      const users = this.usersPermissionsUsers.data
      const test = []

      for (let i = 0; i < users.length; i++) {
        let user = {
          id: 0,
          fio: '',
          summ1: 0,
          allZapros: 1,
          ordersAll: 1,
          ordersToday: 1,
          perevel: 0,
          ostatok: 0,
          pacients: 0,
          check: 1,
          stavka: 0
        }

        const data11 = users[i].attributes.zaprosy_vrachejs.data
        const dataHFitreder11 = data11.filter(x => x.attributes.Done == false)

        user.check = dataHFitreder11.length

        this.checkUser(users[i].attributes.Promo).then(value => {
          user.ordersAll = parseInt(value.data.length)
          let nowDate = []
          const data12 = value.data.map(x => x.attributes.SummOrder)
          const summZaprosAll12 = data12.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
          user.summ1 = summZaprosAll12
          const allDay12 = value.data.map(x => new Date(x.attributes.createdAt))

          allDay12.forEach(day => {
            let today = new Date()
            let todayDay = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).valueOf()

            const x = new Date(
              day.getFullYear(),
              day.getMonth(),
              day.getDate()
            ).valueOf()
            if (todayDay == x) {
              nowDate.push(x)
            }
          })
          user.ordersToday = parseInt(nowDate.length)
        })

        user.id = users[i].id
        user.stavka = users[i].attributes.Stavka
        const fioReplace = users[i].attributes.FIO_user.replace(
          /(\S+) (\S)\S* (\S)\S*/,
          '$1 $2. $3.'
        )
        user.fio = fioReplace
        if (users[i].attributes.Pacientis.data) {
          user.pacients = users[i].attributes.Pacientis.data.length
        } else {
          user.pacients = 0
        }

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

        this.rows.push(user)
      }
      console.log('asas', this.rows)
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
    }
  },
  mounted () {
    this.timeoutData()
    this.dataVrach()
  }
}
</script>

<style></style>
