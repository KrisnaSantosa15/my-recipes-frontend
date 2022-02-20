<template>
  <div class="container">
    <div class="row">
      <div
        class="alert alert-success alert-dismissible fade show mt-3"
        role="alert"
        v-if="$route.params.message"
      >
        <strong>Success!</strong> {{ $route.params.message }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div
        class="alert alert-success alert-dismissible fade show mt-3"
        role="alert"
        v-if="message"
      >
        <strong> {{ message }}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <form class="row gy-3 d-flex justify-content-center">
        <div class="col-3">
          <router-link
            to="/add-recipe"
            class="btn btn-primary mb-3 custom-button"
          >
            <icon :icon="['fas', 'plus']" /> Tambah Resep
          </router-link>
        </div>
        <div class="col-4">
          <input
            class="form-control"
            list="datalistOptions"
            id="exampleDataList"
            v-model="search.category"
            placeholder="Type to search..."
          />
          <datalist id="datalistOptions">
            <option value="San Francisco"></option>
            <option value="New York"></option>
          </datalist>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-primary filter-button mb-3">
            Filter &nbsp;&nbsp;&nbsp; <icon :icon="['fas', 'bars-staggered']" />
          </button>
        </div>
      </form>
      <h3 class="text-center fw-bold mt-3">Daftar Resep Masakan</h3>
      <Recipe
        v-for="recipe in recipesData.data"
        :key="recipe.id"
        :recipesData="recipe"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Recipe from "@/components/Recipe.vue";
import axios from "axios";

export default {
  name: "Recipes",
  components: {
    Recipe,
  },
  data() {
    return {
      recipesData: {},
      search: {
        category: "",
        name: "",
        level: "",
      },
      message: "",
    };
  },
  mounted() {
    this.getRecipes();
  },
  methods: {
    async toggleFavorite(recipeId) {
      if (this.$store.state.token != null) {
        await axios
          .get("http://my-recipes-api.test/api/toggle-favorite/" + recipeId, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then((response) => {
            this.message = response.data.message;
            this.getRecipes();
          })
          .catch((error) => {
            if (error.response) {
              this.message = error.data.message;
            }
          });
      }
    },
    async getRecipes() {
      if (this.$store.state.token != null) {
        await axios
          .post(
            "http://my-recipes-api.test/api/search",
            {},
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.recipesData = response.data;
          })
          .catch((error) => {
            if (
              error.response.status === 401 ||
              error.response.status === 404
            ) {
              this.$store.dispatch("clearToken");
              this.$router.push("/login");
            }
          });
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>
