import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "/";

createApp(App).mount("#app");
