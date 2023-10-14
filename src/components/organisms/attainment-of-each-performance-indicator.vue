<template>
  <v-card :loading="isLoading" class="card shadow-none border">
    <div class="card-header fw-medium">Attainment of Each Performance Indicator</div>
    <div class="card-body">
      <div v-for="(item, i) in attainment_of_each_performance_indicator" :key="i">
        <div class="card shadow-none border">
          <div class="card-header bg-secondary">
            {{ item.so_pi }}
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered fs-12">
                <thead class="table-success">
                  <tr>
                    <th>Category</th>
                    <th v-for="(nQ, iQ) in item.category[0].quiz" :key="iQ">{{ nQ.key }}</th>
                    <th v-for="(nA, iA) in item.category[0].assignment" :key="iA">{{ nA.key }}</th>
                    <th v-for="(nP, iP) in item.category[0].practice_or_project" :key="iP">{{ nP.key }}</th>
                    <th v-for="(nPP, iPP) in item.category[0].presentation" :key="iPP">{{ nPP.key }}</th>
                    <th v-if="'mid_exam' in item.category[0]">MSE</th>
                    <th v-if="'final_exam' in item.category[0]">FSE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(itemC, indexC) in item.category" :key="indexC">
                    <td>{{ itemC.title }}</td>
                    <td v-for="(nQ, iQ) in itemC.quiz" :key="iQ">{{ nQ.value }}</td>
                    <td v-for="(nA, iA) in itemC.assignment" :key="iA">{{ nA.value }}</td>
                    <td v-for="(nP, iP) in itemC.practice_or_project" :key="iP">{{ nP.value }}</td>
                    <td v-for="(nPP, iPP) in itemC.presentation" :key="iPP">{{ nPP.value }}</td>
                    <td v-if="'mid_exam' in itemC">{{ itemC.mid_exam }}</td>
                    <td v-if="'final_exam' in itemC">{{ itemC.final_exam }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered fs-12">
                <thead class="table-primary">
                  <tr>
                    <th>Proficiency Level</th>
                    <th v-for="(nQ, iQ) in item.proficiency_level[0].quiz" :key="iQ">{{ nQ.key }}</th>
                    <th v-for="(nA, iA) in item.proficiency_level[0].assignment" :key="iA">{{ nA.key }}</th>
                    <th v-for="(nP, iP) in item.proficiency_level[0].practice_or_project" :key="iP">{{ nP.key }}</th>
                    <th v-for="(nPP, iPP) in item.proficiency_level[0].presentation" :key="iPP">{{ nPP.key }}</th>
                    <th v-if="'mid_exam' in item.proficiency_level[0]">MSE</th>
                    <th v-if="'final_exam' in item.proficiency_level[0]">FSE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(itemP, indexP) in item.proficiency_level" :key="indexP">
                    <td>{{ itemP.level }}. {{ itemP.description }}</td>
                    <td v-for="(nQ, iQ) in itemP.quiz" :key="iQ">{{ nQ.value }}</td>
                    <td v-for="(nA, iA) in itemP.assignment" :key="iA">{{ nA.value }}</td>
                    <td v-for="(nP, iP) in itemP.practice_or_project" :key="iP">{{ nP.value }}</td>
                    <td v-for="(nPP, iPP) in itemP.presentation" :key="iPP">{{ nPP.value }}</td>
                    <td v-if="'mid_exam' in itemP">{{ itemP.mid_exam }}</td>
                    <td v-if="'final_exam' in itemP">{{ itemP.final_exam }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "AttainmentOfEachPerformanceIndicator",
  computed: {
    report() {
      return this.$store.state.assessment.report;
    },
    isLoading() {
      return this.$store.state.assessment.loading.attainment_of_each_performance_indicator;
    },
    attainment_of_each_performance_indicator() {
      return this.$store.state.assessment.attainment_of_each_performance_indicator;
    },
  },
  mounted() {
    this.$store.dispatch("GetAttainmentOfEachPerformanceIndicator", this.$route.params.id);
  },
};
</script>
