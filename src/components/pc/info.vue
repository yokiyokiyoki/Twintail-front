<template>
  <div class="pc info-container">
    <common-header/>
    <div class="info-container-body">
      <div class="info-container-body-top">
        <div class="info-container-body-top-left" v-if="info.people" style="position:relative;">
          <!-- <img :src="info.people.tx_pic" style="height:100%;max-width:100%;"> -->
          <v-img :src="info.people.tx_pic" style="height:100%;max-width:100%;"></v-img>
        </div>
        <div class="info-container-body-top-right" v-if="info.people">
          <div class="info-container-body-top-right-name">{{info.people.username}}</div>
          <div class="info-container-body-top-right-text">昵称:{{info.people.self_ID}}</div>
          <div class="info-container-body-top-right-text">微博:{{info.people.weibo}}</div>
          <div class="info-container-body-top-right-text">简介：{{info.people.intro}}</div>
        </div>
      </div>
      <div class="info-container-body-middle clearfix">
        <div
          class="info-container-body-middle-box"
          v-for="(item,index) in info.albums"
          :key="index"
          @click="handleClickItem(item)"
        >
          <div class="info-container-body-middle-box-container">
            <div class="info-container-body-middle-box-container-pic" style="position:relative;">
              <!-- <img
                :src="subItem.photo_url"
                v-for="(subItem,subIndex) in item.photo"
                :key="subIndex"
                v-if="subItem.is_cover==1"
                style="width:100%;"
              >-->
              <v-img
                :src="subItem.photo_url"
                v-for="(subItem,subIndex) in item.photo"
                :key="subIndex"
                v-if="subItem.is_cover==1"
                style="width:100%;"
              ></v-img>
            </div>
            <div class="info-container-body-middle-box-container-bottom clearfix">
              <div
                class="info-container-body-middle-box-container-bottom-left"
              >{{item.info.album_name}}</div>
              <div class="info-container-body-middle-box-container-bottom-right">
                <i class="el-icon-star-on"></i>
                <span class="num">{{item.info.star}}</span>
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
import vImg from "./img";
export default {
  components: {
    commonHeader,
    vImg
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    handleClickItem(item) {
      this.$router.push(`/detail/${item.info.id}`);
    },
    getDetail() {
      this.$proxy
        .get("/api/getUser", { params: { id: this.$route.params.id } })
        .then(res => {
          this.info = res.data.data;
          console.log(this.info);
        });
    }
  },
  watch: {
    $route(val, oldVal) {
      this.getDetail();
    }
  }
};
</script>

