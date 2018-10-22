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
import computeLog2 from '@/components/rightSideForResult/computeLog2'
import precision from '@/components/rightSideForResult/precision'
import coverForParSelect from '@/components/coverForParSelect'
import dynamicThreed from '@/components/login/DynamicThreed'
import slides from '@/components/login/slides'

Vue.use(Router)


export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect:'/login'
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
              name:'computeLog',
              component: computeLog,
              meta: {keepAlive: true}
            },
            {
              path:"computeLog2",
              name:'computeLog2',
              component: computeLog2,
              meta: {keepAlive: true}
            },
			      {
              path:"chartAnalysis",
              name:'chartAnalysis',
              component: chartAnalysis,
              meta: {keepAlive: true}
            },
            
            {
              path:'precesion',
              name:'precesion',
              component:precision,
              meta: {keepAlive: true}
            }
          ]
        }
      ]

    }
        

  ]
})
