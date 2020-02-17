import {
  encrypt
} from "./encrypt"
import funs from "@/common/js/funs.js";

class WebStorage {
  constructor(instance) {
    this.instance = instance;
  }
  /**
   * 获取 storage 里的数据
   * @param {string} key 想获取的数据的字段
   * @param {boolen} valEncrypt 是否需要解密，默认是需要
   */
  get(key, valEncrypt = false) {
    let value = this.instance.getItem(key)

    if (funs.isUndef(value) || funs.strTrim(value) === '') {
      return '{}'
    } else {
      return valEncrypt ?
        encrypt.DecryptStorage(value) :
        value
    }
  }
  /**
   * 保存数据到 storage 
   * @param {string} key 想要保存的数据的字段
   * @param {string} value 想要保存的数据，数据格式是字符串或者对象
   * @param {boolen} needDncrypt 数据是否需要加密，默认是需要
   */
  set(key, value, valDecrypt = false) {
    let strVal = typeof value === 'string' ? value : JSON.stringify(value)

    if (valDecrypt) {
      strVal = encrypt.EncryptStorage(strVal)
    }

    this.instance.setItem(key, strVal);
  }
  /**
   * 删除某个 storage 的数据
   * @param {string} key 要删除的数据
   */
  delete(key) {
    this.instance.removeItem(key);
  }
  /**
   *清空 storage
   */
  clear() {
    this.instance.clear();
  }
}

const memoryMap = new Map();

export const storage = {
  local: new WebStorage(localStorage),
  session: new WebStorage(sessionStorage),
  memory: {
    get(key) {
      return memoryMap.get(key);
    },
    set(key, value) {
      memoryMap.set(key, value);
    },
    delete(key) {
      memoryMap.delete(key);
    },
    clear() {
      memoryMap.clear();
    }
  },
  cookie: {
    get(key) {
      let cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        let cArr = cookie.split('=');
        if (cArr[0].trim() === key) {
          return cArr[1];
        }
      }
      return null;
    },
    set(key) {}
  }
};