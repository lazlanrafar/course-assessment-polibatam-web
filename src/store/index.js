import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

// SETUP
import assessmentMethod from "./modules/assessment-method";
import rubrik from "./modules/rubrik";
import studentOutcome from "./modules/student-outcome";
import studentOutcomeLevel from "./modules/student-outcome-level";
import programStudi from "./modules/program-studi";

// UTILITY
import userManagement from "./modules/user-management";

export default new Vuex.Store({
  modules: {
    app,
    assessmentMethod,
    rubrik,
    studentOutcome,
    studentOutcomeLevel,
    programStudi,
    userManagement,
  },
});
