import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
//  import HelloWorld from '@/components/HelloWorld'
// import HeaderNav from '../components/header/header'
import product from '../components/product/product'
import evaluate from '../components/evaluate/evaluate'
import merchant from '../components/merchant/merchant'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [
    {
      path: '/product',
      name: 'pro',
      component: product
    },
    {
      path: '*',
      name: 'prod',
      component: product
    },
    {
      path: '/evaluate',
      name: 'eval',
      component: evaluate
    },
    {
      path: '/merchant',
      name: 'merc',
      component: merchant
    }
  ]
})
