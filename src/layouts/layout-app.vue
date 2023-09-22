<template>
  <div class="wrapper">
    <app-topbar />
    <app-sidebar />
    <div class="content-wrapper">
      <v-app>
        <slot />
      </v-app>
    </div>
    <app-footer />
  </div>
</template>

<script>
export default {
  name: "LayoutApp",
  components: {
    AppTopbar: () => import("@/components/app/topbar/index.vue"),
    AppSidebar: () => import("@/components/app/sidebar/index.vue"),
    AppFooter: () => import("@/components/app/footer/index.vue"),
  },
};
</script>
