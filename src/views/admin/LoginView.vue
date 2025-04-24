<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="h-screen flex items-center ">
        <div class="flex-1 max-w-3xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <h1 class="text-4xl">Login</h1>
                <fieldset class="fieldset w-full mt-8">
                <legend class="fieldset-legend">Email</legend>
                <input type="text" class="input input-bordered w-full" placeholder="Email" />
                </fieldset>
                <fieldset class="fieldset w-full mt-4">
                <legend class="fieldset-legend">Password</legend>
                <input type="password" class="input input-bordered w-full" placeholder="Password" />
                </fieldset>
                <RouterLink :to="{ name : 'admin-dashboard'}" class="btn btn-primary w-full mt-4">Login</RouterLink>
            </div>
        </div>
    </div>
    
</template>