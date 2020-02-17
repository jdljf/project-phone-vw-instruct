/**
 * 加快编译速度配置文件，把第三方库文件提取出来
 */
const path = require("path")
const webpack = require("webpack")
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin")

// dll文件存放的目录
const dllPath = "public/vendor"

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: ["vue", "vue-router", "vuex", "axios"]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: "[name]_[hash]"
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  plugins: [
    // 清除之前的dll文件
    // new CleanWebpackPlugin({
    //   dry: true,
    //   root: path.join(__dirname, dllPath)
    // }),
    new CleanWebpackPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "production"
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      // 保持与 output.library 中名称一致
      name: "[name]_[hash]",
      context: process.cwd()
    })
  ]
}