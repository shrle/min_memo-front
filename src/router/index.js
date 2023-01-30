import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/privacy",
    name: "privacy",
    component: () => import("../views/PrivacyView.vue"),
  },
  {
    path: "/tos",
    name: "tos",
    component: () => import("../views/TosView.vue"),
  },
  {
    path: "/about:message",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "/u/:username/:memoId",
    name: "memo",
    component: () => import("../views/MemoView.vue"),
  },
  {
    path: "/u/:username/:memoId/edit",
    name: "edit",
    component: () => import("../views/MemoEditView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
