import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_course: "",
  semester: "",
  academic_year: "",
  class: "",
};

const assessment = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
    list_course: [],
    form: { ...form },
    isUpdate: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_ASSESSMENT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_ASSESSMENT(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_ASSESSMENT(state, payload) {
      state.reports = payload;
    },
    SET_LIST_COURSE_ASSESSMENT(state, payload) {
      state.list_course = payload;
    },
    SET_FORM_ASSESSMENT(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_ASSESSMENT(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_ASSESSMENT(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetAssessment(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_ASSESSMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async FetchBeforeFormAssessment(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const COURSE = await axios({
          url: `${apiUrl}/course/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_COURSE_ASSESSMENT", COURSE.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async CreateAssessment(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment`,
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

        context.dispatch("GetAssessment");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async SetFormUpdateAssessment(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;
        context.state.form = {
          id_course: data.id_course,
          semester: data.semester,
          academic_year: data.academic_year,
          class: data.class,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async UpdateAssessment(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/${id}`,
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

        context.dispatch("GetAssessment");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
  },
};

export default assessment;
