<template>
  <div class="data-selector">
  	<header class="title"><p>数据选择</p></header><!-- /header -->
  	<div class="data-list">
  		<div v-for="data,index in data_list">
		  	<div class="parent_node">
		  		<img :src="data.src">
		  		<b>{{data.name}}</b>
		  		<!-- <span @click="openfolder(index)">+</span> -->
		  	</div>
		  	<div class="child_list" v-show="data.open">
		  		<div v-for="child,index1 in data.data_type">
		  			<div class="child_node" @click="showDataView">
		  				<p>{{child.name}}
		  				<!-- <span @click="child.open=child.open?false:true">+</span> --></p>
		  			</div>
		  			<div class="grand_son_list" v-show="child.open">
						<div v-for="grandson in child.children">
							<p>
								<img :src="grandson.src">
								{{grandson.name}}
								<button @click="showDataDescription(index,index1)" v-if="child.name != 'Demo'">说明</button>
								<button @click="showDataView(index,index1)"  v-if="child.name != 'Demo'">预览</button>
							</p>
						</div>
		  			</div>
		  		</div>
		  	</div>
		</div>
	</div>
	<div class="data_drag_container">
		<img src="../assets/img/add.png" height="30" width="30">
		<p>拖拽本地文件到此处</p>
	</div>
  </div>
</template>

<script>
require('../style/dataSelector.scss')
import csvFileLogo from '../assets/img/csv.png'
import geojsonFileLogo from '../assets/img/mind_map.png'
import serviceFileLogo from '../assets/img/service.png'
import {mapState} from 'vuex'

export default {
  name: 'DataSelector',
  data () {
    return {
      parentIndex: 0,
      childIndex:0,
      open:[]
    }
  },
  mounted(){
  	this.initDataTypeLogo();
  },
  computed:{
    ...mapState({
        // ...
      data_list: state => state.data_list,

      /*open:state => state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].open*/
    })
  },
  methods:{
  	//控制父节点的开关，用户登录支持开关，但是匿名登录不支持开关
  	openfolder:function(index){
  		/*store.state.data_list[index].open =store.state.data_list[index].open ? false:true; */
  	},
  	//控制子节点的开关
  	openfolderForSon:function(index,index1){
      this.data_list[index].data_type[index1].open = this.data_list[index].data_type[index1].open? false:true;
  	},
  	//为不同的数据类型添加不同的图标
  	initDataTypeLogo:function(){
  		let temp =this.data_list[0].data_type;
  		for(let i=0; i< temp.length;i++){
  			for(let j=0; j < temp[i].children.length;j++){
  				const regCsv = RegExp(/\.csv/)
  				const regGeo = RegExp(/\.geojson/)
  				if (temp[i].children[j].name.match(regCsv)) {
  					temp[i].children[j].src = csvFileLogo;
  				}else if(temp[i].children[j].name.match(regGeo)){
  					temp[i].children[j].src = geojsonFileLogo;
  				}else{
  					temp[i].children[j].src = serviceFileLogo;
  				}
  			}
  		}
  	},
  	//说明按钮
  	showDataDescription:function(index,index1){
  		this.$router.push({path:'/home/datadescription'}); 		
      this.IndexChange(index,index1);

  	},
  	//预览按钮
  	showDataView:function(index,index1){
  		this.$router.push({path:'/home/dataview'});
  		this.IndexChange(index,index1);
  	},
    IndexChange:function(index,index1){
      this.parentIndex = index;
      this.childIndex = index1;
      this.$store.dispatch('parentIndexAction' , this.parentIndex);
      this.$store.dispatch('childIndexAction' , this.childIndex);
    }
  }
}
</script>
