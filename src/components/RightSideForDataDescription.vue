<template>
  <div>
    <h1>{{dataA}}</h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components:{
  },
  mounted(){
    /*alert(store.state.parent_node_index)*/
  },
  computed:{
    ...mapState({
        // ...
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index/*,
      dataA:state => state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url*/
    }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    }
  },
}
</script>
