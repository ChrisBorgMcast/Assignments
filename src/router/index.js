import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ListingsView from "../views/ListingsView.vue"
import AddBookingView from "../views/AddBookingView.vue"
import EditBookingView from "../views/EditBookingView.vue"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/listings", name: "listings", component: ListingsView },
    { path: "/add-booking", name: "add-booking", component: AddBookingView },
    { path: "/edit/:id", name: "edit-booking", component: EditBookingView },
  ],
})

export default router
