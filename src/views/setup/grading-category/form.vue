<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Support Level to SO</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-text-field
              label="Title"
              dense
              outlined
              v-model="title"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Title');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Lower Limit"
              dense
              outlined
              v-model="lower_limit"
              type="number"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Lower Limit');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Upper Limit"
              dense
              outlined
              v-model="upper_limit"
              type="number"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Upper Limit');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Grade"
              dense
              outlined
              v-model="grade"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Grade');
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
  name: "GradingCategoryForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.gradingCategory.isLoading;
    },
    isUpdate() {
      return this.$store.state.gradingCategory.isUpdate;
    },
    title: {
      get() {
        return this.$store.state.gradingCategory.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_GRADING_CATEGORY", {
          key: "title",
          value,
        });
      },
    },
    lower_limit: {
      get() {
        return this.$store.state.gradingCategory.form.lower_limit;
      },
      set(value) {
        this.$store.commit("SET_FORM_GRADING_CATEGORY", {
          key: "lower_limit",
          value,
        });
      },
    },
    upper_limit: {
      get() {
        return this.$store.state.gradingCategory.form.upper_limit;
      },
      set(value) {
        this.$store.commit("SET_FORM_GRADING_CATEGORY", {
          key: "upper_limit",
          value,
        });
      },
    },
    grade: {
      get() {
        return this.$store.state.gradingCategory.form.grade;
      },
      set(value) {
        this.$store.commit("SET_FORM_GRADING_CATEGORY", {
          key: "grade",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_GRADING_CATEGORY");
      this.$store.commit("SET_IS_UPDATE_GRADING_CATEGORY", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateGradingCategory", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateGradingCategory").then((res) => {
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
