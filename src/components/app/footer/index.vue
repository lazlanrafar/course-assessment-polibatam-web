<template>
  <footer class="main-footer">
    <strong>Copyright &copy; {{ year }} <a href="https://lazlanrafar.vercel.app/">L Azlan Rafar</a>.</strong>
    All rights reserved.
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
