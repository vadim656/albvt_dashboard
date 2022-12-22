<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="grid grid-cols-[4fr,3fr] gap-1">
      <section class="col-span-1 flex items-center">
        <div class="flex justify-between w-full">
          <div
            class=" gap-1  flex flex-wrap w-full font-semibold text-[#343434]"
          >
            <!-- <a-select
              :options="['Инвитро', 'Больницы']"
              :default="'Инвитро'"
              class=""
              @input="select1($event)"
            /> -->
            <a-select
              :options="['Оплата: Нет', 'Оплата: Да', 'Оплата: Все']"
              :default="'Оплата: Все'"
              class=""
              @input="select3($event)"
            />
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

    <section class="flex flex-col gap-6" v-if="usersPermissionsUsers">
      <table-pacient
        v-if="usersPermissionsUsers"
        :data_users="usersPermissionsUsers.data"
      />
      <div class="flex gap-3" v-if="usersPermissionsUsers.meta.pagination.pageCount >= 2">
        <button
          v-for="(item, i) in usersPermissionsUsers.meta.pagination.pageCount"
          :key="i"
          class=" w-10 h-10 flex items-center justify-center rounded-full text-white"
          :class="[page == i + 1 ? 'bg-blue-500' : 'bg-blue-400']"
          @click="page = i + 1"
        >
          {{ i + 1 }}
        </button>
      </div>
    </section>
    <span v-else>Загрузка...</span>
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
      page: 1,
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
      query: ALL_PACIENTS,
      variables () {
        return {
          PAGE: this.page
        }
      }
    }
  },
  computed: {}
}
</script>

<style></style>
