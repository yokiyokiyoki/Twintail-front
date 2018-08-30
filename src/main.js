// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
const R = require("ramda");
const moment = require("moment");
import "@/assets/less/app.less";
Vue.prototype.$R = R;

import Vant from "vant";
import "vant/lib/vant-css/index.css";

Vue.use(Vant);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";

Vue.use(ElementUI);

Vue.prototype.$proxy = axios;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
