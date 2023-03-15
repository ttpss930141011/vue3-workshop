/*
 * 聲明.d.ts文件規範
 * 導出的類型以大寫開頭
 * 對象：config
 * 數組：options
 * 枚舉：emu
 * 函數：Fn
 * 屬性：props
 * 實例：instance
 * */

/*rowData*/

interface TimeRecord {
	date: string
	message: string
	status: string
	user: string
}
export interface code {
  counter: number
  precode: string
}
export interface NewBomData {
  bomNo: string
  owner: string
  platform: string
  customer: string
  program: string
  version: string
  device: string
  targetDevice: string
  family: string
  source: string
  plant: string
  lotType: string
  stage: string
  step: string
  sitemap: string
  correlation: boolean
  igxlVer: string
  smartestVer: string
  productionline: string
}
export interface RowData {
  _id: string
  status: string
  correlation: boolean
  bomchange: string[]
  bomNo: string
  customer: string
  productionline: string
  plant: string
  targetDevice: string
  source: string
  family: string
  stage: string
  step: string
  device: string
  program: string
  version: string
  sitemap: string
  platform: string
  igxlVer: string
  smartestVer: string
  // Timeline: Timeline
  // sqlId: string
  createdAt: string
  createdBy: TimeRecord[]
  updatedAt: string
  updatedBy: TimeRecord[]
	buyoffBy: TimeRecord[]
  userProgram?: string
  userProgramMd5?: string
  msPath?: string
  code?: code
  bomMd5?: string
}

export interface TimeLineItem {
  timestamp: string
  headerContent: string
  content: string
  buyoffResult?: string
  icon?: DefineComponent
  type?: string
  size?: string
  color?: string
  hollow?: boolean
}
export type RouterTypes = Array<rawProp>

export {}
