<template>
	<div id="leafmap"></div> 
</template>

<script>
require('../style/mapViewer.scss')
import Leaflet from 'leaflet'
import {mapState} from 'vuex'
import messageBus from '../bus/messageBus.js'

var bgMapUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VtbWFhYWEiLCJhIjoiY2o2a2N5dzB1MWd1ZTMzcnlqMDhkM3ZjYyJ9.0vVVkY9k7t8z0e3uqMgQnQ';

export default {
  name: 'ParDefiner',
  data () {
    return {
      	map: null,
        layer:null,
        highlightFromTable:null,
        highlightLayerStyle:{
          weight: 3,
          color: 'lightseagreen',
          dashArray: '',
          fillOpacity: 0.7
        }
    }
  },
  mounted(){
  	this.initMap();
    this.addDataViewOnMap();
    this.listenToTable();
  },
  computed:{
    ...mapState({
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index,
      grandSonNodeIndex: state => state.grandson_node_index
    }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    },
    par(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].children[this.grandSonNodeIndex].index;
    },
    viewZoom(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].zoom;
    },
    centerPosition(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].centerPosition;
    }
  },
  watch:{
	  par:'addDataViewOnMap'
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
        this.map.setView(this.centerPosition,this.viewZoom)
        this.layer = L.geoJson(this.dataA,
      		{style:this.polygonStyle,
      		onEachFeature:this.onEachFeature 
      		}
        );
      }else{
        this.map.setView(this.centerPosition,this.viewZoom)
        let that = this;
        this.layer = L.geoJson(this.dataA,{
          pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng,that.pointStyle(feature,that.par))
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
            fillColor: this.polygonStyleGetColor(feature.properties[this.par]),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    },
    //设置点的样式
    pointStyle:function(feature,par){
      return {
            radius: 6,
            fillColor: this.pointStyleGetColor(feature.properties[par],par),
            weight: 0,
            opacity: 1,
            fillOpacity: 0.8
      }
    },
  //设置点的颜色
    pointStyleGetColor:function(d,par){
      if (par == '质量等级') {
        return d == '优' ? '#43CE17' :
             d == '良' ? '#EFDC31' :
             d == '轻度污染' ? '#FFAA00':'#800026';
      }else{
        if (par== '城市数') {
          return d >20 ? '#43CE17' :
             d >10 ? '#EFDC31' :
             d >5 ? '#FFAA00':'#800026';
        }else{
          return d > 110 ? '#800026' :
             d > 95  ? '#BD0026' :
             d > 80  ? '#E31A1C' :
             d > 65  ? '#FC4E2A' :
             d > 50   ? '#FD8D3C' :
             d > 35   ? '#FEB24C' :
             d > 20   ? '#FED976' :
                        '#FFEDA0';
        }
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
    //鼠标点击传输数据到dataViewer组件
    handleClick:function(e){
      let layer = e.target;
      let prop = layer.feature.properties.name;
	    messageBus.$emit('event-to-chart',prop);
      
    },
    //监听从dataviewer中点击数据行所传输的数据，并在地图上显示点击数据行所对应的图块
    listenToTable:function(){
      const that = this;
      messageBus.$on('from-table-to-map',function(val){
        //清空已经高亮的图层
        if (that.highlightFromTable!=null) {
          that.highlightFromTable.remove();
        }
        //叠加点击数据行对一个的小图块
        if(val.geometry.type == 'Polygon'){
          that.highlightFromTable = L.geoJson(val,{
            style: that.polygonStyle
          }).addTo(that.map);   
        }else{
          const temp = that;
          that.highlightFromTable = L.geoJson(val,{
            pointToLayer: function(feature,latlng){
              return L.circleMarker(latlng,temp.pointStyle(feature,temp.par))
            }
          }).addTo(that.map)
        }
        that.highlightFromTable.setStyle(that.highlightLayerStyle);
      });
    }
  }
}

</script>
