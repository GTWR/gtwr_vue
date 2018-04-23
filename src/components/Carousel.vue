<template>
<!--当鼠标移出的时候，可以轮播，那就调用 run；如果鼠标移入，停止轮播，那就清除定时器，clear-->
  <div class="slide-show" @mouseover="clear" @mouseout="run">
    <!-- 新旧图片的移入移出 -->
	  <div class="slide-img">
      <a>
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides" @click="goto(index)">
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
 // nowIndex 为 0，所以初始化的时候，显示的是第一张图片。
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      }
      else {
        return this.nowIndex - 1
      } 
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      }
      else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
	//自动轮播，需要用到的就是定时器，即每隔一个时间就调用一次 goto（index）
    run () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clear () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    this.run();
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .75s;
}
.slide-trans-enter {
  transform: translateX(591px);
}
.slide-trans-old-leave-active {
  transition: all .75s;
  transform: translateX(-591px);
}
.slide-show {
  position: relative;
  border-radius:8px;
  /* border:1px solid rgba(120,120,120,0.75); */
  border: none;
  top:10%;
  margin:0 auto;
  width: 591px;
  height: 430px;
  overflow: hidden;
  /* box-shadow:3px 3px 3px rgba(120, 120, 120, .75); */
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .25;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>