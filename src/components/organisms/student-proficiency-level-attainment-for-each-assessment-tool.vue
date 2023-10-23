<template>
  <v-card :loading="isLoading" class="card shadow-none border">
    <div class="card-header fw-medium">Student Proficiency Level Attainment for Each Assessment Tool</div>
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
      <div class="table-responsive">
        <table class="table table-bordered fs-12" v-if="report.course">
          <thead>
            <tr class="table-active fw-medium">
              <td rowspan="3">NIM</td>
              <td rowspan="3">Name</td>
              <td :colspan="report.course.total_quiz">Quizzes</td>
              <td :colspan="report.course.total_practice_or_project">Practice or Project</td>
              <td :colspan="report.course.total_assignment">Assignment</td>
              <td :colspan="+report.course.total_mid_exam + +report.course.total_final_exam">Exam</td>
              <td :colspan="report.course.total_presentation">Presentation</td>
            </tr>
            <tr class="table-active fw-medium">
              <td v-for="i in report.course.total_quiz" :key="i">Q{{ i }}</td>
              <td v-for="i in report.course.total_practice_or_project" :key="i">P{{ i }}</td>
              <td v-for="i in report.course.total_assignment" :key="i">A{{ i }}</td>
              <td v-if="report.course.total_mid_exam > 0">MSE</td>
              <td v-if="report.course.total_final_exam > 0">FSE</td>
              <td v-for="i in report.course.total_presentation" :key="i">PP{{ i }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in reports" :key="i">
              <td>{{ item.nim }}</td>
              <td>{{ item.name }}</td>
              <TableTdCustom v-for="(nQ, iQ) in report.course.total_quiz" :key="iQ" :value="item.quiz[iQ]" />
              <TableTdCustom
                v-for="(nP, iP) in report.course.total_practice_or_project"
                :key="iP"
                :value="item.practice_or_project[iP]"
              />
              <TableTdCustom
                v-for="(nA, iA) in report.course.total_assignment"
                :key="iA"
                :value="item.assignment[iA]"
              />
              <TableTdCustom :value="item.mid_exam" />
              <TableTdCustom :value="item.final_exam" />
              <TableTdCustom
                v-for="(nPP, iPP) in report.course.total_presentation"
                :key="iPP"
                :value="item.presentation[iPP]"
              />
            </tr>
            <tr class="table-primary" v-if="!isLoadingAverage">
              <td colspan="2">Proficiency Level Average</td>
              <td v-for="(item, i) in proficiency_level_average.quiz" :key="i">{{ item }}</td>
              <td v-for="(item, i) in proficiency_level_average.practice_or_project" :key="i">{{ item }}</td>
              <td v-for="(item, i) in proficiency_level_average.assignment" :key="i">{{ item }}</td>
              <td v-if="proficiency_level_average.mid_exam">{{ proficiency_level_average.mid_exam }}</td>
              <td v-if="proficiency_level_average.final_exam">{{ proficiency_level_average.final_exam }}</td>
              <td v-for="(item, i) in proficiency_level_average.presentation" :key="i">{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PercentageOfStudentWithinEachCategory",
  components: {
    TableTdCustom: () => import("@/components/atoms/table-td-custom.vue"),
  },
  data() {
    return {
      search: "",
      reports: [],
    };
  },
  watch: {
    student_proficiency_level_attainment_for_each_assessment_tool(value) {
      this.reports = value;
    },
    search(value) {
      if (value) {
        this.reports = this.student_proficiency_level_attainment_for_each_assessment_tool.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase()) || item.nim.includes(value);
        });
      } else {
        this.reports = this.student_proficiency_level_attainment_for_each_assessment_tool;
      }
    },
  },
  computed: {
    report() {
      return this.$store.state.assessment.report;
    },
    isLoading() {
      return this.$store.state.assessment.loading.student_proficiency_level_attainment_for_each_assessment_tool;
    },
    isLoadingAverage() {
      return this.$store.state.assessment.loading.proficiency_level_average;
    },
    student_proficiency_level_attainment_for_each_assessment_tool() {
      return this.$store.state.assessment.student_proficiency_level_attainment_for_each_assessment_tool;
    },
    proficiency_level_average() {
      return this.$store.state.assessment.proficiency_level_average;
    },
  },
  mounted() {
    this.$store.dispatch("GetStudentProficiencyLevelAttainmentForEachAssessmentTool", this.$route.params.id);
    this.$store.dispatch("GetProficiencyLevelAverageAssessment", this.$route.params.id);
  },
};
</script>
