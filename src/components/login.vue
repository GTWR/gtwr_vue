<template>
  <div class="container">
    <div id="hello">
      <dynamic-threed v-show="index == 1"></dynamic-threed>
      <img-component v-if="index>1" :imgsrc="slides[index-2].src"></img-component>
    </div>
    <div class="playBtn">
      <button v-for="n in 5" class="circle" @click="carousel(n)" :class="{on: index === n}"></button>
    </div> 
  </div>

</template>

<script>
import carousel from '../components/Carousel.vue'  //引入carousel组件
require('../style/login.scss')
import dynamicThreed from  '../components/login/DynamicThreed.vue'
import imgComponent from '../components/login/img.vue'
import vue from 'vue'

export default {
  name: 'login', 
  data () {
    return {
      show:true,
      index:1,
  	  //引入滚动视窗图片
  	  slides: [
          {
              src:require('../assets/img/test1.jpg'),
          },
          {
              src:require('../assets/img/test2.jpg'),
          },
          {
              src:require('../assets/img/test3.jpg'),
          },
          {
              src:require('../assets/img/test4.jpg'),
          }
      ]
    }
  },
  mounted(){
     this.run();
  },
  methods:{
    carousel:function(n){
      this.index = n;
      clearTimeout(this.inv);
      this.run()
    },
    run:function(){
      var timeout=3000;
      var that = this;
      clearTimeout(this.inv);
      this.inv=setTimeout(function timeFunc(){
          that.index += 1;
          if (that.index == 6) {
            that.index = 1;
          }
          if (that.index == 1) {
            timeout = 20000;
          }else{
            timeout = 3000;
          }
          this.inv=setTimeout(timeFunc,timeout);
      },timeout);
    }
  },
  components: {
    dynamicThreed,
    imgComponent
  }
}
</script>