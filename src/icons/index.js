import Vue from 'vue'
import BaseIcon from '@/components/common/BaseIcon/Index.vue' // svg component

// 全局注册 svg 组件
Vue.component('base-icon', BaseIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)

requireAll(req)