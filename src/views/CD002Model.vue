<script setup>
import {defineEmits, ref} from "vue";

const emit = defineEmits([`result`])

const resultData = ref();
const resultFunction = (data) => {
  resultData.value = data;
  emit(`result`, resultData.value);
}
</script>

<template>
  <div>CD002의 모달</div>
  <button @click="resultFunction(`너무`)">너무</button>
  <button @click="resultFunction(`힘들`)">힘들</button>
  <button @click="resultFunction(`었따`)">었따</button>
  <button @click="resultFunction(`정보가`)">정보가</button>
  <button @click="resultFunction(`부족해`)">부족해</button>
</template>

<style scoped>

</style>