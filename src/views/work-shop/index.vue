<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header rowBS">
        <el-col :span="4"><h2>Request practice</h2></el-col>
        <el-col :span="19">
          <el-input v-model="requestUrl" placeholder="Request Url" clearable />
        </el-col>
      </div>
    </template>
    <el-card class="my-1" shadow="hover">
      <el-row class="rowSC">
        <el-col :span="4"><el-button type="primary" size="large">GET</el-button></el-col>
        <el-col :span="20">
          <el-card class="box-card">
            <el-text>{{ getResonse }}</el-text>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-1" shadow="hover">
      <el-row class="rowSC">
        <el-col :span="4"><el-button type="success" size="large">POST</el-button></el-col>
        <el-col :span="20">
          <el-card class="box-card">
            <el-text>{{ postResonse }}</el-text>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-1" shadow="hover">
      <el-row class="rowSC">
        <el-col :span="4"><el-button type="warning" size="large">PUT</el-button></el-col>
        <el-col :span="20">
          <el-card class="box-card">
            <el-text>{{ putResonse }}</el-text>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-1" shadow="hover">
      <el-row class="rowSC">
        <el-col :span="4"><el-button type="danger" size="large">DELETE</el-button></el-col>
        <el-col :span="20">
          <el-card class="box-card">
            <el-text>{{ deleteResonse }}</el-text>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </el-card>
  <Icon />
</template>

<script setup lang="ts">
import Icon from '@/components/shared/Icon/index.vue'
const getResonse = ref('')
const postResonse = ref('')
const putResonse = ref('')
const deleteResonse = ref('')
const requestUrl = ref('')
</script>

<style scoped></style>
