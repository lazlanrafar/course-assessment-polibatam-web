<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Course</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <v-autocomplete
              label="Program Studi"
              :items="list_program_studi"
              item-text="title"
              item-value="id"
              v-model="id_program_studi"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Program Studi');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <v-text-field
              label="Course Code"
              v-model="code"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Course Code');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <v-text-field
              label="Course Name"
              v-model="title"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Course Name');
                },
              ]"
            />
          </div>
          <div class="col-md-6">
            <v-text-field
              label="SKS"
              v-model="sks"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'SKS');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Level Target"
              v-model="target_level"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Level Target');
                },
              ]"
            />
          </div>
        </div>
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Weight of Course</legend>
          <div class="row">
            <div class="col-12">
              <v-text-field
                label="Assignment"
                v-model="bobot_assignment"
                @input="handleTotalBobot()"
                suffix="%"
                dense
                outlined
                type="number"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'Assignment');
                  },
                ]"
              />
              <v-text-field
                label="Quizzes"
                v-model="bobot_quiz"
                @input="handleTotalBobot()"
                suffix="%"
                dense
                outlined
                type="number"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'Quizzes');
                  },
                ]"
              />
              <v-text-field
                label="Mid-semester Exam"
                v-model="bobot_mid_exam"
                @input="handleTotalBobot()"
                suffix="%"
                dense
                outlined
                type="number"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'Mid-semester Exam');
                  },
                ]"
              />
              <v-text-field
                label="Final-semester Exam"
                v-model="bobot_final_exam"
                @input="handleTotalBobot()"
                suffix="%"
                dense
                outlined
                type="number"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'Final-semester Exam');
                  },
                ]"
              />
              <v-text-field
                label="Practice / Project"
                v-model="bobot_practice_or_project"
                @input="handleTotalBobot()"
                suffix="%"
                dense
                outlined
                type="number"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'Practice / Project');
                  },
                ]"
              />
              <v-text-field
                label="Project Presentation"
                v-model="bobot_presentation"
                @input="handleTotalBobot()"
                suffix="%"
                dense
                outlined
                type="number"
                :rules="[
                  (value) => {
                    return genericRequiredRule(value, 'Project Presentation');
                  },
                ]"
              />
              <v-text-field
                label="Weight Total (%)"
                readonly
                dense
                outlined
                v-model="bobot_total"
                suffix="%"
                :rules="[
                  () => {
                    return validateTotalBobot();
                  },
                ]"
              />
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
  name: "CourseForm",
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
    list_program_studi() {
      return this.$store.state.course.list_program_studi;
    },
    id_program_studi: {
      get() {
        return this.$store.state.course.form.id_program_studi;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "id_program_studi",
          value,
        });
      },
    },
    code: {
      get() {
        return this.$store.state.course.form.code;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "code",
          value,
        });
      },
    },
    title: {
      get() {
        return this.$store.state.course.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "title",
          value,
        });
      },
    },
    sks: {
      get() {
        return this.$store.state.course.form.sks;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "sks",
          value,
        });
      },
    },
    target_level: {
      get() {
        return this.$store.state.course.form.target_level;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "target_level",
          value,
        });
      },
    },
    bobot_assignment: {
      get() {
        return this.$store.state.course.form.bobot_assignment;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_assignment",
          value,
        });
      },
    },
    bobot_quiz: {
      get() {
        return this.$store.state.course.form.bobot_quiz;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_quiz",
          value,
        });
      },
    },
    bobot_mid_exam: {
      get() {
        return this.$store.state.course.form.bobot_mid_exam;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_mid_exam",
          value,
        });
      },
    },
    bobot_final_exam: {
      get() {
        return this.$store.state.course.form.bobot_final_exam;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_final_exam",
          value,
        });
      },
    },
    bobot_practice_or_project: {
      get() {
        return this.$store.state.course.form.bobot_practice_or_project;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_practice_or_project",
          value,
        });
      },
    },
    bobot_presentation: {
      get() {
        return this.$store.state.course.form.bobot_presentation;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_presentation",
          value,
        });
      },
    },
    bobot_total: {
      get() {
        return this.$store.state.course.form.bobot_total;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE", {
          key: "bobot_total",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_COURSE");
      this.$store.commit("SET_IS_UPDATE_COURSE", false);
      this.bobot_total = 0;
    },
    handleTotalBobot() {
      const total =
        parseFloat(this.bobot_assignment) +
        parseFloat(this.bobot_quiz) +
        parseFloat(this.bobot_mid_exam) +
        parseFloat(this.bobot_final_exam) +
        parseFloat(this.bobot_practice_or_project) +
        parseFloat(this.bobot_presentation);

      this.bobot_total = total;
    },
    validateTotalBobot() {
      if (this.bobot_total !== 100 || this.bobot_total > 100) {
        return "Total bobot must be 100%";
      }
      return true;
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateStudentOutcome", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateCourse").then((res) => {
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
