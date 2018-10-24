import Vue from 'vue'
import Vuex from 'vuex'
import demoLogo from '../assets/img/demo_data_aa.png'
import privateLogo from '../assets/img/private_data.png'
Vue.use(Vuex);

var dataTreeNodeName = require('../assets/data/dataTreeNodeName.json');//要获取的json文件
for(var i=0;i<dataTreeNodeName.length;i++){
	if(dataTreeNodeName[i].dataContent){
		var demo = require('../assets/data/demoData/'+dataTreeNodeName[i].dataContent+'.json');
		dataTreeNodeName[i].url = demo;
	}
}

const state = {
	username:'',
	parent_node_index:0,
	child_node_index:0,
	grandson_node_index:0,
    data_list:[
	  	{
	      	name:'示例数据',
	      	data_type:dataTreeNodeName,
		    src:demoLogo,
	    },
		{
	      	name:'私有数据',
	      	data_type:[],
		    src:privateLogo,	
		    children:[
		    ]		
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
	grandSonIndexMutation:function(state,msg){
		state.grandson_node_index = msg;
	},
	username:function(state,msg){
		state.username=msg;
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
	}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
});