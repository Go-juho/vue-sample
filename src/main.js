import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Modal from '@/plugin/modal/js/modal'

import 'devextreme/dist/css/dx.material.blue.light.css';

createApp(App)
  .use(Modal) // 플러그인으로 만든 모달 사용
  .use(store) // vuex 스토어 사용
  .use(router) // 라우터 사용
  .mount('#app')
