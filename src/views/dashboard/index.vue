<template>
  <layout-app>
    <p>Dashboard</p>
  </layout-app>
</template>

<script>
export default {
  name: "DashboardPage",
  components: {
    LayoutApp: () => import("@/layouts/layout-app.vue"),
  },
};
</script>
