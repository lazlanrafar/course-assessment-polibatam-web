<template>
  <layout-app>
    <ContentHeader header="Setup" title="Student Outcome" />

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
                    v-model="search"
                  />
                </div>
                <v-data-table
                  :headers="headers"
                  :items="reports"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="search"
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
  </layout-app>
</template>

<script>
export default {
  name: "ProgramStudiPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "Jurusan", value: "jurusan.title" },
        { text: "Program Studi", value: "title" },
        { text: "Total Student Outcome", value: "_count.student_outcome" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      search: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.programStudi.isLoading;
    },
    reports() {
      return this.$store.state.programStudi.reports;
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
      this.$router.push(`/student-outcome/${id}`);
    },
  },
  mounted() {
    this.$store.dispatch("GetProgramStudi");
  },
};
</script>
