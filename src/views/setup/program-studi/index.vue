<template>
  <layout-app>
    <ContentHeader header="Setup" title="Program Studi" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <v-btn
                  class="btn bg-navy mb-3 mb-md-0"
                  @click="handleModalForm(true)"
                  v-if="isAdmin"
                >
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
                    <v-btn
                      icon
                      color="white"
                      class="bg-warning mr-2"
                      @click="handleUpdate(item.id)"
                    >
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <!-- <v-btn icon color="white" class="bg-danger" @click="handleDelete(item.id)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn> -->
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
  name: "ProgramStudiPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Form: () => import("./form.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "Jurusan", value: "jurusan.title" },
        { text: "Program Studi", value: "title" },
        { text: "SO", value: "_count.student_outcome" },
        { text: "Rubric", value: "_count.rubrik" },
        { text: "Course", value: "_count.course" },
        // { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.programStudi.isLoading;
    },
    reports() {
      return this.$store.state.programStudi.reports;
    },
    isAdmin() {
      return this.$store.state.app.user.is_admin;
    },
    optionsTable: {
      get() {
        return this.$store.state.programStudi.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_PROGRAM_STUDI", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormProgramStudi");
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateProgramStudi", id);
      this.$store.commit("SET_IS_UPDATE_PROGRAM_STUDI", id);
      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("GetProgramStudi");

    if (this.isAdmin) {
      this.headers.push({
        text: "Action",
        value: "action",
        align: "right",
        sortable: false,
      });
    }
  },
};
</script>
