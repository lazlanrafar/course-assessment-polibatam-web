<template>
  <div class="login-page">
    <v-app>
      <slot />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "LayoutAuth",
  components: {},
};
</script>

<style lang="scss">
.login-page {
  background-image: url("@/assets/bg.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
