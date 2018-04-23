<template>
  <div id="app" class="wrap">
    <header class="header">
      <p><span>GTWR </span>云计算平台</p>
      <div class="login-container">
	      <router-link to="/home/dataview" class="loginLink">用户登录</router-link>
	      <a class="loginLink"> / </a>
	      <router-link to="/home/dataview" class="loginLink">匿名登录</router-link>
	   </div>
    </header><!-- /header -->
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
require('./style/app.scss')

export default {
  name: 'App',
  data(){
  	return{

  	}
  },
  methods:{
  }
}
</script>

<style>

</style>
