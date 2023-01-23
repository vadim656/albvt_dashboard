<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="flex justify-end items-center gap-1">
      <section class=" w-full flex justify-end gap-4">
        <div class="relative w-full max-w-[360px]">
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
            v-if="searchResults"
            v-click-outside="externalClick"
            class="absolute top-12  bg-white drop-shadow-md rounded-md z-[99] w-full overflow-hidden"
          >
            <div class="flex flex-col -gap-1">
              <nuxt-link
                :to="`/pacient/` + item.id"
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
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          v-if="usersPermissionsUsersPacient"
          class=" flex justify-center items-center gap-2 text-sm"
        >
          Всего:
          <span>{{ usersPermissionsUsersPacient.meta.pagination.total }}</span>
        </div>
      </section>
    </nav>

    <section class="flex flex-col gap-6" v-if="usersPermissionsUsers">
      <table-pacient
        v-if="usersPermissionsUsers"
        :data_users="usersPermissionsUsers.data"
      />
      <div
        class="flex gap-3"
        v-if="usersPermissionsUsers.meta.pagination.pageCount >= 2"
      >
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
import gql from 'graphql-tag'
import aSelect from '../components/a-select.vue'
import vClickOutside from 'v-click-outside'
import ALL_PACIENTS from '~/gql/queries/all-pacient.gql'
import TablePacient from '../components/tables/table-pacient.vue'
import SEARCH_PACIENT from '~/gql/queries/SEARCH_PACIENT.gql'

export default {
  components: { aSelect, TablePacient },
  middleware: 'auth',
  layout: 'main',
  directives: {
    clickOutside: vClickOutside.directive
  },
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
    externalClick () {
      this.searchResults = []
      this.searchInput = ''
    },
    async search (value) {
      if (value.length >= 3) {
        const lowerCase = value[0].toUpperCase() + value.slice(1)

        try {
          const res = await this.$apollo.query({
            query: SEARCH_PACIENT,
            variables: {
              FIO: lowerCase
            }
          })

          if (res) {
            console.log(res.data)
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

  apollo: {
    usersPermissionsUsers: {
      query: ALL_PACIENTS,
      variables () {
        return {
          PAGE: this.page
        }
      }
    },
    usersPermissionsUsersPacient: {
      query: gql`
        query ALL_VRACHI_STAT {
          usersPermissionsUsersPacient: usersPermissionsUsers(
            filters: { RoleUser: { eq: "Pacient" } }
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
  computed: {}
}
</script>

<style></style>
