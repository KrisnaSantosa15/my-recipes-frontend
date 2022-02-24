<template>
  <div class="container">
    <main>
      <div class="py-3 text-center">
        <h2>Buat Resep Masakan Baru</h2>
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

      <form @submit.prevent="onSubmit">
        <div class="card p-3">
          <div class="row g-5">
            <div class="col-md-6 col-lg-6 order-md-last">
              <div class="row g-3">
                <div class="col-12">
                  <label for="category" class="form-label"
                    >Kategori Masakan
                  </label>
                  <select
                    name="category"
                    v-model="formData.category_id"
                    id="category"
                    class="form-select"
                    ref="category"
                    @blur="validateCategory"
                  >
                    <option value="" disabled selected>Pilih Kategori</option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.category_name }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.category" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label for="time" class="form-label"
                    >Waktu Masak
                    <span class="text-muted">(Dalam Menit)</span></label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="time"
                    min="1"
                    placeholder="Waktu"
                    v-model="formData.time"
                    ref="time"
                    @blur="validateTime"
                  />
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.time" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-sm-6">
                  <label for="level" class="form-label"
                    >Tingkat Kesulitan</label
                  >
                  <select
                    name="level"
                    v-model="formData.level_id"
                    id="level"
                    class="form-select"
                    @blur="validateLevel"
                    ref="level"
                  >
                    <option value="" disabled selected>
                      Pilih Tingkat Kesulitan
                    </option>
                    <option
                      v-for="level in levels"
                      :key="level.id"
                      :value="level.id"
                    >
                      {{ level.name }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.level" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-12">
                  <label for="how_to_cook" class="form-label"
                    >Cara Memasak
                    <span class="text-muted"
                      >(Pisahkan item dengan simbol -)</span
                    ></label
                  >
                  <textarea
                    name="how_to_cook"
                    v-model="formData.how_to_cook"
                    id="how_to_cook"
                    class="form-control"
                    rows="7"
                    placeholder="- Masukan bawang&#10;- Masukan gula &#10;- Hidangkan"
                    ref="how_to_cook"
                    @blur="validateHowToCook"
                  ></textarea>
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.how_to_cook" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <button
                  @click="$router.go(-1)"
                  class="btn btn-outline-primary mr-5"
                  type="button"
                >
                  Batal
                </button>
                <button class="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>

            <div class="col-md-6 col-lg-6">
              <div class="row g-3">
                <div class="col-12">
                  <label for="recipe_name" class="form-label"
                    >Nama Resep Masakan
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipe__name"
                    v-model="formData.recipe_name"
                    placeholder="Nama Resep Masakan"
                    ref="recipe_name"
                    @blur="validateRecipeName"
                  />
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.recipe_name" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-12">
                  <label for="image_url" class="form-label"
                    >Gambar Masakan
                    <span class="text-muted">(Link)</span></label
                  >
                  <input
                    type="url"
                    class="form-control"
                    id="image_url"
                    placeholder="Gambar Masakan"
                    v-model="formData.image_url"
                    ref="image_url"
                    @blur="validateImageUrl"
                  />
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.image_url" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-12">
                  <label for="ingredients" class="form-label"
                    >Bahan-bahan
                    <span class="text-muted"
                      >(Pisahkan item dengan simbol -)</span
                    ></label
                  >
                  <textarea
                    class="form-control"
                    id="ingredients"
                    placeholder="- Bawang merah&#10;- Gula &#10;- Garam"
                    v-model="formData.ingredients"
                    rows="7"
                    ref="ingredients"
                    @blur="validateIngredients"
                  ></textarea>
                  <div class="invalid-feedback">
                    <ul>
                      <li v-for="item in errors.ingredients" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditRecipe",
  props: ["id"],
  data() {
    return {
      formData: {
        category_id: "",
        level_id: "",
        time: "",
        how_to_cook: "",
        recipe_name: "",
        image_url: "",
        ingredients: "",
      },
      errors: {
        category: "",
        time: "",
        level: "",
        how_to_cook: "",
        recipe_name: "",
        image_url: "",
        ingredients: "",
      },
      errorMessage: {
        isError: false,
        message: "",
      },
      categories: [],
      levels: [],
    };
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    } else if (!this.id) {
      this.$router.go(-1);
    } else {
      this.getCategories();
      this.getLevels();
      this.getRecipe();
    }
  },
  methods: {
    async getRecipe() {
      if (this.$store.state.token != null) {
        await axios
          .get(this.$urlApi + `recipes/${this.id}`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then((response) => {
            this.formData = response.data.data;
          })
          .catch((error) => {
            if (
              error.response.status === 401 ||
              error.response.status === 404
            ) {
              this.errorMessage = {
                isError: true,
                message: error.response.data.message,
              };
            }
          });
      }
    },
    async onSubmit() {
      await axios
        .put(this.$urlApi + "recipes/" + this.id, this.formData, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            this.$router.push({
              name: "myrecipes",
              params: { message: response.data.message },
            });
          }
        })
        .catch((error) => {
          if (
            error.response.status === 401 ||
            error.response.status === 404 ||
            error.response.status === 422
          ) {
            this.errorMessage.isError = true;
            this.errorMessage.message = error.response.data.message;
            this.errors.category = error.response.data.errors.category_id;
            this.$refs.category.classList.add("is-invalid");
            this.errors.time = error.response.data.errors.time;
            this.$refs.time.classList.add("is-invalid");
            this.errors.how_to_cook = error.response.data.errors.how_to_cook;
            this.$refs.how_to_cook.classList.add("is-invalid");
            this.errors.level = error.response.data.errors.level_id;
            this.$refs.level.classList.add("is-invalid");
            this.errors.recipe_name = error.response.data.errors.recipe_name;
            this.$refs.recipe_name.classList.add("is-invalid");
            this.errors.image_url = error.response.data.errors.image_url;
            this.$refs.image_url.classList.add("is-invalid");
            this.errors.ingredients = error.response.data.errors.ingredients;
            this.$refs.ingredients.classList.add("is-invalid");
          } else {
            this.errorMessage.isError = true;
            this.errorMessage.message = "Whoops! Something went wrong.";
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
            this.$store.dispatch("clearToken");
            this.$router.push("/login");
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
            this.$store.dispatch("clearToken");
            this.$router.push("/login");
          }
        });
    },
    // make all validations
    validateCategory() {
      if (this.formData.category_id.length === 0) {
        this.$refs.category.classList.add("is-invalid");
        this.errors.category = ["Kategori Harus Diisi"];
      } else {
        this.$refs.category.classList.remove("is-invalid");
        this.$refs.category.classList.add("is-valid");
      }
    },
    validateLevel() {
      if (this.formData.level_id.length === 0) {
        this.$refs.level.classList.add("is-invalid");
        this.errors.level = ["Level Harus Diisi"];
      } else {
        this.$refs.level.classList.remove("is-invalid");
        this.$refs.level.classList.add("is-valid");
      }
    },
    validateImageUrl() {
      if (this.formData.image_url.length < 10) {
        this.$refs.image_url.classList.add("is-invalid");
        this.errors.image_url = ["Link Gambar Minimal 10 Karakter"];
      } else {
        this.$refs.image_url.classList.remove("is-invalid");
        this.$refs.image_url.classList.add("is-valid");
      }
    },
    validateHowToCook() {
      if (this.formData.how_to_cook.length < 5) {
        this.$refs.how_to_cook.classList.add("is-invalid");
        this.errors.how_to_cook = ["Cara Memasak Minimal 5 Karakter"];
      } else {
        this.$refs.how_to_cook.classList.remove("is-invalid");
        this.$refs.how_to_cook.classList.add("is-valid");
      }
    },
    validateRecipeName() {
      if (this.formData.recipe_name.length < 2) {
        this.$refs.recipe_name.classList.add("is-invalid");
        this.errors.recipe_name = ["Nama Masakan Minimal 2 Karakter"];
      } else {
        this.$refs.recipe_name.classList.remove("is-invalid");
        this.$refs.recipe_name.classList.add("is-valid");
      }
    },
    validateIngredients() {
      if (this.formData.ingredients.length < 5) {
        this.$refs.ingredients.classList.add("is-invalid");
        this.errors.ingredients = ["Bahan-bahan Minimal 5 Karakter"];
      } else {
        this.$refs.ingredients.classList.remove("is-invalid");
        this.$refs.ingredients.classList.add("is-valid");
      }
    },
    validateTime() {
      if (this.formData.time.length === 0) {
        this.$refs.time.classList.add("is-invalid");
        this.errors.time = ["Waktu Masak Harus Diisi"];
      } else if (isNaN(this.formData.time)) {
        this.$refs.time.classList.add("is-invalid");
        this.errors.time = ["Waktu Harus Angka"];
      } else if (this.formData.time <= 0) {
        this.$refs.time.classList.add("is-invalid");
        this.errors.time = ["Waktu Masak Harus Lebih Dari 0 Menit"];
      } else {
        this.$refs.time.classList.remove("is-invalid");
        this.$refs.time.classList.add("is-valid");
      }
    },
  },
};
</script>

<style></style>
