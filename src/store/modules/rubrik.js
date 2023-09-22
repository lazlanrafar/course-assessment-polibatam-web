import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_cdio_syllabus: "",
  level: "",
  title: "",
};

const rubrik = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
    list_cdio_syllabus: [],
    form: { ...form },
    isUpdate: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_RUBRIK(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_RUBRIK(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_RUBRIK(state, payload) {
      state.reports = payload;
    },
    SET_LIST_CDIO_SYLLABUS_RUBRIK(state, payload) {
      state.list_cdio_syllabus = payload;
    },
    SET_FORM_RUBRIK(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_RUBRIK(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_RUBRIK(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetRubrik(context) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
      try {
        const result = await axios({
          url: `${apiUrl}/rubrik`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_RUBRIK", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_RUBRIK", false);
      }
    },
    async FetchBeforeFormRubrik(context) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
      try {
        const CDIOSyllabus = await axios({
          url: `${apiUrl}/rubrik/cdio-syllabus`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_CDIO_SYLLABUS_RUBRIK", CDIOSyllabus.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_RUBRIK", false);
      }
    },
    async CreateRubrik(context) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
      try {
        const result = await axios({
          url: `${apiUrl}/rubrik`,
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

        context.dispatch("GetRubrik");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_RUBRIK", false);
      }
    },
    async SetFormUpdateRubrik(context, id) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
      try {
        const result = await axios({
          url: `${apiUrl}/rubrik/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          id_cdio_syllabus: result.data.data.id_cdio_syllabus,
          level: result.data.data.level,
          title: result.data.data.title,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_RUBRIK", false);
      }
    },
  },
};

export default rubrik;
