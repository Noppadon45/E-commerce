<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { useAdminUserStore } from '@/stores/admin/user';

import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import Table from '@/components/Table.vue';

const adminUserStore = useAdminUserStore()

onMounted(() => {
    adminUserStore.loadUser()
})

const ChangeStatus = async(index) => {
    const selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'Active' ? 'Inactive' : 'Active'
    await adminUserStore.updateUser(selectedUser.uid , selectedUser)
}

</script>

<template>
    <Adminlayout>
        <div class="flex justify-between items-center">
            <div class="text-4xl font-bold">User</div>
        </div>
        <div class="divider"></div>
        <Table :headers="['Name', 'Role', 'Status', 'UpdateAt', '']">
            <tr v-for="(user , index) in adminUserStore.list">
                <th> {{ user.name }}</th>
                <td> {{ user.role }}</td>
                <td class="badge" :class="user.status === 'Active' ? 'badge-success' : 'badge-error'"> {{ user.status }}</td>
                <td> {{ user.update }}</td>
                <td class="flex gap-5 justify-center">
                    <RouterLink :to="{ name: 'admin-users-update', params: { id: user.uid } }" class="btn btn-info">Edit</RouterLink>
                    <button @click="ChangeStatus(index)" class="btn btn-info"> {{ user.status === 'active' ? 'Disable' : 'Enable' }}</button>
                </td>
            </tr>
        </Table>
    </Adminlayout>
</template>