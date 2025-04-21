<script setup>
import Userlayout from "@/layouts/Userlayout.vue"
import Close from "@/components/icons/Close.vue"
import { useCartStore } from "@/stores/user/cart.js"
import { RouterLink } from "vue-router"

const CartStore = useCartStore()
const changeQuantity = (event, index) => {
  const newQuantity = parseInt(event.target.value)
  CartStore.updateCartQuantity(index, newQuantity)
}
</script>

<template>
  <Userlayout>
    <div class="text-4xl mx-10 font-bold">Cart</div>
    <div class="flex mx-10 py-3">
      <div class="flex-auto w-64 bg-orange-300 p-5">
        <div v-if="CartStore.items.length === 0">Cart is Empty</div>
        <div v-else v-for="(item, index) in CartStore.items" class="flex">
          <div class="flex-1 w-full p-10">
            <img :src="item.imageUrl" />
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-between h-full mt-10">
              <div class="flex-auto">
                <div class="relative grid grid-cols-2">
                  <div>
                    <div>
                      <b> {{ item.name }} </b>
                    </div>
                    <div>{{ item.about }}</div>
                    <div>{{ item.price }}</div>
                  </div>
                  <div>
                    <select
                      @change="changeQuantity($event, index)"
                      class="select w-1/2 mx-6"
                      v-model="item.quantity"
                    >
                      <option v-for="quantity in [1, 2, 3, 4, 5, 6]">
                        {{ quantity }}
                      </option>
                    </select>
                  </div>
                  <div
                    @click="CartStore.removeItemInCart(index)"
                    class="absolute w-5 top-0 right-0"
                  >
                    <Close></Close>
                  </div>
                </div>
                <div class="font-bold">Instock</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-auto ml-3 bg-orange-400 p-7">
        <div class="text-2xl mx-5 m-4 font-bold">Order Summary</div>
        <div class="my-4">
          <div class="flex justify-between py-3">
            <div class="mx-5">All Product Price</div>
            <div class="mx-5">{{ CartStore.summaryPrice }}</div>
          </div>
          <div class="flex justify-between py-3">
            <div class="mx-5">Shipping Price</div>
            <div class="mx-5">0</div>
          </div>
          <div></div>
          <div class="flex justify-between py-3 divide-y divide-black">
            <div class="mx-5">Total Price</div>
            <div class="mx-5">{{ CartStore.summaryPrice }}</div>
          </div>
          <RouterLink :to="{ name : 'checkout'}" class="btn btn-md btn-warning w-full p-4 ">Check Out</RouterLink>
        </div>
      </div>
    </div>
  </Userlayout>
</template>
