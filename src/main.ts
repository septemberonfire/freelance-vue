import { createApp } from "vue";
import { router } from "./router";
import { createPinia } from "pinia";
import Colada, { PiniaColadaPlugin } from 'colada-plugin';

import "./theme.css";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";

const pinia = createPinia();
pinia.use(PiniaColadaPlugin);

createApp(App).use(pinia).use(router).use(Colada).mount("#app");
