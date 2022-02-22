<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img
          :src="image"
          alt="Avatar"
          style="width: 40px"
          class="text-center"
        />
        Buku Resep 79
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample07"
        aria-controls="navbarsExample07"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarsExample07"
      >
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link mx-3" to="/recipes">
              Daftar Resep Masakan
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-3" to="/my-recipes">
              Resep Saya
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-3" to="/my-favorites">
              Resep Favorit
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown07"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <icon :icon="['fas', 'circle-user']" size="lg" />
            </a>
            <ul class="dropdown-menu">
              <li>
                <a
                  href="#"
                  class="dropdown-item"
                  style="color: grey"
                  @click="logout"
                  >Logout</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import Logo from "@/assets/logo.png";
export default {
  name: "Navbar",
  data() {
    return {
      image: Logo,
    };
  },
  methods: {
    logout() {
      axios
        .post(
          "http://my-recipes-api.test/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.$store.dispatch("clearToken");
          this.$router.push({
            name: "login",
            params: { message: "Logout Success" },
          });
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.$store.dispatch("clearToken");
            this.$router.push({
              name: "login",
              params: { error: "whoops, an error encountered" },
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.navbar.navbar-expand-lg.navbar-dark.bg-dark {
  background-color: salmon !important;
}
</style>
