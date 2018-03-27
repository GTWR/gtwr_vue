<template>
  <div>
    <h1>{{dataA}}</h1>
  </div>
</template>

<script>
import store from '@/store/store'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  store,
  components:{
  },
  mounted(){
    /*alert(store.state.parent_node_index)*/
  },
  computed:{
    parentNodeIndex(){
      return this.$store.state.parent_node_index
    },
    childNodeIndex(){
      return this.$store.state.child_node_index
    },
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url
    }
  },
}
</script>
