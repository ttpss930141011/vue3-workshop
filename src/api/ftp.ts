import axiosReq from '@/utils/axios-req'
import { ftpApi } from '@/api/api'

export function ftpUploadProgramReq(_id: string, data: { fileName: string; fileHash: string }) {
  return axiosReq({
    url: `${ftpApi}/id/${_id}`,
    method: 'post',
    data,
    timeout: 0
  })
}
