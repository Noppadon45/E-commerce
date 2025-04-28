import { defineStore } from "pinia"


export const useAdminUserStore = defineStore("admin-user", {
    state : () => ({
        list: [
            {
                name: 'John',
                role: 'Admin',
                status: 'Active',
                update: (new Date()).toISOString(),
            },
            {
                name: 'Doe',
                role: 'Admin',
                status: 'Active',
                update: (new Date()).toISOString(),
            }
        ],

    }),
    actions: {
        getUser (index) {
            return this.list[index]
        },
        updateUser (index , userData) {
            // this.list[index].name = userData.name
            // this.list[index].role = userData.role
            // this.list[index].status = userData.state
            const fields = ['name' , 'role' , 'status']
            for (let field of fields) {
                this.list[index][field] = userData[field]
            }
            this.list[index].update = (new Date()).toISOString()
            
        },
        deleteUser (index) {
            this.list.splice(index ,1)
        }
    }
})