import { defineStore } from "pinia"

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [
      {
        name: "Test1",
        imageUrl:
          "https://image.cdn2.seaart.me/2024-08-22/cr3hpkde878c73c2uk50/7bf5efcd481335eb797061b93281d376_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
      {
        name: "Test2",
        imageUrl:
          "https://image.cdn2.seaart.me/2024-11-30/ct5a6e5e878c73cq83n0/4373c7595f333c00eaee9b19d9bb5372_high.webp",
        quantity: 1,
        about: "Test11",
        state: "open",
        price: 100,
      },
    ],
  }),
})
