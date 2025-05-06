<script setup>
import { defineProps } from 'vue';

defineProps({
    currentPage: Number,
    maxPage : Number,
    onPageChange : Function
})

</script>
<template>
    <div class="join">
  <button v-if="currentPage - 1 > 0" @click="onPageChange(currentPage - 1)" class="join-item btn">«</button>
  <button class="join-item btn">Page {{ currentPage }} / {{ maxPage }}</button>
  <button v-if="currentPage + 1 <= maxPage" @click="onPageChange(currentPage + 1)" class="join-item btn">»</button>
</div>
</template>