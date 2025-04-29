import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
    state: () => ({
        alert: false,
        data: {},
    }),
    actions: {
        popupupmessage(status , message) {
            this.data = {
                status, //status: status
                message //message: message
            }
            this.alert = true
            setTimeout(() => {
                this.closepopup()
            }, 3000)
        },
        closepopup() {
            this.data = {}
            this.alert = false
        }
    }
})