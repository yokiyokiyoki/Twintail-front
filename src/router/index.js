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
import AdminAdv from "@/components/admin/adv";
import AdminAdvEdit from "@/components/admin/adv/edit";
import AdminLogin from "@/components/admin/login";

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
      path: "/info/:id",
      name: "Info",
      component: IsPC() ? PCInfo : MOBILEInfo
    },
    {
      path: "/detail/:id",
      name: "Detail",
      component: IsPC() ? PCDetail : MOBILEDetail
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      redirect: "/admin/people",
      children: [
        {
          path: "album",
          name: "Album",
          component: AdminAlbum
        },
        {
          path: "albumEdit",
          name: "AlbumEdit",
          component: AdminAlbumEdit
        },
        {
          path: "people",
          name: "People",
          component: AdminPeople
        },
        {
          path: "peopleEdit",
          name: "PeopleEdit",
          component: AdminPeopleEdit
        },
        {
          path: "adv",
          name: "Adv",
          component: AdminAdv
        },
        {
          path: "advEdit",
          name: "AdvEdit",
          component: AdminAdvEdit
        }
      ]
    },
    {
      path: "/admin/login",
      component: AdminLogin
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
