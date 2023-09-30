<template>
  <v-card :loading="isLoading">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="card-title fw-medium">Course Performance Indicator</h3>

        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <TableCustom
        :items="[
          { label: 'Code', value: report.code },
          { label: 'Nama Mata Kuliah', value: report.title },
          { label: 'SKS', value: report.sks },
          { label: 'Program Studi', value: report.program_studi.title },
          { label: 'Proficiency Level', value: report.target_level },
        ]"
      />
      <br />
      <div class="card shadow-none border">
        <div class="card-body">
          <v-data-table
            :headers="headers"
            :items="report.performance_indicator || []"
            :loading="isLoading"
            :options.sync="optionsTable"
            :search="optionsTable.search"
            hide-default-footer
          >
          </v-data-table>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CourseDetail",
  components: {
    TableCustom: () => import("@/components/molecules/table-custom.vue"),
  },
  data() {
    return {
      optionsTable: {
        page: 1,
        itemsPerPage: -1,
        search: "",
      },
      headers: [
        { text: "Student Outcome", value: "student_outcome" },
        { text: "Performance Indicator", value: "label" },
        { text: "CDIO Syllabus", value: "cdio_syllabus", align: "center" },
      ],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    report() {
      return this.$store.state.course.performance_indicator;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalPI", false);
    },
  },
};
</script>
