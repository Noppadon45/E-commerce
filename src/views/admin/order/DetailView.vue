<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminOrderStore } from '@/stores/admin/order';


const adminOrderStore = useAdminOrderStore()
const router = useRouter()
const route = useRoute()

const orderIndex = ref(-1)
const orderData = ref({
    product: [],

})

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})

</script>

<template>
    <Adminlayout>
        <div class="shadow-xl p-10">
            <div class="text-3xl font-bold">Order detail ID : {{ orderIndex }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.customerName }}</div>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <div>{{ orderData.updatedAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class="grid grid-cols-4 py-4 items-center ml-3">
                <div class="w-40"><img :src="product.imageUrl" alt=""></div>
                <div class="text-lg">
                    <div class="font-bold">Name : {{ product.name }}</div>
                    <div>Description {{ product.description }}</div>
                </div>
                <div class="text-lg"> {{ product.quantity }} Item</div>
                <div class="text-lg"> {{ product.price }} ฿</div>
            </div>
            <div class="divider"></div>
            <div class="flex flex-col-2 justify-between items-center">
                <div class="text-3xl font-bold">Total</div>
                <div class="text-3xl font-bold"> {{ orderData.totalPrice }} ฿</div>
            </div>
            <div class="flex justify-end items-center pt-4">
            <RouterLink :to="{ name: 'admin-orders-list'}" class="btn btn-ghost w-24">Back</RouterLink>
        </div>
        </div>
    </Adminlayout>
</template>