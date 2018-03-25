<template>
  <div class="home">
    <header class="header">
      <p><span>GTWR </span>计算平台</p>
    </header><!-- /header -->
    <div class="main-content">
      <div class="left-side">
         <data-selector></data-selector>
         <par-definer></par-definer>
      </div>
      <div class="right-side">
        <map-viewer></map-viewer>
        <data-viewer></data-viewer>
        <div class="clear:both"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dataSelector from './DataSelector'
import parDefiner from './ParDefiner'
import mapViewer from './MapViewer'
import dataViewer from './DataViewer'
require('../style/main_style.scss')

export default {
  name: 'Home',
  data () {
    return {
      msg: ' Hello to GTWR'
    }
  },
  components:{
    dataSelector,
    parDefiner,
    dataViewer,
    mapViewer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
