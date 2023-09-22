<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
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
              label="CDIO Syllabus"
              dense
              outlined
              v-model="id_cdio_syllabus"
              :items="list_cdio_syllabus"
              item-text="title"
              item-value="id"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'CDIO Syllabus');
                },
              ]"
            />
          </div>
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
          <v-btn class="btn bg-navy" type="submit">Submit</v-btn>
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
    isLoading() {
      return this.$store.state.rubrik.isLoading;
    },
    isUpdate() {
      return this.$store.state.rubrik.isUpdate;
    },
    list_cdio_syllabus() {
      return this.$store.state.rubrik.list_cdio_syllabus;
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
    level: {
      get() {
        return this.$store.state.rubrik.form.level;
      },
      set(value) {
        this.$store.commit("SET_FORM_RUBRIK", {
          key: "level",
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
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_RUBRIK");
      this.$store.commit("SET_IS_UPDATE_RUBRIK", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateCity", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateCity").then((res) => {
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
