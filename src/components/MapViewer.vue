<template>
	<div id="leafmap"></div> 
</template>

<script>
require('../style/mapViewer.scss')
import Leaflet from 'leaflet'
import {mapState,mapGetters} from 'vuex'
import Vue from "vue"

var bgMapUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VtbWFhYWEiLCJhIjoiY2o2a2N5dzB1MWd1ZTMzcnlqMDhkM3ZjYyJ9.0vVVkY9k7t8z0e3uqMgQnQ';

var vm = new Vue({
  methods:{
    pointStyle:function(feature){
      return {
            radius: 6,
            fillColor: this.pointStyleGetColor(feature.properties['质量等级']),
            weight: 0,
            opacity: 1,
            fillOpacity: 0.8
      }
    },
    pointStyleGetColor:function(d){
      return d == '优' ? '#43CE17' :
             d == '良' ? '#EFDC31' :
             d == '轻度污染' ? '#FFAA00':'#800026';
    }
  }
})

export default {
  name: 'ParDefiner',
  data () {
    return {
      	map: null,
        layer:null,
    }
  },
  mounted(){
  	this.initMap();
    this.addDataViewOnMap();
  },
  computed:{
    ...mapState({
        // ...
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index/*,
      dataA:state => state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url*/
    }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    }
  },
  watch:{
    dataA:'addDataViewOnMap'
  },
  methods:{
  	initMap:function(){
  		this.map = L.map('leafmap').setView([50.505,-108.09],3);
  		L.tileLayer(bgMapUrl).addTo(this.map);
  	},
    addDataViewOnMap:function(){
      if(this.layer != null){
        this.layer.remove();
      }
      if(this.dataA[0].features[0].geometry.type == 'Polygon'){
        this.map.setView([50.505,-108.09],3)
        this.layer = L.geoJson(this.dataA,{style:this.polygonStyle});
      }else{
        this.map.setView([40.31, 100.52],3)
        this.layer = L.geoJson(this.dataA,{
          pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng,vm.pointStyle(feature))
          }
        })
      }
      
      this.layer.addTo(this.map);
    },
    polygonStyleGetColor:function(d) {
      return d > 1000 ? '#800026' :
             d > 500  ? '#BD0026' :
             d > 200  ? '#E31A1C' :
             d > 100  ? '#FC4E2A' :
             d > 50   ? '#FD8D3C' :
             d > 20   ? '#FEB24C' :
             d > 10   ? '#FED976' :
                        '#FFEDA0';
    },
    polygonStyle:function(feature) {
        return {
            fillColor: this.polygonStyleGetColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    },    
  }
}
</script>
