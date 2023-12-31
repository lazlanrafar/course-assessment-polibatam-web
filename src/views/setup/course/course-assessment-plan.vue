<template>
  <layout-app>
    <ContentHeader header="Course" title="Course Assessment Plan" />

    <section class="content">
      <div class="container-fluid">
        <div class="row" v-if="report.title">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <v-chip
                  :color="report.is_ready ? 'success' : 'error'"
                  text-color="white"
                  small
                  class="text-capitalize"
                >
                  {{
                    report.is_ready ? "Course is Ready" : "Course is Not Ready"
                  }}
                </v-chip>
                <br />
                <br />
                <TableCustom
                  :items="[
                    { label: 'Code', value: report.code },
                    { label: 'Nama Mata Kuliah', value: report.title },
                    { label: 'SKS', value: report.sks },
                    {
                      label: 'Program Studi',
                      value: report.program_studi.title,
                    },
                    {
                      label: 'Aspek Penilaian',
                      value: `Assignment (${report.bobot_assignment}%), Quizzes (${report.bobot_quiz}%), Mid-semester Exam (${report.bobot_mid_exam}%), Final-semester Exam (${report.bobot_final_exam}%), Practice / Project (${report.bobot_practice_or_project}%), Project Presentation (${report.bobot_presentation}%)`,
                    },
                  ]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-header fw-medium fs-15">
                Course Assessment Plan
              </div>
              <div class="card-body">
                <div
                  class="d-sm-flex justify-content-between gap-2"
                  v-if="isAdmin"
                >
                  <div class="d-sm-flex gap-2">
                    <v-btn
                      class="btn bg-navy mb-3 mb-md-0"
                      @click="handleGenerate()"
                    >
                      <i class="fa fa-clock-o mr-2"></i>
                      Generate Assessment Plan
                    </v-btn>
                    <v-btn
                      class="btn bg-navy mb-3 mb-md-0"
                      @click="handleModalFormAssessmentPlanTotal(true)"
                    >
                      <i class="fa fa-clock-o mr-2"></i>
                      Total Type
                    </v-btn>
                  </div>
                  <v-btn
                    class="btn bg-navy mb-3 mb-md-0"
                    @click="handleReadyCourse()"
                    v-if="!report.is_ready"
                  >
                    <i class="fa fa-check mr-2"></i>
                    Set Ready
                  </v-btn>
                </div>
                <br />
                <br />
                <div class="table-responsive">
                  <table class="table table-bordered fs-12">
                    <thead>
                      <tr>
                        <th
                          class="fw-medium"
                          v-for="(item, i) in headers"
                          :key="i"
                          :style="`min-width : ${item.width}`"
                        >
                          {{ item.text }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in reports_assessment_plan" :key="i">
                        <td>{{ item.so_pi }}</td>
                        <td>{{ item.week_1 }}</td>
                        <td>{{ item.week_2 }}</td>
                        <td>{{ item.week_3 }}</td>
                        <td>{{ item.week_4 }}</td>
                        <td>{{ item.week_5 }}</td>
                        <td>{{ item.week_6 }}</td>
                        <td>{{ item.week_7 }}</td>
                        <td>{{ item.mid_sem }}</td>
                        <td>{{ item.week_8 }}</td>
                        <td>{{ item.week_9 }}</td>
                        <td>{{ item.week_10 }}</td>
                        <td>{{ item.week_11 }}</td>
                        <td>{{ item.week_12 }}</td>
                        <td>{{ item.week_13 }}</td>
                        <td>{{ item.week_14 }}</td>
                        <td>{{ item.final_sem }}</td>
                        <td>
                          <v-btn
                            icon
                            small
                            color="white"
                            class="bg-warning mr-2"
                            @click="handleUpdate(item.id)"
                            v-if="isAdmin"
                          >
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

    <v-dialog
      v-if="modalFormAssessmentPlan"
      v-model="modalFormAssessmentPlan"
      persistent
      max-width="800"
    >
      <FormAssessmentPlan
        @handleModalFormAssessmentPlan="handleModalFormAssessmentPlan"
      />
    </v-dialog>
    <v-dialog
      v-if="modalFormAssessmentPlanTotal"
      v-model="modalFormAssessmentPlanTotal"
      persistent
      max-width="800"
    >
      <FormAssessmentPlanTotal
        @handleModalFormAssessmentPlanTotal="handleModalFormAssessmentPlanTotal"
      />
    </v-dialog>
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
    FormAssessmentPlan: () => import("./form-course-assessment-plan.vue"),
    FormAssessmentPlanTotal: () =>
      import("./form-course-assessment-plan-total.vue"),
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
      return this.$store.state.course.isLoading;
    },
    report() {
      return this.$store.state.course.report;
    },
    reports_assessment_plan() {
      return this.$store.state.course.reports_assessment_plan;
    },
    isAdmin() {
      return this.$store.state.app.user.is_admin;
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
          this.$store.dispatch(
            "GenerateCourseAssessmentPlan",
            this.$route.params.id
          );
        }
      });
    },
    handleModalFormAssessmentPlan(value) {
      if (value)
        this.$store.dispatch(
          "FetchBeforeFormCourseAssessmentPlan",
          this.$route.params.id
        );
      this.modalFormAssessmentPlan = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateCourseAssessmentPlan", id);
      this.$store.commit("SET_IS_UPDATE_COURSE_ASSESSMENT_PLAN", id);

      this.handleModalFormAssessmentPlan(true);
    },
    handleModalFormAssessmentPlanTotal(value) {
      if (value) {
        this.$store.dispatch(
          "SetFormUpdateCourseAssessmentTotal",
          this.$route.params.id
        );
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
          this.$store
            .dispatch("UpdateCourseIsReady", this.$route.params.id)
            .then(() => {
              this.$store.dispatch("GetCourseById", this.$route.params.id);
            });
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetCourseById", this.$route.params.id);
    this.$store.dispatch(
      "GetCourseAssessmentPlanByIdCourse",
      this.$route.params.id
    );
  },
};
</script>
