<template>
    <div class="mobile info-container">
        <common-header/>
        <div class="info-container-header">
            <div class="info-container-header-img"></div>
            <div class="info-container-header-msg" v-if='info.name'>
                <div class="ct name">{{info.name}}</div>
                <div class="ct id">ID:{{info.self_ID}}</div>
                <div class="ct weibo">微博：{{info.weibo}}</div>
                <div class="ct intro">简介：{{info.weibo}}</div>
            </div>
        </div>
        <div class="info-container-body">
            <div class="info-container-body-item">
                <div class="title">写真集</div>
                <div class="card-container">
                    <div class="card" v-for='n in 8' :key='n' @click="handleClickItem(n)">
                        <div class="box">
                            <div class="box-pic"></div>
                            <div class="box-bottom clearfix">
                                <div class="box-bottom-left">小姐姐</div>
                                <div class="box-bottom-right">
                                    <i class="el-icon-star-on"></i>
                                    <span class="num">200</span>
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
import commonHeader from './header'
export default {
    components:{
        commonHeader
    },
    data(){
      return{
        info:{}
      }
    },
    mounted(){
      this.getDetail()
    },
    methods:{
        handleClickItem(item){

        },
        getDetail(){
          this.$proxy.get('/getUser',{params:{id:this.$route.params.id}})
          .then( (res)=> {
              this.info=res.data.data
              console.log(res);
          })
        }
    },
}
</script> 
<style lang="less" scoped>
.info-container {
  background: #eaeaea;
  height: auto;
  &-header {
    &-img {
      height: 241px;
    }
    &-msg {
      height: 120px;
      background: white;
      .ct {
        text-align: left;
        font-size: 12px;
        margin-left: 20px;
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
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
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


