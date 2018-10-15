<template>
  <div class="data-selector">
  	<header class="title"><p>数据选择</p></header><!-- /header -->
    <!--数据列表-->
  	<div class="data-list" id="data-list">
  		<div v-for="data,index in data_list">
			  
		  	<div class="parent_node">
		  		<img :src="data.src">
		  		<b>{{data.name}}</b>
		  		<!-- <span @click="openfolder(index)">+</span> -->
		  	</div>
		  					
   
		  	<div class="child_list">
  				<div class="data_drag_container" v-if="data.name == '私有数据'" style="position: relative;">				
  					<img class="normalFace" src="../assets/img/add.png" height="30" width="30" >
            		<input  type="file"  id="file"  onchange="upload(this)"  style="opacity:0; position: absolute;top: 11px;left: 5px;padding-left: 100px;width:150px;cursor:pointer;height: 50px;" >
  	 				<p>拖拽本地文件到此处</p>   
  				</div>
  				
  				
  		  	<div v-for="child,index1 in data.data_type" >
    				<div>
    		  		<div class="child_node" @click="showDataView(index,index1,0)">					
    		  				<p>
        						<input type="checkbox" @click="checkParent(index,index1)" :data-parentIndex="index1"/>
        						{{child.name}}
        		  				<!-- <span @click="child.open=child.open?false:true">+</span> -->
                  </p>
    					</div>
    		  		<div class="grand_son_list2">
    					  <div class="grand_son_list">
      						<div v-for="grandson,index2 in child.children">
      							<p> 
      								<input type="checkbox" :data-index="index1"/>
      								<img :src="grandson.src">
      								{{grandson.name}}
      								<!-- <button    :class="{highlight:  childIndex==index1 && grandsonIndex==index2 &&btid==1}" @click="showDataDescription(index,index1,index2)" >说明</button> -->
      								<button    :class="{highlight: childIndex==index1 &&grandsonIndex==index2}" @click="showDataView(index,index1,index2)" >预览</button>
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
      grandsonIndex:0,
      open:[],
      par_list_temp:null,
      btid:1
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
    			$(domEle).show("slow");  
			});
			  });
	
  },
  computed:{
    ...mapState({
        // ...
      data_list: state => state.data_list,
      cover_show: state => state.cover_show,
      par_list:state=>state.par_list
      /*open:state => state.data_list[this.parentNodeIndex].data_type[this.childNodeIndex].open*/
    })
  },
  methods:{
  	//控制父节点的开关，用户登录支持开关，但是匿名登录不支持开关
  	/*openfolder:function(index){
  		store.state.data_list[index].open =store.state.data_list[index].open ? false:true; 
  	},*/
  	//控制子节点的开关
  	/*openfolderForSon:function(index,index1){
      this.data_list[index].data_type[index1].open = this.data_list[index].data_type[index1].open? false:true;
  	},*/
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
  	// showDataDescription:function(index,index1,index2){

    //             this.$router.push({path:'/home/datadescription'}); 		
    //             this.IndexChange(index,index1,0);
    //             this.childIndex = index1;
    //             this.grandsonIndex = index2;
    //            this.btid=1;//给说明按钮一个标识号，用于高亮
  	// },

  	//预览按钮
  	showDataView:function(index,index1,index2){
                this.$router.push({path:'/home/dataview'});
               //alert(index2)
                this.IndexChange(index,index1,index2);
                this.childIndex = index1;
                this.grandsonIndex = index2;
  	},
    IndexChange:function(index,index1,index2){
      this.parentIndex = index;
      this.childIndex = index1;
      this.grandsonIndex = index2;
      this.$store.dispatch('parentIndexAction' , this.parentIndex);
      this.$store.dispatch('childIndexAction' , this.childIndex);
      this.$store.dispatch('grandSonIndexAction' , this.grandsonIndex);
      //alert(this.parentIndex+','+this.childIndex+','+this.grandsonIndex)
    },
	  
    
    checkParent:function(index,index1){
      //父节点勾选，子节点全部勾选；父节点取消勾选，子节点全部取消勾选
     
      var dataList = document.getElementById('data-list')
      var checkChildren = dataList.getElementsByTagName('input');
      var check;
      for (var i = 0; i < checkChildren.length; i++) {
        let attr = checkChildren[i].getAttribute('data-index');
        let parentAttr = checkChildren[i].getAttribute('data-parentIndex');
        if (parentAttr != null && parentAttr == index1) {
          check = checkChildren[i].checked
        }
        if (attr != null && attr == index1) {
          checkChildren[i].checked = check;
        }
      }
      //控制遮罩层及参数设置页面的显示
      if (check == true) {
        this.$store.dispatch('coverShowAction',true);
      }else{
        //当取消点选时，参数设置清空
        this.par_list_temp = this.par_list
        for (var i = 0; i < this.par_list.length; i++) {
          this.par_list_temp[i].value = '';
        }
        this.$store.dispatch('parListAction',this.par_list_temp)
      }
      
      //提交所选择的父节点索引到vuex
      this.IndexChange(index,index1,0);

    }
  
  }
}
function upload(input) {
  //支持chrome IE10
  if (window.FileReader) {
    var file = input.files[0];
    filename = file.name.split(".")[0];
    var reader = new FileReader();
    reader.onload = function() {
      console.log(this.result)
      alert(this.result);
    }
    reader.readAsText(file);
  } 
  //支持IE 7 8 9 10
  else if (typeof window.ActiveXObject != 'undefined'){
    var xmlDoc; 
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
    xmlDoc.async = false; 
    xmlDoc.load(input.value); 
    alert(xmlDoc.xml); 
  } 
  //支持FF
  else if (document.implementation && document.implementation.createDocument) { 
    var xmlDoc; 
    xmlDoc = document.implementation.createDocument("", "", null); 
    xmlDoc.async = false; 
    xmlDoc.load(input.value); 
    alert(xmlDoc.xml);
  } else { 
    alert('error'); 
  } 
}



</script>