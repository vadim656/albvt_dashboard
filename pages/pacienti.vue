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
              :options="['Оплачен', 'Не оплачен', 'Все']"
              :default="'Все'"
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
            <button
              @click="isDays = !isDays"
              :class="[isDays == true ? 'bg-blue-500' : 'bg-[#4F4F4F]']"
              class="  anime text-white text-sm py-2  px-2 flex  justify-center items-center rounded-lg gap-2 cursor-pointer hover:drop-shadow-xl anime min-w-[110px] max-w-[140px]"
            >
              По дням
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
                v-if="isDays == true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
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
          placeholder="Поиск по пациентам"
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
          v-if="searchResults.data"
          class="absolute top-10  bg-white drop-shadow-md rounded-md z-[99] w-full overflow-hidden"
        >
          <div class="flex flex-col -gap-1">
            <div
              v-for="item in searchResults.data"
              :key="item.id"
              class="py-3 border-b border-[#212121]/30 grid content-center grid-cols-[1fr,5fr,3fr]  cursor-pointer  gap-2 w-full hover:bg-[#212121]/10 anime p-2"
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
                  item.attributes.speczialnost.data.attributes.Name
                }}</span>
              </div>
            </div>
            <!-- <button
            class="p-4 font-semibold bg-red/70 hover:bg-red/90 anime text-white"
          >
            Показать все товары
          </button> -->
          </div>
        </div>
      </section>
    </nav>

    <section class="">
      <table-pacient v-if="userResult" :data_users="userResult" />
    </section>
  </div>
</template>

<script>
import aSelect from '../components/a-select.vue'

// import ALL_VRACHI from '../gql/queries/all-vrachi.gql'
import gql from 'graphql-tag'
import ALL_PACIENTS from '../gql/queries/all-pacient.gql'
import TablePacient from '../components/tables/table-pacient.vue'
const SEARCH_PACIENTI = gql`
  query($FIO: String!) {
    search(query: $FIO) {
      vrachis {
        data {
          id
          attributes {
            FIO
            speczialnost {
              data {
                attributes {
                  Name
                }
              }
            }
          }
        }
      }
    }
  }
`


export default {
  components: { aSelect, TablePacient },
  middleware: 'auth',
  layout: 'main',
  data () {
    return {
      searchInput: '',
      searchResults: [],
      isDays: false,
      allUsers: [],
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
    async SearchUsers () {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY4OTI4NzA0LCJleHAiOjE2NzE1MjA3MDR9.XpGj5j0p1ip2MLBk5QzjCp20LPYbFmkM1qesOoL_aB4`
        }
      }
      const users = await this.$axios.$get('http://localhost:1337/api/users', {
        config,
        params: {
          populate: '*'
        }
      })
      this.allUsers = users
    },
    async search (value) {
      const lowerCase = value.toLowerCase()
      if (lowerCase.length >= 2) {
        try {
          const res = await this.$apollo.query({
            query: SEARCH_PACIENTI,
            variables: {
              FIO: lowerCase
            }
          })

          if (res) {
            this.loading = false
            const vrachis = res.data.search.vrachis
            this.searchResults = vrachis
          }
        } catch (err) {
          this.loading = false
        }
      } else {
        this.searchResults = []
      }
    }
  },

  apollo: {
    usersPermissionsUsers: {
      query: ALL_PACIENTS
    }
  },
  computed: {
    userResult () {
      const all = this.usersPermissionsUsers.data.map(user => {
        if (user.attributes.zakazies.data.length) {
          user["Orders"] = user.attributes.zakazies.data.length
          let sumOrders = 0
          user.attributes.zakazies.data.forEach(zak => {
            sumOrders += Number(zak.attributes.SummOrder)
          })
          user['sumOrders'] = sumOrders

          user['vrachis'] = user.attributes.vrachis.data.length

          return user
        } else {
          user["Orders"] = 0
          user['sumOrders'] = 0
          return user
        }
      })
      return all
    }
  },
}
</script>

<style></style>
