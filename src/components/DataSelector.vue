<template>
  <div class="data-selector">
  	<header class="title"><p>数据选择</p></header><!-- /header -->
    <!--数据列表-->
  	<div class="data-list">
  		<div v-for="data,index in data_list">
			  
		  	<div class="parent_node">
		  		<img :src="data.src">
		  		<b>{{data.name}}</b>
		  		<!-- <span @click="openfolder(index)">+</span> -->
		  	</div>
			
		  					
		  	<div class="child_list" v-show="data.open">
  				<div class="data_drag_container" v-if="data.name == '私有数据'">				
  					<img src="../assets/img/add.png" height="30" width="30" >
  					<p>拖拽本地文件到此处</p>    
  				</div>
  				
  				
  		  	<div v-for="child,index1 in data.data_type" >
    				<div>
    		  		<div class="child_node" @click="showDataView(index,index1)">					
    		  				<p>
        						<input type="checkbox" id="chkall2" />
        						{{child.name}}
        		  				<!-- <span @click="child.open=child.open?false:true">+</span> -->
        						<input type="hidden" id="selectHideValue" />
                  </p>
    					</div>
    		  		<div class="grand_son_list2">
    					  <div class="grand_son_list" v-show="child.open">
      						<div v-for="grandson in child.children">
      							<p>
      								<input type="checkbox" />
      								<img :src="grandson.src">
      								{{grandson.name}}
      								<button @click="showDataDescription(index,index1)">说明</button>
      								<button @click="showDataView(index,index1)">预览</button>
      							</p>
      						</div>
    		  			</div>
              </div>

    				</div>
  				</div>


  		  </div> 
  		</div>
  	</div>
	  <!--数据列表end-->
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
    components: {
            
        },
  mounted(){
  	this.initDataTypeLogo();
	$(document).ready(function (){  
		//找到所有的span，并且点击span以后，控制一下元素div的显示和隐藏  
		$(".parent_node").click(function (){  
			$(this).next().toggle("slow");  
		});   
		//初始化时隐藏状态  
		$(".child_list").each(function (index,domEle){  
			$(domEle).toggle("slow");  
        });  
    });
	
    $(function () {  
	//勾选框设置1
            $("#chkall2").prop("class", ".grand_son_list2") //初始化  
            $("#chkall2").click(function () {var objectli = $("#chkall2").prop("class");  
                $(this).prop('checked', this.checked)  
                $(objectli).find(":checkbox").prop('checked', this.checked)  
                GetSelectValues();  
            });    
            $(".grand_son_list2").find(":checkbox").click(function () {var objectli = $("#chkall2").prop("class");  
                var expr1 = $(objectli).find(":checkbox:checked");  
                var expr2 = $(objectli).find(":checkbox");  
                var selectAll = $(expr1).length == $(expr2).length;  
                $('#chkall2').prop('checked', selectAll);  
                GetSelectValues();  
            });  
            function SetChkStatus() {var objectli = $("#chkall2").prop("class");  
                var expr1 = $(objectli).find(":checkbox:checked");  
                var expr2 = $(objectli).find(":checkbox");  
                var selectAll = $(expr1).length == $(expr2).length;  
                $('#chkall2').prop('checked', selectAll);  }
            });
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
	    let temp1 =this.data_list;
		for(let q=0;q< temp1.length;q++){
  		let temp =this.data_list[q].data_type;
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
  		}}
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
    },
	  
  
  
  }
}
</script>
