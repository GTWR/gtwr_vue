<template>
  <div class="data-container">
  	<header class="title"><p>数据列表</p></header><!-- /header -->
  	<div id="data-table"></div>
  </div>
</template>

<script>
require('../style/dataViewer.scss')

export default {
  name: 'ParDefiner',
  data () {
    return {
      dataA: [
      	{
      		name:'Nicholas',
      		age: 17,
      		major: 'GIS',
      		hobby:'girls',
      		research:'Web GIS'
      	},
      	{
      		name:'Alex',
      		age: 17,
      		major: 'GIS',
      		hobby:'girls',
      		research:'Web GIS'
      	},
      	{
      		name:'Gemma',
      		age: 17,
      		major: 'GIS',
      		hobby:'girls',
      		research:'Web GIS'
      	},
      	{
      		name:'Gemma',
      		age: 17,
      		major: 'GIS',
      		hobby:'girls',
      		research:'Web GIS'
      	},
        {
          name:'Nicholas',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Alex',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Gemma',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Gemma',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Nicholas',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Alex',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Gemma',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Gemma',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Nicholas',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Alex',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Gemma',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        },
        {
          name:'Gemma',
          age: 17,
          major: 'GIS',
          hobby:'girls',
          research:'Web GIS'
        }
 
      ],
    }
  },
  mounted(){
  	this.tableList();
  },
  computed:{
  	
  },
  methods:{
  	tableList:function(){
  		let table = document.getElementById('data-table');
  		let content = '<table ><tr>';
  		for (let item in this.dataA[0]) {
  			content += '<th>'+item+'</th>';
  		}
  		content += '</tr>'
  		for (let i = 0; i < this.dataA.length; i++) {
  			content += '<tr>';
  			for (let item in this.dataA[i]) {
  				content += '<td>'+this.dataA[i][item]+'</td>';
  			}
  			content += '</tr>';
  		}
  		content += '</table>';
  		table.innerHTML = content;
  	}
  }
}
</script>
