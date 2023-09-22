<template>
  <div id="app">
    <div class="wrapper">
      <app-topbar />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    AppTopbar: () => import("./components/app/topbar/index.vue"),
  },
};
</script>
