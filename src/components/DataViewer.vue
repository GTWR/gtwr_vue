<template>
  <div class="data-container">
  	<header class="title"><p>数据列表</p></header><!-- /header -->

  	<div class="data-head">
      <table>
        <tr>
          <th v-for="(value,key) in (dataA[0].features?dataA[0].features[0].properties:dataA[0])">
            {{key}}
          </th>
        </tr>
	  </table>
	 </div>
	 <div class="data-table">
	  <table id="t1">
        <tbody>
          <tr v-for="line in (dataA[0].features?dataA[0].features:dataA)" >
            <td v-for="(value,key) in (dataA[0].features?line.properties:line)">{{value}}<a :name="line.properties.name"></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
require('../style/dataViewer.scss')
import {mapState} from 'vuex'
import bus from '../js/public.js'

export default {
  name: 'ParDefiner',
  data () {
	titlename:''
    return {

    }
  },
  mounted(){
    this.getEventData()
  },
  computed:{
    ...mapState({

      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index
	  }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    },
  },
  watch:{

  },
  methods:{
	getEventData(){
		const that = this;
		//接收点击要素的name值，传给titlename
		bus.$on('event-to-chart',function(val){
		that.titlename=val});
		//找出对应表行
		var tr;
		var aa= that.titlename;
		if(aa !=""){
			for(var i=0;i<t1.rows.length;i++){
				t1.rows[i].bgColor='';
			}    
		tr=document.getElementById(aa).parentElement;//返回该列的所在行tr
		tr.bgColor='red';
		window.location.href="#"+aa;
    }

	},

  }
}
</script>
