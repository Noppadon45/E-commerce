<script setup>
import Userlayout from "@/layouts/Userlayout.vue"
import { useProductStore } from "@/stores/user/product.js"
import { useCartStore } from "@/stores/user/cart.js"
import Product from "@/components/Products.vue"
import { useRouter } from "vue-router"
const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

const addtoCarts = (product) => {
  console.log("Add to cart", product)
  cartStore.addToCart(product)
  router.push({ name: "cart" })
}
</script>

<template>
  <Userlayout>
    <div
      class="hero min-h-screen mw"
      style="
        background-image: url(https://image.cdn2.seaart.me/2023-09-07/16527367422927877/4abee458173b19a2896f449e2fe352a1fefa49c9_high.webp);
      "
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-7xl font-bold">Hello there</h1>
          <p class="mb-5 text-2xl">This is Prototype of E-commerce website</p>
          <p class="mb-5 text-2xl">Noppadon Puangniyom</p>
        </div>
      </div>
    </div>

    <!-- Product Shelf-->
    <Product :products="productStore.list" :addtoCart="addtoCarts"></Product>
  </Userlayout>
</template>
