import "bootstrap/dist/css/bootstrap.css";
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar as fasStart,
  faMagnifyingGlass,
  faEye as fasEye,
  faEyeSlash as fasEyeSlash,
  faPlus as fasPlus,
  faCircleUser as fasCircleUser,
  faChevronLeft as fasChevronLeft,
  faEllipsis as fasEllipsis,
  faBarsStaggered as fasBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStart,
  faEye as farEye,
  faEyeSlash as farEyeSlash,
  faClock as farClock,
  faTrashCan as farTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(
  fasStart,
  farStart,
  farClock,
  faMagnifyingGlass,
  farEye,
  fasEye,
  farEyeSlash,
  fasEyeSlash,
  fasPlus,
  fasCircleUser,
  fasChevronLeft,
  fasEllipsis,
  fasBarsStaggered,
  farTrashCan
);

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueSweetalert2)
  .component("icon", FontAwesomeIcon);

app.config.globalProperties.$urlApi = "http://localhost:8000/api/";
// app.config.globalProperties.$urlApi = "http://my-recipes-api.test/api/";

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
