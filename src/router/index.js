import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/components/Home'
import RightSideForDataView from '@/components/RightSideForDataView'
import RightSideForDataDescription from '@/components/RightSideForDataDescription'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'Login',
      component: login
    },
    {
    	path:'/home',
    	name:'Home',
    	component: Home,
      children:[
        {
          path: "dataview",
          component: RightSideForDataView
        },
        {
          path: "datadescription",
          component: RightSideForDataDescription
        }
      ]
    }
  ]
})
