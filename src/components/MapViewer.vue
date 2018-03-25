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
  		this.map = L.map('leafmap').setView([51.505,-0.09],5);
  		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  		).addTo(this.map);
  	}
  }
}
</script>
