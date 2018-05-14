// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import demoLogo from '../assets/img/demo_data_aa.png'
import smallpic1 from '../assets/img/small picture1.jpg'
import smallpic2 from '../assets/img/small picture2.jpg'
import historyLogo from '../assets/img/his_data.png'
import privateLogo from '../assets/img/private_data.png'
import populationJson from '../assets/data/us-states.json'
import airQualityCsv from '../assets/data/china_province_air_quality.json'
import housePrice from '../assets/data/housePrice.json'

Vue.use(Vuex);

const state = {
	cover_show:false,
	parent_node_index:0,
	child_node_index:0,
	grandson_node_index:0,
    data_list:[
	  	{
	      	name:'示例数据',
	      	data_type:[
		      	{
		      		name:'美国人口分布',
		      		url:populationJson,
					update_time:'2018-02-03',
					descriptions:'该数据主要显示了美国城市人口的分布密度状况，由点要素、线要素和面要素等矢量元素组成，而数据类型有三种，即CSV、geojson和WMS。最新更新时间为2018年2月3日。',
		      		crs:'WGS84',
					src:smallpic1,
					children:[
		      			{name:'美国人口分布.geojson',type:'geojson',src:'',index:'density'},
		      			{name:'美国州级地理边界.geojson',type:'geojson',src:'',index:'density'}
		      		]
		      	},
		      	{
		      		name:'中国各省空气质量',
		      		url:airQualityCsv,
					update_time:'2018-02-03',
					descriptions:'该数据显示了中国各省的空气质量，主要包括省、市、AQI、质量等级、pm2.5、PM10、排名等，以及数据状态有CSV、geojson和WMS。最新更新时间为2018年2月3日。',
		      		crs:'WGS84',
					src:smallpic2,
		      		children:[
		      			{name:'中国各省PM25.json',type:'json',src:'',index:'PM 2.5'},
		      			{name:'中国各省PM10.json',type:'json',src:'',index:'PM10'},
		      			{name:'中国各省空气质量.json',type:'json',src:'',index:'质量等级'},
		      			{name:'中国各省AQI.json',type:'json',src:'',index:'AQI'},
		      			{name:'中国各省城市数.json',type:'json',src:'',index:'城市数'},
		      			{name:'中国省级地理位置.geojson',type:'geojson',src:'',index:'质量等级'},
		      		]
		      	},
		      	{
		      		name:'房价',
		      		url:housePrice,
		      		description:'该数据显示了XXX的房价以及相关因素数据，主要包括绿化面积，质量，交通状况，服务设施等。最新更新时间为2018年5月14日。',
		      		src:smallpic2,
		      		children:[
		      			{name:'房价数据.geojson',type:'geojson',src:''},
		      		]
		      	}
		    ],
		    src:demoLogo,
	    },
		{
	      	name:'私有数据',
	      	data_type:[],
		    src:privateLogo,			
		},
	    {
	      	name:'使用记录',
	      	data_type:[
	      		
		    ],
		    src:historyLogo,
		}
	],
	par_list:[
		{name:'参数1', value:''},
		{name:'参数2', value:''},
		{name:'参数3', value:''},
		{name:'参数4', value:''},
		{name:'参数5', value:''},
	]
}

const mutations = {
	parentIndexMutation:function(state,msg){
		state.parent_node_index = msg;
	},
	childIndexMutation:function(state,msg){
		state.child_node_index = msg;

	},
	grandSonIndexMutation:function(state,msg){
		state.grandson_node_index = msg;
	},
	coverShowMutation:function(state,msg){
		state.cover_show = msg;
	},
	parListMutation:function(state,msg){
		state.par_list = msg;
	}
}

const actions = {
	parentIndexAction:function({commit},msg){
		commit('parentIndexMutation',msg)
	},
	childIndexAction:function({commit},msg){
		commit('childIndexMutation',msg)
	},
	grandSonIndexAction:function({commit},msg){
		commit('grandSonIndexMutation',msg)
	},
	coverShowAction:function({commit},msg){
		commit('coverShowMutation',msg)
	},
	parListAction:function({commit},msg){
		commit('parListMutation',msg)
	}
}

/*const getters = {
	parentIndexGetter:function(state){
		return state.parent_node_index;
	},
	grandsonIndex:function({commit},msg){
		commit('grandsonIndexMutation',msg)
	},
	open:function({commit}){
		commit('openMutation')
    },
	childIndexGetter:function(state){
		return state.child_node_index;
	}

}*/

export default new Vuex.Store({
    state,
    mutations,
    actions,
    /*getters*/
});