<template>
  <div class="data-selector">
  	<header class="title"><p>数据选择</p></header><!-- /header -->
  	<div class="data-list">
  		<div v-for="data,index in data_list">
		  	<div class="parent_node">
		  		<img :src="data.src" height="20" width="20">
		  		<b>示例数据</b>
		  		<span @click="openfolder(index)">+</span>
		  	</div>
		  	<div class="child_list" v-show="data.open">
		  		<div v-for="child in data.children">
		  			<p>{{child.name}}</p>
		  		</div>
		  	</div>
		</div>
	</div>
	<div class="data_drag_container">
		<img src="../assets/img/add.png" height="40" width="40">
		<p>拖拽文件到此处</p>
	</div>
  </div>
</template>

<script>
require('../style/dataSelector.scss')
import demoLogo from '../assets/img/demo_data_a.png'
import historyLogo from '../assets/img/his_data.png'

export default {
  name: 'DataSelector',
  data () {
    return {
    	data_list:[
	      	{
		      	name:'示例数据',
		      	children:[
			      	{name:'demo1.csv'},
			      	{name:'demo2.json'},
			      	{name:'demo3.geojson'},
			      	{name:'demo4.xlsx'},
			      	{name:'demo3.geojson'}],
			    src:demoLogo,
			    open:true
	        },
	        {
		      	name:'历史记录',
		      	children:[
			      	{name:'history1.csv'},
			      	{name:'history2.json'},
			      	{name:'history3.geojson'},
			      	{name:'history4.xlsx'}],
			    src:historyLogo,
			    open:true
	  	    }
	    ]
    }
  },
  mounted(){
  },
  methods:{
  	openfolder:function(index){
  		this.data_list[index].open = this.data_list[index].open ? false:true; 
  	}
  }
}
</script>
