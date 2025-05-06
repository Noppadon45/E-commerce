import { defineStore } from "pinia"
import { db } from "@/firebase"
import { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc , query , where , orderBy , limit , limitToLast ,startAfter , endBefore } from "firebase/firestore"


export const useAdminProductStore = defineStore("admin-product", {
    state: () => ({
        list: [],
        docList: [],
        filter: {
            search: '',
            status: '',
            sort: {
                update: 'desc',
            }
        }
    }),
    getters: {
        list (state) {
            return state.docList.map(doc => {
                let convertedProduct = doc.data()
                convertedProduct.productId = doc.id
                convertedProduct.update = convertedProduct.update.toDate()
                return convertedProduct
            })
        }
    },
    actions: {
        async loadProducts() {
            let productCol = query(collection(db, 'products') , orderBy("update" , this.filter.sort.update))
            if (this.filter.search) {
                productCol = query(productCol , where("name" , "==" , this.filter.search))
            }
            if (this.filter.status) {
                productCol = query(productCol , where("status" , "==" , this.filter.status))
            }
            productCol = query(productCol , limit(2))
            const productSnapshot = await getDocs(productCol)
            this.docList = productSnapshot.docs
            if (products) {
                this.list = products
            }
        },
        async loadNextProduct (mode) {
            let productCol = query(collection(db, 'products') , orderBy("update" , this.filter.sort.update))
            if (mode === 'next') {
                const lastDocument = this.docList[this.docList.length - 1]
                productCol = query(productCol , startAfter(lastDocument) , limit(2))
            }
            else if (mode === 'previous') {
                const firstDocument = this.docList[0]
                productCol = query(productCol , endBefore(firstDocument) , limitToLast(2))

            }
            const productSnapshot = await getDocs(productCol)
            this.docList = productSnapshot.docs
        },
        async getProduct(productId) {
            try {
                const productRef = doc(db, 'products', productId)
                const productSnapshot = await getDoc(productRef)
                return productSnapshot.data()

            } catch (error) {
                console.log('error', error)
            }

            return this.list[index]
        },
        async addProduct(productData) {
            try {
                productData.remainquantity = productData.quantity
                productData.update = new Date()
                const productCol = collection(db, 'products')
                await addDoc(productCol, productData)
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateProduct(productId, productData) {
            try {
                const updateProductData = {}
                updateProductData.name = productData.name
                updateProductData.imageUrl = productData.imageUrl
                updateProductData.price = productData.price
                updateProductData.quantity = productData.quantity
                updateProductData.remainquantity = productData.quantity
                updateProductData.status = productData.status
                updateProductData.about = productData.about
                updateProductData.update = new Date()

                const productRef = doc(db , 'products' , productId)
                await setDoc(productRef , updateProductData)
            } catch (error) {
                console.log('error', error)
            }
        },
        async removeProduct(productId) {
            try {
                const productRef = doc(db , 'products' , productId)
                await deleteDoc(productRef)
            } catch (error) {
                console.log('error', error)
            }
        }
    }
})