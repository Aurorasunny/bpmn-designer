import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "designer",
    component: () => import("../pages/designer/designer.vue"),
  //   path: "/",
  //   name: "Exclusive",
  //   component: () => import("@/components/designer/event/EndEvent.vue"),
  },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

export default router;
