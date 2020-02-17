/**
 * vue-cli3.x 的配置文件
 */
"use strict"
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const path = require("path")
const webpack = require("webpack")
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")

const port = 8080 // dev port
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true, // 生产环境去除打包生成的 .map 文件
  devServer: {
    port: port, // 端口号
    open: true, // 自动打开浏览器
    overlay: {
      warnings: false,
      errors: true
    },
    sockHost: 'KrHms',
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-import"),
          require("postcss-url"),
          require("postcss-aspect-ratio-mini"),
          require("postcss-write-svg")({
            utf8: false
          }),
          require("postcss-cssnext"),
          require("postcss-px-to-viewport")({
            viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false // 允许在媒体查询中转换`px`
          }),
          require("postcss-viewport-units"),
          require("cssnano")({
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
          })
        ]
      },
    }
  },
  // 个性化配置
  configureWebpack: config => {
    // 生产环境配置
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.plugins.push(
        // 用这个插件缩小 js
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false, // 关闭警告
            compress: {
              drop_debugger: true, // 删除 debugger
              drop_console: true // 删除 console.log
            },
            output: {
              comments: false, // 不保留注释
              beautify: false // 使输出的代码尽可能紧凑
            }
          },
          cache: true, // 开启缓存
          sourceMap: false, // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
          parallel: true // 使用多进程并行运行来提高构建速度
        })
      )
    }
    // 开发环境配置
    else {
      //  运行了 npm run dll 后，webpack 公共库文件已经编译好了，减少 webpack 对公共库的编译时间
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require("./public/vendor/vendor-manifest.json")
        })
      )
      config.plugins.push(
        // 将 dll 注入到 生成的 html 模板中，自动在 ./public/index.html 引入提取的公共库
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, "./public/vendor/*.js"), // dll文件位置
          publicPath: "./vendor", // dll 引用路径
          outputPath: "./vendor" // dll最终输出的目录
        })
      )
    }
  },
  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    config.plugins.delete("prefetch") // 移除 prefetch 插件
    config.plugins.delete("preload") // 移除 preload 插件

    // 添加打包文件大小预览
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
    }

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 文件路径快捷命名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))

    // 去掉 webpack 的打包文件最大体积性能提示的警告
    config.performance
      .maxEntrypointSize(50000000)
      .maxAssetSize(30000000)
      .assetFilter(function (assetFilename) {
        return assetFilename.endsWith(".js")
      })

    // 打包文件带hash
    config.output.filename("[name].[hash].js").end()

    // 优化 loader 配置
    config.module
      .rule("js")
      // 忽略node_modules
      .exclude.add(/(node_modules|bower_components)/)
      .end()
      .use("cache-loader")
      .loader("cache-loader")
      .options({
        cacheDirectory: resolve(".cache-loader") // 添加缓存
      })
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .options({
        // 不要选择本地项目babel config
        babelrc: false,
        presets: [require.resolve("@vue/babel-preset-app")]
      })
  },
  // 更换 .ico 图标
  pwa: {
    iconPaths: {
      favicon32: './favicon.ico',
      favicon16: './favicon.ico',
      appleTouchIcon: './favicon.ico',
      maskIcon: './favicon.ico',
      msTileImage: './favicon.ico'
    }
  },
}