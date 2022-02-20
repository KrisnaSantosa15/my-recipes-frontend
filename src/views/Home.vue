<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    if (this.$store.state.token != null) {
      axios
        .get("http://my-recipes-api.test/api/recipes", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            this.$store.dispatch("clearToken");
            this.$router.push("/login");
          }
        });
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
