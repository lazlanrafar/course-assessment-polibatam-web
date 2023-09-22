<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2 mt-3">
        <div class="col-sm-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">{{ header }}</li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ title }}
              </li>
            </ol>
          </nav>
          <h1>{{ title }}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MoleculesContentHeader",
  props: {
    header: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
};
</script>
