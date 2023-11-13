<template>
  <layout-app>
    <ContentHeader header="Utility" title="User Management" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none border">
              <div class="card-body">
                <div class="row justify-content-end">
                  <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
                    <label class="fw-medium fs-14 mb-3">Search</label>
                    <v-text-field
                      outlined
                      dense
                      prepend-inner-icon="mdi-magnify"
                      placeholder="Cari..."
                      v-model="optionsTable.search"
                    />
                  </div>
                </div>

                <v-data-table
                  :headers="headers"
                  :items="reports"
                  :loading="isLoading"
                  :options.sync="optionsTable"
                  :search="optionsTable.search"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn icon color="white" class="bg-primary mr-2" @click="handleModalDetail(true, item.NIP)">
                      <v-icon small>mdi-eye</v-icon>
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

    <v-dialog v-model="modalDetail" persistent max-width="800">
      <Detail @handleModalDetail="handleModalDetail" />
    </v-dialog>
  </layout-app>
</template>

<script>
export default {
  name: "UserManagementPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
    ContentHeader: () => import("@/components/molecules/content-header.vue"),
    Detail: () => import("./detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "NO" },
        { text: "NIP", value: "NIP" },
        { text: "Nama", value: "NAMA" },
        { text: "Staff", value: "STAFF" },
        { text: "Unit", value: "UNIT" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalDetail: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.userManagement.isLoading.reports;
    },
    reports() {
      return this.$store.state.userManagement.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.userManagement.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_USER_MANAGEMENT", value);
      },
    },
  },
  methods: {
    handleModalDetail(value, nip) {
      if (value) this.$store.dispatch("GetPegawaiByNIP", nip);
      this.modalDetail = value;
    },
  },
  mounted() {
    this.$store.dispatch("GetUserManagement");
  },
};
</script>
