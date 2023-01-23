<template>
  <div class="flex justify-between items-center">
    <span>Привет, {{ $auth.user.FIO_user }}</span>
    
    
  </div>
</template>

<script>



export default {
  components: {},
  middleware: 'auth',
  
}
</script>

<style></style>
