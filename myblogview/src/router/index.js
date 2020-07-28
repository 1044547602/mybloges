import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Register from '../views/register'
Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/Login',
    name:'Login',
    component:Login 
  },
  {
    path:'/Register',
    name:'Register',
    component:Register
  }
]

const router = new VueRouter({
  mode:'history',//去掉地址前面“#”,关闭hash 模式，启用 history 模式
  routes
})

export default router
