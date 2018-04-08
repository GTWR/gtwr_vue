// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import demoLogo from '../assets/img/demo_data_aa.png'
import historyLogo from '../assets/img/his_data.png'
import populationJson from '../assets/data/us-states.json'
import airQualityCsv from '../assets/data/china_province_air_quality.json'

Vue.use(Vuex);

const state = {
	parent_node_index:0,
	child_node_index:0,
    data_list:[
	  	{
	      	name:'示例数据',
	      	data_type:[
		      	{
		      		name:'美国人口分布',
		      		open:true,
		      		url:populationJson,
		      		children:[
		      			{name:'美国人口分布.csv',src:''},
		      			{name:'美国人口分布.geojson',src:''},
		      			{name:'美国人口分布WMS',src:''},
		      		]
		      	},
		      	{
		      		name:'中国各省空气质量',
		      		open:true,
		      		url:airQualityCsv,
		      		children:[
		      			{name:'中国各省空气质量.csv',src:''},
		      			{name:'中国各省空气质量.geojson',src:''},
		      			{name:'中国各省空气质量WMS',src:''}
		      		]
		      	},
		      	{
		      		name:'Demo',
		      		open:true,
		      		url:'',
		      		children:[
		      			{name:'Demo.csv',src:''},
		      			{name:'Demo.geojson',src:''},
		      			{name:'DemoWMS',src:''}
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

const mutations = {
	parentIndexMutation:function(state,msg){
		state.parent_node_index = msg;
	},
	childIndexMutation:function(state,msg){
		state.child_node_index = msg;
	}
}

const actions = {
	parentIndexAction:function({commit},msg){
		commit('parentIndexMutation',msg)
	},
	childIndexAction:function({commit},msg){
		commit('childIndexMutation',msg)
	}

}

const getters = {
	parentIndexGetter:function(state){
		return state.parent_node_index;
	},
	childIndexGetter:function(state){
		return state.child_node_index;
	}

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});