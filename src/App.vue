<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import appLayout from "./layouts/app-layout.vue";

export default {
  components: { appLayout },
  name: "App",
};
</script>
