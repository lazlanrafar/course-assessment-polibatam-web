<template>
  <v-card :loading="isLoading" class="card shadow-none border">
    <div class="card-header fw-medium">Summary of Course Assessment Results</div>

    <div class="card-body" v-if="summary_of_course_assessment_results">
      <div class="row">
        <div class="col-12" v-if="assessment">
          <div class="card shadow-none border">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <TableCustom
                    :items="[
                      { label: 'Study Program', value: assessment.course.program_studi.title },
                      { label: 'Course Code', value: assessment?.course.code },
                      { label: 'Course Title', value: assessment.course.title },
                      { label: 'Teacher NIP', value: assessment.teacher_nip },
                      { label: 'Teacher Name', value: assessment.teacher_name },
                    ]"
                  />
                </div>
                <div class="col-md-6">
                  <TableCustom
                    :items="[
                      { label: 'Semester', value: assessment.semester },
                      { label: 'Academic Year', value: assessment.academic_year },
                      { label: 'Class', value: assessment.class },
                      {
                        label: 'Proficiency Level',
                        value: `${assessment.proficiency_level.level} (${assessment.proficiency_level.description})`,
                      },
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <div class="table-responsive" v-if="summary_of_course_assessment_results.category_target">
        <table class="table table-bordered fs-12">
          <thead class="table-success">
            <tr>
              <th>Category</th>
              <th v-for="(item, i) in summary_of_course_assessment_results.category_target[0].data" :key="i">
                {{ item.so_pi }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in summary_of_course_assessment_results.category_target"
              :key="i"
              :class="item.title == 'Target Attainment' ? 'table-success' : ''"
            >
              <td>{{ item.title }}</td>
              <td v-for="(subItem, j) in item.data" :key="j">{{ subItem.average }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div class="table-responsive" v-if="summary_of_course_assessment_results.proficiency_level">
        <table class="table table-bordered fs-12">
          <thead class="table-primary">
            <tr>
              <th>Proficiency Level (%)</th>
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
      <div class="table-responsive" v-if="summary_of_course_assessment_results.proficiency_level">
        <table class="table table-bordered fs-12">
          <thead class="table-primary">
            <tr>
              <th>Proficiency Level</th>
              <th v-for="(item, i) in summary_of_course_assessment_results.proficiency_level_target[0].data" :key="i">
                {{ item.so_pi }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in summary_of_course_assessment_results.proficiency_level_target" :key="i">
              <td>{{ item.title }}</td>
              <td v-for="(subItem, j) in item.data" :key="j">{{ subItem.average }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - {{ assessment?.course.code }} Student Outcomes Attainment</div>
            <div class="card-body">
              <GChart
                type="ColumnChart"
                :data="summary_of_course_assessment_results.category_chart"
                v-if="summary_of_course_assessment_results.category_chart"
                :options="chartColumnOptions"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - {{ assessment?.course.code }} Attainment</div>
            <div class="card-body">
              <GChart
                type="ColumnChart"
                :data="summary_of_course_assessment_results.category_chart_target"
                v-if="summary_of_course_assessment_results.category_chart_target"
                :options="chartTargetOptions(summary_of_course_assessment_results.category_chart_target[0].length - 2)"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - {{ assessment?.course.code }} Proficiency Level Attainment</div>
            <div class="card-body">
              <GChart
                type="ColumnChart"
                :data="summary_of_course_assessment_results.proficiency_level_chart"
                v-if="summary_of_course_assessment_results.proficiency_level_chart"
                :options="chartColumnOptions"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - {{ assessment?.course.code }} Level Proficiency Level Attainment</div>
            <div class="card-body">
              <GChart
                type="ColumnChart"
                :data="summary_of_course_assessment_results.proficiency_level_chart_target"
                v-if="summary_of_course_assessment_results.proficiency_level_chart_target"
                :options="chartTargetOptions(1)"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-none border">
            <div class="card-header">SA - {{ assessment?.course.code }} Average Proficiency Level Attainment</div>
            <div class="card-body">
              <RadarChart
                v-if="summary_of_course_assessment_results.data_radar"
                :chartData="summary_of_course_assessment_results.data_radar"
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
    TableCustom: () => import("@/components/molecules/table-custom.vue"),
    RadarChart: () => import("@/components/molecules/radar-chart.vue"),
  },
  data() {
    return {
      chartColumnOptions: {
        isStacked: "percent",
        height: 350,
        legend: { position: "bottom", maxLines: 5 },
        chartArea: { width: "85%" },
      },
      chartTargetOptions: (target) => {
        return {
          isStacked: true,
          height: 350,
          legend: { position: "bottom", maxLines: 5 },
          chartArea: { width: "85%" },
          seriesType: "bars",
          series: { [target]: { type: "line" } },
        };
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
    assessment() {
      return this.$store.state.assessment.summary_of_course_assessment_results.assessment;
    },
  },
  mounted() {
    this.$store.dispatch("GetSummaryOfCourseAssessmentResults", this.$route.params.id);
  },
};
</script>
