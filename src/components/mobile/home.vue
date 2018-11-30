<template>
  <div class="mobile home-container">
    <common-header/>
    <div class="home-container-body">
      <div class="home-container-body-top">
        <div class="home-container-body-top-carousel">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
              <!-- <img
                :src="subItem.photo_url"
                v-for="(subItem,subIndex) in item.photo"
                v-if="subItem.is_cover==1"
                :key="subIndex"
                @click="handleBanner(item)"
              >-->
              <v-img
                :src="subItem.photo_url"
                v-for="(subItem,subIndex) in item.photo"
                v-if="subItem.is_cover==1"
                :key="subIndex"
                @click.native="handleBanner(item)"
              ></v-img>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div
          class="home-container-body-top-boxContainer clearfix"
          ref="adv-box"
          @touchstart="stopAdvTimeId"
          @touchend="setAdvRoll"
        >
          <div
            class="home-container-body-top-boxContainer-box"
            v-for="(item,index) in advList"
            :key="index"
          >
            <div
              class="home-container-body-top-boxContainer-box-pic"
              @click="jumpUrl(item)"
              style="height:90%;cursor:pointer;"
            >
              <!-- <img :src="item.photo_url"> -->
              <v-img :src="item.photo_url"></v-img>
            </div>
            <div class="home-container-body-top-boxContainer-box-txt">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="home-container-body-bottom">
        <van-tabs v-model="menuActive" class="card">
          <van-tab v-for="(item,index) in menulist" :title="item.name" :key="index">
            <div
              class="home-container-body-bottom-left-body-card"
              v-for="(item,index) in activeAlbum"
              :key="index"
            >
              <div class="box">
                <div class="box-pic" @click="handleClickItem(item)" style="position:relative;">
                  <!-- <img
                    :src="subItem.photo_url"
                    v-for="(subItem,subIndex) in item.photo"
                    v-if="subItem.is_cover==1"
                    :key="subIndex"
                    @click="handleBanner(item)"
                  >-->
                  <v-img
                    :src="subItem.photo_url"
                    v-for="(subItem,subIndex) in item.photo"
                    v-if="subItem.is_cover==1"
                    :key="subIndex"
                    @click.native="handleBanner(item)"
                  ></v-img>
                </div>
                <div class="box-bottom clearfix">
                  <div class="box-bottom-left">{{item.info.album_name}}</div>
                  <div class="box-bottom-right">
                    <i class="el-icon-star-on" @click="handleClickStar(item)"></i>
                    <span class="num">{{item.info.star}}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>

        <div class="home-container-body-bottom-member">
          <div class="title">双马尾协会成员</div>
          <div
            class="home-container-body-top-boxContainer clearfix"
            @touchstart="stopUserTimeId"
            @touchend="setUserRoll"
            ref="user-box"
          >
            <div
              class="home-container-body-top-boxContainer-box"
              v-for="(item,index) in peopleList"
              :key="index"
              @click="jumpInfo(item)"
            >
              <div class="box-left">
                <div class="pic" style="position:relative;">
                  <!-- <img :src="item.tx_pic" style="height:100%;width:100%;border-radius:100%;"> -->
                  <v-img :src="item.tx_pic" style="height:100%;width:100%;border-radius:100%;"></v-img>
                </div>
              </div>
              <div class="box-right">
                <div class="box-right-container">
                  <div class="box-right-container-header clearfix">
                    <div class="left">{{item.username}}</div>
                  </div>
                  <div class="box-right-container-body">{{item.intro}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonHeader from "./header";
import { setInterval, clearInterval } from "timers";
import vImg from "./img";
export default {
  components: {
    commonHeader,
    vImg
  },
  data() {
    return {
      menulist: [
        { name: "最新", id: 1 },
        { name: "本周热门", id: 2 },
        { name: "热门推荐", id: 3 },
        { name: "协会成员", id: 4 }
      ],
      menuActive: 0,
      peopleList: [],
      advList: [],
      albumLists: [],
      timeggId: null,
      //是否反向
      timeggReverse: false,
      timeppId: null,
      timeppReverse: false
    };
  },
  created() {
    this.getAllUsers();
    this.getAllAdvs();
    this.getAllAlbums();
  },
  mounted() {
    this.setRightAdvRoll();
    this.setRightUserRoll();
  },
  beforeDestroy() {
    this.stopAdvTimeId();
    this.stopUserTimeId();
  },
  computed: {
    activeAlbum() {
      let res;
      console.log(this.menuActive);
      if (this.menuActive == 3) {
        //双马尾协会成员
        res = this.albumLists.filter((item, index) => {
          return item.info.is_member == 1;
        });
      } else {
        res = this.albumLists.filter((item, index) => {
          return item.info.is_member == 0;
        });
        if (this.menuActive == 0) {
          //最新
          res = this.$R.clone(res);
          res = res.sort((a, b) => {
            return +b.info.creatAt - +a.info.creatAt;
          });
        }
        if (this.menuActive == 1) {
          //本周热门
          res = res.filter((item, index) => {
            return (
              +this.$moment().startOf("isoWeek") < +item.info.creatAt &&
              item.info.creatAt < +this.$moment().endOf("isoWeek")
            );
          });
          res = res.filter((item, index) => {
            return item.info.star > 5;
          });
          res = res.sort((a, b) => {
            return b.info.star - a.info.star;
          });
          console.log(
            res,
            +this.$moment().startOf("isoWeek"),
            +this.$moment().endOf("isoWeek")
          );
        }
        if (this.menuActive == 2) {
          //热门推荐
          res = res.filter((item, index) => {
            return item.info.star > 5;
          });
          res = res.sort((a, b) => {
            return b.info.star - a.info.star;
          });
        }
      }

      return res;
    },
    bannerList() {
      let res = this.albumLists.filter((item, index) => {
        return item.info.is_banner == 1;
      });
      return res;
    }
  },
  methods: {
    stopAdvTimeId() {
      clearInterval(this.timeggId);
    },
    stopUserTimeId() {
      clearInterval(this.timeppId);
    },
    setAdvRoll() {
      if (this.timeggReverse) {
        this.setLeftAdvRoll();
      } else {
        this.setRightAdvRoll();
      }
    },
    setUserRoll() {
      if (this.timeppReverse) {
        this.setLeftUserRoll();
      } else {
        this.setRightUserRoll();
      }
    },
    setRightAdvRoll() {
      !this.timeggReverse &&
        (this.timeggId = setInterval(() => {
          if (
            this.$refs["adv-box"].scrollLeft +
              this.$refs["adv-box"].clientWidth <
            this.$refs["adv-box"].scrollWidth
          ) {
            this.$refs["adv-box"].scrollLeft++;
          } else {
            clearInterval(this.timeggId);
            this.timeggReverse = true;
            this.setLeftAdvRoll();
          }
        }, 50));
    },
    setLeftAdvRoll() {
      this.timeggReverse &&
        (this.timeggId = setInterval(() => {
          if (this.$refs["adv-box"].scrollLeft == 0) {
            clearInterval(this.timeggId);
            this.timeggReverse = false;
            this.setRightAdvRoll();
          } else {
            this.$refs["adv-box"].scrollLeft--;
          }
        }, 50));
    },
    setRightUserRoll() {
      !this.timeppReverse &&
        (this.timeppId = setInterval(() => {
          if (
            this.$refs["user-box"].scrollLeft +
              this.$refs["user-box"].clientWidth <
            this.$refs["user-box"].scrollWidth
          ) {
            this.$refs["user-box"].scrollLeft++;
          } else {
            clearInterval(this.timeppId);
            this.timeppReverse = true;
            this.setLeftUserRoll();
          }
        }, 50));
    },
    setLeftUserRoll() {
      this.timeppReverse &&
        (this.timeppId = setInterval(() => {
          if (this.$refs["user-box"].scrollLeft == 0) {
            clearInterval(this.timeppId);
            this.timeppReverse = false;
            this.setRightUserRoll();
          } else {
            this.$refs["user-box"].scrollLeft--;
          }
        }, 50));
    },
    jumpUrl(item) {
      window.open(item.jump_url);
    },
    handleBanner(item) {
      // console.log(item)
      this.$router.push(`/detail/${item.info.id}`);
    },
    handleClickStar(item) {
      this.$proxy.post("/api/addAlbumStar", { id: item.info.id }).then(res => {
        if (res.data.success) {
          console.log("点赞成功");
          item.info.star += 1;
        } else {
          this.$message.error(res.data.message);
        }
      });
      // console.log(item)
    },
    jumpInfo(item) {
      this.$router.push({ name: "Info", params: { id: item.id } });
    },
    getAllUsers() {
      this.$proxy.get("/api/getAllUsers").then(res => {
        this.peopleList = res.data.data.filter((item, index) => {
          //展示协会成员
          return item.is_member == 1;
        });
      });
    },
    getAllAdvs() {
      this.$proxy.get("/api/getAllAdvs").then(res => {
        this.advList = res.data.data;
      });
    },
    getAllAlbums() {
      this.$proxy.get("/api/getAllAlbums").then(res => {
        this.albumLists = res.data.data;
      });
    },
    handleClickItem(item) {
      this.$router.push(`/detail/${item.info.id}`);
    },
    handleClickMenu(item) {
      this.activeItem = item;
    }
  }
};
</script>
