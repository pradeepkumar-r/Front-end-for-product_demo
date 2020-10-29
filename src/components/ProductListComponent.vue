<template>
    <table class="table table-bordered">
        <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
            <td>{{++index}}</td>
            <td>{{product.sku}}</td>
            <td>{{product.description}}</td>
            <td>{{product.stock}}</td>
            <td>{{product.price}}</td>
            <td><button type="button" class="btn btn-primary" v-on:click="addToCart(product)">Add to Cart</button> </td>
        </tr>
        </tbody>
    </table>
</template>


<script>
    import axios from 'axios';
    export default {
        name: "ProductListComponent",
        data (){
            return {
                products: []
            }
        },
        mounted () {
            axios
            .get('http://localhost:3000/items')
            .then((result) => {
                console.log(result.data.data);
        this.products = result.data.data
      })
        },
        methods: {
            addToCart: function(product){
                alert("hi"+product.id );
                console.log("In addToCart");
   }
        }
    }


</script>


<style scoped>
</style>