export default {
  /**
   * 格式化时间
   * @param date 日期
   * @param format 需要转出的格式
   * @returns {*}
   */
  dateTimeFormatter(date, format, offset = 0) {
    if (!date || date === '') {
      return ''
    }
    if (typeof date === 'string') {
      const mts = date.match(/(\/Date\((\d+)\)\/)/)
      if (mts && mts.length >= 3) {
        date = Number.parseInt(mts[2])
      }
    }
    date = new Date(date - offset)
    if (!date || date.toUTCString() === 'Invalid Date') {
      return ''
    }
    const map = {
      M: date.getMonth() + 1, // 月份
      d: date.getDate(), // 日
      h: date.getHours(), // 小时
      m: date.getMinutes(), // 分
      s: date.getSeconds(), // 秒
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
      let v = map[t]
      if (v !== undefined) {
        if (all.length > 1) {
          v = `0${v}`
          v = v.slice(-2)
        }
        return v
      } else if (t === 'y') {
        return `${date.getFullYear()}`.slice(4 - all.length)
      }
      return all
    })

    return format
  },
  getWeek() {
    return `星期${'日一二三四五六'.charAt(new Date().getDay())}`
    // this.showDate=this.$momentMini(new Date()).format('YYYY年MM月DD日，')+str
  },
  /* 表单验证*/
  // 匹配手机
  mobilePhone(str) {
    const reg = /^0?1[0-9]{10}$/
    return reg.test(str)
  },
  /*
   * 传入一串num四个 一个空格
   * */
  // toSplitNumFor(num, numToSpace) {
  //   return num.replace(/(.{4})/g, '$1 ')
  // },
  // 匹配银行卡号
  bankCardNo(str) {
    const reg = /^\d{15,20}$/
    return reg.test(str)
  },
  // 邮箱
  regEmail(str) {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(str)
  },
  // 省份证
  idCardNumber(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
  },
  /* 常用数组操作*/
  /*
   * 删除数组中的指定元素
   * arrItem 数组的index下标
   * return 删除后的数组
   * */
  deleteArrItem(arr, arrItem) {
    arr.splice(arr.indexOf(arrItem), 1)
  },
  /*
   *  数组去重
   *  arr：要去重的数组
   *  return 去重后的数组
   * */
  arrToRepeat(arr) {
    return arr.filter((ele, index, thisArr) => {
      // 因为indexOf返回元素出现的第一个index位置,如果有重复的话那么他的位置永远是第一次出现的index,这就与他本身的index不相符,则删掉.
      return thisArr.indexOf(ele) === index
    })
  },
  /*
   * 数组去重
   * seriesArr: 数组
   * return 去重后的数组
   * */
  deRepeatArr(seriesArr) {
    return [...new Set(seriesArr)]
  },
  /*
   * 根据arrObj 删除arrObj2   根据arrObj objKey查找删除
   * arrObj: 数组对象
   * arrObj2: 要被删除的对象
   * objKey： arrObj中对象的某一个key名称
   * return: arrObj2删除过后的数组
   * */
  byArrObjDeleteArrObj2(arrObj, arrObj2, objKey) {
    arrObj
      .map((value) => {
        return value[objKey]
      })
      .forEach((value2) => {
        arrObj2.splice(
          arrObj2.findIndex((item) => item[objKey] === value2),
          1
        )
      })
    return arrObj2
  },
  /*
   * 删除arrObj某一项 根据objKey中的key的值等于value的值
   * arrObj: 数组对象
   * objKey：arrObj中对象的某一个key名称
   * return: arrObj删除过后的数组
   * */
  deleteArrObjByKey(arrObj, objKey, value) {
    //foreach splice
    //for substring  slice 不改变原数组
    arrObj.splice(
      arrObj.findIndex((item) => item[objKey] === value),
      1
    )
    return arrObj
  },
  /*
   * 查找arrObj某一项 根据objKey中的值
   * arrObj: 数组对象
   * objKey：arrObj中对象的某一个key名称
   * return: arrObj查找 过后的数组
   * */
  findArrObjByKey(arrObj, objKey, value) {
    return arrObj[arrObj.findIndex((item) => item[objKey] == value)]
  },
  /*
   * 根据arrObj 筛选arrObj2   根据arrObj objKey值查找
   * arrObj: 数组对象
   * arrObj2: 要被删除的对象
   * objKey： arrObj中对象的某一个key名称
   * return: arrObj2删除过后的数组
   * */
  byArrObjFindArrObj2(arrObj, arrObj2, objKey) {
    const arrObj3: Array<any> = []
    arrObj
      .map((value) => {
        return value[objKey]
      })
      .forEach((value2) => {
        const arrIndex = arrObj2.findIndex((item) => item[objKey] === value2)
        if (arrIndex !== -1) {
          arrObj3.push(arrObj2[arrIndex])
        }
      })
    return arrObj3
  }
}

/**
 * 計算兩個時間差
 * @param {Data} startTime 開始時間（xxxx-xx-xx）
 * @param {Data} endTime   結束時間（xxxx-xx-xx）
 * return xx年xx天  || xx天xx小時 || xx小時xx分
 */

export function getDateDiff(startTime: Date, endTime: Date) {
  let timeOff = endTime.getTime() - startTime.getTime() // 相差時間戳（毫秒數）
  return convertTimeOffToString(timeOff)
}
/**
 * 取得明文時間
 * @param {Number} timeOff（毫秒數）
 * @returns*/
export function convertTimeOffToString(timeOff: number) {
  let timeSecond = 1000
  let timeMinute = 1000 * 60
  let timeHour = 1000 * 3600
  let timeDay = 1000 * 3600 * 24
  let timeYear = 1000 * 3600 * 24 * 365
  if (timeOff / timeYear >= 1) {
    return Math.round(timeOff / timeYear) + '年' + Math.round((timeOff % timeYear) / timeDay) + '天'
  } else if (timeOff / timeDay >= 1) {
    return Math.round(timeOff / timeDay) + '天' + Math.round((timeOff % timeDay) / timeHour) + '小時'
  } else if (timeOff / timeHour >= 1) {
    return Math.round(timeOff / timeHour) + '小時' + Math.round((timeOff % timeHour) / timeMinute) + '分'
  } else if (timeOff / timeMinute >= 1) {
    return Math.round(timeOff / timeMinute) + '分' + Math.round((timeOff % timeMinute) / timeSecond) + '秒'
  } else {
    return Math.round(timeOff / timeSecond) + '秒'
  }
}
