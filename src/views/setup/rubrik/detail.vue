<template>
  <layout-app>
    <ContentHeader header="Setup Rubrik" :title="reports.program_studi.title" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalForm(true)">
                  <i class="fa fa-plus"></i>
                  Tambah Rubrik
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
                  :items="reports.data"
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
export default {
  name: "CDIOSyllabusPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Form: () => import("./form.vue"),
  },
  data() {
    return {
      headers: [
        { text: "Student Outcome", value: "student_outcome.code" },
        { text: "CDIO Syllabus", value: "cdio_syllabus.level" },
        { text: "Performance Indicators", value: "label" },
        { text: "Level 1", value: "desc_level_1" },
        { text: "Level 2", value: "desc_level_2" },
        { text: "Level 3", value: "desc_level_3" },
        { text: "Level 4", value: "desc_level_4" },
        { text: "Level 5", value: "desc_level_5" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.rubrik.isLoading;
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
      this.$store.dispatch("SetFormUpdateCDIOSyllabus", id);
      this.$store.commit("SET_IS_UPDATE_CDIO_SYLLABUS", id);
      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("GetRubrikByIdProgramStudi", this.$route.params.id);
  },
};
</script>
