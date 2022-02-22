<template>
  <Navbar
    v-if="
      [
        'recipes',
        'recipe',
        'myrecipes',
        'myfavorites',
        'home',
        'addrecipe',
        'editrecipe',
      ].includes($route.name)
    "
  ></Navbar>
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 5px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: lightseagreen;
}
#nav a {
  color: white;
}
.btn.btn-primary.custom-button {
  background-color: lightseagreen;
  border-color: lightseagreen;
}

.btn.btn-primary {
  background-color: lightseagreen;
  border-color: lightseagreen;
}

.btn.btn-outline-primary {
  border-color: lightseagreen;
  color: lightseagreen;
}

.btn.btn-outline-primary:active,
.btn.btn-outline-primary:hover {
  background-color: lightseagreen;
  color: white;
}

.btn.btn-primary.filter-button {
  background-color: rgb(231, 229, 229);
  border-color: rgb(231, 229, 229);
  color: black;
}
</style>
