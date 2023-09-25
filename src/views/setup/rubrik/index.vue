<template>
  <layout-app>
    <ContentHeader header="Setup" title="Rubrik" />

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
                  :items="reports_program_studi"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn icon color="white" class="bg-primary mr-2" @click="handleDetail(item.id)">
                      <v-icon small>mdi-eye</v-icon>
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
  name: "RubrikPage",
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
        { text: "Total Rubrik", value: "_count.rubrik" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.rubrik.isLoading;
    },
    reports_program_studi() {
      return this.$store.state.rubrik.reports_program_studi;
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
    handleDetail(id) {
      this.$router.push(`/rubrik/${id}`);
    },
  },
  mounted() {
    this.$store.dispatch("GetProgramStudiRubrik");
  },
};
</script>
