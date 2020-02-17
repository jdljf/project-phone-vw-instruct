/**
 * apis 接口的统一出口
 */
const modulesFiles = require.context("./apis", false, /\.js$/)

const apis = modulesFiles.keys().reduce((modules, modulePath) => {
    // 把 './apis/user.js' => 'user'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default apis
