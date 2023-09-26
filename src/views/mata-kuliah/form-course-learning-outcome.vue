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
            <v-autocomplete
              label="Related SO-PI"
              :items="list_rubrik"
              item-text="label"
              item-value="id"
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
    isUpdate() {
      return this.$store.state.course.isUpdate;
    },
    list_assessment_method() {
      return this.$store.state.course.list_assessment_method;
    },
    list_rubrik() {
      return this.$store.state.course.list_rubrik;
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
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormCLO", false);
      this.$store.commit("RESET_FORM_COURSE");
      this.$store.commit("SET_IS_UPDATE_COURSE", false);
      this.bobot_total = 0;
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateCourse", this.isUpdate).then((res) => {
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
