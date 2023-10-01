<template>
  <layout-app>
    <ContentHeader header="Setup" title="Assessment Type" />

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
  name: "AssessmentTypePage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "no" },
        { text: "Code", value: "code" },
        { text: "Assessment Type", value: "title" },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.assessmentType.isLoading;
    },
    reports() {
      return this.$store.state.assessmentType.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.assessmentType.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_ASSESSMENT_TYPE", value);
      },
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("GetAssessmentType");
  },
};
</script>
