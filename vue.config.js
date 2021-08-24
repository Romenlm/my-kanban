// 项目配置
const path = require("path");
const resolve = (p) => path.join(__dirname, p);
module.exports = {
  pages: {
    index: {
      entry: "src/render/main.js",
      template: "src/render/public/index.html",
      filename: "index.html",
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@components", resolve("./src/render/components"))
      .set("@common", resolve("./src/render/common"));
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "src/background.js",
      preload: "src/preload.js",
      builderOptions: {
        appId: "com.luomenlm.app",
        productName: "my-kanban", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "luomenlm © 2021", //版权信息
        directories: {
          output: "./dist_electron_build", //输出文件路径
        },
        win: {
          //win相关配置
          icon: "./icons/win/icon.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              arch: [
                "x64", //64位
              ],
            },
          ],
        },
        linux: {
          icon: "./icons/png/",
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "./icons/win/icon.ico", // 安装图标
          uninstallerIcon: "./icons/win/icon.ico", //卸载图标
          installerHeaderIcon: "./icons/win/icon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "demo", // 图标名称
        },
      },
    },
  },
};
