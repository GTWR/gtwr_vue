<template>
  <div class="data-description">
    <div id="meta">
    <header class="title"><p>元数据信息</p></header>
	    <table id="datatables" >
		<col style="width: 15%" />
        <col style="width: 35%" />
		<col style="width: 15%" />
        <col style="width: 35%" />
        <tr>
        <th>标题：</th>
		<td>{{titles}}</td>
		<th>提供者：</th>
		<td>National Publical Organization</td>
		</tr>
		
		<tr>
		<th>关键字：</th>
		<td>{{titles}}</td>
		<th>数据类型:</th>
		<td>{{keywordss.type}}</td>
		</tr>
			
		<tr>
		<th>坐标系：</th>
		<td>{{CRS_CO}}</td>
		<th>数据大小(MB):</th>
		<td>11</td>
		</tr>
		
		<tr>
		<th>条带数：</th>
		<td>3</td>
		<th>宽度(像素):</th>
		<td>1240</td>
		</tr>
		
		<tr>
		<th>分辨率 X：</th>
		<td>0.000138888884</td>
		<th>高度(像素):</th>
		<td>1240</td>
		</tr>
		
		<tr>
		<th>分辨率 Y：</th>
		<td>-0.000138888884</td>
		<th>更新日期:</th>
		<td>{{updatetime}}</td>
		</tr> 
		
		</table>
		
		
		<div class="screenshot">
			
			<div class="top-lat"><p>36.00</p><br></div>
			<div class="left-long" style="float:left;"><p>75.99</p></div>			
			<div class="content12">
				<div class="map-container"><img :src="smallpic.src" style="height:170px;width:170px;"></div>
			</div>			
			<div class="right-long" style="float:right;"><p>78.00</p></div>					
			<div class="bottom-lat"><br><p>33.99</p></div>
			
		</div>
    </div>	
	
	
	
	<div id="detail">
	<header class="title"><p>数据描述信息</p></header>
	<div id="data-table">
	  <div class="child_name">{{titles}}</div>
	  <p><img src="../assets/img/c2.png" height="15" width="15">&nbsp更新日期：{{updatetime}}</p>
	  <p>{{detaildescriptions}}</p>
    
		<div id="access_information">
		<p><img src="../assets/img/33.png" height="15" width="15">&nbsp访问&使用信息</p>
	  <p>
	    <img src="../assets/img/Network copy.png" height="14" width="14">
		&nbsp公开性：这个数据集是用于公共访问和使用的。<br>
	    <img src="../assets/img/magnify copy.png" height="14" width="14">
		&nbsp非政府性：这个数据集涉及到不同的使用条款，而不是政府数据。<br>
	    <img src="../assets/img/docu.png" height="14" width="14">
		&nbsp许可证：请参阅此页以获得许可信息。
	  </p>
	</div>
    </div>
	</div>
  </div>
  
</template>

<script>

import Leaflet from 'leaflet'
import store from '@/store/store'
require('../style/RightSideForDataDescription.scss')

import {mapState} from 'vuex'


export default {
  name: 'Home',
  data () {
    return {
		map: null
    }
  },
  components:{
  },
  mounted(){
  },
  computed:{

    parentNodeIndex(){
      return this.$store.state.parent_node_index
    },
    childNodeIndex(){
      return this.$store.state.child_node_index
    },
	grandsonNodeIndex(){
      return this.$store.state.grandson_node_index
    },
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url
    },
	titles(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].name
	},
	keywordss(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].children[this.grandsonNodeIndex]
	},
	datatypes(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url.type
	},
	detaildescriptions(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].descriptions
	},
	updatetime(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].update_time
	},
	CRS_CO(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].crs
	},
	smallpic(){
	return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex]
	},

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
    methods:{
  	
	
  }
}
</script>

