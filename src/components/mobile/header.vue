<template>
    <div class="container-header clearfix">
        <div class="container-header-left">
            <div class="pic" @click="$router.push('/')">
                <img src="~@/assets/images/logo.png" alt="双马尾协会">
            </div>
            <div class="title">
                <div class="title-top">双马尾协会</div>
                <div class="title-bottom">中国首个双马尾爱好者聚集地</div>
            </div>
        </div>
        <div class="container-header-right">
            <van-icon name="search" @click="searchDialog"/>
        </div>
        <van-dialog
        v-model="show"
        show-cancel-button
        :before-close="beforeClose"
        >
        <van-search placeholder="请输入搜索的小姐姐" v-model="search" />
        </van-dialog>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            search:'',
            show:false
        }
    },
    methods:{
        searchDialog(){
            this.show=true
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                setTimeout(done, 1000);
            } else {
                done();
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container-header {
  height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  background: white;
  &-left {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    margin-left: 10px;
    .pic {
      height: 30px;
      width: 30px;
      border: 1px solid #eaeaea;
      border-radius: 30px;
      cursor: pointer;
      img {
        height: 30px;
      }
    }
    .title {
      margin-left: 10px;
      font-size: 12px;
      &-top {
        text-align: left;
        color: rgb(239, 156, 190);
      }
      &-bottom {
        font-size: 12px;
      }
    }
  }
  &-right {
    float: right;
    height: 46px;
    line-height: 56px;
    margin-right: 15px;
    font-size: 20px;
    color: rgb(239, 156, 190);
  }
}
</style>
