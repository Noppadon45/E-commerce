<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue'
import ApexCharts from 'apexcharts';

const priceChart = {
    options: {
        chart: {
            id: 'vuechart-example'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    },
    series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
}

const donutChart = {
    options: {},
    series: [44, 55, 41 ,17 , 15]
}



</script>
<template>
    <Adminlayout>
        <div class="text-3xl font-bold mb-5">
            Dashboard
        </div>
        <div class="stats shadow w-full mb-10">
            <div class="stat place-items-center">
                <div class="stat-title">Orders</div>
                <div class="stat-value">31K</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">Products</div>
                <div class="stat-value text-secondary">4,200</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">Users</div>
                <div class="stat-value">1,200</div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-5">
        <div class="flex-1">
        <div class="card w-full p-6 bg-base-100 shadow-xl">
            <apexchart width="500" type="bar" :options="priceChart.options" :series="priceChart.series"></apexchart>
        </div>
        </div>
        <div class="flex-1">
        <div class="card w-full p-6 bg-base-100 shadow-xl">
            <apexchart width="440" type="donut" :options="donutChart.options" :series="donutChart.series"></apexchart>
        </div>
        </div>
    </div>
    </Adminlayout>
</template>