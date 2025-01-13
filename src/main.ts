import { createApp } from "vue";
import App from "./pages/App.vue";

import "./assets/index.css";

import { VueQueryPlugin } from "@tanstack/vue-query";
import { router } from "./router";

const app = createApp(App);

//PLUGIN HERE
app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");
