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
                    <v-menu offset-y left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn small class="btn btn-outline-primary py-4" v-bind="attrs" v-on="on">
                          <span class="fw-light mr-1">Action</span>
                          <i class="fa-solid fa-chevron-down"></i>
                        </v-btn>
                      </template>
                      <v-list min-width="150">
                        <v-list-item @click="handleDetail(item.id)">
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-eye mr-2"></i>
                            <span>Detail</span>
                          </v-list-item-title>
                        </v-list-item>
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
      this.$router.push(`/assessment/${id}`);
    },
  },
  mounted() {
    this.$store.dispatch("GetAssessment");
  },
};
</script>
