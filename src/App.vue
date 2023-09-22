<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    localStorage.setItem("AdminLTE:IFrame:Options", JSON.stringify({ autoIframeMode: false, autoItemActive: false }));
  },
};
</script>

<style>
@import "@/assets/scss/app.scss";
</style>
