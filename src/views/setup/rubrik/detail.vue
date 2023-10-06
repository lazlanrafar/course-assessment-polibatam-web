<template>
  <layout-app>
    <ContentHeader header="Setup Rubrik" :title="program_studi?.title" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <div class="d-flex gap-3">
                  <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalForm(true)">
                    <i class="fa fa-plus"></i>
                    Tambah Rubrik
                  </v-btn>
                  <!-- <HandleImportRubrik /> -->
                </div>
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
                  group-by="student_outcome.code"
                >
                  <template v-slot:[`item.desc_level_1`]="{ item }">
                    <span style="font-size: 0.8rem">
                      {{ item.desc_level_1 }}
                    </span>
                  </template>
                  <template v-slot:[`item.desc_level_2`]="{ item }">
                    <span style="font-size: 0.8rem">
                      {{ item.desc_level_2 }}
                    </span>
                  </template>
                  <template v-slot:[`item.desc_level_3`]="{ item }">
                    <span style="font-size: 0.8rem">
                      {{ item.desc_level_3 }}
                    </span>
                  </template>
                  <template v-slot:[`item.desc_level_4`]="{ item }">
                    <span style="font-size: 0.8rem">
                      {{ item.desc_level_4 }}
                    </span>
                  </template>
                  <template v-slot:[`item.desc_level_5`]="{ item }">
                    <span style="font-size: 0.8rem">
                      {{ item.desc_level_5 }}
                    </span>
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

    <v-dialog v-model="modalForm" persistent max-width="600">
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
  </layout-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "CDIOSyllabusPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Form: () => import("./form.vue"),
    // HandleImportRubrik: () => import("./handle-import-rubrik.vue"),
  },
  data() {
    return {
      headers: [
        { text: "Student Outcome", value: "student_outcome.code" },
        { text: "CDIO Syllabus", value: "cdio_syllabus.level" },
        { text: "Performance Code", value: "code" },
        { text: "Performance Indicators", value: "title" },
        // { text: "Performance Indicators", value: "label" },
        // { text: "Proficiency Level 1", value: "desc_level_1" },
        // { text: "Proficiency Level 2", value: "desc_level_2" },
        // { text: "Proficiency Level 3", value: "desc_level_3" },
        // { text: "Proficiency Level 4", value: "desc_level_4" },
        // { text: "Proficiency Level 5", value: "desc_level_5" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.rubrik.isLoading;
    },
    program_studi() {
      return this.$store.state.rubrik.program_studi;
    },
    reports() {
      return this.$store.state.rubrik.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.rubrik.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_RUBRIK", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) {
        this.$store.dispatch("FetchBeforeFormRubrik");

        this.$store.commit("SET_FORM_RUBRIK", {
          key: "id_program_studi",
          value: this.$route.params.id,
        });
      }
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateRubrik", id);
      this.$store.commit("SET_IS_UPDATE_RUBRIK", id);
      this.handleModalForm(true);
    },
    handleDelete(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus ini!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("DeleteRubrik", {
            id: id,
            id_program_studi: this.$route.params.id,
          });
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetProgramStudiRubrik", this.$route.params.id);
    this.$store.dispatch("GetRubrik", this.$route.params.id);
  },
};
</script>
