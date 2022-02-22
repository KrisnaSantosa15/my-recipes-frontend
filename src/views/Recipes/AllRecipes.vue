<template>
  <div class="container">
    <div
      class="alert alert-success alert-dismissible fade show mt-3"
      role="alert"
      v-if="$route.params.message"
    >
      <strong>{{ $route.params.message }}</strong>
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
    <div class="row">
      <form
        @submit.prevent="getRecipes()"
        class="row gy-3 d-flex justify-content-center"
      >
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
            id="search"
            v-model="search.recipe_name"
            placeholder="Type to search..."
          />
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-primary filter-button mb-3"
            data-bs-toggle="modal"
            data-bs-target="#filter"
          >
            Filter &nbsp;&nbsp;&nbsp; <icon :icon="['fas', 'bars-staggered']" />
          </button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="filter" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Advanced Search
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h3>Search By:</h3>
                <div>
                  <label for="category" class="form-label"
                    >Tingkat Kesulitan
                  </label>
                  <select
                    name="level"
                    v-model="search.level"
                    id="level"
                    class="form-select"
                    ref="level"
                  >
                    <option value="" disabled selected>
                      Pilih Tingkat Kesulitan
                    </option>
                    <option
                      v-for="level in levels"
                      :key="level.id"
                      :value="level.name"
                    >
                      {{ level.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="category" class="form-label"
                    >Kategori Masakan
                  </label>
                  <select
                    name="category"
                    v-model="search.category"
                    id="category"
                    class="form-select"
                    ref="category"
                  >
                    <option value="" disabled selected>Pilih Kategori</option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.category_name"
                    >
                      {{ category.category_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  @click="resetFilter"
                  class="btn btn-secondary"
                >
                  Reset
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div
      v-if="!recipesData.data?.length > 0"
      class="row justify-content-md-center"
    >
      <h1 class="text-center">Belum ada resep, buat resep?</h1>
      <router-link to="/add-recipe" style="color: salmon" class="text-center">
        + Tambah Resep
      </router-link>
    </div>
    <div v-else class="row">
      <h3 class="text-center fw-bold mt-3">Daftar Resep Masakan</h3>
      <Recipe
        v-for="recipe in recipesData.data"
        :key="recipe.id"
        :recipesData="recipe"
        @toggle-favorite="toggleFavorite"
      />
      <nav>
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            role="button"
            v-for="(link, index) in recipesData.meta?.links"
            :key="index"
            :class="[
              link.url === null ? 'disabled' : null,
              link.active ? 'active' : null,
            ]"
          >
            <a
              class="page-link"
              @click="getRecipes(link.url)"
              v-html="link.label"
            ></a>
          </li>
        </ul>
      </nav>
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
        category: null,
        level: null,
        // ingredients: null,
        recipe_name: null,
      },
      message: "",
      categories: [],
      levels: [],
    };
  },
  mounted() {
    this.getRecipes();
    this.getLevels();
    this.getCategories();
  },
  methods: {
    async toggleFavorite(recipeData) {
      if (recipeData.isFav) {
        await this.$swal({
          text:
            "Apakah anda yakin ingin menghilangkan tanda favorite " +
            recipeData.name +
            "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .get(
                "http://my-recipes-api.test/api/toggle-favorite/" +
                  recipeData.id,
                {
                  headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                  },
                }
              )
              .then((response) => {
                this.message = response.data.message;
                this.getRecipes(
                  "http://my-recipes-api.test/api/search?page=" +
                    this.recipesData.meta?.current_page
                );
                this.$swal(
                  "Success!",
                  "Resep berhasil dihilangkan dari favorite.",
                  "success"
                );
              })
              .catch((error) => {
                if (error.response) {
                  this.message = error.data.message;
                }
              });
          }
        });
      } else {
        axios
          .get(
            "http://my-recipes-api.test/api/toggle-favorite/" + recipeData.id,
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.message = response.data.message;
            this.getRecipes(
              "http://my-recipes-api.test/api/search?page=" +
                this.recipesData.meta?.current_page
            );
            this.$swal(
              "Success!",
              "Resep berhasil dibuat menjadi favorite.",
              "success"
            );
          })
          .catch((error) => {
            if (error.response) {
              this.message = error.data.message;
            }
          });
      }
    },
    async getRecipes(link = "http://my-recipes-api.test/api/search") {
      if (this.$store.state.token != null) {
        await axios
          .get(link, {
            params: this.search,
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then((response) => {
            this.recipesData = response.data;
          })
          .catch((error) => {
            console.log(error.response);
            if (
              error.response.status === 401 ||
              error.response.status === 404
            ) {
              this.$store.dispatch("clearToken");
              this.$router.push("/login");
            }
          });
      }
    },
    async getCategories() {
      await axios
        .get(`http://my-recipes-api.test/api/categories`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.$store.dispatch("clearToken");
            this.$router.push("/login");
          }
        });
    },
    async getLevels() {
      await axios
        .get(`http://my-recipes-api.test/api/levels`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.levels = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.$store.dispatch("clearToken");
            this.$router.push("/login");
          }
        });
    },
    resetFilter() {
      this.search.category = null;
      this.search.level = null;
      this.search.recipe_name = null;
    },
  },
};
</script>

<style></style>
