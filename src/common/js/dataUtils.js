import {
  isNumber
} from "util";
// import { dateFormat } from 'vux'

//数据验证过滤

export const dataUtils = {

  //判断是否数字
  checkRate(nubmer) {
    var re = /^[0-9]*[1-9][0-9]*$/; //判断字符串是否为数字 /^[0-9]+.?[0-9]*/    //判断正整数/[1−9]+[0−9]∗]∗/
    if (!re.test(nubmer)) {
      return false;
    }
    return true;
  },

  //身份证判断
  isCardID(sId) {
    var aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
    var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return "你输入的身份证号非法";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
  },

  //手机判断
  isTel(tel) {
    let reg = /^1[0-9]{10}$/;
    if (!reg.test(tel)) {
      return "填写完整的11位手机号码！"
    }
    return true;
  },

  //名称判断
  isPatName(tel) {
    let namereg = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!namereg.test(tel)) {
      return "请输入两个到四个汉字的名字"
    }
    return true;
  },

  //截取带T的日期
  interceptDate(date) {
    return date.split("T")[0]
  },

  //分转元
  pointsTrunRMB(vlue, num) {
    try {
      return (vlue / 100).toFixed(num)
    } catch (error) {
      // console.log('数字转换错误')
      return 0;
    }
  },
  changedatetype(val, type) {
    //   return dateFormat(val,type)
  },
  dateToString(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    var dateTime = year + "-" + month + "-" + day;
    return dateTime;
  },
  // 计算年龄
  jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = this.interceptDate(strBirthday).split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay; //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    console.log(returnAge)
    return returnAge; //返回周岁年龄
  },
  /**
   * 判断数据的数据类型
   * @param {any} val 需要判断数据类型的数据
   * @return  String / Number /  Boolean / Undefined / Function / Date / RegExp / Error
   */
  dataType(val) {
    return Object.prototype.toString.call(val).replace(/\[|\]/g, '').split(' ')[1];
  }
}