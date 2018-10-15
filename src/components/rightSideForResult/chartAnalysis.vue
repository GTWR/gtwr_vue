<template>
  <div class="chartAnalysis">
    <map-result></map-result> 
    <div class="chart">
      <div id="scatter"></div>
      <div id="line"></div>
      <div id="three-d"></div>
    </div>  
  </div>
</template>

<script>
import echarts from 'echarts'
import'echarts-gl'
import mapResult from './MapForResult'
import messageBus from '../../bus/messageBus.js'
require('../../style/rightSideForResult.scss')

export default {
  name: 'chartAnalysis',
   data () {
    return {
        data_scatter:[],
    }
  },
  components:{
    mapResult
  },
  mounted(){
    //data_scatter数组属性初始化
    this.data_scatter={
        Living:0.149,
        Quality:0.209,
        Structure:0.25,
        Renovation:0.5,
        Condiction:0.333,
        Greenspace:0,
        Traffic:0.333,
        VIEW:0.337
    },
    this.DrawScatter();
    this.DrawBar();
    this.DrawPie();
    this.listenValue();
  },
  computed:{
   GetData(){
      return this.$store.state.data_list[0].data_type[2].url;
    }
  },
  methods:{
      listenValue:function(){
          messageBus.$on('data-for-chart',(prop)=>{
             this.data_scatter=prop,
             this.DrawBar(),
             this.DrawPie()
          });
      },

    //绘制第一幅散点图
    DrawScatter:function(){
      let scatterChart = document.getElementById('scatter');
      let myChart = echarts.init(scatterChart);
      let app = {};
      let data=[];
      for(let i=0;i<this.GetData[0].features.length;i++){
          data.push([this.GetData[0].features[i].properties.Oprice,this.GetData[0].features[i].properties.Pprice]);
      }//通过循环读取HousePrice.Json文件中的数据

    let option = {
     title: {
        text: '预测房价与真实房价',
    },
    tooltip: {
        trigger: 'item',
        formatter:function(param){
            return 'Observation:'+param.value[0]
                   +'<br>Prediction:'+param.value[1]
        },
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
            left: '0%',
            right: '13%',
            bottom: '0%',
            containLabel: true
        },
    xAxis: {
        type: 'value',
        name:'Obser-'+'\n'
             +'vation',
        nameGap:2,
         nameTextStyle:{
                    fontSize:'10'
                },
        scale:true,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    yAxis: {
        type: 'value',
        name:'Prediction',
        scale:true,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    series: [{
        symbolSize: 10,
        data :data,
        type: 'scatter'
    }]
};
      myChart.setOption(option, true);
    },
    
    //绘制第二幅直方图
    DrawBar:function(){
      let scatterChart = document.getElementById('line');
      let myChart = echarts.init(scatterChart);
      let app = {};
      let option = {
          title : {
              text: '影响房价的各个因子'
          },
              color:['#3398DB'],
         grid: {
            left: '0%',
            right: '13%',
            bottom: '0%',
            containLabel: true
        },
          tooltip:{
              trigger:'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
             },
         label:{
              show:true,
              position:'top',
              color:'#3398DB'
    },
        xAxis: {
              name:'Factor',
              nameGap:2,
              nameTextStyle:{
                    fontSize:'10'
                },
              axisLabel:{
                   textStyle:{
                        fontSize:10
                   }
                },
              type: 'category',
              data: ['Living', 'Quality', 'Struct', 'Renova', 'Condic', 'Greens', 'Traffic','VIEW']
        },
        yAxis: {
             name:'Value',
             type: 'value'
        },
        series: [{
            data:[this.data_scatter.Living,this.data_scatter.Quality,this.data_scatter.Structure,this.data_scatter.Renovation,
                  this.data_scatter.Condiction,this.data_scatter.Greenspace,this.data_scatter.Traffic,this.data_scatter.VIEW],
            type: 'bar'
        }]
      };
      myChart.setOption(option, true);
    },
    //绘制第三幅饼图
   DrawPie:function(){
      let scatterChart = document.getElementById('three-d');
      let myChart = echarts.init(scatterChart);
      let app = {};
      let option = {
         title : {
              text: '影响房价的各个因子占比'
          },
          toolbox: {
              show : false
          },
          legend: {
                       orient: 'vertical',
                       x : 'right',
                       y : 'top',
                       textStyle:{
                           fontSize:10
                       },
                      data:['Living:'+this.data_scatter.Living,'Quality:'+this.data_scatter.Quality,'Struct:'+this.data_scatter.Structure,
                            'Renova:'+this.data_scatter.Renovation,'Condic:'+this.data_scatter.Condiction,'Greens:'+this.data_scatter.Greenspace,
                            'Traffic:'+this.data_scatter.Traffic,'VIEW:'+this.data_scatter.VIEW]
                   },
          calculable : true,
          series : [
              {
                  name:'半径模式',
                  type:'pie',
                  radius : [10, 60],
                  roseType : 'radius',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  lableLine: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  data:[
                      {value: this.data_scatter.Living, name:'Living:'+this.data_scatter.Living},
                      {value:this.data_scatter.Quality, name:'Quality:'+this.data_scatter.Quality},
                      {value:this.data_scatter.Structure, name:'Struct:'+this.data_scatter.Structure},
                      {value:this.data_scatter.Renovation, name:'Renova:'+this.data_scatter.Renovation},
                      {value:this.data_scatter.Condiction, name:'Condic:'+this.data_scatter.Condiction},
                      {value:this.data_scatter.Greenspace, name:'Greens:'+this.data_scatter.Greenspace},
                      {value:this.data_scatter.Traffic, name:'Traffic:'+this.data_scatter.Traffic},
                      {value:this.data_scatter.VIEW, name:'VIEW:'+this.data_scatter.VIEW}
                  ]
              }
          ] 
      }
      myChart.setOption(option, true);
    },
   
  }
}
</script>
