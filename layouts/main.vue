<template>
  <div class="bg-[#fcfcfc]">
    <div class="min-h-screen flex w-full flex-row bg-gray-100">
      <div
        class="flex flex-col w-full min-w-[120px] max-w-[120px] bg-white rounded-r-3xl overflow-hidden"
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
              <span
                class="text-xs  absolute top-0 right-1 "

                >{{ totalVrach }}</span
              >
            </div>
          </nuxt-link>

          <nuxt-link
            to="/pacienti"
            prefetch
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 relative"
          >
            <span>Пациенты</span>
            <span
              class="text-xs  absolute top-0 right-1 "
              v-if="pacienti !== null"
              >{{ pacienti }}</span
            >
          </nuxt-link>

          <nuxt-link
            to="/pacienti"
            prefetch
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 "
          >
            <span class="text-sm font-medium">Заявки</span>
          </nuxt-link>

          <span class="w-full h-[1px] bg-gray-600/20 my-4"></span>

          <a
            href="#"
            class="flex flex-row items-center h-10 px-3  hover:text-white hover:bg-blue-500 anime text-gray-500 "
          >
            <div
              class="relative block cursor-pointer bg-white rounded-full hover:drop-shadow-xl anime"
            >
              <img src="~assets/icons/notifycation-not.svg" alt="" />
              <span
                class="w-4 h-4 text-xs bg-white rounded-full absolute -top-2 right-0 text-[#343434] flex items-center justify-center z-[1]"
                >0</span
              >
            </div>
          </a>

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
                  class="w-4 h-4 text-xs bg-white rounded-full absolute -top-2 right-0 text-[#343434] flex items-center justify-center z-[1]"
                  >0</span
                >
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/zayavki"
              href="#"
              class="flex flex-row items-center h-10 justify-center transform hover:translate-x-1 anime text-gray-500 hover:text-blue-600"
            >
              <div
                class="relative block cursor-pointer bg-white rounded-full hover:drop-shadow-xl anime"
              >
                <span
                  class="w-4 h-4 text-xs bg-white rounded-full absolute -top-2 right-0 text-[#343434] flex items-center justify-center z-[1]"
                  >0</span
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

import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

const qs = require('qs')

const ALL_VRACHI = gql`
  query ALL_VRACHI {
    usersPermissionsUsers(filters: { RoleUser: { eq: "Vrach" } }) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`

const ALL_PACIENI = gql`
  query ALL_PACIENI {
    usersPermissionsUsers(filters: { RoleUser: { eq: "Pacient" } }) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`

export default {
  components: { AHeader },
  data () {
    return {
      vrachi: null,
      pacienti: null,
      page: 0
    }
  },
  methods: {
    ...mapActions(['start']),

    vrachiGet () {
      this.$apollo
        .query({
          query: ALL_VRACHI
        })
        .then(({ data }) => {
          this.vrachi = data.usersPermissionsUsers.meta.pagination.total
        })
    },
    pacientiGet () {
      console.log(this.pacienti)

      this.$apollo
        .query({
          query: ALL_PACIENI
        })
        .then(({ data }) => {
          this.pacienti = data.usersPermissionsUsers.meta.pagination.total
        })
    }
  },
  created () {
    // this.startAnalitics()
  },
  mounted () {
    this.start()
  },
  computed: {
    ...mapGetters(['getCounter']),
    totalVrach(){
      return this.getCounter
    }
  }
}
</script>
