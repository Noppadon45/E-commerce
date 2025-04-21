<script setup>
import Userlayout from "@/layouts/Userlayout.vue"
import { reactive } from 'vue'
import { useCartStore } from "@/stores/user/cart.js"
import { RouterLink , useRouter } from "vue-router"

const FormData = [
  {
    name: 'Email Address',
    field: 'email'
  },
  {
    name : 'Name',
    field: 'name'
  },
  {
    name: 'Phone Number',
    field: 'phone'
  },
  {
    name: 'City',
    field: 'city'
  },
  {
    name: 'Address',
    field: 'address'
  },
  {
    name: 'Zip Code',
    field: 'zip'
  },
]

const userFormData = reactive({
    email: '',
    name: '',
    phone: '',
    city: '',
    address: '',
    zip: ''
  })

const CartStore = useCartStore()

const router = useRouter()

const SubmitPayment = () => {
  CartStore.checkoutCart(userFormData)
  router.push({ name: 'success' })
}


</script>

<template>
  <Userlayout>
  <div class="text-4xl mx-10 py-3 font-bold">CheckOut</div>
  <div class="flex">
  <section class="flex-auto w-64 bg-orange-300 p-10">
  <div v-for="form in FormData" class="w-full">
  <fieldset class="fieldset ">
  <legend class="fieldset-legend">{{ form.name }}</legend>
  <input v-model="userFormData[form.field]" type="text" class="input w-full" placeholder="Type here" />
  </fieldset>
  </div>
  <button @click="SubmitPayment()" class="btn btn-primary my-5 w-full ">Submit</button>
  </section>
  <section class="flex-auto w-32 bg-orange-400">
  <div v-for="item in CartStore.items" class="flex bg-orange-200 my-5 p-5">
    <div class="flex-1 p-10"> <img :src="item.imageUrl"></div>
    <div class="flex-1">
      <div class="flex flex-col justify-between h-full">
      <div>
      <div><b>Name :</b> {{ item.name }}</div>
      <div><b>Quantity :</b> {{ item.quantity }}</div>
      <div><b>Price :</b> {{ item.price }}</div>
      </div>
      <div> 
        <RouterLink :to="{ name: 'cart' }" class="btn btn-secondary btn-block"><b>Edit</b></RouterLink>
      </div>
    </div>
    </div>
  </div>
  <div class="divider"></div>
  <div>
    <div class="px-3"><b>Order Summary</b></div>
    <div class="flex justify-between px-10">
    <div>Summary Price</div>
    <div> {{ CartStore.summaryPrice}}</div>
  </div>
  <div class="flex justify-between px-10">
    <div>Shipping Cost</div>
    <div>0</div>
  </div>
  </div>
  <div class="divider"></div>
  <div class="flex justify-between px-10 my-5">
    <div><b>Total</b></div>
    <div><b>{{ CartStore.summaryPrice }}</b> </div>
  </div>
  </section>
  </div>  
  </Userlayout>
</template>
