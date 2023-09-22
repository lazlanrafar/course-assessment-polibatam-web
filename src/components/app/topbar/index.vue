<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown user user-menu">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            class="user-image img-circle"
            alt="User Image"
          />
          <span class="hidden-xs fw-medium" style="color: black">
            <!-- {{ user.name }} -->
            Udin
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div class="dropdown-divider"></div>
          <button class="dropdown-item text-danger" @click="handleLogout()">
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppTopbar",
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$store.commit("SET_USER_APP", "");
      this.$store.commit("SET_TOKEN_APP", "");
      this.$router.push("/login");

      window.location.reload();
    },
  },
};
</script>
