import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import course from "./modules/course";

// SETUP
import rubrik from "./modules/rubrik";
import assessmentMethod from "./modules/assessment-method";
import CDIOSyllabus from "./modules/cdio-syllabus";
import studentOutcome from "./modules/student-outcome";
import studentOutcomeLevel from "./modules/student-outcome-level";
import programStudi from "./modules/program-studi";

// UTILITY
import userManagement from "./modules/user-management";

export default new Vuex.Store({
  modules: {
    app,
    course,
    rubrik,
    assessmentMethod,
    CDIOSyllabus,
    studentOutcome,
    studentOutcomeLevel,
    programStudi,
    userManagement,
  },
});
