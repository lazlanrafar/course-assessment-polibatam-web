<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Assessment Method</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-autocomplete
              label="Course"
              :items="list_course"
              item-text="title"
              item-value="id"
              dense
              outlined
              v-model="id_course"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Course');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Semester"
              dense
              outlined
              v-model="semester"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Semester');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Academic Year"
              dense
              outlined
              v-model="academic_year"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Academic Year');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Class"
              dense
              outlined
              v-model="kelas"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Class');
                },
              ]"
            />
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
  name: "AssessmentForm",
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
    list_course() {
      return this.$store.state.assessment.list_course;
    },
    id_course: {
      get() {
        return this.$store.state.assessment.form.id_course;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT", {
          key: "id_course",
          value,
        });
      },
    },
    semester: {
      get() {
        return this.$store.state.assessment.form.semester;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT", {
          key: "semester",
          value,
        });
      },
    },
    academic_year: {
      get() {
        return this.$store.state.assessment.form.academic_year;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT", {
          key: "academic_year",
          value,
        });
      },
    },
    kelas: {
      get() {
        return this.$store.state.assessment.form.class;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT", {
          key: "class",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_ASSESSMENT");
      this.$store.commit("SET_IS_UPDATE_ASSESSMENT", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateAssessment", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateAssessment").then((res) => {
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
