import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  title: "",
};

const assessmentMethod = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
    form: { ...form },
    isUpdate: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_ASSESSMENT_METHOD(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_ASSESSMENT_METHOD(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_ASSESSMENT_METHOD(state, payload) {
      state.reports = payload;
    },
    SET_FORM_ASSESSMENT_METHOD(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_ASSESSMENT_METHOD(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_ASSESSMENT_METHOD(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetAssessmentMethod(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment-method`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_ASSESSMENT_METHOD", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", false);
      }
    },
    async CreateAssessmentMethod(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment-method`,
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

        context.dispatch("GetAssessmentMethod");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", false);
      }
    },
    async SetFormUpdateAssessmentMethod(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment-method/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          title: result.data.data.title,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", false);
      }
    },
    async UpdateAssessmentMethod(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment-method/${id}`,
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

        context.dispatch("GetAssessmentMethod");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT_METHOD", false);
      }
    },
  },
};

export default assessmentMethod;
