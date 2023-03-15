<template>
  <el-dropdown id="size-select" trigger="click" type="primary" @command="changeFontSize">
    <div class="pl-1 pr-1">
      <svg-icon icon-class="size" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="size === item.value"
        >
          <h3 class="pt-1 pb-1 font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const configStore = useConfigStore()
const { setSize } = configStore
const { size } = storeToRefs(configStore)
const state = reactive({
  sizeOptions: [
    { label: 'Large ', value: 'large' },
    { label: 'Default ', value: 'default' },
    { label: 'Small', value: 'small' }
  ]
})

const changeFontSize = (size) => {
  setSize(size)
}
//导出属性到页面中使用
const { sizeOptions } = toRefs(state)
</script>

<style scoped lang="scss">
.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
  margin-top: 4px;
}
</style>
