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
  <div>CD001의 모달</div>
  <button @click="resultFunction(1)">결과 1</button>
  <button @click="resultFunction(10)">결과 10</button>
  <button @click="resultFunction(100)">결과 100</button>
  <button @click="resultFunction(1000)">결과 1000</button>
  <button @click="resultFunction(10000)">결과 10000</button>
</template>

<style scoped>

</style>