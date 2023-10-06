import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  title: "",
};

const jurusan = {
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
    SET_OPTIONS_TABLE_JURUSAN(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_JURUSAN(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_JURUSAN(state, payload) {
      state.reports = payload;
    },
    SET_FORM_JURUSAN(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_JURUSAN(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_JURUSAN(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetJurusan(context) {
      context.commit("SET_IS_LOADING_JURUSAN", true);
      try {
        const result = await axios({
          url: `${apiUrl}/jurusan`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_JURUSAN", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_JURUSAN", false);
      }
    },
    async CreateJurusan(context) {
      context.commit("SET_IS_LOADING_JURUSAN", true);
      try {
        const result = await axios({
          url: `${apiUrl}/jurusan`,
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

        context.dispatch("GetJurusan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_JURUSAN", false);
      }
    },
    async SetFormUpdateJurusan(context, id) {
      context.commit("SET_IS_LOADING_JURUSAN", true);
      try {
        const result = await axios({
          url: `${apiUrl}/jurusan/${id}`,
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
        context.commit("SET_IS_LOADING_JURUSAN", false);
      }
    },
    async UpdateJurusan(context, id) {
      context.commit("SET_IS_LOADING_JURUSAN", true);
      try {
        const result = await axios({
          url: `${apiUrl}/jurusan/${id}`,
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

        context.dispatch("GetJurusan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_JURUSAN", false);
      }
    },
  },
};

export default jurusan;
