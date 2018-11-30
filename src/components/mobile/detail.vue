<template>
  <div class="mobile detail-container">
    <common-header/>
    <div class="detail-container-body">
      <div class="detail-container-body-top">
        <div class="touxiang" style="position:relative;">
          <!-- <img :src="info.tx_pic" style="height: 100%;width: 100%;border-radius: 100%;"> -->
          <v-img :src="info.tx_pic" style="height: 100%;width: 100%;border-radius: 100%;"></v-img>
        </div>
        <div class="name" @click="$router.push(`/info/${info.people_id}`)">{{info.username}}</div>
        <div class="weibo">微博:{{info.weibo}}</div>
        <div class="name sub">写真集：{{info.album_name}}</div>
        <div class="name sub">摄影：{{info.photographer}}</div>
      </div>
      <div class="detail-container-body-bottom">
        <ul>
          <li
            v-for="(item,index) in list"
            :key="index"
            style="
                border-bottom: 1px solid #eaeaea;position:relative;"
          >
            <!-- <img :src="item.photo_url" style="height:100%;width:100%;"> -->
            <v-img :src="item.photo_url" style="height:100%;width:100%;"></v-img>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Waterfall } from "vant";
import commonHeader from "./header";
import vImg from "./img";
export default {
  components: {
    commonHeader,
    vImg
  },
  data() {
    return {
      list: [],
      info: {}
    };
  },
  created() {
    this.getDetail();
  },

  directives: {
    WaterfallLower: Waterfall("lower")
  },

  methods: {
    getDetail() {
      this.$proxy
        .get("/api/getAlbumDetail", { params: { id: this.$route.params.id } })
        .then(res => {
          this.list = res.data.data.photo;
          this.info = res.data.data.info;
        });
    }
  }
};
</script>
