<template>
  <el-dialog v-model="dialogShow" :title="bomNo" :before-close="dialogClose" top="5vh">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      v-loading="isUploading ? { text: uploadStatus } : false"
    >
      <el-form-item v-if="isStatusNew" label="Correlation:">
        <el-checkbox v-model="isCorrelation" label="Correlation" border :disabled="isUploading" />
      </el-form-item>
      <el-form-item label="Pgm zip:" prop="pgmZip">
        <Upload ref="pgmZipRef" :disabled="isUploading" @message="handleMessage" />
      </el-form-item>
      <el-form-item v-if="isCorrelation" label="Corr Pgm zip:" prop="corrPgmZip">
        <Upload ref="corrPgmZipRef" :disabled="isUploading" @message="handleMessage" />
      </el-form-item>
    </el-form>
    <div class="rowEC">
      <el-button type="primary" :disabled="isUploading" :loading="isUploading" @click="confirmDebounce">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessageBox, ElNotification } from 'element-plus'
import _ from 'lodash'
import Upload from './Upload.vue'
import type { FormInstance } from 'element-plus'
import type { RowData } from '~/home'
import { copyExistedBomReq, updateNewBomReq, updateWaitingBomReq } from '@/api/bom'
import { ftpUploadProgramReq } from '@/api/ftp'

const props = defineProps<{ editRow: RowData }>()
const { editRow } = toRefs(props)
const { bomNo, status, _id, correlation /* Test_Program*/ } = editRow.value
const emit = defineEmits(['close', 'refresh'])
const dialogShow = ref(true)
const pgmZipRef = ref<InstanceType<typeof Upload> | null>(null)
const corrPgmZipRef = ref<InstanceType<typeof Upload> | null>(null)
const uploadStatus = ref('開始上傳')
const isUploading = ref(false)
// 是否要顯示checkbox讓人勾選以上傳第二個表單
const isStatusNew = computed(() => status === 'new')
// 是否開啟第二個上傳表單
const isCorrelation = ref(false)
// Form表單相關
const formRef = ref<FormInstance>()
const formData = reactive({
  pgmZip: computed(() => pgmZipRef.value?.fileForm ?? null),
  corrPgmZip: computed(() => corrPgmZipRef.value?.fileForm ?? null)
})
const formRules = reactive({
  pgmZip: [
    {
      validator: () =>
        new Promise((resolve, reject) => (pgmZipRef.value?.validator() ? resolve(true) : reject('請選擇檔案')))
    }
  ],
  corrPgmZip: [
    {
      validator: () =>
        new Promise((resolve, reject) => (corrPgmZipRef.value?.validator() ? resolve(true) : reject('請選擇檔案')))
    }
  ]
})
const validateForm = () => {
  return new Promise((resolve) => {
    const form = unref(formRef)
    form?.validate((valid) => {
      if (valid) resolve(true)
      resolve(false)
    })
  })
}
const handleMessage = ([message, percentage]) => {
  if (message === '上傳檔案') uploadStatus.value = `上傳檔案 ${percentage} %`
  else uploadStatus.value = message
}
//Dialog button
const dialogConfirm = async () => {
  const valid = await validateForm()
  if (valid) {
    ElMessageBox.confirm(
      `<p>Pgm Zip : ${pgmZipRef.value?.fileForm?.file?.name}</p>
      ${isCorrelation.value ? `<p>Corr Pgm Zip : ${corrPgmZipRef.value?.fileForm?.file?.name}</p>` : ''}
      <p>Correlation :
        <span class=${correlation ? 'text-success' : 'text-danger'}>
          ${correlation}
        </span>
      </p>
      `,
      'Warning',
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    ).then(async () => {
      try {
        isUploading.value = true
        if (isCorrelation.value === true) {
          // 第一個程式上傳server
          const { data: copiedBom } = await copyExistedBomReq(_id)
          await pgmZipRef.value?.bootstrap()
          // 第一個bom更新
          await updateNewBomReq(_id, {
            fileHash: pgmZipRef.value?.fileForm.hash ?? '',
            fileName: pgmZipRef.value?.fileForm.file?.name ?? ''
          })
          uploadStatus.value = '正在上傳FTP'
          // 第一個程式上傳ftp server
          await ftpUploadProgramReq(_id, {
            fileHash: pgmZipRef.value?.fileForm.hash ?? '',
            fileName: pgmZipRef.value?.fileForm.file?.name ?? ''
          })
          ElNotification({
            title: 'Success',
            message: `【${pgmZipRef.value?.fileForm.file?.name}】上傳FTP完成`,
            type: 'success',
            duration: 0
          })

          // 第二個程式上傳server
          await corrPgmZipRef.value?.bootstrap()
          // 第二個bom更新
          await updateNewBomReq(copiedBom._id, {
            fileHash: corrPgmZipRef.value?.fileForm.hash ?? '',
            fileName: corrPgmZipRef.value?.fileForm.file?.name ?? ''
          })
          uploadStatus.value = '正在上傳FTP'
          // 第二個程式上傳ftp server
          await ftpUploadProgramReq(copiedBom._id, {
            fileHash: corrPgmZipRef.value?.fileForm.hash ?? '',
            fileName: corrPgmZipRef.value?.fileForm.file?.name ?? ''
          })
          ElNotification({
            title: 'Success',
            message: `【${corrPgmZipRef.value?.fileForm.file?.name}】上傳FTP完成`,
            type: 'success',
            duration: 0
          })
        } else {
          await pgmZipRef.value?.bootstrap()
          if (isStatusNew.value === true) {
            await updateNewBomReq(_id, {
              fileHash: pgmZipRef.value?.fileForm.hash ?? '',
              fileName: pgmZipRef.value?.fileForm.file?.name ?? ''
            })
          } else {
            await updateWaitingBomReq(_id, {
              fileHash: pgmZipRef.value?.fileForm.hash ?? '',
              fileName: pgmZipRef.value?.fileForm.file?.name ?? ''
            })
          }
          uploadStatus.value = '正在上傳FTP'
          await ftpUploadProgramReq(_id, {
            fileHash: pgmZipRef.value?.fileForm.hash ?? '',
            fileName: pgmZipRef.value?.fileForm.file?.name ?? ''
          })
          ElNotification({
            title: 'Success',
            message: `【${pgmZipRef.value?.fileForm.file?.name}】上傳FTP完成`,
            type: 'success',
            duration: 0
          })
        }
        isUploading.value = false
        tableRefresh()
        dialogClose()
      } catch (err: any) {
        // ElMessage.error(err)
        isUploading.value = false
        console.log(err)
      }
    })
  }
}
const tableRefresh = () => emit('refresh')
const dialogClose = () => {
  if (!isUploading.value) emit('close')
}

const _debounce = _.debounce(dialogConfirm, 1000)
const confirmDebounce = () => _debounce()
</script>
