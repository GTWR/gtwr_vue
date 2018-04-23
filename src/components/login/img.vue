<template>
  <div id="hello">
    <img :src='imgsrc'></img>
  </div>
</template>

<script>
require('../../style/login.scss')

export default {
  name: 'hello', 
  data () {
    return {
    }
  },
  props:['imgsrc']
}
</script>