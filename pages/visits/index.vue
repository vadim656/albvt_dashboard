<template>
  <div class="flex w-full flex-col gap-6">
    <nav class="grid grid-cols-[5fr,1fr] gap-1">
      <section class="col-span-1 flex items-center">
        <div class="flex justify-between w-full">
          <div
            class=" gap-1  flex flex-wrap w-full font-semibold text-[#343434]"
          >
            <a-select
              :options="[
                'Посещения: Инвитро',
                'Посещения: Больницы',
                'Посещения: Все'
              ]"
              :default="'Посещения: Все'"
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
    </nav>
    <div class="w-full flex flex-col gap-2">
      <section class="flex flex-col gap-4">
        <div class=" border border-gray-400 drop-shadow-lg">
          <table-home
            v-if="gorodaInvitros !== undefined"
            :data_home="homeResult"
          />
          <span v-else>Загрузка...</span>
        </div>
        <div
          class="py-12 flex justify-center"
          v-if="
            gorodaInvitros !== undefined &&
              gorodaInvitros.meta.pagination.pageCount >= 2
          "
        >
          <div class="flex gap-3">
            <button
              v-for="(item, i) in gorodaInvitros.meta.pagination.pageCount"
              :key="i"
              class=" w-10 h-10 flex items-center justify-center rounded-full text-white"
              :class="[page == i + 1 ? 'bg-blue-500' : 'bg-blue-400']"
              @click="page = i + 1"
            >
              {{ i + 1 }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import tableHome from '~/components/tables/table-home.vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import vClickOutside from 'v-click-outside'
import OFISES_ALL from '~/gql/queries/OFISES_ALL.gql'
var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}

export default {
  middleware: 'auth',
  components: { tableHome, VueDatePicker },
  layout: 'main',
  apollo: {
    gorodaInvitros: {
      query () {
        return this.selectFilterHome
      },
      variables () {
        return {
          GTE: this.DateIso.start,
          LTE: this.DateIso.end,
          PAGE: this.page
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
      ActiveSelectHome: 'Посещения: Все',
      page: 1
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
      this.ActiveSelectHome = id
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
    selectFilterHome () {
      const h1 = gql`
        query OFISES_ALL($GTE: DateTime, $LTE: DateTime, $PAGE: Int!) {
          gorodaInvitros(pagination: { pageSize: 10, page: $PAGE }) {
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
                Invitro
                Phone
                Name
                users {
                  data {
                    id
                  }
                }
                GegimRaboty
                zakazies(filters: { createdAt: { gte: $GTE, lte: $LTE } }) {
                  data {
                    id
                    attributes {
                      SummOrder
                      createdAt
                    }
                  }
                }
                area_invitro {
                  data {
                    attributes {
                      sityes_invitros {
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
          }
        }
      `
      const h2 = gql`
        query OFISES_ALL_FILTER_FALSE(
          $GTE: DateTime
          $LTE: DateTime
          $PAGE: Int!
        ) {
          gorodaInvitros(
            pagination: { pageSize: 10, page: $PAGE }
            filters: { Invitro: { eq: false } }
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
                Invitro
                Name
                Phone
                GegimRaboty
                users {
                  data {
                    id
                  }
                }
                zakazies(filters: { createdAt: { gte: $GTE, lte: $LTE } }) {
                  data {
                    id
                    attributes {
                      SummOrder
                      createdAt
                    }
                  }
                }
                area_invitro {
                  data {
                    attributes {
                      sityes_invitros {
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
          }
        }
      `
      const h3 = gql`
        query OFISES_ALL_FILTER_TRUE(
          $GTE: DateTime
          $LTE: DateTime
          $PAGE: Int!
        ) {
          gorodaInvitros(
            pagination: { pageSize: 10, page: $PAGE }
            filters: { Invitro: { eq: true } }
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
                Invitro
                Name
                users {
                  data {
                    id
                  }
                }
                Phone
                GegimRaboty
                zakazies(filters: { createdAt: { gte: $GTE, lte: $LTE } }) {
                  data {
                    id
                    attributes {
                      SummOrder
                      createdAt
                    }
                  }
                }
                area_invitro {
                  data {
                    attributes {
                      sityes_invitros {
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
          }
        }
      `
      if (this.ActiveSelectHome == 'Посещения: Все') {
        return h1
      } else if (this.ActiveSelectHome == 'Посещения: Больницы') {
        return h2
      } else if (this.ActiveSelectHome == 'Посещения: Инвитро') {
        return h3
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

    homeResult () {
      return this.gorodaInvitros.data
    }
  }
}
</script>

<style></style>
