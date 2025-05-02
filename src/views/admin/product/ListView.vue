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

onMounted(async () => {
    await adminProductStore.loadProducts()
})

const RemoveProduct = async (productId) => {
    await adminProductStore.removeProduct(productId)
    await adminProductStore.loadProducts()
}

const searchProduct = async () => {
    await adminProductStore.loadProducts()
}

const changeStatusFilter = async (status) => {
    adminProductStore.filter.status = status
    await adminProductStore.loadProducts()
}

const changeSortUpdate = async (sort) => {
    adminProductStore.filter.sort.update = sort
    await adminProductStore.loadProducts()
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
        <div class="flex mt-4">
            <div class="flex-1">
                <input v-model="adminProductStore.filter.search" type="text" placeholder="Type here" class="input input-primary" />
            </div>
            <div class="flex-1 ">
                <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                    <li class="menu-title">UpdateAt</li>
                    <li><button class="btn" :class="adminProductStore.filter.sort.update === 'asc' ? 'btn-active' : ''" @click="changeSortUpdate('asc')">ASC</button></li>
                    <li><button class="btn" :class="adminProductStore.filter.sort.update === 'desc' ? 'btn-active' : ''" @click="changeSortUpdate('desc')">DESC</button></li>
                </ul>
            </div>
            <div class="flex-1">
                <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                    <li class="menu-title">Status</li>
                    <li><button class="btn" :class="adminProductStore.filter.status === 'open' ? 'btn-active' : ''" @click="changeStatusFilter('open')">OPEN</button></li>
                    <li><button class="btn" :class="adminProductStore.filter.status === 'close' ? 'btn-active' : ''" @click="changeStatusFilter('close')">CLOSE</button></li>
                </ul>
            </div>
            <div class="flex-2">
                <button @click="searchProduct()" class="btn">Search</button>
            </div>
        </div>
        <div class="divider"></div>
        <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'UpdateAt', '']">
            <!-- row 1 -->
            <tr v-for="(product, index) in adminProductStore.list">
                <th> {{ product.name }}</th>
                <td>
                    <div class="mask mask-squircle w-24"><img :src='product.imageUrl' /></div>
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
                        <RouterLink :to="{ name: 'admin-product-update', params: { id: product.productId } }"
                            class="flex w-16 btn">
                            <Edit></Edit>
                        </RouterLink>
                        <div @click="RemoveProduct(product.productId)" class="flex w-16 btn">
                            <Trash></Trash>
                        </div>

                    </div>
                </td>
            </tr>
        </Table>
    </Adminlayout>
</template>