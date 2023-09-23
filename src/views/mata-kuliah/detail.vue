<template>
  <layout-app>
    <ContentHeader header="Mata Kuliah" :title="report.title" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <TableCustom
                  :items="[
                    { label: 'Code', value: report.code },
                    { label: 'Nama Mata Kuliah', value: report.title },
                    { label: 'SKS', value: report.sks },
                    { label: 'Program Studi', value: report.program_studi.title },
                    {
                      label: 'Aspek Penilaian',
                      value: `Assignment (${report.bobot_assignment}%), Quizzes (${report.bobot_quiz}%), Mid-semester Exam (${report.bobot_mid_exam}%), Final-semester Exam (${report.bobot_final_exam}%), Practice / Project (${report.bobot_practice_or_project}%), Project Presentation (${report.bobot_presentation}%)`,
                    },
                  ]"
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
  name: "CourseDetailPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    TableCustom: () => import("@/components/molecules/table-custom.vue"),
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    report() {
      return this.$store.state.course.report;
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("GetCourseById", this.$route.params.id);
  },
};
</script>
