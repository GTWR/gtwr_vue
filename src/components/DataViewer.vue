<template>
  <div class="data-container">
  	<header class="title"><p>数据列表</p></header><!-- /header -->
  	<div id="data-table">
      <table>
        <tr>
          <th v-for="(value,key) in (dataA[0].features?dataA[0].features[0].properties:dataA[0])">
            {{key}}
          </th>
        </tr>
        <tr v-for="line in (dataA[0].features?dataA[0].features:dataA)">
          <td v-for="(value,key) in (dataA[0].features?line.properties:line)">{{value}}</td>
        </tr>
      </table> 
    </div>
  </div>
</template>

<script>
require('../style/dataViewer.scss')
import store from '@/store/store'
import {mapState} from 'vuex'

export default {
  name: 'ParDefiner',
  data () {
    return {
      
    }
  },
  store,
  mounted(){
    
  },
  computed:{
    ...mapState({
        // ...
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index
	  /*,
      dataA:state => state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url*/
    }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    },

  },
  whatched:{

  },
  methods:{

  }
}
</script>
