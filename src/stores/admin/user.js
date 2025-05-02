import { defineStore } from "pinia"
import { db } from "@/firebase"
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore"


export const useAdminUserStore = defineStore("admin-user", {
    state: () => ({
        list: [],
    }),
    actions: {
        async loadUser() {
            const userCol = collection(db, 'users')
            const userSnapshot = await getDocs(userCol)
            console.log(userSnapshot.docs)
            //userSnapshot.docs
            const userList = userSnapshot.docs.map(doc => {
                let convertedUser = doc.data()
                convertedUser.uid = doc.id
                convertedUser.update = convertedUser.update.toDate()
                return convertedUser
            })
            console.log(userList)
            this.list = userList
        },
        async getUser(uid) {
            try {
                const userRef = doc(db, 'users', uid)
                const userSnapshot = await getDoc(userRef)
                return userSnapshot.data()
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateUser(uid, userData) {
            try {
                const updateUserData = {
                    name: userData.name,
                    status: userData.status,
                    role: userData.role,
                    update: new Date(),

                }
                const docRef = doc(db, 'users', uid)
                await setDoc(docRef, updateUserData)
            } catch (error) {
                console.log('error', error)
            }
        },
    }
})