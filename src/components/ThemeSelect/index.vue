<template>
  <el-dropdown trigger="click" type="primary" @command="changeTheme">
    <div id="langselect-container" class="pl-1 pr-1">
      <svg-icon icon-class="theme-icon" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="theme === item.value"
        >
          <h3 class="pt-1 pb-1 font-sizePx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/store/config'
const { t } = useI18n()
const configStore = useConfigStore()
const { setTheme } = configStore
const { theme } = storeToRefs(configStore)

const changeTheme = (themeParam) => {
  setTheme(themeParam)
}

const state = reactive({
  themeOptions: [
    { label: t('navbar.base'), value: 'base-theme' },
    { label: t('navbar.lighting'), value: 'lighting-theme' },
    { label: t('navbar.red'), value: 'china-red' },
    { label: t('navbar.dark'), value: 'dark' }
  ]
})

const { themeOptions } = toRefs(state)
</script>

<style scoped lang="scss">
.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
  margin-top: 4px;
}
</style>
