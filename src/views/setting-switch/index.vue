<template>
  <div class="scroll-y">
    <div class="rowSS">
      <div class="mb-10px">
        <div class="font-bold text-20px">page layout related</div>
        <div class="mt-20px">
          sidebarLogo：
          <el-switch v-model="settings.sidebarLogo" />
        </div>
        <div class="mt-30px">
          showNavbarTitle：
          <el-switch v-model="settings.showNavbarTitle" />
        </div>
        <div class="mt-30px">
          ShowDropDown：
          <el-switch v-model="settings.ShowDropDown" />
        </div>
        <div class="mt-30px">
          showHamburger：
          <el-switch v-model="settings.showHamburger" />
        </div>
        <div class="mt-30px">
          showLeftMenu：
          <el-switch v-model="settings.showLeftMenu" />
        </div>
        <div class="mt-30px">
          showTagsView：
          <el-switch v-model="settings.showTagsView" />
        </div>
        <div class="mt-30px">
          showTopNavbar：
          <el-switch v-model="settings.showTopNavbar" />
        </div>
        <div class="font-bold text-20px">page animation related</div>
        <div class="mt-20px">mainNeedAnimation：places to "settings file" for setting</div>
        <div class="mt-30px">
          isNeedNprogress：
          <el-switch v-model="settings.isNeedNprogress" />
        </div>
      </div>
      <div class="mb-10px ml-60px">
        <div v-lang class="mt-10px mb-10px font-bold">switch theme</div>
        <el-button @click="setTheme('base-theme')">base-theme(default)</el-button>
        <el-button @click="setTheme('lighting-theme')">lighting-theme</el-button>
        <el-button @click="setTheme('china-red')">china-red(default)</el-button>
        <el-button @click="setTheme('dark')">dark-theme</el-button>

        <div v-lang class="mt-10px mb-10px font-bold">switch size</div>
        <el-button @click="setSize('large')">large</el-button>
        <el-button @click="setSize('default')">default</el-button>
        <el-button @click="setSize('small')">small</el-button>

        <div v-lang class="mt-10px mb-10px font-bold">switch language</div>
        <el-button @click="changeLanguage('en')">en</el-button>
        <el-button @click="changeLanguage('tw')">tw</el-button>

        <div v-lang class="mt-30px font-bold mb-10px">global var</div>
        {{ showObj }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '@/store/config'

const { settings } = storeToRefs(useBasicStore())

const { setTheme, theme, setSize, size, setLanguage } = useConfigStore()
const route = useRoute()
const changeLanguage = (langParam) => {
  setLanguage(langParam, route.meta?.title)
}
const showObj = ref(GLOBAL_VAR)
</script>
