<template>
  <div class="pc detail-container">
    <common-header/>
    <div class="detail-container-body">
      <div class="detail-container-body-left" v-loading="!dataComplete">
        <div
          class="box"
          v-for="(item,index) in list"
          :key="index"
          style="position:relative;min-height: 100px;"
        >
          <!-- <img :src="item.photo_url" style="width:100%;"> -->
          <v-img :src="item.photo_url" style="width:100%;"></v-img>
        </div>
      </div>
      <div class="detail-container-body-right" v-loading="!dataComplete">
        <div class="detail-container-body-right-header">
          <div class="detail-container-body-right-header-left">
            <div class="pic" style="position:relative;">
              <!-- <img :src="info.tx_pic" style="width:100%;border-radius:100%;"> -->
              <v-img :src="info.tx_pic" style="width:100%;border-radius:100%;"></v-img>
            </div>
          </div>
          <div class="detail-container-body-right-header-right">
            <div class="name" @click="$router.push(`/info/${info.people_id}`)">{{info.username}}</div>
            <div class="weibo">微博:{{info.weibo}}</div>
            <div class="name sub">写真集：{{info.album_name}}</div>
            <div class="name sub">摄影：{{info.photographer}}</div>
          </div>
        </div>
        <div class="detail-container-body-right-body">
          <div
            class="pic"
            v-for="(item,index) in list"
            :key="index"
            @click="changeImg(item)"
            style="position:relative;"
          >
            <!-- <img :src="item.photo_url" style="width:100%;"> -->
            <v-img :src="item.photo_url" style="width:100%;"></v-img>
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
  data() {
    return {
      list: [],
      info: {},
      activeImg: "",
      dataComplete: false
    };
  },
  created() {
    this.getDetail();
  },
  components: {
    commonHeader,
    vImg
  },
  methods: {
    changeImg(item) {
      this.activeImg = item.photo_url;
    },
    getDetail() {
      this.dataComplete = false;
      this.$proxy
        .get("/api/getAlbumDetail", { params: { id: this.$route.params.id } })
        .then(res => {
          this.list = res.data.data.photo;
          this.info = res.data.data.info;
          this.activeImg = this.list[0].photo_url;
          this.dataComplete = true;
        });
    }
  }
};
</script>

