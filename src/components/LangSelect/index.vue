<template>
  <el-dropdown trigger="click" type="primary" @command="changeLanguage">
    <div id="langselect-container" class="pl-1 pr-1">
      <svg-icon icon-class="language" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          <h3 class="pt-1 pb-1 font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store/config'
const route = useRoute()
const configStore = useConfigStore()
const { setLanguage } = configStore
const { language } = storeToRefs(configStore)

type langParam = 'tw' | 'en'
const changeLanguage = (langParam: langParam) => {
  setLanguage(langParam, route.meta?.title)
}

const state = reactive({
  langOptions: [
    { label: '繁體中文', value: 'tw' },
    { label: 'English', value: 'en' }
  ]
})

const { langOptions } = toRefs(state)
</script>

<style scoped lang="scss">
.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
  margin-top: 4px;
}
</style>
