<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <div class="">
      <form method="POST" @submit.prevent="handleLoginSubmit" class="flex flex-col gap-4">
        <div class="flex justify-between gap-4 items-center">
          <label for="identifier">Логин</label>
          <input
            id="identifier"
            v-model="form.identifier"
            type="email"
            class="form-control border p-4"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="flex justify-between gap-4 items-center">
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control border p-4"
          />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white rounded-md py-3" :disabled="formBusy">
          <span v-if="formBusy" small class="mr-2" /> Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  auth: 'guest',

  data () {
    return {
      form: {
        identifier: 'avlbvt-admin@albvt.ru',
        password: 'Dropestroke0013!'
      },
      formBusy: false
    }
  },

  methods: {
    async handleLoginSubmit () {
      const credentials = this.form
      this.formBusy = true

      try {
        // Using our custom strategy
        await this.$auth.loginWith('graphql', credentials)

        this.formBusy = false
      } catch (errors) {
        this.formBusy = false
        // Handle errors
      }
    }
  }
}
</script>
