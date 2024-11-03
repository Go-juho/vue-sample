<script setup>

import {ref} from "vue";

const input = ref(``);

</script>

<template>
  <div>조직관리</div>


  <input type="text" value="" v-model="input">
</template>

<style scoped>

</style>