import NProgress from 'nprogress'
import type { RouteRawConfig, RouterTypes } from '~/basic'
import type { RouteRecordName } from 'vue-router'
/**
 * 根據請求，過濾異步路由
 * @param:menuList 異步路由數組
 * return 過濾後的異步路由
 */
// @ts-ignore
// import Layout from '@/layout/index.vue'
/*
 * 路由操作
 * */
import router, { asyncRoutes, constantRoutes, roleCodeRoutes } from '@/router'
//進度條
import 'nprogress/nprogress.css'
import { useBasicStore } from '@/store/basic'

// const buttonCodes: Array<Number> = [] //按鈕權限
// interface menuRow {
//   category: number
//   code: number
//   children: RouterTypes
// }
// const getRouteItemFromReqRouter = (route): RouteRawConfig => {
//   const tmp: rawConfig = { meta: { title: '' } }
//   const routeKeyArr = ['path', 'component', 'redirect', 'alwaysShow', 'name', 'hidden']
//   const metaKeyArr = ['title', 'activeMenu', 'elSvgIcon', 'icon']
//   // @ts-ignore
//   const modules = import.meta.glob('../views/**/**.vue')
//   //generator routeKey
//   routeKeyArr.forEach((fItem) => {
//     if (fItem === 'component') {
//       if (route[fItem] === 'Layout') {
//         tmp[fItem] = Layout
//       } else {
//         //has error , i will fix it through plugins
//         //tmp[fItem] = () => import(`@/views/permission-center/test/TestTableQuery.vue`)
//         tmp[fItem] = modules[`../views/${route[fItem]}`]
//       }
//     } else if (fItem === 'path' && route.parentId === 0) {
//       tmp[fItem] = `/${route[fItem]}`
//     } else if (['hidden', 'alwaysShow'].includes(fItem)) {
//       tmp[fItem] = !!route[fItem]
//     } else if (['name'].includes(fItem)) {
//       tmp[fItem] = route['code']
//     } else if (route[fItem]) {
//       tmp[fItem] = route[fItem]
//     }
//   })
//   //generator metaKey
//   metaKeyArr.forEach((fItem) => {
//     if (route[fItem] && tmp.meta) tmp.meta[fItem] = route[fItem]
//   })
//   //route extra insert
//   if (route.extra) {
//     Object.entries(route.extra.parse(route.extra)).forEach(([key, value]) => {
//       if (key === 'meta' && tmp.meta) {
//         tmp.meta[key] = value
//       } else {
//         tmp[key] = value
//       }
//     })
//   }
//   return tmp as RouteRawConfig
// }

/**
 * 根據角色數組過濾異步路由
 * @param routes asyncRoutes 未過濾的異步路由
 * @param roles  角色數組
 * return 過濾後的異步路由
 */
export function filterAsyncRoutesByRoles(routes, roles) {
  const res: RouterTypes = []
  routes.forEach((route) => {
    const tmp: RouteRawConfig = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoles(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
function hasPermission(roles, route) {
  if (route?.meta?.roles) {
    return roles?.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 根據code數組，過濾異步路由
 * @param codes code數組
 * @param codesRoutes 未過濾的異步路由
 * return 過濾後的異步路由
 */
export function filterAsyncRouterByCodes(codesRoutes: RouteRawConfig[], codes: number[]) {
  const filterRouter: RouterTypes = []
  codesRoutes.forEach((routeItem: RouteRawConfig) => {
    if (hasCodePermission(codes, routeItem)) {
      if (routeItem.children) routeItem.children = filterAsyncRouterByCodes(routeItem.children, codes)
      filterRouter.push(routeItem)
    }
  })
  return filterRouter
}
function hasCodePermission(codes: number[], routeItem: RouteRawConfig) {
  if (routeItem.meta?.code) {
    return codes.includes(routeItem.meta.code) || routeItem.hidden
  } else {
    return true
  }
}
//過濾異步路由
export function filterAsyncRouter({ roles, codes }) {
  const basicStore = useBasicStore()
  let accessRoutes: RouterTypes = []
  const permissionMode = basicStore.settings?.permissionMode
  if (permissionMode === 'roles') {
    accessRoutes = filterAsyncRoutesByRoles(roleCodeRoutes, roles) //by roles
  } else {
    accessRoutes = filterAsyncRouterByCodes(roleCodeRoutes, codes) //by codes
  }
  accessRoutes.forEach((route) => router.addRoute(route))
  asyncRoutes.forEach((item) => router.addRoute(item))
  basicStore.setFilterAsyncRoutes(accessRoutes)
}
//重置路由
export function resetRouter() {
  //移除之前存在的路由
  const routeNameSet: Set<RouteRecordName> = new Set()
  router.getRoutes().forEach((fItem) => {
    if (fItem.name) routeNameSet.add(fItem.name)
  })
  routeNameSet.forEach((setItem) => router.removeRoute(setItem))
  //新增constantRoutes
  constantRoutes.forEach((feItem) => router.addRoute(feItem))
}
//重置登入狀態
export function resetState() {
  resetRouter()
  useBasicStore().resetState()
}

//刷新路由
export function freshRouter(data) {
  resetRouter()
  filterAsyncRouter(data)
  // location.reload()
}

NProgress.configure({ showSpinner: false })
//開始進度條
export const progressStart = () => {
  NProgress.start()
}
//關閉進度條
export const progressClose = () => {
  NProgress.done()
}
