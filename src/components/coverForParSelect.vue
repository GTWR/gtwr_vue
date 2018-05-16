<template>
  <div class="cover">
    <div class="box-container">
      <header class="title"><p>参数设置</p></header>
      <div class="main">
        <div v-for="(par,index) in par_list">
          <span>{{par.name}}:</span>
          <select v-model="par_list[index].value">
            <option disabled value="">请选择</option>
            <option :value="childNodeIndex==0?'州级边界':'省级中心'">{{childNodeIndex==0?'州级边界':'省级中心'}}</option>
            <option v-for="(option,key) in dataA[0].features[0].properties" :value="key">{{key}}</option>
          </select>
          
        </div>
      </div>
      <button class="submit" style="vertical-align:middle" @click="submitPar" ><span>提交</span></button>
    </div>
    <img src="../assets/img/close.png" height="20" width="20" @click="submitPar">
  </div>
</template>

<script>
require('../style/cover.scss')
import {mapState} from 'vuex'

export default {
  name: 'cover',
  data () {
    return {
      
    }
  },
  mounted(){
    
  },
  computed:{
    ...mapState({
        // ...
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index,
      grandSonNodeIndex: state => state.grandson_node_index,
      par_list: state=> state.par_list
    }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    },
  },
  methods:{
    submitPar:function(){
      //关闭遮罩层与参数设置面板
      this.$store.dispatch('coverShowAction',false);
    },
  }
}
</script>
