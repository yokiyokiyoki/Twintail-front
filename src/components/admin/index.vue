<template>
    <div class="admin-container">
        <div class="admin-container-header">
            <div class="button people active">
                小姐姐
            </div>
            <div class="button album">
                写真集
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    methods:{

    }
}
</script>

<style lang="less" scoped>
.admin-container {
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #383838;
    color: #fff;
    z-index: 100000;
    text-align: left;
    .button {
      color: #fff;

      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      font-size: 13px;
      margin: 0 10px;
      box-sizing: border-box;
      background: #383838;
      &.active {
        border-bottom: 2px solid #00ad9e;
        background: #505050;
      }
    }
  }
}
</style>
