<template>
  <div class="container d-flex mt-4 justify-content-center">
    <div class="row d-flex justify-content-center">
      <div class="col-12">
        <h2>
          <span
            clas="align-items-center align-self-center"
            role="button"
            @click="$router.go(-1)"
            class="fs-1"
            ><icon
              class="align-items-center align-self-center"
              :icon="['fas', 'chevron-left']"
          /></span>
          Resep Masakan {{ recipe.recipe_name }}
        </h2>
        <div class="text-center">
          <img
            :src="recipe.image_url"
            :alt="recipe.recipe_name"
            width="250"
            height="250"
            class="text-center my-2 mb-3"
          />
        </div>
        <div class="row custom-border">
          <div class="col-md-3">
            <p>Kategori</p>
            <p class="custom-text">
              {{ recipe.category?.category_name }}
            </p>
          </div>
          <div class="col-md-3">
            <p>Waktu</p>
            <p class="custom-text">{{ recipe.time }} Menit</p>
          </div>
          <div class="col-md-3">
            <p>Kesulitan</p>
            <p class="custom-text">{{ recipe.level?.name }}</p>
          </div>
          <div class="col-md-3 d-flex align-items-center">
            <p class="align-self-center custom-text">
              <icon v-if="recipe.is_favorite" :icon="['fas', 'star']" />
              <icon v-if="!recipe.is_favorite" :icon="['far', 'star']" />
              Favorite
            </p>
          </div>
        </div>
        <div class="my-3">
          <h4 class="custom-header">Bahan-bahan</h4>
          <ul>
            {{
              recipe.ingredients
            }}
          </ul>
        </div>
        <div class="my-3">
          <h4 class="custom-header">Cara Memasak</h4>
          <ol>
            {{
              recipe.how_to_cook
            }}
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RecipeDetails",
  props: ["id"],
  data() {
    return {
      recipe: [],
    };
  },
  mounted() {
    if (!this.id) {
      this.$router.push("/recipes");
    } else {
      this.getRecipe();
    }
  },
  methods: {
    async getRecipe() {
      if (this.$store.state.token != null) {
        await axios
          .get(`http://my-recipes-api.test/api/recipes/${this.id}`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then((response) => {
            this.recipe = response.data.data;
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

<style scoped>
.custom-text {
  color: lightseagreen;
}

.custom-header {
  border-bottom: 1px solid black;
  color: lightseagreen;
}
.custom-border {
  border-width: 2px 2px 2px 0; /* top right bottom left */
  border-style: solid;
  border-color: lightseagreen;
}
</style>
