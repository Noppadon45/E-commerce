<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';
import { reactive, ref } from 'vue';
import { useRouter , useRoute ,RouterLink } from 'vue-router';
import { onMounted } from 'vue';

import { useAdminProductStore } from '@/stores/admin/product';


const inputForm = [
    {
        name: 'Name',
        field: "name"
    },
    {
        name: 'Image',
        field: 'imageUrl',
    },
    {
        name: 'Price',
        field: 'price',
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    }
]

const adminProductStore = useAdminProductStore()

const router = useRouter()

const route = useRoute()

const productIndex = ref(-1)

const mode = ref('Add Product')


const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})

const SubmitProduct = () => {
    if (mode.value === 'Edit Product') {
        adminProductStore.updateProduct(productIndex.value , productData)
    }else {
        adminProductStore.addProduct(productData)
    }

    router.push({ name: 'admin-product-list'})
}

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'Edit Product'

        const SelectedProduct = adminProductStore.getProduct(productIndex.value)
        console.log(SelectedProduct)
        productData.name = SelectedProduct.name
        productData.imageUrl = SelectedProduct.imageUrl
        productData.price = SelectedProduct.price
        productData.quantity = SelectedProduct.quantity
        productData.about = SelectedProduct.about
        productData.status = SelectedProduct.status
    }
})

</script>


<template>
    <Adminlayout>
        <div class="shadow-xl p-10">
            <div class="text-3xl font-bold"> {{  mode }}</div>
            <div class="divider"></div>
            <fieldset class="fieldset py-4 grid grid-cols-2 gap-4">
                <div v-for="form in inputForm">
                    <legend class="fieldset-legend"> {{ form.name }} :</legend>
                    <input v-model="productData[form.field]" type="text" class="input input-info w-full" placeholder="Type here" />
                </div>
            </fieldset>
            <div class="divider"></div>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Status :</legend>
                <select v-model="productData.status" class="select input-info">
                    <option disabled selected>Choose Status</option>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                </select>
            </fieldset>
            <div class="flex justify-end gap-4">
                <div>
                    <RouterLink :to="{name : 'admin-product-list'}" class="btn btn-ghost">Back</RouterLink>
                </div>
                <div>
                    <button @click="SubmitProduct()" class="btn btn-success"> {{  mode }}</button>
                </div>
            </div>
        </div>
    </Adminlayout>
</template>