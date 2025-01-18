<script setup>
import { RouterLink, RouterView } from "vue-router"
import { onMounted } from "vue";
import { useCartStore } from "@/stores/user/cart.js"

const cartstore = useCartStore()

onMounted(() => {
  cartstore.loadCart()
})
</script>

<template>
  <RouterView />
</template>
