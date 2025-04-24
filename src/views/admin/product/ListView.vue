<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useAdminProductStore } from '@/stores/admin/product';


import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import Table from '@/components/Table.vue';

const adminProductStore = useAdminProductStore()

onMounted(() => {
    adminProductStore.loadProducts()
})

const RemoveProduct = (index) => {
    adminProductStore.removeProduct(index)
}


</script>

<template>
    <Adminlayout>
        <div class="flex justify-between items-center">
            <div class="text-4xl font-bold">Product</div>
            <div>
                <RouterLink :to="{ name: 'admin-product-create' }" class="btn btn-lg">Add New</RouterLink>
            </div>
        </div>
        <div class="divider"></div>
        <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'UpdateAt', '']">
            <!-- row 1 -->
            <tr v-for="(product, index) in adminProductStore.list">
                <th> {{ product.name }}</th>
                <td>
                    <div class="mask mask-squircle w-24"><img :src='product.image' /></div>
                </td>
                <td> {{ product.price }}</td>
                <td> {{ product.remainquantity }} / {{ product.quantity }}</td>
                <td>
                    <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">{{
                        product.status }}</div>
                </td>
                <td> {{ product.update }}</td>
                <td>
                    <div class="flex w-16 gap-4 justify-center">
                        <RouterLink :to="{ name: 'admin-product-update', params: { id: index } }" class="flex w-16 btn">
                            <Edit></Edit>
                        </RouterLink>
                        <div @click="RemoveProduct(index)" class="flex w-16 btn">
                            <Trash></Trash>
                        </div>

                    </div>
                </td>
            </tr>
        </Table>
    </Adminlayout>
</template>