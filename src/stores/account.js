import { defineStore } from "pinia";
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.js"

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
                console.log("Error store =" , error)
                switch (error.code) {
                    case "auth/invalid-email":
                        throw new Error("Email Incorrect")
                    default:
                        throw new Error("Invalid Error")
                }
            }
        }
    }
})