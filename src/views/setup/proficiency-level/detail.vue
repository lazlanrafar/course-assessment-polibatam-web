<template>
  <layout-app>
    <ContentHeader
      header="Setup"
      :title="`Proficiency Level ${report.level} (Detail)`"
    />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <div class="d-flex justify-content-end">
                  <v-text-field
                    label="Cari..."
                    style="max-width: 300px"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    dense
                    v-model="optionsTable.search"
                  />
                </div>
                <v-data-table
                  :headers="headers"
                  :items="report.details"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      icon
                      color="white"
                      class="bg-warning mr-2"
                      @click="handleUpdate(item.id)"
                    >
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <!-- <v-btn icon color="white" class="bg-danger" @click="handleDelete(item.id)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn> -->
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <v-dialog v-model="modalForm" persistent max-width="600">
      <FormDetail @handleModalForm="handleModalForm" />
    </v-dialog>
  </layout-app>
</template>

<script>
export default {
  name: "ProficiencyLevelPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    FormDetail: () => import("./form-detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "Level", value: "level" },
        { text: "Description", value: "description" },
        { text: "Lower Limit", value: "lower_limit" },
        { text: "Upper Limit", value: "upper_limit" },
        // { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.proficiencyLevel.isLoading;
    },
    report() {
      return this.$store.state.proficiencyLevel.report;
    },
    isAdmin() {
      return this.$store.state.app.user.is_admin;
    },
    optionsTable: {
      get() {
        return this.$store.state.proficiencyLevel.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_PROFICIENCY_LEVEL", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      this.modalForm = value;
    },
    handleUpdate(id) {
      this.$store.dispatch("SetFormUpdateProficiencyLevelDetail", id);
      this.$store.commit("SET_IS_UPDATE_DETAIL_PROFICIENCY_LEVEL", id);

      this.handleModalForm(true);
    },
  },
  mounted() {
    this.$store.dispatch("GetProficiencyLevelById", this.$route.params.id);

    if (this.isAdmin) {
      this.headers.push({
        text: "Action",
        value: "action",
        align: "right",
        sortable: false,
      });
    }
  },
};
</script>
