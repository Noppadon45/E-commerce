import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/user/HomeView.vue"
import CartView from "@/views/user/CartView.vue"
import CheckoutView from "@/views/user/CheckoutView.vue"
import ProfileView from "@/views/user/ProfileView.vue"
import SearchView from "@/views/user/SearchView.vue"
import SuccessView from "@/views/user/SuccessView.vue"

// Admin views
import DashboardView from "@/views/admin/DashboardView.vue"
import LoginView from "@/views/admin/LoginView.vue"
import AdminProductListView from "@/views/admin/product/ListView.vue"
import AdminProductUpdateView from "@/views/admin/product/UpdateView.vue"

import AdminOrderListView from "@/views/admin/order/ListView.vue"
import AdminOrderDetailView from "@/views/admin/order/DetailView.vue"

import AdminUserListView from "@/views/admin/user/ListView.vue"
import AdminUserUpdateView from "@/views/admin/user/UpdateView.vue"


import { useAccountStore } from "@/stores/account"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/success",
      name: "success",
      component: SuccessView,
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: LoginView,
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: DashboardView,
    },
    {
      path: "/admin/products",
      name: "admin-product-list",
      component: AdminProductListView,
    },
    {
      path: "/admin/products/create",
      name: "admin-product-create",
      component: AdminProductUpdateView,
    },
    {
      path: "/admin/products/update/:id",
      name: "admin-product-update",
      component: AdminProductUpdateView,
    },
    {
      path: "/admin/users",
      name: "admin-users-list",
      component: AdminUserListView,
    },
    {
      path: "/admin/users/update/:id",
      name: "admin-users-update",
      component: AdminUserUpdateView,
    },
    {
      path: "/admin/orders",
      name: "admin-orders-list",
      component: AdminOrderListView,
    },
    {
      path: "/admin/orders/detail/:id",
      name: "admin-orders-detail",
      component: AdminOrderDetailView,
    },
    
  ],
})

router.beforeEach(async (to , from , next) => {
  const AccountStore = useAccountStore()
  await AccountStore.checkAuth()

  next()
})

export default router
