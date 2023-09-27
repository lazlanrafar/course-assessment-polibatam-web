<template>
  <layout-app>
    <ContentHeader header="Mata Kuliah" :title="report.title || 'Loading...'" />

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
              <div class="card-header fw-medium fs-15">Course Learning Outcomes (CLOs)</div>
              <div class="card-body">
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalFormCLO(true)">
                  <i class="fa fa-plus"></i>
                  Tambah CLO
                </v-btn>
                <div class="d-flex justify-content-end">
                  <v-text-field
                    label="Cari..."
                    style="max-width: 300px"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    dense
                    v-model="optionsTable.search"
                  />
                </div>
                <v-data-table
                  :headers="headers"
                  :items="report.course_learning_outcome || []"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                >
                  <template v-slot:[`item.rubrik`]="{ item }">
                    <v-chip v-for="(rubrik, i) in item.details" :key="i" small color="primary" class="mr-3">
                      {{ rubrik.rubrik.label }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn icon color="white" class="bg-warning mr-2" @click="handleUpdate(item.id)">
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="white" class="bg-danger" @click="handleDelete(item.id)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
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
      optionsTable: {
        page: 1,
        itemsPerPage: -1,
        search: "",
      },
      headers: [
        { text: "Code", value: "code" },
        { text: "Course Learning Outcomes (CLOs)", value: "title" },
        { text: "Assessment Method", value: "assessment_method.title" },
        { text: "Support Level for each SO and CDIO Syllabus", value: "rubrik" },
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
  },
  mounted() {
    this.$store.dispatch("GetCourseById", this.$route.params.id);
  },
};
</script>
