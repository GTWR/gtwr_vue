<template>
  <div class="data-selector">
  	<header class="title"><p>数据选择</p></header><!-- /header -->
  	<div class="data-list">
  		<div v-for="data,index in data_list">
		  	<div class="parent_node">
		  		<img :src="data.src">
		  		<b>{{data.name}}</b>
		  		<span @click="openfolder(index)">+</span>
		  	</div>
		  	<div class="child_list" v-show="data.open">
		  		<div v-for="child,index1 in data.data_type">
		  			<div class="child_node" @click="showDataView">
		  				<p>{{child.name}}
		  				<span @click="openfolderForSon(index,index1)">+</span></p>
		  			</div>
		  			<div class="grand_son_list" v-show="child.open">
						<div v-for="grandson in child.children">
							<p>
								<img :src="grandson.src">
								{{grandson.name}}
								<button @click="showDataDescription">说明</button>
								<button @click="showDataView">预览</button>
							</p>
						</div>
		  			</div>
		  		</div>
		  	</div>
		</div>
	</div>
	<div class="data_drag_container">
		<img src="../assets/img/add.png" height="30" width="30">
		<p>拖拽本地文件到此处</p>
	</div>
  </div>
</template>

<script>
require('../style/dataSelector.scss')
import demoLogo from '../assets/img/demo_data_aa.png'
import historyLogo from '../assets/img/his_data.png'
import csvFileGogo from '../assets/img/csv.png'
import geojsonFileLogo from '../assets/img/mind_map.png'

export default {
  name: 'DataSelector',
  data () {
    return {
    	data_list:[
	      	{
		      	name:'示例数据',
		      	data_type:[
			      	{
			      		name:'中国PM2.5浓度',
			      		open:true,
			      		url:'',
			      		children:[
			      			{name:'中国PM2.5浓度.csv',src:''},
			      			{name:'中国PM2.5浓度.geojson',src:''}
			      		]
			      	},
			      	{
			      		name:'全球7月份降水量',
			      		open:true,
			      		url:'',
			      		children:[
			      			{name:'全球7月份降水量.csv',src:''},
			      			{name:'全球7月份降水量.geojson',src:''}
			      		]
			      	},
			      	{
			      		name:'中国车流量',
			      		open:true,
			      		url:'',
			      		children:[
			      			{name:'中国车流量.csv',src:''},
			      			{name:'中国车流量.geojson',src:''}
			      		]
			      	}
			    ],
			    src:demoLogo,
			    open:true
	        },
	        {
		      	name:'历史记录',
		      	data_type:[
		      	
			    ],
			    src:historyLogo,
			    open:true
	  	    }
	    ]
    }
  },
  mounted(){
  	this.initDataTypeLogo();
  },
  methods:{
  	//控制父节点的开关
  	openfolder:function(index){
  		/*this.data_list[index].open = this.data_list[index].open ? false:true; */
  	},
  	//控制子节点的开关
  	openfolderForSon:function(index,index1){
  		this.data_list[index].data_type[index1].open = this.data_list[index].data_type[index1].open? false:true;

  	},
  	//为不同的数据类型添加不同的图标
  	initDataTypeLogo:function(){
  		let temp = this.data_list[0].data_type;
  		for(let i=0; i< temp.length;i++){
  			for(let j=0; j < temp[i].children.length;j++){
  				const regCsv = RegExp(/\.csv/)
  				/*const regGeo = RegExp(/\.geojson/)*/
  				if (temp[i].children[j].name.match(regCsv)) {
  					temp[i].children[j].src = csvFileGogo;
  				}else{
  					temp[i].children[j].src = geojsonFileLogo;
  				}
  			}
  		}
  	},
  	showDataDescription:function(){
  		this.$router.push({path:'/home/datadescription'})
  	},
  	showDataView:function(){
  		this.$router.push({path:'/home/dataview'})
  	}
  }
}
</script>
