<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="grid grid-cols-[5fr,4fr] gap-1">
      <section class="col-span-1 flex items-center">
        <div class="flex justify-between w-full">
          <div
            class=" gap-1  flex flex-wrap w-full font-semibold text-[#343434]"
          >
            <a-select
              :options="['Оплата: Да', 'Оплата: Нет', 'Оплата: Все']"
              :default="'Оплата: Все'"
              class=""
              @input="select1($event)"
            />
            <client-only
              ><VueDatePicker
                :value="date"
                v-model="date"
                :locale="locale"
                placeholder="Выберите интервал"
                range
            /></client-only>
            <button
              @click="reloadPage"
              class="p-2 rounded-md bg-[#4F4F4F] text-white flex items-center gap-1 text-sm"
            >
              Сбросить
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section class="relative col-span-1">
        <input
          type="text"
          @input="search($event.target.value)"
          v-model="searchInput"
          class="w-full border rounded-md p-2"
          placeholder="Поиск по запросам"
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
      <section class="flex flex-col gap-4">
        <div
          class="rounded-md overflow-hidden border border-gray-400 drop-shadow-lg"
        >
          <table-reqs
            v-if="zaprosyVrachejs !== undefined"
            :data_req="reqsResult"
          />
          <span v-else>Загрузка...</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import aSelect from '~/components/a-select.vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import vClickOutside from 'v-click-outside'
import TableReqs from '~/components/tables/table-reqs.vue'

let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}

export default {
  layout: 'main',
  components: { aSelect, VueDatePicker, TableReqs },
  apollo: {
    zaprosyVrachejs: {
      query () {
        return this.selectFilter
      },
      variables () {
        return {
          GTE: this.DateIso.start,
          LTE: this.DateIso.end
        }
      }
    }
  },
  data () {
    return {
      date: new Date().toLocaleString('ru', options),
      locale: { lang: 'ru' },
      today: new Date().toLocaleString('ru', options),
      searchInput: '',
      searchResults: null,
      isDays: false,
      loading: true,
      ActiveSelect: 'Оплата: Все'
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    reloadPage () {
      location.reload()
    },
    select1 (id) {
      this.ActiveSelect = id
      this.page = 1
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
            query: SEARCH_VRACH,
            variables: {
              FIO: lowerCase
            }
          })

          if (res) {
            this.loading = false
            const data = res.data.zaprosyVrachejs.data
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
    selectFilter () {
      const s1 = gql`
        query ALL_REQS_FILTER($GTE: DateTime, $LTE: DateTime) {
          zaprosyVrachejs(
            filters: {
              createdAt: { gte: $GTE, lte: $LTE }
              and: { Done: { eq: true } }
            }
            sort: "Done:asc"
          ) {
            data {
              id
              attributes {
                Summ
                Done
                createdAt
                UID
                users_permissions_user {
                  data {
                    attributes {
                      FIO_user
                    }
                  }
                }
              }
            }
          }
        }
      `
      const s2 = gql`
        query ALL_REQS_FILTER($GTE: DateTime, $LTE: DateTime) {
          zaprosyVrachejs(
            filters: {
              createdAt: { gte: $GTE, lte: $LTE }
              and: { Done: { eq: false } }
            }
            sort: "Done:asc"
          ) {
            data {
              id
              attributes {
                Summ
                Done
                createdAt
                UID
                users_permissions_user {
                  data {
                    attributes {
                      FIO_user
                    }
                  }
                }
              }
            }
          }
        }
      `
      const s3 = gql`
        query ALL_REQS_FILTER($GTE: DateTime, $LTE: DateTime) {
          zaprosyVrachejs(
            filters: { createdAt: { gte: $GTE, lte: $LTE } }
            sort: "Done:asc"
          ) {
            data {
              id
              attributes {
                Summ
                Done
                createdAt
                UID
                users_permissions_user {
                  data {
                    attributes {
                      FIO_user
                    }
                  }
                }
              }
            }
          }
        }
      `
      if (this.ActiveSelect == 'Оплата: Да') {
        return s1
      } else if (this.ActiveSelect == 'Оплата: Нет') {
        return s2
      } else if (this.ActiveSelect == 'Оплата: Все') {
        return s3
      }
    },
    DateIso () {
      if (this.date.start) {
        const d = new Date(this.date.end)
        d.setDate(d.getDate() + 1)
        const date = {
          start: new Date(this.date.start).toISOString(),
          end: d.toISOString()
        }
        return date
      } else {
        const d2 = new Date()
        d2.setDate(d2.getDate() + 1)
        const d1 = new Date()
        d1.setDate(d1.getDate() - 10)
        const date = {
          start: d1.toISOString(),
          end: d2.toISOString()
        }
        return date
      }
    },

    reqsResult () {
      return this.zaprosyVrachejs.data
    }
  }
}
</script>

<style></style>
