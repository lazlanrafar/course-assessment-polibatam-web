<template>
  <layout-app>
    <ContentHeader header="Main" title="Assessment" />

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

    <v-dialog v-model="modalForm" persistent max-width="600">
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
  </layout-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "AssessmentPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Form: () => import("./form.vue"),
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
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormAssessment");
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateAssessment", id);
      this.$store.commit("SET_IS_UPDATE_ASSESSMENT", id);
      this.handleModalForm(true);
    },
    handleDetail(id) {
      this.$router.push(`/assessment/${id}`);
    },
    handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("DeleteAssessment", id);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetAssessment");
  },
};
</script>
