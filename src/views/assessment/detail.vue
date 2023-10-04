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
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalFormMahasiswa(true)">
                  <i class="fa fa-plus mr-2"></i>
                  Add Mahasiswa
                </v-btn>

                <br />
                <br />
                <div class="table-responsive">
                  <table class="table table-bordered fs-12">
                    <thead>
                      <tr>
                        <td rowspan="3">NIM</td>
                        <td rowspan="3">Mahasiswa</td>
                        <td :colspan="report.course.total_quiz">Quizzes ({{ report.course.bobot_quiz }}%)</td>
                        <td :colspan="report.course.total_practice_or_project">
                          Practice or Project ({{ report.course.bobot_practice_or_project }}%)
                        </td>
                        <td :colspan="report.course.total_assignment">Assignment ({{ report.course.bobot_assignment }}%)</td>
                        <td :colspan="+report.course.total_mid_exam + +report.course.total_final_exam">
                          Exam ({{ +report.course.bobot_mid_exam + +report.course.bobot_final_exam }}%)
                        </td>
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
                        <td v-if="report.course.total_mid_exam > 0">MSE</td>
                        <td v-if="report.course.total_final_exam > 0">FSE</td>
                        <td v-for="i in report.course.total_presentation" :key="i">PP{{ i }}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in report.details" :key="i">
                        <td>{{ item.nim }}</td>
                        <td>{{ item.name }}</td>
                        <td v-for="(nQ, iQ) in report.course.total_quiz" :key="iQ">{{ item.quiz[iQ] }}</td>
                        <td v-for="(nP, iP) in report.course.total_practice_or_project" :key="iP">
                          {{ item.practice_or_project[iP] }}
                        </td>
                        <td v-for="(nA, iA) in report.course.total_assignment" :key="iA">
                          {{ item.assignment[iA] }}
                        </td>
                        <td>{{ item.mid_exam }}</td>
                        <td>{{ item.final_exam }}</td>
                        <td v-for="(nPP, iPP) in report.course.total_presentation" :key="iPP">
                          {{ item.presentation[iPP] }}
                        </td>
                        <td>{{ item.nilai_akhir }}</td>
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

    <v-dialog v-if="modalFormMahasiswa" v-model="modalFormMahasiswa" persistent max-width="800">
      <FormMahasiswa @handleModalFormMahasiswa="handleModalFormMahasiswa" />
    </v-dialog>
  </layout-app>
</template>

<script>
// import Swal from "sweetalert2";

export default {
  name: "AssessmentDetailPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    TableCustom: () => import("@/components/molecules/table-custom.vue"),
    FormMahasiswa: () => import("./form-mahasiswa.vue"),
  },
  data() {
    return {
      modalFormMahasiswa: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.assessment.isLoading;
    },
    report() {
      return this.$store.state.assessment.report;
    },
  },
  methods: {
    handleModalFormMahasiswa(value) {
      if (value) {
        this.$store.dispatch("GetAssessmentById", this.$route.params.id);

        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "id_assessment",
          value: this.$route.params.id,
        });
      }
      this.modalFormMahasiswa = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateAssessmentDetail", id);
      this.$store.commit("SET_IS_UPDATE_MAHASISWA_ASSESSMENT", id);

      this.handleModalFormMahasiswa(true);
    },
  },
  mounted() {
    this.$store.dispatch("GetAssessmentById", this.$route.params.id);
  },
};
</script>
