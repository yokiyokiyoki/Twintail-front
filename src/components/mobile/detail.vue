<template>
    <div class="mobile detail-container">
        <common-header/>
        <div class="detail-container-body">
            <div class="detail-container-body-top">
              <div class="touxiang"><img :src="info.tx_pic" ></div>
              <div class="name">{{info.username}}</div>
              <div class="name">写真集：{{info.album_name}}</div>
              <div class="weibo">微博:{{info.weibo}}</div>
            </div>
            <div class="detail-container-body-bottom">
                <ul
                >
                <li v-for="(item,index) in list" :key='index' style="height: 100px;
                border-bottom: 1px solid #eaeaea;
                line-height: 100px;">
                  <img :src="item.photo_url" style="height:100%;width:100%;">
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { Waterfall } from 'vant';
import commonHeader from './header'
export default {
  components:{
    commonHeader
  },
  data() {
    return {
      list: [],
      info:{}
    };
  },
  created(){
    this.getDetail()
  },
  
  directives: {
    WaterfallLower: Waterfall('lower')
  },

  methods: {
    getDetail(){
      this.$proxy.get('/getAlbumDetail',{params:{id:this.$route.params.id}})
      .then( (res)=> {
          this.list=res.data.data.photo
          this.info=res.data.data.info
      })
    },
  }
}
</script>
