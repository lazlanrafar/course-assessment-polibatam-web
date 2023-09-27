<template>
  <div>
    <table class="fs-14" style="line-height: 1.5rem">
      <tr v-for="(item, i) in items" :key="i" class="d-flex d-sm-table-row flex-column mb-3">
        <td class="fw-medium" style="min-width: 150px">{{ item.label }}</td>
        <td class="d-none d-sm-table-cell" style="min-width: 20px">:</td>
        <td>{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableCustom",
  props: {
    items: {
      type: Array,
      require: true,
    },
  },
};
</script>
