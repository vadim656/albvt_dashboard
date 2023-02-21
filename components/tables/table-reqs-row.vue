<template>
  <tr class="  bg-white group  anime">
    <td
      @click="toReq(req.id)"
      class="anime-td cursor-pointer hover:text-blue-500  anime font-bold"
    >
      {{ req.attributes.UID }}
    </td>
    <td class="anime-td cursor-pointer hover:text-blue-500  anime">
      <span  @click="toUser(req.id)" v-if="req.attributes.users_permissions_user.data">{{
        req.attributes.users_permissions_user.data.attributes.FIO_user.replace(
          /(\S+) (\S)\S* (\S)\S*/,
          '$1 $2. $3.'
        )
      }}</span>
      <span v-else>Нет</span>
    </td>
    <td class="anime-td  anime">
      <span>{{ dateConf }}</span>
    </td>
    <td class="anime-td  anime">
      {{ req.attributes.Summ.toLocaleString('ru-RU') }}₽
    </td>
    <td class="anime-td  anime">
      <div
        v-if="req.attributes.Done == true"
        class="text-green-500 flex items-center gap-1"
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
        v-else-if="req.attributes.Done == false"
        class="text-red-500 flex items-center gap-1"
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
    </td>
  </tr>
</template>
<script>
import aModalOrder from '../a-modal-order.vue'
// import UPDATE_req from '~/gql/mutations/UPDATE_req.gql'

export default {
  components: { aModalOrder },
  props: {
    req: Object
  },
  data () {
    return {
      activeMenu: 1,
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
  computed: {
    dateConf () {
      var date = new Date(this.req.attributes.createdAt)
      return date.toLocaleString('ru', this.options)
    }
  },
  methods: {
    toReq (id) {
      this.$router.push(`/requests/` + id)
    },
    toUser(id) {
      this.$router.push(`/vrach/` + id)
    },
    openCTXMenu (id) {
      if (this.$refs.modalreq.active == true) {
        this.$refs.modalreq.active = false
        this.$refs.modalreq.id = null
      } else {
        this.$refs.modalreq.active = true
        this.$refs.modalreq.id = id
      }
    }
  }
}
</script>

<style></style>
