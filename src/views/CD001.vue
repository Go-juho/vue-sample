<script setup>
import { useModal } from "@/plugin/modal/js/modal";
import CD001Model from "@/views/CD001Model.vue";
import {onUpdated, ref} from "vue";

const modal = useModal();
const result = ref()

const input = ref(``);

onUpdated(() => {
  result.value = modal.result.result;
})
</script>

<template>
  <div>거래처현황</div>

  <input type="text" value="" v-model="input">

  <button @click="modal.openModal(CD001Model)">모달 열기</button>
  결과 : {{ modal.result.result }}
  결과 : {{ result }}
</template>

<style scoped>

</style>