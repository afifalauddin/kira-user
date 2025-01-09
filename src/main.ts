import { createApp } from "vue";
import App from "./App.vue";

import "./assets/index.css";

import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

//PLUGIN HERE
app.use(VueQueryPlugin);

app.mount("#app");
