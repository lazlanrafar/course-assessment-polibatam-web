import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_program_studi: "",
  code: "",
  title: "",
  sks: "",
  target_level: "",

  bobot_assignment: 0,
  bobot_quiz: 0,
  bobot_mid_exam: 0,
  bobot_final_exam: 0,
  bobot_practice_or_project: 0,
  bobot_presentation: 0,

  bobot_total: 0,
};

const form_clo = {
  id_course: "",
  rubrik: "",
  id_assessment_method: "",
  code: "",
  title: "",
};

const course = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    report: {},
    list_program_studi: [],
    form: { ...form },
    isUpdate: false,

    list_rubrik: [],
    list_assessment_method: [],
    form_clo: { ...form_clo },
    isUpdateCLO: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_COURSE(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_COURSE(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_COURSE(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_COURSE(state, payload) {
      state.report = payload;
    },

    SET_LIST_PROGRAM_STUDI_COURSE(state, payload) {
      state.list_program_studi = payload;
    },
    SET_FORM_COURSE(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_COURSE(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_COURSE(state, payload) {
      state.isUpdate = payload;
    },

    SET_LIST_RUBRIK_COURSE(state, payload) {
      state.list_rubrik = payload;
    },
    SET_LIST_ASSESSMENT_METHOD_COURSE(state, payload) {
      state.list_assessment_method = payload;
    },
    SET_FORM_COURSE_CLO(state, payload) {
      state.form_clo[payload.key] = payload.value;
    },
    RESET_FORM_COURSE_CLO(state) {
      state.form_clo = { ...form_clo };
    },
    SET_IS_UPDATE_COURSE_CLO(state, payload) {
      state.isUpdateCLO = payload;
    },
  },
  actions: {
    async GetCourse(context) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_COURSE", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async GetCourseById(context, id) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_COURSE", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async FetchBeforeFormCourse(context) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const programStudi = await axios({
          url: `${apiUrl}/program-studi`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_LIST_PROGRAM_STUDI_COURSE", programStudi.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async CreateCourse(context) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        context.dispatch("GetCourse");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async SetFormUpdateCourse(context, id) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        const data = result.data.data;

        context.state.form = {
          id_program_studi: data.id_program_studi,
          code: data.code,
          title: data.title,
          sks: data.sks,
          target_level: data.target_level,

          bobot_assignment: data.bobot_assignment,
          bobot_quiz: data.bobot_quiz,
          bobot_mid_exam: data.bobot_mid_exam,
          bobot_final_exam: data.bobot_final_exam,
          bobot_practice_or_project: data.bobot_practice_or_project,
          bobot_presentation: data.bobot_presentation,

          bobot_total:
            +data.bobot_assignment +
            +data.bobot_quiz +
            +data.bobot_mid_exam +
            +data.bobot_final_exam +
            +data.bobot_practice_or_project +
            +data.bobot_presentation,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async UpdateCourse(context, id) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        context.dispatch("GetCourse");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    // ==================================================================================
    // Course Learning Outcome
    // ==================================================================================
    async FetchBeforeFormCourseLearningOutcome(context, id_course) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const rubrik = await axios({
          url: `${apiUrl}/rubrik/list-by-course/${id_course}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_RUBRIK_COURSE", rubrik.data.data);

        const assessmentMethod = await axios({
          url: `${apiUrl}/assessment-method`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_ASSESSMENT_METHOD_COURSE", assessmentMethod.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async CreateCourseLearningOutcome(context) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/clo`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_clo,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        context.dispatch("GetCourseById", context.state.form_clo.id_course);
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async SetFormUpdateCourseLearningOutcome(context, id) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/clo/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;
        context.state.form_clo = {
          id_course: data.id_course,
          id_assessment_method: data.id_assessment_method,
          code: data.code,
          title: data.title,
          rubrik: data.rubrik,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async UpdateCourseLearningOutcome(context, id) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/clo/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_clo,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        context.dispatch("GetCourseById", context.state.form_clo.id_course);
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
    async DeleteCourseLearningOutcome(context, payload) {
      context.commit("SET_IS_LOADING_COURSE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/course/clo/${payload.id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        context.dispatch("GetCourseById", payload.id_course);
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_COURSE", false);
      }
    },
  },
};

export default course;
