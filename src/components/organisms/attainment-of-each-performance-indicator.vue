<template>
  <v-card :loading="isLoading" class="card shadow-none border">
    <div class="card-header fw-medium">Attainment of Each Performance Indicator</div>
    <div class="card-body">
      <div v-for="(item, i) in attainment_of_each_performance_indicator" :key="i">
        <div class="card shadow-none border">
          <div class="card-header">
            {{ item.so_pi }}
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-success fs-12">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th v-for="(nQ, iQ) in item.category[0].quiz" :key="iQ">{{ nQ.key }}</th>
                    <th v-for="(nA, iA) in item.category[0].assignment" :key="iA">{{ nA.key }}</th>
                    <th v-if="item.category[0].mid_exam">MSE</th>
                    <th v-if="item.category[0].final_exam">FSE</th>
                    <th v-for="(nP, iP) in item.category[0].total_practice_or_project" :key="iP">{{ nP.key }}</th>
                    <th v-for="(nPP, iPP) in item.category[0].total_presentation" :key="iPP">{{ nPP.key }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>HI</td>
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
