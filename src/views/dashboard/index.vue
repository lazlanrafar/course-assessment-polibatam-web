<template>
  <layout-app>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </section>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box shadow-none bg-gradient-info">
              <span class="info-box-icon"><i class="far fa-bookmark"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Bookmarks</span>
                <span class="info-box-number">41,410</span>
                <div class="progress">
                  <div class="progress-bar" style="width: 70%"></div>
                </div>
                <span class="progress-description"> 70% Increase in 30 Days </span>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box shadow-none bg-gradient-success">
              <span class="info-box-icon"><i class="far fa-thumbs-up"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Likes</span>
                <span class="info-box-number">41,410</span>
                <div class="progress">
                  <div class="progress-bar" style="width: 70%"></div>
                </div>
                <span class="progress-description"> 70% Increase in 30 Days </span>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box shadow-none bg-gradient-warning">
              <span class="info-box-icon"><i class="far fa-calendar-alt"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Events</span>
                <span class="info-box-number">41,410</span>
                <div class="progress">
                  <div class="progress-bar" style="width: 70%"></div>
                </div>
                <span class="progress-description"> 70% Increase in 30 Days </span>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box shadow-none bg-gradient-danger">
              <span class="info-box-icon"><i class="fas fa-comments"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Comments</span>
                <span class="info-box-number">41,410</span>
                <div class="progress">
                  <div class="progress-bar" style="width: 70%"></div>
                </div>
                <span class="progress-description"> 70% Increase in 30 Days </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
