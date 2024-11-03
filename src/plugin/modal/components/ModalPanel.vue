<script setup>
import {defineProps, ref} from "vue";

const props = defineProps({
  modalComponent: Object, // 모달 내용으로 사용할 컴포넌트
  modalState: Boolean,  // 모달의 열림/닫힘 상태
  closeModal: Function, // 모달 닫기 함수
});

const result = ref()
const resultFunction = (data) => {
  result.value = data;
}
</script>

<template>
  <br/>
  <div v-if="props.modalState" class="modal-overlay" @click.self="props.closeModal()">
    <div class="modal-panel">
      <component :is="props.modalComponent" @result="resultFunction"></component>
    </div>
    <button @click.self="props.closeModal(result)">확인</button>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed; /* 화면 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 다른 요소보다 위에 표시 */
}

.modal-panel {
  background: white; /* 패널의 배경색 */
  padding: 20px; /* 콘텐츠 여백 */
  border-radius: 5px; /* 모서리 둥글게 */
  max-width: 600px; /* 최대 너비 설정 */
  width: 100%;
}
</style>