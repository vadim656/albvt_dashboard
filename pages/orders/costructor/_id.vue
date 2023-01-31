<template>
  <div class="flex w-full flex-col gap-6 px-4">
    <div v-if="order" class="flex w-full flex-col gap-6">
      <b-back />
      <span class="text-xl font-bold"
        >Изменение заказа № {{ order.data.attributes.UID }}</span
      >
      <div class=" bg-white">
        <div class="relative">
          <input
            @input="search($event.target.value)"
            v-bind:value="searchInput"
            type="text"
            id="default-search"
            class="block w-full pr-20
        bg-white p-3 focus:outline-none  z-[4] relative border-b"
            placeholder="Поиск анализов"
            autocomplete="off"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-tem/70 absolute z-[4] top-[15px] right-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <div
          class="flex flex-col divide-y divide-neutral-400 bg-neutral-50"
          v-show="searchResults.length"
        >
          <div
            v-for="item in searchResults"
            :key="item.id"
            class="p-2 flex justify-between items-center w-full gap-4"
          >
            <div class="flex flex-col gap-1 text-sm">
              <span class="text-xs text-neutral-400"
                >Арт: {{ item.attributes.Art }}</span
              >
              <span class="font-semibold">{{ item.attributes.Name }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-sm"
                >{{ item.attributes.Price.toLocaleString('ru-RU') }}₽</span
              >
              <button
                @click="addToOrder(item)"
                class="text-sm text-green-500 hover:text-green-600 anime font-bold"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 bg-white p-2 rounded-md">
        <span class="w-full text-center">Cостав:</span>
        <div
          class="divide-y divide-neutral-400 flex flex-col"
          v-if="loading != true"
        >
          <div
            v-for="item in getIdAnalizesAll"
            :key="item.id"
            class=" p-2 flex justify-between items-center"
          >
            <div class="flex flex-col gap-1 text-sm">
              <span class="text-xs text-neutral-400"
                >Арт: {{ item.attributes.Art }}</span
              >
              <span class="font-semibold">{{ item.attributes.Name }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-sm"
                >{{ item.attributes.Price.toLocaleString('ru-RU') }}₽</span
              >
              <button
                @click="deleteToOrder(item)"
                class="text-sm text-red-500 hover:text-red-600 anime font-bold"
              >
                Удалить
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-2 pt-2" v-if="bioResult">
            <span class="w-full text-center">Биоматериалы:</span>
            <div class="flex flex-col gap-2 mt-2 divide-y divide-neutral-400">
              <div
                v-for="item in bioResult"
                :key="item.id"
                class="w-full flex justify-between items-center text-sm p-2"
              >
                <span class="font-semibold">{{ item.name }}</span>
                <span>{{ item.price }}₽</span>
              </div>
            </div>
          </div>
        </div>
        <span v-else>Загрузка...</span>
        <div class="w-full flex justify-end">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-right">Итого c учетом скидки:</span>
            <span class="font-bold text-right" v-if="getIdAnalizesAll.length"
              >{{ price.priceView.toLocaleString('ru-RU') }}₽</span
            >
          </div>
        </div>
        
      </div>
      <div class="flex gap-4">
        <button
          @click="reOrder"
          class="bg-blue-500 text-sm p-3 flex justify-center items-center rounded-md text-white hover:bg-blue-400 anime cursor-pointer max-w-[200px]"
        >
          Сохранить
        </button>
        <button
          v-if="order.data.attributes.StatusOplata == false"
          @click="updateOrderStatus"
          class="bg-green-500 text-sm p-3 flex justify-center items-center rounded-md text-white hover:bg-green-400 anime cursor-pointer max-w-[200px]"
        >
          Подтвердить
        </button>
      </div>
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import bBack from '~/components/b-back.vue'
import CONSTRUCTOR_ID from '~/gql/queries/CONSTRUCTOR_ID.gql'
import SEARCH_ANALIZES from '~/gql/queries/search-analizes.gql'
import UPDATE_ORDER_COMSTRUCTOR from '~/gql/mutations/UPDATE_ORDER_COMSTRUCTOR.gql'
import UPDATE_ORDER from '~/gql/mutations/UPDATE_ORDER.gql'
export default {
  components: { bBack },
  middleware: 'auth',
  layout: 'main',
  apollo: {
    order: {
      query: CONSTRUCTOR_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      },
      prefetch: true
    }
  },
  data () {
    return {
      searchInput: '',
      searchResults: [],
      dataOrdersIds: [],
      loading: true
    }
  },
  computed: {
    getIdAnalizesAll () {
      return this.dataOrdersIds
    },
    bio () {
      let allBio = []
      const bioData = this.dataOrdersIds.map(x => x.attributes.biomaterialies)

      bioData.forEach(element => {
        element.data.forEach(el2 => {
          allBio.push(el2)
        })
      })

      return allBio
    },
    bioResult () {
      const result = []
      this.bio.forEach(x => {
        const biomaterial = {
          id: x.id,
          name: x.attributes.Name,
          price: x.attributes.Price
        }
        result.push(biomaterial)
      })

      let biomaterialsFiltered = result.reduce(
        (acc, item) =>
          acc.map[item.id]
            ? acc
            : ((acc.map[item.id] = true),
              acc.biomaterialsFiltered.push(item),
              acc),
        {
          map: {},
          biomaterialsFiltered: []
        }
      ).biomaterialsFiltered

      return biomaterialsFiltered
    },
    price () {
      const analizes = this.getIdAnalizesAll.map(x => x.attributes.Price)
      const summAnalizes = analizes.reduce(function (pr, cur) {
        return pr + cur
      })

      const bio = this.bioResult.map(bio => bio.price)
      let summBio = bio.reduce(function (b1, b2) {
        return b1 + b2
      })

      let itogoDiscont = (summBio += summAnalizes)
      let priceView = itogoDiscont - (itogoDiscont / 100) * 10
      return { priceView, itogoDiscont }
    }
  },
  methods: {
    addToOrder (item) {
      this.searchResults = []
      this.searchInput = ''
      this.dataOrdersIds.push(item)
      this.$toast.success('Добавлен!', {
        position: 'top-right',
        timeout: 1000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true
      })
    },
    deleteToOrder (item) {
      const data = this.dataOrdersIds
      const dataFilter = data.filter(x => x.id !== item.id)
      this.dataOrdersIds = dataFilter
      this.$toast.success('Удален!', {
        position: 'top-right',
        timeout: 1000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true
      })
    },
    reOrder () {
      const analizes = this.getIdAnalizesAll.map(x => x.id)
      this.$apollo
        .mutate({
          mutation: UPDATE_ORDER_COMSTRUCTOR,
          variables: {
            ID: this.$route.params.id,
            ANALIZ: analizes,
            SUMM: this.price.priceView
          }
        })
        .then(data => {
          this.$apollo.queries.order.refetch()
          this.$toast.success('Обновление заказа: Успешно!', {
            position: 'top-right',
            timeout: 1500,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
        .catch(error => {
          this.$toast.error('Обновление заказа: Что то пошло не так!', {
            position: 'top-right',
            timeout: 1000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
    },
    updateOrderStatus () {
      this.$apollo
        .mutate({
          mutation: UPDATE_ORDER,
          variables: {
            ID: this.$route.params.id
          }
        })
        .then(data => {
          this.$apollo.queries.order.refetch()
          this.$toast.success('Подтвержение заказа: Успешно!', {
            position: 'top-right',
            timeout: 1000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
        .catch(error => {
          this.$toast.error('Подтвержение заказа: Что то пошло не так!', {
            position: 'top-right',
            timeout: 1000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
    },
    async search (value) {
      this.searchInput = value
      const string = value.toString()
      const lowerCase = string.toLowerCase()
      try {
        const res = await this.$apollo.query({
          query: SEARCH_ANALIZES,
          fetchPolicy: 'network-only',
          variables: {
            S_VALUE: lowerCase
          }
        })
        if (res) {
          this.loading = false
          this.loadSearch = false
          const results = res.data.search.analizies.data

          this.searchResults = results
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      let data = []
      this.order.data.attributes.analizies.data.forEach(element => {
        data.push(element)
      })
      this.dataOrdersIds = data
      this.loading = false
    }, 1500)
  }
}
</script>

<style></style>
