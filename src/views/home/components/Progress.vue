<template>
  <div class="progress">
    <el-progress :percentage="progressNumber" :color="colors" :stroke-width="strokeWidth" :show-text="showTextFn" />
    <div v-show="showPlan" ref="panel" class="panel">{{ planTextStr }}</div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
const props = defineProps({
  // 百分比，必填 0-100
  percentage: {
    type: Number,
    default() {
      return 0
    }
  },
  // 進度條類型
  type: {
    type: String,
    default() {
      return 'line' // line/circle/dashboard
    }
  },
  // stroke-width
  strokeWidth: {
    type: Number,
    default() {
      return 6
    }
  },
  // 是否顯示進度條文字內容
  showText: {
    type: Boolean,
    default() {
      return true
    }
  },
  // 是否顯示信息面板
  showPlan: {
    type: Boolean,
    default() {
      return false
    }
  },
  // 面板顯示文字
  planText: String
})

const progressNumber = computed(() => {
  if (props.percentage > 100) return 100
  else if (props.percentage < 0) return 0
  else return props.percentage
})

const showTextFn = computed(() => {
  if (props.showPlan) return false
  return props.showText
})

const panel = ref<any>(null)
const panelHeight = ref<string>('0px')
const translateX = ref<string>('0%')
const left = computed(() => `${progressNumber.value}%`)

const planTextStr = computed(() => {
  if (props.planText) return props.planText
  else return `${progressNumber.value}%`
})

const showPlanType = computed(() => {
  if (props.type === 'line') return props.showPlan
  else return false
})
//進度條樣式
const colors = [
  { color: '#F56C6C', percentage: 30 },
  { color: '#E6A23C', percentage: 60 },
  { color: '#67C23A', percentage: 90 }
]
onMounted(() => {
  if (showPlanType.value) {
    panelHeight.value = `${panel.value.offsetHeight + 5}px`
    const widthHalf = panel.value.offsetWidth / 2 // 面板寬度的一半
    if (progressNumber.value > widthHalf && progressNumber.value < 100 - widthHalf) translateX.value = '-50%'
    else translateX.value = '0%'
  }
})
// 監聽百分比變化 修改面板translateX
watch(progressNumber, (val, preVal) => {
  if (!showPlanType.value) return
  const widthHalf = panel.value.offsetWidth / 2 // 面板寬度的一半
  if (progressNumber.value > widthHalf && progressNumber.value < 100 - widthHalf) translateX.value = '-50%'
  else if (progressNumber.value >= 100 - widthHalf) translateX.value = '-100%'
  else translateX.value = '0%'
})
</script>
<style scoped lang="scss">
.progress {
  position: relative;
}

.progress::after {
  content: '';
  display: inline-block;
  height: v-bind(panelHeight);
}

.progress .panel {
  max-width: 100%;
  white-space: nowrap; /*內容超寬後禁止換行顯示*/
  overflow: hidden; /*超出部分隱藏*/
  text-overflow: ellipsis; /*文字超出部分以省略號顯示*/
  position: absolute;
  left: v-bind(left);
  bottom: 0;
  z-index: 1;
  background: #eaedf4;
  border-radius: 4px;
  padding: 0 6px;
  height: 22px;
  line-height: 22px;
  white-space: nowrap;
  transform: translateX(v-bind(translateX));
  transition: all 0.5s;
}
</style>
