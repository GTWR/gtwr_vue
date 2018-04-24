<template>
  <div class="par-container">
	<header class="title"><p>参数设置</p></header><!-- /header -->
	<div class="par-list">
		<div v-for="(par,index) in par_list">
			{{par.name}}：<input placeholder="输入参数" v-model="par.value">
			<p>参数说明：该参数表示XXXX，参数范围XX</p>
		</div>
		<div style="background:white;width:315px;height:18px;padding:2px;border:1px solid lightseagreen;border-radius: 3px;">
		<div id="proBar" style="width:0%;background-color:lightseagreen;color:rgba(0,0,0,0.5);border-radius: 3px;">
		<span style="display: inline-block;position: relative;">
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspProcessBar</span></div></div> 
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
      msg: ' Hello to GTWR'
    }
  },
  mounted(){
	
  },
  computed:{
    ...mapState({
        // ...
      par_list: state=> state.par_list
    }),
  },
  methods:{
	
  	compute:function(){
  		//this.$router.push({path:'/home/computeresult'});
		this.$router.push({path:'/home/computeresult/computeLog'});
		var barObj = document.getElementById("proBar");
		var currentWidth = parseInt(barObj.style.width.substring(0, barObj.style.width.length - 1));
		if (currentWidth < 315) {
			barObj.style.width = (currentWidth + 1) + "px";
			
		}
		else{return 0;}
		setTimeout(this.compute, 32);
		
  	},
  }
}
</script>
