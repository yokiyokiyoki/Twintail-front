<template>
  <img :src="url" :class="!loading?'loading':null">
</template>
<script>
export default {
  props: ["src"],
  data() {
    return {
      loading: false,
      url: require("@/assets/images/loading.gif") // 先加载loading.gif
    };
  },
  mounted() {
    // var newImg = new Image();
    // newImg.src = this.src;
    // newImg.onerror = e => {
    //   console.log("出错了");
    // };
    // newImg.onload = () => {
    //   console.log("done", this.src, newImg.src);
    //   this.loading = true;
    //   // 图片加载成功后把地址给原来的img
    //   this.url = newImg.src;
    // };
  },
  watch: {
    src: {
      immediate: true,
      handler(val, oldVal) {
        var newImg = new Image();
        newImg.src = val;
        newImg.onerror = e => {
          console.log("出错了");
        };
        newImg.onload = () => {
          console.log("done", this.src, newImg.src);
          this.loading = true;
          // 图片加载成功后把地址给原来的img
          this.url = newImg.src;
        };
      }
    }
  }
};
</script>
<style lang="less">
.loading {
  height: auto !important;
  width: auto !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
