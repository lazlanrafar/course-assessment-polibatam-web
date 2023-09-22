import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

// SETUP
import assessmentMethod from "./modules/assessment-method";
import rubrik from "./modules/rubrik";
import studentOutcome from "./modules/student-outcome";
import studentOutcomeLevel from "./modules/student-outcome-level";

export default new Vuex.Store({
  modules: {
    app,
    assessmentMethod,
    rubrik,
    studentOutcome,
    studentOutcomeLevel,
  },
});
