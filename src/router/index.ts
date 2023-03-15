import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterTypes } from '~/basic'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouterTypes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        // component: () => import('@/views/home/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Home', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  {
    path: '/setting-switch',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/setting-switch/index.vue'),
        name: 'SettingSwitch',
        meta: { title: 'Setting Switch', icon: 'example' }
      }
    ]
  }
]

//角色和code数组动态路由
export const roleCodeRoutes: RouterTypes = [
  {
    path: '/mock-test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/mock/index.vue'),
        name: 'MockTest',
        meta: { title: 'Mock test', elSvgIcon: 'Connection', code: 16, roles: ['ADMIN'] }
      }
    ]
  },{
    path: '/work-shop',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/work-shop/index.vue'),
        name: 'WorkShop',
        meta: { title: 'Work shop', elSvgIcon: 'Shop', code: 16, roles: ['ADMIN'] }
      }
    ]
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouterTypes = [
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', name: 'CatchAll', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
