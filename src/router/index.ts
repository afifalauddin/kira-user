import App from "@/pages/App.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: App,
        TopNavBar: () => import("@/components/NavBar.vue"),
      },
    },
  ],
});
