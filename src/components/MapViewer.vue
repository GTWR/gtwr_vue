<template>
  <div class="map-container">
	   <div id="leafmap"></div> 
  </div>
</template>

<script>
require('../style/mapViewer.scss')
import Leaflet from 'leaflet'

export default {
  name: 'ParDefiner',
  data () {
    return {
      	map: null
    }
  },
  mounted(){
  	this.initMap();
  },
  methods:{
  	initMap(){
  		this.map = L.map('leafmap').setView([50.505,-88.09],3);
  		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  		).addTo(this.map);
  	}
  }
}
</script>
