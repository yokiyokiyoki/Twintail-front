import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home";
import Info from "@/components/info";
import Detail from "@/components/detail";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/info",
      name: "Info",
      component: Info
    },
    {
      path: "/detail",
      name: "Detail",
      component: Detail
    }
  ]
});
