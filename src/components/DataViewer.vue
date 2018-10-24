<template>
  <div class="data-container">
  	<header class="title"><p>数据列表</p></header><!-- /header -->

  	<div class="data-head">
      <table>
        <tr>
          <th v-for="(value,key) in (dataA[0].features?dataA[0].features[0].properties:dataA[0])">
            {{key}}
          </th>
        </tr>
	  </table>
	 </div>
	 <div class="data-table" id="data-table">
	  <table id="t1">
        <tbody>
          <tr v-for="line in (dataA[0].features?dataA[0].features:dataA)" :id="SpaceFilter(line.properties.name)" @click="InteractWithMap(line.properties.name,line)">
<!--             <a :name="line.properties.name"></a> -->
            <td v-for="(value,key) in (dataA[0].features?line.properties:line)" >{{value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
require('../style/dataViewer.scss')
import {mapState} from 'vuex'
import messageBus from '../bus/messageBus.js'

export default {
  name: 'ParDefiner',
  data () {
    return {
      titlename:'',     
    }
  },
  mounted(){
    this.getEventData();
  },
  computed:{
    ...mapState({
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index
	  }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    },
  },
  watch:{
  },
  methods:{
  	getEventData(){
  		const that = this;
  		//接收点击要素的name值，传给titlename
  		messageBus.$on('event-to-chart',function(val){
        this.titlename=val 

        //jquery方法,使表格中的滚动条滚动到指定位置，同时改变背景色
        const id = '#'+that.SpaceFilter(this.titlename);//要定位的地方的id
        var $objTr = $(id); //找到要定位的地方 
        let t1 = document.getElementById('t1');//表格容器
        for(var i=0;i<t1.rows.length;i++){
          t1.rows[i].style.backgroundColor='';//将表格容器中所有行背景色变为空
        } 
        $objTr.css("background-color","#DCDCDC"); //设置要定位地方的css 
        let tableContainer = $("#data-table");
        let scrollLocation = $objTr.offset().top-tableContainer.offset().top+tableContainer.scrollTop();//计算滚动的位置
        tableContainer.animate({scrollTop:scrollLocation},"slow"); //定位tr 
      });
  	},
    //字符串格式化，将name中包含空格的字符串进行格式化，如New Mexico=>New-Mexico
    SpaceFilter:function(string){
      if (typeof string === 'string') {
        if(string.indexOf(" ") != -1) {
            let string_ = string.replace(' ','_');
            return string_;
        }
      }
      return string;
    },
    InteractWithMap:function(name,line){
      let t1 = document.getElementById('t1');//表格容器
      for(var i=0;i<t1.rows.length;i++){
        t1.rows[i].style.backgroundColor='';//将表格容器中所有行背景色变为空
      } 
      const id = '#'+name;//点击数据行的id
      var $objTr = $(id); //找到数据行的dom 
      $objTr.css("background-color","#DCDCDC"); //设置点击行的css
      messageBus.$emit('from-table-to-map',line)
    }
  }
}
</script>
