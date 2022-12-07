<template>
  <div class="text-gray-800">
    <section
      v-if="usersPermissionsUsers.data"
      class="grid grid-cols-2 border-b border-gray-300 pb-2"
    >
      <div class="flex flex-col justify-between gap-4">
        <div class="text-2xl font-semibold">
          {{ usersPermissionsUsers.data[0].attributes.FIO_user }}
        </div>

        <div class="flex gap-3 text-sm ">
          <button
            class="flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 1 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 1"
          >
            Пациенты
          </button>
          <button
            class="flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 2 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 2"
          >
            Доступно
          </button>
          <button
            class="flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 3 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 3"
          >
            Выведено
          </button>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-sm">Телефон:</span>
          <span class="font-semibold">{{
            usersPermissionsUsers.data[0].attributes.Phone
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Дата рождения:</span>
          <span class="font-semibold">{{
            usersPermissionsUsers.data[0].attributes.DataRozgdeniya
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">E-mail:</span>
          <span class="font-semibold">{{
            usersPermissionsUsers.data[0].attributes.email
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Ставка:</span>
          <span class="font-semibold"
            >{{ usersPermissionsUsers.data[0].attributes.Stavka }}%</span
          >
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Промокод:</span>
          <span class="font-semibold">{{
            usersPermissionsUsers.data[0].attributes.Promo
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Специальность:</span>
          <span class="font-semibold">{{
            usersPermissionsUsers.data[0].attributes.speczialnosts.data[0]
              .attributes.Name
          }}</span>
        </div>
      </div>
    </section>
    <section class="pt-2">
      <div v-if="activeTab == 1">
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="pacient in usersPermissionsUsers.data[0].attributes.Pacientis
              .data"
            :key="pacient.id"
            class="flex bg-gray-300 rounded-md  items-center justify-between w-full p-2"
          >
            <span class="w-1/5 text-sm">id: {{ pacient.id }}</span>
            <span class="w-3/5">{{
              pacient.attributes.FIO_user.replace(
                /(\S+) (\S)\S* (\S)\S*/,
                '$1 $2. $3.'
              )
            }}</span>
            <span class="w-1/5 text-sm">{{ pacient.attributes.zakazies.data.length }} заказов</span> 
          </div>
        </div>
      </div>
      <div v-if="activeTab == 2">2</div>
      <div v-if="activeTab == 3">3</div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const VRACH = gql`
  query VRACH($ID: ID) {
    usersPermissionsUsers(filters: { id: { eq: $ID } }) {
      data {
        id
        attributes {
          Stavka
          FIO_user
          Phone
          DataRozgdeniya
          Promo
          email
          zaprosy_vrachejs {
            data {
              attributes {
                Summ
                oplataCheck {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          Pacientis {
            data {
              id
              attributes {
                FIO_user
                zakazies {
                  data {
                    id
                  }
                }
              }
            }
          }
          speczialnosts {
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
`

export default {
  middleware: 'auth',
  layout: 'main',
  data () {
    return {
      activeTab: 1
    }
  },
  apollo: {
    usersPermissionsUsers: {
      query: VRACH,
      variables () {
        return {
          ID: this.$route.params.id
        }
      },
      prefetch: true
    }
  }
}
</script>

<style></style>
