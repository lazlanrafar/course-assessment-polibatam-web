<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Course Assessment Plan {{ report.so_pi }}</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="card shadow-none border">
          <div class="card-body">
            <CustomTable
              :items="[
                { label: 'A', value: 'Assignment' },
                { label: 'P', value: 'Practice or Project' },
                { label: 'Q', value: 'Quiz' },
                { label: 'MSE', value: 'Mid-Semester Exam' },
                { label: 'FSE', value: 'Final-Semester Exam' },
                { label: 'PP', value: 'Project Presentation, demo, team meeting' },
              ]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 1" dense outlined v-model="week_1" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 2" dense outlined v-model="week_2" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 3" dense outlined v-model="week_3" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 4" dense outlined v-model="week_4" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 5" dense outlined v-model="week_5" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 6" dense outlined v-model="week_6" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 7" dense outlined v-model="week_7" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Mid-Sem" dense outlined v-model="mid_sem" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 8" dense outlined v-model="week_8" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 9" dense outlined v-model="week_9" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 10" dense outlined v-model="week_10" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 11" dense outlined v-model="week_11" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 12" dense outlined v-model="week_12" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 13" dense outlined v-model="week_13" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Week 14" dense outlined v-model="week_14" />
          </div>
          <div class="col-md-6">
            <v-autocomplete :items="list_assessment_plan_type" label="Final-Sem" dense outlined v-model="final_sem" />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-end">
          <v-btn class="btn mr-3" @click="handleClose">Cancel</v-btn>
          <v-btn class="btn bg-navy" type="submit" :loading="isLoading">Submit</v-btn>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import validationRules from "@/mixins/validation-rules";

export default {
  name: "CourseCLOForm",
  mixins: [validationRules],
  components: {
    CustomTable: () => import("@/components/molecules/table-custom.vue"),
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    report() {
      return this.$store.state.course.reports_assessment_plan.find((item) => item.id === this.isUpdateAssessmentPlan);
    },
    list_assessment_plan_type() {
      return this.$store.state.course.list_assessment_plan_type;
    },
    isUpdateAssessmentPlan() {
      return this.$store.state.course.isUpdateAssessmentPlan;
    },
    week_1: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_1;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_1",
          value,
        });
      },
    },
    week_2: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_2;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_2",
          value,
        });
      },
    },
    week_3: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_3;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_3",
          value,
        });
      },
    },
    week_4: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_4;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_4",
          value,
        });
      },
    },
    week_5: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_5;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_5",
          value,
        });
      },
    },
    week_6: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_6;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_6",
          value,
        });
      },
    },
    week_7: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_7;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_7",
          value,
        });
      },
    },
    week_8: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_8;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_8",
          value,
        });
      },
    },
    week_9: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_9;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_9",
          value,
        });
      },
    },
    week_10: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_10;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_10",
          value,
        });
      },
    },
    week_11: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_11;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_11",
          value,
        });
      },
    },
    week_12: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_12;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_12",
          value,
        });
      },
    },
    week_13: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_13;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_13",
          value,
        });
      },
    },
    week_14: {
      get() {
        return this.$store.state.course.form_assessment_plan.week_14;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "week_14",
          value,
        });
      },
    },
    mid_sem: {
      get() {
        return this.$store.state.course.form_assessment_plan.mid_sem;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "mid_sem",
          value,
        });
      },
    },
    final_sem: {
      get() {
        return this.$store.state.course.form_assessment_plan.final_sem;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_ASSESSMENT_PLAN", {
          key: "final_sem",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormAssessmentPlan", false);
      this.$store.commit("RESET_FORM_COURSE_ASSESSMENT_PLAN");
      this.$store.commit("SET_IS_UPDATE_COURSE_ASSESSMENT_PLAN", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdateAssessmentPlan) {
          this.$store
            .dispatch("UpdateCourseAssessmentPlan", {
              id: this.isUpdateAssessmentPlan,
              id_course: this.$route.params.id,
            })
            .then((res) => {
              if (res) {
                this.handleClose();
              }
            });
        }
      }
    },
  },
};
</script>
