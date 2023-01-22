<template>
  <div class="bg-[#fcfcfc] relative">
    <div class="min-h-screen flex w-full flex-row bg-gray-100">
      <div
        class="flex flex-col w-full min-w-[180px] max-w-[180px] bg-white rounded-r-3xl overflow-hidden"
      >
        <div class="flex items-center justify-center h-14 shadow-md">
          <h1 class="text-xl font-bold uppercase text-blue-600">ALBVT</h1>
        </div>
        <ul class="flex flex-col py-4  text-sm">
          <nuxt-link
            prefetch
            to="/"
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 "
          >
            <span class="text-sm font-medium">Главная</span>
          </nuxt-link>
          <!-- врачи -->
          <nuxt-link
            prefetch
            to="/vrachi"
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
          >
            <div
              class="text-sm font-medium flex justify-between items-center w-full "
            >
              <span>Врачи</span>
              <span class="text-xs  absolute top-0 right-1 ">{{
                usersPermissionsUsersVrach.meta.pagination.total
              }}</span>
            </div>
          </nuxt-link>
          <!-- запросы -->
          <nuxt-link
            prefetch
            to="/requests"
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
          >
            <div
              class="text-sm font-medium flex justify-between items-center w-full "
            >
              <span>Запросы на вывод</span>
              <span class="text-xs  absolute top-0 right-1 ">{{
                zaprosyVrachejs.meta.pagination.total
              }}</span>
            </div>
          </nuxt-link>
          <!-- пациенты -->
          <nuxt-link
            to="/pacienti"
            prefetch
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
          >
            <span>Пациенты</span>
            <span class="text-xs  absolute top-0 right-1 ">{{
              usersPermissionsUsersPacient.meta.pagination.total
            }}</span>
          </nuxt-link>
          <!-- заказы -->
          <nuxt-link
            to="/orders"
            prefetch
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
          >
            <div
              class="text-sm font-medium flex justify-between items-center w-full "
            >
              <span>Заказы</span>
              <span class="text-xs  absolute top-0 right-1 ">{{
                orders.meta.pagination.total
              }}</span>
            </div>
          </nuxt-link>
          <!-- посещения -->
          <nuxt-link
            to="/visits"
            prefetch
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
          >
            <span>Посещения</span>
          </nuxt-link>

          <span class="w-full h-[1px] bg-gray-600/20 my-4"></span>

          <li
            class="flex flex-row justify-center items-center h-10 px-3 hover:translate-x-1 anime anime text-gray-500 "
          >
            <nuxt-link to="/notices">
              <div
                class="relative block cursor-pointer bg-white rounded-full hover:drop-shadow-xl anime"
              >
                <img src="~assets/icons/notifycation-not.svg" alt="" />
                <span
                  class="w-4 h-4 text-xs bg-white rounded-full absolute -top-2 right-0 text-[#343434] flex items-center justify-center z-[1]"
                  >0</span
                >
              </div>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
              to="/zayavki"
              prefetch
              href="#"
              class="flex flex-row items-center h-10 justify-center transform hover:translate-x-1 anime text-gray-500 hover:text-blue-600"
            >
              <div
                class="relative block cursor-pointer bg-white rounded-full hover:drop-shadow-xl anime"
              >
                <img src="~assets/icons/mail-not.svg" class="pt-1" alt="" />
                <span
                  class="w-4 h-4 text-xs bg-white rounded-full absolute -top-2 -right-2 text-[#343434] flex items-center justify-center z-[1]"
                  >0</span
                >
              </div>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
              to="/requests"
              href="#"
              class="flex flex-row items-center h-10 justify-center transform hover:translate-x-1 anime text-gray-500 hover:text-blue-600"
            >
              <div
                class="relative block cursor-pointer bg-white rounded-full hover:drop-shadow-xl anime"
              >
                <span
                  class="w-4 h-4 text-xs bg-white rounded-full absolute -top-2 -right-1 text-[#343434] flex items-center justify-center z-[1]"
                  >{{ zaprosyVrachejs.meta.pagination.total }}</span
                >
                <img src="~assets/icons/money-not.svg" alt="" class="" />
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
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
    usersPermissionsUsersVrach: {
      query: gql`
        query ALL_VRACHI_STAT {
          usersPermissionsUsersVrach: usersPermissionsUsers(
            filters: { RoleUser: { eq: "Vrach" } }
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
    },
    orders: {
      query: gql`
        query STAT_ORDERS {
          orders(
            filters: { Status: { eq: false }, StatusOplata: { eq: false } }
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
      pollInterval: 2000
    }
  },
  components: { AHeader },
  data () {
    return {
      vrachi: null,
      pacienti: null,
      reqs: null,
      page: 0
    }
  }
}
</script>
