export default {
  router: {
    Home: '首頁',
    LowCodePlatFrom: '低代碼平台',
    RBAC: '用戶權限角色',
    'Setting Switch': '設定文件',
    'Error Log': '錯誤日誌',
    'Error Index': '錯誤日誌列表',
    'Error Generator': '錯誤日誌生成',

    Nested: '路由嵌套',
    Menu1: '菜單1',
    'Menu1-1': '菜單 1-1',
    'Menu1-2': '菜單 1-2',
    'Menu1-2-1': '菜單 1-2-1',
    'Menu1-2-2': '菜單 1-2-2',
    'Menu1-3': '菜單 1-3',
    menu2: '菜單 2',

    'External Link': '外鏈',

    'Basic Demo': '基礎例子',
    Hook: 'hook',
    Pinia: 'pinia',
    Mock: 'mock',
    'Svg Icon': 'svg使用',
    'Parent Children': '父子組件通信',
    'Second KeepAlive': '二級路由緩存',
    'Tab KeepAlive': 'tab緩存',
    'Third KeepAlive': '三級路由緩存',
    SecondChild: '三級路由示例1',
    ThirdChild: '三級路由示例2',
    Worker: '多線程',
    Permission: '權限路由',
    'Permission Switch': '權限切換',
    'Role Index': '角色權限',
    'Code Index': 'Code權限',
    'Button Permission': '按鈕權限',

    Charts: '圖表',
    Excel: 'Excel',
    'Rich Text': '富文本',
    Table: '表格',
    Guid: '使用引導',
    Other: '其他'
  },

  tagsView: {
    Refresh: '刷新',
    Close: '關閉當前',
    'Close Others': '關閉其他',
    'Close All': '關閉所有'
  },
  navbar: {
    Home: '首頁',
    Github: '項目git地址',
    Docs: '官方文檔',
    'Login out': '退出登入',
    base: '預設',
    lighting: '淺色',
    red: '紅色',
    dark: '深色'
  },
  //page
  home: {
    'switch theme': '切換主題色',
    'switch size': '切換尺寸',
    'switch language': '切換語言',
    en: 'English',
    zh: '中文',
    'Button Group': '按鈕組',
    'unocss using': 'unocss使用',
    'global var': '全局靜態變量',
    placeholder: '關鍵字搜尋',
    newBom: '等待Release',
    waiting: '等待驗證',
    bomCancel: '已取消',
    buyoffPass: '驗證通過'
  },
  'admin-dialog': {
    quickEditTo: '快速修改至',
    manualModification: '手動修改',
    automaticModification: '自動修改'
  },
  'error-log': {
    log: '錯誤日誌',
    pageUrl: '頁面路徑',
    startDate: '開始日期',
    endDate: '結束日期',
    github: 'Github 地址',
    search: '查詢',
    reset: '重置',
    multiDel: '批量刪除'
  }
  // permission: {
  //   addRole: '新增角色',
  //   editPermission: '編輯權限',
  //   roles: '你的權限',
  //   switchRoles: '切換權限',
  //   tips:
  //     '在某些情況下，不適合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它動態渲染 dom 的場景。你只能通過手動設置 v-if 來實現。 ',
  //   delete: '刪除',
  //   confirm: '確定',
  //   cancel: '取消'
  // },
  // guide: {
  //   description: '引導頁對於一些第一次進入項目的人很有用，你可以簡單介紹下項目的功能。本 Demo 是基於',
  //   button: '打開引導'
  // },
  // components: {
  //   documentation: '文檔',
  //   tinymceTips:
  //     '富文本是管理後台一個核心的功能，但同時又是一個有很多坑的地方。在選擇富文本的過程中我也走了不少的彎路，市面上常見的富文本都基本用過了，最終權衡了一下選擇了Tinymce。更詳細的富文本比較和介紹見',
  //   dropzoneTips:
  //     '由於我司業務有特殊需求，而且要傳七牛 所以沒用第三方，選擇了自己封裝。代碼非常的簡單，具體代碼你可以在這裡看到 @/components/Dropzone',
  //   stickyTips: '當頁面滾動到預設的位置會吸附在頂部',
  //   backToTopTips1: '頁面滾動到指定位置會在右下角出現返回頂部按鈕',
  //   backToTopTips2:
  //     '可自定義按鈕的樣式、show/hide、出現的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
  //   imageUploadTips:
  //     '由於我在使用時它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的話，優先還是使用官方版本。 '
  // },
  // table: {
  //   dynamicTips1: '固定表頭, 按照表頭順序排序',
  //   dynamicTips2: '不固定表頭, 按照點擊順序排序',
  //   dragTips1: '默認順序',
  //   dragTips2: '拖拽後順序',
  //   title: '標題',
  //   importance: '重要性',
  //   type: '類型',
  //   remark: '點評',
  //   search: '搜索',
  //   add: '添加',
  //   export: '導出',
  //   reviewer: '審核人',
  //   id: '序號',
  //   date: '時間',
  //   author: '作者',
  //   readings: '閱讀數',
  //   status: '狀態',
  //   actions: '操作',
  //   edit: '編輯',
  //   publish: '發布',
  //   draft: '草稿',
  //   delete: '刪除',
  //   cancel: '取 消',
  //   confirm: '確 定'
  // },
  // example: {
  //   warning:
  //     '創建和編輯頁面是不能被 keep-alive 緩存的，因為keep-alive 的 include 目前不支持根據路由來緩存，所以目前都是基於 component name 來進行緩存的。如果你想類似的實現緩存效果，可以使用 localStorage 等瀏覽器緩存方案。或者不要使用 keep-alive 的 include，直接緩存所有頁面。詳情見'
  // },
  // errorLog: {
  //   tips: '請點擊右上角bug小圖標',
  //   description:
  //     '現在的管理後台基本都是spa的形式了，它增強了用戶體驗，但同時也會增加頁面出問題的可能性，可能一個小小的疏忽就導致整個頁面的死鎖。好在 Vue 官網提供了一個方法來捕獲處理異常，你可以在其中進行錯誤處理或者異常上報。 ',
  //   documentation: '文檔介紹'
  // },
  // excel: {
  //   export: '導出',
  //   selectedExport: '導出已選擇項',
  //   placeholder: '請輸入文件名(默認excel-list)'
  // },
  // zip: {
  //   export: '導出',
  //   placeholder: '請輸入文件名(默認file)'
  // },
  // pdf: {
  //   tips: '這裡使用   window.print() 來實現下載pdf的功能'
  // },
  // theme: {
  //   change: '換膚',
  //   documentation: '換膚文檔',
  //   tips: 'Tips: 它區別於 navbar 上的 theme-pick, 是兩種不同的換膚方法，各自有不同的應用場景，具體請參考文檔。 '
  // },
  // tagsView: {
  //   refresh: '刷新',
  //   close: '關閉',
  //   closeOthers: '關閉其它',
  //   closeAll: '關閉所有'
  // },
  // settings: {
  //   title: '系統佈局設定',
  //   theme: '主題色',
  //   tagsView: '開啟 Tags-View',
  //   fixedHeader: '固定 Header',
  //   sidebarLogo: '側邊欄 Logo'
  // }
}
