<template>
  <div>
    <div v-if="products.length" class="container">
        
        <div class="row mx-md-n5" >
        <table class="table table-bordered">
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id">
                    <td>{{++index}}</td>
                    <td>{{product.item_name}}</td>
                    <!--<td>{{product.quantity}}</td>-->
                    <td>{{product.total_amount}}</td>
                    <td><button type="button" class="btn btn-danger" v-on:click="deleteFromCart(product, index-1)">Delete Item</button> </td>
                    <td><div class="input-group">
                <input type="button" value="-" class="button-minus" data-field="quantity" v-on:click="decrement(product)">
                <input type="number" step="1" max="" v-bind:value="product.quantity" name="quantity" class="quantity-field">
                <input type="button" value="+" class="button-plus" data-field="quantity" v-on:click="increment(product)">
                </div></td>
                 <td><button type="button" class="btn btn-success" v-on:click="deleteFromCart(product, index-1)">Buy now</button> </td>
                </tr>
            </tbody>
        </table> </div>
         
         <button type="button" class="btn btn-success pull-right btncheckout" v-on:click="deleteall()"> Checkout Items</button>
         <button type="button" class="btn btn-danger pull-right btndeleteall" v-on:click="deleteall()"> Delete Cart</button> </div>

    <div v-else>
        <p>The Cart is Empty</p>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        name: "CartComponent",
        data (){
            return {
                products: [],
                total_products: 0
            }
        },
        mounted () {
            axios
            .post('http://localhost:3000/cart/showitems',{
                customer_id :1
            })
            .then((result) => {
                console.log(result.data.data);
        this.products = result.data.data;
      })
        },
        computed:{

        },
        methods: {
            increment :function(product){
                product.quantity=product.quantity+1;
                console.log(product.quantity);
                product.total_amount=(product.quantity*product.amount_peritem);
                axios.put('http://localhost:3000/cart/1',{
                        quantity:product.quantity,
                        item_id: product.product_id
                    })
                    .then((result) => {
                        console.log(result.data.data);
                        console.log("Cart updated");
                        //this.$toasted.show('Product added');
                        this.showToast("Product updated");
                        //var row = self.parentNode.parentNode;
                        //this.products.splice(index, 1);
                        })
                    .catch(function (error) {
                            console.log(error);
                            console.log("In error");
                            //$toasted.show("Product already added");
                            //self.showToast("Error");
                });
            },
            decrement :function(product){
                if(product.quantity!=0){
                product.quantity=product.quantity-1;
                console.log(product.quantity);
                product.total_amount=(product.quantity*product.amount_peritem);
                axios.put('http://localhost:3000/cart/1',{
                        quantity:product.quantity,
                        item_id: product.product_id
                    })
                    .then((result) => {
                        console.log(result.data.data);
                        console.log("Cart updated");
                        //this.$toasted.show('Product added');
                        this.showToast("Product updated");
                        //var row = self.parentNode.parentNode;
                        //this.products.splice(index, 1);
                        })
                    .catch(function (error) {
                            console.log(error);
                            console.log("In error");
                            //$toasted.show("Product already added");
                            //self.showToast("Error");
                });
            }
            },
            deleteFromCart: function(product, index){
                let self =this;
                //alert("hi"+product.product_id );
                console.log("In deleteFromCart");
                 axios.post('http://localhost:3000/cart/deletefromcart',{
                        customer_id: 1,
                        item_id: product.product_id
                    })
                    .then((result) => {
                        console.log(result.data.data);
                        console.log("Product deleted");
                        //this.$toasted.show('Product added');
                        this.showToast("Product deleted");
                        //var row = self.parentNode.parentNode;
                        this.products.splice(index, 1);
                        })
                    .catch(function (error) {
                            console.log(error);
                            console.log("In error");
                            //$toasted.show("Product already added");
                            self.showToast("Error");
                });
   },
   deleteall: function(){
       let self =this;
                //alert("hi"+product.product_id );
                console.log("In deleteall");
                 axios.post('http://localhost:3000/cart/clearall',{
                        customer_id: 1,
                    })
                    .then((result) => {
                        console.log(result.data.data);
                        console.log("Product deleted");
                        //this.$toasted.show('Product added');
                        this.showToast("Cart cleared");
                        //var row = self.parentNode.parentNode;
                        this.products.splice(0);
                        })
                    .catch(function (error) {
                            console.log(error);
                            console.log("In error");
                            //$toasted.show("Product already added");
                            self.showToast("Error");
                });
   },
   showToast: function(msg){
       this.$toasted.show(msg, {position:'bottom-left'});
   }
        }
    }


</script>


<style scoped>
input,
textarea {
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
}

input[type="button"] {
  -webkit-appearance: button;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
}

.input-group input[type='button'] {
  background-color: #eeeeee;
  min-width: 38px;
  width: auto;
  transition: all 300ms ease;
}

.input-group .button-minus,
.input-group .button-plus {
  font-weight: bold;
  height: 38px;
  padding: 0;
  width: 38px;
  position: relative;
}

.input-group .quantity-field {
  position: relative;
  height: 38px;
  left: -6px;
  text-align: center;
  width: 62px;
  display: inline-block;
  font-size: 13px;
  margin: 0 0 5px;
  resize: vertical;
}

.button-plus {
  left: -13px;
}

input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
.btncheckout{
    margin-right: 25px;
}
.btndeleteall{
    margin-right: 25px;
}

</style>