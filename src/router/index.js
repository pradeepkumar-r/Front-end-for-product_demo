import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableComponent from '@/components/TableComponent'
import ProductListComponent from '@/components/ProductListComponent'
import CartComponent from '@/components/CartComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/products',
      name: 'ProductListComponent',
      component: ProductListComponent
    },
    {
      path: '/cart',
      name: 'CartComponent',
      component: CartComponent
    }
  ]
})
