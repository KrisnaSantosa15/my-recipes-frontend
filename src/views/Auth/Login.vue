<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-auto">
        <h5 class="text-center fw-bold">Buku Resep 79</h5>
        <!-- insert small image, and make it center -->
        <div class="d-flex justify-content-center">
          <img
            :src="image"
            alt="Avatar"
            style="width: 100px"
            class="text-center img-fluid mb-5"
          />
        </div>
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
          v-if="errorMessage.isError"
        >
          <strong>Error!</strong> {{ errorMessage.message }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
          v-if="$route.params.message"
        >
          <strong>Woow !</strong> {{ $route.params.message }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
          v-if="$route.params.error"
        >
          <strong> Error !</strong> {{ $route.params.error }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div class="card" style="width: 30rem">
          <div class="card-header text-center">Login</div>
          <div class="m-3 px-5">
            <form @submit.prevent="onSubmit">
              <label for="username" class="form-label my-1">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
                v-model.trim="credentials.username"
                @blur="validateUsername"
                ref="username"
              />
              <div class="invalid-feedback">
                <ul>
                  <li v-for="item in errors.username" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
              <label for="username" class="form-label my-1 mt-2"
                >Password</label
              >
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  id="password"
                  v-model.trim="credentials.password"
                  @blur="validatePassword"
                  ref="password"
                />
                <button
                  class="btn btn-outline-secondary"
                  @click="togglePassword"
                  type="button"
                >
                  <icon v-if="isVisible" :icon="['far', 'eye']" />
                  <icon v-else :icon="['far', 'eye-slash']" />
                </button>
                <div class="invalid-feedback">
                  <ul>
                    <li v-for="item in errors.password" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-grid gap-2 my-3">
                <button class="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
            <p class="fw-bold text-center">
              Belum punya akun?
              <router-link to="/register" style="color: salmon">
                Daftar Disini</router-link
              >
            </p>
            <div class="d-flex justify-content-between px-5">
              <router-link to="/about" style="color: salmon">
                About</router-link
              >
              <router-link to="/contact" style="color: salmon">
                Contact</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/assets/logo.png";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      image: Logo,
      credentials: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
      errorMessage: {
        isError: false,
        message: "",
      },
      isVisible: false,
    };
  },
  mounted() {
    if (this.$store.state.token != null) {
      this.$router.push("/recipes");
    }
  },
  methods: {
    onSubmit() {
      axios
        .post(this.$urlApi + "login", this.credentials)
        .then((response) => {
          if (response.data.access_token) {
            this.$store.dispatch("setToken", response.data.access_token);
            this.$router.push("/recipes");
          }
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.errorMessage.isError = true;
            this.errorMessage.message = error.response.data.message;
          } else {
            this.errors.username = error.response.data.errors.username;
            this.$refs.username.classList.add("is-invalid");
            this.errors.password = error.response.data.errors.password;
            this.$refs.password.classList.add("is-invalid");
          }
        });
    },
    togglePassword() {
      const input = this.$refs.password;
      if (input.type === "password") {
        input.type = "text";
        this.isVisible = true;
      } else {
        input.type = "password";
        this.isVisible = false;
      }
    },
    validateUsername() {
      if (this.credentials.username.length < 3) {
        this.$refs.username.classList.add("is-invalid");
        this.errors.username = ["Username minimal 3 karakter"];
      } else {
        this.$refs.username.classList.remove("is-invalid");
        this.$refs.username.classList.add("is-valid");
      }
    },
    validatePassword() {
      if (this.credentials.password.length < 8) {
        this.$refs.password.classList.add("is-invalid");
        this.errors.password = ["Password minimal 8 karakter"];
      } else {
        this.$refs.password.classList.remove("is-invalid");
        this.$refs.password.classList.add("is-valid");
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card-header {
  background-color: salmon;
  font-weight: bold;
  color: white;
}
.card {
  box-shadow: 0px 5px 4px 0px rgba(87, 84, 84, 0.75);
  -webkit-box-shadow: 0px 5px 4px 0px rgba(87, 84, 84, 0.75);
  -moz-box-shadow: 0px 5px 4px 0px rgba(87, 84, 84, 0.75);
}
.btn.btn-primary {
  background-color: lightseagreen;
  border-color: lightseagreen;
  color: white;
}
.btn.btn-outline-secondary,
.btn.btn-outline-secondary:hover,
.btn.btn-outline-secondary:active,
.btn.btn-outline-secondary:focus,
.btn.btn-outline-secondary:target {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  background-color: transparent;
  color: grey;
}
</style>
