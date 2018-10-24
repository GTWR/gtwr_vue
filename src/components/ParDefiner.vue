<template>
  <div class="par-container">
	<header class="title"><p>参数设置</p></header><!-- /header -->
    <div class="tab" >
			<button :class="{active: tab==1}" @click="gtwr">GTWR</button>
			<button :class="{active: tab==2}" @click="gwr">GWR</button>
		</div>

		<div class="par-list">
		   
			 <div v-if="tab==1">
		     <div v-for="(par,index) in par_list1">
		    	   <span style="display:inline-block;width:80px;text-align:left;">{{par.name}}：</span><input placeholder="输入参数" v-model="par.value" >
		        	<p style="font-size:14px;">参数说明：{{par.content}}</p>
	   	   </div>
			 </div>

			 <div v-else>
		    	   <div v-for="(par,index) in par_list2">
		    	   <span style="display:inline-block;width:80px;text-align:left;">{{par.name}}：</span><input placeholder="输入参数" v-model="par.value" >
		        	<p style="font-size:14px;">参数说明：{{par.content}}</p>
	   	   </div>
	   	 </div>
		  
			<div style="background:white;width:100px;height:18px;border:none;margin-left: 206px">
			<div id="proBar" style="height:30px;width:0%;background-color:rgba(0,0,0,0.8);color:rgba(0,0,0,0.8);border-radius: 3px;">
				<span style="display: inline-block;position: relative;">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
			</div>
		</div> 
		<button class="submit" style="vertical-align:middle" @click="compute"  ><span>开始计算</span></button> 
		
	</div>
	   
    
  </div>
</template>

<script>
require('../style/parDefiner.scss')
import {mapState} from 'vuex'

export default {
  name: 'ParDefiner',
  data () {
    return {
      tab:1,
			par_list1:[
				{name:'因变量', value:'', content:'GTWR模型的dependent variable'},
				{name:'解释变量', value:'', content:'GTWR模型的explanatory variable'},
				{name:'X - 坐标', value:'', content:'点或面板数据的x坐标，表示空间信息'},
				{name:'Y - 坐标', value:'', content:'点或面板数据的y坐标，表示空间信息'},
				{name:'时间维度', value:'', content:'点或面板数据的时间戳，表示时态信息'},
				{name:'时空距比', value:'', content:'可自定义，也可自动优化生成'},
				{name:'带宽方法', value:'', content:'选择计算带宽的方法，如AICc等'},
				{name:'核方法', value:'', content:'内核类型决定是固定距离还是可变的'},
			],
			par_list2:[
				{name:'X - 坐标',value:'',content:'点或面板数据的x坐标，表示空间信息'},
				{name:'Y - 坐标',value:'',content:'点或面板数据的y坐标，表示空间信息'},
				{name:'pctRural',value:'',content:'暂无该参数的相关描述'},
				{name:'pctbach',value:'',content:'暂无该参数的相关描述'},
				{name:'totPop90',value:'',content:'暂无该参数的相关描述'},
			]
    }
  },
  mounted(){
  },
  methods:{
  	compute:function(){
        this.$router.push({path:'/home/computeresult/computeLog'});
				var barObj = document.getElementById("proBar");
				var currentWidth = parseInt(barObj.style.width.substring(0, barObj.style.width.length - 1));
				if (currentWidth < 100) {
					barObj.style.width = (currentWidth + 1) + "px";
				}
				else{return 0;}
				setTimeout(this.compute, 246);
  	},
  	gtwr:function(){
        this.tab=1
		},
		gwr:function(){
				this.tab=2
		}
  }
}
</script>
