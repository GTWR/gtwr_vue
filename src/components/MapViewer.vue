<template>
	<div id="leafmap"></div> 
</template>

<script>
require('../style/mapViewer.scss')
import Leaflet from 'leaflet'
import {mapState,mapGetters} from 'vuex'
import Vue from "vue"
import bus from '../js/public.js'

var bgMapUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VtbWFhYWEiLCJhIjoiY2o2a2N5dzB1MWd1ZTMzcnlqMDhkM3ZjYyJ9.0vVVkY9k7t8z0e3uqMgQnQ';

var vm = new Vue({
  methods:{
    //设置点的样式
    pointStyle:function(feature){
      return {
            radius: 6,
            fillColor: this.pointStyleGetColor(feature.properties['质量等级']),
            weight: 0,
            opacity: 1,
            fillOpacity: 0.8
      }
    },
	//设置点的颜色
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
        
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index
    }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    }
  },
  watch:{
    dataA:'addDataViewOnMap',
	
  },
  methods:{
	//初始化地图
  	initMap:function(){
  		this.map = L.map('leafmap').setView([50.505,-108.09],3);
  		L.tileLayer(bgMapUrl).addTo(this.map);
  	},
	//添加图层
    addDataViewOnMap:function(){
      if(this.layer != null){
        this.layer.remove();
      }
      if(this.dataA[0].features[0].geometry.type == 'Polygon'){
        this.map.setView([50.505,-108.09],3)
        this.layer = L.geoJson(this.dataA,
		{style:this.polygonStyle,
		onEachFeature:this.onEachFeature 
		});
      }
	  else{
        this.map.setView([40.31, 100.52],3)
        this.layer = L.geoJson(this.dataA,{
          pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng,vm.pointStyle(feature))
          },
		  onEachFeature: this.onEachFeature
        }) 
      }
      
      this.layer.addTo(this.map);	  
    },
	//设置多边形的颜色
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
	//设置多边形的样式
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
	//鼠标滑过特征图块，高亮显示
	highlightFeature:function(e) {
		var layer = e.target;
		layer.setStyle({
			weight: 3,
			color: 'lightseagreen',
			dashArray: '',
			fillOpacity: 0.7
		});
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
	},
	//鼠标移出，还原样式
	resetHighlight:function(e) {
		this.layer.resetStyle(e.target);
	},
	//设置监听
    onEachFeature:function(feature, layer) {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.handleClick
        });
    },
    //鼠标点击传输数据到dataViewer组件
    handleClick:function(e){
      let layer = e.target;
      let prop = layer.feature.properties.name;
	  bus.$emit('event-to-chart','prop');
      
    }
  }
}

</script>
