# gtwr_portal

## 项目概述

这个项目的预期是希望能够搭建一个门户原型实现GTWR计算，包括如下几个功能：

* 支持登录，用户可选择匿名登录或实名注册

* 支持用户自定义GTWR计算的源数据类型

* 支持数据预览以及计算前对源数据的简单统计及可视化

* 支持用户自定义计算参数

* 支持用户对计算结果的预览、简单统计以及可视化

## 项目工具

项目门户搭建过程中计划使用如下的工具或框架：

* HTML/JS/CSS前端开发基础语言

项目中的语言是前端开发的基础语言：
	* HTML为文档标记语言显示页面显示的结构，如``<div></div>``等结构；
	* CSS为页面显示内容的样式，如，``.box{width:20px}``；
	* JS用于定义页面中的交互、效果等，如``var box = document.getElementById(id)``。

* SASS扩展语言

项目中的样式定义使用SASS扩展语言。SASS是在CSS的基础上，定义了很多便捷的语法和特性，能够使样式的定义更为方便，它的作用与CSS一致也是用于定义样式，SASS的教程[戳这里](https://www.sass.hk/)，如果不使用SASS的特性（诸如定义变量、混入、继承等）其与CSS是没有区别的。

* Vue.js渐进式前端开发框架

项目主体使用Vue.js搭建前端框架，该框架提供了组件式开发和双向数据绑定等特性，也拥有自己一些模板语言和API能够辅助某些功能更为便捷的实现，Vue教程[戳这里](https://cn.vuejs.org/)

* Github & Git配合的版本管理

项目使用Git和GitHub配合管理，以方便团队合作进行项目的更新：GitHub是项目的远程仓库，存放用于共享的项目文件；Git用于提交更新文件，方便多人合作进行版本更新。

已经在GitHub搭建了仓库，[gtwr_vue仓库地址](https://github.com/GTWR/gtwr_vue)，Git和GitHub的关系理解教程，[戳这里](http://blog.jobbole.com/111187/)，Git教程[戳这里](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。

* Echarts

项目中统计图表的设计和实现使用的是Echarts图标库，其教程[戳这里](http://echarts.baidu.com/)

* Leaflet

项目中地图的交互实现使用的是leaflet地图API，其教程[戳这里](https://leafletjs.com/index.html)

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
$ git pull //拉取远程仓库中的更新
$ git add . //添加修改
$ git commit -m "你自己修改内容的标题" //提交更新到暂存区
$ git push origin master //提交分支暂存到远程仓库
```

* 如果提交过程存在冲突，自行百度Git相关命令解决，建议首次使用git提交前进行文件备份！！！