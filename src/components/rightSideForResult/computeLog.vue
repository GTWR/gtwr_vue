<template>
  <div id="code">
      <span class="comments">*{{new Date().toString()}} 计算日志 */</span>
      <p>{{code}}</p>
      <span class="error">{{success? 'SuccessFul':'Error'}}</span>
  </div>
</template>

<script>
require('../../style/rightSideForResult.scss')
var $ = require("jquery")

export default {
  name: 'computeLog',
  data () {
    return {
      success:true,
      code:null
    }
  },
  components:{
  },
  mounted(){
    
  },
  methods:{
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
              }
            }, 25);
          });
          return this;
      };  
      $("#code").typewriter();
      $("#code").stop();
    },
  },
}
</script>