<template>
  <td :class="+value == 100 ? 'table-success' : +value == 0 ? 'table-danger' : ''">
    {{ value }}
  </td>
</template>

<script>
export default {
  name: "TableTdCustom",
  props: ["value"],
};
</script>
