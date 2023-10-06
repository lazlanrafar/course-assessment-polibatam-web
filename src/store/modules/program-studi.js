import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_jurusan: "",
  title: "",
};

const programStudi = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    list_jurusan: [],
    form: { ...form },
    isUpdate: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_PROGRAM_STUDI(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_PROGRAM_STUDI(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_PROGRAM_STUDI(state, payload) {
      state.reports = payload;
    },
    SET_LIST_JURUSAN_PROGRAM_STUDI(state, payload) {
      state.list_jurusan = payload;
    },
    SET_FORM_PROGRAM_STUDI(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_PROGRAM_STUDI(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_PROGRAM_STUDI(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async GetProgramStudi(context) {
      context.commit("SET_IS_LOADING_PROGRAM_STUDI", true);
      try {
        const result = await axios({
          url: `${apiUrl}/program-studi`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_PROGRAM_STUDI", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PROGRAM_STUDI", false);
      }
    },
    async FetchBeforeFormProgramStudi(context) {
      context.commit("SET_IS_LOADING_PROGRAM_STUDI", true);
      try {
        const jurusan = await axios({
          url: `${apiUrl}/jurusan/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_JURUSAN_PROGRAM_STUDI", jurusan.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PROGRAM_STUDI", false);
      }
    },
    async CreateProgramStudi(context) {
      context.commit("SET_IS_LOADING_PROGRAM_STUDI", true);
      try {
        const result = await axios({
          url: `${apiUrl}/program-studi`,
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

        context.dispatch("GetProgramStudi");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PROGRAM_STUDI", false);
      }
    },
    async SetFormUpdateProgramStudi(context, id) {
      context.commit("SET_IS_LOADING_PROGRAM_STUDI", true);
      try {
        const result = await axios({
          url: `${apiUrl}/program-studi/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          id_jurusan: result.data.data.id_jurusan,
          title: result.data.data.title,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PROGRAM_STUDI", false);
      }
    },
    async UpdateProgramStudi(context, id) {
      context.commit("SET_IS_LOADING_PROGRAM_STUDI", true);
      try {
        const result = await axios({
          url: `${apiUrl}/program-studi/${id}`,
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

        context.dispatch("GetProgramStudi");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PROGRAM_STUDI", false);
      }
    },
  },
};

export default programStudi;
