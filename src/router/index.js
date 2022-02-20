import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import NotFound from "../views/Error/NotFound.vue";
// import store from "../store/index";

import AllRecipes from "../views/Recipes/AllRecipes.vue";
import MyRecipes from "../views/Recipes/MyRecipes.vue";
import MyFavorites from "../views/Recipes/MyFavorites.vue";
import RecipeDetails from "../views/Recipes/RecipeDetails.vue";
import AddNewRecipe from "../views/Recipes/AddNewRecipe.vue";
import EditRecipe from "../views/Recipes/EditRecipe.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: AllRecipes,
  },
  {
    path: "/recipes",
    name: "recipes",
    component: AllRecipes,
  },
  {
    path: "/recipes/:recipename",
    name: "recipe",
    component: RecipeDetails,
    props: true,
  },
  {
    path: "/recipes/:recipename/edit",
    name: "editrecipe",
    component: EditRecipe,
    props: true,
  },
  {
    path: "/my-recipes",
    name: "myrecipes",
    component: MyRecipes,
  },
  {
    path: "/my-favorites",
    name: "myfavorites",
    component: MyFavorites,
  },
  {
    path: "/add-recipe",
    name: "addrecipe",
    component: AddNewRecipe,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    // before enter, check if token is found
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("auth")) {
        next(from.path);
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    // before enter, check if token is found
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("auth")) {
        next(from.path);
      } else {
        next();
      }
    },
  },
  //   make router for not found page
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
