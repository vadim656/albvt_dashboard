<template>
  <tr class="  bg-white group  anime ">
    <td @click="pushRoute" class="anime-td anime font-bold ">
      <span class="hover:text-blue-500 cursor-pointer">{{
        item.attributes.UID
      }}</span>
    </td>
    <td class="anime-td anime">
      {{ dateRu }}
    </td>
    <td class="anime-td anime">
      {{ item.attributes.Summ }}
    </td>
    <td class="anime-td anime">
      <span v-if="item.attributes.Done == true" class="text-green-500"
        >Переведено</span
      >
      <span v-else class="text-red-500">Ожидает перевода</span>
    </td>
    <td class="anime-td anime cursor-pointer">
      <button
        @click="openModal"
        v-if="item.attributes.Done == false"
        class="font-medium text-gray-900 tracking-wider hover:text-blue-500 anime rounded-md"
      >
        Перевести
      </button>
      <a
        :href="
          `https://api.albvt.ru` +
            item.attributes.oplataCheck.data[0].attributes.url
        "
        target="_blank"
        v-if="item.attributes.Done == true"
        class="font-medium text-gray-900 tracking-wider hover:text-blue-500 anime rounded-md"
      >
        Чек
      </a>
      <a-modal ref="modal" class="text-gray-900">
        <form @submit.prevent="handleFileUpload()" class="flex flex-col gap-4">
          Оплата по запросу
          <label class="flex flex-col gap-3 text-xs text-gray-600"
            >Выбрать файл
            <input type="file" id="file" ref="file" />
          </label>
          <div>
            <input
              name="oplata"
              type="checkbox"
              v-model="oplataCheck"
              class="p-2 cursor-pointer"
            />
            <label for="oplata">Оплатить?</label>
          </div>

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
    </td>
  </tr>
</template>

<script>
import aModal from '../a-modal.vue'
import EDIT_STATUS_ZAPROS from '../../gql/mutations/EDIT_STATUS_ZAPROS.gql'
export default {
  components: { aModal },
  props: {
    item: Object
  },
  data () {
    return {
      file: '',
      oplataCheck: false,
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    }
  },
  methods: {
    pushRoute () {
      this.$router.push('/requests/' + this.item.id).catch(() => {})
    },
    openModal () {
      this.$refs.modal.active = !this.$refs.modal.active
    },
    updateZaprosStatus () {
      this.$apollo
        .mutate({
          mutation: EDIT_STATUS_ZAPROS,
          variables: {
            ID: this.item.id
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
          this.$emit('reFetch')
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
    reUseStavka () {},
    async handleFileUpload () {
      let formData = new FormData()
      formData.append('files', this.$refs.file.files[0])
      formData.append('ref', 'api::zaprosy-vrachej.zaprosy-vrachej')
      formData.append('refId', this.item.id)
      formData.append('field', 'oplataCheck')
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
  computed: {
    dateRu () {
      var date = new Date(this.item.attributes.createdAt)
      return date.toLocaleString('en-GB')
    }
  }
}
</script>

<style></style>
