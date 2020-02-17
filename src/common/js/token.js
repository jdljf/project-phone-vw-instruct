import {
  storage
} from '@/common/js/storage'

const TokenKey = 'token'

// 获取 token
export function getToken() {
  let token = storage.session.get(TokenKey)

  return token === '{}' ? "" : token
}

// 保存 token
export function setToken(token) {
  return storage.session.set(TokenKey, token, false)
}

// 移除 token
export function removeToken() {
  return storage.session.delete(TokenKey)
}