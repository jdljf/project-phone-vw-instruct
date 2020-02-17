import axios from 'axios';
import baseUrls from '../../../../public/static/baseConfig/baseUrl'
import {
  encrypt
} from "../encrypt"
import {
  getToken
} from "@/common/js/token.js";
import Vue from 'vue'

let loading;

function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "Loading...",
    target: document.querySelector('.loading-area') //设置加载动画区域
  });
}

function endLoading() {
  loading.close();
}

//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

var settings = {
  baseURL: baseUrls.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken()
  }
}

function request(method, url, data, options = {}) {
  return axios({
    method,
    url,
    data,
    baseURL: options.baseURL || settings.baseURL,
    headers: options.headers || settings.headers,
    crossDomain: true,
    timeout: settings.timeout,
    withCredentials: options.withCredentials !== false,
  })
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = getToken()
  // 对所有POST请加密，必须是json数据提交，不支持表单
  var isLogin = config.url.indexOf('/User/Login');
  if (config.data != "" && isLogin == -1) {
    config.data = {
      input: encrypt.EncryptData(config.data)
    };
  }
  showFullScreenLoading();
  return config;
}, function (error) {
  tryHideFullScreenLoading();
  Vue.$message.error({
    message: '请求超时!'
  });
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 后端返回字符串表示需要解密操作
  tryHideFullScreenLoading();
  if (typeof (response.data.data) == "string") {
    response.data.data = JSON.parse(encrypt.DecryptData(response.data.data));
  }
  console.log(response);

  return response;
}, function (error) {
  tryHideFullScreenLoading();
  return Promise.reject(error);
});


export const ajax = {
  setbaseURL(baseURL) {
    settings.baseURL = baseURL
  },
  setHeaderToken(token) {
    settings.headers.Authorization = token;
  },
  get(url, options) {
    return request("get", url, null, options);
  },
  post(url, data, options) {
    return request("post", url, data, options);
  },
  delete(url, data, options) {
    return request("delete", url, data, options);
  },
  put(url, data, options) {
    return request("put", url, data, options);
  },
  request: request
}