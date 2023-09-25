<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoadingForm">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Rubrik</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-select
              label="Student Outcome"
              dense
              outlined
              :items="list_student_outcome"
              item-text="code"
              item-value="id"
              v-model="id_student_outcome"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Student Outcome');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-select
              label="CDIO Syllabus"
              dense
              outlined
              :items="list_cdio_syllabus"
              item-text="label"
              item-value="id"
              v-model="id_cdio_syllabus"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'CDIO Syllabus');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Code"
              dense
              outlined
              v-model="code"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Code');
                },
              ]"
            />
          </div>
          <div class="col-12">
            <v-text-field
              label="Performance Indicator"
              dense
              outlined
              v-model="title"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Performance Indicator');
                },
              ]"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <v-textarea
              label="Proficiency Level 1"
              dense
              outlined
              rows="3"
              @input="handleDeleleteDoubleSpaceAndEnter()"
              v-model="desc_level_1"
            />
          </div>
          <div class="col-12">
            <v-textarea
              label="Proficiency Level 2"
              dense
              outlined
              rows="3"
              @input="handleDeleleteDoubleSpaceAndEnter()"
              v-model="desc_level_2"
            />
          </div>
          <div class="col-12">
            <v-textarea
              label="Proficiency Level 3"
              dense
              outlined
              rows="3"
              @input="handleDeleleteDoubleSpaceAndEnter()"
              v-model="desc_level_3"
            />
          </div>
          <div class="col-12">
            <v-textarea
              label="Proficiency Level 4"
              dense
              outlined
              rows="3"
              @input="handleDeleleteDoubleSpaceAndEnter()"
              v-model="desc_level_4"
            />
          </div>
          <div class="col-12">
            <v-textarea
              label="Proficiency Level 5"
              dense
              outlined
              rows="3"
              @input="handleDeleleteDoubleSpaceAndEnter()"
              v-model="desc_level_5"
            />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-end">
          <v-btn class="btn mr-3" @click="handleClose">Cancel</v-btn>
          <v-btn class="btn bg-navy" type="submit" :loading="isLoadingForm">Submit</v-btn>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import validationRules from "@/mixins/validation-rules";

export default {
  name: "RubrikForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoadingForm() {
      return this.$store.state.rubrik.isLoadingForm;
    },
    isUpdate() {
      return this.$store.state.rubrik.isUpdate;
    },
    list_student_outcome() {
      return this.$store.state.rubrik.list_student_outcome;
    },
    list_cdio_syllabus() {
      return this.$store.state.rubrik.list_cdio_syllabus;
    },
    id_student_outcome: {
      get() {
        return this.$store.state.rubrik.form.id_student_outcome;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "id_student_outcome",
          value,
        });
      },
    },
    id_cdio_syllabus: {
      get() {
        return this.$store.state.rubrik.form.id_cdio_syllabus;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "id_cdio_syllabus",
          value,
        });
      },
    },
    code: {
      get() {
        return this.$store.state.rubrik.form.code;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "code",
          value,
        });
      },
    },
    title: {
      get() {
        return this.$store.state.rubrik.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "title",
          value,
        });
      },
    },
    desc_level_1: {
      get() {
        return this.$store.state.rubrik.form.desc_level_1;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "desc_level_1",
          value,
        });
      },
    },
    desc_level_2: {
      get() {
        return this.$store.state.rubrik.form.desc_level_2;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "desc_level_2",
          value,
        });
      },
    },
    desc_level_3: {
      get() {
        return this.$store.state.rubrik.form.desc_level_3;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "desc_level_3",
          value,
        });
      },
    },
    desc_level_4: {
      get() {
        return this.$store.state.rubrik.form.desc_level_4;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "desc_level_4",
          value,
        });
      },
    },
    desc_level_5: {
      get() {
        return this.$store.state.rubrik.form.desc_level_5;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "desc_level_5",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_RUBRIK");
      this.$store.commit("SET_IS_UPDATE_RUBRIK", false);
    },
    handleDeleleteDoubleSpaceAndEnter() {
      this.desc_level_1 = this.desc_level_1.replace(/\s\s+/g, " ").trim();
      this.desc_level_2 = this.desc_level_2.replace(/\s\s+/g, " ").trim();
      this.desc_level_3 = this.desc_level_3.replace(/\s\s+/g, " ").trim();
      this.desc_level_4 = this.desc_level_4.replace(/\s\s+/g, " ").trim();
      this.desc_level_5 = this.desc_level_5.replace(/\s\s+/g, " ").trim();
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateRubrik", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateRubrik").then((res) => {
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
