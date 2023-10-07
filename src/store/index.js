import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";
import assessment from "./modules/assessment";

// SETUP
import course from "./modules/course";
import rubrik from "./modules/rubrik";
import assessmentMethod from "./modules/assessment-method";
import assessmentType from "./modules/assessment-type";
import CDIOSyllabus from "./modules/cdio-syllabus";
import studentOutcome from "./modules/student-outcome";
import gradingCategory from "./modules/grading-category";
import proficiencyLevel from "./modules/proficiency-level";

import jurusan from "./modules/jurusan";
import programStudi from "./modules/program-studi";

// UTILITY
import userManagement from "./modules/user-management";

export default new Vuex.Store({
  modules: {
    app,
    assessment,
    course,
    rubrik,
    assessmentMethod,
    assessmentType,
    CDIOSyllabus,
    studentOutcome,
    gradingCategory,
    proficiencyLevel,
    jurusan,
    programStudi,
    userManagement,
  },
});
