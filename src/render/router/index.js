import { createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/kanban",
        name: "KanBan",
        component: () => import("../views/kanban"),
      },
      {
        path: "/kanban-history",
        name: "KanBanHistory",
        component: () => import("../views/history/Index"),
      },
    ],
    redirect: "/kanban",
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
