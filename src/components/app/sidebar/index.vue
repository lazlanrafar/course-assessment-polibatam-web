<template>
  <aside class="main-sidebar sidebar-light-navy border-right">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">
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
          <li v-for="(item, i) in sidebar_menus" :key="i" :class="`${item.header ? 'nav-header' : 'nav-item'}`">
            <span v-if="item.header">{{ item.header }}</span>

            <router-link v-else :to="item.link" class="nav-link">
              <i :class="`nav-icon mr-2 ${item.icon}`"></i>
              <p>{{ item.title }}</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      sidebar_menus: require("@/constants/sidebar_menus").default,
    };
  },
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
};
</script>
