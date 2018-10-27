<template>
    <div class="result-canel">
      <div class="content">
        <router-view></router-view>
      </div>    
      <div class="tab" id="tab" @click="switchTab">
          <button class="result-switch-tab" id="chart">图表展示</button>
          <button class="result-switch-tab" id="log">计算日志</button>
          <button class="result-switch-tab last-btn" id="precision">精度评价</button>
      </div>
    </div>
</template>

<script>
require('../style/rightSideForResult.scss')

export default {
  name: 'RightSideForResult',
  data () {
    return {
    }
  },
  components:{
  },
  mounted(){
    //初试加载中页面路由指向计算日志模块
    this.$router.push({path:'/home/computeresult/computeLog'});
    document.getElementById("log").style.border="2px solid lightseagreen";
  },
  computed:{
  },
  methods:{
    //切换tab跳转到对应的页面
    switchTab:function(e){
      let rootUrl = '/home/computeresult/';
      //按钮高亮
      this.handleBtnBorder(e.target.id);
      switch(e.target.id){
        case 'chart':
          this.$router.push({path:rootUrl+'chartAnalysis'});
          break;
        case 'log':
          this.$router.push({path:rootUrl+'computeLog'});
          break;
        case 'precision':
            this.$router.push({path:rootUrl+'precesion'})
            break;
      }
    },
    //调整按钮边框
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
