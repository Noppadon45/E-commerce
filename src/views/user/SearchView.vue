<script setup>
import Userlayout from "@/layouts/Userlayout.vue"
import { onMounted, ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import Product from "@/components/Products.vue"
import { useProductStore } from "@/stores/user/product.js"
const productStore = useProductStore()
const route = useRoute()
const Searchtext = ref("")

watch(
  () => route.query.q,
  (newSearchtext) => {
    Searchtext.value = newSearchtext
  },
  { immediate: true }
)

const filterProducts = computed(() => {
  return productStore.filterProduct(Searchtext.value)
})
</script>

<template>
  <Userlayout>
    <div class="text-4xl mx-5 m-4">
      Search :
      <b>
        {{ Searchtext }}
      </b>
    </div>
    <Product :products="filterProducts"></Product>
  </Userlayout>
</template>
