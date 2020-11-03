<template>
  <div id="app">
    <navbar-component></navbar-component>
     <!--<productlist-component></productlist-component>-->
    <router-view/>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavBarComponent'
import TableComponent from '@/components/TableComponent'
import ProductListComponent from '@/components/ProductListComponent'
import CartComponent from '@/components/CartComponent'

export default {
  name: 'App',
  components: {NavbarComponent, TableComponent, ProductListComponent}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
