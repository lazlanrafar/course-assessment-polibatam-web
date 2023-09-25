<template>
  <div>
    <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleModalForm(true)">
      <i class="fa fa-file-excel"></i>
      Import Rubrik
    </v-btn>

    <v-dialog v-model="modalForm" persistent max-width="600">
      <v-form ref="initialReport" @submit.prevent="handleSubmit">
        <v-card>
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="card-title fw-medium">Form Import Rubrik</h3>

              <v-btn icon @click="handleClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="card-body">
            <input type="file" ref="file" class="mb-3" required @change="handleFileUpload" />
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-end">
              <v-btn class="btn mr-3" @click="handleClose">Cancel</v-btn>
              <v-btn class="btn bg-navy" type="submit">Import</v-btn>
            </div>
          </div>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
var XLSX = require("xlsx");

export default {
  name: "HandleImportRubrik",
  data() {
    return {
      modalForm: false,
    };
  },
  methods: {
    handleModalForm(value) {
      this.modalForm = value;
    },
    handleClose() {
      this.handleModalForm(false);
    },
    handleFileUpload(e) {
      var files = e.target.files,
        f = files[0];
      var reader = new FileReader();

      const commit = this.$store.commit;
      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        let worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);

        commit("SET_FORM_IMPORT_RUBRIK", json);
        console.log("json", json);
      };
      reader.readAsArrayBuffer(f);
    },
    handleSubmit() {
      this.handleModalForm(false);
    },
  },
};
</script>
