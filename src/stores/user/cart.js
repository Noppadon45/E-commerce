import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [
      {
        name: "Test1",
        imageUrl:
          "https://image.cdn2.seaart.me/2024-08-22/cr3hpkde878c73c2uk50/7bf5efcd481335eb797061b93281d376_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
    ],
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
    addToCart(productData) {
      this.items.push(productData)
    },
    updateCartQuantity(index, quantity) {
      this.items[index].quantity = quantity
    },
    removeItemInCart(index) {
      this.items.splice(index, 1)
    },
  },
})
