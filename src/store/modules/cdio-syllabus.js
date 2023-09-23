import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_cdio_syllabus_parent: "",
  level: "",
  title: "",
};

const CDIOSyllabus = {
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
    SET_OPTIONS_TABLE_CDIO_SYLLABUS(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_CDIO_SYLLABUS(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_CDIO_SYLLABUS(state, payload) {
      state.reports = payload;
    },
    SET_LIST_CDIO_SYLLABUS_CDIO_SYLLABUS(state, payload) {
      state.list_cdio_syllabus = payload;
    },
    SET_FORM_CDIO_SYLLABUS(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_CDIO_SYLLABUS(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_CDIO_SYLLABUS(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetCDIOSyllabus(context) {
      context.commit("SET_IS_LOADING_CDIO_SYLLABUS", true);
      try {
        const result = await axios({
          url: `${apiUrl}/cdio-syllabus`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_CDIO_SYLLABUS", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_CDIO_SYLLABUS", false);
      }
    },
    async FetchBeforeFormCDIOSyllabus(context) {
      context.commit("SET_IS_LOADING_CDIO_SYLLABUS", true);
      try {
        const CDIOSyllabus = await axios({
          url: `${apiUrl}/cdio-syllabus/parent`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_CDIO_SYLLABUS_CDIO_SYLLABUS", CDIOSyllabus.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_CDIO_SYLLABUS", false);
      }
    },
    async CreateCDIOSyllabus(context) {
      context.commit("SET_IS_LOADING_CDIO_SYLLABUS", true);
      try {
        const result = await axios({
          url: `${apiUrl}/cdio-syllabus`,
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

        context.dispatch("GetCDIOSyllabus");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_CDIO_SYLLABUS", false);
      }
    },
    async SetFormUpdateCDIOSyllabus(context, id) {
      context.commit("SET_IS_LOADING_CDIO_SYLLABUS", true);
      try {
        const result = await axios({
          url: `${apiUrl}/cdio-syllabus/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          id_cdio_syllabus_parent: result.data.data.id_cdio_syllabus_parent,
          level: result.data.data.level,
          title: result.data.data.title,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_CDIO_SYLLABUS", false);
      }
    },
    async UpdateCDIOSyllabus(context, id) {
      context.commit("SET_IS_LOADING_CDIO_SYLLABUS", true);
      try {
        const result = await axios({
          url: `${apiUrl}/cdio-syllabus/${id}`,
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

        context.dispatch("GetCDIOSyllabus");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_CDIO_SYLLABUS", false);
      }
    },
  },
};

export default CDIOSyllabus;
