<template>
  <el-upload
    class="upload-area"
    :limit="1"
    :disabled="disabled"
    drag
    :auto-upload="false"
    :file-list="fileList"
    :on-change="fileChange"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    action=""
  >
    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
    <div class="el-upload__text">
      Drop file here or
      <em>click to upload</em>
    </div>
  </el-upload>
  <div class="demo-progress">
    <myProgress :percentage="percentage" :show-plan="true" />
  </div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import myProgress from './Progress.vue'
import uploadHooks from '@/hooks/use-upload'

const props = withDefaults(defineProps<{ disabled: boolean }>(), {
  disabled: false
})
const emit = defineEmits(['message'])
const { disabled } = toRefs(props)
const { fileUploadInfo, fileForm, fileList, bootstrap, fileChange, handleExceed, handleRemove } = uploadHooks()
const { percentage, fileStatus } = toRefs(fileUploadInfo)
const validator = () => (fileForm.file === null ? false : true)
watch([fileStatus, percentage], (n) => emit('message', n))
defineExpose({
  bootstrap,
  validator,
  fileForm
})
</script>
<style scoped lang="scss">
.demo-progress {
  width: 100%;
}
.upload-area {
  width: 100%;
  & :deep(.el-icon--upload) {
    width: 20%;
    margin: 0;
  }
  & :deep(.el-upload-dragger) {
    display: flex;
    align-items: center;
    height: calc(60px + 1rem);
    padding: 0.5rem 0.75rem;
  }
  & :deep(.el-upload__text) {
    width: 80%;
  }
  & :deep(.el-upload-list__item-file-name) {
    height: 15px;
  }
}
</style>
