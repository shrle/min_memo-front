import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/h/:h1",
    name: "home",
    component: HomeView,
    meta: { title: "みんなの覚書" },
  },
  {
    path: "/privacy",
    name: "privacy",

    meta: { title: "プライバシーポリシー - みんなの覚書" },
    component: () => import("../views/PrivacyView.vue"),
  },
  {
    path: "/tos",
    name: "tos",

    meta: { title: "利用規約 - みんなの覚書" },
    component: () => import("../views/TosView.vue"),
  },
  {
    path: "/about",
    name: "about",

    meta: { title: "このサイトについて - みんなの覚書" },
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",

    meta: { title: "アカウント登録 - みんなの覚書" },
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "/u/:username",
    name: "userhome",

    meta: { title: "マイページ - みんなの覚書" },
    component: () => import("../views/UserHomeView.vue"),
  },
  {
    path: "/account-remove",
    name: "account-remove",

    meta: { title: "アカウント削除について - みんなの覚書" },
    component: () => import("../views/AccountRemoveView.vue"),
  },
  {
    path: "/u/:username/:memoId",
    name: "memo",

    meta: { title: "メモ - みんなの覚書" },
    component: () => import("../views/MemoView.vue"),
  },
  {
    path: "/u/:username/:memoId/edit",
    name: "edit",

    meta: { title: "メモの編集 - みんなの覚書" },
    component: () => import("../views/MemoEditView.vue"),
  },

  {
    path: "/local/:h1Id/:h2Id/:h3Id",
    name: "local-memo",

    meta: { title: "ローカル/メモ - みんなの覚書" },
    component: () => import("../views/LocalMemoView.vue"),
  },
  {
    path: "/local/:h1Id/:h2Id/:h3Id/edit",
    name: "local-edit",

    meta: { title: "ローカル/メモの編集 - みんなの覚書" },
    component: () => import("../views/LocalMemoEditView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
    meta: { title: "ページが見つかりません" },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "みんなの覚書" },
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
