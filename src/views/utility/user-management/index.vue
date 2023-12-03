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
                  <template v-slot:[`item.is_admin`]="{ item }">
                    <v-chip
                      :color="item.is_admin ? 'success' : 'red'"
                      dark
                      small
                      >{{ item.is_admin ? "ADMIN" : "USER" }}</v-chip
                    >
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-menu offset-y left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          class="btn btn-outline-primary py-4"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <span class="fw-light mr-1">Action</span>
                          <i class="fa-solid fa-chevron-down"></i>
                        </v-btn>
                      </template>
                      <v-list min-width="150">
                        <v-list-item @click="handleDetail(true, item.NIP)">
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-eye mr-2"></i>
                            <span>Detail</span>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="handleSetAdmin(item.NIP)"
                          v-if="!item.is_admin && isAdmin"
                        >
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-edit mr-2"></i>
                            <span> Set as Admin </span>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="handleSetNotAdmin(item.NIP)"
                          v-if="item.is_admin && isAdmin"
                        >
                          <v-list-item-title class="text-primary fs-12">
                            <i class="fas fa-edit mr-2"></i>
                            <span> Set as Pegawai </span>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <v-dialog v-model="modalDetail" persistent max-width="800">
      <Detail @handleDetail="handleDetail" />
    </v-dialog>
  </layout-app>
</template>

<script>
import Swal from "sweetalert2";

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
        { text: "Role", value: "is_admin" },
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
    isAdmin() {
      return this.$store.state.app.user.is_admin;
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
    handleDetail(value, nip) {
      if (value) this.$store.dispatch("GetPegawaiByNIP", nip);
      this.modalDetail = value;
    },
    handleSetAdmin(nip) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Change Role",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("SetPegawaiAsAdmin", nip);
        }
      });
    },
    handleSetNotAdmin(nip) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Change Role",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("SetPegawaiAsNotAdmin", nip);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetUserManagement");
  },
};
</script>
