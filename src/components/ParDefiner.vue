<template>
  <div class="par-container">
	<header class="title"><p>参数设置</p></header><!-- /header -->
    <div class="GWRtab" >
			<button :class="{active: tab==1}" @click="gtwr">GTWR</button>
			<button :class="{active: tab==2}" @click="gwr">GWR</button>
		</div>
		<div class="par-list">	   
			 <div v-if="tab==1">
		     <div v-for="(par,index) in par_list1">
		    	  <span class="par-title">{{par.name}}：</span>
						<input placeholder="输入参数" v-model="par.value" >
						<select v-model="par.value"><option v-for="item in varList">{{item}}</option></select>
		        <p>参数说明：{{par.content}}</p>
	   	   </div>
			 </div>
			 <div v-else>
						<div v-for="(par,index) in par_list2">
						<span class="par-title">{{par.name}}：</span>
						<input placeholder="输入参数" v-model="par.value" >
						<select v-model="par.value"><option v-for="item in varList">{{item}}</option></select>
		        <p>参数说明：{{par.content}}</p>
	   	   </div>
	   	 </div>		  
			<div style="background:white;width:100px;height:18px;border:none;margin-left: 206px">
				<div id="proBar" style="height:30px;width:0%;background-color:rgba(0,0,0,0.8);color:rgba(0,0,0,0.8);border-radius: 3px;margin-left: 18px;">
					<span style="display: inline-block;position: relative;"></span>
				</div>
			</div> 
		<button class="submit" style="vertical-align:middle" @click="compute"><span>开始计算</span></button> 		
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
	computed:{
    ...mapState({
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index,
		}),
		computeData(){return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;},
		//当前数据适宜的缩放尺度
    viewZoom(){return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].zoom;},
    //当前数据适宜的中心
    centerPosition(){return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].centerPosition;},
		//数据属性列表
		varList(){return Object.keys(this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url[0].features[0].properties);},
  },
  methods:{
		//"开始计算"按钮响应函数
  	compute:function(){
			this.animateHandle();
			let self = this,arr=[],
				result = {
					data: {
						"type": "FeatureCollection" ,
						"features":[]
					},
					minVal: null,
					maxVal: null,
					centerPosition: self.centerPosition,
					zoom: self.viewZoom,
				};
			if(this.tab == 2){
				//加载后台程序，开始GWR计算
				$.ajax({
					url: 'http://localhost:8080/GWRService/GWRService',
					success: function(data){  
						let dataJson = JSON.parse(data);
						for(let i=0;i<dataJson.length;i++){
							arr.push(dataJson[i].yhat);
							let obj = {
								"type": "Feature",
								"properties": dataJson[i],
								"geometry": {
									"type": "Point",
									"coordinates": [dataJson[i].x, dataJson[i].y]
								}
							};
							result.data.features.push(obj);
						}
					},
					error: function(xhr,status,error){
						let errMsg = ['数据错误，无法成功计算','参数设置错误，无法成功计算','网络问题，请求计算失败']
						alert(errMsg[0])
					}
				});
			}else if(this.tab == 1){
				let temp = this.computeData[0].features,
						dataJson = [];
				for(let j=0;j<temp.length;j++){
					dataJson.push(temp[j].properties)
					dataJson[j].yhat = temp[j].properties.Pprice;//GTWR和GWR的计算结果都叫yhat
				}
				for(let i=0;i<dataJson.length;i++){
					arr.push(dataJson[i].yhat);//这里需要从接口中返回的数据中取出最终的计算值，添加到数组
					let obj = {
						"type": "Feature",
						"properties": dataJson[i],
						"geometry": {
							"type": "Point",
							//这里为了适应原始的数据，所以需要从接口中返回的数据中取出经纬度，定义在这里~
							"coordinates": [dataJson[i].Longtitude, dataJson[i].Latitude]
						}
					};
					result.data.features.push(obj);
				}
			}
			result.minVal = Math.min.apply(null,arr);
			result.maxVal = Math.max.apply(null,arr);
			self.$store.dispatch('computeResultAction' , result);
		},
		//动画操控，以及页面跳转函数，函数抽出是为了防止数据访问请求多次发生
		animateHandle:function(){
				this.$router.push({path:'/home/computeresult/computeLog'});
				var barObj = document.getElementById("proBar");
				var currentWidth = parseInt(barObj.style.width.substring(0, barObj.style.width.length - 1));
				if (currentWidth < 100) {
					barObj.style.width = (currentWidth + 1) + "px";
				}
				else{return 0;}
				setTimeout(this.animateHandle, 246);
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
