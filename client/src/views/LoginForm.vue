<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="login-card" elevation="8">
          <!-- Logo/Brand Section -->
          <v-card-text class="text-center pt-8">
            <v-avatar size="80" color="primary" class="mb-4">
              <v-icon size="40" color="white">mdi-account</v-icon>
            </v-avatar>
            <h1 class="text-h4 font-weight-bold primary--text mb-2">Welcome Back</h1>
            <p class="text-subtitle-1 grey--text">Please sign in to continue</p>
          </v-card-text>

          <v-card-text class="pt-4">
            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <!-- Email Field -->
              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                filled
                rounded
                dense
                color="primary"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
                class="mb-4"
                required
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="formData.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                filled
                rounded
                dense
                color="primary"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
                class="mb-2"
                required
              ></v-text-field>


              <!-- Error Alert -->
              <v-alert
                v-if="error"
                type="error"
                dense
                text
                class="mb-4"
              >
                {{ error }}
              </v-alert>

              <!-- Login Button -->
              <v-btn
                block
                x-large
                rounded
                color="primary"
                height="50"
                :loading="loading"
                :disabled="loading"
                @click="handleLogin"
                class="mb-6"
              >
                <v-icon left>mdi-login</v-icon>
                Sign In
              </v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      loading: false,
      error: null,
      showPassword: false,
      rememberMe: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ],
      socialLogins: [
        { name: 'google', icon: 'mdi-google', color: 'red' },
        { name: 'facebook', icon: 'mdi-facebook', color: 'blue' },
        { name: 'twitter', icon: 'mdi-twitter', color: 'light-blue' }
      ]
    };
  },

  methods: {
    ...mapActions('users', ['login']),

    async handleLogin() {
      if (!this.$refs.loginForm.validate()) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        const response = await this.login(this.formData);
        
        if (response.success) {
          this.$router.push('/dashboard');
        } else {
          this.error = response.message || 'Login failed';
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },

    forgotPassword() {
      this.$router.push('/forgot-password');
    },

    goToSignup() {
      this.$router.push('/signup');
    },

    socialLogin(provider) {
      console.log(`Logging in with ${provider}`);
      // Implement social login logic here
    }
  },

  created() {
    if (this.$store.getters['users/isAuthenticated']) {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.login-card {
  border-radius: 16px;
}

.v-card__text {
  padding: 24px 32px;
}

@media (max-width: 600px) {
  .v-card__text {
    padding: 16px 24px;
  }
}
</style>