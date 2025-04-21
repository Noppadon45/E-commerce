import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    checkout: {}
  }),
  getters: {
    summaryPrice(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
    },
    summaryQuantity(state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0)
    },
  },
  actions: {
    loadCart() {
      const previousCart = localStorage.getItem("cart-data")
      if (previousCart) {
        this.items = JSON.parse(previousCart)
      }
    },
    addToCart(productData) {
      const findItemsIndex = this.items.findIndex((item) => {
        return item.name === productData.name
      })
      if (findItemsIndex < 0) {
        productData.quantity = 1
        this.items.push(productData)
      } else {
        const currentItem = this.items[findItemsIndex]
        this.updateCartQuantity(findItemsIndex, currentItem.quantity + 1)
      }
      localStorage.setItem("cart-data", JSON.stringify(this.items))
    },
    updateCartQuantity(index, quantity) {
      this.items[index].quantity = quantity
      localStorage.setItem("cart-data", JSON.stringify(this.items))
    },
    removeItemInCart(index) {
      this.items.splice(index, 1)
      localStorage.setItem("cart-data", JSON.stringify(this.items))
    },
    checkoutCart(userData) {
      const orderData = {
        ...userData,
        totalPrice: this.summaryPrice,
        payment: 'Credit Card',
        created: (new Date()).toLocaleString(),
        ordernumber: `AA${Math.floor(Math.random() * 10000)}`,
        products: this.items
      }
      localStorage.setItem("order-data", JSON.stringify(orderData))
    },
    loadcheckout() {
      const checkoutData = localStorage.getItem("order-data")
      if (checkoutData) {
        this.checkout = JSON.parse(checkoutData)
      }
    }
  },
})
