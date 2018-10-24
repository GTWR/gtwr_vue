<template>
  <div class="slides">
    <img :src='slides[0].src' class="active">
    <img v-for="i in [1,2,3]" :src='slides[i].src' >
    <div class="playBtn">
      <button v-for="n in [0,1,2,3]" class="circle" @click="carousel(n)" :class="{on: index === n}"></button>
    </div>  
  </div> 
</template>

<script>
require('../../style/firstPage.scss')

export default {
  name: 'hello', 
  data () {
    return {
      imgs:null,
      slide:null,
      index:0,
      show:true,
      inv:2000,
      //引入滚动视窗图片
      slides: [
          {
              src:require('../../assets/img/test1.jpg'),
          },
          {
              src:require('../../assets/img/test2.jpg'),
          },
          {
              src:require('../../assets/img/test3.jpg'),
          },
          {
              src:require('../../assets/img/test4.jpg'),
          }
      ]
    }
  },
  mounted(){
    this.run();
    this.slide = document.getElementsByClassName('slides')[0];
    this.imgs = this.slide.getElementsByTagName('img');
  },
  methods:{
    carousel:function(n){
      this.imgs[this.index].className = "";
      setTimeout(()=>{
        this.index = n;
        this.imgs[this.index].className = "active";
      },10)
    },
    run:function(){
      this.invId = setInterval(()=>{
        this.imgs[this.index].className = "";
        this.index+=1;
        if (this.index == this.slides.length) {
          this.index = 0
        }
        this.imgs[this.index].className = "active";
      }, this.inv);     
    }
  }
}
</script>