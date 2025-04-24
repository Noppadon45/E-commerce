<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';

import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import Table from '@/components/Table.vue';

</script>

<template>
    <Adminlayout>
        <div class="flex justify-between items-center">
            <div class="text-4xl font-bold">User</div>
        </div>
        <div class="divider"></div>
        <Table :headers="['Name', 'Role', 'Status', 'UpdateAt', '']"></Table>

    </Adminlayout>
</template>