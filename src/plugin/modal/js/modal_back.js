// import ModalPanel from "@/plugin/modal/components/ModalPanel.vue";
// import {createApp, h, inject, ref} from "vue";
//
// const myInjectionKey = Symbol(`modal`);
// // 플러그인을 전역 등록하기 위해 export default로 내보냄
// export default {
//   install(app) {
//     const isOpen = ref(false);
//     // app.component("ModalPanel", ModalPanel);
//     // 새로운 div 요소를 생성하여 모달을 렌더링할 준비
//     const modalContainer = document.createElement('div');
//     document.body.appendChild(modalContainer);
//
//     // ModalPanel 인스턴스를 생성하고 마운트
//     const modalApp = createApp({
//       render() {
//         return h(ModalPanel, {
//           isOpen: isOpen.value,
//           onCloseModal: () => {isOpen.value = false}
//         });
//       },
//     });
//
//     modalApp.mount(modalContainer);
//     // app.config.globalProperties.$modal = modalApp.mount(modalContainer);
//
//     app.provide(myInjectionKey, {
//       openModal: () => {
//         isOpen.value = true;
//       },
//       closeModal: () => {
//         // modalInstance.isOpen = false
//       },
//     });
//   },
// };
//
// export const useModal = () => {
//   return inject(myInjectionKey); // 주입된 모달 인스턴스를 반환
// };