<template>
  <div class="container">
    <div
      v-if="!recipesData.data?.length > 0"
      class="row justify-content-md-center"
    >
      <h1 class="text-center">Anda tidak memiliki resep favorite</h1>
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
      <h3 class="text-center fw-bold mt-3">Resep Favorite</h3>
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
  name: "MyFavorites",
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
    this.getMyFavorites();
  },
  methods: {
    async toggleFavorite(recipeId) {
      await axios
        .get("http://my-recipes-api.test/api/toggle-favorite/" + recipeId, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.message = response.data.message;
          this.getMyFavorites();
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.data.message;
          }
        });
    },
    async getMyFavorites() {
      if (this.$store.state.token != null) {
        await axios
          .get("http://my-recipes-api.test/api/user-favorites", {
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
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
