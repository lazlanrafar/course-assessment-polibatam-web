import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  code: "",
  title: "",
};

const studentOutcome = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    form: { ...form },
    isUpdate: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_STUDENT_OUTCOME(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_STUDENT_OUTCOME(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_STUDENT_OUTCOME(state, payload) {
      state.reports = payload;
    },
    SET_FORM_STUDENT_OUTCOME(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_STUDENT_OUTCOME(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_STUDENT_OUTCOME(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetStudentOutcome(context) {
      context.commit("SET_IS_LOADING_STUDENT_OUTCOME", true);
      try {
        const result = await axios({
          url: `${apiUrl}/student-outcome`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_STUDENT_OUTCOME", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_STUDENT_OUTCOME", false);
      }
    },
    async CreateStudentOutcome(context) {
      context.commit("SET_IS_LOADING_STUDENT_OUTCOME", true);
      try {
        const result = await axios({
          url: `${apiUrl}/student-outcome`,
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

        context.dispatch("GetStudentOutcome");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_STUDENT_OUTCOME", false);
      }
    },
    async SetFormUpdateStudentOutcome(context, id) {
      context.commit("SET_IS_LOADING_STUDENT_OUTCOME", true);
      try {
        const result = await axios({
          url: `${apiUrl}/student-outcome/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          code: result.data.data.code,
          title: result.data.data.title,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_STUDENT_OUTCOME", false);
      }
    },
    async UpdateStudentOutcome(context, id) {
      context.commit("SET_IS_LOADING_STUDENT_OUTCOME", true);
      try {
        const result = await axios({
          url: `${apiUrl}/student-outcome/${id}`,
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

        context.dispatch("GetStudentOutcome");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_STUDENT_OUTCOME", false);
      }
    },
  },
};

export default studentOutcome;
