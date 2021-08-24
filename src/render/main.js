import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/theme.less";
import "normalize.css";
createApp(App).use(router).use(store).mount("#app");
