import Vue from "vue";
import VueRouter from "vue-router";

// import auth from "@/middleware/auth";

import Login from "@/views/auth/login.vue";

import Dashboard from "@/views/dashboard/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [],
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: [],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") return next("/dashboard");
  return next();
});

// function nextFactory(context, middleware, index) {
//   const subsequentMiddleware = middleware[index];
//   if (!subsequentMiddleware) return context.next;

//   return (...parameters) => {
//     context.next(...parameters);
//     const nextMiddleware = nextFactory(context, middleware, index + 1);
//     subsequentMiddleware({ ...context, next: nextMiddleware });
//   };
// }

// router.beforeEach((to, from, next) => {
//   if (to.meta.middleware) {
//     const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

//     const context = {
//       from,
//       next,
//       router,
//       to,
//     };
//     const nextMiddleware = nextFactory(context, middleware, 1);

//     return middleware[0]({ ...context, next: nextMiddleware });
//   }

//   return next();
// });

export default router;
