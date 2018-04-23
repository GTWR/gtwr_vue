<template>
  <div class="par-container">
	<header class="title"><p>参数设置</p></header><!-- /header -->
	<div class="par-list">
		<div>
			参数1：<input placeholder="输入参数1">
			<p>参数说明：该参数表示XXXX，参数范围XX</p>
		</div>
		<div>
			参数2：<input placeholder="输入参数2">
			<p>参数说明：该参数表示XXXX，参数范围XX</p>
		</div>
		<div>
			参数3：<input placeholder="输入参数3">
			<p>参数说明：该参数表示XXXX，参数范围XX</p>
		</div>
		<div>
			参数4：<input placeholder="输入参数4">
			<p>参数说明：该参数表示XXXX，参数范围XX</p>
		</div>
		<div>
			参数5：<input placeholder="输入参数5">
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

export default {
  name: 'ParDefiner',
  data () {
    return {
      msg: ' Hello to GTWR'
    }
  },
  methods:{
  	compute:function(){
  		//this.$router.push({path:'/home/computeresult'});
		var barObj = document.getElementById("proBar");
		var currentWidth = parseInt(barObj.style.width.substring(0, barObj.style.width.length - 1));
		this.$router.push({path:'/home/computeresult/computeLog'});
		if (currentWidth < 315) {
			barObj.style.width = (currentWidth + 1) + "px";
			
		}
		else{return ;}
		setTimeout(this.compute, 10);
  	},
  }
}
</script>
