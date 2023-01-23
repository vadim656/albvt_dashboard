<template>
  <button
    @click="$router.go(-1)"
    class="bg-blue-100 py-3 flex justify-center items-center gap-1 w-full max-w-[100px] rounded-md my-2"
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
        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
      /></svg
    ><span class="text-sm">
      Назад
    </span>
  </button>
</template>

<script>
export default {}
</script>

<style></style>
