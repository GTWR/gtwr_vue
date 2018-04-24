<template>
  <div class="right-container">
    <div class="map-container">  
      <map-viewer></map-viewer>
    </div>
    <data-viewer></data-viewer>
    <div style="clear:both"></div>
  </div>
</template>

<script>
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
    dataViewer,
    mapViewer
  }
}
</script>
