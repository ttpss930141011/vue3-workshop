<template>
  <div class="scroll-y">
    <div class="font-bold mb-20px">mock使用示例</div>
    <el-button type="primary" @click="listReq">点击发送mock请求</el-button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
const listReq = () => {
  axios
    .get('/getMapInfo')
    .then(({ data }) => {
      ElMessage.success(data.title)
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
</script>

<style scoped lang="scss"></style>
