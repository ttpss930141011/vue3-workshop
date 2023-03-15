<template>
  <div class="scroll-y">
    <el-input v-model="search" :placeholder="t('home.placeholder')" clearable class="input-with-select">
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <div class="rowBC" style="margin-top: 10px">
      <el-tabs v-model="tabletype" @tab-change="fetchData()">
        <el-tab-pane :label="t('home.newBom')" name="等待Release" />
        <el-tab-pane :label="t('home.waiting')" name="等待驗證" />
        <el-tab-pane :label="t('home.bomCancel')" name="Cancel" />
        <el-tab-pane :label="t('home.buyoffPass')" name="Buyoff Pass" />
      </el-tabs>
    </div>
    <el-table
      :data="filterTableData"
      style="width: 100%"
      border
      :height="tablehight"
      :default-sort="{ prop: 'bomNo', order: 'ascending' }"
    >
      <el-table-column type="index" min-width="40" fixed />
      <el-table-column
        label="Bom No.file"
        prop="bomNo"
        min-width="140"
        sortable
        :sort-orders="['ascending', 'descending']"
      >
        <template #default="scope">
          <el-button link size="small" type="primary" @click="handleTimeline(scope.$index, scope.row)">
            {{ scope.row.bomNo }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Owner" prop="owner" min-width="80" sortable :sort-orders="['ascending', 'descending']" />
      <el-table-column
        label="Lead time"
        min-width="80"
        width="100"
        sortable
        :sort-orders="['ascending', 'descending']"
        :formatter="(row) => getDateDiff(new Date(row.createdAt), new Date())"
      />
      <el-table-column
        label="Last updated"
        prop="updatedAt"
        min-width="80"
        width="170"
        sortable
        :sort-orders="['ascending', 'descending']"
        :formatter="(row) => dayjs(row.updatedAt).locale('zh-tw').format('YYYY/MM/DD HH:mm:ss')"
      />
      <el-table-column
        label="Created time"
        prop="createdAt"
        min-width="80"
        width="170"
        sortable
        :sort-orders="['ascending', 'descending']"
        :formatter="(row) => dayjs(row.createdAt).locale('zh-tw').format('YYYY/MM/DD HH:mm:ss')"
      />
      <el-table-column
        v-if="type !== 'new'"
        label="Pgm zip"
        prop="userProgram"
        min-width="150"
        width="250"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        v-if="type !== 'new'"
        label="MP folder"
        prop="msPath"
        min-width="180"
        width="350"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Platfrorm"
        prop="platform"
        min-width="100"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Customer"
        prop="customer"
        min-width="100"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <!-- <el-table-column
        label="Customer code"
        prop="CustomerCode"
        min-width="100"
				width="120"
        sortable
        :sort-orders="['ascending', 'descending']"
      /> -->
      <el-table-column
        label="Device Family"
        prop="family"
        width="200"
        min-width="120"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Test program"
        prop="program"
        min-width="140"
        width="300"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Program version"
        prop="version"
        min-width="145"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Target device"
        prop="targetDevice"
        width="200"
        min-width="150"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column label="Stage" prop="stage" min-width="80" sortable :sort-orders="['ascending', 'descending']" />
      <el-table-column label="Step" prop="step" min-width="80" sortable :sort-orders="['ascending', 'descending']" />
      <el-table-column
        label="SiteMap"
        prop="sitemap"
        min-width="90"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column label="Plant" prop="plant" min-width="80" sortable :sort-orders="['ascending', 'descending']" />
      <!-- <el-table-column label="SQL ID" prop="sqlId" min-width="80" sortable :sort-orders="['ascending', 'descending']" /> -->

      <el-table-column
        v-if="type == 'new' || type == 'waiting'"
        align="center"
        label="Action"
        fixed="right"
        min-width="150"
      >
        <template #default="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <editDialog
      v-if="editModalShow && editRow"
      :edit-row="editRow"
      @close="editModalShow = false"
      @refresh="fetchData()"
    />

    <timelineDialog
      v-if="timelineModalShow && timelineRow"
      :timeline-row="timelineRow"
      @close="timelineModalShow = false"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Search } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import editDialog from './components/editDialog.vue'
import timelineDialog from './components/timelineDialog.vue'
import type { RowData } from '~/home'
import settings from '@/settings'
// import { getBomlistReq } from '@/api/bom'
import { getDateDiff } from '@/utils/common-util'

const { t } = useI18n()

const tablehight = computed(() => {
  const size = localStorage.getItem('size') || settings.defaultSize
  switch (size) {
    case 'large':
      return `calc(100vh - 250px)`
    case 'default':
      return `calc(100vh - 235px)`
    default:
      return `calc(100vh - 210px)`
  }
})
const tabletype = ref('等待Release')

const type = computed(() => {
  switch (tabletype.value) {
    case '等待Release': {
      return 'new'
    }
    case '等待驗證': {
      return 'waiting'
    }
    case 'Buyoff Fail': {
      return 'fail'
    }
    case 'Cancel': {
      return 'cancel'
    }
    default: {
      return 'pass'
    }
  }
})
const search = ref('')
const filterTableData = computed<RowData[]>(() => {
  return tableData.value.filter((data) => {
    return Object.keys(data).some((key) => {
      return String(data[key]).toLowerCase().includes(search.value.toLowerCase().trim())
    })
  })
})
const editDialogInfo = reactive<{ editRow: null | RowData; editModalShow: boolean }>({
  editRow: null,
  editModalShow: false
})
const { editRow, editModalShow } = toRefs(editDialogInfo)
const handleEdit = (index, row: RowData) => {
  editModalShow.value = true
  editRow.value = row
}

const timelineDialogInfo = reactive<{ timelineRow: null | RowData; timelineModalShow: boolean }>({
  timelineRow: null,
  timelineModalShow: false
})
const { timelineRow, timelineModalShow } = toRefs(timelineDialogInfo)
const handleTimeline = (index, row: RowData) => {
  timelineModalShow.value = true
  timelineRow.value = row
}

const tableData = ref<RowData[]>([])

const fetchData = () => {
  // getBomlistReq(type.value)
  //   .then((res) => {
  //     const { data } = res
  //     tableData.value = data
  //   })
  //   .catch((err) => console.log(err))
  axios
    .get(`boms/status/${type.value}`)
    .then(({ data }) => {
      const { bomsList = [] } = data
      tableData.value = bomsList
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
onBeforeMount(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.table-actions {
  margin-inline: 5px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.el-table {
  ::v-deep(.caret-wrapper) {
    display: none;
  }
  ::v-deep(.cell) {
    white-space: pre-line;
  }
}
</style>
