GTWR计算平台，本网站意图辅助用户进行GWR或GTWR的在线计算，支持计算参数自定义、原始数据及计算结果的多维度可视化。该平台主要包括以下几个主要功能模块：

* 首屏展播：基于echarts-al制作3D动态可视化效果，突出平台主要内容与地理回归相关；利用轮播图展示GTWR计算的相关应用案例，包含案例来源文章基本信息、文章链接、主要图表等内容。
* 原始数据预览：平台提供示例数据，它们根据数据集分类组织为树形结构，平台支持对数据集中每一份单独属性数据的预览，预览包括数据具体内容、数据在地图上的空间可视化两部分。
* 原始数据计算：平台支持自定义计算参数，参数可选择原始数据中的数据属性，也可手动输入固定常量；开始计算后如果参数设置不完全、计算参数设置不正确或计算接口调用失败，平台都会给出错误的计算日志；如果计算成功，除计算过程的计算日志之后，还会曝光计算结果图表展示、计算结果精度评定两个入口，其中计算结果图表展示模块包含地图可视化、数据图表两部分，数据图表部分支持用户添加图表容器、自定义图表参数。

以上功能的实现依赖于Java Servlet、Leaflet地图API、Echarts图表库和Vue前端框架，平台代码仓库地址为：[https://github.com/GTWR/gtwr_vue](https://github.com/GTWR/gtwr_vue),执行过程为:

1. 下载JDK，安装并配置Java环境；下载Tomcat，安装并配置Tomcat环境，配置后打开tomcat服务。[windows环境下tomcat下载安装教程地址](https://www.cnblogs.com/beginner-boy/p/7806680.html)，[Mac环境下tomcat下载安装教程地址](https://blog.csdn.net/feng2qing/article/details/60968548)
    **注意**:  平台默认tomcat端口为8080，若端口不为8080，则需要在代码库中[gtwr_vue/src/components/ParDefiner.vue](https://github.com/GTWR/gtwr_vue/blob/master/src/components/ParDefiner.vue)中compute函数中修改变量requestUrl中端口的定义。
2. 下载node,npm以及cnpm，[node安装配置教程地址](http://www.runoob.com/nodejs/nodejs-install-setup.html)，[npm安装配置教程地址](http://www.runoob.com/nodejs/nodejs-npm.html)
3. 在[gtwr的代码库：https://github.com/GTWR/gtwr_vue](https://github.com/GTWR/gtwr_vue)中下载平台源代码
4. 将代码库路径[gtwr/src/assets/webservice/gwr_war.war](https://github.com/GTWR/gtwr_vue/tree/master/src/assets/webService)中的gwr_war.war文件放置在tomcat安装文件下webapps中
5. 在终端中打开源代码文件路径，执行如下代码安装平台依赖：
    ```
    cnpm install //安装平台的依赖工具包
    npm run dev //运行平台代码，会自动打开浏览器展示前端界面
    ```

以上的安装配置过程能够保证平台正常展示，而平台代码的修改需要熟悉代码库的代码结构，其结构如下：

<img src="project_code_structure.png" width="100%">

组件中引用的样式文件，在组件``<script>``标签开头的样式文件引用处已表明

