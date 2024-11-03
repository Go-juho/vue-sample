<script setup>
import { useModal } from "@/plugin/modal/js/modal";
import CD001Model from "@/views/CD001Model.vue";

const modal = useModal();

</script>

<template>
  <div>CD001 컴포넌트</div>

  <button @click="modal.openModal(CD001Model)">모달 열기</button>
  결과 : {{ modal.result.result }}
</template>

<style scoped>

</style>