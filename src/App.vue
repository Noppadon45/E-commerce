<script setup>
import { RouterLink, RouterView } from "vue-router"
import { onMounted } from "vue";
import { useCartStore } from "@/stores/user/cart.js"
import { useProductStore } from "./stores/user/product";
import { useEventStore } from "./stores/event";

const cartstore = useCartStore()
const productstore = useProductStore()
const eventstore = useEventStore()

onMounted(() => {
  cartstore.loadCart()
  productstore.loadProducts()

})
</script>

<template>
  <div v-if="eventstore.alert" class="toast">
    <div class="alert" :class="`alert-${eventstore.data.status}`">
      <span>{{ eventstore.data.message }}</span>
    </div>
  </div>
  <RouterView />
</template>
