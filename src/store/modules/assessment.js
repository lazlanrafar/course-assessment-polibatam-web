import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_course: "",
  semester: "",
  academic_year: "",
  class: "",
};

const form_mahasiswa = {
  id_assessment: "",
  nim: "",
  name: "",

  quiz: [],
  practice_or_project: [],
  assignment: [],
  mid_exam: "",
  final_exam: "",
  presentation: [],
};

const assessment = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
    report: {},
    list_course: [],
    form: { ...form },
    isUpdate: false,

    form_mahasiswa: { ...form_mahasiswa },
    isUpdateMahasiswa: false,
  },
  mutations: {
    SET_OPTIONS_TABLE_ASSESSMENT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_ASSESSMENT(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_ASSESSMENT(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_ASSESSMENT(state, payload) {
      state.report = payload;
    },
    SET_LIST_COURSE_ASSESSMENT(state, payload) {
      state.list_course = payload;
    },
    SET_FORM_ASSESSMENT(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_ASSESSMENT(state) {
      state.form = { ...form };
    },
    SET_IS_UPDATE_ASSESSMENT(state, payload) {
      state.isUpdate = payload;
    },

    SET_FORM_MAHASISWA_ASSESSMENT(state, payload) {
      state.form_mahasiswa[payload.key] = payload.value;
    },
    RESET_FORM_MAHASISWA_ASSESSMENT(state) {
      state.form_mahasiswa = { ...form_mahasiswa };
    },
    SET_IS_UPDATE_MAHASISWA_ASSESSMENT(state, payload) {
      state.isUpdateMahasiswa = payload;
    },
  },
  actions: {
    async GetAssessment(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_ASSESSMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async GetAssessmentById(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_ASSESSMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async FetchBeforeFormAssessment(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const COURSE = await axios({
          url: `${apiUrl}/course/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_COURSE_ASSESSMENT", COURSE.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async CreateAssessment(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment`,
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

        context.dispatch("GetAssessment");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async SetFormUpdateAssessment(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;
        context.state.form = {
          id_course: data.id_course,
          semester: data.semester,
          academic_year: data.academic_year,
          class: data.class,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async UpdateAssessment(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/${id}`,
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

        context.dispatch("GetAssessment");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async DeleteAssessment(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        context.dispatch("GetAssessment");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    // ===========================================================
    // ASSESSMENT DETAIL
    // ===========================================================
    async CreateAssessmentDetail(context) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/detail`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_mahasiswa,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async SetFormUpdateAssessmentDetail(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/detail/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;

        context.state.form_mahasiswa = {
          id_assessment: data.id_assessment,
          nim: data.nim,
          name: data.name,
          quiz: data.quiz,
          practice_or_project: data.practice_or_project,
          assignment: data.assignment,
          mid_exam: data.mid_exam,
          final_exam: data.final_exam,
          presentation: data.presentation,
        };

        return true;
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
    async UpdateAssessmentDetail(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/detail/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_mahasiswa,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });

        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_ASSESSMENT", false);
      }
    },
  },
};

export default assessment;
