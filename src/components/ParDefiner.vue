<template>
  <div class="par-container">
	<header class="title"><p>参数设置</p></header><!-- /header -->
	<div class="par-list">
		<div v-for="(par,index) in par_list">
			<span style="display:inline-block;width:80px;text-align:left;">{{par.name}}：</span><input placeholder="输入参数" v-model="par.value" >
			<p style="font-size:14px;">参数说明：{{par.content}}</p>
		</div>
		<div style="background:white;width:100px;height:18px;border:none;margin-left: 206px">
			<div id="proBar" style="height:30px;width:0%;background-color:rgba(0,0,0,0.8);color:rgba(0,0,0,0.8);border-radius: 3px;">
				<span style="display: inline-block;position: relative;">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
			</div>
		</div> 
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
		if (currentWidth < 100) {
			barObj.style.width = (currentWidth + 1) + "px";
		}
		else{return 0;}
		setTimeout(this.compute, 246);
		
		

		// var url = 'http://localhost:9010/GWRService/GWRService';
		// $.get(url,function(data){  
  //  			console.log(data)
  //       }); 
  	},
  }
}
</script>
