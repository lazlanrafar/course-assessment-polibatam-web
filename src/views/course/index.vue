<template>
  <layout-app>
    <ContentHeader header="Main" title="Course Learning Outcomes (CLOs)" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalForm(true)">
                  <i class="fa fa-plus"></i>
                  Tambah
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
                  :items="reports"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <!-- right aligned menu -->
                    <v-menu offset-y left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn small class="btn btn-outline-primary py-4" v-bind="attrs" v-on="on">
                          <span class="fw-light mr-1">Action</span>
                          <i class="fa-solid fa-chevron-down"></i>
                        </v-btn>
                      </template>
                      <v-list min-width="150">
                        <v-list-item @click="handleModalPI(true, item.id)">
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-eye mr-1"></i>
                            <span> Performance Indicator </span>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="handleCourseLearningOutcome(item.id)">
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-book mr-2"></i>
                            <span>Course Learning Outcomes</span>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="handleUpdate(item.id)">
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-edit mr-2"></i>
                            <span>Edit</span>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <v-dialog v-if="modalForm" v-model="modalForm" persistent max-width="800">
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
    <v-dialog v-if="modalPI" v-model="modalPI" persistent max-width="1200">
      <PerformanceIndicator @handleModalPI="handleModalPI" />
    </v-dialog>
  </layout-app>
</template>

<script>
export default {
  name: "CoursePage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Form: () => import("./form.vue"),
    PerformanceIndicator: () => import("./performance-indicator.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "Code", value: "code" },
        { text: "Name", value: "title" },
        { text: "Program Studi", value: "program_studi.title" },
        { text: "SKS", value: "sks" },
        { text: "Target Level", value: "target_level" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
      modalPI: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    reports() {
      return this.$store.state.course.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.course.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_COURSE", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormCourse");
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateCourse", id);
      this.$store.commit("SET_IS_UPDATE_COURSE", id);
      this.handleModalForm(true);
    },
    handleCourseLearningOutcome(id) {
      this.$router.push(`/course/${id}`);
    },
    handleModalPI(value, id) {
      if (value) this.$store.dispatch("GetCoursePerformanceIndicatorById", id);
      this.modalPI = value;
    },
  },
  mounted() {
    this.$store.dispatch("GetCourse");
  },
};
</script>
