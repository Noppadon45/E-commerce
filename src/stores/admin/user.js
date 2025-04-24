import { defineStore } from "pinia"


export const useAdminUserStore = defineStore("admin-user", {
    state : () => ({
        list: [
            {
                name: 'John',
                role: 'admin',
                status: 'active',
                update: (new Date()).toISOString(),
            }
        ],

    })
})