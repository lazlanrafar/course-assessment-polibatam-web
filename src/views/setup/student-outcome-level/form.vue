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
              label="Level"
              dense
              outlined
              v-model="level"
              type="number"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Level');
                },
              ]"
            />
          </div>
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
            <v-textarea
              label="Description"
              dense
              outlined
              v-model="description"
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
  name: "StudentOutcomeForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.studentOutcomeLevel.isLoading;
    },
    isUpdate() {
      return this.$store.state.studentOutcomeLevel.isUpdate;
    },
    level: {
      get() {
        return this.$store.state.studentOutcomeLevel.form.level;
      },
      set(value) {
        this.$store.commit("SET_FORM_STUDENT_OUTCOME_LEVEL", {
          key: "level",
          value,
        });
      },
    },
    title: {
      get() {
        return this.$store.state.studentOutcomeLevel.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_STUDENT_OUTCOME_LEVEL", {
          key: "title",
          value,
        });
      },
    },
    description: {
      get() {
        return this.$store.state.studentOutcomeLevel.form.description;
      },
      set(value) {
        this.$store.commit("SET_FORM_STUDENT_OUTCOME_LEVEL", {
          key: "description",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_STUDENT_OUTCOME_LEVEL");
      this.$store.commit("SET_IS_UPDATE_STUDENT_OUTCOME_LEVEL", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateStudentOutcomeLevel", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateStudentOutcomeLevel").then((res) => {
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
