<template>
    <div class="result-canel">
      <div class="content">
        <router-view></router-view>
      </div>    
      <div class="tab" @click="switchTab">
          <button id="chart">图表展示</button>
          <button id="log">计算日志</button>
          <button id="precision">精度评价</button>
          <button id="btn" class="last-btn">其他</button>
      </div>
    </div>
</template>

<script>
require('../style/rightSideForResult.scss')

export default {
  name: 'Home',
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
          this.$router.push({path:rootUrl+'computeLog2'});
          break;
        case 'precision':
            this.$router.push({path:rootUrl+'precesion'})
            break;
        case 'btn':
          //按钮高亮
           break;
      }

    },
    //调整按钮边框
    handleBtnBorder:function(id){
      let tab = document.getElementsByClassName('tab')[0].children;
      for (let i = 0; i< tab.length; i++) {
        if (tab[i].id != id) {tab[i].style.border="none"} else{tab[i].style.border="2px solid lightseagreen"};
      }
    }
  }
}
</script>
