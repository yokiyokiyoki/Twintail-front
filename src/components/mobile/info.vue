<template>
  <div class="mobile info-container">
    <common-header/>
    <div class="info-container-header">
      <div class="info-container-header-img" v-if="info.people" style="position:relative;">
        <!-- <img :src="info.people.tx_pic" style="height:100%;max-width:100%;"> -->
        <v-img :src="info.people.tx_pic" style="height:100%;max-width:100%;"></v-img>
      </div>
      <div class="info-container-header-msg" v-if="info.people">
        <div class="ct name">{{info.people.username}}</div>
        <div class="ct id">昵称:{{info.people.self_ID}}</div>
        <div class="ct weibo">微博：{{info.people.weibo}}</div>
        <div class="ct intro">简介：{{info.people.intro}}</div>
      </div>
    </div>
    <div class="info-container-body">
      <div class="info-container-body-item">
        <div class="title">写真集</div>
        <div class="card-container">
          <div
            class="card"
            v-for="(item,index) in info.albums"
            :key="index"
            @click="handleClickItem(item)"
          >
            <div class="box">
              <div class="box-pic" style="position:relative;">
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
              <div class="box-bottom clearfix">
                <div class="box-bottom-left">{{item.info.album_name}}</div>
                <div class="box-bottom-right">
                  <i class="el-icon-star-on"></i>
                  <span class="num">{{item.info.star}}</span>
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
      // console.log(item)
      this.$router.push(`/detail/${item.info.id}`);
    },
    getDetail() {
      this.$proxy
        .get("/api/getUser", { params: { id: this.$route.params.id } })
        .then(res => {
          this.info = res.data.data;
          // console.log(this.info);
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
<style lang="less" scoped>
.info-container {
  &.mobile {
    .card {
      width: 50%;
      float: left;
      .box-pic {
        height: 200px;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
    }
  }
  background: #eaeaea;
  height: auto;
  &-header {
    &-img {
      height: 241px;
      background: white;
    }
    &-msg {
      height: 120px;
      background: white;
      .ct {
        text-align: left;
        font-size: 12px;
        margin-left: 20px;
        text-align: center;
        &.name {
          padding-top: 20px;
          font-size: 14px;
        }
      }
    }
  }
  &-body {
    padding: 0;
    margin-top: 10px;

    &-item {
      width: 100%;
      padding-bottom: 10px;
      .title {
        text-align: left;
        background: white;
        color: #ef9cbe;
        padding: 16px 10px 0 10px;
      }
      .card-container {
        overflow-x: auto;
        overflow-y: auto;
        height: 260px;
        background: white;
      }
      .card {
        margin-top: 10px;
        height: 240px;
        width: 160px;
        padding-left: 5px;
        padding-right: 5px;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-block;
        .box {
          border: 1px solid #eaeaea;
          height: 100%;
          display: flex;
          flex-direction: column;
          user-select: none;
          &-pic {
            flex: 1;
            &-container {
              height: 100%;
              display: flex;
              align-items: center;
            }
          }
          &-bottom {
            font-size: 14px;
            height: 30px;
            border-top: 1px solid #eaeaea;
            line-height: 30px;
            background: white;
            &-left {
              float: left;
              margin-left: 15px;
              font-size: 14px;
              width: 100px;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &-right {
              float: right;
              margin-right: 15px;
              i {
                color: black;
              }
              .num {
                font-size: 14px;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>


