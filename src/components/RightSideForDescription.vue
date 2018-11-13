<template>
  <div class="right-container-descrip">
    <header class="title"><p>数据内容描述</p></header><!-- /header -->
    <div class="right-container-descrip-content">
      <table id="datatables" >
		    <col style="width: 15%" />
        <col style="width: 35%" />
		    <col style="width: 15%" />
        <col style="width: 35%" />
        <tr>
          <th>标题：</th>
		      <td>标题</td>
          <th>提供者：</th>
          <td>National Publical Organization</td>
		    </tr>
        <tr>
          <th>关键字：</th>
          <td>关键词</td>
          <th>数据类型:</th>
          <td>数据类型</td>
        </tr>			
        <tr>
          <th>坐标系：</th>
          <td>坐标系</td>
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
          <td>更新日期</td>
        </tr> 
		</table>	
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import messageBus from '../bus/messageBus';
require('../style/main_style.scss')

export default {
  name: 'RightSideForDataView',
  data () {
    return {
 
    }
  },
  computed:{
    ...mapState({
      parentNodeIndex: state => state.parent_node_index,
      childNodeIndex: state => state.child_node_index
	  }),
    dataA(){
      return this.$store.state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].url;
    },
  }
}
</script>
