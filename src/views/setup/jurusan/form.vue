<template>
  <v-form ref="initialReport" @submit.prevent="handleSubmit">
    <v-card :loading="isLoading">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="card-title fw-medium">Form Jurusan</h3>

          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <v-text-field
              label="Jurusan"
              dense
              outlined
              v-model="title"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'Jurusan');
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
  name: "JurusanForm",
  mixins: [validationRules],
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.jurusan.isLoading;
    },
    isUpdate() {
      return this.$store.state.jurusan.isUpdate;
    },
    title: {
      get() {
        return this.$store.state.jurusan.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_JURUSAN", {
          key: "title",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm", false);
      this.$store.commit("RESET_FORM_JURUSAN");
      this.$store.commit("SET_IS_UPDATE_JURUSAN", false);
    },
    handleSubmit() {
      this.$refs.initialReport.validate();

      if (this.$refs.initialReport.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateJurusan", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
        } else {
          this.$store.dispatch("CreateJurusan").then((res) => {
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
