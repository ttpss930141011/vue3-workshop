import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useBasicStore } from '@/store/basic'

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module 'axios' {
  interface AxiosResponse<T = any> {
    message: string
    status: number
    data: T
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
const service = axios.create()

//請求前攔截
service.interceptors.request.use(
  (req) => {
    const { token, axiosPromiseArr } = useBasicStore()
    //axiosPromiseArr收集請求地址,用於取消請求
    req.cancelToken = new axios.CancelToken((cancel) => {
      axiosPromiseArr.push({
        url: req.url,
        cancel
      })
    })
    //設置token到x-api-key
    req.headers['x-api-key'] = import.meta.env.VITE_APP_API_KEY
    //設置token到header
    // req.headers['X-Token'] = token
    req.headers['Authorization'] = `Bearer ${token}`
    //設置socketID到header
    // req.headers['X-SocketId'] = socketId
    //如果req.method給get 請求參數設置為 ?name=xxx
    if ('get'.includes(req.method?.toLowerCase() as string)) req.params = req.data
    return req
  },
  (err) => {
    //發送請求失敗
    Promise.reject(err)
  }
)
//請求後攔截
service.interceptors.response.use(
  (res) => {
    const { status } = res.data
    const successCode = '0,200,20000'
    const noAuthCode = '401,403,50012'
    if (successCode.includes(status)) {
      return res.data
    } else {
      if (noAuthCode.includes(status) && !location.href.includes('/login')) {
        ElMessageBox.confirm('請重新登入', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          useBasicStore().resetStateAndToLogin()
        })
      }
      return Promise.reject(res.data)
    }
  },
  //響應報錯
  (err) => {
    ElMessage.error({
      message: err,
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }
)
//導出service實例給頁面調用 , config->頁面的設定
export default function axiosReq(config) {
  return service({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 10000,
    headers: {
      'x-api-key': import.meta.env.VITE_APP_API_KEY,
      'Content-Type': 'application/json'
    },
    ...config
  })
}
