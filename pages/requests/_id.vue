<template>
  <div>
    <div v-if="zaprosyVrachej" class="flex flex-col gap-10">
      <b-back/>
      <span class="text-xl font-bold"
        >Запрос № {{ zaprosyVrachej.data.attributes.UID }}</span
      >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-neutral-500 text-sm">Врач</span>
          <span class="font-bold">{{
            zaprosyVrachej.data.attributes.users_permissions_user.data
              .attributes.FIO_user
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-neutral-500 text-sm">Сумма</span>
          <span class="font-bold"
            >{{
              zaprosyVrachej.data.attributes.Summ.toLocaleString('ru-RU')
            }}₽</span
          >
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-neutral-500 text-sm">Статус</span>
          <div>
            <div
              v-if="zaprosyVrachej.data.attributes.Done == true"
              class="text-green-500 flex items-center gap-1 font-bold"
            >
              <svg
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Оплачен
            </div>
            <div
              v-else-if="zaprosyVrachej.data.attributes.Done == false"
              class="text-red-500 flex items-center gap-1 font-bold"
            >
              <svg
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              Ожидает оплаты
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-neutral-500 text-sm">Дата</span>
          <span class="font-bold">{{
            new Date(zaprosyVrachej.data.attributes.createdAt).toLocaleString(
              'en-GB'
            )
          }}</span>
        </div>
        <div
          class="flex flex-col gap-1"
          v-if="zaprosyVrachej.data.attributes.Done == false"
        >
          <span class="text-neutral-500 text-sm">Действия</span>
          <button
            @click="openModal"
            class="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 anime cursor-pointer max-w-[200px]"
          >
            Оплатить
          </button>
        </div>
        <div
          class="flex flex-col gap-1"
          v-if="zaprosyVrachej.data.attributes.Done == true"
        >
          <span class="text-neutral-500 text-sm">Чек</span>
          <a
            :href="
              `https://api.albvt.ru` +
                zaprosyVrachej.data.attributes.oplataCheck.data[0].attributes
                  .url
            "
            target="_blank"
            class="bg-blue-500 p-3 flex justify-center items-center rounded-md text-white hover:bg-blue-400 anime cursor-pointer max-w-[200px]"
            >Скачать</a
          >
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 border-b border-gray-400">
            <tr>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
              >
                № заказа
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Сумма
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Состав
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in allAnalizes"
              :key="item.id"
              class=" border-b border-gray-400"
            >
              <td
                class="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
              >
                <nuxt-link :to="/orders/ + item.id">
                  {{ item.attributes.UID }}
                </nuxt-link>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ item.attributes.SummOrder.toLocaleString('ru-RU') }}₽
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm  text-gray-900">
                <nuxt-link :to="/orders/ + item.id">
                  Подробнее
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <a-modal ref="modal" class="text-gray-900">
      <form @submit.prevent="handleFileUpload()" class="flex flex-col gap-4">
        Оплата по запросу
        <label class="flex flex-col gap-3 text-xs text-gray-600"
          >Выбрать файл
          <input type="file" id="file" ref="file" />
        </label>

        <div class="flex items-center gap-4">
          <button
            type="submit"
            class="flex items-center justify-center px-3 py-2 rounded-md text-white bg-green-500"
          >
            Загрузить
          </button>
          <button
            @click="openModal"
            class="flex items-center justify-center px-3 py-2 rounded-md text-white bg-red-500"
          >
            Отменить
          </button>
        </div>
      </form>
    </a-modal>
  </div>
</template>

<script>
import ZAPROS_ID from '~/gql/queries/ZAPROS_ID.gql'
import aModal from '~/components/a-modal.vue'
import EDIT_STATUS_ZAPROS from '~/gql/mutations/EDIT_STATUS_ZAPROS.gql'
import BBack from '../../components/b-back.vue'
export default {
  layout: 'main',
  components: { aModal, BBack },
  data () {
    return {
      file: '',
      done: false
    }
  },

  methods: {
    reFetch () {
      this.$apollo.queries.zaprosyVrachej.refetch()
    },
    openModal () {
      this.$refs.modal.active = !this.$refs.modal.active
    },
    updateZaprosStatus () {
      this.$apollo
        .mutate({
          mutation: EDIT_STATUS_ZAPROS,
          variables: {
            ID: this.zaprosyVrachej.data.id
          }
        })
        .then(data => {
          this.$toast.success('Обновление статуса: Успешно!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
          this.reFetch()
        })
        .catch(error => {
          this.$toast.error('Обновление статуса: Что то пошло не так!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
    },
    async handleFileUpload () {
      let formData = new FormData()
      formData.append('files', this.$refs.file.files[0])
      formData.append('ref', 'api::zaprosy-vrachej.zaprosy-vrachej')
      formData.append('refId', this.zaprosyVrachej.data.id)
      console.log(formData)
      await fetch('https://api.albvt.ru/api/upload/', {
        method: 'post',
        headers: {
          Authorization:
            'Bearer 6188cc2c08e30cae6adbd1deb82735be5ef4c67630ca13e2b8dd4ade8d4613c8a300f2a984f2b5a0f88ccc40323c637087ce0e1cb6b48357fdec736c60e90074900b61149d54babfbb7f43aa444d4d34362a5bd838053e1136d89b8387d8c5bfcaf42ce0d5958ef5e6e7cf685a8479e92dd68c48cb97481df94e5dc802f70eed'
        },
        body: formData
      }).then(response => {
        if (response.ok == true) {
          this.openModal()
          this.$toast.success('Загрузка чека: Успешно!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
          this.updateZaprosStatus()
        } else {
          this.$toast.error('Загрузка чека: Что то пошло не так!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        }
      })
    }
  },
  apollo: {
    zaprosyVrachej: {
      query: ZAPROS_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  },
  computed: {
    allAnalizes () {
      const data = this.zaprosyVrachej.data.attributes.zakazies.data
      return data
    }
  }
}
</script>

<style></style>
