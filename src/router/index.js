import { createRouter, createWebHistory } from 'vue-router';
import index from '../pages/index.vue';
import login from '../pages/login.vue';
import commodityList from '../pages/commodityList.vue';
import commodityDetail from '../pages/commodityDetail.vue';
import shopcar from '../pages/shopcar.vue';
import settlement from '../pages/settlement.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/index' 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/index',
      name: 'index',
      component : index,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/commodityList',
      name: 'commodityList',
      component: commodityList
    },
    {
      path: '/commodityDetail',
      name: "commodityDetail",
      component: commodityDetail
    },
    {
      path: '/shopcar',
      name: "shopcar",
      component: shopcar 
    },
    {
      path: '/settlement',
      name: 'settlement', 
      component: settlement 
    }    
  ]
})

export default router
