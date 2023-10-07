import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  level: "",
};

const form_detail = {
  lower_limit: "",
  upper_limit: "",
};

const proficiencyLevel = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
    report: {},
    form: { ...form },
    isUpdate: false,

    form_detail: { ...form_detail },
    isUpdate_detail: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_PROFICIENCY_LEVEL(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_PROFICIENCY_LEVEL(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_PROFICIENCY_LEVEL(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_PROFICIENCY_LEVEL(state, payload) {
      state.report = payload;
    },
    SET_FORM_PROFICIENCY_LEVEL(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_PROFICIENCY_LEVEL(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_PROFICIENCY_LEVEL(state, payload) {
      state.isUpdate = payload;
    },

    SET_FORM_DETAIL_PROFICIENCY_LEVEL(state, payload) {
      state.form_detail[payload.key] = payload.value;
    },
    RESET_FORM_DETAIL_PROFICIENCY_LEVEL(state) {
      state.form_detail = { ...form_detail };
    },
    SET_IS_UPDATE_DETAIL_PROFICIENCY_LEVEL(state, payload) {
      state.isUpdate_detail = payload;
    },
  },
  actions: {
    async GetProficiencyLevel(context) {
      context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", true);
      try {
        const result = await axios({
          url: `${apiUrl}/proficiency-level`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_PROFICIENCY_LEVEL", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", false);
      }
    },
    async GetProficiencyLevelById(context, id) {
      context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", true);
      try {
        const result = await axios({
          url: `${apiUrl}/proficiency-level/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_PROFICIENCY_LEVEL", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", false);
      }
    },
    async CreateProficiencyLevel(context) {
      context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", true);
      try {
        const result = await axios({
          url: `${apiUrl}/proficiency-level`,
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

        context.dispatch("GetProficiencyLevel");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", false);
      }
    },
    async SetFormUpdateProficiencyLevelDetail(context, id) {
      context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", true);
      try {
        const result = await axios({
          url: `${apiUrl}/proficiency-level/detail/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;

        context.state.form_detail = {
          lower_limit: data.lower_limit,
          upper_limit: data.upper_limit,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", false);
      }
    },
    async UpdateProficiencyLevelDetail(context, id) {
      context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", true);
      try {
        const result = await axios({
          url: `${apiUrl}/proficiency-level/detail/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_detail,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PROFICIENCY_LEVEL", false);
      }
    },
  },
};

export default proficiencyLevel;
