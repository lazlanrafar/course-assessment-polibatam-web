import axios from "axios";
import catchUnauthorized from "@/utils/catch-unauthorized";
import Swal from "sweetalert2";

const apiUrl = process.env.VUE_APP_API_URL;

const form = {
  id_course: "",
  id_proficiency_level: "",

  teacher_nip: "",
  teacher_name: "",

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
    loading: {
      percentage_of_student_within_each_category: false,
      student_proficiency_level_attainment_for_each_assessment_tool: false,
      percentage_of_student_within_each_proficiency_level: false,
      attainment_of_each_performance_indicator: false,
    },
    optionsTable: {
      page: 1,
      itemsPerPage: -1,
      search: "",
    },
    reports: [],
    report: {},
    list_course: [],
    list_proficiency_level: [],
    form: { ...form },
    isUpdate: false,

    form_mahasiswa: { ...form_mahasiswa },
    form_import_mahasiswa: [],
    isUpdateMahasiswa: false,

    percentage_of_student_within_each_category: [],
    student_proficiency_level_attainment_for_each_assessment_tool: [],
    percentage_of_student_within_each_proficiency_level: [],
    attainment_of_each_performance_indicator: [],
  },
  mutations: {
    SET_OPTIONS_TABLE_ASSESSMENT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_IS_LOADING_ASSESSMENT(state, payload) {
      state.isLoading = payload;
    },
    SET_IS_LOADING_DETAIL_ASSESSMENT(state, payload) {
      state.loading[payload.key] = payload.value;
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
    SET_LIST_PROFICIENCY_LEVEL_ASSESSMENT(state, payload) {
      state.list_proficiency_level = payload;
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
    SET_FORM_IMPORT_MAHASISWA_ASSESSMENT(state, payload) {
      state.form_import_mahasiswa = payload;
    },
    SET_IS_UPDATE_MAHASISWA_ASSESSMENT(state, payload) {
      state.isUpdateMahasiswa = payload;
    },

    SET_PERCENTAGE_OF_STUDENT_WITHIN_EACH_CATEGORY_ASSESSMENT(state, payload) {
      state.percentage_of_student_within_each_category = payload;
    },
    SET_STUDENT_PROFICIENCY_LEVEL_ATTAINMENT_FOR_EACH_ASSESSMENT_TOOL_ASSESSMENT(state, payload) {
      state.student_proficiency_level_attainment_for_each_assessment_tool = payload;
    },
    SET_PERCENTAGE_OF_STUDENT_WITHIN_EACH_PROFICIENCY_LEVEL_ASSESSMENT(state, payload) {
      state.percentage_of_student_within_each_proficiency_level = payload;
    },
    SET_ATTAINMENT_OF_EACH_PERFORMANCE_INDICATOR_ASSESSMENT(state, payload) {
      state.attainment_of_each_performance_indicator = payload;
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

        const PROFICIENCY_LEVEL = await axios({
          url: `${apiUrl}/proficiency-level/list`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });
        context.commit("SET_LIST_PROFICIENCY_LEVEL_ASSESSMENT", PROFICIENCY_LEVEL.data.data);
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
    async ImportAssessmentDetail(context, id_assessment) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/detail/import/${id_assessment}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: {
            data: JSON.stringify(context.state.form_import_mahasiswa),
          },
        });

        context.dispatch("GetAssessmentById", id_assessment);
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
    async DeleteAssessmentDetail(context, id) {
      context.commit("SET_IS_LOADING_ASSESSMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/detail/${id}`,
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
    // ASSESSMENT REPORT
    // ===========================================================
    async GetPercentageOfStudentWithinEachCategory(context, id_assessment) {
      context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
        key: "percentage_of_student_within_each_category",
        value: true,
      });
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/percentage-of-students-within-each-category/${id_assessment}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_PERCENTAGE_OF_STUDENT_WITHIN_EACH_CATEGORY_ASSESSMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
          key: "percentage_of_student_within_each_category",
          value: false,
        });
      }
    },
    async GetStudentProficiencyLevelAttainmentForEachAssessmentTool(context, id_assessment) {
      context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
        key: "student_proficiency_level_attainment_for_each_assessment_tool",
        value: true,
      });
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/student-proficiency-level-attainment-for-each-assessment-tool/${id_assessment}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit(
          "SET_STUDENT_PROFICIENCY_LEVEL_ATTAINMENT_FOR_EACH_ASSESSMENT_TOOL_ASSESSMENT",
          result.data.data
        );
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
          key: "student_proficiency_level_attainment_for_each_assessment_tool",
          value: false,
        });
      }
    },
    async GetPercentageOfStudentWithinEachProficiencyLevel(context, id_assessment) {
      context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
        key: "percentage_of_student_within_each_proficiency_level",
        value: true,
      });
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/percentage-of-student-within-each-proficiency-level/${id_assessment}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_PERCENTAGE_OF_STUDENT_WITHIN_EACH_PROFICIENCY_LEVEL_ASSESSMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
          key: "percentage_of_student_within_each_proficiency_level",
          value: false,
        });
      }
    },
    async GetAttainmentOfEachPerformanceIndicator(context, id_assessment) {
      context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
        key: "attainment_of_each_performance_indicator",
        value: true,
      });
      try {
        const result = await axios({
          url: `${apiUrl}/assessment/attainment-of-each-performance-indicator/${id_assessment}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_ATTAINMENT_OF_EACH_PERFORMANCE_INDICATOR_ASSESSMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DETAIL_ASSESSMENT", {
          key: "attainment_of_each_performance_indicator",
          value: false,
        });
      }
    },
  },
};

export default assessment;
