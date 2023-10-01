<template>
  <layout-app>
    <ContentHeader header="Course" title="Course Assessment Plan" />

    <section class="content">
      <div class="container-fluid">
        <div class="row" v-if="report.title">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <TableCustom
                  :items="[
                    { label: 'Code', value: report.code },
                    { label: 'Nama Mata Kuliah', value: report.title },
                    { label: 'SKS', value: report.sks },
                    { label: 'Program Studi', value: report.program_studi.title },
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
              <div class="card-header fw-medium fs-15">Course Assessment Plan</div>
              <div class="card-body">
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalFormCLO(true)">
                  <i class="fa fa-clock-o mr-2"></i>
                  Generate Assessment Plan
                </v-btn>
                <br />
                <br />
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="fs-12" v-for="(item, i) in headers" :key="i">
                          {{ item.text }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in []" :key="i">
                        <td>name</td>
                        <td>name</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <v-dialog v-if="modalFormCLO" v-model="modalFormCLO" persistent max-width="600">
      <FormCLO @handleModalFormCLO="handleModalFormCLO" />
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
    FormCLO: () => import("./form-course-learning-outcome.vue"),
  },
  data() {
    return {
      optionsTable: {
        page: 1,
        itemsPerPage: -1,
        search: "",
      },
      headers: [
        { text: "SO-PI", value: "code" },
        { text: "Week 1", value: "code" },
        { text: "Week 2", value: "code" },
        { text: "Week 3", value: "code" },
        { text: "Week 4", value: "code" },
        { text: "Week 5", value: "code" },
        { text: "Week 6", value: "code" },
        { text: "Week 7", value: "code" },
        { text: "Mid-Sem", value: "code" },
        { text: "Week 8", value: "code" },
        { text: "Week 9", value: "code" },
        { text: "Week 10", value: "code" },
        { text: "Week 11", value: "code" },
        { text: "Week 12", value: "code" },
        { text: "Week 13", value: "code" },
        { text: "Week 14", value: "code" },
        { text: "Final-Sem", value: "code" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalFormCLO: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    report() {
      return this.$store.state.course.report;
    },
  },
  methods: {
    handleModalFormCLO(value) {
      if (value) {
        this.$store.commit("SET_FORM_COURSE_CLO", {
          key: "id_course",
          value: this.$route.params.id,
        });

        this.$store.dispatch("FetchBeforeFormCourseLearningOutcome", this.$route.params.id);
      }
      this.modalFormCLO = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateCourseLearningOutcome", id);
      this.$store.commit("SET_IS_UPDATE_COURSE_CLO", id);

      this.handleModalFormCLO(true);
    },
    handleDelete(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan menghapus data ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Tidak, batalkan!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("DeleteCourseLearningOutcome", {
            id,
            id_course: this.$route.params.id,
          });
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetCourseById", this.$route.params.id);
  },
};
</script>
