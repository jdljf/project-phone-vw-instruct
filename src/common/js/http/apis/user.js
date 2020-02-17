import {
  ajax
} from '../ajax.js'

/**
 * 用户模块的接口
 */
export default {
  Login({
    userName,
    password
  }) {
    return ajax.post(`/User/Login`, {
      userName,
      password
    })
  }
}