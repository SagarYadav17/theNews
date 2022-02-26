import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import YCombinator from "../views/YCombinator.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/y-combinator",
    name: "YCombinator",
    component: YCombinator,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
