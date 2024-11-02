import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    // 루트 URL로 접근시 메인탭을 보여주기 위해 리다이렉트
    path: '/',
    redirect: {
      name: `main`,
    }
  },
  {
    // MainLayout을 App.vue의 router-view에 붙임
    path: '/',
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      // MainLayout안의 router-view에 자식 컴포넌트들을 붙임
      {
        path: 'main',
        name: 'main',
        meta: {},
        component: () => import('@/views/MainView.vue'),
      },
      {
        path: 'cd001',
        name: 'cd001',
        meta: {},
        component: () => import('@/views/CD001.vue'),
      },
      {
        path: 'cd002',
        name: 'cd002',
        meta: {},
        component: () => import('@/views/CD002.vue'),
      },
      {
        path: 'cd003',
        name: 'cd003',
        meta: {},
        component: () => import('@/views/CD003.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  next();
})

export default router
