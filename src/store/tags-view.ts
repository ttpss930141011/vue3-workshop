import { defineStore } from 'pinia'
import setting from '@/settings'
export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: [] //tag標籤數組
    }
  },
  actions: {
    addVisitedView(view) {
      this.$patch((state: any) => {
        //判斷添加的標籤存在直接返回
        if (state.visitedViews.some((v) => v.path === view.path)) return
        //添加的數量如果大於 setting.tagsViewNum,則替換最後一個元素，否則在visitedViews數組後插入一個元素
        if (state.visitedViews.length >= setting.tagsViewNum) {
          state.visitedViews.pop()
          state.visitedViews.push(
            Object.assign({}, view, {
              title: view.meta.title || 'no-name'
            })
          )
        } else {
          state.visitedViews.push(
            Object.assign({}, view, {
              title: view.meta.title || 'no-name'
            })
          )
        }
      })
    },
    delVisitedView(view) {
      return new Promise((resolve) => {
        this.$patch((state: any) => {
          //匹配view.path元素將其刪除
          for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
              state.visitedViews.splice(i, 1)
              break
            }
          }
          resolve([...state.visitedViews])
        })
      })
    },
    delOthersVisitedViews(view) {
      return new Promise((resolve) => {
        this.$patch((state) => {
          state.visitedViews = state.visitedViews.filter((v: ObjKeys) => {
            return v.meta.affix || v.path === view.path
          })
          resolve([...state.visitedViews])
        })
      })
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        this.$patch((state) => {
          // keep affix tags
          state.visitedViews = state.visitedViews.filter((tag: ObjKeys) => tag.meta?.affix)
          resolve([...state.visitedViews])
        })
      })
    }
  }
})
