<template>
  <el-dialog v-model="dialogShow" :title="bomNo" :before-close="dialogClose" top="5vh">
    <el-timeline>
      <el-timeline-item
        v-for="(timePoint, index) in timeLine"
        :key="index"
        :icon="timePoint.icon"
        :type="timePoint.type"
        :color="timePoint.color"
        :size="timePoint.size"
        :hollow="timePoint.hollow"
        :timestamp="timePoint.timestamp"
        center
        placement="top"
      >
        <el-card>
          <h3 style="font-weight: bold">{{ timePoint.headerContent }}</h3>
          <p>{{ timePoint.content }}</p>
          <p>{{ timePoint.buyoffResult }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script setup lang="ts">
import { Check, Close, RefreshRight, Warning } from '@element-plus/icons-vue'
import _ from 'lodash'
import type { RowData, TimeLineItem } from '~/home'
// import { getBomTimelineByIdReq } from '@/api/bom'
import comentUtil from '@/utils/common-util'

const props = defineProps<{ timelineRow: RowData }>()
const { timelineRow } = toRefs(props)
const { bomNo, createdBy, updatedBy, buyoffBy } = timelineRow.value
const emit = defineEmits(['close'])
const dialogShow = ref(true)

const timeLine = computed<TimeLineItem[]>(() => {
  const timeLineSortArr = [...(createdBy || []), ...(updatedBy || []), ...(buyoffBy || [])].sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  )
  if (_.isEmpty(timeLineSortArr)) return []
  const timeLineItem = timeLineSortArr.map((timepoint) => {
    const { date, message, status, user } = timepoint
    const timeLocale = comentUtil.dateTimeFormatter(Date.parse(date), 'yyyy/MM/dd/ hh:mm:ss')
    switch (status) {
      case 'Newbom':
        return {
          timestamp: timeLocale,
          headerContent: `Created bom`,
          buyoffResult: '',
          content: `${user} ${message} on ${timeLocale}`,
          hollow: true,
          size: 'large'
        }
      case 'Renewbom':
        return {
          timestamp: timeLocale,
          headerContent: `Renew bom`,
          content: `${user} ${message} on ${timeLocale} `,
          icon: RefreshRight,
          type: 'warning',
          size: 'large'
        }
      case 'Update':
        return {
          timestamp: timeLocale,
          headerContent: `Updated bom`,
          content: `${user} ${message} on ${timeLocale}`
        }
      case 'Bomchange':
        return {
          timestamp: timeLocale,
          headerContent: `Bom change`,
          content: `${user} ${message} on ${timeLocale}`,
          icon: RefreshRight,
          type: 'warning',
          size: 'large'
        }
      case 'Bombuyoff':
        return {
          timestamp: timeLocale,
          headerContent: `Bom buyoff`,
          content: `${user} ${message} on ${timeLocale}`,
          icon: message === 'buyoff success' ? Check : message === 'buyoff abort' ? Warning : Close,
          type: message === 'buyoff success' ? 'success' : message === 'buyoff abort' ? 'warning' : 'danger',
          size: 'large'
        }
      default:
        return {
          timestamp: '',
          headerContent: '',
          content: ''
        }
    }
  })
  return timeLineItem
})

onBeforeMount(() => {
  console.log(timelineRow.value)
})
const dialogClose = () => {
  emit('close')
}
</script>
