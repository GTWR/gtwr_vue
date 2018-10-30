<template>
<div class="chartAnalysis">
    <table style="width:100%;height:100%">
        <tr v-for="trInd in [0,1,2]">
            <td colspan="2" rowspan="2" v-if="trInd == 0"><map-result></map-result></td>
            <td v-for="index in trInd==0?[0]:trInd==1?[1]:[2,3,4]">
                <!-- 图块显示文字，点击文字可以设置图表参数 -->
                <a class="add-chart-par" @click="showParPanel(index)" v-show="addChartIconShow[index]">点击此处添加数据图表...</a>
                <!-- 设置图表参数 -->
                <div class="chart-par-setting" v-show="chartParSettingPanelShow[index]">
                    <p>选择数据图表横纵坐标</p>
                    <a>图表标题: </a>
                    <input v-model="par['chart'+(index+1)]['title']"><br/>
                    <a>图表类型: </a>
                    <select v-model="par['chart'+(index+1)]['chartType']"><option v-for="item in chartType">{{item}}</option></select><br/>
                    <a>横坐标: </a>
                    <select v-model="par['chart'+(index+1)]['heng']"><option v-for="item in Object.keys(computeResult[0].properties)">{{item}}</option></select><br/>
                    <a>纵坐标: </a>
                    <select v-model="par['chart'+(index+1)]['zong1']"><option v-for="item in Object.keys(computeResult[0].properties)">{{item}}</option></select>
                    <img src="../../assets/img/add.png" @click="addZongNode(index)" v-show="!zongNodeShow[index]"><br/>
                    <a v-show="zongNodeShow[index]">纵坐标: </a>
                    <select v-show="zongNodeShow[index]" v-model="par['chart'+(index+1)]['zong2']"><option v-for="item in Object.keys(computeResult[0].properties)">{{item}}</option></select><br/>
                    <button @click="parSettingSubmit(index,par['chart'+(index+1)]['title'],par['chart'+(index+1)]['heng'],par['chart'+(index+1)]['zong1'],par['chart'+(index+1)]['zong2'],par['chart'+(index+1)]['chartType'])">完成</button>
                </div>
                <!-- 显示，绘制图表 -->
                <div :id="chartPanelId(index)" class="chart" v-show="chartPanelShow[index]"></div>
            </td>
        </tr>
    </table>    
</div> 
</template>

<script>
import echarts from 'echarts'
import'echarts-gl'
import mapResult from './MapForResult'
import {mapState} from 'vuex'
import messageBus from '../../bus/messageBus.js'
require('../../style/rightSideForResult.scss')

