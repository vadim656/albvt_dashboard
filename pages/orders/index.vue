<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="grid grid-cols-[5fr,4fr] gap-1">
      <section class="col-span-1 flex items-center">
        <div class="flex justify-between w-full">
          <div
            class=" gap-1  flex flex-wrap w-full font-semibold text-[#343434]"
          >
            <a-select
              :options="[
                'Статус: Оплачен',
                'Статус: Ожидает оплаты',
                'Статус: Ожидает подтверждения',
                'Статус: Все'
              ]"
              :default="'Статус: Все'"
              class="!max-w-[300px]"
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
          placeholder="№ заказа"
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
            <div
              v-for="item in searchResults"
              :key="item.id"
              class="py-3 border-b border-[#212121]/30 grid content-center grid-cols-[1fr,4fr]  cursor-pointer  gap-2 w-full hover:bg-[#212121]/10 anime p-2"
            >
              <div class="w-full flex items-center">
                <nuxt-link :to="`/orders/` + item.id" class="text-left text-sm"
                  >№ {{ item.attributes.UID }}</nuxt-link
                >
              </div>
              <div class="w-full flex items-center">
                <nuxt-link
                  :to="`/pacient/` + item.attributes.users.data[0].id"
                  class="text-left font-bold text-sm truncate "
                  >{{
                    item.attributes.users.data[0].attributes.FIO_user
                  }}</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
    <table-orders v-if="orders" :data="orders.data" />
    <div
      class="py-12 flex justify-center"
      v-if="orders !== undefined && orders.meta.pagination.pageCount >= 2"
    >
      <div class="flex gap-3">
        <button
          v-for="(item, i) in orders.meta.pagination.pageCount"
          :key="i"
          class=" w-10 h-10 flex items-center justify-center rounded-full text-white"
          :class="[page == i + 1 ? 'bg-blue-500' : 'bg-blue-400']"
          @click="page = i + 1"
        >
          {{ i + 1 }}
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import gql from 'graphql-tag'
import aSelect from '~/components/a-select.vue'
import tableOrders from '../../components/tables/table-orders.vue'
import ORDERS from '../../gql/queries/ORDERS.gql'
import vClickOutside from 'v-click-outside'
import SEARCH_ORDER from '~/gql/queries/SEARCH_ORDER.gql'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}

export default {
  components: { tableOrders, aSelect, VueDatePicker },
  layout: 'main',
  directives: {
    clickOutside: vClickOutside.directive
  },
  apollo: {
    orders: {
      query () {
        return this.selectFilter
      },
      pollInterval: 5000,
      variables () {
        return {
          PAGE: this.page,
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
      page: 1,
      searchInput: '',
      searchResults: null,
      loading: true,
      ActiveSelect: 'Статус: Все'
    }
  },
  computed: {
    selectFilter () {
      const s1 = gql`
        query ORDERS($PAGE: Int!, $GTE: DateTime, $LTE: DateTime) {
          orders(
            pagination: { pageSize: 10, page: $PAGE }
            sort: "Status:asc"
            filters: { createdAt: { gte: $GTE, lte: $LTE } }
          ) {
            meta {
              pagination {
                total
                pageSize
                pageCount
                page
              }
            }
            data {
              id
              attributes {
                Status
                SummOrder
                StatusOplata
                UID
                users {
                  data {
                    id
                    attributes {
                      FIO_user
                    }
                  }
                }
                analizies {
                  data {
                    id
                    attributes {
                      UID
                    }
                  }
                }
              }
            }
          }
        }
      `
      const s2 = gql`
        query ORDERS($PAGE: Int!, $GTE: DateTime, $LTE: DateTime) {
          orders(
            pagination: { pageSize: 10, page: $PAGE }
            sort: "Status:asc"
            filters: {
              createdAt: { gte: $GTE, lte: $LTE }
              and: { Status: { eq: true } }
            }
          ) {
            meta {
              pagination {
                total
                pageSize
                pageCount
                page
              }
            }
            data {
              id
              attributes {
                Status
                SummOrder
                StatusOplata
                UID
                users {
                  data {
                    id
                    attributes {
                      FIO_user
                    }
                  }
                }
                analizies {
                  data {
                    id
                    attributes {
                      UID
                    }
                  }
                }
              }
            }
          }
        }
      `
      const s3 = gql`
        query ORDERS($PAGE: Int!, $GTE: DateTime, $LTE: DateTime) {
          orders(
            pagination: { pageSize: 10, page: $PAGE }
            sort: "Status:asc"
            filters: {
              createdAt: { gte: $GTE, lte: $LTE }
              and: [{ Status: { eq: false } }, { StatusOplata: { eq: true } }]
            }
          ) {
            meta {
              pagination {
                total
                pageSize
                pageCount
                page
              }
            }
            data {
              id
              attributes {
                Status
                SummOrder
                StatusOplata
                UID
                users {
                  data {
                    id
                    attributes {
                      FIO_user
                    }
                  }
                }
                analizies {
                  data {
                    id
                    attributes {
                      UID
                    }
                  }
                }
              }
            }
          }
        }
      `
      const s4 = gql`
        query ORDERS($PAGE: Int!, $GTE: DateTime, $LTE: DateTime) {
          orders(
            pagination: { pageSize: 10, page: $PAGE }
            sort: "Status:asc"
            filters: {
              createdAt: { gte: $GTE, lte: $LTE }
              and: [{ Status: { eq: false } }, { StatusOplata: { eq: false } }]
            }
          ) {
            meta {
              pagination {
                total
                pageSize
                pageCount
                page
              }
            }
            data {
              id
              attributes {
                Status
                SummOrder
                StatusOplata
                UID
                users {
                  data {
                    id
                    attributes {
                      FIO_user
                    }
                  }
                }
                analizies {
                  data {
                    id
                    attributes {
                      UID
                    }
                  }
                }
              }
            }
          }
        }
      `
      if (this.ActiveSelect == 'Статус: Все') {
        return s1
      } else if (this.ActiveSelect == 'Статус: Оплачен') {
        return s2
      } else if (this.ActiveSelect == 'Статус: Ожидает оплаты') {
        return s3
      } else if (this.ActiveSelect == 'Статус: Ожидает подтверждения') {
        return s4
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
    }
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
            query: SEARCH_ORDER,
            variables: {
              UID: lowerCase
            }
          })

          if (res) {
            this.loading = false

            const data = res.data.orders.data
            console.log('data ', data)
            this.searchResults = data
          }
        } catch (err) {
          this.loading = false
        }
      } else {
        this.searchResults = []
      }
    }
  }
}
</script>

<style></style>
