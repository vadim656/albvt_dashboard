<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="grid grid-cols-[5fr,4fr] gap-1">
      <section class="col-span-1 flex items-center">
        <div class="flex justify-between w-full">
          <div
            class=" gap-1  flex flex-wrap w-full font-semibold text-[#343434]"
          >
            <!-- <a-select
              :options="['Оплата: Да', 'Оплата: Нет', 'Оплата: Все']"
              :default="'Оплата: Все'"
              class=""
              @input="select1($event)"
            />
            <a-select
              v-if="ActiveSelect2 != 'Все'"
              :options="['Запрос +', 'Запрос -']"
              :default="'Запрос -'"
              class=""
              @input="select2($event)"
            />
            <a-select
              v-if="ActiveSelect3 == 'Запрос +'"
              :options="['Перевод +', 'Перевод -']"
              :default="'Перевод -'"
              class=""
              @input="select3($event)"
            /> -->

            <client-only
              ><VueDatePicker
                :value="date"
                v-model="date"
                :locale="locale"
                placeholder="Выберите интервал"
                range
            /></client-only>
          </div>
        </div>
      </section>

      <section class="relative col-span-1">
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
          class="absolute top-10  bg-white drop-shadow-md rounded-md z-[99] w-full overflow-hidden"
        >
          <div class="flex flex-col -gap-1">
            <nuxt-link
              :to="`/vrach/` + item.id"
              v-for="item in searchResults"
              :key="item.id"
              class="py-3 border-b border-[#212121]/30 grid content-center grid-cols-[1fr,7fr,3fr]  cursor-pointer  gap-2 w-full hover:bg-[#212121]/10 anime p-2"
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
  </div>
</template>

<script>
import aSelect from '~/components/a-select.vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import vClickOutside from 'v-click-outside'

import ALL_VRACHI_DATE from '~/gql/queries/all-vrachi-filters.gql'
import ALL_VRACHI from '~/gql/queries/all-vrachi.gql'
import SEARCH_VRACH from '~/gql/queries/SEARCH_VRACH.gql'
import TableVrach from '~/components/tables/table-vrach.vue'

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
      date: new Date().toLocaleString('ru', options),
      locale: { lang: 'ru' },
      today: new Date().toLocaleString('ru', options),
      searchInput: '',
      searchResults: null,
      isDays: false,
      loading: true,
      ActiveSelect1: 'Оплата: Все',
      ActiveSelect2: 'Запрос -',
      ActiveSelect3: 'Перевод -'
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
    }
  }
}
</script>

<style></style>
