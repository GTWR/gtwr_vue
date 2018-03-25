<template>
  <div class="home">
    <header class="header">
      <p><span>GTWR </span>云计算平台</p>
    </header><!-- /header -->
    <div class="main-content">
      <div class="left-side">
         <data-selector></data-selector>
         <par-definer></par-definer>
      </div>
      <div class="right-side">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import dataSelector from './DataSelector'
import parDefiner from './ParDefiner'
require('../style/main_style.scss')

export default {
  name: 'Home',
  data () {
    return {
      msg: ' Hello to GTWR'
    }
  },
  mounted(){
    this.$router.push({path:'/home/dataview'})
  },
  components:{
    dataSelector,
    parDefiner
  }
}
</script>