export default {
    name: 'chartAnalysis',
    data () {
        return {
            dataFromMap:null,
            addChartIconShow:[true,true,true,true,true],//点击可以设置图标参数的文字显示
            chartParSettingPanelShow:[false,false,false,false,false],//图表参数设置面板显示
            chartPanelShow:[false,false,false,false,false],//图表面板显示
            zongNodeShow:[false,false,false,false,false],//添加的第二维纵坐标显示
            chartType:['scatter','bar'],//支持的图表类型
            par:{},//图表参数存储对象
            myChart:[null,null,null,null,null]//图表容器
        }
    },
    components:{
        mapResult
    },
    beforeMount(){
        //初始化生成图表参数
        for(let i=1,string;i<6;i++){
            string = 'chart'+i;
            this.par[string] = {
                title: null,
                chartType: null,
                heng: null,
                zong1: null,
                zong2: null
            }
        }
    },
    mounted(){
        this.listenValue();
    },
    computed:{
        ...mapState({
            parentNodeIndex: state => state.parent_node_index,
            childNodeIndex: state => state.child_node_index,
            computeResult: state => state.computeResult.data.features
        })
    },
    methods:{
        //监听地图点击事件传来的数据
        listenValue:function(){
            let self = this;
            messageBus.$on('data-for-chart',(prop)=>{    
                self.dataFromMap = prop;
                for(let i=0;i<self.myChart.length;i++){
                    let title = self.par['chart'+(i+1)]['title'],
                        heng = self.par['chart'+(i+1)]['heng'],
                        zong1 = self.par['chart'+(i+1)]['zong1'],
                        zong2 = self.par['chart'+(i+1)]['zong2'],
                        chartType = self.par['chart'+(i+1)]['chartType'];
                    //地图与数据表联动
                    self.myChart[i] && self.drawChart(i,title,heng,zong1,zong2,chartType)
                }
            });
        },
        //显示图表参数设置内容
        showParPanel:function(index){
            this.addChartIconShow.splice(index, 1, false);
            this.chartParSettingPanelShow.splice(index,1,true);
        },
        //添加第二维的纵坐标
        addZongNode:function(index){
            this.zongNodeShow.splice(index,1,true);
        },
        //设置图表容器id
        chartPanelId:function(index){
            return 'chart-panel'+(index+1);
        },
        //图表参数设置
        parSettingSubmit:function(index,title,heng,zong1,zong2,chartType){      
            if(heng && (zong1 || zong2) && chartType){
                this.chartParSettingPanelShow.splice(index,1,false);
                this.chartPanelShow.splice(index,1,true);
                this.drawChart(index,title,heng,zong1,zong2,chartType);
                !title && alert('没有选择图表标题哦~~')
            }else{
                alert('图表的横纵坐标等必要参数没有设置完全哦~~')
            }
        },
        //图表绘制
        drawChart:function(index,title,heng,zong1,zong2,chartType){
            let strId = 'chart-panel'+(index+1),
                scatterChart = document.getElementById(strId),
                app = {},data1=[],data2=[],series=[],self=this,yAxisName='',option,xAxisType;
            this.myChart[index] = echarts.init(scatterChart);
            for(let i=0;i<this.computeResult.length;i++){
                zong1 && data1.push([this.computeResult[i].properties[heng],this.computeResult[i].properties[zong1]]);
                zong2 && data2.push([this.computeResult[i].properties[heng],this.computeResult[i].properties[zong2]]);
            }
            zong1 && data1 && series.push({name:zong1,type:chartType,symbolSize:4,data:data1});
            zong2 && data2 && series.push({name:zong2,type:chartType,symbolSize:4,data:data2});
            if(zong1 && !zong2){yAxisName = zong1;}
            if(zong2 && !zong1){yAxisName = zong2;}
            if(zong2 && zong1){yAxisName = zong1+'/'+zong2;}
            this.dataFromMap && series.push({
                type: 'effectScatter',
                itemStyle:{color:'#FC4E2A'},
                symbolSize: 10,
                data: [[this.dataFromMap[heng],this.dataFromMap[zong1]],[this.dataFromMap[heng],this.dataFromMap[zong2]]],
            });
            xAxisType = chartType == 'bar'? 'category':'value';
            option = {
                title : {text: title},
                tooltip : {trigger: 'item'},
                grid: {x:40,bottom:45},
                toolbox: {show: true, feature: {
                    dataZoom: {},
                    saveAsImage: {},
                    myTool: {
                        show: true,
                        title: '删除图表',
                        icon: 'path://M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z',
                        onclick:function(){
                            self.chartParSettingPanelShow.splice(index,1,true);
                            self.chartPanelShow.splice(index,1,false);
                            self.myChart[index] = null;
                        }
                    }}},
                xAxis : [{name:heng,nameLocation:'center',nameGap:25,type : 'category',scale:true,splitNumber:4}],
                yAxis : [{name:yAxisName,type : 'value',scale:true}],
                legend: [{data: [zong1,zong2],right:0,top:30}],
                series : series
            };
            this.myChart[index].setOption(option, true);
            this.myChart[index].on('click', function(param) {
                console.log(param);//重要的参数都在这里！
            });
        }
    }
}
</script>
