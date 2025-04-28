<script setup>
import { RouterLink, RouterView } from "vue-router"
import { onMounted } from "vue";
import { useCartStore } from "@/stores/user/cart.js"
import { useProductStore } from "./stores/user/product";

const cartstore = useCartStore()
const productstore = useProductStore()

onMounted(() => {
  cartstore.loadCart()
  productstore.loadProducts()
})
</script>

<template>
  <RouterView />
</template>
