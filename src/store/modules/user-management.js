import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";
const apiUrl = process.env.VUE_APP_API_URL;

const userManagement = {
  state: {
    isLoading: {
      reports: false,
      report: false,
    },
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    report: {},
  },
  mutations: {
    SET_IS_LOADING_USER_MANAGEMENT(state, payload) {
      state.isLoading[payload.key] = payload.value;
    },
    SET_OPTIONS_TABLE_USER_MANAGEMENT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_USER_MANAGEMENT(state, payload) {
      state.reports = payload;
    },
    SET_DETAIL_USER_MANAGEMENT(state, payload) {
      state.report = payload;
    },
  },
  actions: {
    GetUserManagement: async (context) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
        key: "reports",
        value: true,
      });

      try {
        const result = await axios({
          url: `${apiUrl}/user-management`,
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
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
          key: "reports",
          value: false,
        });
      }
    },
    GetPegawaiByNIP: async (context, nip) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
        key: "report",
        value: true,
      });

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
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
          key: "report",
          value: false,
        });
      }
    },
    SetPegawaiAsAdmin: async (context, nip) => {
      try {
        const result = await axios({
          url: `${apiUrl}/user-management/${nip}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.dispatch("GetUserManagement");
        Swal.fire({
          title: "Success!",
          text: result.data.message,
          icon: "success",
        });

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    },
  },
};

export default userManagement;
