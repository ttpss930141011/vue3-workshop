import { BomApi, BomsApi } from './api'
import axiosReq from '@/utils/axios-req'

export function getBomlistReq(type: 'new' | 'waiting' | 'fail' | 'cancel' | 'pass') {
  return axiosReq({
    url: `${BomsApi}/status/${type}`,
    method: 'get',
    bfLoading: false,
    isParams: false,
    isAlertErrorMsg: false
  })
}

export function copyExistedBomReq(_id: string) {
  return axiosReq({
    url: `${BomApi}/copy/id/${_id}`,
    method: 'put',
    bfLoading: false,
    isParams: true
  })
}
export function updateNewBomReq(_id: string, data: { fileName: string; fileHash: string }) {
  return axiosReq({
    url: `${BomApi}/new/id/${_id}`,
    method: 'put',
    data
  })
}
export function updateWaitingBomReq(_id: string, data: { fileName: string; fileHash: string }) {
  return axiosReq({
    url: `${BomApi}/waiting/id/${_id}`,
    method: 'put',
    data
  })
}

export function updateBomBySet(_id, data) {
  return axiosReq({
    url: `${BomApi}/id/${_id}`,
    method: 'put',
    data
  })
}

export function createBomReq(data) {
  return axiosReq({
    url: `/bom`,
    method: 'post',
    data
  })
}
