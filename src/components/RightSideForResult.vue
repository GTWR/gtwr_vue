<template>
  <div class="result-canel">
    <div class="content">
      <router-view></router-view>
    </div>    
    <div class="tab" @click="switchTab">
        <button id="chart">图表展示</button>
        <button id="log">计算日志</button>
        <button id="precision">精度评价</button>
        <button class="last-btn">其他</button>
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
    this.$router.push({path:'/home/computeresult/chartAnalysis'});
  },
  computed:{
  },
  methods:{
    switchTab:function(e){
      let rootUrl = '/home/computeresult/'
      switch(e.target.id){
        case 'chart':
          this.$router.push({path:rootUrl+'chartAnalysis'});
          break;
        case 'log':
          this.$router.push({path:rootUrl+'computeLog'});
          break;
        case 'precision':
            this.$router.push({path:rootUrl+'precesion'})
      }

    }
  }
}
</script>
