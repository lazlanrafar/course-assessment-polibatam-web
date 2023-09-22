import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
// import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const rubrik = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
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
  },
};

export default rubrik;
