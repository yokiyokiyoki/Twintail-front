<template>
    <div class="pc info-container">
        <common-header/>
        <div class="info-container-body">
            <div class="info-container-body-top">
                <div class="info-container-body-top-left" v-if='info.people'>
                    <img :src="info.people.tx_pic" style="height:100%;max-width:100%;" >
                </div>
                <div class="info-container-body-top-right" v-if='info.people'>
                    <div class="info-container-body-top-right-name">{{info.people.username}}</div>
                    <div class="info-container-body-top-right-text">ID:{{info.people.self_ID}}</div>
                    <div class="info-container-body-top-right-text">微博:{{info.people.weibo}}</div>
                    <div class="info-container-body-top-right-text">简介：{{info.people.intro}}</div>
                </div>
            </div>
            <div class="info-container-body-middle clearfix">
                <div class="info-container-body-middle-box" v-for='(item,index) in info.albums' :key='index' @click="handleClickItem(item)">
                    <div class="info-container-body-middle-box-container">
                        <div class="info-container-body-middle-box-container-pic">
                            <img :src="item.photo[0].photo_url" style="height:100%;width:100%;" v-if='item.photo.length'>
                        </div>
                        <div class="info-container-body-middle-box-container-bottom clearfix">
                            <div class="info-container-body-middle-box-container-bottom-left">{{item.info.album_name}}</div>
                            <div class="info-container-body-middle-box-container-bottom-right">
                                <i class="el-icon-star-on"></i>
                                <span class="num">{{item.info.view}}</span>
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
    created(){
      this.getDetail()
    },
    methods:{
        handleClickItem(item){
          this.$router.push(`/detail/${item.info.id}`)
        },
        getDetail(){
          this.$proxy.get('/api/getUser',{params:{id:this.$route.params.id}})
          .then( (res)=> {
              this.info=res.data.data
              console.log(this.info);
          })
        }
    },
}
</script>

