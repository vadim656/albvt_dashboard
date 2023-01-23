<template>
  <div>
    <b-back/>
    <div v-if="order" class="flex flex-col gap-4">
      <div class="flex justify-between items-center w-full">
        <div class="flex flex-col gap-1">
          <span>№ {{ order.data.attributes.UID }}</span>
          <span class="text-sm text-[#343434]/50">{{
            new Date(order.data.attributes.createdAt).toLocaleString(
              'ru',
              options
            )
          }}</span>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span class="text-main font-medium"
            >{{ order.data.attributes.SummOrder.toLocaleString('ru-RU') }}₽</span
          >
        </div>
      </div>
      <span class="w-full text-center">Состав заказа:</span>
      <table class="w-full divide-y divide-[#343434]/30">
        <thead class="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium   tracking-wider"
            >
              Наименование
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-right text-sm align-top font-medium   tracking-wider"
            >
              Цена
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#343434]/30">
          <tr
            class="   group  anime cursor-pointer bg-white"
            v-for="item in order.data.attributes.analizies.data"
            :key="item.id"
          >
            <td class="px-4 py-2  text-sm  flex flex-col gap-1">
              <span class="text-neutral-600">Арт: {{ item.attributes.Art }}</span>
              <span>{{ item.attributes.Name }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-right ">
              {{ item.attributes.Price.toLocaleString('ru-RU') }}₽
            </td>
          </tr>
          <!-- bio -->
          <tr
            class="   group  anime cursor-pointer bg-neutral-100"
            v-for="bioItem in bio.result"
            :key="bioItem.id"
          >
            <td class="px-4 py-2  text-sm  flex flex-col gap-1">
              <span class="/70">Биоматериал:</span>
              <span>{{ bioItem.Name }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-right ">
              {{ bioItem.Price.toLocaleString('ru-RU') }}₽
            </td>
          </tr>
          <!-- itogo -->
          <tr class="   group  anime cursor-pointer bg-neutral-200">
            <td class="px-4 pt-2 pb-2  text-sm  flex flex-col gap-1">
              <span>Итого:</span>
            </td>
            <td
              class="px-4 pt-2 pb-2  whitespace-nowrap text-sm text-right "
            >
              {{ price.itogoDiscont.toLocaleString('ru-RU') }}₽
            </td>
          </tr>
          <!-- itogo -->
          <tr class="   group  anime cursor-pointer bg-neutral-200">
            <td class="px-4 py-2  text-sm  flex flex-col gap-1">
              <span>Итого с учетом скидки 10%:</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-right ">
              {{ order.data.attributes.SummOrder.toLocaleString('ru-RU') }}₽
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-else>Загружвется...</span>
  </div>
</template>

<script>
import ORDER_ID from '~/gql/queries/ORDER_ID.gql'
import bBack from '../../components/b-back.vue'
export default {
  components: { bBack },
  middleware: 'auth',
  layout: 'main',
  apollo: {
    order: {
      query: ORDER_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  },
  computed: {
    bio () {
      const allBio = []
      const bioData = this.order.data.attributes.analizies.data.map(
        x => x.attributes.biomaterialies
      )

      bioData.forEach(element => {
        element.data.forEach(el2 => {
          allBio.push(el2.attributes)
        })
      })

      let result = []

      for (let str of allBio) {
        if (!result.includes(str)) {
          result.push(str)
        }
      }

      return { allBio, result }
    },
    price () {
      const analizes = this.order.data.attributes.analizies.data.map(
        x => x.attributes.Price
      )
      let itogo = Number(this.order.data.attributes.SummOrder)
      const summAnalizes = analizes.reduce(function (pr, cur) {
        return pr + cur
      })

      const bio = this.bio.result.map(bio => bio.Price)
      let summBio = bio.reduce(function (b1, b2) {
        return b1 + b2
      })

      let itogoDiscont = (summBio += summAnalizes)
      // const skidka = 100
      return { itogo, itogoDiscont, summAnalizes, summBio }
    }
  }
}
</script>

<style></style>
