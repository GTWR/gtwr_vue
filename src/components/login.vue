<template>
  <div class="container">
    <div id="hello">
      <dynamic></dynamic>
    </div>
    <div class="intro-text">
      <p class="title">高性能地理加权回归计算平台</p>
      <p>多角度透析数据本体与计算结果</p>
      <p>多维度示例数据</p>
      <router-link to="/demo" class="link">更多应用案例</router-link>
    </div>
  </div>
</template>
    
<script>
require('../style/login.scss')
import dynamic from '../components/login/DynamicThreed.vue'

export default {
  name: 'login', 
  data () {
    return {
      
      
    }
  },
  mounted(){
     
  },
  methods:{

  },
  components: {
    dynamic
  }
}
</script>