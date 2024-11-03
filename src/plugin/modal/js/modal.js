// 플러그인을 전역 등록하기 위해 export default로 내보냄
import {createApp, h, inject, ref} from "vue";
import ModalPanel from "@/plugin/modal/components/ModalPanel.vue";

const modalInjectionKey = Symbol(`modalKey`);

export default {
  install: (app) => {

    const modalModel = ref({
      state: false, // 모달의 닫힘/열림 제어
      component: null, // 컴포넌트를 전달받을 변수
      result: null // 사용자가 모달에서 전달해야할 데이터
    })

    // 모달이 들어갈 div를 생성
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal-test');
    // body태그 안에 붙임
    document.body.appendChild(modalElement);

    // 만들어둔 ModalPanel컴포넌트를 독립적인 vue app인스턴스로 생성
    const modalApp = createApp({
      render() {
        return h(ModalPanel, {
          // modalPanel에게 프롭스로 전달할 오브젝트들
          modalComponent: modalModel.value.component, // ModalPanel에게 컴포넌트 전달
          modalState: modalModel.value.state, // ModalPanel에게 모달 상태 전달

          closeModal: (data) => { // ModalPanel이 창을 닫을때 돌려받음
            console.log(`모달 플러그인 - closeModal`, data);
            modalModel.value.state = false;
            modalModel.value.result = data;
          }
        });
      }
    });

    // 모달이 들어갈 div에 modalApp인스턴스를 마운트
    modalApp.mount(modalElement);

    // 플러그인을 사용하는 곳에 제공할 정보들 (openModal 함수와 결과 데이터 제공)
    app.provide(modalInjectionKey, {

      openModal: (component) => {
        console.log(`모달 플러그인 - openModal`, component)
        modalModel.value.component = component;
        modalModel.value.state = true;
      },
      result: modalModel.value,
    });
  }
};

// useModal를 사용하는 컴포넌트에 probide한 데이터들을 전달
export const useModal = () => {
  return inject(modalInjectionKey);
}
