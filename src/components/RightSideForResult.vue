<template>
    <div class="result-canel">
      <div class="content">
        <router-view></router-view>
      </div>    
      <div class="tab" id="tab" @click="switchTab">
          <button class="result-switch-tab" id="chart" v-show="computeSuccess">图表展示</button>
          <button class="result-switch-tab" id="log">计算日志</button>
      </div>
    </div>
</template>

<script>
require('../style/rightSideForResult.scss')
import {mapState} from 'vuex'

export default {
  name: 'RightSideForResult',
  data () {
    return {
    }
  },
  mounted(){
    this.$router.push({path:'/computeresult/computeLog'});//初试加载中页面路由指向计算日志模块
    document.getElementById("log").style.border="2px solid lightseagreen";
  },
  computed:{
    ...mapState({
      computeSuccess: state => state.ComputeResultBtnShow.computeSuccess,
    })
  },
  methods:{
    //切换tab跳转到对应的页面
    switchTab:function(e){
      let rootUrl = '/computeresult/';
      this.handleBtnBorder(e.target.id);//按钮高亮
      switch(e.target.id){
        case 'chart':
          this.$router.push({path:rootUrl+'chartAnalysis'});
          break;
        case 'log':
          this.$router.push({path:rootUrl+'computeLog'});
          break;
      }
    },
    /**
     * 调整按钮边框
     * @param String id [description] tab切换按钮的id
     */
    handleBtnBorder:function(id){
      let tab = document.getElementsByClassName('result-switch-tab');
      for (let i = 0; i< tab.length; i++) {
        if (tab[i].id != id) {
          tab[i].style.border="none"
        } else{
          tab[i].style.border="2px solid lightseagreen"
        };
      }
    }
  }
}
</script>
