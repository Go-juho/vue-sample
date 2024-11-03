<script setup>
import { useModal } from "@/plugin/modal/js/modal";
import CD002Model from "@/views/CD002Model.vue";

const modal = useModal();
</script>

<template>
  <div>CD002 컴포넌트</div>

  <button @click="modal.openModal(CD002Model)">모달 열기</button>
  결과 : {{ modal.result.result }}
</template>

<style scoped>

</style>