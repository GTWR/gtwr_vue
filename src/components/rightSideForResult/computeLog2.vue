<template>
  <div id="code2">
      <span class="comments">*{{new Date().toString()}} 计算日志 */</span>
      <p v-for="code in codeList">
        第{{code.step}}步计算：
        <span class="keyword">{{code.name}}
          <span class="keyword" v-if="code.par.length!=0">
            {{code.par[0].name}}<br>
            <span class="placeholder" v-if="code.par.length!=0"/>
            <span class="value" v-if="code.par.length!=0">{{code.par[0].name}} = {{code.par[0].value}}</span>
            <span class="comments" v-if="code.par.length!=0">//{{code.par[0].comment}}</span>
          </span>
        </span>
      </p>
      <span class="error">{{success? 'SuccessFul':'Error'}}</span>
  </div>
</template>

<script>
require('../../style/rightSideForResult.scss')
var $ = require("jquery")


export default {
  name: 'Home',
  data () {
    return {
      success:true,
      //code中对应的数据内容
      codeList:[
        {
          step:'一',
          name:'解析数据文件，解析参数设置，计算局部模型系数......',
          par:[]
        },
        {
          step:'二',
          name:'模型参数',
          par:[{
                name:'Bandwidth',
                value:0.114996,
                comment:'计算带宽，产生了对距离的影响衰减'
              }]
        },
        {
          step:'三',
          name:'模型参数',
          par:[{
                name:'ResidualSquares',
                value:11.1144,
                comment:'计算误差平方，进行交叉验证'
              }]
        },
        {
          step:'四',
          name:'模型参数',
          par:[{
                name:'Sigma',
                value:0.105477,
                comment:'系数σ'
              }]
        },
		{
          step:'五',
          name:'模型参数',
          par:[{
                name:'AICc',
                value:-1447.84,
                comment:'计算带宽方法参数'
              }]
        },
		{
          step:'六',
          name:'模型参数',
          par:[{
                name:'R2',
                value:0.85287,
                comment:'拟合优度，代表GTWR模型拟合程度'
              }]
        },
		{
          step:'七',
          name:'模型参数',
          par:[{
                name:'R2Adjusted',
                value:0.851681,
                comment:'计算调整优化后的拟合优度'
              }]
        },
		{
          step:'八',
          name:'模型参数',
          par:[{
                name:'Spatio-temporal Distance Ratio',
                value:0.268765,
                comment:'空间-时间距离之比，代表时间距离效应与空间距离效应的对比'
              }]
        },
		{
          step:'九',
          name:'模型参数',
          par:[{
                name:'Trace_of_SMatrix',
                value:93.9743,
                comment:'整体模型评价结果矩阵参数'
              }]
        },
		
      ]
       
    }
  },
  components:{
  },
  mounted(){
    //this.turn();
    // this.typeCode()
  },
  computed:{

  },
  methods:{
    /*
    *加载code
    *以jQuery的方法，打字式加载code
     */
    /*typeCode:function(){
      let done = $.Deferred();
      $.fn.typewriter = function() {
          this.each(function() {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
              var current = str.substr(progress, 1);
              if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
              } else {
                progress++;
              }
              $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
              if (progress >= str.length) {
                clearInterval(timer);
                done.resolve();
              }
            }, 25);
          });
          return this;
      };  
      $("#code").typewriter();
      return done.promise();
    },
    //执行完打字之后执行页面跳转
    turn:function(){
      let that = this;
      this.typeCode().then(function(){
        that.$router.push({path:'/home/computeresult/chartAnalysis'});
      })
    }*/
    typeCode:function(){
      let that = this;
      $.fn.typewriter = function() {
          this.each(function() {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
              var current = str.substr(progress, 1);
              if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
              } else {
                progress++;
              }
              $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
              if (progress >= str.length) {
                clearInterval(timer);
                // that.$router.push({path:'/home/computeresult/computeLog'});             
              }
            }, 25);
          });
          return this;
      };  
      $("#code").typewriter();
      $("#code").stop();
      

      var url = 'http://localhost:9010/GWRService/GWRService';
      $.get(url,function(data){  
        console.log(data)
        });
    },
  },
}
</script>
<style scope>

</style>