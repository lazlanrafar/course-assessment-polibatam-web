<template>
  <div id="app">
    <div class="wrapper">
      <app-topbar />
      <app-sidebar />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    AppTopbar: () => import("./components/app/topbar/index.vue"),
    AppSidebar: () => import("./components/app/sidebar/index.vue"),
  },
};
</script>
