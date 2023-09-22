<template>
  <div id="app">
    <layout-app>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem placeat, molestiae architecto perspiciatis at
        voluptatibus sed iusto. Fugiat at, quod, illum voluptatem excepturi neque assumenda, ea est iure amet officiis!
      </p>
    </layout-app>
  </div>
</template>

<script>
export default {
  components: {
    layoutApp: () => import("@/layouts/layout-app.vue"),
    // layoutAuth: () => import("@/layouts/layout-auth.vue"),
  },
  name: "App",
};
</script>
