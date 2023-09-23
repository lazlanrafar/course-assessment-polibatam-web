<template>
  <layout-app>
    <ContentHeader header="Mata Kuliah" :title="report.title" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
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
              <div class="card-header fw-medium fs-15">Course Learning Outcomes (CLOs)</div>
              <div class="card-body">
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalFormCLO(true)">
                  <i class="fa fa-plus"></i>
                  Tambah CLO
                </v-btn>
                <div class="d-flex justify-content-end">
                  <v-text-field label="Cari..." style="max-width: 300px" prepend-inner-icon="mdi-magnify" outlined dense />
                </div>
                <v-data-table :headers="headers" :items="[]"> </v-data-table>
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
      headers: [
        { text: "No", value: "no" },
        { text: "Course Learning Outcomes (CLOs)", value: "title" },
        { text: "Assessment Method", value: "program_studi" },
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
      if (value) this.$store.dispatch("FetchBeforeFormCourseCLO");
      this.modalFormCLO = value;
    },
  },
  mounted() {
    this.$store.dispatch("GetCourseById", this.$route.params.id);
  },
};
</script>
