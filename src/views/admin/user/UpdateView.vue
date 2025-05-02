<script setup>
import Adminlayout from '@/layouts/Adminlayout.vue';
import { useAdminUserStore } from '@/stores/admin/user';
import { reactive, ref , onMounted } from 'vue';
import { useRoute , useRouter } from 'vue-router';
import { useEventStore } from "@/stores/event";



const adminUserStore = useAdminUserStore()
const eventStore = useEventStore()

const route = useRoute()
const router = useRouter()

const userIndex = ref(-1)

const inputForm = [
    {
        name: 'Name',
        field: "name",
        type: 'text'
    },
    {
        name: 'Role',
        field: 'role',
        type: 'select',
        dropdownlist: ['Admin', 'Moderator' , 'Member']
    },
    {
        name: 'Status',
        field: 'status',
        type: 'select',
        dropdownlist: ['Active', 'Inactive']
    }
]

const userData = reactive({
    name: '',
    role: '',
    status: ''
})

onMounted(async () => {
    if (route.params.id) {
        userIndex.value = route.params.id
        console.log(route.params.id)
        const selectedUser = await adminUserStore.getUser(userIndex.value)
        
        userData.name = selectedUser.name
        userData.role = selectedUser.role
        userData.status = selectedUser.status
    }
    
})

const UpdateUser = async() => {
    await adminUserStore.updateUser(userIndex.value , userData)
    eventStore.popupupmessage('info', 'Updated user success')
    router.push({ name: 'admin-users-list'})
}
</script>

<template>
    <Adminlayout>
        <div class="shadow-xl p-10">
            <div class="text-3xl font-bold"> Update</div>
            <div class="divider"></div>
            <div v-for="form in inputForm" class="py-4">
                <fieldset class="fieldset grid grid-cols-1 gap-4">
                    <div>
                        <legend class="fieldset-legend"> {{ form.name }} :</legend>
                        <input v-if="form.type === 'text'" v-model="userData[form.field]" type="text" class="input input-info w-full font-bold"
                            placeholder="Type here" />
                    </div>
                </fieldset>
                <fieldset class="fieldset">
                    <select v-if="form.type === 'select'" v-model="userData[form.field]" class="select input-info w-full font-bold">
                        <option v-for="item in form.dropdownlist">{{ item }}</option>
                    </select>
                </fieldset>
            </div>
            <div class="flex justify-end gap-4">
                <div>
                    <RouterLink :to="{name:'admin-users-list'}" class="btn btn-ghost">Back</RouterLink>
                </div>
                <div>
                    <button @click="UpdateUser()" class="btn btn-success">Update</button>
                </div>
            </div>
        </div>
    </Adminlayout>
</template>