<template>
  <div id="code">
      <span class="comments">*{{new Date().toUTCString()}} 计算日志 */</span>
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
          name:'解析数据文件，解析参数设置',
          par:[]
        },
        {
          step:'二',
          name:'计算参数',
          par:[{
                name:'A',
                value:0.7808323,
                comment:'代表数据1与数据2中数据具有相关性，因此可以进行后续计算'
              }]
        },
        {
          step:'三',
          name:'计算参数',
          par:[{
                name:'B',
                value:0.7808323,
                comment:'代表数据1与数据2中数据具有相关性，因此可以进行后续计算'
              }]
        },
        {
          step:'四',
          name:'计算结果',
          par:[{
                name:'GTWR par',
                value:0.7808323,
                comment:'balabalalaabalala'
              }]
        }
      ]
       
    }
  },
  components:{
  },
  mounted(){
    this.typeCode();
    /*this.turnToChart();*/ 
  },
  computed:{

  },
  methods:{
    /*
    *加载code
     */
    typeCode:function(){
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
              }

            }, 25);

          });

          return this;
      };
      $("#code").typewriter();
      
    },
  },
  
}
</script>
<style scope>

</style>