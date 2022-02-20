import "bootstrap/dist/css/bootstrap.css";
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

createApp(App)
  .use(store)
  .use(router)
  .component("icon", FontAwesomeIcon)
  .mount("#app");

import "bootstrap/dist/js/bootstrap.js";
