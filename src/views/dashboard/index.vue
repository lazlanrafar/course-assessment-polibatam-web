<template>
  <layout-app>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>
              <img
                src="https://gifdb.com/images/high/waving-hand-hi-emoticon-5ogrlew1e9zb3p5m.gif"
                alt="hand"
                width="40"
              />
              Welcome
            </h1>
          </div>
        </div>
      </div>
    </section>

    <div class="content">
      <div class="container-fluid">
        <div class="card shadow-none border">
          <div class="card-body">
            <h1 class="mb-5 h5">Aplikasi Pengukuran Ketercapaian Capaian Pembelajaran</h1>
            <p>
              Pengukuran Capaian Pembelajaran (CP) adalah proses penting dalam pendidikan untuk menilai sejauh mana
              peserta didik mencapai tujuan pembelajaran yang telah ditetapkan. CP yang berbasis outcome lebih
              menekankan pada hasil yang dapat diukur daripada hanya memperhatikan proses pembelajaran. Pentingnya
              pengukuran CP termasuk memungkinkan meningkatkan kualitas pembelajaran, dan membantu peserta didik
              memahami pencapaian mereka.
            </p>
            <p>
              Keunggulan utama dari pendekatan berbasis outcome adalah objektivitas. Hasil yang diukur dapat
              diekspresikan dalam data numerik, yang kurang rentan terhadap penilaian subjektif atau bias. Selain itu,
              outcome pembelajaran yang jelas dan terukur memfasilitasi perbandingan dengan tujuan yang telah
              ditetapkan, sehingga memudahkan penilaian kemajuan.
            </p>

            <p>Source Code</p>
            <ul>
              <li>
                Frontend :
                <a
                  href="https://github.com/lazlanrafar/course-assessment-polibatam-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  >https://github.com/lazlanrafar/course-assessment-polibatam-web
                </a>
              </li>
              <li>
                Backend :
                <a
                  href="https://github.com/lazlanrafar/course-assessment-polibatam-be"
                  target="_blank"
                  rel="noopener noreferrer"
                  >https://github.com/lazlanrafar/course-assessment-polibatam-be
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="row">
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
        </div> -->
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
