<template>
  <div id="code">
      <span class="comments">*{{new Date().toString()}} 计算日志 */</span>
  </div>
</template>

<script>
require('../../style/rightSideForResult.scss')
var $ = require("jquery")
import messageBus from '../../bus/messageBus.js'
import {mapState} from 'vuex'
import computeLog from '../../assets/data/computeLog.json'

export default {
  name: 'computeLog',
  data () {
    return {
      success:true
    }
  },
  components:{
  },
  computed:{
    ...mapState({
      parent_node_index:state => state.parent_node_index,
      child_node_index:state => state.child_node_index
    })
  },
  mounted(){
    this.handleResultView();
  },
  methods:{
    //添加计算日志展示的信息
    handleResultView:function(){
        let content,arr;
        console.log(computeLog)
        this.success = (computeLog[computeLog.length-1].line).indexOf('成功') == -1 ? false : true;
        for(let i=0;i<computeLog.length;i++){
          if(computeLog[i].number && computeLog[i].line){
            content += '<p class="keyword">'+computeLog[i].number+'. '+computeLog[i].line+'</p>';
          }
          if(computeLog[i].par){
            content += '<p class="value">'+computeLog[i].par+'</p>';
          }
          if(computeLog[i].description){
            content += '<p class="comments">'+computeLog[i].description+'</p>';
          }
          if(i==computeLog.length-1 && computeLog[i].line){
            content += this.success ? '<p class="keyword">'+computeLog[i].line+'</p>':'<p class="error">'+computeLog[i].line+'</p>'
          }
        }
        $('.comments').append(content);
        if(this.success){      
          //传递计算是否成功的消息，控制结果展示点击按钮的disable属性
          arr=[this.success,this.parent_node_index,this.child_node_index]
          this.$store.dispatch('computeSuccessAction' , arr);
          //打开面板，让用户选择数据图表的横纵坐标
          messageBus.$emit('img-par-cover-show',true); 
        }
    }
  },
}
</script>