<template>
  <div class="data-selector">
    <header class="title"><p>数据选择</p></header>
    <!--数据列表-->
    <div class="data-list" id="data-list">
      <div v-for="data,index in data_list">       
        <div class="parent_node">
          <img :src="data.src">
          <b>{{data.name}}</b>
        </div>   
        <div class="child_list">
          <div class="data_drag_container" v-if="data.name == '私有数据'" style="position: relative;">        
            <img class="normalFace" src="../assets/img/add.png" height="30" width="30" >
                <input  type="file"  id="file"  onchange="upload(this)"  style="opacity:0; position: absolute;top: 11px;left: 5px;padding-left: 100px;width:150px;cursor:pointer;height: 50px;" >
            <p>拖拽本地文件到此处</p>   
          </div>          
          <div v-for="child,index1 in data.data_type" >
              <div class="child_node" @click="showDataView(index,index1,0)">          
                  <p :data-parentIndex="index1">
                    <img class="child_node_img" :src='ImgParentNodeSrc'>
                    {{child.name}}
                  </p>
              </div>
              <div class="grand_son_list2">
                <div class="grand_son_list">
                  <div v-for="grandson,index2 in child.children">
                    <p> 
                      <img :src='ImgChildNodeSrc'>
                      {{grandson.name}}
                      <button    :class="{highlight:  childIndex==index1 && grandsonIndex==index2 &&btid==2}" @click="showDataView(index,index1,index2)" >预览</button>
                    </p>
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
import {mapState} from 'vuex'

export default {
  name: 'DataSelector',
  data () {
    return {
      parentIndex: 0,
      childIndex:0,
      grandsonIndex:0,
      ImgChildNodeSrc:require('../assets/img/service.png'),
      ImgParentNodeSrc:require('../assets/img/mind_map.png'),
      btid:0 //说明和预览两个按钮的ID号,用于按钮高亮
    }
  },
  components: {           
  },
  mounted(){
    //控制点击节点，收起列表的动画
    $(document).ready(function (){  
        //找到所有的span，并且点击span以后，控制一下元素div的显示和隐藏  
        $(".parent_node").click(function (){  
          $(this).next().toggle("slow");  
        });   
        //初始化时隐藏状态  
        $(".child_list").each(function (index,domEle){  
          $(domEle).show("slow");  
        });
        $(".child_node").click(function (){  
          $(this).next().toggle("slow");  
        });
        $(".grand_son_list").each(function (index,domEle){  
          $(domEle).show("slow");  
        });
    });
  },
  computed:{
    ...mapState({
      data_list: state => state.data_list,
      par_list:state=>state.par_list
    })
  },
  methods:{
    //预览按钮
    showDataView:function(index,index1,index2){
      this.$router.push({path:'/home/dataview'});
      this.IndexChange(index,index1,index2);
      this.childIndex = index1;
      this.grandsonIndex = index2;
      this.btid=2;//给预览按钮一个标识号，用于高亮
    },
    //传输目前选择的节点的index到vuex
    IndexChange:function(index,index1,index2){
      this.parentIndex = index;
      this.childIndex = index1;
      this.grandsonIndex = index2;
      this.$store.dispatch('parentIndexAction' , this.parentIndex);
      this.$store.dispatch('childIndexAction' , this.childIndex);
      this.$store.dispatch('grandSonIndexAction' , this.grandsonIndex);
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