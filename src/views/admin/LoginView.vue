<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { useAccountStore } from '@/stores/account';

const router = useRouter()
const AccountStore = useAccountStore()
const email = ref('')
const password = ref('')

const login = async() => {
    try {
        await AccountStore.signInAdmin(email.value , password.value)
        router.push({ name: 'admin-dashboard'})
    } catch (error) {
        console.log('error login page =' , error.message)       
    }
}

</script>
<template>
    <div class="h-screen flex items-center ">
        <div class="flex-1 max-w-3xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <h1 class="text-4xl">Login</h1>
                <fieldset class="fieldset w-full mt-8">
                <legend class="fieldset-legend">Email</legend>
                <input v-model="email" type="text" class="input input-bordered w-full" placeholder="Email" />
                </fieldset>
                <fieldset class="fieldset w-full mt-4">
                <legend class="fieldset-legend">Password</legend>
                <input v-model="password" type="password" class="input input-bordered w-full" placeholder="Password" />
                </fieldset>
                <button @click="login" class="btn btn-primary w-full mt-4">Login</button>
            </div>
        </div>
    </div>
    
</template>