import Vue from "vue";
import Router from "vue-router";
import PCHome from "@/components/pc/home";
import PCInfo from "@/components/pc/info";
import PCDetail from "@/components/pc/detail";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "*", component: Home },
    {
      path: "/",
      name: "Home",
      component: PCHome
    },
    {
      path: "/info",
      name: "Info",
      component: PCInfo
    },
    {
      path: "/detail",
      name: "Detail",
      component: PCDetail
    }
  ]
});
