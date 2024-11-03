<script setup>
import { useModal } from "@/plugin/modal/js/modal";
import CD002Model from "@/views/CD002Model.vue";
import {onUpdated, ref} from "vue";

const modal = useModal();

const input = ref(``);

const result = ref()
onUpdated(() => {
  result.value = modal.result.result;
})
</script>

<template>
  <div>거래처등록</div>

  <input type="text" value="" v-model="input">

  <button @click="modal.openModal(CD002Model)">모달 열기</button>
  결과 : {{ modal.result.result }}
  결과 : {{ result }}
</template>

<style scoped>

</style>