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
  },
};

export default course;
