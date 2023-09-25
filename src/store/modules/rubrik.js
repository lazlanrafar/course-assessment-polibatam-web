import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_program_studi: "",
  id_student_outcome: "",
  id_cdio_syllabus: "",
  code: "",
  title: "",

  desc_level_1: "",
  desc_level_2: "",
  desc_level_3: "",
  desc_level_4: "",
  desc_level_5: "",
};

const rubrik = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },

    reports_program_studi: [],
    reports: [],

    list_student_outcome: [],
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

    SET_REPORTS_PROGRAM_STUDI_RUBRIK(state, payload) {
      state.reports_program_studi = payload;
    },
    SET_REPORTS_RUBRIK(state, payload) {
      state.reports = payload;
    },

    SET_LIST_STUDENT_OUTCOME_RUBRIK(state, payload) {
      state.list_student_outcome = payload;
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
    async GetProgramStudiRubrik(context) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
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

        context.commit("SET_REPORTS_PROGRAM_STUDI_RUBRIK", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_RUBRIK", false);
      }
    },
    async GetRubrikByIdProgramStudi(context, id_program_studi) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
      try {
        const result = await axios({
          url: `${apiUrl}/rubrik/program-studi/${id_program_studi}`,
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
        const studentOutcome = await axios({
          url: `${apiUrl}/student-outcome`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_STUDENT_OUTCOME_RUBRIK", studentOutcome.data.data);

        const CDIOSyllabus = await axios({
          url: `${apiUrl}/cdio-syllabus`,
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

        context.dispatch("GetRubrikByIdProgramStudi", context.state.form.id_program_studi);
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
        context.commit("SET_IS_LOADING_RUBRIK", false);
      }
    },
    async UpdateRubrik(context, id) {
      context.commit("SET_IS_LOADING_RUBRIK", true);
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
  },
};

export default rubrik;
