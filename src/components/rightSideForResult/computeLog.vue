<template>
  <div id="code">
      <span class="comments">*{{new Date().toString()}} 计算日志 */</span>
      <div id="log-content"></div>
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
  computed:{
    ...mapState({
      parent_node_index:state => state.parent_node_index,
      child_node_index:state => state.child_node_index,
      computeLog:state => state.computeLogRecord
    })
  },
  mounted(){
    window.sessionStorage.getItem('computeLog') && $('#log-content').html($(window.sessionStorage.getItem('computeLog')));  
    this.listenComputeLog();
    this.listenComputeAgain();  
  },
  watch:{
	  computeLog:'listenComputeLog'
  },
  methods:{
    //监听重新计算的信息
    listenComputeAgain: function(){
      messageBus.$on('compute-again-compute-result-reflesh',(msg)=>{
        msg && $('#log-content').html('');
      })    
    },
    //监听计算之后得到的计算日志消息
    listenComputeLog:function(){
      this.success = (this.computeLog && this.computeLog[0] && this.computeLog[0].hasOwnProperty('result') && this.computeLog[0].result) ? false: true;
      this.computeLog && !(window.sessionStorage.getItem('computeLog')) && this.printLog(this.computeLog,1000);
      if(this.success){               
        let arr=[this.success,this.parent_node_index,this.child_node_index]
        this.$store.dispatch('computeSuccessAction' , arr);//传递计算是否成功的消息，控制结果展示点击按钮的disable属性
        messageBus.$emit('img-par-cover-show',true); //打开面板，让用户选择数据图表的横纵坐标
      }
    },
    //打印日志
    printLog:function(log, speed) {
      let i = 0;
      window.sessionStorage.getItem('computeLog') && window.sessionStorage.removeItem('computeLog');
      let interval = setInterval(function(){
        let div1 = log[i].number ? '<p class="keyword">'+log[i].number+'</p>':'',
            div2 = log[i].line ? '<p class="value">'+log[i].line+'</p>':'',
            div3 = log[i].result ? '<p class="error">'+log[i].result+'</p>':'',
            record = window.sessionStorage.getItem('computeLog'),
            storage = record ? record+div1+div2+div3:div1+div2+div3;
        window.sessionStorage.setItem('computeLog',storage);
        $('#log-content').append(div1+div2+div3);
        i += 1;
        i >= log.length && clearInterval(interval);
      },speed);
    }
  }
}
</script>