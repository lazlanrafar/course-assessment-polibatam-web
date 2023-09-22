<template>
  <layout-auth>
    <div class="card card-outline card-navy" style="width: clamp(300px, 350px, 500px)">
      <div class="card-header text-center py-5">
        <img src="@/assets/logo.svg" width="90" alt="" />
      </div>
      <div class="card-body text-left">
        <p class="login-box-msg">Sign in to start your session</p>

        <v-form ref="initialReport" @submit.prevent="handleSubmit">
          <div class="">
            <v-text-field
              label="username"
              v-model="username"
              dense
              outlined
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'username');
                },
              ]"
            />
          </div>
          <div class="">
            <v-text-field
              label="password"
              v-model="password"
              dense
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :rules="[
                (value) => {
                  return genericRequiredRule(value, 'password');
                },
              ]"
            />
          </div>
          <div class="row">
            <div class="col-12">
              <v-btn type="submit" class="btn bg-navy btn-block" :loading="isLoading"> Sign In </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </layout-auth>
</template>

<script>
import validationRules from "@/mixins/validation-rules";

export default {
  name: "LoginPage",
  mixins: [validationRules],
  components: {
    LayoutAuth: () => import("@/layouts/layout-auth.vue"),
  },
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading;
    },
    username: {
      get() {
        return this.$store.state.app.login.username;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "username",
          value,
        });
      },
    },
    password: {
      get() {
        return this.$store.state.app.login.password;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "password",
          value,
        });
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.$refs.initialReport.validate()) {
        this.$store.dispatch("Login").then((response) => {
          if (response) this.$router.push("/dashboard");
        });
      }
    },
  },
};
</script>
