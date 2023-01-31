<template>
  <div class="bg-[#fcfcfc] relative">
    <div class="min-h-screen flex w-full flex-row bg-gray-100">
      <Transition name="fade" mode="out-in">
        <div
          key="1"
          v-if="show == true"
          class="flex flex-col w-full  max-w-[140px] bg-white   relative"
        >
          <button
            @click="show = !show"
            class="p-2 rounded-full drop-shadow-xl bg-white absolute bottom-12 -right-4"
          >
            <svg
              v-if="show == true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <div class="flex items-center justify-center h-14 py-2 shadow-md">
            <h1 class="text-xl text-center font-bold uppercase text-blue-500">
              ALBVT CRM
            </h1>
          </div>
          <ul class="flex flex-col py-4  text-sm " id="sidebar">
            <!-- врачи -->
            <nuxt-link
              prefetch
              to="/vrach"
              href="#"
              class=" flex flex-row items-center h-10 px-3 group hover:text-white hover:bg-blue-500 anime  relative"
              :class="[
                $route.path.includes('vrach')
                  ? 'text-white bg-blue-500'
                  : 'text-gray-500 bg-white'
              ]"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <span>Врачи</span>
              </div>
            </nuxt-link>
            <!-- запросы -->
            <nuxt-link
              v-if="zaprosyVrachejs"
              prefetch
              to="/requests"
              href="#"
              class="flex flex-row items-center h-10 px-3  group hover:text-white hover:bg-blue-500 anime  relative"
              :class="[
                $route.path.includes('requests')
                  ? 'text-white bg-blue-500'
                  : 'text-gray-500 bg-white'
              ]"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <span>Запросы</span>
                <span
                  v-if="zaprosyVrachejs.meta.pagination.total > 0"
                  class="text-[10px] text-white  bg-blue-400 w-6 h-6 flex justify-center items-center rounded-full "
                  >{{ zaprosyVrachejs.meta.pagination.total }}</span
                >
              </div>
            </nuxt-link>
            <div class="w-full h-[1px] bg-neutral-200 my-2"></div>
            <!-- пациенты -->
            <nuxt-link
              to="/pacient"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3 group  hover:text-white hover:bg-blue-500 anime  relative"
              :class="[
                $route.path.includes('pacient')
                  ? 'text-white bg-blue-500'
                  : 'text-gray-500 bg-white'
              ]"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <span>Пациенты</span>
              </div>
            </nuxt-link>
            <!-- заказы -->
            <nuxt-link
              v-if="orders"
              to="/orders"
              prefetch
              href="#"
              :class="[
                $route.path.includes('orders')
                  ? 'text-white bg-blue-500'
                  : 'text-gray-500 bg-white'
              ]"
              class="flex flex-row items-center h-10 px-3 group hover:text-white hover:bg-blue-500 anime  relative"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <span>Заказы</span>
                <span
                  v-if="orders.data.length > 0"
                  class="text-[10px] text-white  bg-blue-400 w-6 h-6 flex justify-center items-center rounded-full "
                  >{{ orders.data.length }}</span
                >
              </div>
            </nuxt-link>
            <div class="w-full h-[1px] bg-neutral-200 my-2"></div>
            <!-- посещения -->
            <nuxt-link
              to="/visits"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime  relative"
               :class="[
                $route.path.includes('visits')
                  ? 'text-white bg-blue-500'
                  : 'text-gray-500 bg-white'
              ]"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <span>Посещения</span>
              </div>
            </nuxt-link>
            <!-- уведомления -->
            <!-- <nuxt-link
              to="/visits"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <span>Уведомления</span>
            </nuxt-link> -->
          </ul>
          <div class="flex flex-col gap-2 px-3 justify-end h-full py-6">
            <button
              class="underline underline-offset-2"
              @click="handleLogout()"
            >
              Выйти
            </button>
          </div>
        </div>

        <div
          key="2"
          v-else-if="show == false"
          class="flex flex-col w-full min-w-[80px] max-w-[80px] bg-white  relative"
        >
          <button
            @click="show = !show"
            class="p-2 rounded-full drop-shadow-xl bg-white absolute bottom-12 -right-4"
          >
            <svg
              v-if="show == false"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <div class="flex items-center justify-center h-14 py-2 shadow-md">
            <h1 class="text-sm font-bold text-center uppercase text-blue-600">
              ALBVT CRM
            </h1>
          </div>
          <ul class="flex flex-col py-4  text-sm">
            <nuxt-link
              prefetch
              to="/vrachi"
              href="#"
              class="flex flex-row items-center h-10 px-3 group hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
            </nuxt-link>
            <!-- запросы -->
            <nuxt-link
              prefetch
              to="/requests"
              href="#"
              class="flex flex-row items-center h-10 px-3  group hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <div
                v-if="zaprosyVrachejs"
                title="Запросы на вывод"
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>

                <span
                  v-if="zaprosyVrachejs.meta.pagination.total > 0"
                  class="text-[10px] text-white  bg-blue-400 w-6 h-6 flex justify-center items-center rounded-full "
                  >{{ zaprosyVrachejs.meta.pagination.total }}</span
                >
              </div>
            </nuxt-link>
            <div class="w-full h-[1px] bg-neutral-200 my-2"></div>
            <!-- пациенты -->
            <nuxt-link
              to="/pacienti"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3 group  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
            </nuxt-link>

            <!-- заказы -->
            <nuxt-link
              v-if="orders"
              to="/orders"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3 group hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                  />
                </svg>

                <span
                  v-if="orders.data.length > 0"
                  class="text-[10px] text-white  bg-blue-400 w-6 h-6 flex justify-center items-center rounded-full "
                  >{{ orders.data.length }}</span
                >
              </div>
            </nuxt-link>
            <div class="w-full h-[1px] bg-neutral-200 my-2"></div>
            <!-- посещения -->
            <nuxt-link
              to="/visits"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <div
                class="text-sm font-medium flex justify-between items-center w-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
            </nuxt-link>
            <!-- уведомления -->
            <!-- <nuxt-link
              to="/visits"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </nuxt-link> -->
          </ul>
          <div class="flex flex-col gap-2 px-3 justify-end h-full py-6">
            <button
              class="underline underline-offset-2"
              @click="handleLogout()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
      <div class="p-4 flex w-full flex-col gap-4">
        <a-header />
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import AHeader from '../components/a-header.vue'
import gql from 'graphql-tag'

export default {
  apollo: {
    zaprosyVrachejs: {
      query: gql`
        query ALL_REQS_STAT {
          zaprosyVrachejs(filters: { Done: { eq: false } }) {
            meta {
              pagination {
                total
              }
            }
          }
        }
      `,
      loadingKey: 'loading',
      pollInterval: 2000
    },

    orders: {
      query: gql`
        query STAT_ORDERS {
          orders(
            filters: {
              Status: { eq: false }
              and: { StatusOplata: { eq: false } }
            }
          ) {
            data {
              id
              attributes {
                UID
                Status
                StatusOplata
              }
            }
          }
        }
      `,
      loadingKey: 'loading',
      pollInterval: 2000
    }
  },
  components: { AHeader },
  data () {
    return {
      vrachi: null,
      pacienti: null,
      reqs: null,
      page: 0,
      show: true
    }
  },
  computed: {
    bgButton () {
      if (this.$route.path.includes('orders')) {
        return 1
      } else {
        return 2
      }
    }
  },
  methods: {
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
