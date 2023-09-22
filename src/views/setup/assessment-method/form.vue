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
            <v-textarea
              label="Description"
              dense
              outlined
              v-model="title"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Description');
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
  name: "AssessmentMethodForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.assessmentMethod.isLoading;
    },
    isUpdate() {
      return this.$store.state.assessmentMethod.isUpdate;
    },
    title: {
      get() {
        return this.$store.state.assessmentMethod.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_ASSESSMENT_METHOD", {
          key: "title",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_ASSESSMENT_METHOD");
      this.$store.commit("SET_IS_UPDATE_ASSESSMENT_METHOD", false);
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
          this.$store.dispatch("CreateAssessmentMethod").then((res) => {
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
