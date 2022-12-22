<template>
  <div class="text-gray-800" v-if="usersPermissionsUser">
    <span v-if="!usersPermissionsUser">Загрузка...</span>
    <section class="grid grid-cols-2 border-b border-gray-300 pb-2">
      <div class="flex flex-col justify-between gap-4">
        <div class="text-2xl font-semibold">
          {{ usersPermissionsUser.data.attributes.FIO_user }}
        </div>

        <div class="flex gap-3 font-medium text-gray-900 tracking-wider">
          
          <button
            class="flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 2 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 2"
          >
            Запросы ({{
              usersPermissionsUser.data.attributes.zaprosy_vrachejs.data.length
            }})
          </button>
          <button
            class="flex justify-center items-center px-4 py-2 rounded-md border-2 border-blue-200"
            :class="[activeTab == 1 ? 'bg-blue-200' : 'bg-transparent']"
            @click="activeTab = 1"
          >
            Пациенты ({{
              usersPermissionsUser.data.attributes.Pacientis.data.length
            }})
          </button>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-sm">Телефон:</span>
          <span class="font-semibold">{{
            usersPermissionsUser.data.attributes.Phone
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Дата рождения:</span>
          <span class="font-semibold">{{
            usersPermissionsUser.data.attributes.DataRozgdeniya
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">E-mail:</span>
          <span class="font-semibold">{{
            usersPermissionsUser.data.attributes.email
          }}</span>
        </div>
        <div
          @click="closeModal"
          class="flex flex-col gap-1 relative cursor-pointer"
        >
          <span class="text-sm">Ставка:</span>
          <span class="font-semibold flex gap-1 items-center"
            >{{ usersPermissionsUser.data.attributes.Stavka }}%
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 hover:text-blue-500 anime"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              /></svg
          ></span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Промокод:</span>
          <span class="font-semibold">{{
            usersPermissionsUser.data.attributes.Promo
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm">Специальность:</span>
          <span class="font-semibold">{{
            usersPermissionsUser.data.attributes.speczialnosts.data[0]
              .attributes.Name
          }}</span>
        </div>
      </div>
    </section>
    <section class="pt-2">
      <div v-if="activeTab == 1">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 border-b border-gray-400">
            <tr>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                ФИО
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Сумма всех заказов
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Оплачено
              </th>

              <th
                scope="col"
                class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
              >
                Действия
              </th>
            </tr>
          </thead>
          <tbody class=" divide-y divide-gray-400">
            <doctor-pacients
              v-for="(item, i) in usersPermissionsUser.data.attributes.Pacientis
                .data"
              :item="item"
              :key="item.id"
              :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
            />
          </tbody>
        </table>
        <!-- <div class="grid grid-cols-3 gap-2">
          <div
            v-for="pacient in usersPermissionsUser.data.attributes.Pacientis
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
            <span class="w-1/5 text-sm"
              >{{ pacient.attributes.zakazies.data.length }} заказов</span
            >
          </div>
        </div> -->
      </div>
      <div v-if="activeTab == 2">
        <div v-if="usersPermissionsUser" class="">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 border-b border-gray-400">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
                >
                  UID
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
                >
                  Дата
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
                  Статус
                </th>

                <th
                  scope="col"
                  class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class=" divide-y divide-gray-400">
              <doctor-zapros
                v-for="(item, i) in usersPermissionsUser.data.attributes
                  .zaprosy_vrachejs.data"
                :item="item"
                :key="item.id"
                :class="[i % 2 ? 'bg-white' : 'bg-gray-100']"
                @reFetch="reFetch"
              />
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <a-modal ref="modal">
      <div class="flex flex-col gap-4">
        Изменить ставку врача
        <input
          type="number"
          min="0"
          max="100"
          v-model="stavka"
          :placeholder="usersPermissionsUser.data.attributes.Stavka"
          class="border rounded-md border-gray-400 p-1"
        />
        <span class="text-xs text-gray-600">Число от 0 до 100</span>
        <div class="flex items-center gap-4">
          <button
            @click="reUseStavka"
            class="flex items-center justify-center px-3 py-2 rounded-md text-white bg-green-500"
          >
            Сохранить
          </button>
          <button
            @click="closeModal"
            class="flex items-center justify-center px-3 py-2 rounded-md text-white bg-red-500"
          >
            Отменить
          </button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import AModal from '../../components/a-modal.vue'
import DoctorPacients from '../../components/doctor/doctorPacients.vue'
import doctorZapros from '../../components/doctor/doctorZapros.vue'
import VRACH_ID from '../../gql/queries/VRACH_ID.gql'
import EDIT_STAVKA from '../../gql/mutations/EDIT_STAVKA.gql'

export default {
  components: { doctorZapros, DoctorPacients, AModal },
  middleware: 'auth',
  layout: 'main',
  apollo: {
    usersPermissionsUser: {
      query: VRACH_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  },
  data () {
    return {
      activeTab: 2,
      stavka: null
    }
  },
  methods: {
    reFetch () {
      this.$apollo.queries.usersPermissionsUser.refetch()
    },
    reFetchTotal () {
      setInterval(() => {
        this.reFetch()
      }, 5000)
    },
    closeModal () {
      this.$refs.modal.active = !this.$refs.modal.active
    },
    reUseStavka () {
      const val = Number(this.stavka)
      this.$apollo
        .mutate({
          mutation: EDIT_STAVKA,
          variables: {
            STAVKA: val,
            ID: this.usersPermissionsUser.data.id
          }
        })
        .then(data => {
          this.closeModal()
          this.$apollo.queries.usersPermissionsUser.refetch()
          this.$toast.success('Обновление ставки: Успешно!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
        .catch(error => {
          this.$toast.error('Обновление ставки: Что то пошло не так!', {
            position: 'top-right',
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true
          })
        })
    }
  },
  mounted () {
    this.reFetchTotal()
  }
}
</script>

<style></style>
