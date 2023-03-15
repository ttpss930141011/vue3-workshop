<template>
  <el-config-provider :locale="lang[language]" namespace="el" :size="size">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
//element-plus lang
import tw from 'element-plus/lib/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { storeToRefs } from 'pinia/dist/pinia'
import { useRoute } from 'vue-router'
import { useBasicStore } from '@/store/basic'
import { useConfigStore } from '@/store/config'

//reshow default setting
import { toggleHtmlClass } from '@/theme/utils'
const lang = { tw, en }

const { settings } = storeToRefs(useBasicStore())
const { size, language } = storeToRefs(useConfigStore())
onBeforeMount(() => {
  //set tmp token when setting isNeedLogin false
  if (!settings.value.isNeedLogin) useBasicStore().setToken(settings.value.tmpToken)
})

const route = useRoute()
onMounted(() => {
  const { setTheme, theme, setSize, size, setLanguage, language } = useConfigStore()
  setTheme(theme)
  setLanguage(language, route.meta?.title)
  setSize(size)
  toggleHtmlClass(theme)
})
</script>
<style lang="scss">
//修改进度条样式
#nprogress .bar {
  background: var(--pregress-bar-color) !important;
}
</style>
