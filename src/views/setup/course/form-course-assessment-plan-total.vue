<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Course Assessment Type Total</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Course Information</legend>
          <div class="row">
            <div class="col-md-6">
              <v-text-field label="Quizzes" v-model="total_quiz" dense outlined type="number" />
            </div>
            <div class="col-md-6">
              <v-text-field label="Practice / Project" v-model="total_practice_or_project" dense outlined type="number" />
            </div>
            <div class="col-md-6">
              <v-text-field label="Assignment" v-model="total_assignment" dense outlined type="number" />
            </div>
            <div class="col-md-6">
              <v-text-field label="Project Presentation" v-model="total_presentation" dense outlined type="number" />
            </div>
            <div class="col-md-6">
              <v-text-field label="Mid-semester Exam" v-model="total_mid_exam" dense outlined type="number" />
            </div>
            <div class="col-md-6">
              <v-text-field label="Final-semester Exam" v-model="total_final_exam" dense outlined type="number" />
            </div>
          </div>
        </fieldset>
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
  name: "CourseAssessmentPlanTotalForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    isUpdate() {
      return this.$store.state.course.isUpdate;
    },
    total_assignment: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_assignment;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_assignment",
          value,
        });
      },
    },
    total_quiz: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_quiz;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_quiz",
          value,
        });
      },
    },
    total_mid_exam: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_mid_exam;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_mid_exam",
          value,
        });
      },
    },
    total_final_exam: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_final_exam;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_final_exam",
          value,
        });
      },
    },
    total_practice_or_project: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_practice_or_project;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_practice_or_project",
          value,
        });
      },
    },
    total_presentation: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_presentation;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_presentation",
          value,
        });
      },
    },
    total_total: {
      get() {
        return this.$store.state.course.form_assessment_plan_total.total_total;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE", {
          key: "total_total",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormAssessmentPlanTotal", false);
      this.$store.commit("RESET_FORM_ASSESSMENT_PLAN_TOTAL_COURSE");
      this.$store.commit("SET_IS_UPDATE_COURSE", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateCourseAssessmentPlanTotal", this.isUpdate).then((res) => {
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
