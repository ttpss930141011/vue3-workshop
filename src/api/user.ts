import { getUserInfoApi, loginApi, signoutApi } from './api'
//获取用户信息
import axiosReq from '@/utils/axios-req'

export const loginReq = (data) => {
  return axiosReq({
    url: loginApi,
    data,
    method: 'post',
    bfLoading: true,
    isParams: false,
    isAlertErrorMsg: true
  })
}

export function getInfoReq() {
  return axiosReq({
    url: getUserInfoApi,
    bfLoading: false,
    method: 'get',
    isAlertErrorMsg: false
  })
}

export function loginOutReq() {
  return axiosReq({
    url: signoutApi,
    method: 'post'
  })
}
