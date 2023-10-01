import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

import Login from "@/views/auth/login.vue";

import Dashboard from "@/views/dashboard/index.vue";
import Course from "@/views/course/index.vue";
import CourseLearningOutcome from "@/views/course/course-learning-outcome.vue";
import CourseAssessmentPlan from "@/views/course/course-assessment-plan.vue";

// SETUP
import Rubrik from "@/views/setup/rubrik/index.vue";
import RubrikDetail from "@/views/setup/rubrik/detail.vue";
import AssessmentMethod from "@/views/setup/assessment-method/index.vue";
import CDIOSyllabus from "@/views/setup/cdio-syllabus/index.vue";
import StudentOutcome from "@/views/setup/student-outcome/index.vue";
import StudentOutcomeLevel from "@/views/setup/student-outcome-level/index.vue";
import ProgramStudi from "@/views/setup/program-studi/index.vue";

// UTILITY
import UserManagement from "@/views/utility/user-management/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/course",
    name: "Course",
    component: Course,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/course/clo/:id",
    name: "CourseLearningOutcome",
    component: CourseLearningOutcome,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/course/assessment-plan/:id",
    name: "CourseAssessmentPlan",
    component: CourseAssessmentPlan,
    meta: {
      middleware: [auth],
    },
  },
  // ===================================================
  // SETUP
  // ===================================================
  {
    path: "/rubrik",
    name: "Rubrik",
    component: Rubrik,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/rubrik/:id",
    name: "RubrikDetail",
    component: RubrikDetail,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/assessment-method",
    name: "AssessmentMethod",
    component: AssessmentMethod,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/cdio-syllabus",
    name: "CDIOSyllabus",
    component: CDIOSyllabus,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/student-outcome",
    name: "StudentOutcome",
    component: StudentOutcome,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/student-outcome-level",
    name: "StudentOutcomeLevel",
    component: StudentOutcomeLevel,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/program-studi",
    name: "ProgramStudi",
    component: ProgramStudi,
    meta: {
      middleware: [auth],
    },
  },
  // ===================================================
  // UTILITY
  // ===================================================
  {
    path: "/user-management",
    name: "UserManagement",
    component: UserManagement,
    meta: {
      middleware: [auth],
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

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
