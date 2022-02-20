<template>
  <div class="col-lg-3 col-md-6 col-12">
    <div class="card my-4 mx-1" style="width: 17rem">
      <div
        class="dropdown"
        v-if="
          recipesData.is_owner === true && ['myrecipes'].includes($route.name)
        "
      >
        <icon
          class="custom-dots dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          :icon="['fas', 'ellipsis']"
        />
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a
              class="dropdown-item text-danger"
              @click="deleteRecipe(recipesData.id)"
              href="#"
              ><icon :icon="['far', 'trash-can']" /> Hapus</a
            >
          </li>
        </ul>
      </div>
      <img :src="recipesData.image_url" class="card-img-top custom-img" />
      <div class="card-body">
        <p class="card-text custom-text fw-bolder">
          {{ recipesData.category.category_name }}
        </p>
        <h5 class="card-title fw-bold">{{ recipesData.recipe_name }}</h5>
        <div class="d-flex justify-content-between">
          <p class="custom-text">
            <icon :icon="['far', 'clock']" /> {{ recipesData.time }} Menit
          </p>
          <p
            role="button"
            @click="toggleFavorite(recipesData.id)"
            class="custom-text"
          >
            <icon v-if="recipesData.is_favorite" :icon="['fas', 'star']" />
            <icon v-if="!recipesData.is_favorite" :icon="['far', 'star']" />
            Favorites
          </p>
        </div>
        <div class="text-center">
          <router-link
            v-if="['myrecipes'].includes($route.name)"
            class="custom-text"
            :to="{
              name: 'editrecipe',
              params: {
                id: recipesData.id,
                recipename:
                  recipesData.recipe_name +
                  recipesData.id +
                  recipesData.category.category_name,
              },
            }"
            >Lihat Detail Resep</router-link
          >
          <router-link
            v-else
            class="custom-text"
            :to="{
              name: 'recipe',
              params: {
                id: recipesData.id,
                recipename:
                  recipesData.recipe_name +
                  recipesData.id +
                  recipesData.category.category_name,
              },
            }"
            >Lihat Detail Resep</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipe",
  props: {
    recipesData: {
      required: true,
    },
  },
  methods: {
    toggleFavorite(id) {
      this.$emit("toggle-favorite", id);
    },
    deleteRecipe(id) {
      this.$emit("delete-recipe", id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-text {
  color: lightseagreen;
}
.custom-img {
  width: 270px; /* You can set the dimensions to whatever you want */
  height: 300px;
  object-fit: cover;
}
.custom-dots {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  color: white;
}
</style>
