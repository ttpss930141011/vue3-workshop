import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { createdHash } from '@/utils/hash'
import { merge, upload, verify } from '@/api/upload'

interface queryArr {
  fileHash: string
  index: number
  chunk: Blob
  size: number
  hash: string
}
export interface FileformType {
  file: null | File
  hash: string
  worker: string
}

export default function () {
  const _queryArr = ref<queryArr[]>([])
  const _size = ref(10 * 1024 * 1024)
  const fileForm: FileformType = reactive({
    file: null,
    hash: '',
    worker: ''
  })
  const fileList = ref<UploadUserFile[]>([])
  const fileUploadInfo = reactive({
    fileUploading: false,
    fileUploadSuccess: false,
    percentage: 0,
    fileStatus: 'Empty'
  })

  const fileUploadState = {
    Initial: () => {
      fileUploadInfo.percentage = 0
      fileUploadInfo.fileUploading = false
      fileUploadInfo.fileUploadSuccess = false
      fileUploadInfo.fileStatus = 'Empty'
    },
    OnMessage: (msg: string, percentage = 0) => {
      fileUploadInfo.percentage = percentage
      fileUploadInfo.fileUploading = true
      fileUploadInfo.fileStatus = msg
    },
    OnError: (errMsg: string) => {
      fileUploadInfo.fileUploading = false
      fileUploadInfo.fileUploadSuccess = false
      fileUploadInfo.fileStatus = errMsg
    },
    OnSuccess: (msg = '上傳成功') => {
      fileUploadInfo.percentage = 100
      fileUploadInfo.fileUploading = false
      fileUploadInfo.fileUploadSuccess = true
      fileUploadInfo.fileStatus = msg
    }
  }
  let autoRepeatUploadCounter = 0
  const bootstrap = async () => {
    while (autoRepeatUploadCounter < 3) {
      try {
        await fileUpload()
        break
      } catch (err: any) {
        fileUploadState.OnError(err)
        autoRepeatUploadCounter += 1
      }
    }
  }
  const fileUpload = async () => {
    if (!fileForm.file) return
    const fileChunkList = createFileChunk(fileForm.file)
    if (!fileForm.hash) fileForm.hash = await calculateHash(fileChunkList)
    const { shouldUpload, uploadedList } = await verifyUpload(fileForm.file.name, fileForm.hash)
    if (!shouldUpload) {
      fileUploadState.OnSuccess('檔案已被上傳過')
      return
    }
    _queryArr.value = fileChunkList.map(({ file }, index) => ({
      fileHash: fileForm.hash,
      index,
      chunk: file,
      size: file.size,
      hash: `${fileForm.hash}-${index}`
    }))
    await uploadChunks(uploadedList)
    await fileMerge()
  }
  const createFileChunk = (file: File) => {
    fileUploadState.OnMessage('切割')
    const fileChunkList = <{ file: Blob }[]>[]
    let cur = 0
    while (cur < file.size) {
      // file slice,return Bolb object {size:***,type:***}
      // 如果文件超過10m，則按10m每個切片進行分割
      fileChunkList.push({ file: file.slice(cur, cur + _size.value) }) // 講file分10m截取內容,然後push進fileChunkList數組裡面 [{file:Blob{size:**,type:**}}]
      cur += _size.value //一定要寫這個累加,不然死循環
    }
    return fileChunkList
  }
  const calculateHash = async (fileChunkList: { file: Blob }[]): Promise<any> => {
    fileUploadState.OnMessage('計算MD5')
    return createdHash(fileChunkList)
  }
  const verifyUpload = async (fileName: string, fileHash: string) => {
    try {
      fileUploadState.OnMessage('較驗')
      const { data } = await verify({ fileName, fileHash })
      return data
    } catch {
      throw `verify file error`
    }
  }
  const uploadChunks = async (uploadedList: string[] = []) => {
    try {
      // if(autoRepeatUploadCounter === 0) _queryArr.value.pop() // 測試掉檔
      const requestList = _queryArr.value
        .filter(({ hash }) => !uploadedList.includes(hash)) //過濾以上傳的slice chunks
        .map(({ chunk, hash }) => {
          const formData = new FormData()
          formData.append('program', chunk)
          formData.append('chunkName', hash)
          formData.append('fileHash', fileForm.hash)
          return { formData }
        })
        .map(async ({ formData }) => {
          const request = await upload(formData)
          return request
        })
      await allProgress(requestList, (p) => {
        fileUploadState.OnMessage('上傳檔案', Number.parseInt(p))
      })
    } catch {
      throw `upload chunks error`
    }
  }
  const fileMerge = async () => {
    try {
      const params = {
        chunkSize: _size.value,
        fileHash: fileForm.hash,
        fileName: fileForm.file?.name,
        fileSize: fileForm.file?.size
      }
      fileUploadState.OnMessage('合併檔案')
      const { data } = await merge(params)
      ElMessage({ message: data.msg, type: 'success' })
      fileUploadState.OnSuccess()
    } catch {
      throw `fileMerge error`
    }
  }

  const allProgress = async (proms, callback) => {
    let done = 0
    callback(0)
    for (const req of proms) {
      req
        .then(() => {
          done++
          callback((done * 100) / proms.length)
        })
        .catch((err) => ElMessage.error(err))
    }
    return Promise.all(proms)
  }
  const fileChange: UploadProps['onChange'] = (file, fileArr) => {
    if (!fileUploadInfo.fileUploading) {
      fileUploadState.Initial()
      const { raw } = file
      if (!raw) {
        ElMessage.error('未選擇文件')
        return
      }
      if (fileArr.length > 1) {
        fileArr.splice(0, 1)
      }
      fileForm.file = raw
      fileList.value = fileArr
    }
  }
  //exceed file
  const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    if (!fileUploadInfo.fileUploading) {
      fileUploadState.Initial()
      if (!files[0]) {
        ElMessage.error('未選擇文件')
        return
      }
      // 替換upload component current file
      uploadFiles[0] = files[0]
      fileForm.file = files[0]
    }
  }
  // delete file
  const handleRemove: UploadProps['onRemove'] = () => {
    if (!fileUploadInfo.fileUploading) {
      fileUploadState.Initial()
      fileList.value = []
      fileForm.file = null
    }
  }

  return {
    fileUploadInfo,
    fileList,
    fileForm,
    bootstrap,
    fileChange,
    handleExceed,
    handleRemove
  }
}
