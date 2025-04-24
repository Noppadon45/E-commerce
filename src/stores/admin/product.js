import { defineStore } from "pinia"


export const useAdminProductStore = defineStore("admin-product", {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        loadProducts() {
            const productsData = localStorage.getItem("admin-products")
            if (productsData) {
                this.list = JSON.parse(productsData)
                this.loaded = true
            }
        },
        getProduct(index) {
            if (!this.loaded) {
                this.loadProducts()
            }
            return this.list[index]
        },
        addProduct(productData) {
            productData.remainquantity = productData.quantity
            productData.update = (new Date()).toISOString()
            this.list.push(productData)
            localStorage.setItem("admin-products" , JSON.stringify(this.list))
        },
        updateProduct(index, product) {
            this.list[index].name = product.name
            this.list[index].image = product.image
            this.list[index].price = product.price
            this.list[index].quantity = product.quantity
            this.list[index].remainquantity = product.quantity
            this.list[index].status = product.status
            this.list[index].update = (new Date()).toISOString()
            localStorage.setItem("admin-products" , JSON.stringify(this.list))
        },
        removeProduct(index) {
            this.list.splice(index, 1)
            localStorage.setItem("admin-products" , JSON.stringify(this.list))
        }
    }
})