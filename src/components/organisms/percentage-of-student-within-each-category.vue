<template>
  <v-card :loading="isLoading" class="card shadow-none border">
    <div class="card-header fw-medium">Percentage of Student within each category</div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered fs-12" v-if="report.course">
          <thead>
            <tr class="table-active fw-medium">
              <td rowspan="3">Category</td>
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
            <tr v-for="(item, i) in percentage_of_student_within_each_category" :key="i">
              <td>{{ item.title }}</td>
              <td v-for="(nQ, iQ) in report.course.total_quiz" :key="iQ">
                {{ item.quiz[iQ] }}
              </td>
              <td v-for="(nP, iP) in report.course.total_practice_or_project" :key="iP">
                {{ item.practice_or_project[iP] }}
              </td>
              <td v-for="(nA, iA) in report.course.total_assignment" :key="iA">
                {{ item.assignment[iA] }}
              </td>
              <td>
                {{ item.mid_exam }}
              </td>
              <td>
                {{ item.final_exam }}
              </td>
              <td v-for="(nPP, iPP) in report.course.total_presentation" :key="iPP">
                {{ item.presentation[iPP] }}
              </td>
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

  computed: {
    report() {
      return this.$store.state.assessment.report;
    },
    isLoading() {
      return this.$store.state.assessment.loading.percentage_of_student_within_each_category;
    },
    percentage_of_student_within_each_category() {
      return this.$store.state.assessment.percentage_of_student_within_each_category;
    },
  },
  mounted() {
    this.$store.dispatch("GetPercentageOfStudentWithinEachCategory", this.$route.params.id);
  },
};
</script>
