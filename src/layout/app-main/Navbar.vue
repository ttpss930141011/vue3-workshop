<template>
  <div class="navbar rowBC reset-el-dropdown">
    <div class="rowSC">
      <!--  切換sidebar按鈕  -->
      <hamburger
        v-if="settings.showHamburger"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <!--  麵包屑導航  -->
      <breadcrumb class="breadcrumb-container" />
    </div>
    <!--導航標題-->
    <div v-if="settings.showNavbarTitle" class="heardCenterTitle">{{ settings.title }}</div>
    <!-- 下拉操作菜單 -->
    <div v-if="settings.ShowDropDown" class="right-menu rowSC">
      <SizeSelect />
      <LangSelect />
      <ThemeSelect />
      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper">
          <div class="user-name">Hi, {{ userInfo.account }}</div>
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ langTitle('Home') }}</el-dropdown-item>
            </router-link>
            <!--<el-dropdown-item>修改密碼</el-dropdown-item>-->
            <el-dropdown-item divided @click="loginOut">{{ langTitle('Login out') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import { resetState } from '@/hooks/use-permission'
import { useBasicStore } from '@/store/basic'
import { langTitle } from '@/hooks/use-common'
import SizeSelect from '@/components/SizeSelect/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'

const basicStore = useBasicStore()
const { settings, sidebar, setToggleSideBar } = basicStore
const { userInfo } = storeToRefs(basicStore)
const toggleSideBar = () => {
  setToggleSideBar()
}
//退出登入
const router = useRouter()
const loginOut = () => {
  ElMessage.success('退出登入成功')
  router.push(`/login?redirect=/`)
  nextTick(() => {
    resetState()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--nav-bar-background);
  box-shadow: var(--nav-bar-box-shadow);
  z-index: 1;
}

//logo
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px;

  .user-name {
    cursor: pointer;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 10px;
  background-color: var(--nav-bar-right-menu-background);
}
</style>
