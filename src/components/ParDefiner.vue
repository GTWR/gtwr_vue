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
						<select v-show="par.name!='bandWidth'" v-model="par.value"><option v-for="item in varList">{{item}}</option></select>
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

var $ = require("jquery")
export default {
  name: 'ParDefiner',
  data () {
    return {
			tab:1,
			computeLog:null,
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
				{name:'X - 坐标',node:'X', value:'',content:'点或面板数据的x坐标，表示空间信息'},
				{name:'Y - 坐标',node:'Y',  value:'',content:'点或面板数据的y坐标，表示空间信息'},
				{name:'pctRural',node:'PctRural',  value:'',content:'暂无该参数的相关描述'},
				{name:'pctbach',node:'PctBach',  value:'',content:'暂无该参数的相关描述'},
				{name:'totPop90',node:'TotPop90',  value:'',content:'暂无该参数的相关描述'},
				{name:'bandWidth', node:'bandWidth', value:0, content:'输入带宽'},
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
			viewZoom(){return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].zoom;},//当前数据适宜的缩放尺度
			centerPosition(){return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].centerPosition;},//当前数据适宜的中心		
			varList(){return Object.keys(this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url[0].features[0].properties);},//数据属性列表
  },
  methods:{
		//整合计算数据，判断参数是否设置完全和正确，整合初始计算数据
		organizeComputeData: function(parArray){
				let data = [],dataObj = {},originData = this.computeData[0].features;
				for(let ind=0;ind<parArray.length;ind++){
						if(!parArray[ind].value) {return{errCode:1000};break;}//判断参数是否设置完全
				}
				try{
						for(let i=0,obj = {};i<originData.length;i++){
							obj.properties = {};
							for(let j=0;j<parArray.length-1;j++){
								obj.properties[parArray[j].node] = originData[i].properties[parArray[j].value];
							}
							data.push(obj)
						}
						dataObj.features = data;
						return dataObj;
				}catch(e){return {errCode:1001};}
		},
		//传输计算日志到computeLog.vue
		handleComputeLog: function(parArray){
			let computeOriginData = this.organizeComputeData(parArray);
		},
		//"开始计算"按钮响应函数
  	compute:function(){
			let self = this,arr=[],
					parArray = this.tab == 1 ? this.par_list1: this.par_list2,
					computeOriginData = this.organizeComputeData(parArray),
					result = {data: {"type": "FeatureCollection" ,"features":[]},minVal: null,maxVal: null,centerPosition: self.centerPosition,zoom: self.viewZoom,};
			if(computeOriginData.hasOwnProperty('errCode')){
				this.computeLog = computeOriginData.errCode == 1000 ? {result:"Parameters setting is not completed，computing failed"}:computeOriginData.errCode == 1001?{result:"Parameters are wrong，computing failed"}:this.computeLog;
			}else{	
				this.$store.dispatch('computeSuccessAction' , [false,this.parentNodeIndex,this.childNodeIndex]);//清空“查看计算结果按钮”
				$("#proBar").addClass('btn-animation');//按钮动画
				this.$router.push({path:'/computeresult/computeLog'});//切换路由到计算日志面板
				if(this.tab == 2){
					let computeString = JSON.stringify(computeOriginData),
							bandWidth = this.par_list2[this.par_list2.length-1].value;
					$.ajax({
						url: 'http://localhost:8080/GWR_war/GWRService',
						type: "GET",
						dataType: "json",
						data: {
							computeData: computeString,
							bandWidth:bandWidth
						},
						success: function(data){  
							console.log(data);
							// let dataJson = JSON.parse(data);
							// console.log(dataJson);
							// for(let i=0;i<dataJson.length;i++){
							// 	arr.push(dataJson[i].yhat);
							// 	let obj = {
							// 		"type": "Feature",
							// 		"properties": Object.assign(dataJson[i],self.computeData[0].features[i].properties),
							// 		"geometry": {
							// 			"type": "Point",
							// 			"coordinates": [dataJson[i].x, dataJson[i].y]
							// 		}
							// 	};
							// 	result.data.features.push(obj);
							// }
						},
						error: function(xhr,status,error){
							self.computeLog = {result:error};
							alert(error,status)
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
			}
			result.minVal = Math.min.apply(null,arr);
			result.maxVal = Math.max.apply(null,arr);
			self.$store.dispatch('computeResultAction' , result);
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
