# gtwr_portal

## 项目概述

这个项目的预期是希望能够搭建一个门户原型实现GTWR计算，包括如下几个功能：

* 支持登录，用户可选择匿名登录或实名注册

* 支持用户自定义GTWR计算的源数据类型，包括图片？Excel/csv表格？json/geojson数据？

* 支持数据预览以及计算前对源数据的简单统计及可视化

* 支持用户自定义计算参数

* 支持用户对计算结果的预览、简单统计以及可视化

## 项目工具

项目门户搭建过程中计划使用如下的工具或框架：

* Vue.js渐进式前端开发框架

使用Vue.js搭建前端框架，Vue教程[戳这里](https://cn.vuejs.org/)

* Github & Git配合的版本管理

GitHub是项目的远程仓库，存放用于共享的项目文件；Git用于提交更新文件，方便多人合作进行版本更新。

已经在GitHub搭建了仓库，[gtwr_vue仓库地址](https://github.com/GTWR/gtwr_vue)，Git和GitHub的关系理解教程，[戳这里](http://blog.jobbole.com/111187/)。

* Express发布数据查询服务

用Express在后端发布数据查询服务，Express教程[戳这里](http://www.expressjs.com.cn/)，后期的GTWR计算会涉及到其他的接口设计，先不做考虑。

* SASS扩展语言

基于SASS定义CSS样式，当然还是可以用原始的CSS文件定义样式，自由选择，SASS的教程[戳这里](https://www.sass.hk/)

* Echarts

## 项目配置

### 下载安装node

* node安装教程，[戳这里](http://www.runoob.com/nodejs/nodejs-install-setup.html)，建议安装最新版本。
* 下面会用到npm进行node相关工具的安装，npm随node一起下载，无需单独安装，npm的教程和功能理解，[戳这里](http://www.runoob.com/nodejs/nodejs-npm.html)

### 安装cnpm

* 国内运行npm较慢，且容易出现各种各样的问题，因此一般使用npm的淘宝镜像进行安装，即cnpm
```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 下载安装git

* git下载地址，[戳这里](https://gitforwindows.org/)
* git安装教程，[戳这里](https://jingyan.baidu.com/article/020278117cbe921bcc9ce51c.html)

### 克隆项目文件

* 在你喜欢的路径下，单机右键选择Git Bash Here
* 在命令面板下输入命令，将存储在远程仓库的项目文件拷贝在本地
```
git clone https://github.com/GTWR/gtwr_vue.git
```
* 你就可以看到在你喜欢的路径下出现了gtwr_vue这个文件

### 运行项目

* 安装项目依赖包：在cmd中选择项目所在路径

```
cnpm install

npm run dev
```

* 浏览器自动打开端口为8080的页面

### 提交版本更新

* 在项目地址下，打开Git Bash Here

```
$ git checkout -b dev //切换本地分支
$ git commit -m "update revise" //提交更新到暂存区
$ git push origin dev //提交分支暂存到远程仓库
```

* 如果提交过程存在冲突，自行百度Git相关命令解决，建议首次使用git提交前进行文件备份！！！

## 项目更新日志

### 2018.3.25

负责人： 李晨悦

工作内容：

* 登录页面底图调用高德地图API实现缩放功能

* 应用案例滚动展示窗，实现应用案例图片的轮播，采用父子组件实现，子组件在Carousel.vue中实现，然后在login.vue中调用。应用案例图片采用echart的简单地图截图。

负责人：张敏

工作内容：

* 设计实现主体页面布局，及其样式定义，页面中包含参数自定义面板、数据选择面板、地图展示面板、数据表格面板

* 实现了各面板中简单的组件，例如数据选择列表实现，参数自定义面板输入框实现，以及基础底图加载

页面截图
![](/project_update_gif/20180325_yue_gemma.gif)





