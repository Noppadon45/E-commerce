import { defineStore } from "pinia"

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [
      {
        name: "Banana",
        imageUrl:
          "https://image.cdn2.seaart.me/2024-08-22/cr3hpkde878c73c2uk50/7bf5efcd481335eb797061b93281d376_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
      {
        name: "Orange",
        imageUrl:
          "https://image.cdn2.seaart.me/2024-11-30/ct5a6e5e878c73cq83n0/4373c7595f333c00eaee9b19d9bb5372_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
      {
        name: "Apple",
        imageUrl:
          "https://image.cdn2.seaart.me/2023-09-02/16056548172235781/3370c7aff8a9972e18f23d47fdd29cfa074b19b5_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
      {
        name: "Mango",
        imageUrl:
          "https://image.cdn2.seaart.me/2023-10-03/18865000481338373/45cd45728ce8d9fb8714a57812ca2e42776f1e0d_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
    ],
  }),
  actions: {
    filterProduct(Searchtext) {
      return this.list.filter((product) => product.name.includes(Searchtext))
    },
  },
})
