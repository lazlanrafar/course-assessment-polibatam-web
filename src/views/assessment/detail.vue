<template>
  <layout-app>
    <ContentHeader header="Course" title="Course Assessment Detail" />

    <section class="content">
      <div class="container-fluid">
        <div class="row" v-if="report">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <TableCustom
                  :items="[
                    { label: 'Study Program', value: report.course.program_studi.title },
                    { label: 'Course Code', value: report.course.code },
                    { label: 'Course Title', value: report.course.title },
                    { label: 'Semester', value: report.semester },
                    { label: 'Academic Year', value: report.academic_year },
                    { label: 'Class', value: report.class },
                  ]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-header fw-medium fs-15">Course Assessment</div>
              <div class="card-body">
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleReadyCourse()">
                  <i class="fa fa-plus mr-2"></i>
                  Add Mahasiswa
                </v-btn>

                <br />
                <br />
                <div class="table-responsive">
                  <table class="table table-bordered fs-12">
                    <thead>
                      <tr>
                        <td rowspan="3">No</td>
                        <td rowspan="3">NIM</td>
                        <td rowspan="3">Mahasiswa</td>
                        <td :colspan="report.course.total_quiz">Quizzes ({{ report.course.bobot_quiz }}%)</td>
                        <td :colspan="report.course.total_practice_or_project">
                          Practice or Project ({{ report.course.bobot_practice_or_project }}%)
                        </td>
                        <td :colspan="report.course.total_assignment">Assignment ({{ report.course.bobot_assignment }}%)</td>
                        <td colspan="2">Exam ({{ +report.course.bobot_mid_exam + +report.course.bobot_final_exam }}%)</td>
                        <td :colspan="report.course.total_presentation">
                          Presentation ({{ report.course.bobot_presentation }}%)
                        </td>
                        <td rowspan="3">Nilai Akhir</td>
                        <td rowspan="3">Action</td>
                      </tr>
                      <tr>
                        <td v-for="i in report.course.total_quiz" :key="i">Q{{ i }}</td>
                        <td v-for="i in report.course.total_practice_or_project" :key="i">P{{ i }}</td>
                        <td v-for="i in report.course.total_assignment" :key="i">A{{ i }}</td>
                        <td>MSE</td>
                        <td>FSE</td>
                        <td v-for="i in report.course.total_presentation" :key="i">PP{{ i }}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in report.details" :key="i">
                        <td>{{ item.so_pi }}</td>
                        <td>
                          <v-btn icon small color="white" class="bg-warning mr-2" @click="handleUpdate(item.id)">
                            <v-icon small>mdi-pencil</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <v-dialog v-if="modalFormAssessmentPlan" v-model="modalFormAssessmentPlan" persistent max-width="800">
      <FormAssessmentPlan @handleModalFormAssessmentPlan="handleModalFormAssessmentPlan" />
    </v-dialog>
    <v-dialog v-if="modalFormAssessmentPlanTotal" v-model="modalFormAssessmentPlanTotal" persistent max-width="800">
      <FormAssessmentPlanTotal @handleModalFormAssessmentPlanTotal="handleModalFormAssessmentPlanTotal" />
    </v-dialog> -->
  </layout-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CourseDetailPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    TableCustom: () => import("@/components/molecules/table-custom.vue"),
    // FormAssessmentPlan: () => import("./form-course-assessment-plan.vue"),
    // FormAssessmentPlanTotal: () => import("./form-course-assessment-plan-total.vue"),
  },
  data() {
    return {
      optionsTable: {
        page: 1,
        itemsPerPage: -1,
        search: "",
      },
      headers: [
        { text: "SO-PI", width: "80px" },
        { text: "W1" },
        { text: "W2" },
        { text: "W3" },
        { text: "W4" },
        { text: "W5" },
        { text: "W6" },
        { text: "W7" },
        { text: "Mid-Sem", width: "100px" },
        { text: "W8" },
        { text: "W9" },
        { text: "W10" },
        { text: "W11" },
        { text: "W12" },
        { text: "W13" },
        { text: "W14" },
        { text: "Final-Sem", width: "100px" },
        { text: "Action" },
      ],
      modalFormAssessmentPlan: false,
      modalFormAssessmentPlanTotal: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.assessment.isLoading;
    },
    report() {
      return this.$store.state.assessment.report;
    },
    reports_assessment_plan() {
      return this.$store.state.course.reports_assessment_plan;
    },
  },
  methods: {
    handleGenerate() {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan generate Assessment Plan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Generate!",
        cancelButtonText: "Tidak, batalkan!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("GenerateCourseAssessmentPlan", this.$route.params.id);
        }
      });
    },
    handleModalFormAssessmentPlan(value) {
      if (value) this.$store.dispatch("FetchBeforeFormCourseAssessmentPlan", this.$route.params.id);
      this.modalFormAssessmentPlan = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateCourseAssessmentPlan", id);
      this.$store.commit("SET_IS_UPDATE_COURSE_ASSESSMENT_PLAN", id);

      this.handleModalFormAssessmentPlan(true);
    },
    handleModalFormAssessmentPlanTotal(value) {
      if (value) {
        this.$store.dispatch("SetFormUpdateCourseAssessmentTotal", this.$route.params.id);
        this.$store.commit("SET_IS_UPDATE_COURSE", this.$route.params.id);
      }
      this.modalFormAssessmentPlanTotal = value;
    },
    handleReadyCourse() {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan menyelesaikan Course!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Selesaikan!",
        cancelButtonText: "Tidak, batalkan!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("UpdateCourseIsReady", this.$route.params.id).then(() => {
            this.$store.dispatch("GetCourseById", this.$route.params.id);
          });
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetAssessmentById", this.$route.params.id);
  },
};
</script>
