<template>
  <div class="container">
    <div id="hello">
        <transition name="slide-trans">
          <keep-alive>
            <dynamic-threed v-show="index==1"></dynamic-threed>
          </keep-alive>
        </transition>
        <transition name="slide-trans">
          <img v-if="show && index>1" :src='slides[index-2].src' class="slide-img"></img>
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!show && index>1" :src='slides[index-2].src'  class="slide-img"></img>
        </transition>
    </div>
    <div class="playBtn">
      <button v-for="n in 5" class="circle" @click="carousel(n)" :class="{on: index === n}"></button>
    </div> 
    <div>
      <!--这里显示文字：参考别的http://echarts.baidu.com/这样的网站上面对产品的描述，样式自己设计，然后transition那块只有进入的动画没有离开的动画需要修改，另外图片换成高清的黄老师文章的图片，如果没有就从网上下吧，不要用不清晰的图片哦~-->
    </div>
  </div>

</template>
    
<script>
require('../style/login.scss')
import vue from 'vue'
import dynamicThreed from '../components/DynamicThreed.vue'
export default {
  name: 'login', 
  data () {
    return {
      show:true,
      index:1,
      inv:5000,
  	  //引入滚动视窗图片
  	  slides: [
          /*{
            src:require('../assets/img/20180408_yue_gemma.gif')
          },*/
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
      this.show = false;
      setTimeout(()=>{
        this.show = true;
        this.index = n;
      },10)
      /*clearTimeout(this.inv);
      this.index = n;
      this.run()*/
    },
    run:function(){
      this.invId = setInterval(()=>{
        this.index+=1;
        if (this.index == 6) {
          this.index = 1
        }
        this.carousel(this.index);
      }, this.inv);
      /*var timeout=3000;
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
      },timeout);*/
    }
  },
  components: {
    dynamicThreed
  }
}
</script>