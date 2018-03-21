<template>
  <div id="hello">
    <div class="carousel_slide">
	<carousel :slides="slides" :inv="invTime"></carousel>
	</div>
	<h1>{{ msg }}</h1>
    <button class="login-btn" @click="goHomePage">
      匿名登录
    </button>
	
    <div class="footer">
	
        &emsp;&copy; OpenStreetMap &copy; Mapbox <b>Improve this map</b>&emsp;  
    
	</div>
	
  </div>
</template>

<script>
import AMap from 'AMap';   //在页面中引入高德地图
import carousel from '../components/Carousel.vue'  //引入carousel组件
export default {
  name: 'login', 
  data () {
    return {
      msg: ' Hello to GTWR',
	  invTime:2000,
	  //引入滚动视窗图片
	  slides: [
                    {
                        src:require('../assets/img/picture1.jpg'),
                        title:'', 
                    },
                    {
                        src:require('../assets/img/img 001.jpg'),
                        title:''
                    },
                    {
                        src:require('../assets/img/img 003.jpg'),
                        title:''
                    },
                    {
                        src:require('../assets/img/img004.jpg'),
                        title:''
                    }
                ]

    }
  },
    mounted(){
       this.loadmap();     //加载地图和相关组件
    },
  methods:{
    goHomePage:function(){
      this.$router.push({path:'/home'})
    },
	loadmap(){
        var map = new AMap.Map('hello', {
          zoom: 3
        });
      }
  },
  components: {
            carousel
        }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#hello{

  height: 100%;
  width: 100%;
}
.carousel_slide{
  top:10%;
  position:relative;
  z-index: 999;
  
}
h1 {
  position:relative;
  font-weight: normal;
  margin-top: 170px;
  margin-bottom:33px;
  z-index: 999;
}
.login-btn{
  position:relative;
  z-index: 999;
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
  box-shadow:0px 0px 10px rgba(0, 0, 0, .5);
  -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .5);  
  -moz-box-shadow:0 0 10px rgba(0, 0, 0, .5);  
    
}
.footer {
    position: fixed;
    line-height: 21px;
	left:0;
	bottom:0;
	background-color:#fff;
	opacity:.85;
	z-index: 999;
}







</style>