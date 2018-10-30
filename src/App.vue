<template>
  <div id="app" class="wrap">
    <!-- Start header -->
    <header class="header">
      <p><span>GTWR </span>云计算平台</p>
      <div v-if="this.$store.state.username==''">
         <div class="login-container">
	      <a class="loginLink" @click="login()">用户登录</a>
	      <a class="loginLink"> / </a>
	      <a class="loginLink"   v-for="item in wpList" :key="item.name"
	      :class="{active : active == item.name}"
	       @click="selected(item.name)">{{item.name}}</a>
	       </div>
     </div>
      <div v-else>
        <div class="login-container">
          <div class=userLogin>你好，{{this.$store.state.username}} </div>
             <div class=exit @click="exit()">注销</div>
        </div>
     </div>
    </header>
    <!-- End  header -->
    <!-- Start 页面主体 -->
    <div class="main-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- End 页面主体 -->
    <!-- Start 登录遮罩 -->
    <cover-login v-show="login_show"></cover-login>
    <cover-sign v-show="sign_show"></cover-sign>
    <cover-reset v-show="reset_show"></cover-reset>
    <!-- End 登录遮罩 -->
  </div>
</template>

<script>
require('./style/app.scss')
import messageBus from './bus/messageBus.js'
import coverLogin from './components/login/coverForlogin.vue'
import coverSign from './components/login/coverForSign.vue'
import coverReset from './components/login/coverForReset.vue'

export default {
  name: 'App',
  data(){
  	return{
  		wpList:[
  		  {name:'匿名登录'}
  		],
      active:'',
      login_show: false,
      sign_show: false,
      reset_show: false,
      img_par_show: false
  	}
  },
  mounted(){
    this.getShowPar();
  },
  methods:{
    //获取cover遮罩是否显示的参数
    getShowPar:function(){
      let self = this;
      messageBus.$on('login-cover-show',function(val){
        self.login_show = val;
      });
      messageBus.$on('sign-cover-show',function(val){
        self.sign_show = val;
      });
      messageBus.$on('reset-cover-show',function(val){
        self.reset_show = val;
      });
    },
    //显示登录cover
    login:function(){
      this.login_show = true;
    },
    //登录成功，进入home页面
    selected(name){
      this.$router.push({path:"/home"});
      this.active = name;
    },
    //注销
    exit:function(){
      this.$store.commit('username','');
    }
  },
  components:{
    coverLogin,
    coverSign,
    coverReset
  }
}
</script>

<style>

</style>
