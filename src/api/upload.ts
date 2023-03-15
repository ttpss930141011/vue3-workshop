import axiosReq from '@/utils/axios-req'
import { ProgramApi } from '@/api/api'
export function upload(data) {
  return axiosReq({
    url: `${ProgramApi}/upload`,
    method: 'post',
    data,
    isUploadFile: true,
    timeout: 1800000
  })
}

export const merge = (data) => {
  return axiosReq({
    url: `${ProgramApi}/merge`,
    method: 'post',
    data,
    timeout: 1800000,
		isAlertErrorMsg: false
  })
}

export function verify(data) {
  return axiosReq({
    url: `${ProgramApi}/verify`,
    method: 'post',
    data,
    timeout: 1800000
  })
}
