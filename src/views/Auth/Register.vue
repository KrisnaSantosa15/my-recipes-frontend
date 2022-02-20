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
        <div class="card" style="width: 30rem">
          <div class="card-header text-center">Register</div>
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
              <!-- for full name -->
              <label for="full_name" class="form-label my-1">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="full_name"
                placeholder="Full Name"
                v-model.trim="credentials.full_name"
                @blur="validatefull_name"
                ref="full_name"
              />
              <div class="invalid-feedback">
                <ul>
                  <li v-for="item in errors.full_name" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
              <!-- for password -->
              <label for="password" class="form-label my-1 mt-2"
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
                  <icon v-if="isVisible.password" :icon="['far', 'eye']" />
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
              <label for="password_confirmation" class="form-label my-1 mt-2"
                >Confirm Passowrd</label
              >
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  id="password_confirmation"
                  v-model.trim="credentials.password_confirmation"
                  @blur="validatepassword_confirmation"
                  ref="password_confirmation"
                />
                <button
                  class="btn btn-outline-secondary"
                  @click="togglePasswordConfirm"
                  type="button"
                >
                  <icon v-if="isVisible.confirm" :icon="['far', 'eye']" />
                  <icon v-else :icon="['far', 'eye-slash']" />
                </button>
                <div class="invalid-feedback">
                  <ul>
                    <li
                      v-for="item in errors.password_confirmation"
                      :key="item"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-grid gap-2 my-3">
                <button class="btn btn-primary" type="submit">Daftar</button>
              </div>
            </form>
            <p class="fw-bold text-center">
              <router-link to="/login" style="color: salmon">
                Batal, Kembali ke halaman Login</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../../assets/logo.png";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      image: Logo,
      credentials: {
        username: "",
        password: "",
        password_confirmation: "",
        full_name: "",
      },
      errors: {
        username: "",
        password: "",
        password_confirmation: "",
        full_name: "",
      },
      errorMessage: {
        isError: false,
        message: "",
      },
      isVisible: {
        confirm: false,
        password: false,
      },
    };
  },
  mounted() {
    if (this.$store.state.token != null) {
      this.$router.push("/recipes");
    }
  },
  methods: {
    async onSubmit() {
      await axios
        .post("http://my-recipes-api.test/api/register", this.credentials)
        .then((response) => {
          if (response.data.message) {
            this.$router.push({
              name: "login",
              params: { message: response.data.message },
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.errorMessage.isError = true;
            this.errorMessage.message = error.response.data.message;
          } else {
            this.errors.username = error.response.data.errors.username;
            this.$refs.username.classList.add("is-invalid");
            this.errors.full_name = error.response.data.errors.full_name;
            this.$refs.full_name.classList.add("is-invalid");
            this.errors.password = error.response.data.errors.password;
            this.$refs.password.classList.add("is-invalid");
            console.log(error.response.data);
          }
        });
    },
    togglePassword() {
      const input = this.$refs.password;
      if (input.type === "password") {
        input.type = "text";
        this.isVisble.password = true;
      } else {
        input.type = "password";
        this.isVisible.password = false;
      }
    },
    togglePasswordConfirm() {
      const input = this.$refs.password_confirmation;
      if (input.type === "password") {
        input.type = "text";
        this.isVisble.confirm = true;
      } else {
        input.type = "password";
        this.isVisible.confirm = false;
      }
    },
    validateUsername() {
      // check if username field contain space
      if (this.credentials.username.length < 3) {
        this.$refs.username.classList.add("is-invalid");
        this.errors.username = ["Username minimal 3 karakter"];
      } else if (this.credentials.username.indexOf(" ") >= 0) {
        this.errors.username = ["Username tidak boleh mengandung spasi"];
        this.$refs.username.classList.add("is-invalid");
      } else {
        this.$refs.username.classList.remove("is-invalid");
        this.$refs.username.classList.add("is-valid");
      }
    },
    validatefull_name() {
      if (this.credentials.full_name.length < 2) {
        this.$refs.full_name.classList.add("is-invalid");
        this.errors.full_name = ["Full Name minimal 2 karakter"];
      } else {
        this.$refs.full_name.classList.remove("is-invalid");
        this.$refs.full_name.classList.add("is-valid");
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
    validatepassword_confirmation() {
      if (
        this.credentials.password_confirmation !== this.credentials.password ||
        this.credentials.password_confirmation.length < 3
      ) {
        this.$refs.password_confirmation.classList.add("is-invalid");
        this.errors.password_confirmation = ["Password tidak sesuai"];
      } else {
        this.$refs.password_confirmation.classList.remove("is-invalid");
        this.$refs.password_confirmation.classList.add("is-valid");
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
