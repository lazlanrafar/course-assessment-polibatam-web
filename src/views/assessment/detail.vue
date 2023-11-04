<template>
  <layout-app>
    <ContentHeader header="Course" title="Course Assessment Detail" />

    <section class="content">
      <div class="container-fluid">
        <div class="row" v-if="report.course">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <TableCustom
                      :items="[
                        { label: 'Study Program', value: report.course.program_studi.title },
                        { label: 'Course Code', value: report.course.code },
                        { label: 'Course Title', value: report.course.title },
                        { label: 'Teacher NIP', value: report.teacher_nip },
                        { label: 'Teacher Name', value: report.teacher_name },
                      ]"
                    />
                  </div>
                  <div class="col-md-6">
                    <TableCustom
                      :items="[
                        { label: 'Semester', value: report.semester },
                        { label: 'Academic Year', value: report.academic_year },
                        { label: 'Class', value: report.class },
                        {
                          label: 'Proficiency Level',
                          value: `${report.proficiency_level.level} (${report.proficiency_level.description})`,
                        },
                      ]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <v-card :loading="isLoading" class="card shadow-none border">
              <div class="card-header fw-medium fs-15">Course Assessment</div>
              <div class="card-body">
                <div class="d-sm-flex gap-2">
                  <HandleImportMahasiswa />
                  <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalFormMahasiswa(true)">
                    <i class="fa fa-plus mr-2"></i>
                    Add Mahasiswa
                  </v-btn>
                </div>

                <br />
                <div class="d-flex justify-content-end">
                  <v-text-field
                    label="Cari..."
                    style="max-width: 300px"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    dense
                    v-model="search"
                  />
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered fs-12" v-if="report.course">
                    <thead>
                      <tr class="table-active fw-medium">
                        <td rowspan="3">NIM</td>
                        <td rowspan="3">Mahasiswa</td>
                        <td :colspan="report.course.total_quiz">Quizzes ({{ report.course.bobot_quiz }}%)</td>
                        <td :colspan="report.course.total_practice_or_project">
                          Practice or Project ({{ report.course.bobot_practice_or_project }}%)
                        </td>
                        <td :colspan="report.course.total_assignment">
                          Assignment ({{ report.course.bobot_assignment }}%)
                        </td>
                        <td :colspan="+report.course.total_mid_exam + +report.course.total_final_exam">
                          Exam ({{ +report.course.bobot_mid_exam + +report.course.bobot_final_exam }}%)
                        </td>
                        <td :colspan="report.course.total_presentation">
                          Presentation ({{ report.course.bobot_presentation }}%)
                        </td>
                        <td rowspan="3">Nilai Akhir</td>
                        <td rowspan="3">Nilai Huruf</td>
                        <td rowspan="3">Action</td>
                      </tr>
                      <tr class="table-active fw-medium">
                        <td v-for="i in report.course.total_quiz" :key="i">Q{{ i }}</td>
                        <td v-for="i in report.course.total_practice_or_project" :key="i">P{{ i }}</td>
                        <td v-for="i in report.course.total_assignment" :key="i">A{{ i }}</td>
                        <td v-if="report.course.total_mid_exam > 0">MSE</td>
                        <td v-if="report.course.total_final_exam > 0">FSE</td>
                        <td v-for="i in report.course.total_presentation" :key="i">PP{{ i }}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in mahasiswa" :key="i">
                        <td>{{ item.nim }}</td>
                        <td>{{ item.name }}</td>
                        <TableTdCustom v-for="(nQ, iQ) in report.course.total_quiz" :key="iQ" :value="item.quiz[iQ]" />
                        <TableTdCustom
                          v-for="(nP, iP) in report.course.total_practice_or_project"
                          :key="iP"
                          :value="item.practice_or_project[iP]"
                        />
                        <TableTdCustom
                          v-for="(nA, iA) in report.course.total_assignment"
                          :key="iA"
                          :value="item.assignment[iA]"
                        />
                        <TableTdCustom :value="item.mid_exam" />
                        <TableTdCustom :value="item.final_exam" />
                        <TableTdCustom
                          v-for="(nPP, iPP) in report.course.total_presentation"
                          :key="iPP"
                          :value="item.presentation[iPP]"
                        />
                        <td class="table-warning">{{ item.nilai_akhir }}</td>
                        <td :class="item.grade == 'E' ? 'table-danger' : 'table-success'">{{ item.grade }}</td>
                        <td>
                          <v-menu offset-y left>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn x-small class="btn btn-outline-primary py-3" v-bind="attrs" v-on="on">
                                <span class="fw-light mr-1">Action</span>
                                <i class="fa-solid fa-chevron-down"></i>
                              </v-btn>
                            </template>
                            <v-list min-width="150">
                              <v-list-item @click="handleUpdate(item.id)">
                                <v-list-item-title class="text-primary fs-12">
                                  <i class="fas fa-edit mr-2"></i>
                                  <span>Edit</span>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="handleDelete(item.id)">
                                <v-list-item-title class="text-primary fs-12">
                                  <i class="fas fa-trash mr-2"></i>
                                  <span>Delete</span>
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </v-card>
          </div>

          <div class="col-12" v-if="mahasiswa.length > 0">
            <PercentageOfStudentWithinEachCategory />
          </div>
          <div class="col-12" v-if="mahasiswa.length > 0">
            <StudentProficiencyLevelAttainmentForEachAssessmentTool />
          </div>
          <div class="col-12" v-if="mahasiswa.length > 0">
            <PercentageOfStudentWithinEachProficiencyLevel />
          </div>
          <div class="col-12" v-if="mahasiswa.length > 0">
            <AttainmentOfEachPerformanceIndicator />
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
import Swal from "sweetalert2";

export default {
  name: "AssessmentDetailPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    TableCustom: () => import("@/components/molecules/table-custom.vue"),
    TableTdCustom: () => import("@/components/atoms/table-td-custom.vue"),
    FormMahasiswa: () => import("./form-mahasiswa.vue"),
    HandleImportMahasiswa: () => import("./handle-import-mahasiswa.vue"),
    PercentageOfStudentWithinEachCategory: () =>
      import("@/components/organisms/percentage-of-student-within-each-category.vue"),
    StudentProficiencyLevelAttainmentForEachAssessmentTool: () =>
      import("@/components/organisms/student-proficiency-level-attainment-for-each-assessment-tool.vue"),
    PercentageOfStudentWithinEachProficiencyLevel: () =>
      import("@/components/organisms/percentage-of-student-within-each-proficiency-level.vue"),
    AttainmentOfEachPerformanceIndicator: () =>
      import("@/components/organisms/attainment-of-each-performance-indicator.vue"),
  },
  data() {
    return {
      modalFormMahasiswa: false,
      search: "",
      mahasiswa: [],
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
  watch: {
    search(value) {
      if (value) {
        this.mahasiswa = this.report.details.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase()) || item.nim.includes(value);
        });
      } else {
        this.mahasiswa = this.report.details;
      }
    },
    report(value) {
      if (value) {
        this.mahasiswa = value.details;
      }
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
    handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will delete this data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("DeleteAssessmentDetail", id).then((res) => {
            if (res) {
              this.$store.dispatch("GetAssessmentById", this.$route.params.id);
            }
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
