<template>
  <layout-auth>
    <p>Login</p>
  </layout-auth>
</template>

<script>
export default {
  name: "LoginPage",
  components: {
    LayoutAuth: () => import("@/layouts/layout-auth.vue"),
  },
};
</script>
```
