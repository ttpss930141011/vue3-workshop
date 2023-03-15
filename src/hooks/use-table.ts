import { ref } from 'vue'
import momentMini from 'moment-mini'
import { ElMessage, ElMessageBox } from 'element-plus'
export const useTable = (searchForm, selectPageReq) => {
  /*define ref*/
  const tableListData = ref([])
  const totalPage = ref(0)
  const pageNum = ref(1)
  const pageSize = ref(20)

  //列表請求
  const tableListReq = (config) => {
    const data = Object.assign(
      {
        pageNum: pageNum.value,
        pageSize: pageSize.value
      },
      JSON.parse(JSON.stringify(searchForm))
    )
    Object.keys(data).forEach((fItem) => {
      if (['', null, undefined, Number.NaN].includes(data[fItem])) delete data[fItem]
      if (config.method === 'get') {
        if (Array.isArray(data[fItem])) delete data[fItem]
        if (data[fItem] instanceof Object) delete data[fItem]
      }
    })
    const reqConfig = {
      data,
      ...config
    }
    return axiosReq(reqConfig)
  }

  /**
   * 日期範圍選擇處理
   * @param timeArr choose the time
   * @date 2022/9/25 14:02
   */
  const dateRangePacking = (timeArr) => {
    if (timeArr && timeArr.length === 2) {
      searchForm.startTime = timeArr[0]
      //取今天23點
      if (searchForm.endTime) {
        searchForm.endTime = momentMini(timeArr[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
    } else {
      searchForm.startTime = ''
      searchForm.endTime = ''
    }
  }
  //當前頁
  const handleCurrentChange = (val) => {
    pageNum.value = val
    selectPageReq()
  }
  const handleSizeChange = (val) => {
    pageSize.value = val
    selectPageReq()
  }
  const resetPageReq = () => {
    pageNum.value = 1
    selectPageReq()
  }

  /*多選*/
  const multipleSelection = ref<Array<ObjKeys>>([])
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  /*批量刪除*/
  const multiDelBtnDill = (reqConfig) => {
    let rowDeleteIdArr: Array<string> = []
    let deleteNameTitle = ''
    rowDeleteIdArr = multipleSelection.value.map((mItem) => {
      deleteNameTitle = `${deleteNameTitle + mItem._id},`
      return mItem._id
    })
    if (rowDeleteIdArr.length === 0) {
      ElMessage.warning('表格選項不能為空')
      return
    }
    const stringLength = deleteNameTitle.length - 1
    ElMessageBox.confirm('刪除', `您確定要刪除【${deleteNameTitle.slice(0, stringLength)}】嗎`).then(() => {
      const data = { rowDeleteIdArr }
      axiosReq({
        data,
        method: 'DELETE',
        bfLoading: true,
        ...reqConfig
      }).then(() => {
        ElMessage.success('刪除成功')
        resetPageReq()
      })
    })
  }
  //單個刪除
  const tableDelDill = (row, reqConfig) => {
    ElMessageBox.confirm('確定', `您確定要刪除【${row._id}】嗎？`).then(() => {
      axiosReq(reqConfig).then(() => {
        resetPageReq()
        ElMessage.success(`【${row._id}】刪除成功`)
      })
    })
  }

  return {
    pageNum,
    pageSize,
    totalPage,
    tableListData,
    tableListReq,
    dateRangePacking,
    multipleSelection,
    handleSelectionChange,
    handleCurrentChange,
    handleSizeChange,
    resetPageReq,
    multiDelBtnDill,
    tableDelDill
  }
}
