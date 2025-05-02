import { defineStore } from "pinia";
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged , signInWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "@/firebase.js"
import { doc , getDoc , setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore("account", {
    state: () => ({
        isLoginIn: false,
        isAdmin: false,
        user: {}
    }),
    actions: {
        async signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider)
                this.isLoginIn = true
                this.user = result.user
                console.log("User signed in:", this.user)
            } catch (error) {
                console.error("Error signing in with Google:", error)
            }
        },
        async signOut() {
            try {
                this.isLoginIn = false
                this.isAdmin = false
                await signOut(auth)
            } catch (error) {
                console.error("Error signing out:", error)
            }
        },
        async checkAuth() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.isLoginIn = true
                        this.user = user
                        console.log("UserId =", user.uid)
                        const docRef = doc(db, "users", user.uid)
                        const docSnap = getDoc(docRef)
                        if (docSnap.exists()) {

                        }
                        else {
                            const newUser = {
                                //เพิ่มข้อมูลผู้ใช้
                            }
                        }
                        if (user.email === 'admin@admin.com') {
                            this.isAdmin = true
                        }
                        resolve(true)
                    }else {
                        resolve(false)
                    }
                });
            })
        },
        async signInAdmin(email , password) {
            try {
                const adminCredential = await signInWithEmailAndPassword(auth, email, password)
                this.isLoginIn = true
                this.isAdmin = true
                this.user = adminCredential.user
            } catch (error) {
                console.log("Error store =" , error.code)
                switch (error.code) {
                    case "auth/invalid-email":
                        throw new Error("Email Incorrect")
                    case "auth/wrong-password":
                        throw new Error("Password Incorrect")
                    case "auth/network-request-failed":
                        throw new Error("Network Error")
                    default:
                        throw new Error("Invalid Error")
                }
            }
        }
    }
})