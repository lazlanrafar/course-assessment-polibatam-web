<template>
  <layout-app>
    <ContentHeader header="Setup" title="Grading Category" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <v-data-table
                  :headers="headers"
                  :items="reports"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                />
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
  name: "GradingCategoryPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
  },
  data() {
    return {
      headers: [
        { text: "Grading Category", value: "grading_category.title" },
        { text: "Lower Limit", value: "lower_limit" },
        { text: "Upper Limit", value: "upper_limit" },
        { text: "Grade", value: "grade" },
      ],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.gradingCategory.isLoading;
    },
    reports() {
      return this.$store.state.gradingCategory.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.gradingCategory.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_GRADING_CATEGORY", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateGradingCategory", id);
      this.$store.commit("SET_IS_UPDATE_GRADING_CATEGORY", id);
      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("GetGradingCategory");
  },
};
</script>
