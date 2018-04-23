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
    <cover-par v-show="cover_show"></cover-par>
  </div>
</template>

<script>
require('./style/app.scss')
import coverPar from './components/coverForParSelect.vue'
import {mapState} from 'vuex'

export default {
  name: 'App',
  data(){
  	return{

  	}
  },
  computed:{
    ...mapState({
        // ...
      cover_show: state => state.cover_show,

      /*open:state => state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].open*/
    })
  },
  methods:{
  },
  components:{
    coverPar
  }
}
</script>

<style>

</style>
