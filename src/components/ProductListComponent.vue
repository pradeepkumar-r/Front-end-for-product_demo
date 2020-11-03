<template>
    <table class="table table-bordered">
        <tr>
        <th style="text-align:center">NO</th>
        <th style="text-align:center">Name</th>
        <th style="text-align:center">Description</th>
        <th style="text-align:center">Instock</th>
        <th style="text-align:center">Price</th>
        <th style="text-align:center">Adding to Cart</th>
        </tr>
        <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
            <td>{{++index}}</td>
            <td>{{product.sku}}</td>
            <td>{{product.description}}</td>
            <td>{{checkStock(product)}}</td>
            <td>{{product.price}}rs</td>
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
            checkStock(product){
                if(product.quantity<10)
                    {
                        return product.quantity;
                    }
                else if(product.quantity<=0){
                    return "NO";
                }
                return "yes";
            },
            addToCart: function(product){
                let self =this;
                //alert("hi"+product.id );
                console.log("In addToCart");
                 axios.post('http://localhost:3000/cart',{
                        customer_id: 1,
                        item_id: product.id,
                        quantity: 1
                    })
                    .then((result) => {
                        console.log(result.data.data);
                        console.log("Product added");
                        //this.$toasted.show('Product added');
                        this.showToast("Product added");
                        })
                    .catch(function (error) {
                            console.log(error);
                            console.log("In error");
                            //$toasted.show("Product already added");
                            self.showToast("Product already added");
                });
   },
   showToast: function(msg){
       this.$toasted.show(msg, {position:'bottom-left'});
   }
        }
    }


</script>


<style scoped>
</style>