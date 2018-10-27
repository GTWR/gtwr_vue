<template>
	<div id="leafMapResultPart" style="width:100%;height:100%;"></div> 
</template>

<script>
import Leaflet from 'leaflet'
import {mapState} from 'vuex'
import Vue from "vue"
import messageBus from '../../bus/messageBus.js'

var bgMapUrl11 = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VtbWFhYWEiLCJhIjoiY2o2a2N5dzB1MWd1ZTMzcnlqMDhkM3ZjYyJ9.0vVVkY9k7t8z0e3uqMgQnQ';

export default {
  name: 'mapForResult',
  data () {
    return {
      	map: null,
        layer:null,
    }
  },
  mounted(){
    if(this.computeResult){
      this.initMap();
      this.addDataViewOnMap();
    }
  },
  computed:{
    ...mapState({
      computeResult: state => state.computeResult
    }),
  },
  watch:{
    computeResult:'addDataViewOnMap'
  },
  methods:{
    //初始化地图
  	initMap:function(){
  		this.map = L.map('leafMapResultPart').setView([50.505,-108.09],3);
  		L.tileLayer(bgMapUrl11).addTo(this.map);
  	},
	  //添加数据属性的可视化图层
    addDataViewOnMap:function(){
      if(this.layer != null){
        this.layer.remove();
      }
      this.map.setView(this.computeResult.centerPosition,this.computeResult.zoom)
      let that = this;
      this.layer = L.geoJson(this.computeResult.data,{
        pointToLayer: function(feature,latlng){
          return L.circleMarker(latlng,that.pointStyle(feature))
        },
        onEachFeature: this.onEachFeature
      }) 
      this.layer.addTo(this.map);	  
    },
	  //设置数据点分层设色的颜色
    GetColor:function(d) {
      let distance = (this.computeResult.maxVal - this.computeResult.minVal)/8
      return d > this.computeResult.maxVal+distance*7 ? '#800026' :
             d > this.computeResult.minVal+distance*6  ? '#BD0026' :
             d > this.computeResult.minVal+distance*5  ? '#E31A1C' :
             d > this.computeResult.minVal+distance*4  ? '#FC4E2A' :
             d > this.computeResult.minVal+distance*3   ? '#FD8D3C' :
             d > this.computeResult.minVal+distance*2   ? '#FEB24C' :
             d > this.computeResult.minVal+distance   ? '#FED976' :
                        '#FFEDA0';
    },
    //设置数据点显示的样式
    pointStyle:function(feature,par){
      return {
            radius: 3,
            fillColor: this.GetColor(feature.properties.yhat),
            weight: 0,
            opacity: 1,
            fillOpacity: 0.8
      }
    },
    //鼠标滑过特征图块，高亮显示
    highlightFeature:function(e) {
      var layer = e.target;
      layer.setStyle(this.highlightLayerStyle);
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
    //鼠标点击传输数据生成对应的图表
    handleClick:function(e){
      let layer = e.target;
      let prop = layer.feature.properties;
      messageBus.$emit('data-for-chart',prop);
    }
  }
}
</script>
