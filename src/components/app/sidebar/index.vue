<template>
  <aside class="main-sidebar sidebar-light-navy border-right">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="@/assets/logo.svg" alt="AdminLTE Logo" class="brand-image" />
      <span class="brand-text fw-medium">CLO Polibatam</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column nav-legacy nav-child-indent"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-header">MAIN</li>
          <li class="nav-item menu-open">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-header">SETUP</li>
          <li class="nav-item">
            <a href="pages/calendar.html" class="nav-link">
              <i class="nav-icon far fa-calendar-alt"></i>
              <p>Calendar</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AppSidebar",
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
};
</script>
