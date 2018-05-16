<template>
  <div class="cover-login">
    <div class="box-container">
      <header class="title"><p>登录</p></header>
      <div class="login">
          <p><span>账号：</span><input type="text"></p>
          <p><span>密码：</span><input type="text"></p>
          <a>注册</a>
          <a>忘记密码？</a><br/>
          <button class="submit" style="vertical-align:middle" @click="submitPar" ><span>提交</span></button>
      </div>
      
    </div>
    <img src="../assets/img/close.png" height="20" width="20" @click="submitPar">
  </div>
</template>

<script>
require('../style/coverLogin.scss')
import {mapState} from 'vuex'

export default {
  name: 'coverLogin',
  data () {
    return {
      
    }
  },
  mounted(){
    
  },
  computed:{
    ...mapState({
        // ...
      
    })
  },
  methods:{
    submitPar:function(){
      //关闭遮罩层与登录面板
      this.$store.dispatch('LoginShowAction',false);
    },
  }
}
</script>
