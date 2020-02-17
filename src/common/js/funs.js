// 共用方法
const timestampToTime = (timestamp) => {
  // 将获取的数字都转为2位数
  let change2 = (n) => {
    if (n < 10) {
      return '0' + n
    } else {
      return n
    }
  }
  let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = change2((date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)) + '-';
  let D = change2(date.getDate()) + ' ';
  let h = change2(date.getHours()) + ':';
  let m = change2(date.getMinutes()) + ':';
  let s = change2(date.getSeconds());
  return Y + M + D + h + m + s;
}

const nowtime = () => timestampToTime(Math.round(new Date().getTime() / 1000)) // 获取现在时间

/**
 * 判断是否是空
 * @param {Any} val 需要判断的值
 */
const isUndef = (val) => {
  return val === undefined || val === null
}

/**
 * 把字符串变成整数
 * @param {String} val 需要转变成整数的字符串
 * @return {Number} 转换的整数数字
 */
const becomeInteger = (val) => {
  if (typeof val === "number") {
    return val
  } else {
    let num = parseInt(val, 10)
    return isNaN(num) ? 0 : num
  }
}

/**
 * 去除字符串空格
 * @param {String} str 要处理的字符串
 * @param {Number} type 1：前后空格 2：所有空格 3：前空格 4：后空格（默认所有空格）
 */
const strTrim = (str, type = 2) => {
  if (isUndef(str)) return str
  becomeInteger(type)
  switch (type) {
    // 前后空格
    case 1:
      return str.replace(/(^\s*)|(\s*$)/g, "")
      // 所有空格
    case 2:
      return str.replace(/\s+/g, "")
      // 右边空格
    case 3:
      return str.replace(/(^\s*)/g, "")
      // 左边空格
    case 4:
      return str.replace(/(\s*$)/g, "")
    default:
      return str
  }
}

/**
 * 图片转base64码
 * @param {*} file 
 */
const getBaseUrl = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  });
}

export default {
  timestampToTime,
  nowtime,
  isUndef,
  becomeInteger,
  strTrim,
  getBaseUrl
}