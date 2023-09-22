import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const userManagement = {
  state: {
    isLoading: false,
    isLoadingUnit: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    list_unit: [],
    unit_active: "",
    reports: [],
    report: {},
  },
  mutations: {
    SET_IS_LOADING_USER_MANAGEMENT(state, payload) {
      state.isLoading = payload;
    },
    SET_IS_LOADING_UNIT_USER_MANAGEMENT(state, payload) {
      state.isLoadingUnit = payload;
    },
    SET_OPTIONS_TABLE_USER_MANAGEMENT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_LIST_UNIT_USER_MANAGEMENT(state, payload) {
      state.list_unit = payload;
    },
    SET_UNIT_ACTIVE_USER_MANAGEMENT(state, payload) {
      state.unit_active = payload;
    },
    SET_REPORTS_USER_MANAGEMENT(state, payload) {
      state.reports = payload;
    },
    SET_DETAIL_USER_MANAGEMENT(state, payload) {
      state.report = payload;
    },
  },
  actions: {
    GetUnitUserManagement: async (context) => {
      context.commit("SET_IS_LOADING_UNIT_USER_MANAGEMENT", true);

      try {
        const unit = await axios({
          url: `${apiUrl}/user-management/unit`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        if (unit.data.data === "") {
          return;
        }

        context.commit("SET_LIST_UNIT_USER_MANAGEMENT", unit.data.data);
        context.commit("SET_UNIT_ACTIVE_USER_MANAGEMENT", unit.data.data[0].ID);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_UNIT_USER_MANAGEMENT", false);
      }
    },
    GetUserManagement: async (context) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user-management?unit=${context.state.unit_active}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        if (result.data.data === "") {
          return;
        }

        result.data.data.forEach((item, index) => {
          item.NO = index + 1;
        });

        context.commit("SET_REPORTS_USER_MANAGEMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
    GetPegawaiByNIP: async (context, nip) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user-management/${nip}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        let entries = Object.entries(result.data.data);
        let data = [];
        entries.forEach((item) => {
          data.push({
            key: item[0],
            value: item[1],
          });
        });

        context.commit("SET_DETAIL_USER_MANAGEMENT", data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
  },
};

export default userManagement;
