import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

import Login from "@/views/auth/login.vue";

import Dashboard from "@/views/dashboard/index.vue";
import Assessment from "@/views/assessment/index.vue";
import AssessmentDetail from "@/views/assessment/detail.vue";
import SummaryAssessment from "@/views/summary-assessment/index.vue";
import SummaryAssessmentDetail from "@/views/summary-assessment/detail.vue";

// SETUP
import Course from "@/views/setup/course/index.vue";
import CourseCLO from "@/views/setup/course/course-learning-outcome.vue";
import CourseAssessmentPlan from "@/views/setup/course/course-assessment-plan.vue";
import Rubrik from "@/views/setup/rubrik/index.vue";
import RubrikDetail from "@/views/setup/rubrik/detail.vue";
import AssessmentMethod from "@/views/setup/assessment-method/index.vue";
import CDIOSyllabus from "@/views/setup/cdio-syllabus/index.vue";
import ProficiencyLevel from "@/views/setup/proficiency-level/index.vue";
import ProficiencyLevelDetail from "@/views/setup/proficiency-level/detail.vue";
import StudentOutcome from "@/views/setup/student-outcome/index.vue";
import StudentOutcomeDetail from "@/views/setup/student-outcome/detail.vue";

// PROGRAM STUDI
import Jurusan from "@/views/setup/jurusan/index.vue";
import ProgramStudi from "@/views/setup/program-studi/index.vue";

// UTILITY
import AssessmentType from "@/views/utility/assessment-type/index.vue";
import GradingCategory from "@/views/utility/grading-category/index.vue";
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
    path: "/assessment",
    name: "Assessment",
    component: Assessment,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/assessment/:id",
    name: "AssessmentDetail",
    component: AssessmentDetail,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/summary-assessment",
    name: "SummaryAssessment",
    component: SummaryAssessment,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/summary-assessment/:id",
    name: "SummaryAssessmentDetail",
    component: SummaryAssessmentDetail,
    meta: {
      middleware: [auth],
    },
  },
  // ===================================================
  // SETUP
  // ===================================================
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
    name: "CourseCLO",
    component: CourseCLO,
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
    path: "/student-outcome/:id",
    name: "StudentOutcomeDetail",
    component: StudentOutcomeDetail,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/proficiency-level",
    name: "ProficiencyLevel",
    component: ProficiencyLevel,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/proficiency-level/:id",
    name: "ProficiencyLevelDetail",
    component: ProficiencyLevelDetail,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/jurusan",
    name: "Jurusan",
    component: Jurusan,
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
    path: "/assessment-type",
    name: "AssessmentType",
    component: AssessmentType,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/grading-category",
    name: "GradingCategory",
    component: GradingCategory,
    meta: {
      middleware: [auth],
    },
  },
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
