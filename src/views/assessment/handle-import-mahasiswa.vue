<template>
  <div>
    <v-btn class="btn bg-navy mb-3 mb-md-0" @click="handleOpen()">
      <i class="fa fa-file-excel mr-2"></i>
      Import Mahasiswa
    </v-btn>

    <v-dialog v-model="modalImport" persistent max-width="600">
      <form @submit.prevent="handleSubmit">
        <v-card :loading="isLoading">
          <div class="card-header py-3">
            <div class="d-flex justify-content-between align-items-center">
              <p class="card-title fw-medium mb-0">Form Import Mahasiswa</p>
              <v-btn icon @click="handleClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="card-body">
            <input type="file" ref="file" class="mb-3" required @change="handleFileUpload" />
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between">
              <v-btn class="btn" @click="handleDownloadTemplate"> Download Excel Header </v-btn>
              <div class="d-flex justify-content-end">
                <v-btn class="btn mr-3" @click="handleModalImportTracking(false)"> Cancel </v-btn>
                <v-btn class="btn bg-navy" type="submit" :loading="isLoading"> Submit </v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
var XLSX = require("xlsx");
import xlsx from "json-as-xlsx";

export default {
  name: "FormImportReceipt",
  components: {},
  data() {
    return {
      modalImport: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.assessment.isLoading;
    },
    report() {
      return this.$store.state.assessment.report;
    },
  },
  methods: {
    handleOpen() {
      this.modalImport = true;
    },
    handleClose() {
      this.$store.commit("SET_FORM_IMPORT_MAHASISWA_ASSESSMENT", []);
      this.$refs.file.value = "";
      this.modalImport = false;
    },
    handleDownloadTemplate() {
      let columns_quiz = [];
      for (let i = 0; i < this.report.course.total_quiz; i++) {
        columns_quiz.push({ label: `Q${i + 1}` });
      }

      let columns_practice_or_project = [];
      for (let i = 0; i < this.report.course.total_practice_or_project; i++) {
        columns_practice_or_project.push({ label: `P${i + 1}` });
      }

      let columns_assignment = [];
      for (let i = 0; i < this.report.course.total_assignment; i++) {
        columns_assignment.push({ label: `A${i + 1}` });
      }

      let columns_mid_exam = [];
      if (this.report.course.total_mid_exam > 0) {
        columns_mid_exam.push({ label: `MSE` });
      }

      let columns_final_exam = [];
      if (this.report.course.total_final_exam > 0) {
        columns_final_exam.push({ label: `FSE` });
      }

      let columns_presentation = [];
      for (let i = 0; i < this.report.course.total_presentation; i++) {
        columns_presentation.push({ label: `PP${i + 1}` });
      }

      let data = [
        {
          columns: [
            { label: "No" },
            { label: "NIM" },
            { label: "Name" },
            ...columns_quiz,
            ...columns_practice_or_project,
            ...columns_assignment,
            ...columns_mid_exam,
            ...columns_final_exam,
            ...columns_presentation,
          ],
          content: [],
        },
      ];

      let settings = {
        fileName: `Format Import Mahasiswa`, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      };

      xlsx(data, settings); // Will download the excel file
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

        let formatted_json = [];
        for (const iterator of json) {
          let quiz = [];
          for (const key in iterator) {
            if (key.startsWith("Q")) {
              quiz.push(Math.round(iterator[key]));
              delete iterator[key];
            }
          }

          let practice_or_project = [];
          for (const key in iterator) {
            if (key.startsWith("P") && !key.startsWith("PP")) {
              practice_or_project.push(Math.round(iterator[key]));
              delete iterator[key];
            }
          }

          let assignment = [];
          for (const key in iterator) {
            if (key.startsWith("A")) {
              assignment.push(Math.round(iterator[key]));
              delete iterator[key];
            }
          }

          let mid_exam = "";
          for (const key in iterator) {
            if (key.startsWith("MSE")) {
              mid_exam = iterator[key];
              delete iterator[key];
            }
          }

          let final_exam = "";
          for (const key in iterator) {
            if (key.startsWith("FSE")) {
              final_exam = iterator[key];
              delete iterator[key];
            }
          }

          let presentation = [];
          for (const key in iterator) {
            if (key.startsWith("PP")) {
              presentation.push(Math.round(iterator[key]));
              delete iterator[key];
            }
          }

          formatted_json.push({
            nim: iterator.NIM,
            name: iterator.Name,
            quiz: quiz,
            practice_or_project: practice_or_project,
            assignment: assignment,
            mid_exam: mid_exam,
            final_exam: final_exam,
            presentation: presentation,
          });
        }

        commit("SET_FORM_IMPORT_MAHASISWA_ASSESSMENT", formatted_json);
        console.log("json", json);
        console.log("formatted_json", formatted_json);
      };
      reader.readAsArrayBuffer(f);
    },
    async handleSubmit() {
      this.$store.dispatch("ImportAssessmentDetail", this.$route.params.id).then((res) => {
        if (res) {
          this.handleClose();
        }
      });
    },
  },
};
</script>
