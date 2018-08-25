import Vue from "vue";
import Router from "vue-router";
import PCHome from "@/components/pc/home";
import PCInfo from "@/components/pc/info";
import PCDetail from "@/components/pc/detail";
import MOBILEHome from "@/components/mobile/home";
import MOBILEDetail from "@/components/mobile/detail";
import MOBILEInfo from "@/components/mobile/info";
import Admin from "@/components/admin";
import AdminAlbum from "@/components/admin/album";
import AdminAlbumEdit from "@/components/admin/album/edit";
import AdminPeople from "@/components/admin/people";
import AdminPeopleEdit from "@/components/admin/people/edit";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "*", component: IsPC() ? PCHome : MOBILEHome },
    {
      path: "/",
      name: "Home",
      component: IsPC() ? PCHome : MOBILEHome
    },
    {
      path: "/info",
      name: "Info",
      component: IsPC() ? PCInfo : MOBILEInfo
    },
    {
      path: "/detail",
      name: "Detail",
      component: IsPC() ? PCDetail : MOBILEDetail
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      children: [
        {
          path: "/album",
          name: "Album",
          component: AdminAlbum
        },
        {
          path: "/albumEdit",
          name: "AlbumEdit",
          component: AdminAlbumEdit
        },
        {
          path: "/people",
          name: "People",
          component: AdminPeople
        },
        {
          path: "/album",
          name: "Album",
          component: AdminPeopleEdit
        }
      ]
    }
  ]
});

function IsPC() {
  let userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
