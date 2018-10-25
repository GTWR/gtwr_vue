<template>
  <div class="precision-canel">
    <div class="chart-container">
      <div class="row">
        <div class="chart" id="scatter1"></div>
        <div class="chart" id="scatter2"></div>
        <div class="chart" id="3DScatter"></div>
      </div>
      <div class="row">
        <div class="chart" id="radar"></div>
        <div class="chart" id="pie"></div>
        <div class="chart" id="His"></div>
      </div>
    </div>
    <div class="text-container">
      <header class="title"><p>精度描述</p></header><!-- /header -->
      <p>二维散点图1：横坐标为时间轴，纵坐标为预测房价和真实房价，该图表明预测房价和真实房价之间没有明显的类别差异，GTWR算法较为准确地拟合了该地区的房价。</p>
      <p>二维散点图2：横坐标为真实房价，纵坐标为预测房价，该图表明预测房价和真实房价之间正相关，可以用一次线性拟合二者关系</p>
      <p>三维散点图：X坐标为预测要素Living，Y坐标为预测要素Quality,Z坐标为预测房价，该图表明Living和Quality要素对房价的影像。</p>
    <p>雷达图：九个坐标分别为Living，Quality,Struct,Renova,Condic,Greens,Traffic,View,Residual，该图预测房价所对应九个影响因素的占比。</p>
    <p>饼图：九个扇形部分分别为Living，Quality,Struct,Renova,Condic,Greens,Traffic,View,Residual，该图表示预测房价的各个因素的平均值以及在评估房价中所占的比例。</p>
    <p>直方图：该图表示影响预测房价各个因子的平均值。</p>

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import'echarts-gl'
import {mapState} from 'vuex'
require('../../style/rightSideForResult.scss')

