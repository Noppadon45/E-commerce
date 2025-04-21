<script setup>
import Userlayout from "@/layouts/Userlayout.vue"
import {  ref, onMounted } from "vue"
import { useCartStore } from "@/stores/user/cart.js"

const CartStore = useCartStore()

const order = ref({})

onMounted(() => {
  CartStore.loadcheckout()
  if (CartStore.checkout.ordernumber) {
    order.value = CartStore.checkout
  }
})

</script>

<template>
  <Userlayout>
    <div class="border border-base-200 shadow-xl max-w-4xl mx-auto p-10 my-4">
      <div>
        <div class="text-2xl font-bold">Order Successful</div>
        <div>This order for {{ order.name }}</div>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-4 gap-2">
        <div>
          <div class="font-bold">Order Date</div>
          <div>{{  order.created }}</div>
        </div>
        <div>
          <div class="font-bold">Order Number</div>
          <div>{{  order.ordernumber }}</div>
        </div>
        <div>
          <div class="font-bold">Payment method</div>
          <div>{{  order.payment }}</div>
        </div>
        <div>
          <div class="font-bold">Address</div>
          <div>{{  order.address }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div v-for="product in order.products" class="grid grid-cols-5 gap-2 items-center">
        <div> <img :src="product.imageUrl"></div>
        <div>
          <b>Name :</b>
          {{ product.name }}
        </div>
        <div>
          <b>Quantity :</b>
          {{ product.quantity }}
          </div>
        <div>
          <b>Price :</b> 
          {{ product.price }}</div>
        <div>
          <b>Total :</b> 
          {{ product.price * product.quantity }}
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex justify-between">  
        <div>Total Price</div>
        <div> {{ order.totalPrice }}</div>
      </div>
      <div class="flex justify-between mt-3">  
        <div>Shipping Cost</div>
        <div>0</div>
      </div>
      <div class="divider"></div>
      <div class="flex justify-between mt-3">  
        <div>Summary Price</div>
        <div> {{ order.totalPrice }}</div>
      </div>
      <div class="divider">
      </div>
      Thank you for purchase!
      </div>
  </Userlayout>
</template>
