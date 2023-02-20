import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.config.globalProperties.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

app.config.globalProperties.$userData = reactive({
  name: "",
});

app.use(router).mount("#app");
