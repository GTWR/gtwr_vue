import Vue from 'vue'
import Vuex from 'vuex'
import demoLogo from '../assets/img/demo_data_aa.png'
import privateLogo from '../assets/img/private_data.png'
import housePrice from '../assets/data/demoData/housePrice.json'
import dataTreeNodeName from '../assets/data/dataTreeNodeName.json'
Vue.use(Vuex);

const state = {
	cover_show:false,
	login_show:false,
	sign_show:false,
	reset_show:false,
	username:'',
	parent_node_index:0,
	child_node_index:0,
	grandson_node_index:0,
    data_list:[
	  	{
	      	name:'示例数据',
	      	data_type:[
		      	{
		      		name:dataTreeNodeName.dataName,
		      		centerPosition:[50.995,-114.09],
		      		zoom: 10,
		      		url:housePrice,
					update_time:new Date().toLocaleDateString(),
		      		crs:'WGS84',
		      		children:dataTreeNodeName.properties
		      	}
		    ],
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
	loginShowMutation:function(state,msg){
		state.login_show = msg;
	},
	signShowMutation:function(state,msg){
		state.sign_show = msg;
	},
	resetShowMutation:function(state,msg){
		state.reset_show = msg;
	},
	parListMutation:function(state,msg){
		state.par_list = msg;
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
	},
	coverShowAction:function({commit},msg){
		commit('coverShowMutation',msg)
	},
	LoginShowAction:function({commit},msg){
		commit('loginShowMutation',msg)
	},
	SignShowAction:function({commit},msg){
		commit('signShowMutation',msg)
	},
	ResetShowAction:function({commit},msg){
		commit('resetShowMutation',msg)
	},
	parListAction:function({commit},msg){
		commit('parListMutation',msg)
	}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
});