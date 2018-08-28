<template>
    <div class="mobile detail-container">
        <common-header/>
        <div class="detail-container-body">
            <div class="detail-container-body-top">
              <div class="touxiang"></div>
              <div class="name">写真集：{{info.name}}</div>
              <div class="weibo">查看:{{info.view}}</div>
            </div>
            <div class="detail-container-body-bottom">
                <ul
                >
                <li v-for="(item,index) in list" :key='index' style="height: 100px;
                border-bottom: 1px solid #eaeaea;
                line-height: 100px;">
                  <img :src="item.photo_url" >
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
          this.info=res.data.data.album
          console.log(res,this.list);
      })
    },
  }
}
</script>
