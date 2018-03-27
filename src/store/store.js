// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import demoLogo from '../assets/img/demo_data_aa.png'
import historyLogo from '../assets/img/his_data.png'
import populationJson from '../assets/data/us-states.json'
import airQualityCsv from '../assets/data/air quality_china.csv'

Vue.use(Vuex);

/*function format(data){
	if (data[0].features) {
		let arr = [];
		for (let i = 0; i < data[0].features.length; i++) {
			let obj = data[0].features[i].properties;
			arr.push(obj)
		}
	}
}*/

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
	},
	openMutation:function(state){
		state.data_list[state.parent_node_index].data_type[state.child_node_index].open = state.data_list[state.parent_node_index].data_type[state.child_node_index].open? false:true;
	}
}

const actions = {
	parentIndex:function({commit},msg){
		commit('parentIndexMutation',msg)
	},
	childIndex:function({commit},msg){
		commit('childIndexMutation',msg)
	},
	open:function({commit}){
		commit('openMutation')
	}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
});