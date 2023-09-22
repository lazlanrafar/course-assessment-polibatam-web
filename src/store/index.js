import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

// SETUP
import rubrik from "./modules/rubrik";
import studentOutcome from "./modules/student-outcome";

export default new Vuex.Store({
  modules: {
    app,
    rubrik,
    studentOutcome,
  },
});
