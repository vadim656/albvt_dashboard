<template>
  <div class="flex justify-between items-center">
    <span>Привет, {{ $auth.user.FIO_user }}</span>
    
    <button class="underline underline-offset-2" @click="handleLogout()">Выйти</button>
  </div>
</template>

<script>



export default {
  components: {},
  middleware: 'auth',
  methods: {
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    }
  }
}
</script>

<style></style>
