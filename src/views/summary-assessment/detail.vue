<template>
  <layout-app>
    <ContentHeader header="Main" title="Summary Assessment Detail" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <SummaryOfCourseAssessmentResults />
          </div>
        </div>
      </div>
    </section>
  </layout-app>
</template>

<script>
export default {
  name: "SummaryAssessmentDetailPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    SummaryOfCourseAssessmentResults: () => import("@/components/organisms/summary-of-course-assessment-results.vue"),
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.assessment.isLoading;
    },
  },
  methods: {},
  mounted() {},
};
</script>
