import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { RouterTypes } from '~/basic'
import defaultSettings from '@/settings'
import router, { constantRoutes } from '@/router'
import { getInfoReq } from '@/api/user'

export const useBasicStore = defineStore('basic', {
  state: () => {
    return {
      token: '',
      socketId: '',
      getUserInfo: false,
      userInfo: { account: '', avatar: '', email: '' }, //user info
      //router
      allRoutes: [] as RouterTypes,
      buttonCodes: [],
      filterAsyncRoutes: [],
      roles: [] as Array<string>,
      codes: [] as Array<number>,
      //keep-alive
      cachedViews: [] as Array<string>,
      cachedViewsDeep: [] as Array<string>,
      //other
      sidebar: { opened: true },
      //axios req collection
      axiosPromiseArr: [] as Array<ObjKeys>,
      settings: defaultSettings
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token']
  },
  actions: {
    setToken(data: string) {
      this.token = data
    },
    setSocketId(data: string) {
      this.$patch((state) => {
        state.socketId = data
      })
    },
    setFilterAsyncRoutes(routes) {
      this.$patch((state) => {
        state.filterAsyncRoutes = routes
        state.allRoutes = constantRoutes.concat(routes)
      })
    },
    getUserInfoReq(): Promise<any> {
      return new Promise((resolve, reject) => {
        getInfoReq()
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    setUserInfo({ account, roles, codes }) {
      this.$patch((state) => {
        state.roles = roles.map((x) => x.code)
        state.codes = codes
        state.getUserInfo = true
        state.userInfo.account = account
        // state.userInfo.avatar = avatar
        // state.userInfo.email = email
      })
    },
    resetState() {
      this.$patch((state) => {
        state.token = '' //reset token
        state.roles = []
        state.codes = []
        //reset router
        state.allRoutes = []
        state.buttonCodes = []
        state.filterAsyncRoutes = []
        //reset userInfo
        state.userInfo.account = ''
        state.userInfo.avatar = ''
        state.userInfo.email = ''
      })
      this.getUserInfo = false
    },
    resetStateAndToLogin() {
      this.resetState()
      nextTick(() => {
        router.push({ path: '/login' })
      })
    },
    setSidebarOpen(data) {
      this.$patch((state) => {
        state.sidebar.opened = data
      })
    },
    setToggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened
      })
    },

    /*keepAlive缓存*/
    addCachedView(view) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) return
        state.cachedViews.push(view)
      })
    },

    delCachedView(view) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view)
        index > -1 && state.cachedViews.splice(index, 1)
      })
    },
    /*third  keepAlive*/
    addCachedViewDeep(view) {
      this.$patch((state) => {
        if (state.cachedViewsDeep.includes(view)) return
        state.cachedViewsDeep.push(view)
      })
    },
    setCacheViewDeep(view) {
      this.$patch((state) => {
        const index = state.cachedViewsDeep.indexOf(view)
        index > -1 && state.cachedViewsDeep.splice(index, 1)
      })
    }
  }
})
