<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Assessment</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-text-field
              label="NIM"
              dense
              outlined
              v-model="nim"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'NIM');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Mahasiswa"
              dense
              outlined
              v-model="name"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Mahasiswa');
                },
              ]"
            />
          </div>
        </div>
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Quizzes</legend>
          <div class="row">
            <div class="col-md-6" v-for="(nQ, iQ) in course.total_quiz" :key="iQ">
              <v-text-field :label="`Quizzes ${nQ}`" v-model="quiz[iQ]" dense outlined type="number" />
            </div>
          </div>
        </fieldset>
        <br />
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Practice or Project</legend>
          <div class="row">
            <div class="col-md-6" v-for="(nP, iP) in course.total_practice_or_project" :key="iP">
              <v-text-field :label="`Practice or Project ${nP}`" v-model="practice_or_project[iP]" dense outlined type="number" />
            </div>
          </div>
        </fieldset>
        <br />
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Assignment</legend>
          <div class="row">
            <div class="col-md-6" v-for="(nA, iA) in course.total_assignment" :key="iA">
              <v-text-field :label="`Assignment ${nA}`" v-model="assignment[iA]" dense outlined type="number" />
            </div>
          </div>
        </fieldset>
        <br />
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Exam</legend>
          <div class="row">
            <div class="col-md-6" v-if="course.total_mid_exam > 0">
              <v-text-field label="Mid-Semester" v-model="mid_exam" dense outlined type="number" />
            </div>
            <div class="col-md-6" v-if="course.total_final_exam > 0">
              <v-text-field label="Final-Semester" v-model="final_exam" dense outlined type="number" />
            </div>
          </div>
        </fieldset>
        <br />
        <fieldset class="border px-5 py-3">
          <legend class="fs-14 fw-medium py-1 px-3 bg-navy w-auto">Presentation</legend>
          <div class="row">
            <div class="col-md-6" v-for="(nPP, iPP) in course.total_presentation" :key="iPP">
              <v-text-field :label="`Presentation ${nPP}`" v-model="presentation[iPP]" dense outlined type="number" />
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
  name: "AssessmentFormMahasiswa",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.assessment.isLoading;
    },
    isUpdate() {
      return this.$store.state.assessment.isUpdate;
    },
    course() {
      return this.$store.state.assessment.report.course;
    },
    nim: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.nim;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "nim",
          value,
        });
      },
    },
    name: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.name;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "name",
          value,
        });
      },
    },
    quiz: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.quiz;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "quiz",
          value,
        });
      },
    },
    practice_or_project: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.practice_or_project;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "practice_or_project",
          value,
        });
      },
    },
    assignment: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.assignment;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "assignment",
          value,
        });
      },
    },
    mid_exam: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.mid_exam;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "mid_exam",
          value,
        });
      },
    },
    final_exam: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.final_exam;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "final_exam",
          value,
        });
      },
    },
    presentation: {
      get() {
        return this.$store.state.assessment.form_mahasiswa.presentation;
      },
      set(value) {
        this.$store.commit("SET_FORM_MAHASISWA_ASSESSMENT", {
          key: "presentation",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormMahasiswa", false);
      this.$store.commit("RESET_FORM_MAHASISWA_ASSESSMENT");
      this.$store.commit("SET_IS_UPDATE_MAHASISWA_ASSESSMENT", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateAssessment", this.isUpdate).then((res) => {
            if (res) {
              this.$store.dispatch("GetAssessmentById", this.$route.params.id);
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateAssessmentDetail").then((res) => {
            if (res) {
              this.$store.dispatch("GetAssessmentById", this.$route.params.id);
              this.handleClose();
            }
          });
        }
      }
    },
  },
};
</script>
