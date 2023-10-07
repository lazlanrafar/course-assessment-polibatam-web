import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";

const apiUrl = process.env.VUE_APP_API_URL;

const gradingCategory = {
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
    SET_OPTIONS_TABLE_GRADING_CATEGORY(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_GRADING_CATEGORY(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_GRADING_CATEGORY(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    async GetGradingCategory(context) {
      context.commit("SET_IS_LOADING_GRADING_CATEGORY", true);
      try {
        const result = await axios({
          url: `${apiUrl}/grading-category/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORTS_GRADING_CATEGORY", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_GRADING_CATEGORY", false);
      }
    },
  },
};

export default gradingCategory;
