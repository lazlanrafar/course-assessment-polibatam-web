<template>
  <layout-app>
    <ContentHeader header="Main" title="Mata Kuliah" />

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
                    <v-btn icon color="white" class="bg-warning mr-2" @click="handleUpdate(item.id)">
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

    <v-dialog v-model="modalForm" persistent max-width="800">
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
  </layout-app>
</template>

<script>
export default {
  name: "MataKuliahPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Form: () => import("./form.vue"),
  },
  data() {
    return {
      headers: [
        { text: "Code", value: "code" },
        { text: "Description", value: "title" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.studentOutcome.isLoading;
    },
    reports() {
      return this.$store.state.studentOutcome.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.studentOutcome.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_STUDENT_OUTCOME", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("FetchBeforeFormCourse");
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateStudentOutcome", id);
      this.$store.commit("SET_IS_UPDATE_STUDENT_OUTCOME", id);
      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("GetStudentOutcome");
  },
};
</script>
