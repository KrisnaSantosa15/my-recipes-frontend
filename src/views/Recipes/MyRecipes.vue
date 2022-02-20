<template>
  <div class="container">
    <div
      v-if="!recipesData.data?.length > 0"
      class="row d-flex justify-content-md-center"
    >
      <h1 class="text-center">Anda tidak memiliki resep, Buat resep baru</h1>
      <router-link to="/add-recipe" style="color: salmon" class="text-center">
        + Tambah Resep
      </router-link>
    </div>

    <div v-else class="row">
      <div
        class="alert alert-warning alert-dismissible fade show mt-3"
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
      <h3 class="text-center fw-bold mt-3">Resep Saya</h3>
      <Recipe
        v-for="recipe in recipesData.data"
        :key="recipe.id"
        :recipesData="recipe"
        @toggle-favorite="toggleFavorite"
        @delete-recipe="deleteRecipe"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Recipe from "@/components/Recipe.vue";
import axios from "axios";

export default {
  name: "MyRecipes",
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
    if (this.$store.state.token != null) {
      this.getMyRecipes();
    } else {
      this.$router.push({
        name: "login",
        params: { error: "Anda harus login terlebih dahulu" },
      });
    }
  },
  methods: {
    async deleteRecipe(recipeId) {
      await axios
        .delete(`http://my-recipes-api.test/api/recipes/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.message = response.data.message;
          this.getMyRecipes();
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.data.message;
          }
        });
    },
    async toggleFavorite(recipeId) {
      await axios
        .get("http://my-recipes-api.test/api/toggle-favorite/" + recipeId, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.message = response.data.message;
          this.getMyRecipes();
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.data.message;
          }
        });
    },
    async getMyRecipes() {
      await axios
        .get("http://my-recipes-api.test/api/recipes/user-recipes", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.recipesData = response.data;
        })
        .catch((error) => {
          if (error.response) {
            this.$store.dispatch("clearToken");
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>
