<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="login-btn" @click="goHomePage">
      匿名登录
    </button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: ' Hello to GTWR'
    }
  },
  methods:{
    goHomePage:function(){
      this.$router.push({path:'/home'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background-image: url(../assets/img/hello_back_img.jpg);
  background-repeat:no-repeat;
  height: 100%;
  width: 100%;
}
h1 {
  font-weight: normal;
  margin-top: 0;
}
.login-btn{
  border-radius: 4px;
  background-color: lightseagreen;
  cursor: pointer;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  color: white;
  padding: 15px 32px;
}
</style>
