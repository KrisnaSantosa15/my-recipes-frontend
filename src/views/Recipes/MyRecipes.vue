<template>
  <div class="container">
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
    <div class="row">
      <form
        @submit.prevent="getMyRecipes()"
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
        <div class="col-4 inner-addon left-addon">
          <icon
            :icon="['fas', 'magnifying-glass']"
            class="search-icon form-control-feedback"
            size="lg"
            @click="getMyRecipes()"
          />
          <input
            class="form-control"
            id="search"
            v-model="search.recipe_name"
            placeholder="Cari Resep"
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
              <div class="modal-body gy-2 gx-3 align-items-center">
                <div class="row">
                  <div class="col-auto">
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
                  <div class="col-auto">
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
                <h5 class="mt-2">Cari berdasarkan:</h5>
                <div class="row m-1">
                  <div class="form-check form-check-inline col-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      v-model="search.ingredients"
                    />
                    <label class="form-check-label" for="inlineCheckbox1"
                      >Bahan - bahan</label
                    >
                  </div>
                  <div class="form-check form-check-inline col-auto">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      v-model="search.how_to_cook"
                    />
                    <label class="form-check-label" for="inlineCheckbox2"
                      >Cara Memasak</label
                    >
                  </div>
                </div>
                <h5 class="mt-2">Waktu memasak:</h5>
                <div class="row m-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="1to10"
                      value="1to10"
                      v-model="search.timeBetween"
                    />
                    <label class="form-check-label" for="1to10">
                      1 sampai 10 Menit
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="10to30"
                      value="10to30"
                      v-model="search.timeBetween"
                    />
                    <label class="form-check-label" for="10to30">
                      10 sampai 30 Menit
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="30to60"
                      value="30to60"
                      v-model="search.timeBetween"
                    />
                    <label class="form-check-label" for="30to60">
                      30 Menit sampai 1 Jam
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="60"
                      value="60to999999999"
                      v-model="search.timeBetween"
                    />
                    <label class="form-check-label" for="60"> > 1 Jam </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="180"
                      value="180to999999999"
                      v-model="search.timeBetween"
                    />
                    <label class="form-check-label" for="180"> > 3 Jam </label>
                  </div>
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
    <div v-if="isLoading" class="text-center mt-5">
      <div
        class="spinner-grow spinner-grow-lg"
        role="status"
        aria-hidden="true"
      ></div>
      <div>Sedang Mendapatkan data...</div>
    </div>
    <div
      v-else-if="!recipesData.data?.length > 0"
      class="row d-flex justify-content-md-center"
    >
      <h1 class="text-center">Anda tidak memiliki resep, Buat resep baru</h1>
      <router-link to="/add-recipe" style="color: salmon" class="text-center">
        + Tambah Resep
      </router-link>
    </div>
    <div v-else class="row">
      <h3 class="text-center fw-bold mt-3">Resep Saya</h3>
      <Recipe
        v-for="recipe in recipesData.data"
        :key="recipe.id"
        :recipesData="recipe"
        @toggle-favorite="toggleFavorite"
        @delete-recipe="deleteRecipe"
      />
      <nav
        v-if="recipesData.links?.next != null || recipesData.links.prev != null"
      >
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
              @click="getMyRecipes(link.url)"
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
  name: "MyRecipes",
  components: {
    Recipe,
  },
  data() {
    return {
      recipesData: {},
      search: {
        recipe_name: null,
        category: null,
        level: null,
        timeBetween: null,
        ingredients: false,
        how_to_cook: false,
      },
      message: "",
      categories: [],
      levels: [],
      isLoading: true,
    };
  },
  mounted() {
    if (this.$store.state.token != null) {
      this.getMyRecipes();
      this.getLevels();
      this.getCategories();
    } else {
      this.$router.push({
        name: "login",
        params: { error: "Anda harus login terlebih dahulu" },
      });
    }
  },
  methods: {
    async deleteRecipe(recipeData) {
      await this.$swal({
        text:
          "Apakah anda yakin ingin menghapus resep " + recipeData.name + "?",
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
            .delete(this.$urlApi + `recipes/${recipeData.id}`, {
              headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            })
            .then((response) => {
              this.message = response.data.message;
              if (this.recipesData.data?.length <= 1) {
                this.getMyRecipes();
              } else {
                this.getMyRecipes(
                  this.$urlApi +
                    "search-my-recipes?page=" +
                    this.recipesData.meta?.current_page
                );
              }

              this.$swal("Success!", "Resep berhasil dihapus.", "success");
            })
            .catch((error) => {
              if (error.response) {
                this.message = error.data.message;
              }
            });
        }
      });
    },
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
              .get(this.$urlApi + "toggle-favorite/" + recipeData.id, {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              })
              .then((response) => {
                this.message = response.data.message;
                this.getMyRecipes(
                  this.$urlApi +
                    "search-my-recipes?page=" +
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
          .get(this.$urlApi + "toggle-favorite/" + recipeData.id, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then((response) => {
            this.message = response.data.message;
            this.getMyRecipes(
              this.$urlApi +
                "search-my-recipes?page=" +
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
    async getMyRecipes(link = this.$urlApi + "search-my-recipes") {
      let querySearching = {};
      if (this.search.recipe_name != null) {
        querySearching.recipe_name = this.search.recipe_name;
      }
      if (this.search.category != null) {
        querySearching.category = this.search.category;
      }
      if (this.search.level != null) {
        querySearching.level = this.search.level;
      }
      if (this.search.timeBetween != null) {
        querySearching.timeBetween = this.search.timeBetween;
      }
      if (this.search.ingredients != false) {
        querySearching.ingredients = this.search.ingredients;
      }
      if (this.search.how_to_cook != false) {
        querySearching.how_to_cook = this.search.how_to_cook;
      }
      this.isLoading = true;
      await axios
        .get(link, {
          params: querySearching,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.recipesData = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.data?.message;
            // this.$store.dispatch("clearToken");
            // this.$router.push("/login");
          }
        });
    },
    async getCategories() {
      await axios
        .get(this.$urlApi + `categories`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.message = error.data?.message;
            // this.$store.dispatch("clearToken");
            // this.$router.push("/login");
          }
        });
    },
    async getLevels() {
      await axios
        .get(this.$urlApi + `levels`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.levels = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.message = error.data?.message;
            // this.$store.dispatch("clearToken");
            // this.$router.push("/login");
          }
        });
    },
    resetFilter() {
      this.search.category = null;
      this.search.level = null;
      this.search.recipe_name = null;
      this.search.timeBetween = null;
      this.search.ingredients = false;
      this.search.how_to_cook = false;
    },
  },
};
</script>
