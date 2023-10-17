<template>
  <v-card :loading="isLoading" class="card shadow-none border">
    <div class="card-header fw-medium">Summary of Course Assessment Results</div>

    <div class="card-body">
      <div class="table-responsive" v-if="summary_of_course_assessment_results.category">
        <table class="table table-bordered fs-12">
          <thead class="table-success">
            <tr>
              <th>Category</th>
              <th v-for="(item, i) in summary_of_course_assessment_results.category[0].data" :key="i">
                {{ item.so_pi }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in summary_of_course_assessment_results.category" :key="i">
              <td>{{ item.title }}</td>
              <td v-for="(subItem, j) in item.data" :key="j">{{ subItem.average }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-responsive" v-if="summary_of_course_assessment_results.proficiency_level">
        <table class="table table-bordered fs-12">
          <thead class="table-primary">
            <tr>
              <th>Proficiency Level</th>
              <th v-for="(item, i) in summary_of_course_assessment_results.proficiency_level[0].data" :key="i">
                {{ item.so_pi }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in summary_of_course_assessment_results.proficiency_level" :key="i">
              <td>{{ item.level }}. {{ item.description }}</td>
              <td v-for="(subItem, j) in item.data" :key="j">{{ subItem.average }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - RE202 Student Outcomes Attainment</div>
            <div class="card-body">
              <GChart
                type="ColumnChart"
                :data="summary_of_course_assessment_results.category_chart"
                :options="chartOptions"
                v-if="summary_of_course_assessment_results.category_chart"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - RE202 Student Outcomes Attainment</div>
            <div class="card-body">
              <GChart
                type="ColumnChart"
                :data="summary_of_course_assessment_results.proficiency_level_chart"
                :options="chartOptions"
                v-if="summary_of_course_assessment_results.proficiency_level_chart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts/legacy";

export default {
  name: "SummaryOfCourseAssessmentResults",
  components: {
    GChart,
  },
  data() {
    return {
      chartOptions: {
        isStacked: "percent",
        height: 350,
        legend: { position: "bottom", maxLines: 5 },
        chartArea: { width: "85%" },
      },
    };
  },
  computed: {
    report() {
      return this.$store.state.assessment.report;
    },
    isLoading() {
      return this.$store.state.assessment.loading.summary_of_course_assessment_results;
    },
    summary_of_course_assessment_results() {
      return this.$store.state.assessment.summary_of_course_assessment_results;
    },
  },
  mounted() {
    this.$store.dispatch("GetSummaryOfCourseAssessmentResults", this.$route.params.id);
  },
};
</script>