export default {
  name: 'precision',
  data () {
    return {     
    }
  },  
  components:{
  },
  mounted(){
    this.drawScatter1();
    this.drawScatter2();
    this.draw3DScatter();
    this.drawRadar();
    this.drawPie();
    this.drawHis();
  },
  computed:{
    ...mapState({
      computeResult: state => state.computeResult
    }),
  },
  methods:{
    //绘制第一幅散点图
    drawScatter1:function(){
      let scatterChart = document.getElementById('scatter1');
      let myChart = echarts.init(scatterChart);
      let app = {};
      let data1=[];
      let data2=[];
      for(let i=0;i<this.GetData[0].features.length;i++){
          data1.push([this.GetData[0].features[i].properties.Timestamp,this.GetData[0].features[i].properties.Pprice]);
          data2.push([this.GetData[0].features[i].properties.Timestamp,this.GetData[0].features[i].properties.Oprice]);
      }//通过循环读取HousePrice.Json文件中的数据

      let option = {
        title : {
            text: '预测房价与实际房价关系',
        },
        tooltip : {
             trigger: 'axis',
              axisPointer: {
                     type: 'cross',
                     label: {
                     backgroundColor: '#6a7985'
                     }
                }
        },
        grid: {
            left: '2%',
            right: '7%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'value',
                name:'Time',
                nameGap:0,
                nameTextStyle:{
                    fontSize:'10'
                },
                scale:true,
                axisLabel : {
                    formatter: '{value} ',
                    //show:false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:'HousePrice',
                //nameGap:,
                scale:true,
                axisLabel : {
                    formatter: '{value} '
                },
                splitLine: {
                    show: false
                }
            }
        ],
        legend: [{   
        data: ['Prediction','Observation'],  
          inactiveColor: '#999',    
          orient: 'vertical',  
          right:20,
          top:20,
          borderWidth: 1,  
          borderColor: '#FF00FF',  
          textStyle: {  
          color: '#000'  
    }  
}  
],
        series : [
            {
                name:'Prediction',
                type:'scatter',
                color:'red',
                symbolSize:4,
                data: data1
            },
            {
                name:'Observation',
                type:'scatter',
                color:'blue',
                symbolSize:3,
                data:data2
            }
        ]
      };
      myChart.setOption(option, true);
    },


    //绘制第二幅图
       drawScatter2:function(){
      let scatterChart = document.getElementById('scatter2');
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
    //绘制第三幅图
    draw3DScatter:function(){
      let scatterChart = document.getElementById('3DScatter');
      let myChart = echarts.init(scatterChart);
      let app = {};
      let data=[];
      for(let i=0;i<this.GetData[0].features.length;i++){
          data.push([this.GetData[0].features[i].properties.Living,this.GetData[0].features[i].properties.Quality,this.GetData[0].features[i].properties.Pprice]);
      }//通过循环读取HousePrice.Json文件中的数据


      let option = {
          title:{
            text:'预测房价与居住地和质量的关系'
          },
          grid3D: {
            left:20,
            boxWidth:90,
            boxHeight:80,
          },
          xAxis3D: {
            splitNumber:3,
            scale:true,
            name:'Living'
          },
          yAxis3D: {
            splitNumber:3,
             scale:true,
            name:'Quality'
          },
          zAxis3D: { 
            splitNumber:3,
             scale:true,
            name:'Prediction',
            nameLocation:'end'
          },
          visualMap: {
              calculable: true,
              min:12,
              max: 13,
              // 维度的名字默认就是表头的属性名
              dimension: 2,
              inRange: {
                  color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
              },
              show:true,
              type: 'continuous',
              top:2,
              right:5
          },
          series: [{
              type: 'scatter3D',
              symbolSize:5,
              data:data
          }]
      }
      myChart.setOption(option, true);
    },

    //绘制第四幅图
    drawRadar:function(){
      let scatterChart = document.getElementById('radar');
      let myChart = echarts.init(scatterChart);
      let app = {};
      let data=[];
         data.push([this.GetData[0].features[0].properties.Living,this.GetData[0].features[0].properties.Quality,this.GetData[0].features[0].properties.Structure,
                this.GetData[0].features[0].properties.Renovation,this.GetData[0].features[0].properties.Condiction,this.GetData[0].features[0].properties.Greenspace,
                this.GetData[0].features[0].properties.Traffic,this.GetData[0].features[0].properties.VIEW]);

      let option = {
    title: {
        text: '预测房价的各个因子占比'      
    },
     tooltip: {
        trigger: 'item',
        backgroundColor : 'rgba(0,0,250,0.2)'
    },

    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
            { text: 'Living', max: 1},
           { text: 'Quality', max: 1},
           { text: 'Struct', max: 1},
           { text: 'Renova', max: 1},
           { text: 'Condic', max:1},
           { text: 'Greens', max:1},
           { text: 'Traffic', max:1},
           { text: 'VIEW', max: 1},
        ]
    },
    series: [{
        name: 'Ingedient',
        type: 'radar',
        color:'#FF3030',
        // areaStyle: {normal: {}},
        data : data
    }]
};
      myChart.setOption(option, true);
    },
    //绘制第5幅图
    drawPie:function(){
      let scatterChart = document.getElementById('pie');
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
                      data:['Living:'+this.GetData[0].features[0].properties.Living,
                            'Quality:'+this.GetData[0].features[0].properties.Quality,
                            'Struct:'+this.GetData[0].features[0].properties.Structure,
                            'Renova:'+this.GetData[0].features[0].properties.Renovation,
                            'Condic:'+this.GetData[0].features[0].properties.Condiction,
                            'Greens:'+this.GetData[0].features[0].properties.Greenspace,
                            'Traffic:'+ this.GetData[0].features[0].properties.Traffic,
                            'VIEW:'+this.GetData[0].features[0].properties.VIEW]
                   },
          calculable : true,
          series : [
              {
                  name:'半径模式',
                  type:'pie',
                  radius : [20, 80],
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
                      {value: this.GetData[0].features[0].properties.Living, name:'Living:'+this.GetData[0].features[0].properties.Living},
                      {value:this.GetData[0].features[0].properties.Quality, name:'Quality:'+this.GetData[0].features[0].properties.Quality},
                      {value:this.GetData[0].features[0].properties.Structure, name:'Struct:'+this.GetData[0].features[0].properties.Structure},
                      {value:this.GetData[0].features[0].properties.Renovation, name:'Renova:'+this.GetData[0].features[0].properties.Renovation},
                      {value:this.GetData[0].features[0].properties.Condiction, name:'Condic:'+this.GetData[0].features[0].properties.Condiction},
                      {value:this.GetData[0].features[0].properties.Greenspace, name:'Greens:'+this.GetData[0].features[0].properties.Greenspace},
                      {value:this.GetData[0].features[0].properties.Traffic, name:'Traffic:'+this.GetData[0].features[0].properties.Traffic},
                      {value:this.GetData[0].features[0].properties.VIEW, name:'VIEW:'+this.GetData[0].features[0].properties.VIEW}
                  ]
              }
          ] 
      };
      myChart.setOption(option, true);
    },

    //绘制第六幅图
    drawHis:function(){
      let scatterChart = document.getElementById('His');
      let myChart = echarts.init(scatterChart);
      let app = {};

 let option = {
          title : {
              text: '影响房价的各个因子'
          },
              color:['#3398DB'],
         grid: {
            left: '3%',
            right: '10%',
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
              type: 'category',
              data: ['Living', 'Quality', 'Struct', 'Renova', 'Condic', 'Greens', 'Traffic','VIEW']
        },
        yAxis: {
             name:'Value',
             type: 'value'
        },
        series: [{
            data:[this.GetData[0].features[0].properties.Living,this.GetData[0].features[0].properties.Quality,this.GetData[0].features[0].properties.Structure,
                this.GetData[0].features[0].properties.Renovation,this.GetData[0].features[0].properties.Condiction,this.GetData[0].features[0].properties.Greenspace,
                this.GetData[0].features[0].properties.Traffic,this.GetData[0].features[0].properties.VIEW],
            type: 'bar'
        }]
      };
      myChart.setOption(option, true);
    }    
  }
  
}
</script>
