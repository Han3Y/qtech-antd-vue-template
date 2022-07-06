# 目录结构
```
│  .browserslistrc
│  .editorconfig
│  .env
│  .env.development
│  .gitignore
│  .prettierrc
│  babel.config.js
│  jsconfig.json
│  package-lock.json
│  package.json
│  postcss.config.js
│  README.md
│  tailwind.config.js  -----------------------------------#tailwindcss 配置文件
│  vue.config.js
│  yarn.lock
│        
├─config
│      plugin.config.js
│      themePluginConfig.js
│      
├─deploy
│      caddy.conf
│      nginx.conf
│      
├─docs
│      add-page-loading-animate.md
│      webpack-bundle-analyzer.md
│      
│                  
├─public  -----------------------------------------------# 静态资源目录
│  │  index.html
│  │  
│  └─static
│      └─logo  ------------------------------------------# 公司logo，使用绝对路径引用，方便打包后替换
│              head_logo.png-----------------------------# 主页左上角logo
│              login_logo.png----------------------------# 登录页logo
│              logo_version.png--------------------------# 版本信息logo
│              
└─src
    │  App.vue
    │  global.less
    │  index.css
    │  main.js
    │  permission.js
    │  tree.txt
    │  
    ├─api  ----------------------------------------------# 全局或通用http请求
    │      common.js
    │      login.js
    │      manage.js
    │      
    ├─assets
    │  ├─configFile
    │  │      
    │  ├─icons ------------------------------------------# iconfont资源目录
    │  │      
    │  ├─images -----------------------------------------# 图片存放目录
    │  │          
    │  └─svgFiles ---------------------------------------# 左侧菜单自定义图标所需的文件
    │          
    ├─components ----------------------------------------# 全局组件
    │  │  Dialog.js -------------------------------------# 全局弹窗
    │  │  index.js
    │  │  index.less    
    │          
    ├─config --------------------------------------------# 项目配置文件目录
    │      app-data.js ----------------------------------# 产品信息配置文件
    │      common.js ------------------------------------# 通用信息配置文件
    │      defaultSettings.js  --------------------------# antdpro配置文件
    │      env.development.js
    │      env.production.js
    │      index.js
    │      roles.js -------------------------------------# 用户角色配置文件
    │      router.config.js -----------------------------# 路由信息配置文件
    │      uiConfig.js ----------------------------------# 样式相关配置文件
    │      
    ├─core
    │          
    ├─layouts  ------------------------------------------# 页面布局目录
    │      BasicLayout.less
    │      BasicLayout.vue
    │      BlankLayout.vue
    │      CommonLayout.vue
    │      index.js
    │      PageView.vue
    │      RouteView.vue
    │      tab.vue
    │      tabs.js  -------------------------------------# 多tab页面需要在此声明
    │      TitleTabs.vue
    │      TitleView.vue
    │      UserLayout.vue
    │      
    ├─locales
    │                  
    ├─mocker --------------------------------------------# mock接口目录
    │  │  index.js --------------------------------------# 会自动引用apis目录下的所有文件，此处可以全局注释，无需重启项目    
    │  │  mockConfig.js ---------------------------------# mock接口参数格式配置
    │  │  mockSocket.js ---------------------------------# websocket服务
    │  │  
    │  └─apis -------------------------------------------# mock接口api目录,每个模块单独一个文件
    │          demo.js
    │          fileTest.js
    │          login.js
    │          
    ├─router --------------------------------------------# 路由信息解析相关
    │      generator-routers.js
    │      index.js
    │      README.md
    │      
    ├─store  --------------------------------------------# VUEX目录
    │  │  app-mixin.js
    │  │  device-mixin.js
    │  │  getters.js
    │  │  i18n-mixin.js
    │  │  index.js
    │  │  mutation-types.js
    │  │  
    │  └─modules
    │          app.js
    │          async-router.js --------------------------# 向后台请求路由，目前未使用
    │          fileUpload.js
    │          permission.js ----------------------------# 根据用户权限解析菜单
    │          user.js
    │          
    ├─utils ---------------------------------------------# 工具类目录
    │      bus.js  --------------------------------------# eventBus
    │      domUtil.js
    │      filter.js
    │      request.js -----------------------------------# axios
    │      routeConvert.js
    │      screenLog.js
    │      sleep.js  ------------------------------------# 模拟同步阻塞
    │      storage.js -----------------------------------# localStorage
    │      timeUtil.js ----------------------------------# 日期转换
    │      util.js
    │      utils.less
    │      validator.js ---------------------------------# 类型校验在此声明
    │      Websocket.js ---------------------------------# Websocket包装类
    │      
    └─views ---------------------------------------------#  页面目录
        │  404.vue
        │   
        ├─demo ------------------------------------------#  增删改查列表模拟页
        │  │  Demo.vue
        │  │  DemoService.js
        │  │  Tab1.vue
        │  │  Tab2.vue
        │  │  
        │  └─components
        │          DemoEditModal.vue
        │          
        ├─exception
        │      403.vue
        │      404.vue
        │      500.vue
        │               
        │          
        ├─testPage --------------------------------------#  文件分片上传测试页
        │  │  TestPage.vue
        │  │  
        │  └─components
        │          FileList.vue
        │          FileUpload.vue
        │          
        ├─user
        │      Login.vue --------------------------------# 登录页
        │      Register.vue
        │      RegisterResult.vue  
                    

```

# CSS方案
  - tailwindcss 详细参考官网 https://www.tailwindcss.cn/docs
----

# antd vue 说明

- 预览: https://preview.pro.antdv.com
- 首页: https://pro.antdv.com
- 文档: https://pro.antdv.com/docs/getting-started
- 更新日志: https://pro.antdv.com/docs/changelog
- 常见问题: https://pro.antdv.com/docs/faq
- Vue3 ProLayout: https://github.com/vueComponent/pro-layout


环境和依赖
----

- node
- yarn
- webpack
- eslint
- @vue/cli
- [ant-design-vue@1.x](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - antv/g2 封装实现

> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本而引入了新版本所导致的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。



项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/vueComponent/ant-design-vue-pro.git
cd ant-design-vue-pro
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run serve
```

- 编译项目
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```



其他说明
----

- **关于 Issue 反馈 (重要!重要!重要!) 请在开 *Issue* 前，先阅读该内容：[Issue / PR 编写建议](https://github.com/vueComponent/ant-design-vue-pro/issues/90)** 

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请确保你所使用的 vue-cli 是新版，并且已经学习 cli 官方文档使用教程

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码, `vue.config.js` 下的 `lintOnSave` 值改为 `false`

- 组件按需加载 `/src/main.js` L14 相关代码 `import './core/lazy_use'` / `import './core/use'` 

- [修改 Ant Design 配色 (@kokoroli)](https://github.com/kokoroli/antd-awesome/blob/master/docs/Ant_Design_%E6%A0%B7%E5%BC%8F%E8%A6%86%E7%9B%96.md)

- I18n: [多语言支持 (@musnow)](./src/locales/index.js)

- 生产环境默认不加载 `mock`，更多详情请看 `src/mock/index.js`

- **用于生产环境，请使用 `release` 版本代码，使用 master 代码出现的任何问题需要你自行解决**
