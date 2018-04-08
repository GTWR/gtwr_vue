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
		<button class="submit" style="vertical-align:middle" @click="compute"><span>开始计算</span></button>
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
  		this.$router.push({path:'/home/computeresult'});
  	}
  }
}
</script>
