import type { userData } from '~/basic'
import router from '@/router'
import { filterAsyncRouter, progressClose, progressStart } from '@/hooks/use-permission'
import { useBasicStore } from '@/store/basic'
import { langTitle } from '@/hooks/use-common'
// import setUserEmail from '@/utils/setUserEmail'

//路由进入前拦截
//to:将要进入的页面 vue-router4.0 不推荐使用next()
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to) => {
  progressStart()
  document.title = langTitle(to.meta?.title) // i18 page title
  const basicStore = useBasicStore()
  //1.判断token
  if (basicStore.token) {
    if (to.path === '/login') {
      return '/'
    } else {
      //2.判断是否获取用户信息
      if (basicStore.getUserInfo) return true
      try {
        // const userData: userData = await basicStore.getUserInfoReq()
        const userData: userData = { roles: ['ADMIN', 'EDITOR'], codes: [5, 15, 16], account: '101557' }
        // const { emailIsExist } = userData
        // if (!emailIsExist) setUserEmail()
        //3.动态路由权限筛选
        filterAsyncRouter(userData)
        //4.保存用户信息到store
        basicStore.setUserInfo(userData)
        //5.再次执行路由跳转
        return { ...to, replace: true }
      } catch (e) {
        console.error(`route permission error${e}`)
        basicStore.resetState()
        progressClose()
        return `/login?redirect=${to.path}`
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return `/login?redirect=${to.path}`
    } else {
      return true
    }
  }
})
//路由进入后拦截
router.afterEach(() => {
  progressClose()
})
