<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';
import Table from '@/components/Table.vue';
import { useAdminOrderStore } from '@/stores/admin/order';
import { useRouter , RouterLink ,useRoute } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter()
const route = useRoute()

const adminOrderStore = useAdminOrderStore()
</script>

<template>
    <Adminlayout>
        <div class="flex justify-between items-center">
            <div class="text-4xl font-bold">Order</div>
        </div>
        <div class="divider"></div>
        <Table :headers="['Customer Name' , 'Price' , 'Status' , 'UpdateAt' , '']">
            <tr v-for="(order , index) in adminOrderStore.list">
                <th> {{  order.customerName }}</th>
                <td> {{  order.totalPrice }}</td>
                <td> {{  order.status }}</td>
                <td> {{  order.updatedAt }}</td>
                <td> <RouterLink :to="{ name: 'admin-orders-detail' , params: { id: index} }" class="btn btn-info">See Detail</RouterLink></td>
            </tr>
        </Table>
        
    </Adminlayout>
</template>