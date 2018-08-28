<template>
    <div class="mobile detail-container">
        <common-header/>
        <div class="detail-container-body">
            <div class="detail-container-body-top">
              <div class="touxiang"></div>
              <div class="name">写真集：yokiyoki</div>
              <div class="weibo">微博:..</div>
            </div>
            <div class="detail-container-body-bottom">
                <ul
                v-waterfall-lower="loadMore"
                waterfall-disabled="disabled"
                waterfall-offset="400"
                >
                <li v-for="item in list" :key='item' style="height: 100px;
                border-bottom: 1px solid #eaeaea;
                line-height: 100px;">{{ item }}张小姐姐图片</li>
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
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      disabled: false
    };
  },
  getDetail(){
    this.$proxy.get('/getAlbumDetail',{params:{id:this.$route.params.id}})
    .then( (res)=> {
        this.info=res.data.data
        console.log(res);
    })
  },
  directives: {
    WaterfallLower: Waterfall('lower')
  },

  methods: {
    loadMore() {
      this.disabled = true;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list.length);
        }
        this.disabled = false;
      }, 200);
    }
  }
}
</script>
