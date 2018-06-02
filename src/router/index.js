import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/components/Home'
import RightSideForDataView from '@/components/RightSideForDataView'
import RightSideForDataDescription from '@/components/RightSideForDataDescription'
import dataviewer from '@/components/DataViewer' 
import RightSideForResult from '@/components/RightSideForResult'
import chartAnalysis from '@/components/rightSideForResult/chartAnalysis'
import computeLog from '@/components/rightSideForResult/computeLog'
import precision from '@/components/rightSideForResult/precision'
import coverForParSelect from '@/components/coverForParSelect'
import dynamicThreed from '@/components/login/DynamicThreed'
import slides from '@/components/login/slides'
import coverForSign from '@/components/coverForSign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
     {
      path:'/coverForSign',
      name:'Sign',
      component: coverForSign,
    },

    {
      path:'/login',
      name:'Login',
      component: login,
    },
    {
      path:'/demo',
      component: slides
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path: "dataview",
          component: RightSideForDataView
        },
        {
          path: "datadescription",
          component: RightSideForDataDescription
        },
        {
          path:'computeresult',
          component: RightSideForResult,
          children:[
            {
              path:"computeLog",
              component: computeLog
            },
			      {
              path:"chartAnalysis",
              component: chartAnalysis
            },
            
            {
              path:'precesion',
              component:precision
            }
          ]
        }
      ]

    }
        

  ]
})
