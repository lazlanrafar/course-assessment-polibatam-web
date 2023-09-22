<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    token() {
      return this.$store.state.app.token;
    },
  },
  created() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      this.$store.commit("SET_TOKEN_APP", token);
      this.$store.commit("SET_USER_APP", JSON.parse(user));
    }
  },
  mounted() {
    localStorage.setItem("AdminLTE:IFrame:Options", JSON.stringify({ autoIframeMode: false, autoItemActive: false }));
  },
};
</script>

<style>
@import "@/assets/scss/app.scss";
</style>
