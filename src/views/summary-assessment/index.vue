<template>
  <layout-app>
    <ContentHeader header="Main" title="Summary Assessment" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
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
                  :items="reports"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <!-- right aligned menu -->
                    <v-btn small class="btn btn-outline-primary py-4" @click="handleDetail(item.id)">
                      <i class="fa-solid fa-eye"></i>
                      <div class="m-1"></div>
                      <span class="fw-light">Detail</span>
                    </v-btn>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout-app>
</template>

<script>
export default {
  name: "SummaryAssessmentPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
  },
  data() {
    return {
      headers: [
        { text: "Course Code", value: "course.code" },
        { text: "Course Name", value: "course.title" },
        { text: "Teacher", value: "teacher_name" },
        { text: "Academic Year", value: "academic_year" },
        { text: "Semester", value: "semester" },
        { text: "Class", value: "class" },
        { text: "Target", value: "proficiency_level.level" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.assessment.isLoading;
    },
    reports() {
      return this.$store.state.assessment.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.assessment.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_ASSESSMENT", value);
      },
    },
  },
  methods: {
    handleDetail(id) {
      this.$router.push(`/summary-assessment/${id}`);
    },
  },
  mounted() {
    this.$store.dispatch("GetAssessment");
  },
};
</script>
