import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";

const apiUrl = process.env.VUE_APP_API_URL;

const assessmentType = {
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
    SET_OPTIONS_TABLE_ASSESSMENT_TYPE(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_ASSESSMENT_TYPE(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_ASSESSMENT_TYPE(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    async GetAssessmentType(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT_TYPE", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment-type`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_ASSESSMENT_TYPE", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT_TYPE", false);
      }
    },
  },
};

export default assessmentType;
