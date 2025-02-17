<template>
  <v-container class="fill-height" fluid style="background-color: #124829;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="login-card" elevation="8">
          <v-row no-gutters>
            <!-- Left Column - Illustration Section -->
            <v-col cols="12" md="6" class="pa-8 position-relative">
              <div class="illustration-container">
                <div class="blob-background"></div>
                <v-img
                  src="@/assets/store_logo.png"
                  contain
                  height="300"
                  class="login-illustration"
                ></v-img>
              </div>
            </v-col>

            <!-- Right Column - Login Form -->
            <v-col cols="12" md="6" class="pa-8">
              <div class="mb-6">
                <!-- <v-avatar size="64" class="mb-4">
                  <v-img src="@/assets/store_logo.png"></v-img>
                </v-avatar> -->
                <h1 class="text-h4 font-weight-bold">Login</h1>
              </div>

              <v-form @submit.prevent="handleLogin" ref="loginForm">
                <v-text-field
                  v-model="formData.email"
                  label="Username"
                  outlined
                  dense
                  color="success"
                  class="mb-4"
                  prepend-inner-icon="mdi-account"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="formData.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  dense
                  color="success"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  class="mb-2"
                  required
                ></v-text-field>

                <!-- <div class="text-right mb-6">
                  <a class="text-decoration-none grey--text text--darken-1">Forgot Password?</a>
                </div> -->

                <v-btn
                  block
                  x-large
                  color="primary"
                  height="44"
                  :loading="loading"
                  :disabled="loading"
                  @click="handleLogin"
                  class="rounded-lg"
                >
                  LOGIN
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",

  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      loading: false,
      error: null,
      showPassword: false,
      rememberMe: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },

  methods: {
    ...mapActions("users", ["login"]),

    async handleLogin() {
      if (!this.$refs.loginForm.validate()) return;

      this.loading = true;
      this.error = null;

      try {
        const response = await this.login(this.formData);

        console.log(response)
        if (response.success) {
          if(response.user.role === 'cashier'){
            this.$router.push("/pos");
          } else {
            this.$router.push("/dashboard");
          }
        } else {
          this.error = response.message || "Login failed";
        }
      } catch (error) {
        this.error = error.response?.data?.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },

    forgotPassword() {
      this.$router.push("/forgot-password");
    },
  },

  created() {
    if (this.$store.getters["users/isAuthenticated"]) {
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style scoped>
.login-card {
  border-radius: 24px;
  overflow: hidden;
}

.illustration-container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blob-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  z-index: 1;
}

.login-illustration {
  position: relative;
  z-index: 2;
}

@media (max-width: 960px) {
  .illustration-container {
    height: 300px;
  }
}
</style>