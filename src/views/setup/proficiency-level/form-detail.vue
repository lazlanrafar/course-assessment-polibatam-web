<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Proficiency Level</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-text-field label="Lower Limit" dense outlined type="number" v-model="lower_limit" />
          </div>
          <div class="col-12">
            <v-text-field label="Upper Limit" dense outlined type="number" v-model="upper_limit" />
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
  name: "ProficiencyLevelForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.proficiencyLevel.isLoading;
    },
    isUpdate() {
      return this.$store.state.proficiencyLevel.isUpdate_detail;
    },
    lower_limit: {
      get() {
        return this.$store.state.proficiencyLevel.form_detail.lower_limit;
      },
      set(value) {
        this.$store.commit("SET_FORM_DETAIL_PROFICIENCY_LEVEL", {
          key: "lower_limit",
          value,
        });
      },
    },
    upper_limit: {
      get() {
        return this.$store.state.proficiencyLevel.form_detail.upper_limit;
      },
      set(value) {
        this.$store.commit("SET_FORM_DETAIL_PROFICIENCY_LEVEL", {
          key: "upper_limit",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_DETAIL_PROFICIENCY_LEVEL");
      this.$store.commit("SET_IS_UPDATE_DETAIL_PROFICIENCY_LEVEL", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateProficiencyLevelDetail", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();

              this.$store.dispatch("GetProficiencyLevelById", this.$route.params.id);
            }
          });
        }
      }
    },
  },
};
</script>
