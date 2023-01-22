<template>
  <tr class="  bg-white group  anime cursor-pointer" v-if="orders">
    <td
      class="px-4 py-2 whitespace-nowrap text-sm font-bold group-hover:bg-blue-500 text-gray-900 group-hover:text-white anime "
    >
      {{ item.id }}
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <nuxt-link prefetch :to="'/vrach/' + item.id">
        {{
          item.attributes.FIO_user.replace(
            /(\S+) (\S)\S* (\S)\S*/,
            '$1 $2. $3.'
          )
        }}
      </nuxt-link>
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <span>{{summOrders.nowDate.length}} / {{ summOrders.data.length }}</span>
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <span
        >{{ summOrders.summZaprosAll }}<br /><span class="text-xs font-normal">
          {{ item.attributes.Stavka }}%
        </span></span
      >
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <span>
        {{ allZapros.toLocaleString('ru-RU') }}
      </span>
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      {{ allZaprosDone }}
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      {{ allZaprosFalse }}
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <span v-if="item.attributes.Pacientis.data.length">
        {{ item.attributes.Pacientis.data.length }}
      </span>
      <span v-else>0</span>
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-sm text-gray-600 group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <span v-if="item.attributes.speczialnosts.data.length">{{
        item.attributes.speczialnosts.data[0].attributes.Name
      }}</span>
      <span v-else>Нет специальности</span>
    </td>
    <td
      class="px-4 py-2 whitespace-nowrap text-right group-hover:text-white anime  group-hover:bg-blue-500"
    >
      <nuxt-link
        prefetch
        :to="'/vrach/' + item.id"
        class="flex justify-center items-center"
      >
        <svg
          v-if="zaprosCheck == 0 && allZaprosLength !== 0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
          />
        </svg>
        <div v-else-if="zaprosCheck > 0" class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <span
            class="absolute -top-1.5 -right-1.5 text-xs w-4 h-4 flex justify-center items-center bg-white rounded-full text-gray-900"
            >{{ zaprosCheck }}</span
          >
        </div>
        <svg
          v-if="allZaprosLength == 0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
import ALL_VRACHI_PROMO from '~/gql/queries/ALL_VRACHI_PROMO.gql'
export default {
  props: {
    item: Object
  },
  apollo: {
    orders: {
      query: ALL_VRACHI_PROMO,
      variables () {
        return {
          ID: this.item.attributes.Promo
        }
      }
    }
  },
  computed: {
    allZapros () {
      const data = this.item.attributes.zaprosy_vrachejs.data
      const summZap = data.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.Summ,
        0
      )
      return summZap.toFixed(0)
    },
    allZaprosFalse () {
      const data = this.item.attributes.zaprosy_vrachejs.data
      const dataHFitreder = data.filter(x => x.attributes.Done == false)
      const summZap = dataHFitreder.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.Summ,
        0
      )
      return summZap.toFixed(0)
    },
    allZaprosDone () {
      const data = this.item.attributes.zaprosy_vrachejs.data
      const dataHFitreder = data.filter(x => x.attributes.Done == true)
      const summZap = dataHFitreder.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.attributes.Summ,
        0
      )
      return summZap.toFixed(0)
    },
    summOrders () {
      let nowDate = []

      const data = this.orders.data.map(x => x.attributes.SummOrder)
      const summZaprosAll = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
      const allDay = this.orders.data.map(x => new Date(x.attributes.createdAt))

      allDay.forEach(day => {
        let today = new Date()
        let todayDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ).valueOf()

        const x = new Date(day.getFullYear(), day.getMonth(), day.getDate()).valueOf()
        if (todayDay == x) {
          nowDate.push(x)
        } else {
          console.log('net')
        }
      })

      return { data, summZaprosAll, allDay, nowDate }
    },
    zaprosCheck () {
      const data = this.item.attributes.zaprosy_vrachejs.data
      const dataHFitreder = data.filter(x => x.attributes.Done == false)

      return dataHFitreder.length
    },
    allZaprosLength () {
      const data = this.item.attributes.zaprosy_vrachejs.data

      return data.length
    }
  }
}
</script>

<style></style>
