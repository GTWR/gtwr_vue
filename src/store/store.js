import Vue from 'vue'
import Vuex from 'vuex'
import demoLogo from '../assets/img/demo_data_aa.png'
import privateLogo from '../assets/img/private_data.png'
Vue.use(Vuex);

//计算分层设色的最大值和最小值；
var dataTreeNodeName = require('../assets/data/dataTreeNodeName.json');//要获取的json文件
for(let i=0;i<dataTreeNodeName.length;i++){
	if(dataTreeNodeName[i].dataContent){
		const demo = require('../assets/data/demoData/'+dataTreeNodeName[i].dataContent+'.json');
		dataTreeNodeName[i].url = demo;
		for(let j=0;j<dataTreeNodeName[i].children.length;j++){
			const pro = dataTreeNodeName[i].children[j].name;
			let arr = [];
			for(let m=0;m<demo[0].features.length;m++){
				arr.push(demo[0].features[m].properties[pro]);
			}
			dataTreeNodeName[i].children[j].max=Math.max.apply(null,arr);
			dataTreeNodeName[i].children[j].min=Math.min.apply(null,arr);
		}
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
	],
	computeResult:null
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
	},
	computeResultMutation:function(state,msg){
		state.computeResult = msg;
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
	computeResultAction:function({commit},msg){
		commit('computeResultMutation',msg)
	}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
});