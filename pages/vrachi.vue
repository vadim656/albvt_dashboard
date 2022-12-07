<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="grid grid-cols-[4fr,3fr] gap-1">
      <section class="col-span-1 flex items-center">
        <div class="flex justify-between w-full">
          <div
            class=" gap-1  flex flex-wrap w-full font-semibold text-[#343434]"
          >
            <a-select
              :options="['Инвитро', 'Больницы']"
              :default="'Инвитро'"
              class=""
              @input="select1($event)"
            />
            <a-select
              :options="['Оплата: Да', 'Оплата: Нет', 'Оплата: Все']"
              :default="'Оплата: Все'"
              class=""
              @input="select3($event)"
            />
            <a-select
              v-if="filterOne.par3 != 'Все'"
              :options="['Запрос +', 'Запрос -']"
              :default="'Запрос -'"
              class=""
              @input="select5($event)"
            />
            <a-select
              v-if="filterOne.par5 == 'Запрос +'"
              :options="['Перевод +', 'Перевод -']"
              :default="'Перевод -'"
              class=""
              @input="select4($event)"
            />

            <client-only
              ><VueDatePicker
                :value="date"
                v-model="date"
                :locale="locale"
                range
            /></client-only>
            <!-- <a-select
            :options="['Инвитро', 'Больницы']"
            :default="'Посещения'"
            class=""
            @input="select($event)"
          /> -->
          </div>
        </div>
      </section>

      <section class="relative col-span-1">
        <input
          type="text"
          @input="search($event.target.value)"
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
          class="absolute top-10  bg-white drop-shadow-md rounded-md z-[99] w-full overflow-hidden"
        >
          <div class="flex flex-col -gap-1">
            <div
              v-for="item in searchResults"
              :key="item.id"
              class="py-3 border-b border-[#212121]/30 grid content-center grid-cols-[1fr,7fr,3fr]  cursor-pointer  gap-2 w-full hover:bg-[#212121]/10 anime p-2"
            >
              <div class="w-full flex items-center">
                <span class="text-left text-xs">ID {{ item.id }} </span>
              </div>
              <div class="w-full flex items-center">
                <span class="text-left font-bold text-sm truncate ">
                  {{ item.attributes.FIO }}
                </span>
              </div>
              <div class="w-full flex items-center  flex-end">
                <span class=" text-sm text-right text-[#343434]/70  w-full">{{
                  item.attributes.users_permissions_user.data.attributes
                    .speczialnosts.data[0].attributes.Name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
    <div class="w-full flex flex-col gap-2">
      <!-- <span class="mt-6 text-xl text-blue-500 font-bold"
        >
        Dctuj pfrfpjd
        <span v-if="usersPermissionsUsers !== undefined"
          >({{ usersPermissionsUsers.meta.pagination.total }})</span
        >
      </span> -->
      <section class="" v-if="usersPermissionsUsers !== undefined">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          
          <table-vrach v-if="userResult !== undefined" :data_users="userResult" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import aSelect from '../components/a-select.vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'


import ALL_VRACHI_DATE from '../gql/queries/all-vrachi-filters.gql'
import ALL_VRACHI from '../gql/queries/all-vrachi.gql'
import SEARCH_VRACHI from '../gql/queries/search-vrachi.gql'
import TableVrach from '../components/tables/table-vrach.vue'

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
    }
  },
  middleware: 'auth',
  components: { aSelect, VueDatePicker, TableVrach },
  layout: 'main',
  data () {
    return {
      date: new Date(),
      locale: { lang: 'ru' },
      today: new Date().toLocaleString('ru', options),
      searchInput: '',
      searchResults: null,
      isDays: false,
      loading: true,
      filterOne: {
        par1: '',
        par2: '',
        par3: 'Все',
        par4: '',
        par5: 'Перевод -'
      }
    }
  },
  methods: {
    select1 (a) {
      this.filterOne.par1 = a
    },
    select2 (b) {
      this.filterOne.par2 = b
    },
    select3 (q) {
      this.filterOne.par3 = q
    },
    select4 (w) {
      this.filterOne.par4 = w
    },
    select5 (e) {
      this.filterOne.par5 = e
    },
    async search (value) {
      const lowerCase = value.toLowerCase()
      if (lowerCase.length >= 3) {
        try {
          const res = await this.$apollo.query({
            query: SEARCH_VRACHI,
            variables: {
              FIO: lowerCase
            }
          })

          if (res) {
            this.loading = false
            const data = res.data.search.vrachis.data
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
      const all = this.usersPermissionsUsers.data.map(user => {
        if (user.attributes.zakazies.data.length) {
          // подсчет кол-ва запросов
          user['ZaprosSumm'] = user.attributes.zaprosy_vrachejs.data.length
          let summ = 0

          user.attributes.zaprosy_vrachejs.data.forEach(zak => {
            summ += Number(zak.attributes.Summ)
          })
          user['zakazies2'] = summ

          // подсчет неоплаченных запросовъ
          let SummOplacheno = 0
          let SummNeOplacheno = 0
          let zaprosFalse = user.attributes.zaprosy_vrachejs.data.filter(
            x => x.attributes.Done == false
          )
          let zaprosTrue = user.attributes.zaprosy_vrachejs.data.filter(
            x => x.attributes.Done == true
          )
          zaprosFalse.forEach(x => {
            SummNeOplacheno += Number(x.attributes.Summ)
          })

          zaprosTrue.forEach(x => {
            SummOplacheno += Number(x.attributes.Summ)
          })

          user['neOplacheno'] = SummNeOplacheno
          user['oplacheno'] = SummOplacheno
          // подсчет размера общих заказов
          let sumOrders = 0
          user.attributes.zakazies.data.forEach(zak => {
            sumOrders += Number(zak.attributes.SummOrder)
          })
          user['sumOrders'] = sumOrders

          return user
        } else {
          user['ZaprosSumm'] = 0
          user['zakazies2'] = 0
          user['sumOrders'] = 0
          return user
        }
      })
      return all
    }
  }
}
</script>

<style></style>
