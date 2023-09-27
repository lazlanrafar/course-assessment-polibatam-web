<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Course Learning Outcome (CLOs)</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-text-field
              label="Code CLOs"
              dense
              outlined
              v-model="code"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Code CLOs');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-textarea
              label="Course Learning Outcome (CLOs)"
              dense
              outlined
              v-model="title"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Course Learning Outcome (CLOs)');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-autocomplete
              label="Assessment Method"
              :items="list_assessment_method"
              item-text="title"
              item-value="id"
              v-model="id_assessment_method"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Assessment Method');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-combobox
              :items="list_rubrik"
              item-text="label"
              item-value="id"
              v-model="rubrik"
              multiple
              small-chips
              label="Related SO-PI"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Related SO-PI');
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
  name: "CourseCLOForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.course.isLoading;
    },
    isUpdateCLO() {
      return this.$store.state.course.isUpdateCLO;
    },
    list_assessment_method() {
      return this.$store.state.course.list_assessment_method;
    },
    list_rubrik() {
      return this.$store.state.course.list_rubrik;
    },
    id_course: {
      get() {
        return this.$store.state.course.form_clo.id_course;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_CLO", {
          key: "id_course",
          value,
        });
      },
    },
    rubrik: {
      get() {
        return this.$store.state.course.form_clo.rubrik;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_CLO", {
          key: "rubrik",
          value,
        });
      },
    },
    id_assessment_method: {
      get() {
        return this.$store.state.course.form_clo.id_assessment_method;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_CLO", {
          key: "id_assessment_method",
          value,
        });
      },
    },
    code: {
      get() {
        return this.$store.state.course.form_clo.code;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_CLO", {
          key: "code",
          value,
        });
      },
    },
    title: {
      get() {
        return this.$store.state.course.form_clo.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_COURSE_CLO", {
          key: "title",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormCLO", false);
      this.$store.commit("RESET_FORM_COURSE_CLO");
      this.$store.commit("SET_IS_UPDATE_COURSE_CLO", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdateCLO) {
          this.$store.dispatch("UpdateCourse", this.isUpdateCLO).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateCourseLearningOutcome").then((res) => {
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
