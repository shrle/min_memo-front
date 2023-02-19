import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "みんなの覚書" },
  },

  {
    path: "/privacy",
    name: "privacy",

    meta: { title: "みんなの覚書 | プライバシーポリシー" },
    component: () => import("../views/PrivacyView.vue"),
  },
  {
    path: "/tos",
    name: "tos",

    meta: { title: "みんなの覚書 | 利用規約" },
    component: () => import("../views/TosView.vue"),
  },
  {
    path: "/about",
    name: "about",

    meta: { title: "みんなの覚書 | このサイトについて" },
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",

    meta: { title: "みんなの覚書 | アカウント登録" },
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "/u/:username/:memoId",
    name: "memo",

    meta: { title: "みんなの覚書 | メモ" },
    component: () => import("../views/MemoView.vue"),
  },
  {
    path: "/u/:username/:memoId/edit",
    name: "edit",

    meta: { title: "みんなの覚書 | メモの編集" },
    component: () => import("../views/MemoEditView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
    meta: { title: "ページが見つかりません" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const DEFAULT_TITLE = "みんなの覚書";

router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
