<template>
  <div id="app">
    <div class="wrapper">
      <app-topbar />
      <app-sidebar />
      <div class="content-wrapper">
        <router-view />
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    AppTopbar: () => import("./components/app/topbar/index.vue"),
    AppSidebar: () => import("./components/app/sidebar/index.vue"),
    AppFooter: () => import("./components/app/footer/index.vue"),
  },
};
</script>
